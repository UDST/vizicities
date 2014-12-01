/* globals window, _, VIZI, THREE */

/**
 * 3D scene renderer
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Renderer = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.Renderer");

    var self = this;
    self.options = options || {};

    _.defaults(self.options, {
      headless   : false,
      antialias  : false,
      fogColour  : 0xffffff
    });

    if (self.options.headless !== true) {
      self.renderer = new THREE.WebGLRenderer({
        antialias: self.options.antialias
      });
    } else {
      self.renderer = {
        render        : function() {},
        setSize       : function() {},
        setClearColor : function() {}
      };
    }
  };

  VIZI.Renderer.prototype.init = function(options) {
    var self = this;
    
    if (self.options.headless === true)
      return;
    else if (!options.viewport)
       throw new Error("VIZI.Renderer.init: Required viewport option missing");

    // Gamma settings make things look 'nicer' for some reason
    self.renderer.gammaInput = true;
    self.renderer.gammaOutput = true;
      
    self.renderer.setSize(options.viewport.clientWidth, options.viewport.clientHeight);
    self.renderer.setClearColor(self.options.fogColour, 1);

    options.viewport.appendChild(self.renderer.domElement);
  };

  VIZI.Renderer.prototype.render = function(scene, camera) {
    var self = this;

    if (!scene)
      throw new Error("VIZI.Renderer.render: Scene is required for rendering");
    else if (!camera)
      throw new Error("VIZI.Renderer.render: Camera is required for rendering");

    self.renderer.render(scene.scene, camera.camera);
  };

  VIZI.Renderer.prototype.resize = function(width, height) {
    var self = this;

    self.renderer.setSize(width, height);
  };
})();