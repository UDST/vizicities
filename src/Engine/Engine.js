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
  }

  _update(delta) {
    this.emit('preRender');
    this._renderer.render(this._scene, this._camera);
    this.emit('postRender');
  }
}

// Initialise without requiring new keyword
export default function(container) {
  return new Engine(container);
};
