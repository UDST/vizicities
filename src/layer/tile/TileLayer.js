import Layer from '../Layer';
import extend from 'lodash.assign';
import TileCache from './TileCache';
import THREE from 'three';

// TODO: Consider removing picking from TileLayer instances as there aren't
// (m)any situations where it would be practical
//
// For example, how would you even know what picking IDs to listen to and what
// to do with them?

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// TODO: Consider keeping a single TileLayer / LOD instance running by default
// that keeps a standard LOD grid for other layers to utilise, rather than
// having to create their own, unique LOD grid and duplicate calculations when
// they're going to use the same grid setup anyway
//
// It still makes sense to be able to have a custom LOD grid for some layers as
// they may want to customise things, maybe not even using a quadtree at all!
//
// Perhaps it makes sense to split out the quadtree stuff into a singleton and
// pass in the necessary parameters each time for the calculation step.
//
// Either way, it seems silly to force layers to have to create a new LOD grid
// each time and create extra, duplicated processing every frame.

// TODO: Allow passing in of options to define min/max LOD and a distance to use
// for culling tiles beyond that distance.

// DONE: Prevent tiles from being loaded if they are further than a certain
// distance from the camera and are unlikely to be seen anyway

// TODO: Avoid performing LOD calculation when it isn't required. For example,
// when nothing has changed since the last frame and there are no tiles to be
// loaded or in need of rendering

// TODO: Only remove tiles from the layer that aren't to be rendered in the
// current frame – it seems excessive to remove all tiles and re-add them on
// every single frame, even if it's just array manipulation

// TODO: Fix LOD calculation so min and max LOD can be changed without causing
// problems (eg. making min above 5 causes all sorts of issues)

// TODO: Reuse THREE objects where possible instead of creating new instances
// on every LOD calculation

// TODO: Consider not using THREE or LatLon / Point objects in LOD calculations
// to avoid creating unnecessary memory for garbage collection

// TODO: Prioritise loading of tiles at highest level in the quadtree (those
// closest to the camera) so visual inconsistancies during loading are minimised

class TileLayer extends Layer {
  constructor(options) {
    var defaults = {
      picking: false,
      maxCache: 1000,
      maxLOD: 18
    };

    var _options = extend({}, defaults, options);

    super(_options);

    this._tileCache = new TileCache(this._options.maxCache, tile => {
      this._destroyTile(tile);
    });

    // List of tiles from the previous LOD calculation
    this._tileList = [];

    // TODO: Work out why changing the minLOD causes loads of issues
    this._minLOD = 3;
    this._maxLOD = this._options.maxLOD;

    this._frustum = new THREE.Frustum();
    this._tiles = new THREE.Object3D();
    this._tilesPicking = new THREE.Object3D();
  }

  _onAdd(world) {
    this.addToPicking(this._tilesPicking);
    this.add(this._tiles);
  }

  _updateFrustum() {
    var camera = this._world.getCamera();
    var projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    this._frustum.setFromMatrix(camera.projectionMatrix);
    this._frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
  }

  _tileInFrustum(tile) {
    var bounds = tile.getBounds();
    return this._frustum.intersectsBox(new THREE.Box3(new THREE.Vector3(bounds[0], 0, bounds[3]), new THREE.Vector3(bounds[2], 0, bounds[1])));
  }

  // Update and output tiles from the previous LOD checklist
  _outputTiles() {
    if (!this._tiles) {
      return;
    }

    // Remove all tiles from layer
    this._removeTiles();

    // Add / re-add tiles
    this._tileList.forEach(tile => {
      // Are the mesh and texture ready?
      //
      // If yes, continue
      // If no, skip
      if (!tile.isReady()) {
        return;
      }

      // Add tile to layer (and to scene) if not already there
      this._tiles.add(tile.getMesh());

      if (tile.getPickingMesh()) {
        this._tilesPicking.add(tile.getPickingMesh());
      }
    });
  }

  // Works out tiles in the view frustum and stores them in an array
  //
  // Does not output the tiles, deferring this to _outputTiles()
  _calculateLOD() {
    if (this._stop || !this._world) {
      return;
    }

    // var start = performance.now();

    var camera = this._world.getCamera();

    // 1. Update and retrieve camera frustum
    this._updateFrustum(this._frustum, camera);

    // 2. Add the four root items of the quadtree to a check list
    var checkList = this._checklist;
    checkList = [];
    checkList.push(this._requestTile('0', this));
    checkList.push(this._requestTile('1', this));
    checkList.push(this._requestTile('2', this));
    checkList.push(this._requestTile('3', this));

    // 3. Call Divide, passing in the check list
    this._divide(checkList);

    // // 4. Remove all tiles from layer
    //
    // Moved to _outputTiles() for now
    // this._removeTiles();

    // Order tile-list by zoom so nearest tiles are requested first
    checkList.sort((a, b) => {
      return a._quadcode.length < b._quadcode.length;
    });

    // 5. Filter the tiles remaining in the check list
    this._tileList = checkList.filter((tile, index) => {
      // Skip tile if it's not in the current view frustum
      if (!this._tileInFrustum(tile)) {
        return false;
      }

      if (this._options.distance && this._options.distance > 0) {
        // TODO: Can probably speed this up
        var center = tile.getCenter();
        var dist = (new THREE.Vector3(center[0], 0, center[1])).sub(camera.position).length();

        // Manual distance limit to cut down on tiles so far away
        if (dist > this._options.distance) {
          return false;
        }
      }

      // Does the tile have a mesh?
      //
      // If yes, continue
      // If no, generate tile mesh, request texture and skip
      if (!tile.getMesh()) {
        tile.requestTileAsync();
      }

      return true;

      // Are the mesh and texture ready?
      //
      // If yes, continue
      // If no, skip
      // if (!tile.isReady()) {
      //   return;
      // }
      //
      // // Add tile to layer (and to scene)
      // this._tiles.add(tile.getMesh());
    });

    // console.log(performance.now() - start);
  }

  _divide(checkList) {
    var count = 0;
    var currentItem;
    var quadcode;

    // 1. Loop until count equals check list length
    while (count != checkList.length) {
      currentItem = checkList[count];
      quadcode = currentItem.getQuadcode();

      // 2. Increase count and continue loop if quadcode equals max LOD / zoom
      if (currentItem.length === this._maxLOD) {
        count++;
        continue;
      }

      // 3. Else, calculate screen-space error metric for quadcode
      if (this._screenSpaceError(currentItem)) {
        // 4. If error is sufficient...

        // 4a. Remove parent item from the check list
        checkList.splice(count, 1);

        // 4b. Add 4 child items to the check list
        checkList.push(this._requestTile(quadcode + '0', this));
        checkList.push(this._requestTile(quadcode + '1', this));
        checkList.push(this._requestTile(quadcode + '2', this));
        checkList.push(this._requestTile(quadcode + '3', this));

        // 4d. Continue the loop without increasing count
        continue;
      } else {
        // 5. Else, increase count and continue loop
        count++;
      }
    }
  }

  _screenSpaceError(tile) {
    var minDepth = this._minLOD;
    var maxDepth = this._maxLOD;

    var quadcode = tile.getQuadcode();

    var camera = this._world.getCamera();

    // Tweak this value to refine specific point that each quad is subdivided
    //
    // It's used to multiple the dimensions of the tile sides before
    // comparing against the tile distance from camera
    var quality = 3.0;

    // 1. Return false if quadcode length equals maxDepth (stop dividing)
    if (quadcode.length === maxDepth) {
      return false;
    }

    // 2. Return true if quadcode length is less than minDepth
    if (quadcode.length < minDepth) {
      return true;
    }

    // 3. Return false if quadcode bounds are not in view frustum
    if (!this._tileInFrustum(tile)) {
      return false;
    }

    var center = tile.getCenter();

    // 4. Calculate screen-space error metric
    // TODO: Use closest distance to one of the 4 tile corners
    var dist = (new THREE.Vector3(center[0], 0, center[1])).sub(camera.position).length();

    var error = quality * tile.getSide() / dist;

    // 5. Return true if error is greater than 1.0, else return false
    return (error > 1.0);
  }

  _removeTiles() {
    if (!this._tiles || !this._tiles.children) {
      return;
    }

    for (var i = this._tiles.children.length - 1; i >= 0; i--) {
      this._tiles.remove(this._tiles.children[i]);
    }

    if (!this._tilesPicking || !this._tilesPicking.children) {
      return;
    }

    for (var i = this._tilesPicking.children.length - 1; i >= 0; i--) {
      this._tilesPicking.remove(this._tilesPicking.children[i]);
    }
  }

  // Return a new tile instance
  _createTile(quadcode, layer) {}

  // Get a cached tile or request a new one if not in cache
  _requestTile(quadcode, layer) {
    var tile = this._tileCache.getTile(quadcode);

    if (!tile) {
      // Set up a brand new tile
      tile = this._createTile(quadcode, layer);

      // Add tile to cache, though it won't be ready yet as the data is being
      // requested from various places asynchronously
      this._tileCache.setTile(quadcode, tile);
    }

    return tile;
  }

  _destroyTile(tile) {
    // Remove tile from scene
    this._tiles.remove(tile.getMesh());

    // Delete any references to the tile within this component

    // Call destory on tile instance
    tile.destroy();
  }

  // Destroys the layer and removes it from the scene and memory
  destroy() {
    if (this._tiles.children) {
      // Remove all tiles
      for (var i = this._tiles.children.length - 1; i >= 0; i--) {
        this._tiles.remove(this._tiles.children[i]);
      }
    }

    // Remove tile from picking scene
    this.removeFromPicking(this._tilesPicking);

    if (this._tilesPicking.children) {
      // Remove all tiles
      for (var i = this._tilesPicking.children.length - 1; i >= 0; i--) {
        this._tilesPicking.remove(this._tilesPicking.children[i]);
      }
    }

    this._tileCache.destroy();
    this._tileCache = null;

    this._tiles = null;
    this._tilesPicking = null;
    this._frustum = null;

    super.destroy();
  }
}

export default TileLayer;
