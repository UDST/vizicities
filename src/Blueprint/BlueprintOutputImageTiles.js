/* globals window, _, VIZI, THREE */
(function() {
  "use strict";

/**
 * Blueprint image tiles output
 * @author Robin Hawkes - vizicities.com
 */  

  // output: {
  //   type: "BlueprintOutputImageTiles",
  //   options: {
  //     grids: [{
  //       zoom: 19,
  //       tilesPerDirection: 3,
  //       cullZoom: 17
  //     },
  //     ...
  //   }
  // }
  VIZI.BlueprintOutputImageTiles = function(options) {
    var self = this;

    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
      materialType: "MeshBasicMaterial",
      materialOptions: {}
    });

    _.defaults(self.options.materialOptions, {
      // color: 0x00FF00,
      depthWrite: false,
      transparent: true
    });

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: ["tiles"]},
      {name: "gridUpdated", arguments: ["tiles"]}
    ];

    self.actions = [
      {name: "outputImageTile", arguments: ["image", "tile"]}
    ];

    // Grids
    // {16: {
    //   grid: VIZI.BlueprintHelperTileGrid,
    //   canvas: DOMCanvas,
    //   canvasSizeDiff: Float,
    //   context: CanvasContext,
    //   mesh: THREE.Object3D
    // }, ...}
    self.grids = {};

    self.world;
  };

  VIZI.BlueprintOutputImageTiles.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputImageTiles.prototype.init = function() {
    var self = this;

    // Create grids
    _.each(self.options.grids, function(grid) {
      self.grids[grid.zoom] = self.createGrid(grid);
    });

    var combinedTiles = [];

    _.each(self.grids, function(gridHash) {
      combinedTiles = combinedTiles.concat(gridHash.grid.tiles);
    });

    self.emit("initialised", combinedTiles);
  };

  VIZI.BlueprintOutputImageTiles.prototype.createGrid = function(gridOptions) {
    var self = this;

    var gridOutput = {};

    var grid = new VIZI.BlueprintHelperTileGrid(self.world, gridOptions);

    grid.on("moved", function(tiles, diff) {
      if (VIZI.DEBUG) console.log("Grid moved", tiles, diff);

      var oldImages = gridOutput.images;
      var newTiles = [];
      gridOutput.images = {};
      tiles.forEach(function (tile) {
        var key = tile.x + '/' + tile.y;

        var localCoords = grid.globalToLocalTiles(tile.x, tile.y);
        var materialIndex = localCoords.y * grid.tileCount.x + localCoords.x;
        var material = gridOutput.materials[materialIndex];

        if (oldImages.hasOwnProperty(key)) {
          // we're still going to work with this image
          material.map = oldImages[key].texture;
          gridOutput.images[key] = oldImages[key];
          delete oldImages[key];
        } else {
          //this is a new one
          material.map = null;
          material.opacity = 0;
          newTiles.push(tile);
        }

        // Force an update so old tiles aren't shown briefly
        material.needsUpdate = true;
      });

      // TODO: This whole tile size calculation probably only needs doing once
      var geoBounds = {
        ne: self.world.project(new VIZI.LatLon(grid.boundsLatLon.n, grid.boundsLatLon.e)),
        sw: self.world.project(new VIZI.LatLon(grid.boundsLatLon.s, grid.boundsLatLon.w))
      };

      // TODO: Likewise
      var size = [Math.abs(geoBounds.ne.x - geoBounds.sw.x), Math.abs(geoBounds.ne.y - geoBounds.sw.y)];

      // TODO: Likewise
      gridOutput.mesh.position.x += (size[0] / grid.tileCount.x) * diff.x;
      gridOutput.mesh.position.z += (size[1] / grid.tileCount.y) * diff.y;

      // Only emit update event if grid is enabled
      if (!grid.disable) {
        self.emit("gridUpdated", tiles, newTiles);
      }
    });

    grid.on("disabled", function() {
      if (VIZI.DEBUG) console.log("Grid disabled");

      gridOutput.mesh.visible = false;
    });

    grid.on("enabled", function() {
      if (VIZI.DEBUG) console.log("Grid enabled");

      self.emit("gridUpdated", grid.tiles);

      gridOutput.mesh.visible = true;
    });

    var tiles = grid.init();

    if (VIZI.DEBUG) console.log("Grid initialised", tiles);

    // Create canvas and object
    self.createGridObject(grid, gridOutput);

    gridOutput.grid = grid;

    return gridOutput;
  };

  // TODO: Process this within a Web Worker
  // TODO: Work out how to get CRS and other bits passed into (or replicated within) the worker
  // TODO: Immediately hide grid if beyond camera cull point
  // What's the best way of getting camera radius to here? Singleton?
  VIZI.BlueprintOutputImageTiles.prototype.createGridObject = function(grid, output) {
    var self = this;

    var x, y;

    var materialType = self.options.materialType;
    if (!materialType || typeof THREE[materialType] !== "function") {
      materialType = "MeshLambertMaterial";
    }

    var materialOptions = _.clone(self.options.materialOptions);

    var materials = [];

    for (x = 0; x < grid.tileCount.x; x++) {
      for (y = 0; y < grid.tileCount.y; y++) {
        var material = new THREE[materialType](materialOptions);

        // Update material otherwise canvas shows up black
        material.needsUpdate = true;

        materials.push(material);
      }
    }

    var geoBounds = {
      ne: self.world.project(new VIZI.LatLon(grid.boundsLatLon.n, grid.boundsLatLon.e)),
      sw: self.world.project(new VIZI.LatLon(grid.boundsLatLon.s, grid.boundsLatLon.w))
    };

    // Why is this tilesize so random?
    // TODO: Work out if the tilesize not being a proper square for square-shaped bounding coordinates is a problem (eg. 4825.486315913922, 4825.486315915361)
    var size = [Math.abs(geoBounds.ne.x - geoBounds.sw.x), Math.abs(geoBounds.ne.y - geoBounds.sw.y)];

    var xSize = size[0] / grid.tileCount.x;
    var ySize = size[1] / grid.tileCount.y;
    var geom = new THREE.PlaneBufferGeometry(xSize, ySize, 1, 1);

    var gridMesh = new THREE.Object3D();

    var meshes = [];
    for (y = 0; y < grid.tileCount.y; y++) {
      for (x = 0; x < grid.tileCount.x; x++) {
        var mesh = new THREE.Mesh(geom, materials[meshes.length]);
        mesh.position.x = (x - grid.tileCount.x / 2 + 0.5) * xSize;
        mesh.position.y = -(y - grid.tileCount.y / 2 + 0.5) * ySize;
        mesh.renderDepth = grid.tileZoom * -1;
        //mesh.rotation.x = -90 * Math.PI / 180;
        gridMesh.add(mesh);
        meshes.push(mesh);
      }
    }

    // Hacky method for forcing render depth / layers using tile zoom
    gridMesh.renderDepth = grid.tileZoom * -1;

    var centerPos = [geoBounds.sw.x + (size[0] / 2), geoBounds.sw.y - (size[1] / 2)];

    gridMesh.position.x = centerPos[0];
    gridMesh.position.z = centerPos[1];

    // Flip to horizontal
    gridMesh.rotation.x = -90 * Math.PI / 180;

    // TODO: Move to new VIZI.Mediator event system
    // self.publish("addToScene", gridMesh);

    // TODO: Make sure coordinate space is right
    self.add(gridMesh);

    output.mesh = gridMesh;
    output.materials = materials;
    output.images = {};

    return output;
  };

  // {
  //   x: 262116,
  //   y: 174348,
  //   z: 19
  // }
  VIZI.BlueprintOutputImageTiles.prototype.outputImageTile = function(image, tile) {
    var self = this;

    // Find grid
    var gridHash = self.grids[tile.z];

    var localCoords = gridHash.grid.globalToLocalTiles(tile.x, tile.y);
    var materialIndex = localCoords.y * gridHash.grid.tileCount.x + localCoords.x;

    if (materialIndex < 0 || materialIndex >= gridHash.materials.length) {
      // This is probably an old image loading late
      return;
    }

    var material = gridHash.materials[materialIndex];

    var texture = new THREE.Texture(image);
    // texture.minFilter = texture.magFilter = THREE.LinearFilter;

    // Silky smooth images when tilted
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    // TODO: Set this to renderer.getMaxAnisotropy() / 4
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    material.map = texture;
    material.opacity = 1;
    material.needsUpdate = true;

    var key = tile.x + '/' + tile.y;
    gridHash.images[key] = {
      texture: texture,
      tile: tile
    };
  };

  VIZI.BlueprintOutputImageTiles.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());