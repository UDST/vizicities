import EventEmitter from 'eventemitter3';
import THREE from 'three';
import OrbitControls from '../vendor/OrbitControls';

class Orbit extends EventEmitter {
  constructor() {
    super();
  }

  // Proxy control events
  //
  // There's currently no distinction between pan, orbit and zoom events
  _initEvents() {
    this._controls.addEventListener('start', (event) => {
      this._world.emit('controlsMoveStart', event.target.target);
    });

    this._controls.addEventListener('change', (event) => {
      this._world.emit('controlsMove', event.target.target);
    });

    this._controls.addEventListener('end', (event) => {
      this._world.emit('controlsMoveEnd', event.target.target);
    });
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

  // Proxy to OrbitControls.update()
  update() {
    this._controls.update();
  }

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
    this._controls = new OrbitControls(world._engine._camera, world._container);

    // Disable keys for now as no events are fired for them anyway
    this._controls.keys = false;

    // 89 degrees
    this._controls.maxPolarAngle = 1.5533;

    // this._controls.enableDamping = true;
    // this._controls.dampingFactor = 0.25;

    this._initEvents();

    this.emit('added');
  }

  // Destroys the controls and removes them from memory
  destroy() {
    // TODO: Remove event listeners

    this._controls.dispose();

    this._world = null;
    this._controls = null;
  }
}

export default Orbit;

var noNew = function() {
  return new Orbit();
};

// Initialise without requiring new keyword
export {noNew as orbit};
