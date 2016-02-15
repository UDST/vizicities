import Layer from '../Layer';
import Surface from './Surface';
import THREE from 'three';

// TODO: Prevent tiles from being loaded if they are further than a certain
// distance from the camera and are unlikely to be seen anyway

class GridLayer extends Layer {
  constructor() {
    super();

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
    this._world.on('move', latlon => {
      this._calculateLOD();
    });
  }

  _updateFrustum() {
    var camera = this._world.getCamera();
    var projScreenMatrix = new THREE.Matrix4();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    this._frustum.setFromMatrix(camera.projectionMatrix);
    this._frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
  }

  _surfaceInFrustum(surface) {
    return this._frustum.intersectsBox(new THREE.Box3(new THREE.Vector3(surface.bounds[0], 0, surface.bounds[3]), new THREE.Vector3(surface.bounds[2], 0, surface.bounds[1])));
  }

  _calculateLOD() {
    var camera = this._world.getCamera();

    // 1. Update and retrieve camera frustum
    this._updateFrustum(this._frustum, camera);

    // 2. Add the four root items of the quadtree to a check list
    var checkList = this._checklist;
    checkList = [];
    checkList.push(Surface('0', this._world));
    checkList.push(Surface('1', this._world));
    checkList.push(Surface('2', this._world));
    checkList.push(Surface('3', this._world));

    // 3. Call Divide, passing in the check list
    this._divide(checkList);

    // 4. Render the quadtree items remaining in the check list
    checkList.forEach((surface, index) => {
      if (!this._surfaceInFrustum(surface)) {
        return;
      }

      // console.log(surface);

      // surface.render();
      this._layer.add(surface.mesh);
    });
  }

  _divide(checkList) {
    var count = 0;
    var currentItem;
    var quadkey;

    // 1. Loop until count equals check list length
    while (count != checkList.length) {
      currentItem = checkList[count];
      quadkey = currentItem.quadkey;

      // 2. Increase count and continue loop if quadkey equals max LOD / zoom
      if (currentItem.length === this._maxLOD) {
        count++;
        continue;
      }

      // 3. Else, calculate screen-space error metric for quadkey
      if (this._screenSpaceError(currentItem)) {
        // 4. If error is sufficient...

        // 4a. Remove parent item from the check list
        checkList.splice(count, 1);

        // 4b. Add 4 child items to the check list
        checkList.push(Surface(quadkey + '0', this._world));
        checkList.push(Surface(quadkey + '1', this._world));
        checkList.push(Surface(quadkey + '2', this._world));
        checkList.push(Surface(quadkey + '3', this._world));

        // 4d. Continue the loop without increasing count
        continue;
      } else {
        // 5. Else, increase count and continue loop
        count++;
      }
    }
  }

  _screenSpaceError(surface) {
    var minDepth = this._minLOD;
    var maxDepth = this._maxLOD;

    var camera = this._world.getCamera();

    // Tweak this value to refine specific point that each quad is subdivided
    //
    // It's used to multiple the dimensions of the surface sides before
    // comparing against the surface distance from camera
    var quality = 3.0;

    // 1. Return false if quadkey length is greater than maxDepth
    if (surface.quadkey.length > maxDepth) {
      return false;
    }

    // 2. Return true if quadkey length is less than minDepth
    if (surface.quadkey.length < minDepth) {
      return true;
    }

    // 3. Return false if quadkey bounds are not in view frustum
    if (!this._surfaceInFrustum(surface)) {
      return false;
    }

    // 4. Calculate screen-space error metric
    // TODO: Use closest distance to one of the 4 surface corners
    var dist = (new THREE.Vector3(surface.center[0], 0, surface.center[1])).sub(camera.position).length();

    // console.log(surface, dist);

    var error = quality * surface.side / dist;

    // 5. Return true if error is greater than 1.0, else return false
    return (error > 1.0);
  }
}

// Initialise without requiring new keyword
export default function() {
  return new GridLayer();
};
