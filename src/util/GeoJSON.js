/*
 * GeoJSON helpers for handling data and generating objects
 */

import THREE from 'three';
import topojson from 'topojson';
import geojsonMerge from 'geojson-merge';

// TODO: Make it so height can be per-coordinate / point but connected together
// as a linestring (eg. GPS points with an elevation at each point)
//
// This isn't really valid GeoJSON so perhaps something best left to an external
// component for now, until a better approach can be considered
//
// See: http://lists.geojson.org/pipermail/geojson-geojson.org/2009-June/000489.html

// Light and dark colours used for poor-mans AO gradient on object sides
var light = new THREE.Color(0xffffff);
var shadow  = new THREE.Color(0x666666);

var GeoJSON = (function() {
  var defaultStyle = {
    color: '#ffffff',
    height: 0,
    lineOpacity: 1,
    lineTransparent: false,
    lineColor: '#ffffff',
    lineWidth: 1,
    lineBlending: THREE.NormalBlending
  };

  // Attempts to merge together multiple GeoJSON Features or FeatureCollections
  // into a single FeatureCollection
  var collectFeatures = function(data, _topojson) {
    var collections = [];

    if (_topojson) {
      // TODO: Allow TopoJSON objects to be overridden as an option

      // If not overridden, merge all features from all objects
      for (var tk in data.objects) {
        collections.push(topojson.feature(data, data.objects[tk]));
      }

      return geojsonMerge(collections);
    } else {
      // If root doesn't have a type then let's see if there are features in the
      // next step down
      if (!data.type) {
        // TODO: Allow GeoJSON objects to be overridden as an option

        // If not overridden, merge all features from all objects
        for (var gk in data) {
          if (!data[gk].type) {
            continue;
          }

          collections.push(data[gk]);
        }

        return geojsonMerge(collections);
      } else if (Array.isArray(data)) {
        return geojsonMerge(data);
      } else {
        return data;
      }
    }
  };

  return {
    defaultStyle: defaultStyle,
    collectFeatures: collectFeatures
  };
})();

export default GeoJSON;
