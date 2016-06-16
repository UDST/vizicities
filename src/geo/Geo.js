import {latLon as LatLon} from './LatLon';
import {point as Point} from './Point';

var Geo = {};

// Radius / WGS84 semi-major axis
Geo.R = 6378137;
Geo.MAX_LATITUDE = 85.0511287798;

// WGS84 eccentricity
Geo.ECC = 0.081819191;
Geo.ECC2 = 0.081819191 * 0.081819191;

Geo.project = function(latlon) {
  var d = Math.PI / 180;
  var max = Geo.MAX_LATITUDE;
  var lat = Math.max(Math.min(max, latlon.lat), -max);
  var sin = Math.sin(lat * d);

  return Point(
    Geo.R * latlon.lon * d,
    Geo.R * Math.log((1 + sin) / (1 - sin)) / 2
  );
},

Geo.unproject = function(point) {
  var d = 180 / Math.PI;

  return LatLon(
    (2 * Math.atan(Math.exp(point.y / Geo.R)) - (Math.PI / 2)) * d,
    point.x * d / Geo.R
  );
};

// Converts geo coords to pixel / WebGL ones
// This just reverses the Y axis to match WebGL
Geo.latLonToPoint = function(latlon) {
  var projected = Geo.project(latlon);
  projected.y *= -1;

  return projected;
};

// Converts pixel / WebGL coords to geo coords
// This just reverses the Y axis to match WebGL
Geo.pointToLatLon = function(point) {
  var _point = Point(point.x, point.y * -1);
  return Geo.unproject(_point);
};

// Scale factor for converting between real metres and projected metres
//
// projectedMetres = realMetres * pointScale
// realMetres = projectedMetres / pointScale
//
// Accurate scale factor uses proper Web Mercator scaling
// See pg.9: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
// See: http://jsfiddle.net/robhawkes/yws924cf/
Geo.pointScale = function(latlon, accurate) {
  var rad = Math.PI / 180;

  var k;

  if (!accurate) {
    k = 1 / Math.cos(latlon.lat * rad);

    // [scaleX, scaleY]
    return [k, k];
  } else {
    var lat = latlon.lat * rad;
    var lon = latlon.lon * rad;

    var a = Geo.R;

    var sinLat = Math.sin(lat);
    var sinLat2 = sinLat * sinLat;

    var cosLat = Math.cos(lat);

    // Radius meridian
    var p = a * (1 - Geo.ECC2) / Math.pow(1 - Geo.ECC2 * sinLat2, 3 / 2);

    // Radius prime meridian
    var v = a / Math.sqrt(1 - Geo.ECC2 * sinLat2);

    // Scale N/S
    var h = (a / p) / cosLat;

    // Scale E/W
    k = (a / v) / cosLat;

    // [scaleX, scaleY]
    return [k, h];
  }
};

// Convert real metres to projected units
//
// Latitude scale is chosen because it fluctuates more than longitude
Geo.metresToProjected = function(metres, pointScale) {
  return metres * pointScale[1];
};

// Convert projected units to real metres
//
// Latitude scale is chosen because it fluctuates more than longitude
Geo.projectedToMetres = function(projectedUnits, pointScale) {
  return projectedUnits / pointScale[1];
};

// Convert real metres to a value in world (WebGL) units
Geo.metresToWorld = function(metres, pointScale) {
  // Transform metres to projected metres using the latitude point scale
  //
  // Latitude scale is chosen because it fluctuates more than longitude
  var projectedMetres = Geo.metresToProjected(metres, pointScale);

  var scale = Geo.scale();

  // Scale projected metres
  var scaledMetres = (scale * projectedMetres);

  return scaledMetres;
};

// Convert world (WebGL) units to a value in real metres
Geo.worldToMetres = function(worldUnits, pointScale) {
  var scale = Geo.scale();

  var projectedUnits = worldUnits / scale;
  var realMetres = Geo.projectedToMetres(projectedUnits, pointScale);

  return realMetres;
};

// If zoom is provided, returns the map width in pixels for a given zoom
// Else, provides fixed scale value
Geo.scale = function(zoom) {
  // If zoom is provided then return scale based on map tile zoom
  if (zoom >= 0) {
    return 256 * Math.pow(2, zoom);
  // Else, return fixed scale value to expand projected coordinates from
  // their 0 to 1 range into something more practical
  } else {
    return 1;
  }
};

// Returns zoom level for a given scale value
// This only works with a scale value that is based on map pixel width
Geo.zoom = function(scale) {
  return Math.log(scale / 256) / Math.LN2;
};

// Distance between two geographical points using spherical law of cosines
// approximation or Haversine
//
// See: http://www.movable-type.co.uk/scripts/latlong.html
Geo.distance = function(latlon1, latlon2, accurate) {
  var rad = Math.PI / 180;

  var lat1;
  var lat2;

  var a;

  if (!accurate) {
    lat1 = latlon1.lat * rad;
    lat2 = latlon2.lat * rad;

    a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlon2.lon - latlon1.lon) * rad);

    return Geo.R * Math.acos(Math.min(a, 1));
  } else {
    lat1 = latlon1.lat * rad;
    lat2 = latlon2.lat * rad;

    var lon1 = latlon1.lon * rad;
    var lon2 = latlon2.lon * rad;

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var halfDeltaLat = deltaLat / 2;
    var halfDeltaLon = deltaLon / 2;

    a = Math.sin(halfDeltaLat) * Math.sin(halfDeltaLat) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(halfDeltaLon) * Math.sin(halfDeltaLon);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Geo.R * c;
  }
};

Geo.bounds = (function() {
  var d = Geo.R * Math.PI;
  return [[-d, -d], [d, d]];
})();

export default Geo;
