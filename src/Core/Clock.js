/* globals window, _, VIZI, THREE */

/**
 * Clock
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Clock = function() {
    if (VIZI.DEBUG) console.log("Initialising VIZI.Clock");

    var self = this;

    THREE.Clock.call(self);
  };

  VIZI.Clock.prototype = Object.create( THREE.Clock.prototype );
})();