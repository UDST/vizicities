/* globals window, _, VIZI */

/**
 * X,Y,Z coordinates
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Point = function(x, y, z) {
    var self = this;

    THREE.Vector3.call(self, x, y, z);

    // TODO: Reimplement the following backups if needed
    // self.x = x || 0;
    // self.y = y || 0;
    // self.z = z || 0;

    // // Copy if already a VIZI.Point instance
    // if (x instanceof VIZI.Point) {
    //   self.x = x.x;
    //   self.y = x.y;
    //   self.z = x.z;
    // } else if (_.isArray(x)) {
    //   self.x = x[0];
    //   self.y = x[1];
    //   self.z = x[2] || 0;
    // }
  };

  VIZI.Point.prototype = Object.create( THREE.Vector3.prototype );

  // Override clone so it returns VIZI.Point not THREE.Vector3
  VIZI.Point.prototype.clone = function(point) {
    var self = this;
    return new VIZI.Point(self.x, self.y, self.z);
  };

  // Proxy of sub
  VIZI.Point.prototype.subtract = function(point) {
    var self = this;
    return self.sub(point);
  };
})();