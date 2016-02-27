import GeoJSONTileLayer from './GeoJSONTileLayer';
import extend from 'lodash.assign';

// Initialise without requiring new keyword
export default function(path, options) {
  var defaults = {
    topojson: true
  };

  options = extend(defaults, options);

  return GeoJSONTileLayer(path, options);
};
