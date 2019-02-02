import GeoJSONWorkerLayer from './GeoJSONWorkerLayer';
import extend from 'lodash.assign';

class TopoJSONWorkerLayer extends GeoJSONWorkerLayer {
  constructor(topojson, options) {
    var defaults = {
      topojson: true
    };

    options = extend({}, defaults, options);

    super(topojson, options);
  }
}

export default TopoJSONWorkerLayer;

var noNew = function(topojson, options) {
  return new TopoJSONWorkerLayer(topojson, options);
};

// Initialise without requiring new keyword
export {noNew as topoJSONWorkerLayer};
