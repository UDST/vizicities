import Layer from '../Layer';
import TileCache from './TileCache';
import throttle from 'lodash.throttle';
import THREE from 'three';

// TODO: Prevent tiles from being loaded if they are further than a certain
// distance from the camera and are unlikely to be seen anyway

class GridLayer extends Layer {
  constructor() {
    super();

    this._tileCache = new TileCache(1000);

    // TODO: Work out why changing the minLOD causes loads of issues
    this._minLOD = 3;
    this._maxLOD = 18;

    this._frustum = new THREE.Frustum();
  }

  _onAdd(world) {
    this._initEvents();

    // Trigger initial quadtree calculation on the next frame
    //
    // TODO: This is a hack to ensure the camera is all set up - a better
    // solution should be found
    setTimeout(() => {
      this._calculateLOD();
    }, 0);
  }

  _initEvents() {
    // Run LOD calculations based on render calls
    //
    // TODO: Perhaps don't perform a calculation if nothing has changed in a
    // frame and there are no tiles waiting to be loaded.
    this._world.on('preUpdate', throttle(() => {
      this._calculateLOD();
    }, 100));
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

  _calculateLOD() {
    if (this._stop) {
      return;
    }

    // var start = performance.now();

    var camera = this._world.getCamera();

    // 1. Update and retrieve camera frustum
    this._updateFrustum(this._frustum, camera);

    // 2. Add the four root items of the quadtree to a check list
    var checkList = this._checklist;
    checkList = [];
    checkList.push(this._tileCache.requestTile('0', this));
    checkList.push(this._tileCache.requestTile('1', this));
    checkList.push(this._tileCache.requestTile('2', this));
    checkList.push(this._tileCache.requestTile('3', this));

    // 3. Call Divide, passing in the check list
    this._divide(checkList);

    // 4. Remove all tiles from layer
    this._removeTiles();

    var tileCount = 0;

    // 5. Render the tiles remaining in the check list
    checkList.forEach((tile, index) => {
      // Skip tile if it's not in the current view frustum
      if (!this._tileInFrustum(tile)) {
        return;
      }

      // TODO: Can probably speed this up
      var center = tile.getCenter();
      var dist = (new THREE.Vector3(center[0], 0, center[1])).sub(camera.position).length();

      // Manual distance limit to cut down on tiles so far away
      if (dist > 8000) {
        return;
      }

      // Does the tile have a mesh?
      //
      // If yes, continue
      // If no, generate tile mesh, request texture and skip
      if (!tile.getMesh()) {
        tile.requestTileAsync();
        return;
      }

      // Are the mesh and texture ready?
      //
      // If yes, continue
      // If no, skip
      if (!tile.isReady()) {
        return;
      }

      // Add tile to layer (and to scene)
      this._layer.add(tile.getMesh());

      // Output added tile (for debugging)
      // console.log(tile);

      tileCount++;
    });

    // console.log(tileCount);
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
        checkList.push(this._tileCache.requestTile(quadcode + '0', this));
        checkList.push(this._tileCache.requestTile(quadcode + '1', this));
        checkList.push(this._tileCache.requestTile(quadcode + '2', this));
        checkList.push(this._tileCache.requestTile(quadcode + '3', this));

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

    // 1. Return false if quadcode length is greater than maxDepth
    if (quadcode.length > maxDepth) {
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
    // console.log('Pre:', this._layer.children.length);
    for (var i = this._layer.children.length - 1; i >= 0; i--) {
      this._layer.remove(this._layer.children[i]);
    }
    // console.log('Post:', this._layer.children.length);
  }
}

// Initialise without requiring new keyword
export default function() {
  return new GridLayer();
};
