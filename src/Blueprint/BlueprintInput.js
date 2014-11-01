/* globals window, _, VIZI */

/**
 * Blueprint input
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  // Automated tasks and complex initialisation are performed in init()
  VIZI.BlueprintInput = function(options) {
    if (VIZI.DEBUG) console.log("Initialising VIZI.BlueprintInput");

    var self = this;

    VIZI.EventEmitter.call(self);

    self.options = options || {};

    // Triggers and actions reference (mostly for GUI hooks)
    // [{name: "triggerName", arguments: ["argName1", "argName2"]}, ...]
    self.triggers = [];

    // [{name: "actionName", arguments: ["argName1", "argName2"]}, ...]
    self.actions = [];
  };

  VIZI.BlueprintInput.prototype = Object.create( VIZI.EventEmitter.prototype );

  // Initialise instance and start automated processes
  VIZI.BlueprintInput.prototype.init = function() {};
}());