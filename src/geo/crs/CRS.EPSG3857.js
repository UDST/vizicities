/*
 * CRS.EPSG3857 (WGS 84 / Pseudo-Mercator) CRS implementation.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG3857.js
 */

import extend from 'lodash.assign';
import Earth from './CRS.Earth';
import SphericalMercator from '../projection/Projection.SphericalMercator';
import Transformation from '../../util/Transformation';

var _EPSG3857 = {
  code: 'EPSG:3857',
  projection: SphericalMercator,

  // Work out how to de-dupe this (scoping issue)
  transformScale: 1 / (Math.PI * SphericalMercator.R),

  // Scale and transformation inputs changed to account for central origin in
  // WebGL, instead of top-left origin used in Leaflet
  transformation: (function() {
    // TODO: Cannot use this.transformScale due to scope
    var scale = 1 / (Math.PI * SphericalMercator.R);

    return new Transformation(scale, 0, -scale, 0);
  }())
};

const EPSG3857 = extend({}, Earth, _EPSG3857);

const EPSG900913 = extend({}, EPSG3857, {
  code: 'EPSG:900913'
});

export {EPSG900913};

export default EPSG3857;
