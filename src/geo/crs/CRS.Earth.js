/*
 * CRS.Earth is the base class for all CRS representing Earth.
 *
 * Based on:
 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.Earth.js
 */

import extend from 'lodash.assign';
import CRS from './CRS';
import {latLon as LatLon} from '../LatLon';

const Earth = {
  wrapLon: [-180, 180],

  R: 6378137,

  // Distance between two geographical points using spherical law of cosines
  // approximation or Haversine
  //
  // See: http://www.movable-type.co.uk/scripts/latlong.html
  distance: function(latlon1, latlon2, accurate) {
    var rad = Math.PI / 180;

    var lat1;
    var lat2;

    var a;

    if (!accurate) {
      lat1 = latlon1.lat * rad;
      lat2 = latlon2.lat * rad;

      a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlon2.lon - latlon1.lon) * rad);

      return this.R * Math.acos(Math.min(a, 1));
    } else {
      lat1 = latlon1.lat * rad;
      lat2 = latlon2.lat * rad;

      var lon1 = latlon1.lon * rad;
      var lon2 = latlon2.lon * rad;

      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;

      var halfDeltaLat = deltaLat / 2;
      var halfDeltaLon = deltaLon / 2;

      a = Math.sin(halfDeltaLat) * Math.sin(halfDeltaLat) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(halfDeltaLon) * Math.sin(halfDeltaLon);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return this.R * c;
    }
  },

  // Scale factor for converting between real metres and projected metres
  //
  // projectedMetres = realMetres * pointScale
  // realMetres = projectedMetres / pointScale
  //
  // Defaults to a scale factor of 1 if no calculation method exists
  //
  // Probably need to run this through the CRS transformation or similar so the
  // resulting scale is relative to the dimensions of the world space
  // Eg. 1 metre in projected space is likly scaled up or down to some other
  // number
  pointScale: function(latlon, accurate) {
    return (this.projection.pointScale) ? this.projection.pointScale(latlon, accurate) : [1, 1];
  },

  // Convert real metres to projected units
  //
  // Latitude scale is chosen because it fluctuates more than longitude
  metresToProjected: function(metres, pointScale) {
    return metres * pointScale[1];
  },

  // Convert projected units to real metres
  //
  // Latitude scale is chosen because it fluctuates more than longitude
  projectedToMetres: function(projectedUnits, pointScale) {
    return projectedUnits / pointScale[1];
  },

  // Convert real metres to a value in world (WebGL) units
  metresToWorld: function(metres, pointScale, zoom) {
    // Transform metres to projected metres using the latitude point scale
    //
    // Latitude scale is chosen because it fluctuates more than longitude
    var projectedMetres = this.metresToProjected(metres, pointScale);

    var scale = this.scale(zoom);

    // Half scale if using zoom as WebGL origin is in the centre, not top left
    if (zoom) {
      scale /= 2;
    }

    // Scale projected metres
    var scaledMetres = (scale * (this.transformScale * projectedMetres));

    // Not entirely sure why this is neccessary
    if (zoom) {
      scaledMetres /= pointScale[1];
    }

    return scaledMetres;
  },

  // Convert world (WebGL) units to a value in real metres
  worldToMetres: function(worldUnits, pointScale, zoom) {
    var scale = this.scale(zoom);

    // Half scale if using zoom as WebGL origin is in the centre, not top left
    if (zoom) {
      scale /= 2;
    }

    var projectedUnits = ((worldUnits / scale) / this.transformScale);
    var realMetres = this.projectedToMetres(projectedUnits, pointScale);

    // Not entirely sure why this is neccessary
    if (zoom) {
      realMetres *= pointScale[1];
    }

    return realMetres;
  }
};

export default extend({}, CRS, Earth);
