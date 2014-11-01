/* globals window, _, VIZI */

/**
 * Tile grid helper
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  // TODO: Define a hole so only tiles outside of that area are used / loaded
  VIZI.BlueprintHelperTileGrid = function(world, options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.BlueprintHelperTileGrid");

    var self = this;

    VIZI.EventEmitter.call(self);

    if (!world || !(world instanceof VIZI.World)) {
      throw new Error("Required world property missing");
    }

    self.world = world;

    self.options = options || {};

    _.defaults(self.options, {});

    if (!self.options.zoom) {
      throw new Error("Required options zoom property missing");
    }

    if (!self.options.cullZoom) {
      throw new Error("Required options cull zoom property missing");
    }

    if (self.options.tilesPerDirection === undefined) {
      throw new Error("Required options tiles per direction property missing");
    }

    self.disable = false;

    // Location of grid center
    self.centerTile = new VIZI.Point();
    self.centerTileLatLon = new VIZI.LatLon();

    // Tile size and zoom level
    self.tileZoom = self.options.zoom;

    // Zoom limit before hiding and disabling grid
    self.cullZoom = self.options.cullZoom;

    // Tiles per direction
    self.tilesPerDirection = self.options.tilesPerDirection;

    // Calculated pixel tile size
    // self.tileSize;

    // Grid bounds (in TMS values)
    self.bounds;

    // Grid bounds (lat, lon)
    self.boundsLatLon;

    self.tileCount;

    // List of tiles, ordered from center outwards
    self.tiles = [];

    // Grid movement difference since last mouse up
    self.gridDiffSinceMouseUp = new VIZI.Point();
  };

  VIZI.BlueprintHelperTileGrid.prototype = Object.create( VIZI.EventEmitter.prototype );

  // Set up and start grid
  // TODO: Immediately disable grid if beyond camera cull point
  // What's the best way of getting camera radius to here? Singleton?
  VIZI.BlueprintHelperTileGrid.prototype.init = function() {
    var self = this;

    var coords = self.world.center;

    if (VIZI.DEBUG) console.log("coords", coords);

    self.centerTile = self.world.crs.latLonToTile(coords, self.tileZoom);

    if (VIZI.DEBUG) console.log("centerTile", self.centerTile);

    self.centerTileLatLon = new VIZI.LatLon(self.world.center);

    if (VIZI.DEBUG) console.log("centerTileLatLon", self.centerTileLatLon);

    var centerTileBoundsPoint = self.world.crs.tileBoundsPoint(self.centerTile, self.tileZoom);

    if (VIZI.DEBUG) console.log("centerTileBoundsPoint", centerTileBoundsPoint);

    self.bounds = self.getBounds(self.tilesPerDirection);
    self.boundsLatLon = self.getBoundsLatLon(self.bounds);

    if (VIZI.DEBUG) console.log("bounds", self.bounds);
    if (VIZI.DEBUG) console.log("boundsLatLon", self.boundsLatLon);

    self.tileCount = new VIZI.Point(self.bounds.e - self.bounds.w + 1, self.bounds.s - self.bounds.n + 1);

    if (VIZI.DEBUG) console.log("tileCount", self.tileCount);

    // TODO: Hook into VIZI.Controls.Mouse or at least use correct DOM element
    // Could do with panControlStart and panControlEnd events
    document.body.addEventListener("mouseup", function(event) {
      self.onMouseUp(event);
    }, false);

    // TODO: Convert to VIZI.Messenger format
    // TODO: Listen for a zoom event from the camera to handle hiding of objects at distance
    // self.subscribe("zoomChanged", self.onZoomChanged);

    VIZI.Messenger.on("world:updateView", function(center, zoom) {
      self.onWorldUpdate(center, zoom);
    });

    self.collectTiles();
    
    return self.tiles;
  };

  VIZI.BlueprintHelperTileGrid.prototype.collectTiles = function() {
    var self = this;

    var tiles = [];

    // Rows
    for (var i = 0; i < self.tileCount.x; i++) {
      // Columns
      for (var j = 0; j < self.tileCount.y; j++) {
        var tileData = {
          x: self.bounds.w + j,
          y: self.bounds.n + i,
          z: self.tileZoom,
          distance: 0,
          localCoords: new VIZI.Point()
        };

        tileData.localCoords = self.globalToLocalTiles(tileData.x, tileData.y);

        tileData.distance = Math.abs(self.centerTile.x - tileData.x) + Math.abs(self.centerTile.y - tileData.y);

        tiles.push(tileData);
      }
    }

    // Sort tiles by distance from center
    tiles.sort(function(a, b) {
      if (a.distance < b.distance) {
        return -1;
      }

      if (a.distance > b.distance) {
        return 1;
      }

      return 0;
    });

    self.tiles = tiles;
  };

  // Should be covered in VIZI.CRS, just not with the tileDistance bit
  VIZI.BlueprintHelperTileGrid.prototype.getBounds = function(tileDistance) {
    var self = this;
    var bounds = {
      n: Math.floor(self.centerTile.y) - tileDistance,
      e: Math.ceil(self.centerTile.x) + tileDistance,
      s: Math.ceil(self.centerTile.y) + tileDistance,
      w: Math.floor(self.centerTile.x) - tileDistance
    };

    return bounds;
  };

  // Should be covered in VIZI.CRS, just not with the ability to convert point bounds
  VIZI.BlueprintHelperTileGrid.prototype.getBoundsLatLon = function(bounds) {
    var self = this;
    var max = self.world.crs.tileBoundsLatLon(new VIZI.Point(bounds.e, bounds.n), self.tileZoom);
    var min = self.world.crs.tileBoundsLatLon(new VIZI.Point(bounds.w, bounds.s), self.tileZoom);

    var boundsLatLon = {
      n: max.n,
      e: max.e,
      s: min.s,
      w: min.w
    };

    return boundsLatLon;
  };

  // TODO: Move onZoomChanged logic into here
  VIZI.BlueprintHelperTileGrid.prototype.onWorldUpdate = function(center, zoom) {
    var self = this;

    var centerTile = self.world.crs.latLonToTile(center, self.tileZoom);

    var gridDiff = new VIZI.Point(
      Math.floor(centerTile.x) - Math.floor(self.centerTile.x),
      Math.floor(centerTile.y) - Math.floor(self.centerTile.y)
    );

    if (Math.abs(gridDiff.x) > 0 || Math.abs(gridDiff.y) > 0) {
      self.centerTile = centerTile;

      self.centerTileLatLon = new VIZI.LatLon(self.world.center);

      self.bounds = self.getBounds(self.tilesPerDirection);
      self.boundsLatLon = self.getBoundsLatLon(self.bounds);

      self.gridDiffSinceMouseUp.x += gridDiff.x;
      self.gridDiffSinceMouseUp.y += gridDiff.y;

      self.collectTiles();
    }

    if (zoom < self.cullZoom) {
      if (!self.disable) {
        // Disable grid
        self.disable = true;
        self.emit("disabled");
      }
    } else {
      if (self.disable) {
        // Enable grid
        self.disable = false;
        self.emit("enabled");
      }
    }
  };

  VIZI.BlueprintHelperTileGrid.prototype.onMouseUp = function(event) {
    var self = this;

    // If grid has moved (there's an offset) then move grid mesh and update tiles
    if (Math.abs(self.gridDiffSinceMouseUp.x) > 0 || Math.abs(self.gridDiffSinceMouseUp.y) > 0) {
      // self.onGridMove(self.gridDiffSinceMouseUp);
      self.emit("moved", self.tiles, self.gridDiffSinceMouseUp);

      self.gridDiffSinceMouseUp = new VIZI.Point();
    }
  };

  VIZI.BlueprintHelperTileGrid.prototype.globalToLocalTiles = function(x, y) {
    var self = this;
    return new VIZI.Point(x - self.bounds.w, y - self.bounds.n);
  };
}());