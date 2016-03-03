import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from '../engine/Scene';
import {CSS3DObject} from '../vendor/CSS3DRenderer';
import {CSS2DObject} from '../vendor/CSS2DRenderer';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// TODO: Need a single move method that handles moving all the various object
// layers so that the DOM layers stay in sync with the 3D layer

// TODO: Double check that objects within the _layer Object3D parent are frustum
// culled even if the layer position stays at the default (0,0,0) and the child
// objects are positioned much further away
//
// Or does the layer being at (0,0,0) prevent the child objects from being
// culled because the layer parent is effectively always in view even if the
// child is actually out of camera

class Layer extends EventEmitter {
  constructor() {
    super();

    this._layer = new THREE.Object3D();

    this._dom3D = document.createElement('div');
    this._domLayer3D = new CSS3DObject(this._dom3D);

    this._dom2D = document.createElement('div');
    this._domLayer2D = new CSS2DObject(this._dom2D);
  }

  // Add THREE object directly to layer
  add(object) {
    this._layer.add(object);
  }

  // Remove THREE object from to layer
  remove(object) {
    this._layer.remove(object);
  }

  addDOM3D(object) {
    this._domLayer3D.add(object);
  }

  removeDOM3D(object) {
    this._domLayer3D.remove(object);
  }

  addDOM2D(object) {
    this._domLayer2D.add(object);
  }

  removeDOM2D(object) {
    this._domLayer2D.remove(object);
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

  _onAdd(world) {}

  getPickingId() {
    if (this._world._engine._picking) {
      return this._world._engine._picking.getNextId();
    }

    return false;
  }

  // TODO: Tidy this up and don't access so many private properties to work
  addToPicking(mesh) {
    if (!this._world._engine._picking) {
      return;
    }

    this._world._engine._picking.add(mesh);
  }

  removeFromPicking(mesh) {
    if (!this._world._engine._picking) {
      return;
    }

    this._world._engine._picking.remove(mesh);
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

    if (this._domLayer3D.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._domLayer3D.children.length - 1; i >= 0; i--) {
        child = this._domLayer3D.children[i];

        if (!child) {
          continue;
        }

        this.removeDOM3D(child);
      }
    }

    if (this._domLayer2D.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._domLayer2D.children.length - 1; i >= 0; i--) {
        child = this._domLayer2D.children[i];

        if (!child) {
          continue;
        }

        this.removeDOM2D(child);
      }
    }

    this._domLayer3D = null;
    this._domLayer2D = null;

    this._world = null;
    this._layer = null;
  }
}

export default Layer;

var noNew = function() {
  return new Layer();
};

export {noNew as layer};
