/* globals window, _, VIZI */

/**
 * Main control class
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Controls = function(camera, options) {
    var self = this;

    VIZI.EventEmitter.call(self);

    self.options = options || {};
    
    _.defaults(self.options, {});

    if (!camera) {
      throw new Error("Required camera missing");
    }
  };

  VIZI.Controls.prototype = Object.create( VIZI.EventEmitter.prototype );
})();