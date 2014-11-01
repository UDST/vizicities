/* globals window, _, VIZI, THREE */

/**
 * Map control class
 * https://github.com/mattzhao92/Planet-Blitz/blob/master/libs/MapControls.js
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.ControlsMap = function(camera, options) {
    var self = this;

    VIZI.Controls.call(self, camera, options);

    self.controls = new THREE.MapControls(camera.camera);
    self.controls.maxPolarAngle = 1.5533430342749535; // 89 degrees

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

  VIZI.ControlsMap.prototype = Object.create( VIZI.Controls.prototype );

  VIZI.ControlsMap.prototype.onStart = function() {
    var self = this;
  };

  // TODO: Send more refined events, perhaps capped per second to prevent spam
  VIZI.ControlsMap.prototype.onChange = function() {
    var self = this;

    // TODO: Only emit this if it has changed
    var point = new VIZI.Point(self.controls.target.x, self.controls.target.z);
    VIZI.Messenger.emit("controls:move", point);

    // TODO: Only emit this if it has changed
    var zoom = self.getZoom();
    VIZI.Messenger.emit("controls:zoom", zoom);
  };

  VIZI.ControlsMap.prototype.onEnd = function() {
    var self = this;
  };

  VIZI.ControlsMap.prototype.moveTo = function(point) {
    var self = this;
    self.controls.target.x = point.x;
    self.controls.target.z = point.y;
    self.controls.update();
  };

  VIZI.ControlsMap.prototype.moveBy = function(delta) {
    var self = this;
    self.controls.target.x += delta.x;
    self.controls.target.z += delta.y;
    self.controls.update();
  };

  // Zoom to specified distance in pixels
  VIZI.ControlsMap.prototype.zoomTo = function(distance) {
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
  
  VIZI.ControlsMap.prototype.getZoom = function() {
    var self = this;
    return self.controls.offset.length();
  };

  VIZI.ControlsMap.prototype.onTick = function(delta) {
    var self = this;
    self.controls.update(delta);
  };
})();