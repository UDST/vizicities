/*
 * Proj4 support for any projection.
 */

import proj4 from 'proj4';
import {latLon as LatLon} from '../LatLon';
import {point as Point} from '../Point';

const Proj4 = function(def, bounds) {
  var proj = proj4(def);

  var project = function(latlon) {
    return Point(proj.forward([latlon.lon, latlon.lat]));
  };

  var unproject = function(point) {
    var inverse = proj.inverse([point.x, point.y]);
    return LatLon(inverse[1], inverse[0]);
  };

  return {
    project: project,
    unproject: unproject,

    // Scale factor for converting between real metres and projected metres\
    //
    // Need to work out the best way to provide the pointScale calculations
    // for custom, unknown projections (if wanting to override default)
    //
    // For now, user can manually override crs.pointScale or
    // crs.projection.pointScale
    //
    // projectedMetres = realMetres * pointScale
    // realMetres = projectedMetres / pointScale
    pointScale: function(latlon, accurate) {
      return [1, 1];
    },

    // Try and calculate bounds if none are provided
    //
    // This will provide incorrect bounds for some projections, so perhaps make
    // bounds a required input instead
    bounds: (function() {
      if (bounds) {
        return bounds;
      } else {
        var bottomLeft = project([-90, -180]);
        var topRight = project([90, 180]);

        return [bottomLeft, topRight];
      }
    })()
  };
};

export default Proj4;
