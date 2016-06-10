/*
 * CRS.EPSG3395 (WGS 84 / World Mercator) CRS implementation.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG3395.js
 */

import extend from 'lodash.assign';
import Earth from './CRS.Earth';
import Mercator from '../projection/Projection.Mercator';
import Transformation from '../../util/Transformation';

var _EPSG3395 = {
  code: 'EPSG:3395',
  projection: Mercator,

  // Work out how to de-dupe this (scoping issue)
  transformScale: 1 / (Math.PI * Mercator.R),

  // Scale and transformation inputs changed to account for central origin in
  // WebGL, instead of top-left origin used in Leaflet
  transformation: (function() {
    // TODO: Cannot use this.transformScale due to scope
    var scale = 1 / (Math.PI * Mercator.R);

    return new Transformation(scale, 0, -scale, 0);
  }())
};

const EPSG3395 = extend({}, Earth, _EPSG3395);

export default EPSG3395;
