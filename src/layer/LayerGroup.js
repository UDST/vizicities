import Layer from './Layer';
import extend from 'lodash.assign';

class LayerGroup extends Layer {
  constructor(options) {
    var defaults = {
      output: false
    };

    var _options = extend({}, defaults, options);

    super(_options);

    this._layers = [];
  }

  addLayer(layer) {
    this._layers.push(layer);
    this._world.addLayer(layer);
  }

  removeLayer(layer) {
    var layerIndex = this._layers.indexOf(layer);

    if (layerIndex > -1) {
      // Remove from this._layers
      this._layers.splice(layerIndex, 1);
    };

    this._world.removeLayer(layer);
  }

  _onAdd(world) {}

  // Destroy the layers and remove them from the scene and memory
  destroy() {
    // TODO: Sometimes this is already null, find out why
    if (this._layers) {
      for (var i = 0; i < this._layers.length; i++) {
        this._layers[i].destroy();
      }

      this._layers = null;
    }

    super.destroy();
  }
}

export default LayerGroup;

var noNew = function(options) {
  return new LayerGroup(options);
};

export {noNew as layerGroup};
