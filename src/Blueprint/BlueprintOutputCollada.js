/* globals window, _, VIZI, d3, THREE */
(function() {
  "use strict";

/**
 * Blueprint collada output
 * @author Robin Hawkes - vizicities.com
 */

  // output: {
  //   type: "BlueprintOutputCollada",
  //   options: {
  //     modelPathPrefix: "/data/kml-model/"
  //   }
  // }
  VIZI.BlueprintOutputCollada = function(options) {
    var self = this;

    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
      infoUI: false,
      name: "Collada"
    });

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []}
    ];

    self.actions = [
      {name: "outputCollada", arguments: ["collada"]}
    ];

    self.name = self.options.name;

    self.world;
    self.infoUI;
  };

  VIZI.BlueprintOutputCollada.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputCollada.prototype.init = function() {
    var self = this;

    // Set up info UI
    if (self.options.infoUI) {
      self.infoUI = new VIZI.InfoUI2D(self.world);
    }

    self.emit("initialised");
  };

  // TODO: Process collada import and mesh generation in a Web Worker
  // TODO: Throttle requests for collada files
  VIZI.BlueprintOutputCollada.prototype.outputCollada = function(data) {
    var self = this;

    // TODO: Remove this hack around THREE.Loader.Handlers
    // THREE.Loader.Handlers = {get: function(){ return null; }};

    // Local pixels per meter - set once per tile
    var pixelsPerMeter;

    _.each(data, function(item) {
      var loader = new THREE.ColladaLoader();
      loader.options.convertUpAxis = true;
      
      var path = (self.options.modelPathPrefix) ? self.options.modelPathPrefix + item.modelPath : item.modelPath;

      loader.load(path, function (collada) {
        console.log(collada);
        var dae = collada.scene;
        var latLon = new VIZI.LatLon(item.coordinates[1], item.coordinates[0]);

        var geoCoord = self.world.project(latLon);

        // Set local pixels per meter if not set
        if (pixelsPerMeter === undefined) {
          pixelsPerMeter = self.world.pixelsPerMeter(latLon);
        }

        // Move to correct position
        dae.position.x = geoCoord.x;
        dae.position.z = geoCoord.y;

        // Scale value below 1 indicates collada units are in metres
        // https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/ColladaLoader.js#L219
        // if (dae.scale.x < 1) {
        // Scale up model from meters to pixels
        dae.scale.x = dae.scale.y = dae.scale.z = dae.scale.x * pixelsPerMeter.y;
        dae.updateMatrix();
        // }

        self.add(dae);

        // Create info panel
        // TODO: Work out a way to pass in custom text for the info panel or
        // make it obvcious that you can only use the data avaiable.
        if (self.infoUI) {
          self.infoUI.addPanel(dae, dae.id);
        }
      });
    });
  };

  VIZI.BlueprintOutputCollada.prototype.onTick = function(delta) {
    var self = this;

    // Update panel positions
    // TODO: Work out how to remove the visible lag between panel position
    // and actual scene / camera position.
    if (self.infoUI) {
      self.infoUI.onChange();
    }
  }

  VIZI.BlueprintOutputCollada.prototype.onHide = function() {
    var self = this;

    if (self.infoUI) {
      self.infoUI.onHide();
    }
  };

  VIZI.BlueprintOutputCollada.prototype.onShow = function() {
    var self = this;

    if (self.infoUI) {
      self.infoUI.onShow();
    }
  };

  VIZI.BlueprintOutputCollada.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());
