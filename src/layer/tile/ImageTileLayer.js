import TileLayer from './TileLayer';
import ImageTile from './ImageTile';
import ImageTileLayerBaseMaterial from './ImageTileLayerBaseMaterial';
import throttle from 'lodash.throttle';
import THREE from 'three';
import extend from 'lodash.assign';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// DONE: Find a way to avoid the flashing caused by the gap between old tiles
// being removed and the new tiles being ready for display
//
// DONE: Simplest first step for MVP would be to give each tile mesh the colour
// of the basemap ground so it blends in a little more, or have a huge ground
// plane underneath all the tiles that shows through between tile updates.
//
// Could keep the old tiles around until the new ones are ready, though they'd
// probably need to be layered in a way so the old tiles don't overlap new ones,
// which is similar to how Leaflet approaches this (it has 2 layers)
//
// Could keep the tile from the previous quadtree level visible until all 4
// tiles at the new / current level have finished loading and are displayed.
// Perhaps by keeping a map of tiles by quadcode and a boolean for each of the
// child quadcodes showing whether they are loaded and in view. If all true then
// remove the parent tile, otherwise keep it on a lower layer.

// TODO: Load and display a base layer separate to the LOD grid that is at a low
// resolution – used as a backup / background to fill in empty areas / distance

// DONE: Fix the issue where some tiles just don't load, or at least the texture
// never shows up – tends to happen if you quickly zoom in / out past it while
// it's still loading, leaving a blank space

// TODO: Optimise the request of many image tiles – look at how Leaflet and
// OpenWebGlobe approach this (eg. batching, queues, etc)

// TODO: Cancel pending tile requests if they get removed from view before they
// reach a ready state (eg. cancel image requests, etc). Need to ensure that the
// images are re-requested when the tile is next in scene (even if from cache)

// TODO: Consider not performing an LOD calculation on every frame, instead only
// on move end so panning, orbiting and zooming stays smooth. Otherwise it's
// possible for performance to tank if you pan, orbit or zoom rapidly while all
// the LOD calculations are being made and new tiles requested.
//
// Pending tiles should continue to be requested and output to the scene on each
// frame, but no new LOD calculations should be made.

// This tile layer both updates the quadtree and outputs tiles on every frame
// (throttled to some amount)
//
// This is because the computational complexity of image tiles is generally low
// and so there isn't much jank when running these calculations and outputs in
// realtime
//
// The benefit to doing this is that the underlying map layer continues to
// refresh and update during movement, which is an arguably better experience

class ImageTileLayer extends TileLayer {
  constructor(path, options) {
    var defaults = {
      distance: 300000
    };

    options = extend({}, defaults, options);

    super(options);

    this._path = path;
  }

  _onAdd(world) {
    super._onAdd(world);

    // Add base layer
    var geom = new THREE.PlaneBufferGeometry(2000000, 2000000, 1);

    var baseMaterial;
    if (this._world._environment._skybox) {
      baseMaterial = ImageTileLayerBaseMaterial('#f5f5f3', this._world._environment._skybox.getRenderTarget());
    } else {
      baseMaterial = ImageTileLayerBaseMaterial('#f5f5f3');
    }

    var mesh = new THREE.Mesh(geom, baseMaterial);
    mesh.renderOrder = 0;
    mesh.rotation.x = -90 * Math.PI / 180;

    // TODO: It might be overkill to receive a shadow on the base layer as it's
    // rarely seen (good to have if performance difference is negligible)
    mesh.receiveShadow = true;

    this._baseLayer = mesh;
    this.add(mesh);

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
    this._outputTiles();
  }

  _onWorldMove(latlon, point) {
    this._moveBaseLayer(point);
  }

  _moveBaseLayer(point) {
    this._baseLayer.position.x = point.x;
    this._baseLayer.position.z = point.y;
  }

  _createTile(quadcode, layer) {
    return new ImageTile(quadcode, this._path, layer);
  }

  // Destroys the layer and removes it from the scene and memory
  destroy() {
    this._world.off('preUpdate', this._throttledWorldUpdate);
    this._world.off('move', this._onWorldMove);

    this._throttledWorldUpdate = null;

    // Dispose of mesh and materials
    this._baseLayer.geometry.dispose();
    this._baseLayer.geometry = null;

    if (this._baseLayer.material.map) {
      this._baseLayer.material.map.dispose();
      this._baseLayer.material.map = null;
    }

    this._baseLayer.material.dispose();
    this._baseLayer.material = null;

    this._baseLayer = null;

    // Run common destruction logic from parent
    super.destroy();
  }
}

export default ImageTileLayer;

var noNew = function(path, options) {
  return new ImageTileLayer(path, options);
};

// Initialise without requiring new keyword
export {noNew as imageTileLayer};
