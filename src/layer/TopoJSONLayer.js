import GeoJSONLayer from './GeoJSONLayer';
import extend from 'lodash.assign';

class TopoJSONLayer extends GeoJSONLayer {
  constructor(topojson, options) {
    var defaults = {
      topojson: true
    };

    options = extend({}, defaults, options);

    super(topojson, options);
  }
}

export default TopoJSONLayer;

var noNew = function(topojson, options) {
  return new TopoJSONLayer(topojson, options);
};

// Initialise without requiring new keyword
export {noNew as topoJSONLayer};
