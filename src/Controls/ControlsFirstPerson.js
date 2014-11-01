/* globals window, _, VIZI, THREE */

/**
 * First person control class
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.ControlsFirstPerson = function(camera, options) {
    var self = this;

    VIZI.Controls.call(self, camera, options);

    self.controls = new THREE.FirstPersonControls(camera.camera);

    self.controls.movementSpeed = 750;
    self.controls.lookSpeed = 0.075;
    self.controls.lookVertical = true;

    // TODO: Handle window resize and update based on DOM element not window size
    // self.controls.handleResize();

    // TODO: Add move and zoom event handlers like the map and orbit control system
  };

  VIZI.ControlsFirstPerson.prototype = Object.create( VIZI.Controls.prototype );

  VIZI.ControlsFirstPerson.prototype.moveTo = function(point) {
    var self = this;
    self.controls.object.x = point.x;
    self.controls.object.z = point.y;
    self.controls.update();
  };

  VIZI.ControlsFirstPerson.prototype.moveBy = function(delta) {
    var self = this;
    self.controls.object.x += delta.x;
    self.controls.object.z += delta.y;
    self.controls.update();
  };

  VIZI.ControlsFirstPerson.prototype.onTick = function(delta) {
    var self = this;
    self.controls.update(delta);
  };
})();