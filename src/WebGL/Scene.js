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
      suppressRenderer: false,
      picking: false
    });

    if (!self.options.viewport) {
      throw new Error("Required viewport option missing");
    }

    self.scene = self.createScene();
    self.renderer = self.createRenderer();

    self.pickingScene;
    self.pickingTexture;
    self.pickingMaterial;
    self.pickingGeom;
    self.pickingMesh;
    self.pickingColourID;
    self.pickingColour;
    self.pickingRef;
    
    if (self.options.picking) {
      self.pickingScene = new THREE.Scene();
      
      self.pickingTexture = new THREE.WebGLRenderTarget(self.options.viewport.clientWidth, self.options.viewport.clientHeight);
      self.pickingTexture.generateMipmaps = false;

      self.pickingMaterial = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
        // TODO: Remove reliance on making things double-sided to make up for meshes created with incorrect wising
        side: THREE.DoubleSide
      });

      self.pickingGeom = new THREE.Geometry();
      self.pickingMesh;
      
      // Start at 1 because default pixel value is 0 (black)
      self.pickingColourID = 1;
      self.pickingColour = new THREE.Color();
      self.pickingRef = {};
    }
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
        antialias: self.options.antialias,
        domElement: document.createElement("canvas")
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

  VIZI.Scene.prototype.addPickable = function(mesh, id) {
    var self = this;

    if (!self.options.picking) {
      return;
    }
    
    // Generate unique colour
    self.pickingColour.setHex(self.pickingColourID);

    // Apply colour to geom
    // TODO: Does this cause issues with anything else using the geom reference?
    self.applyVertexColors(mesh.geometry, self.pickingColour);

    // Remove mesh from picking scene
    self.pickingScene.remove(self.pickingMesh);

    // Add geom to merged geom
    self.pickingGeom.merge(mesh.geometry, mesh.matrix);

    // Store reference to id and colour
    self.pickingRef[self.pickingColourID] = {
      id: id,
      mesh: mesh
    };

    self.pickingMesh = new THREE.Mesh(self.pickingGeom, self.pickingMaterial);

    // Update mesh in picking scene
    self.pickingScene.add(self.pickingMesh);

    // Increment picking colour ID
    self.pickingColourID++;
  };

  VIZI.Scene.prototype.removePickable = function(id) {
    var self = this;

    if (!self.options.picking) {
      return;
    }

    // TODO: Remove pickable geom from merged geom
    // TODO: Remove reference to id and colour
    // TODO: Update mesh in picking scene
  };

  VIZI.Scene.prototype.getPickable = function(id) {
    var self = this;

    if (!self.options.picking) {
      return;
    }

    return self.pickingRef[id];
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

  VIZI.Scene.prototype.renderPicking = function(camera) {
    var self = this;

    if (!self.options.picking) {
      return;
    }

    if (!self.pickingScene) {
      throw new Error("Picking scene is required for render");
    }

    if (!camera) {
      throw new Error("Camera is required for render");
    }

    self.renderer.render(self.pickingScene, camera.camera, self.pickingTexture);
  };

  // TODO: Update picking scene on resize
  VIZI.Scene.prototype.resize = function(width, height) {
    var self = this;
    self.renderer.setSize(width, height);
  };

  // TODO: This is duplicated from VIZI.Layer, find a way to merge
  VIZI.Scene.prototype.applyVertexColors = function( geom, colour ) {
    geom.faces.forEach( function( f ) {
      var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
      for( var j = 0; j < n; j ++ ) {
        f.vertexColors[ j ] = colour;
      }
    } );
  };
})();