/* globals window, _, VIZI, d3, JXON */
(function() {
  "use strict";

/**
 * Blueprint GPX input
 * @author Robin Hawkes - vizicities.com
 */  

  // input: {
  //   type: "BlueprintInputGPX",
  //   options: {
  //     path: "/data/sample.gpx"
  //   }
  // }
  VIZI.BlueprintInputGPX = function(options) {
    var self = this;

    VIZI.BlueprintInput.call(self, options);

    _.defaults(self.options, {});

    // Triggers and actions reference
    self.triggers = [
      {name: "initialised", arguments: []},
      {name: "dataReceived", arguments: ["gpx"]}
    ];

    self.actions = [
      {name: "requestData", arguments: []}
    ];
  };

  VIZI.BlueprintInputGPX.prototype = Object.create( VIZI.BlueprintInput.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintInputGPX.prototype.init = function() {
    var self = this;
    self.emit("initialised");
  };

  // TODO: Pull from cache if available
  VIZI.BlueprintInputGPX.prototype.requestData = function(tiles) {
    var self = this;

    if (!self.options.path) {
      throw new Error("Required path option missing");
    }

    // Request data
    d3.xml(self.options.path, function(error, data) {
      if (error) {
        if (VIZI.DEBUG) console.log("Failed to request GPX data");
        console.warn(error);
        return;
      }

      // Process GPX into a JSON format
      var jxon = JXON.build(data.querySelector("gpx"));
      
      self.emit("dataReceived", jxon);
    });
  };
}());