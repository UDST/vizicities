/*
 * Mercator projection that takes into account that the Earth is not a perfect
 * sphere. Less popular than spherical mercator; used by projections like
 * EPSG:3395.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.Mercator.js
 */

const Mercator = {
  // Radius / WGS84 semi-major axis
  R: 6378137,
  R_MINOR: 6356752.314245179,

  // WGS84 eccentricity
  ECC: 0.081819191,
  ECC2: 0.081819191 * 0.081819191,

  project: function(latlon) {
    var d = Math.PI / 180;
    var r = this.R;
    var y = latlon[0] * d;
    var tmp = this.R_MINOR / r;
    var e = Math.sqrt(1 - tmp * tmp);
    var con = e * Math.sin(y);

    var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
    y = -r * Math.log(Math.max(ts, 1E-10));

    return [latlon[1] * d * r, y];
  },

  unproject: function(point) {
    var d = 180 / Math.PI;
    var r = this.R;
    var tmp = this.R_MINOR / r;
    var e = Math.sqrt(1 - tmp * tmp);
    var ts = Math.exp(-point[1] / r);
    var phi = Math.PI / 2 - 2 * Math.atan(ts);

    for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
      con = e * Math.sin(phi);
      con = Math.pow((1 - con) / (1 + con), e / 2);
      dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
      phi += dphi;
    }

    return [phi * d, point[0] * d / r];
  },

  // Scale factor for converting between real metres and projected metres
  //
  // projectedMetres = realMetres * pointScale
  // realMetres = projectedMetres / pointScale
  //
  // See pg.8: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
  pointScale: function(latlon) {
    var rad = Math.PI / 180;
    var lat = latlon[0] * rad;
    var sinLat = Math.sin(lat);
    var sinLat2 = sinLat * sinLat;
    var cosLat = Math.cos(lat);

    var k = Math.sqrt(1 - this.ECC2 * sinLat2) / cosLat;

    // [scaleX, scaleY]
    return [k, k];
  },

  bounds: [[-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]]
};

export default Mercator;
