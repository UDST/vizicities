/* globals window, _, VIZI, THREE */
(function() {
  "use strict";

/**
 * Blueprint debug lines output
 * @author Robin Hawkes - vizicities.com
 */

  // output: {
  //   type: "BlueprintOutputDebugLines",
  //   options: {}
  // }
  VIZI.BlueprintOutputDebugLines = function(options) {
    var self = this;

    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
      materialType: "LineBasicMaterial",
      materialOptions: {}
    });

    _.defaults(self.options.materialOptions, {
      color: 0xff0000,
      linewidth: 3
    });

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []}
    ];

    self.actions = [
      {name: "outputLines", arguments: ["data"]}
    ];

    self.world;
  };

  VIZI.BlueprintOutputDebugLines.prototype = Object.create( VIZI.BlueprintOutput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutputDebugLines.prototype.init = function() {
    var self = this;

    self.emit("initialised");
  };

  // {
  //   coordinates: [lon, lat],
  //   height: 123
  // }
  VIZI.BlueprintOutputDebugLines.prototype.outputLines = function(data) {
    var self = this;

    var materialType = self.options.materialType;
    if (!materialType || typeof THREE[materialType] !== "function") {
      materialType = "LineBasicMaterial";
    }

    var materialOptions = _.clone(self.options.materialOptions);
    var material = new THREE[materialType](materialOptions);

    var geom = new THREE.Geometry();

    // Local pixels per meter - set once per tile
    var pixelsPerMeter;

    _.each(data, function(point) {
      var latLon = new VIZI.LatLon(point.coordinates[1], point.coordinates[0]);
      var geoCoord = self.world.project(latLon);

      // Set local pixels per meter if not set
      if (pixelsPerMeter === undefined) {
        pixelsPerMeter = self.world.pixelsPerMeter(latLon);
      }

      // TODO: Get this from options
      var height = point.height || 10;

      // Multiply height in meters by pixels per meter ratio at latitude
      height *= pixelsPerMeter.y;

      geom.vertices.push(new THREE.Vector3( geoCoord.x, height, geoCoord.y ));
    });

    var line = new THREE.Line( geom, material );

    self.add(line);
  };

  VIZI.BlueprintOutputDebugLines.prototype.onAdd = function(world) {
    var self = this;
    self.world = world;
    self.init();
  };
}());