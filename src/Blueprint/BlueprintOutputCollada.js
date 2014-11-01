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

    _.defaults(self.options, {});

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []}
    ];

    self.actions = [
      {name: "outputCollada", arguments: ["collada"]}
    ];

    self.world;
  };

  VIZI.BlueprintOutputCollada.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputCollada.prototype.init = function() {
    var self = this;

    self.emit("initialised");
  };

  // TODO: Process collada import and mesh generation in a Web Worker
  // TODO: Throttle requests for collada files
  VIZI.BlueprintOutputCollada.prototype.outputCollada = function(data) {
    var self = this;

    // TODO: Remove this hack around THREE.Loader.Handlers
    // THREE.Loader.Handlers = {get: function(){ return null; }};

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;

    // Local pixels per meter - set once per tile
    var pixelsPerMeter;

    _.each(data, function(item) {
      var path = (self.options.modelPathPrefix) ? self.options.modelPathPrefix + item.modelPath : item.modelPath;
    
      loader.load(path, function (collada) {
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
      });
    });
  };

  VIZI.BlueprintOutputCollada.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());