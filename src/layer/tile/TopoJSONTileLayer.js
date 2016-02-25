import TileLayer from './TileLayer';
import extend from 'lodash.assign';
import TopoJSONTile from './TopoJSONTile';
import throttle from 'lodash.throttle';
import THREE from 'three';

class TopoJSONTileLayer extends TileLayer {
  constructor(path, options) {
    var defaults = {
      maxLOD: 14,
      distance: 2000
    };

    options = extend(defaults, options);

    super(options);

    this._path = path;
  }

  _onAdd(world) {
    super._onAdd(world);

    // Trigger initial quadtree calculation on the next frame
    //
    // TODO: This is a hack to ensure the camera is all set up - a better
    // solution should be found
    setTimeout(() => {
      this._calculateLOD();
      this._initEvents();
    }, 0);
  }

  _initEvents() {
    // Run LOD calculations based on render calls
    //
    // Throttled to 1 LOD calculation per 100ms
    this._throttledWorldUpdate = throttle(this._onWorldUpdate, 100);

    this._world.on('preUpdate', this._throttledWorldUpdate, this);
    this._world.on('move', this._onWorldMove, this);
  }

  _onWorldUpdate() {
    this._calculateLOD();
  }

  _onWorldMove(latlon, point) {}

  _createTile(quadcode, layer) {
    var options = {};

    if (this._options.filter) {
      options.filter = this._options.filter;
    }

    if (this._options.style) {
      options.style = this._options.style;
    }

    return TopoJSONTile(quadcode, this._path, layer, options);
  }

  // Destroys the layer and removes it from the scene and memory
  destroy() {
    this._world.off('preUpdate', this._throttledWorldUpdate);
    this._world.off('move', this._onWorldMove);

    this._throttledWorldUpdate = null;

    // Run common destruction logic from parent
    super.destroy();
  }
}

// Initialise without requiring new keyword
export default function(path, options) {
  return new TopoJSONTileLayer(path, options);
};
