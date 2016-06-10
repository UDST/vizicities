/*
 * A simple CRS that can be used for flat non-Earth maps like panoramas or game
 * maps.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.Simple.js
 */

import extend from 'lodash.assign';
import CRS from './CRS';
import LatLonProjection from '../projection/Projection.LatLon';
import Transformation from '../../util/Transformation';

var _Simple = {
  projection: LatLonProjection,

  // Straight 1:1 mapping (-1, -1 would be top-left)
  transformation: new Transformation(1, 0, 1, 0),

  scale: function(zoom) {
    // If zoom is provided then return scale based on map tile zoom
    if (zoom) {
      return Math.pow(2, zoom);
    // Else, make no change to scale – may need to increase this or make it a
    // user-definable variable
    } else {
      return 1;
    }
  },

  zoom: function(scale) {
    return Math.log(scale) / Math.LN2;
  },

  distance: function(latlon1, latlon2) {
    var dx = latlon2.lon - latlon1.lon;
    var dy = latlon2.lat - latlon1.lat;

    return Math.sqrt(dx * dx + dy * dy);
  },

  infinite: true
};

const Simple = extend({}, CRS, _Simple);

export default Simple;
