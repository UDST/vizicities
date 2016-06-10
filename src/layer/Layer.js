import EventEmitter from 'eventemitter3';
import extend from 'lodash.assign';
import THREE from 'three';
import Scene from '../engine/Scene';
import {CSS3DObject} from '../vendor/CSS3DRenderer';
import {CSS2DObject} from '../vendor/CSS2DRenderer';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// TODO: Need a single move method that handles moving all the various object
// layers so that the DOM layers stay in sync with the 3D layer

// TODO: Double check that objects within the _object3D Object3D parent are frustum
// culled even if the layer position stays at the default (0,0,0) and the child
// objects are positioned much further away
//
// Or does the layer being at (0,0,0) prevent the child objects from being
// culled because the layer parent is effectively always in view even if the
// child is actually out of camera

class Layer extends EventEmitter {
  constructor(options) {
    super();

    var defaults = {
      output: true,
      outputToScene: true
    };

    this._options = extend({}, defaults, options);

    if (this.isOutput()) {
      this._object3D = new THREE.Object3D();

      this._dom3D = document.createElement('div');
      this._domObject3D = new CSS3DObject(this._dom3D);

      this._dom2D = document.createElement('div');
      this._domObject2D = new CSS2DObject(this._dom2D);
    }
  }

  // Add THREE object directly to layer
  add(object) {
    this._object3D.add(object);
  }

  // Remove THREE object from to layer
  remove(object) {
    this._object3D.remove(object);
  }

  addDOM3D(object) {
    this._domObject3D.add(object);
  }

  removeDOM3D(object) {
    this._domObject3D.remove(object);
  }

  addDOM2D(object) {
    this._domObject2D.add(object);
  }

  removeDOM2D(object) {
    this._domObject2D.remove(object);
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
  addToPicking(object) {
    if (!this._world._engine._picking) {
      return;
    }

    this._world._engine._picking.add(object);
  }

  removeFromPicking(object) {
    if (!this._world._engine._picking) {
      return;
    }

    this._world._engine._picking.remove(object);
  }

  isOutput() {
    return this._options.output;
  }

  isOutputToScene() {
    return this._options.outputToScene;
  }

  // Destroys the layer and removes it from the scene and memory
  destroy() {
    if (this._object3D && this._object3D.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._object3D.children.length - 1; i >= 0; i--) {
        child = this._object3D.children[i];

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

    if (this._domObject3D && this._domObject3D.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._domObject3D.children.length - 1; i >= 0; i--) {
        child = this._domObject3D.children[i];

        if (!child) {
          continue;
        }

        this.removeDOM3D(child);
      }
    }

    if (this._domObject2D && this._domObject2D.children) {
      // Remove everything else in the layer
      var child;
      for (var i = this._domObject2D.children.length - 1; i >= 0; i--) {
        child = this._domObject2D.children[i];

        if (!child) {
          continue;
        }

        this.removeDOM2D(child);
      }
    }

    this._domObject3D = null;
    this._domObject2D = null;

    this._world = null;
    this._object3D = null;
  }
}

export default Layer;

var noNew = function(options) {
  return new Layer(options);
};

export {noNew as layer};
