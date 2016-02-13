/*
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS
 * used by default.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.SphericalMercator.js
 */

import LatLon from '../LatLon';
import Point from '../Point';

const SphericalMercator = {
  // Radius / WGS84 semi-major axis
  R: 6378137,
  MAX_LATITUDE: 85.0511287798,

  // WGS84 eccentricity
  ECC: 0.081819191,
  ECC2: 0.081819191 * 0.081819191,

  project: function(latlon) {
    var d = Math.PI / 180;
    var max = this.MAX_LATITUDE;
    var lat = Math.max(Math.min(max, latlon.lat), -max);
    var sin = Math.sin(lat * d);

    return Point(
      this.R * latlon.lon * d,
      this.R * Math.log((1 + sin) / (1 - sin)) / 2
    );
  },

  unproject: function(point) {
    var d = 180 / Math.PI;

    return LatLon(
      (2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
      point.x * d / this.R
    );
  },

  // Scale factor for converting between real metres and projected metres
  //
  // projectedMetres = realMetres * pointScale
  // realMetres = projectedMetres / pointScale
  //
  // Accurate scale factor uses proper Web Mercator scaling
  // See pg.9: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
  // See: http://jsfiddle.net/robhawkes/yws924cf/
  pointScale: function(latlon, accurate) {
    var rad = Math.PI / 180;

    var k;

    if (!accurate) {
      k = 1 / Math.cos(latlon.lat * rad);

      // [scaleX, scaleY]
      return [k, k];
    } else {
      var lat = latlon.lat * rad;
      var lon = latlon.lon * rad;

      var a = this.R;

      var sinLat = Math.sin(lat);
      var sinLat2 = sinLat * sinLat;

      var cosLat = Math.cos(lat);

      // Radius meridian
      var p = a * (1 - this.ECC2) / Math.pow(1 - this.ECC2 * sinLat2, 3 / 2);

      // Radius prime meridian
      var v = a / Math.sqrt(1 - this.ECC2 * sinLat2);

      // Scale N/S
      var h = (a / p) / cosLat;

      // Scale E/W
      k = (a / v) / cosLat;

      // [scaleX, scaleY]
      return [k, h];
    }
  },

  // Not using this.R due to scoping
  bounds: (function() {
    var d = 6378137 * Math.PI;
    return [[-d, -d], [d, d]];
  })()
};

export default SphericalMercator;
