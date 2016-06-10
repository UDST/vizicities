import GeoJSONTileLayer from './GeoJSONTileLayer';
import extend from 'lodash.assign';

class TopoJSONTileLayer extends GeoJSONTileLayer {
  constructor(path, options) {
    var defaults = {
      topojson: true
    };

    options = extend({}, defaults, options);

    super(path, options);
  }
}

export default TopoJSONTileLayer;

var noNew = function(path, options) {
  return new TopoJSONTileLayer(path, options);
};

export {noNew as topoJSONTileLayer};
