/* globals window, _, VIZI */

/**
 * Blueprint output
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  // Automated tasks and complex initialisation are performed in init()
  VIZI.BlueprintOutput = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.BlueprintOutput");

    var self = this;

    VIZI.Layer.call(self);

    self.options = options || {};

    // Triggers and actions reference (mostly for GUI hooks)
    // [{name: "triggerName", arguments: ["argName1", "argName2"]}, ...]
    self.triggers = [];

    // [{name: "actionName", arguments: ["argName1", "argName2"]}, ...]
    self.actions = [];

    self.name = "";

    // TODO: How do you ensure the layer abides by fustrum culling when inner objects are referencing the world coordinate space
    // self.layer = new VIZI.Layer();
  };

  VIZI.BlueprintOutput.prototype = Object.create( VIZI.Layer.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintOutput.prototype.init = function() {};
  VIZI.BlueprintOutput.prototype.onTick = function(delta) {};
}());