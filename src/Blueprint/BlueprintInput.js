/* globals window, _, VIZI */

/**
 * Blueprint input
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  // Automated tasks and complex initialisation are performed in init()
  VIZI.BlueprintInput = function(options) {
    var self = this;
    self.options = _.defaults(options || {}, {
      debug: VIZI.DEBUG
    });

    if (self.options.debug) console.log("Initialising VIZI.BlueprintInput");

    VIZI.EventEmitter.call(self);

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
