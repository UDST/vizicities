/* globals window, VIZI */

/**
 * System-wide event messenger
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Messenger = (function() {
    var emitter = new VIZI.EventEmitter();
    return emitter;
  }());
}());