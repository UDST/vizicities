import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from './Scene';
import Renderer from './Renderer';
import Camera from './Camera';

class Engine extends EventEmitter {
  constructor(container) {
    console.log('Init Engine');

    super();

    this._scene = Scene;
    this._renderer = Renderer(container);
    this._camera = Camera(container);
    this.clock = new THREE.Clock();

    this._frustum = new THREE.Frustum();
  }

  update(delta) {
    this.emit('preRender');
    this._renderer.render(this._scene, this._camera);
    this.emit('postRender');
  }

  destroy() {
    // Remove any remaining objects from scene
    var child;
    for (i = this._scene.children.length - 1; i >= 0; i--) {
      child = this._scene.children[i];

      if (!child) {
        continue;
      }

      this._scene.remove(child);

      if (child.geometry) {
        // Dispose of mesh and materials
        child.geometry.dispose();
        child.geometry = null;
      }

      if (child.material) {
        if (child.material.map) {
          child.material.map.dispose();
          child.material.map = null;
        }

        child.material.dispose();
        child.material = null;
      }
    };

    this._scene = null;
    this._renderer = null;
    this._camera = null;
    this._clock = null;
    this._frustum = null;
  }
}

// Initialise without requiring new keyword
export default function(container) {
  return new Engine(container);
};
