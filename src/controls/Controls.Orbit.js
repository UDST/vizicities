import EventEmitter from 'eventemitter3';
import THREE from 'three';
import OrbitControls from '../vendor/OrbitControls';
import TweenLite from 'TweenLite';

// Prevent animation from pausing when tab is inactive
TweenLite.lagSmoothing(0);

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
  panTo(point, animate) {}
  panBy(pointDelta, animate) {}

  // Zooming the camera in and out
  zoomTo(metres, animate) {}
  zoomBy(metresDelta, animate) {}

  // Force camera to look at something other than the target
  lookAt(point, animate) {}

  // Make camera look at the target
  lookAtTarget() {}

  // Tilt (up and down)
  tiltTo(angle, animate) {}
  tiltBy(angleDelta, animate) {}

  // Rotate (left and right)
  rotateTo(angle, animate) {}
  rotateBy(angleDelta, animate) {}

  // Fly to the given point, animating pan and tilt/rotation to final position
  // with nice zoom out and in
  //
  // TODO: Calling flyTo a second time before the previous animation has
  // completed should immediately start the new animation from wherever the
  // previous one has got to
  //
  // TODO: Long-distance pans should prevent the quadtree grid from trying to
  // update by not firing the control update events every frame until the
  // pan velocity calms down a bit
  //
  // TODO: Long-distance plans should zoom out further
  flyToPoint(point, duration, zoom) {
    // Animation time in seconds
    var animationTime = duration || 2;

    this._flyTarget = new THREE.Vector3(point.x, 0, point.y);

    // Calculate delta from current position to fly target
    var diff = new THREE.Vector3().subVectors(this._controls.target, this._flyTarget);

    this._flyTween = new TweenLite(
      {
        x: 0,
        z: 0,
        // zoom: 0,
        prev: {
          x: 0,
          z: 0
        }
      },
      animationTime,
      {
        x: diff.x,
        z: diff.z,
        // zoom: 1,
        onUpdate: function(tween) {
          var controls = this._controls;

          // Work out difference since last frame
          var deltaX = tween.target.x - tween.target.prev.x;
          var deltaZ = tween.target.z - tween.target.prev.z;

          // Move some fraction toward the target point
          controls.panLeft(deltaX, controls.object.matrix);
          controls.panUp(deltaZ, controls.object.matrix);

          tween.target.prev.x = tween.target.x;
          tween.target.prev.z = tween.target.z;

          // console.log(Math.sin((tween.target.zoom - 0.5) * Math.PI));

          // TODO: Get zoom to dolly in and out on pan
          // controls.object.zoom -= Math.sin((tween.target.zoom - 0.5) * Math.PI);
          // controls.object.updateProjectionMatrix();
        },
        onComplete: function(tween) {
          // console.log(`Arrived at flyTarget`);
          this._flyTarget = null;
        },
        onUpdateParams: ['{self}'],
        onCompleteParams: ['{self}'],
        callbackScope: this,
        ease: Power1.easeInOut
      }
    );

    if (!zoom) {
      return;
    }

    var zoomTime = animationTime / 2;

    this._zoomTweenIn = new TweenLite(
      {
        zoom: 0
      },
      zoomTime,
      {
        zoom: 1,
        onUpdate: function(tween) {
          var controls = this._controls;
          controls.dollyIn(1 - 0.01 * tween.target.zoom);
        },
        onComplete: function(tween) {},
        onUpdateParams: ['{self}'],
        onCompleteParams: ['{self}'],
        callbackScope: this,
        ease: Power1.easeInOut
      }
    );

    this._zoomTweenOut = new TweenLite(
      {
        zoom: 0
      },
      zoomTime,
      {
        zoom: 1,
        delay: zoomTime,
        onUpdate: function(tween) {
          var controls = this._controls;
          controls.dollyOut(0.99 + 0.01 * tween.target.zoom);
        },
        onComplete: function(tween) {},
        onUpdateParams: ['{self}'],
        onCompleteParams: ['{self}'],
        callbackScope: this,
        ease: Power1.easeInOut
      }
    );
  }

  flyToLatLon(latlon, duration, noZoom) {
    var point = this._world.latLonToPoint(latlon);
    this.flyToPoint(point, duration, noZoom);
  }

  // TODO: Make this animate over a user-defined period of time
  //
  // Perhaps use TweenMax for now and implement as a more lightweight solution
  // later on once it all works
  // _animateFlyTo(delta) {
  //   var controls = this._controls;
  //
  //   // this._controls.panLeft(50, controls._controls.object.matrix);
  //   // this._controls.panUp(50, controls._controls.object.matrix);
  //   // this._controls.dollyIn(this._controls.getZoomScale());
  //   // this._controls.dollyOut(this._controls.getZoomScale());
  //
  //   // Calculate delta from current position to fly target
  //   var diff = new THREE.Vector3().subVectors(this._controls.target, this._flyTarget);
  //
  //   // 1000 units per second
  //   var speed = 1000 * (delta / 1000);
  //
  //   // Remove fly target after arrival and snap to target
  //   if (diff.length() < 0.01) {
  //     console.log(`Arrived at flyTarget`);
  //     this._flyTarget = null;
  //     speed = 1;
  //   }
  //
  //   // Move some fraction toward the target point
  //   controls.panLeft(diff.x * speed, controls.object.matrix);
  //   controls.panUp(diff.z * speed, controls.object.matrix);
  // }

  // Proxy to OrbitControls.update()
  update(delta) {
    this._controls.update(delta);
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
