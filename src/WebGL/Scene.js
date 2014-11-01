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
    
    _.defaults(self.options, {
      antialias: false,
      fogColour: 0xffffff,
      suppressRenderer: false
    });

    if (!self.options.viewport) {
      throw new Error("Required viewport option missing");
    }

    self.scene = self.createScene();
    self.renderer = self.createRenderer();
  };

  VIZI.Scene.prototype.createScene = function() {
    var self = this;

    var scene = new THREE.Scene();

    // TODO: Fog distance should be an option
    scene.fog = new THREE.Fog(self.options.fogColour, 1, 15000);

    // TODO: Make this more customisable, perhaps as a "day/night" option
    // - I'm sure people would want to add their own lighting too
    // TODO: Should this even be in here?
    var directionalLight = new THREE.DirectionalLight( 0x999999 );
    directionalLight.intesity = 0.1;
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 1;

    scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight( 0x999999 );
    directionalLight2.intesity = 0.1;
    directionalLight2.position.x = -1;
    directionalLight2.position.y = 1;
    directionalLight2.position.z = -1;

    scene.add(directionalLight2);
    
    return scene;
  };

  VIZI.Scene.prototype.createRenderer = function() {
    var self = this;

    var renderer;

    if (self.options.suppressRenderer) {
      // Mock renderer for tests
      // TODO: Should really remove this or fix the tests
      renderer = {
        setSize: function(){},
        setClearColor: function(){},
        render: function(){},
        domElement: document.createElement("canvas")
      };
    } else {
      renderer = new THREE.WebGLRenderer({
        antialias: self.options.antialias
      });
    }

    renderer.setSize(self.options.viewport.clientWidth, self.options.viewport.clientHeight);
    renderer.setClearColor(self.scene.fog.color, 1);

    // Gamma settings make things look 'nicer' for some reason
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    self.options.viewport.appendChild(renderer.domElement);

    return renderer;
  };

  VIZI.Scene.prototype.add = function(object) {
    var self = this;
    self.scene.add(object);
  };

  VIZI.Scene.prototype.remove = function(object) {
    var self = this;
    self.scene.remove(object);
  };

  VIZI.Scene.prototype.render = function(camera) {
    var self = this;
    
    if (!self.scene) {
      throw new Error("Scene is required for render");
    }

    if (!camera) {
      throw new Error("Camera is required for render");
    }

    self.renderer.render(self.scene, camera.camera);
  };

  VIZI.Scene.prototype.resize = function(width, height) {
    var self = this;
    self.renderer.setSize(width, height);
  };
})();