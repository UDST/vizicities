/* globals window, _, VIZI */

/**
 * lat,lon,alt coordinates
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.LatLon = function(lat, lon, alt) {
    var self = this;

    self.lat = lat || 0;
    self.lon = lon || 0;
    self.alt = alt || 0; // Meters

    // Copy if already a VIZI.LatLon instance
    if (lat instanceof VIZI.LatLon) {
      self.lat = lat.lat;
      self.lon = lat.lon;
      self.alt = lat.alt;
    } else if (_.isArray(lat)) {
      self.lat = lat[0];
      self.lon = lat[1];
      self.alt = lat[2] || 0;
    }
  };
})();