/*
 * LatLon is a helper class for ensuring consistent geographic coordinates.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/LatLng.js
 */

class LatLon {
  constructor(lat, lon, alt) {
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('Invalid LatLon object: (' + lat + ', ' + lon + ')');
    }

    this.lat = +lat;
    this.lon = +lon;

    if (alt !== undefined) {
      this.alt = +alt;
    }
  }

  clone() {
    return new LatLon(this.lat, this.lon, this.alt);
  }
}

export default LatLon;

// Accepts (LatLon), ([lat, lon, alt]), ([lat, lon]) and (lat, lon, alt)
// Also converts between lng and lon
var noNew = function(a, b, c) {
  if (a instanceof LatLon) {
    return a;
  }
  if (Array.isArray(a) && typeof a[0] !== 'object') {
    if (a.length === 3) {
      return new LatLon(a[0], a[1], a[2]);
    }
    if (a.length === 2) {
      return new LatLon(a[0], a[1]);
    }
    return null;
  }
  if (a === undefined || a === null) {
    return a;
  }
  if (typeof a === 'object' && 'lat' in a) {
    return new LatLon(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
  }
  if (b === undefined) {
    return null;
  }
  return new LatLon(a, b, c);
};

// Initialise without requiring new keyword
export {noNew as latLon};
