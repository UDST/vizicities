import TileLayer from './TileLayer';
import extend from 'lodash.assign';
import GeoJSONTile from './GeoJSONTile';
import throttle from 'lodash.throttle';
import THREE from 'three';

// TODO: Offer on-the-fly slicing of static, non-tile-based GeoJSON files into a
// tile grid using geojson-vt
//
// See: https://github.com/mapbox/geojson-vt

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// TODO: Consider pausing per-frame output during movement so there's little to
// no jank caused by previous tiles still processing

// This tile layer only updates the quadtree after world movement has occurred
//
// Tiles from previous quadtree updates are updated and outputted every frame
// (or at least every frame, throttled to some amount)
//
// This is because the complexity of TopoJSON tiles requires a lot of processing
// and so makes movement janky if updates occur every frame – only updating
// after movement means frame drops are less obvious due to heavy processing
// occurring while the view is generally stationary
//
// The downside is that until new tiles are requested and outputted you will
// see blank spaces as you orbit and move around
//
// An added benefit is that it dramatically reduces the number of tiles being
// requested over a period of time and the time it takes to go from request to
// screen output
//
// It may be possible to perform these updates per-frame once Web Worker
// processing is added

class GeoJSONTileLayer extends TileLayer {
  constructor(path, options) {
    var defaults = {
      maxLOD: 14,
      distance: 30000
    };

    options = extend({}, defaults, options);

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
    this._world.on('controlsMove', this._onControlsMove, this);
  }

  // Update and output tiles each frame (throttled)
  _onWorldUpdate() {
    if (this._pauseOutput) {
      return;
    }

    this._outputTiles();
  }

  // Update tiles grid after world move, but don't output them
  _onWorldMove(latlon, point) {
    this._pauseOutput = false;
    this._calculateLOD();
  }

  // Pause updates during control movement for less visual jank
  _onControlsMove() {
    this._pauseOutput = true;
  }

  _createTile(quadcode, layer) {
    var options = {};

    // if (this._options.filter) {
    //   options.filter = this._options.filter;
    // }
    //
    // if (this._options.style) {
    //   options.style = this._options.style;
    // }
    //
    // if (this._options.topojson) {
    //   options.topojson = true;
    // }
    //
    // if (this._options.interactive) {
    //   options.interactive = true;
    // }
    //
    // if (this._options.onClick) {
    //   options.onClick = this._options.onClick;
    // }

    return new GeoJSONTile(quadcode, this._path, layer, this._options);
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

export default GeoJSONTileLayer;

var noNew = function(path, options) {
  return new GeoJSONTileLayer(path, options);
};

// Initialise without requiring new keyword
export {noNew as geoJSONTileLayer};
