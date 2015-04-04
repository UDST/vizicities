/* globals window, _, VIZI */

/**
 * Blueprint output
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  // Automated tasks and complex initialisation are performed in init()
  VIZI.BlueprintOutput = function(options) {
    var self = this;
    self.options = _.defaults(options || {}, {
      description: "",
      debug: VIZI.DEBUG
    });

    if (self.options.debug) console.log("Initialising VIZI.BlueprintOutput");

    VIZI.Layer.call(self);

    // Triggers and actions reference (mostly for GUI hooks)
    // [{name: "triggerName", arguments: ["argName1", "argName2"]}, ...]
    self.triggers = [];

    // [{name: "actionName", arguments: ["argName1", "argName2"]}, ...]
    self.actions = [];

    self.name = "";
    self.description = self.options.description;

    // TODO: How do you ensure the layer abides by fustrum culling when inner objects are referencing the world coordinate space
    // self.layer = new VIZI.Layer();
  };

  VIZI.BlueprintOutput.prototype = Object.create( VIZI.Layer.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutput.prototype.init = function() {};
  VIZI.BlueprintOutput.prototype.onTick = function(delta) {};
}());
