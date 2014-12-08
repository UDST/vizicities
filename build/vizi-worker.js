/*! ViziCities - v0.2.0 - 2014-11-27 */
/**
 * Namespace for ViziCities
 * @author Robin Hawkes - vizicities.com
 */

// Hack to give worker access to VIZI global
if (typeof window === undefined) {
  var VIZI;
}

(function() {
  "use strict";

  var _VIZI = {
    VERSION: "0.2.0",
    DEBUG: false
  };

  // Output ASCII logo
  console.log("═════════════════════════════════════════════════════════════");
  console.log("██╗   ██╗██╗███████╗██╗ ██████╗██╗████████╗██╗███████╗███████╗");
  console.log("██║   ██║██║╚══███╔╝██║██╔════╝██║╚══██╔══╝██║██╔════╝██╔════╝");
  console.log("██║   ██║██║  ███╔╝ ██║██║     ██║   ██║   ██║█████╗  ███████╗");
  console.log("╚██╗ ██╔╝██║ ███╔╝  ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║");
  console.log(" ╚████╔╝ ██║███████╗██║╚██████╗██║   ██║   ██║███████╗███████║");
  console.log("  ╚═══╝  ╚═╝╚══════╝╚═╝ ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝");
  console.log("═══════════════════════════ " + _VIZI.VERSION + " ═══════════════════════════");

  // List any constants or helper functions here, like:
  // https://github.com/mrdoob/three.js/blob/master/src/Three.js

  // Hack to give worker access to VIZI global
  if (typeof window === undefined) {
    // Expose VIZI to the window
    window.VIZI = _VIZI;
  } else {
    VIZI = _VIZI;
  }
}());
/* globals window, _, VIZI, proj4 */

/**
 * Coordinate reference system
 * Inspired by Leaflet's CRS management
 * CRS reference: http://epsg.io/
 * Coordinate conversion from:
 * http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/
 * http://stackoverflow.com/questions/12896139/geographic-coordinates-converter
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  var EARTH_DIAMETER = 2 * 6378137;
  var EARTH_CIRCUMFERENCE = Math.PI * EARTH_DIAMETER;
  var ORIGIN_SHIFT = EARTH_CIRCUMFERENCE / 2;

  // TODO: Handle non-EPSG:3857 coordinate projection to and from pixels
  // TODO: Create a method to get meters-to-pixels ratio for heights (like buildings) - resolution() doesn't seem to be right for this case
  VIZI.CRS = {
    code: undefined,
    tileSize: 256,

    // Project WGS84 coordinates into pixel positions
    // TODO: Project non-EPSG:3857 CRS into EPSG:3857 for pixel coords
    latLonToPoint: function(latLon, zoom, options) {
      var self = this;

      options = options || {};
    
      _.defaults(options, {
        convert: true,
        round: false
      });

      var projected = self.project(latLon);
      var resolution = self.resolution(zoom);

      var point;
      if (options.round === true) {
        // TODO: Should rounding be performed? What ramifications does this have?
        // - WebGL 'pixels' aren't quite the same as screen pixels so non-integers should be ok (and more accurate)
        point = new VIZI.Point(
          Math.round((projected[0] + ORIGIN_SHIFT) / resolution),
          Math.round((projected[1] + ORIGIN_SHIFT) / resolution)
        );
      } else {
        point = new VIZI.Point(
          (projected[0] + ORIGIN_SHIFT) / resolution,
          (projected[1] + ORIGIN_SHIFT) / resolution
        );
      }

      if (options.convert !== false) {
        // Convert point so origin is top-left not bottom-left
        var mapSize = self.tileSize << zoom;
        point.y = mapSize - point.y;
      }

      return point;
    },

    // Project pixel positions into WGS84 coordinates
    // TODO: Project into EPSG:3857 coords before projecting into CRS
    pointToLatLon: function(point, zoom) {
      var self = this;
      var resolution = self.resolution(zoom);

      var mapSize = self.tileSize << zoom;
      
      var crsPoint = new VIZI.Point(
        point.x * resolution - ORIGIN_SHIFT,
        // Convert point so origin is bottom-left not top-left
        (mapSize - point.y) * resolution - ORIGIN_SHIFT
      );

      var unprojected = self.unproject(crsPoint);

      return new VIZI.LatLon(unprojected[1], unprojected[0]);
    },

    // Google tile bounds in WGS84 coords
    tileBoundsLatLon: function(tile, zoom) {
      var self = this;
      var min = self.pointToLatLon({x: tile.x * self.tileSize, y: tile.y * self.tileSize}, zoom);
      var max = self.pointToLatLon({x: (tile.x+1) * self.tileSize, y: (tile.y+1) * self.tileSize}, zoom);

      var bounds = {
        n: min.lat,
        e: max.lon,
        s: max.lat,
        w: min.lon
      };

      return bounds;
    },

    // Google tile bounds in pixel positions
    tileBoundsPoint: function(tile, zoom) {
      var self = this;
      var min = self.pointToLatLon({x: tile.x * self.tileSize, y: tile.y * self.tileSize}, zoom);
      var max = self.pointToLatLon({x: (tile.x+1) * self.tileSize, y: (tile.y+1) * self.tileSize}, zoom);

      var projectedMin = self.latLonToPoint(min, zoom);
      var projectedMax = self.latLonToPoint(max, zoom);

      var bounds = {
        n: Math.round(projectedMin.y),
        e: Math.round(projectedMax.x),
        s: Math.round(projectedMax.y),
        w: Math.round(projectedMin.x)
      };

      return bounds;
    },

     // Convert pixel point to Google tile
    // TODO: Convert to VIZI.Point
    pointToTile: function(point) {
      var self = this;
      var tile = new VIZI.Point(
        Math.ceil(point.x / self.tileSize) - 1,
        Math.ceil(point.y / self.tileSize) - 1
      );

      return tile;
    },

    // Convert pixel point to TMS tile
    // TODO: Convert to VIZI.Point
    pointToTileTMS: function(point, zoom) {
      var self = this;
      var tile = self.pointToTile(point);

      return self.convertTile(tile, zoom);
    },

    // Convert WGS84 coordinates to Google tile
    latLonToTile: function(latLon, zoom) {
      var self = this;
      var point = self.latLonToPoint(latLon, zoom);
      
      return self.pointToTile(point);
    },

    // Convert WGS84 coordinates to TMS tile
    latLonToTileTMS: function(latLon, zoom) {
      var self = this;

      // Don't move point origin to top-left as we're using TMS
      var point = self.latLonToPoint(latLon, zoom, {convert: false});
      
      return self.pointToTile(point);
    },

    // Find WGS84 coordinates of Google tile center 
    tileToLatLon: function(tile, zoom) {
      var self = this;
      var bounds = self.tileBoundsLatLon(tile, zoom);
      return new VIZI.LatLon(
        bounds.s + (bounds.n - bounds.s) / 2,
        bounds.w + (bounds.e - bounds.w) / 2
      );
    },

    // Convert either way between TMS tile and Google tile
    // TODO: Convert to VIZI.Point
    convertTile: function(tile, zoom) {
      return new VIZI.Point(tile.x, (Math.pow(2, zoom) - 1) - tile.y);
    },

    // Convert WGS84 coordinates into CRS
    project: function(latLon) {
      var self = this;
      return proj4(self.code, [latLon.lon, latLon.lat]);
    },

    // Convert CRS into WGS84 coordinates
    unproject: function(point) {
      var self = this;
      return proj4(self.code).inverse([point.x, point.y]);
    },

    // Map resolution (meters per pixel) for a given zoom
    resolution: function(zoom) {
      var self = this;
      return EARTH_CIRCUMFERENCE / (self.tileSize * Math.pow(2, zoom));
    },

    // Distance in meters between two WGS84 coordinates
    // http://www.movable-type.co.uk/scripts/latlong.html
    // http://stackoverflow.com/questions/4102520/how-to-transform-a-distance-from-degrees-to-metres
    // http://jsperf.com/haversine-salvador/5
    distance: function(latLon1, latLon2) {
      var deg2rad = 0.017453292519943295; // === Math.PI / 180
      var cos = Math.cos;
      var lat1 = latLon1.lat * deg2rad;
      var lon1 = latLon1.lon * deg2rad;
      var lat2 = latLon2.lat * deg2rad;
      var lon2 = latLon2.lon * deg2rad;
      // var diam = 12742; // Diameter of the earth in km (2 * 6371)
      var diam = EARTH_DIAMETER; // Diameter of the earth in meters
      var dLat = lat2 - lat1;
      var dLon = lon2 - lon1;
      var a = (
         (1 - cos(dLat)) + 
         (1 - cos(dLon)) * cos(lat1) * cos(lat2)
      ) / 2;

      return diam * Math.asin(Math.sqrt(a));
    },

    // http://gis.stackexchange.com/questions/75528/length-of-a-degree-where-do-the-terms-in-this-formula-come-from
    metersPerDegree: function(latLon) {
      // Convert latitude to radians
      var lat = latLon.lat * Math.PI / 180;

      // Set up "Constants"
      var m1 = 111132.92; // latitude calculation term 1
      var m2 = -559.82; // latitude calculation term 2
      var m3 = 1.175; // latitude calculation term 3
      var m4 = -0.0023; // latitude calculation term 4
      var p1 = 111412.84; // longitude calculation term 1
      var p2 = -93.5; // longitude calculation term 2
      var p3 = 0.118; // longitude calculation term 3

      // Calculate the length of a degree of latitude and longitude in meters
      var latLen = m1 + (m2 * Math.cos(2 * lat)) + (m3 * Math.cos(4 * lat)) + (m4 * Math.cos(6 * lat));

      var lonLen = (p1 * Math.cos(lat)) + (p2 * Math.cos(3 * lat)) + (p3 * Math.cos(5 * lat));

      return new VIZI.Point(Math.abs(lonLen), Math.abs(latLen));
    },

    pixelsPerDegree: function(latLon, zoom) {
      var self = this;

      // Find pixel position for latLon
      var point1 = self.latLonToPoint(latLon, zoom);

      // Find pixel position for latLon + 1
      var point2 = self.latLonToPoint(new VIZI.LatLon(latLon.lat + 1, latLon.lon + 1), zoom);

      // Find pixel length for a degree
      return new VIZI.Point(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
    },

    pixelsPerMeter: function(latLon, zoom) {
      var self = this;

      // Find meter length for a degree
      var meters = self.metersPerDegree(latLon);

      // Find pixel length for a degree
      var pixels = self.pixelsPerDegree(latLon, zoom);

      // Find ratio of pixels per meter at lonLat
      return new VIZI.Point(pixels.x / meters.x, pixels.y / meters.y);
    },

    // These formulas are pretty hacky, though they'll probably do the job
    // Altitude is in meters
    altitudeToZoom: function(altitude) {
      // https://gist.github.com/panzi/6694200
      // var zoom = Math.floor(19 - Math.log(altitude / 1000) / Math.LN2);

      // https://social.msdn.microsoft.com/Forums/en-US/5454d549-5eeb-43a5-b188-63121d3f0cc1/how-to-set-zoomlevel-for-particular-altitude?forum=bingmaps
      var zoom = 19 - Math.log2(altitude * 0.05);

      // http://stackoverflow.com/a/13159839
      // var scale = altitude / 500;
      // var zoom = (19 - Math.log(scale) / Math.log(2));

      return zoom < 0 ? 0 : zoom > 20 ? 20 : zoom;
    }
  };
}());
/* globals window, _, VIZI, proj4 */

/**
 * Spherical mercator CRS - EPSG:3857 (aka. EPSG:900913)
 * More info: http://epsg.io/3857
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.CRS.EPSG3857 = _.extend({}, VIZI.CRS, {
    code: "EPSG:3857"
  });

  VIZI.CRS.EPSG900913 = _.extend({}, VIZI.CRS.EPSG3857, {
    code: "EPSG:900913"
  });
}());
/* globals window, _, VIZI */

/**
 * lat,lon,alt coordinates
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.LatLon = function(lat, lon, alt) {
    var self = this;

    self.lat = lat || 0;
    self.lon = lon || 0;
    self.alt = alt || 0; // Meters

    // Copy if already a VIZI.LatLon instance
    if (lat instanceof VIZI.LatLon) {
      self.lat = lat.lat;
      self.lon = lat.lon;
      self.alt = lat.alt;
    } else if (_.isArray(lat)) {
      self.lat = lat[0];
      self.lon = lat[1];
      self.alt = lat[2] || 0;
    }
  };
})();
/* globals window, _, VIZI */

/**
 * X,Y,Z coordinates
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Point = function(x, y, z) {
    var self = this;

    self.x = x || 0;
    self.y = y || 0;
    self.z = z || 0;

    // Copy if already a VIZI.Point instance
    if (x instanceof VIZI.Point) {
      self.x = x.x;
      self.y = x.y;
      self.z = x.z;
    } else if (_.isArray(x)) {
      self.x = x[0];
      self.y = x[1];
      self.z = x[2] || 0;
    }
  };

  // Creates a copy
  VIZI.Point.prototype.add = function(point) {
    var self = this;

    var add = new VIZI.Point(
      self.x + point.x,
      self.y + point.y,
      self.z + point.z
    );

    return add;
  };

  // Creates a copy
  VIZI.Point.prototype.subtract = function(point) {
    var self = this;

    var subtract = new VIZI.Point(
      self.x - point.x,
      self.y - point.y,
      self.z - point.z
    );

    return subtract;
  };
})();