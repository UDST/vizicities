/* globals window, _, VIZI, proj4 */

/**
 * Spherical mercator CRS - EPSG:3857 (aka. EPSG:900913)
 * More info: http://epsg.io/3857
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.CRS.EPSG3857 = _.extend({}, VIZI.CRS, {
    code: "EPSG:3857"
  });

  VIZI.CRS.EPSG900913 = _.extend({}, VIZI.CRS.EPSG3857, {
    code: "EPSG:900913"
  });
}());