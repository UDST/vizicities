/* globals window, _, VIZI, THREE */

/**
 * Orbit control class
 * https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_orbit.html
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.ControlsOrbit = function(camera, options) {
    var self = this;

    VIZI.Controls.call(self, camera, options);

    self.controls = new THREE.OrbitControls(camera.camera, self.options.viewport);

    self.controls.addEventListener("start", function(event) {
      self.onStart();
    });

    self.controls.addEventListener("change", function(event) {
      self.onChange();
    });

    self.controls.addEventListener("end", function(event) {
      self.onEnd();
    });
  };

  VIZI.ControlsOrbit.prototype = Object.create( VIZI.Controls.prototype );

  VIZI.ControlsOrbit.prototype.onStart = function() {
    var self = this;
  };

  // TODO: Send more refined events, perhaps capped per second to prevent spam
  VIZI.ControlsOrbit.prototype.onChange = function() {
    var self = this;

    // TODO: Only emit this if it has changed
    var point = new VIZI.Point(self.controls.target.x, self.controls.target.z);
    VIZI.Messenger.emit("controls:move", point);

    // TODO: Only emit this if it has changed
    var zoom = self.getZoom();
    VIZI.Messenger.emit("controls:zoom", zoom);
  };

  VIZI.ControlsOrbit.prototype.onEnd = function() {
    var self = this;
  };

  VIZI.ControlsOrbit.prototype.moveTo = function(point) {
    var self = this;
    self.controls.target.x = point.x;
    self.controls.target.z = point.y;
    self.controls.update();
  };

  VIZI.ControlsOrbit.prototype.moveBy = function(delta) {
    var self = this;
    self.controls.target.x += delta.x;
    self.controls.target.z += delta.y;
    self.controls.update();
  };

  // Zoom to specified distance in pixels
  VIZI.ControlsOrbit.prototype.zoomTo = function(distance) {
    var self = this;

    if (distance < 10) return;

    var dollyScale = distance / self.controls.offset.length();

    if (dollyScale > 0) {
      self.controls.dollyOut(dollyScale);
    } else if (dollyScale < 0) {
      self.controls.dollyIn(dollyScale);
    }

    self.controls.update();
  };
  
  VIZI.ControlsOrbit.prototype.getZoom = function() {
    var self = this;
    return self.controls.offset.length();
  };

  VIZI.ControlsOrbit.prototype.onTick = function(delta) {
    var self = this;
    self.controls.update(delta);
  };
})();