import EventEmitter from 'eventemitter3';
import THREE from 'three';
import OrbitControls from 'three-orbit-controls';

var _OrbitControls = OrbitControls(THREE);

class Orbit extends EventEmitter {
  constructor() {
    super();
  }

  // Moving the camera along the [x,y,z] axis based on a target position
  _panTo(point, animate) {}
  _panBy(pointDelta, animate) {}

  // Zooming the camera in and out
  _zoomTo(metres, animate) {}
  _zoomBy(metresDelta, animate) {}

  // Force camera to look at something other than the target
  _lookAt(point, animate) {}

  // Make camera look at the target
  _lookAtTarget() {}

  // Tilt (up and down)
  _tiltTo(angle, animate) {}
  _tiltBy(angleDelta, animate) {}

  // Rotate (left and right)
  _rotateTo(angle, animate) {}
  _rotateBy(angleDelta, animate) {}

  // Fly to the given point, animating pan and tilt/rotation to final position
  // with nice zoom out and in
  //
  // Calling flyTo a second time before the previous animation has completed
  // will immediately start the new animation from wherever the previous one
  // has got to
  _flyTo(point, noZoom) {}

  // Internal methods called when before, during and after control updates
  _onStart() {}
  _onChange() {}
  _onEnd() {}

  // Add controls to world instance and store world reference
  addTo(world) {
    world.addControls(this);
    return this;
  }

  // Internal method called by World.addControls to actually add the controls
  _addToWorld(world) {
    this._world = world;

    // TODO: Override panLeft and panUp methods to prevent panning on Y axis
    // See: http://stackoverflow.com/a/26188674/997339
    this._orbitControls = new _OrbitControls(world._engine._camera, world._container);

    this.emit('added');
  }

  // Proxy to OrbitControls.update()
  update() {
    this._orbitControls.update();
  }
}

// Initialise without requiring new keyword
export default function() {
  return new Orbit();
};
