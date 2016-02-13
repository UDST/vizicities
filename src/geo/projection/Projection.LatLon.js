/*
 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326
 * and Simple.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.LonLat.js
 */

import LatLon from '../LatLon';
import Point from '../Point';

const ProjectionLatLon = {
  project: function(latlon) {
    return Point(latlon.lon, latlon.lat);
  },

  unproject: function(point) {
    return LatLon(point.y, point.x);
  },

  // Scale factor for converting between real metres and degrees
  //
  // degrees = realMetres * pointScale
  // realMetres = degrees / pointScale
  //
  // See: http://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
  // See: http://gis.stackexchange.com/questions/75528/length-of-a-degree-where-do-the-terms-in-this-formula-come-from
  pointScale: function(latlon) {
    var m1 = 111132.92;
    var m2 = -559.82;
    var m3 = 1.175;
    var m4 = -0.0023;
    var p1 = 111412.84;
    var p2 = -93.5;
    var p3 = 0.118;

    var rad = Math.PI / 180;
    var lat = latlon.lat * rad;

    var latlen = m1 + m2 * Math.cos(2 * lat) + m3 * Math.cos(4 * lat) + m4 * Math.cos(6 * lat);
    var lonlen = p1 * Math.cos(lat) + p2 * Math.cos(3 * lat) + p3 * Math.cos(5 * lat);

    return [1 / latlen, 1 / lonlen];
  },

  bounds: [[-180, -90], [180, 90]]
};

export default ProjectionLatLon;
