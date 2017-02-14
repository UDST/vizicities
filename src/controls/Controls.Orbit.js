import EventEmitter from 'eventemitter3';
import THREE from 'three';
import OrbitControls from '../vendor/OrbitControls';
import TweenLite from 'TweenLite';

class Orbit extends EventEmitter {
  constructor() {
    super();

    // Prevent animation from pausing when tab is inactive
    TweenLite.lagSmoothing(0);
  }

  // Proxy control events
  //
  // There's currently no distinction between pan, orbit and zoom events
  _initEvents() {
    this._controls.addEventListener('start', (event) => {
      this.startPosition = this._controls.target.clone();
      this.startPolar = this._controls.getPolarAngle();
      this.startAzimuth = this._controls.getAzimuthalAngle();

      this._world.emit('controlsMoveStart', event.target.target);
    });

    this._controls.addEventListener('change', (event) => {
      this._world.emit('controlsMove', event.target.target);
    });

    this._controls.addEventListener('end', (event) => {
      var endPosition = this._controls.target.clone();
      var endPolar = this._controls.getPolarAngle();
      var endAzimuth = this._controls.getAzimuthalAngle();

      // Did controls change?
      var changed = false;

      // Panned
      if (Math.abs(endPosition.distanceTo(this.startPosition)) > 0) {
        changed = true;
      }

      // Tilted
      if (Math.abs(endPolar - this.startPolar) > 0) {
        changed = true;
      }

      // Obited
      if (Math.abs(endAzimuth - this.startAzimuth) > 0) {
        changed = true;
      }

      this._world.emit('controlsMoveEnd', event.target.target, changed);
    });
  }

  // Moving the camera along the [x,y] axis based on a target position
  // Positive x and y goes up and right
  panTo(point, animate) {
    var controls = this._controls;
    var target = controls.target;

    var deltaX = point.x - target.x;
    var deltaY = point.y - target.z;

    controls.panLeft(-deltaX, controls.object.matrix);
    controls.panUp(-deltaY, controls.object.matrix);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  panBy(pointDelta, animate) {
    this._controls.pan(-pointDelta.x, pointDelta.y);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  // Zooming the camera in and out
  zoomTo(metres, animate) {}
  zoomBy(metresDelta, animate) {
    var controls = this._controls;

    if (metresDelta < 0) {
      controls.dollyIn(Math.abs(metresDelta));
    } else {
      controls.dollyOut(metresDelta);
    }

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  // Force camera to look at something other than the target
  lookAt(point, animate) {}

  // Make camera look at the target
  lookAtTarget() {}

  // Tilt (up and down)
  // 0 is straight down
  // Math.PI / 180 * 90 is flat on the ground
  tiltTo(angle, animate) {
    var controls = this._controls;
    var theta = controls.getPolarAngle();
    var delta = angle - theta;
    controls.rotateUp(-delta);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  tiltBy(angleDelta, animate) {
    var controls = this._controls;
    controls.rotateUp(-angleDelta);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  // Rotate (left and right)
  // Right is positive, left negative
  rotateTo(angle, animate) {
    var controls = this._controls;
    var theta = controls.getAzimuthalAngle();
    var delta = angle - theta;
    controls.rotateLeft(-delta);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

  // Right is positive, left negative
  rotateBy(angleDelta, animate) {
    var controls = this._controls;
    controls.rotateLeft(-angleDelta);

    this.update();
    this._world.emit('controlsMoveEnd', this._controls.target);
  }

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
  //
  // TODO: Return a promise?
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

  // TODO: Return a promise?
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
    return world.addControls(this);
  }

  // Internal method called by World.addControls to actually add the controls
  _addToWorld(world) {
    this._world = world;

    // TODO: Override panLeft and panUp methods to prevent panning on Y axis
    // See: http://stackoverflow.com/a/26188674/997339
    this._controls = new OrbitControls(world._engine._camera, world._container);

    // 89 degrees
    this._controls.maxPolarAngle = 1.5533;

    // this._controls.enableDamping = true;
    // this._controls.dampingFactor = 0.25;

    this._initEvents();

    // TODO: Remove now that this is a promise?
    this.emit('added');

    return Promise.resolve(this);
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
