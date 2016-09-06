import GeoJSONWorkerTileLayer from './GeoJSONWorkerTileLayer';
import extend from 'lodash.assign';

class TopoJSONWorkerTileLayer extends GeoJSONWorkerTileLayer {
  constructor(path, options) {
    var defaults = {
      topojson: true
    };

    options = extend({}, defaults, options);

    super(path, options);
  }
}

export default TopoJSONWorkerTileLayer;

var noNew = function(path, options) {
  return new TopoJSONWorkerTileLayer(path, options);
};

export {noNew as topoJSONWorkerTileLayer};
