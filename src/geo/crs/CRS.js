/*
 * CRS is the base object for all defined CRS (Coordinate Reference Systems)
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.js
 */

import LatLon from '../LatLon';
import Point from '../Point';
import wrapNum from '../../util/wrapNum';

const CRS = {
  // Scale factor determines final dimensions of world space
  //
  // Projection transformation in range -1 to 1 is multiplied by scale factor to
  // find final world coordinates
  //
  // Scale factor can be considered as half the amount of the desired dimension
  // for the largest side when transformation is equal to 1 or -1, or as the
  // distance between 0 and 1 on the largest side
  //
  // For example, if you want the world dimensions to be between -1000 and 1000
  // then the scale factor will be 1000
  scaleFactor: 1000,

  // Converts geo coords to pixel / WebGL ones
  latLonToPoint: function(latlon, zoom) {
    var projectedPoint = this.projection.project(latlon);
    var scale = this.scale(zoom);

    // Half scale if using zoom as WebGL origin is in the centre, not top left
    if (zoom) {
      scale /= 2;
    }

    return this.transformation._transform(projectedPoint, scale);
  },

  // Converts pixel / WebGL coords to geo coords
  pointToLatLon: function(point, zoom) {
    var scale = this.scale(zoom);

    // Half scale if using zoom as WebGL origin is in the centre, not top left
    if (zoom) {
      scale /= 2;
    }

    var untransformedPoint = this.transformation.untransform(point, scale);

    return this.projection.unproject(untransformedPoint);
  },

  // Converts geo coords to projection-specific coords (e.g. in meters)
  project: function(latlon) {
    return this.projection.project(latlon);
  },

  // Converts projected coords to geo coords
  unproject: function(point) {
    return this.projection.unproject(point);
  },

  // If zoom is provided, returns the map width in pixels for a given zoom
  // Else, provides fixed scale value
  scale: function(zoom) {
    // If zoom is provided then return scale based on map tile zoom
    if (zoom >= 0) {
      return 256 * Math.pow(2, zoom);
    // Else, return fixed scale value to expand projected coordinates from
    // their 0 to 1 range into something more practical
    } else {
      return this.scaleFactor;
    }
  },

  // Returns zoom level for a given scale value
  // This only works with a scale value that is based on map pixel width
  zoom: function(scale) {
    return Math.log(scale / 256) / Math.LN2;
  },

  // Returns the bounds of the world in projected coords if applicable
  getProjectedBounds: function(zoom) {
    if (this.infinite) { return null; }

    var b = this.projection.bounds;
    var s = this.scale(zoom);

    // Half scale if using zoom as WebGL origin is in the centre, not top left
    if (zoom) {
      s /= 2;
    }

    // Bottom left
    var min = this.transformation.transform(Point(b[0]), s);

    // Top right
    var max = this.transformation.transform(Point(b[1]), s);

    return [min, max];
  },

  // Whether a coordinate axis wraps in a given range (e.g. longitude from -180 to 180); depends on CRS
  // wrapLon: [min, max],
  // wrapLat: [min, max],

  // If true, the coordinate space will be unbounded (infinite in all directions)
  // infinite: false,

  // Wraps geo coords in certain ranges if applicable
  wrapLatLon: function(latlon) {
    var lat = this.wrapLat ? wrapNum(latlon.lat, this.wrapLat, true) : latlon.lat;
    var lon = this.wrapLon ? wrapNum(latlon.lon, this.wrapLon, true) : latlon.lon;
    var alt = latlon.alt;

    return LatLon(lat, lon, alt);
  }
};

export default CRS;
