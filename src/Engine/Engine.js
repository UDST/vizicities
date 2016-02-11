import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from './Scene';
import Renderer from './Renderer';
import Camera from './Camera';

class Engine extends EventEmitter {
  constructor(container) {
    console.log('Init Engine');

    super();

    this.scene = Scene;
    this.renderer = Renderer(container);
    this.camera = Camera(container);
    this.clock = new THREE.Clock();
  }

  _update(delta) {
    this.emit('preRender');
    this.renderer.render(this.scene, this.camera);
    this.emit('postRender');
  }
}

// Initialise without requiring new keyword
export default function(container) {
  return new Engine(container);
};
