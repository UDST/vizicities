import THREE from 'three';
import Point from '../geo/Point';
import PickingScene from './PickingScene';

// TODO: Look into a way of setting this up without passing in a renderer and
// camera from the engine

// TODO: Don't pick up an ID when the background / white is picked

var nextId = 1;

class Picking {
  constructor(world, renderer, camera) {
    this._world = world;
    this._renderer = renderer;
    this._camera = camera;

    this._pickingScene = PickingScene;
    this._pickingTexture = new THREE.WebGLRenderTarget();
    this._pickingTexture.texture.minFilter = THREE.LinearFilter;
    this._pickingTexture.texture.generateMipmaps = false;

    this._nextId = 1;

    this._resizeTexture();
    this._initEvents();
  }

  _initEvents() {
    window.addEventListener('resize', this._resizeTexture.bind(this), false);

    // this._renderer.domElement.addEventListener('mousemove', this._onMouseMove.bind(this), false);
    this._renderer.domElement.addEventListener('mouseup', this._onMouseUp.bind(this), false);

    this._world.on('move', this._onWorldMove, this);
  }

  _onMouseUp(event) {
    // Only react to main button click
    if (event.button !== 0) {
      return;
    }

    this._pick(VIZI.Point(event.clientX, event.clientY));
  }

  _onWorldMove() {
    this._needUpdate = true;
  }

  // TODO: Ensure this doesn't get out of sync issue with the renderer resize
  _resizeTexture() {
    var size = this._renderer.getSize();
    this._pickingTexture.setSize(size.width, size.height);
    this._pixelBuffer = new Uint8Array(4 * size.width * size.height);
    this._needUpdate = true;
  }

  _update() {
    if (this._needUpdate) {
      var texture = this._pickingTexture;

      this._renderer.render(this._pickingScene, this._camera, this._pickingTexture);

      // Read the rendering texture
      this._renderer.readRenderTargetPixels(texture, 0, 0, texture.width, texture.height, this._pixelBuffer);

      this._needUpdate = false;

      console.log('Picker updated');
    }
  }

  _pick(point) {
    this._update();

    var index = point.x + (this._pickingTexture.height - point.y) * this._pickingTexture.width;

    // Interpret the pixel as an ID
    var id = (this._pixelBuffer[index * 4 + 2] * 255 * 255) + (this._pixelBuffer[index * 4 + 1] * 255) + (this._pixelBuffer[index * 4 + 0]);

    console.log('Pick id:', id);
  }

  // Add object to picking scene
  //
  // Picking ID should already be added as an attribute for now
  add(mesh) {
    // console.log('Add to picking:', mesh);

    this._pickingScene.add(mesh);
    this._needUpdate = true;
  }

  remove(mesh) {
    this._pickingScene.remove(mesh);
    this._needUpdate = true;
  }

  // Returns next ID to use for picking
  getNextId() {
    return nextId++;
  }

  destroy() {}
}

// Initialise without requiring new keyword
export default function(world, renderer, camera) {
  return new Picking(world, renderer, camera);
};
