import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from '../engine/Scene';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

class Layer extends EventEmitter {
  constructor() {
    super();

    this._layer = new THREE.Object3D();
  }

  // Add THREE object directly to layer
  add(object) {
    this._layer.add(object);
  }

  // Remove THREE object from to layer
  remove(object) {
    this._layer.remove(object);
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

  // Destroys the layer and removes it from the scene and memory
  destroy() {
    if (this._layer.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._layer.children.length - 1; i >= 0; i--) {
        child = this._layer.children[i];

        if (!child) {
          continue;
        }

        this.remove(child);

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
      }
    }

    this._world = null;
    this._layer = null;
  }
}

export default Layer;
