/*
 * CRS.Proj4 for any Proj4-supported CRS.
 */

import extend from 'lodash.assign';
import Earth from './CRS.Earth';
import Proj4Projection from '../projection/Projection.Proj4';
import Transformation from '../../util/Transformation';

var _Proj4 = function(code, def, bounds) {
  var projection = Proj4Projection(def, bounds);

  // Transformation calcuations
  var diffX = projection.bounds[1][0] - projection.bounds[0][0];
  var diffY = projection.bounds[1][1] - projection.bounds[0][1];

  var halfX = diffX / 2;
  var halfY = diffY / 2;

  // This is the raw scale factor
  var scaleX = 1 / halfX;
  var scaleY = 1 / halfY;

  // Find the minimum scale factor
  //
  // The minimum scale factor comes from the largest side and is the one
  // you want to use for both axis so they stay relative in dimension
  var scale = Math.min(scaleX, scaleY);

  // Find amount to offset each axis by to make the central point lie on
  // the [0,0] origin
  var offsetX = scale * (projection.bounds[0][0] + halfX);
  var offsetY = scale * (projection.bounds[0][1] + halfY);

  return {
    code: code,
    projection: projection,

    transformScale: scale,

    // Map the input to a [-1,1] range with [0,0] in the centre
    transformation: new Transformation(scale, -offsetX, -scale, offsetY)
  };
};

const Proj4 = function(code, def, bounds) {
  return extend({}, Earth, _Proj4(code, def, bounds));
};

export default Proj4;
