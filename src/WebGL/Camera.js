/* globals window, _, VIZI, THREE */

/**
 * Basic camera
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Camera = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.Camera");

    var self = this;

    self.options = options || {};
    
    _.defaults(self.options, {
      fov: 40,
      near: 2,
      far: 40000,
      position: new VIZI.Point(260, 600, 550),
      target: new VIZI.Point()
    });

    if (!self.options.aspect) {
      throw new Error("Required aspect option missing");
    }

    self.camera = new THREE.PerspectiveCamera(self.options.fov, self.options.aspect, self.options.near, self.options.far);

    // It's assumed that you'd want to do this after adding a camera
    // TODO: Consider if calling lookAt() here is a step too far and should be left to the user
    self.moveTo(self.options.position);
    self.lookAt(self.options.target);
  };

  VIZI.Camera.prototype.addToScene = function(scene) {
    var self = this;
    scene.add(self.camera);
  };

  VIZI.Camera.prototype.moveTo = function(point) {
    var self = this;
    self.camera.position.x = point.x;
    self.camera.position.y = point.y;
    self.camera.position.z = point.z;
  };

  VIZI.Camera.prototype.moveBy = function(delta) {
    var self = this;
    self.camera.position.x += delta.x;
    self.camera.position.y += delta.y;
    self.camera.position.z += delta.z;
  };

  VIZI.Camera.prototype.lookAt = function(point) {
    var self = this;
    self.camera.lookAt(new THREE.Vector3(point.x, point.y, point.z));
  };

  VIZI.Camera.prototype.changeAspect = function(ratio) {
    var self = this;
    self.camera.aspect = ratio;
    self.camera.updateProjectionMatrix();
  };
})();