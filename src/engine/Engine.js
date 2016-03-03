import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from './Scene';
import DOMScene3D from './DOMScene3D';
import DOMScene2D from './DOMScene2D';
import Renderer from './Renderer';
import DOMRenderer3D from './DOMRenderer3D';
import DOMRenderer2D from './DOMRenderer2D';
import Camera from './Camera';
import Picking from './Picking';

class Engine extends EventEmitter {
  constructor(container, world) {
    console.log('Init Engine');

    super();

    this._world = world;

    this._scene = Scene;
    this._domScene3D = DOMScene3D;
    this._domScene2D = DOMScene2D;

    this._renderer = Renderer(container);
    this._domRenderer3D = DOMRenderer3D(container);
    this._domRenderer2D = DOMRenderer2D(container);

    this._camera = Camera(container);

    // TODO: Make this optional
    this._picking = Picking(this._world, this._renderer, this._camera);

    this.clock = new THREE.Clock();

    this._frustum = new THREE.Frustum();
  }

  update(delta) {
    this.emit('preRender');

    this._renderer.render(this._scene, this._camera);

    // Render picking scene
    // this._renderer.render(this._picking._pickingScene, this._camera);

    // Render DOM scenes
    this._domRenderer3D.render(this._domScene3D, this._camera);
    this._domRenderer2D.render(this._domScene2D, this._camera);

    this.emit('postRender');
  }

  destroy() {
    // Remove any remaining objects from scene
    var child;
    for (var i = this._scene.children.length - 1; i >= 0; i--) {
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

    for (var i = this._domScene3D.children.length - 1; i >= 0; i--) {
      child = this._domScene3D.children[i];

      if (!child) {
        continue;
      }

      this._domScene3D.remove(child);
    };

    for (var i = this._domScene2D.children.length - 1; i >= 0; i--) {
      child = this._domScene2D.children[i];

      if (!child) {
        continue;
      }

      this._domScene2D.remove(child);
    };

    this._picking.destroy();
    this._picking = null;

    this._world = null;
    this._scene = null;
    this._domScene3D = null;
    this._domScene2D = null;
    this._renderer = null;
    this._domRenderer3D = null;
    this._domRenderer2D = null;
    this._camera = null;
    this._clock = null;
    this._frustum = null;
  }
}

export default Engine;

// // Initialise without requiring new keyword
// export default function(container, world) {
//   return new Engine(container, world);
// };
