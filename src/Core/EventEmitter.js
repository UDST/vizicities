/* globals window, _, VIZI, WildEmitter */

/**
 * Event emitter
 * Based on WildEmitter
 * https://github.com/HenrikJoreteg/wildemitter
 * @author Robin Hawkes - vizicities.com
 */
 
(function() {
  "use strict";

  VIZI.EventEmitter = function() {
    WildEmitter.call(this);
  };

  VIZI.EventEmitter.prototype = Object.create( WildEmitter.prototype );
}());