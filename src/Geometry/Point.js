/* globals window, _, VIZI */

/**
 * X,Y,Z coordinates
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Point = function(x, y, z) {
    var self = this;

    self.x = x || 0;
    self.y = y || 0;
    self.z = z || 0;

    // Copy if already a VIZI.Point instance
    if (x instanceof VIZI.Point) {
      self.x = x.x;
      self.y = x.y;
      self.z = x.z;
    } else if (_.isArray(x)) {
      self.x = x[0];
      self.y = x[1];
      self.z = x[2] || 0;
    }
  };

  // Creates a copy
  VIZI.Point.prototype.add = function(point) {
    var self = this;

    var add = new VIZI.Point(
      self.x + point.x,
      self.y + point.y,
      self.z + point.z
    );

    return add;
  };

  // Creates a copy
  VIZI.Point.prototype.subtract = function(point) {
    var self = this;

    var subtract = new VIZI.Point(
      self.x - point.x,
      self.y - point.y,
      self.z - point.z
    );

    return subtract;
  };
})();