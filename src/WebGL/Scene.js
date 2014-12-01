/* globals window, _, VIZI, THREE */

/**
 * 3D scene controller
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Scene = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.Scene");

    var self = this;
    self.options = options || {};

    self.scene = new THREE.Scene();
  };

  VIZI.Scene.prototype.init = function(options) {
    var self = this;

    // TODO: Make configurable via startup options.scene
    // * Fog distance
    // * If dir lights should be added and its color (day/night color separately?)
    // * If ambient light should be added and its color

    // Fog color is present if not a custom renderer
    if (options !== undefined && options.renderer.options !== undefined && options.renderer.options.fogColour !== undefined)
      self.scene.fog = new THREE.Fog(options.renderer.options.fogColour, 1, 15000);

    var directionalLight = new THREE.DirectionalLight( 0x999999 );
    directionalLight.intesity = 0.1;
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 1;

    self.scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight( 0x999999 );
    directionalLight2.intesity = 0.1;
    directionalLight2.position.x = -1;
    directionalLight2.position.y = 1;
    directionalLight2.position.z = -1;

    self.scene.add(directionalLight2);
  };

  VIZI.Scene.prototype.add = function(object) {
    var self = this;
    self.scene.add(object);
  };

  VIZI.Scene.prototype.remove = function(object) {
    var self = this;
    self.scene.remove(object);
  };
})();