import GeoJSONLayer from './GeoJSONLayer';
import extend from 'lodash.assign';

// Initialise without requiring new keyword
export default function(topojson, options) {
  var defaults = {
    topojson: true
  };

  options = extend({}, defaults, options);

  return GeoJSONLayer(topojson, options);
};
