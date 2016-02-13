/*
 * CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG4326.js
 */

import extend from 'lodash.assign';
import Earth from './CRS.Earth';
import LatLonProjection from '../projection/Projection.LatLon';
import Transformation from '../../util/Transformation';

var _EPSG4326 = {
  code: 'EPSG:4326',
  projection: LatLonProjection,

  // Work out how to de-dupe this (scoping issue)
  transformScale: 1 / 180,

  // Scale and transformation inputs changed to account for central origin in
  // WebGL, instead of top-left origin used in Leaflet
  //
  // TODO: Cannot use this.transformScale due to scope
  transformation: new Transformation(1 / 180, 0, -1 / 180, 0)
};

const EPSG4326 = extend({}, Earth, _EPSG4326);

export default EPSG4326;
