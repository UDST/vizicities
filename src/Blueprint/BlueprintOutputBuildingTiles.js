/* globals window, _, VIZI, THREE, operative */
(function() {
  "use strict";

/**
 * Blueprint building tiles output
 * @author Robin Hawkes - vizicities.com
 */  

  // output: {
  //   type: "BlueprintOutputBuildingTiles",
  //   options: {
  //     grids: [{
  //       zoom: 19,
  //       tilesPerDirection: 3,
  //       cullZoom: 15
  //     },
  //     ...
  //   }
  // }
  VIZI.BlueprintOutputBuildingTiles = function(options) {
    var self = this;

    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
      materialType: "MeshLambertMaterial",
      materialOptions: {},
      workerURL: "vizi-worker.min.js"
    });

    _.defaults(self.options.materialOptions, {
      color: 0xeeeeee,
      ambient: 0xffffff,
      emissive: 0xcccccc,
      shading: THREE.FlatShading
    });

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: ["tiles"]},
      {name: "gridUpdated", arguments: ["tiles"]}
    ];

    self.actions = [
      {name: "outputBuildingTile", arguments: ["buildings", "tile"]}
    ];

    // Grids
    // {16: {
    //   grid: VIZI.BlueprintHelperTileGrid,
    //   mesh: THREE.Object3D
    // }, ...}
    self.grids = {};

    self.world;
    self.worker;
  };

  VIZI.BlueprintOutputBuildingTiles.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputBuildingTiles.prototype.init = function() {
    var self = this;

    self.worker = operative(self.outputBuildingTileWorker, [
      self.options.workerURL
    ]);

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

  VIZI.BlueprintOutputBuildingTiles.prototype.createGrid = function(gridOptions) {
    var self = this;

    var gridOutput = {};

    var grid = new VIZI.BlueprintHelperTileGrid(self.world, gridOptions);

    grid.on("moved", function(tiles, diff) {
      if (VIZI.DEBUG) console.log("Grid moved", tiles, diff);

      // TODO: Animate building heights before removing them
      _.each(gridOutput.meshes, function(mesh) {
        self.remove(mesh);
      });

      // TODO: Check whether this is enough to remove references to the old mesh
      gridOutput.meshes = [];

      // Only emit update event if grid is enabled
      if (!grid.disable) {
        self.emit("gridUpdated", tiles);
      }
    });

    grid.on("disabled", function() {
      if (VIZI.DEBUG) console.log("Grid disabled");

      _.each(gridOutput.meshes, function(mesh) {
        mesh.visible = false;
      });
    });
    
    // TODO: Either remove previous tiles or prevent event if grid hasn't moved
    // There's a huge hang-up when zooming in due to re-loading and processing tiles
    grid.on("enabled", function() {
      if (VIZI.DEBUG) console.log("Grid enabled");

      self.emit("gridUpdated", grid.tiles);

      // TODO: Animate building heights when making them visible again
      _.each(gridOutput.meshes, function(mesh) {
        mesh.visible = true;
      });
    });

    var tiles = grid.init();

    if (VIZI.DEBUG) console.log("Grid initialised", tiles);

    gridOutput.grid = grid;
    gridOutput.meshes = [];

    return gridOutput;
  };

  // Building
  // {
  //   outline: [...],
  //   height: 123
  // }

  // TODO: Cache processed tile
  // TODO: Use cached tile if available
  // TODO: Animate building heights on load
  VIZI.BlueprintOutputBuildingTiles.prototype.outputBuildingTile = function(buildings, tile) {
    if (!buildings.length) {
        return;
    }

    var self = this;

    // Find grid
    var gridHash = self.grids[tile.z];

    var materialType = self.options.materialType;
    if (!materialType || typeof THREE[materialType] !== "function") {
      materialType = "MeshLambertMaterial";
    }

    var material = new THREE[materialType](self.options.materialOptions);

    // Load buildings in a Web Worker
    self.worker(self.world.origin, self.world.originZoom, self.options, buildings).then(function(result) {
      var offset = result.offset;
      var geom = new THREE.BufferGeometry();
      geom.addAttribute('position', new THREE.BufferAttribute(result.position, 3));
      geom.addAttribute('normal', new THREE.BufferAttribute(result.normal, 3));
      geom.addAttribute('uv', new THREE.BufferAttribute(result.uv, 2));

      var mesh = new THREE.Mesh(geom, material);

      // Use previously calculated offset to return merged mesh to correct position
      // This allows frustum culling to work correctly
      mesh.position.x = -1 * offset.x;
      mesh.position.y = -1 * offset.y;
      mesh.position.z = -1 * offset.z;

      gridHash.meshes.push(mesh);

      // TODO: Make sure coordinate space is right
      self.add(mesh);
    }, function(failure) {
      // ...
    });

    // Dead code from move to Web Worker processor (31/10/2014)

    // var combinedGeom = new THREE.Geometry();

    // // TODO: Remove manual, hard-baked height-related stuff
    // var metersPerLevel = 3;

    // // TODO: Remove forced office scaling
    // var scalingFactor = 1.45;
    // // var scalingFactor = (tags["building"] === "office") ? 1.45 : 1;

    // // Local pixels per meter - set once per tile
    // var pixelsPerMeter;

    // _.each(buildings, function(feature) {
    //   var offset = new VIZI.Point();
    //   var shape = new THREE.Shape();

    //   // TODO: Don't manually use first set of coordinates (index 0)
    //   _.each(feature.outline[0], function(coord, index) {
    //     var latLon = new VIZI.LatLon(coord[1], coord[0]);
    //     var geoCoord = self.world.project(latLon);

    //     // Set local pixels per meter if not set
    //     if (pixelsPerMeter === undefined) {
    //       pixelsPerMeter = self.world.pixelsPerMeter(latLon);
    //     }

    //     if (offset.length === 0) {
    //       offset.x = -1 * geoCoord.x;
    //       offset.y = -1 * geoCoord.y;
    //     }

    //     // Move if first coordinate
    //     if (index === 0) {
    //       shape.moveTo( geoCoord.x + offset.x, geoCoord.y + offset.y );
    //     } else {
    //       shape.lineTo( geoCoord.x + offset.x, geoCoord.y + offset.y );
    //     }
    //   });

    //   // TODO: Don't have random height logic in here
    //   var height = (feature.height) ? feature.height : 5 + Math.random() * 10;

    //   // TODO: Add floor/level-based heights
    //   // << rounds the height down
    //   // var height = (feature.height * metersPerLevel * scalingFactor << 0);
      
    //   // Multiply height in meters by pixels per meter ratio at latitude
    //   height *= pixelsPerMeter.y;

    //   var extrudeSettings = { amount: height, bevelEnabled: false };
      
    //   var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    //   geom.computeFaceNormals();
      
    //   var mesh = new THREE.Mesh(geom);

    //   mesh.position.y = height;

    //   // Offset
    //   mesh.position.x = -1 * offset.x;
    //   mesh.position.z = -1 * offset.y;

    //   // Flip as they are up-side down
    //   mesh.rotation.x = 90 * Math.PI / 180;

    //   mesh.matrixAutoUpdate && mesh.updateMatrix();
    //   combinedGeom.merge(mesh.geometry, mesh.matrix);
    // });

    // // Move merged geom to 0,0 and return offset
    // var offset = combinedGeom.center();

    // var combinedMesh = new THREE.Mesh(combinedGeom, material);

    // // Use previously calculated offset to return merged mesh to correct position
    // // This allows frustum culling to work correctly
    // combinedMesh.position.x = -1 * offset.x;

    // // Removed for scale center to be correct
    // // Offset with applyMatrix above
    // combinedMesh.position.y = -1 * offset.y;

    // combinedMesh.position.z = -1 * offset.z;

    // gridHash.meshes.push(combinedMesh);

    // TODO: Make sure coordinate space is right
    // self.add(combinedMesh);
  };

  // TODO: Is this running before the Blueprint is initialised and taking up unnecessary memory?
  // TODO: Find a better way to replicate World state (origin, origin zoom, CRS, etc) so it doesn't have to be duplicated for every Blueprint
  VIZI.BlueprintOutputBuildingTiles.prototype.outputBuildingTileWorker = function(origin, originZoom, options, buildings) {
    var self = this;
    var deferred = self.deferred();

    // Set up CRS to replicate main thread
    var crs = VIZI.CRS.EPSG3857;

    // Proxy world project (normal project - world origin)
    // TODO: Find a better way so this doesn't have to be duplicated for every Blueprint
    var project = function(latLon, zoom) {
      zoom = zoom || originZoom;

      // TODO: Are there ramifications to rounding the pixels?
      var originPoint = crs.latLonToPoint(origin, zoom, {round: true});
      var projected = crs.latLonToPoint(latLon, zoom, {round: true});

      return projected.subtract(originPoint);
    };

    // Proxy world pixelPerMeter
    // TODO: Find a better way so this doesn't have to be duplicated for every Blueprint
    var pixelsPerMeter = function(latLon, zoom) {
      zoom = zoom || originZoom; 
      return crs.pixelsPerMeter(latLon, zoom);
    };

    var combinedGeom = new THREE.Geometry();

    // TODO: Remove manual, hard-baked height-related stuff
    var metersPerLevel = 3;

    // TODO: Remove forced office scaling
    var scalingFactor = 1.45;
    // var scalingFactor = (tags["building"] === "office") ? 1.45 : 1;

    // Local pixels per meter - set once per tile
    var ppm;

    _.each(buildings, function(feature) {
      var offset = new VIZI.Point();
      var shape = new THREE.Shape();

      // TODO: Don't manually use first set of coordinates (index 0)
      _.each(feature.outline[0], function(coord, index) {
        var latLon = new VIZI.LatLon(coord[1], coord[0]);
        var geoCoord = project(latLon);

        // Set local pixels per meter if not set
        if (ppm === undefined) {
          ppm = pixelsPerMeter(latLon);
        }

        if (offset.length === 0) {
          offset.x = -1 * geoCoord.x;
          offset.y = -1 * geoCoord.y;
        }

        // Move if first coordinate
        if (index === 0) {
          shape.moveTo( geoCoord.x + offset.x, geoCoord.y + offset.y );
        } else {
          shape.lineTo( geoCoord.x + offset.x, geoCoord.y + offset.y );
        }
      });

      // TODO: Don't have random height logic in here
      var height = (feature.height) ? feature.height : 5 + Math.random() * 10;

      var minHeight = (feature.minHeight) ? feature.minHeight : 0;

      // TODO: Add floor/level-based heights
      // << rounds the height down
      // var height = (feature.height * metersPerLevel * scalingFactor << 0);
      
      // Multiply height in meters by pixels per meter ratio at latitude
      height *= ppm.y;
      minHeight *= ppm.y;

      var extrudeSettings = { amount: height - minHeight, bevelEnabled: false };
      
      var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
      geom.computeFaceNormals();

      if (!minHeight && !options.preserveGroundFaces) {
        // Remove down-facing floor faces
        for (var i = geom.faces.length - 1; i >= 0; i--) {
          if (Math.abs(geom.faces[i].normal.z - 1) < Number.EPSILON) {
            geom.faces.splice(i, 1);
            geom.faceVertexUvs[0].splice(i, 1);
          }
        }
      }

      var mesh = new THREE.Mesh(geom);

      mesh.position.y = height;

      // Offset
      mesh.position.x = -1 * offset.x;
      mesh.position.z = -1 * offset.y;

      // Flip as they are up-side down
      mesh.rotation.x = 90 * Math.PI / 180;

      mesh.matrixAutoUpdate && mesh.updateMatrix();
      combinedGeom.merge(mesh.geometry, mesh.matrix);
    });

    // Move merged geom to 0,0 and return offset
    var offset = combinedGeom.center();

    //TODO: save a more compact model using indices. Requires replacing fromGeometry with custom code
    var exportedGeom = new THREE.BufferGeometry();
    exportedGeom.fromGeometry(combinedGeom);

    // Store geom typed array as Three.js model object
    var model = {
      offset: offset
    };

    var transfers = [];
    exportedGeom.attributesKeys.forEach(function (key) {
      model[key] = exportedGeom.attributes[key].array;
      transfers.push(model[key].buffer);
    });

    deferred.transferResolve(model, transfers);
  };

  VIZI.BlueprintOutputBuildingTiles.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());