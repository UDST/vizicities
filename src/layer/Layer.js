import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from '../engine/Scene';

class Layer extends EventEmitter {
  constructor() {
    super();

    this._layer = new THREE.Object3D();
  }

  // Add layer to world instance and store world reference
  addTo(world) {
    world.addLayer(this);
    return this;
  }

  // Internal method called by World.addLayer to actually add the layer
  _addToWorld(world) {
    this._world = world;
    this._onAdd(world);
    this.emit('added');
  }
}

export default Layer;
