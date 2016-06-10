/*
 * GeoJSON helpers for handling data and generating objects
 */

import THREE from 'three';
import topojson from 'topojson';
import geojsonMerge from 'geojson-merge';
import earcut from 'earcut';
import extrudePolygon from './extrudePolygon';

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
    transparent: false,
    opacity: 1,
    blending: THREE.NormalBlending,
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

  // TODO: This is only used by GeoJSONTile so either roll it into that or
  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
  var lineStringAttributes = function(coordinates, colour, height) {
    var _coords = [];
    var _colours = [];

    var nextCoord;

    // Connect coordinate with the next to make a pair
    //
    // LineSegments requires pairs of vertices so repeat the last point if
    // there's an odd number of vertices
    coordinates.forEach((coordinate, index) => {
      _colours.push([colour.r, colour.g, colour.b]);
      _coords.push([coordinate[0], height, coordinate[1]]);

      nextCoord = (coordinates[index + 1]) ? coordinates[index + 1] : coordinate;

      _colours.push([colour.r, colour.g, colour.b]);
      _coords.push([nextCoord[0], height, nextCoord[1]]);
    });

    return {
      vertices: _coords,
      colours: _colours
    };
  };

  // TODO: This is only used by GeoJSONTile so either roll it into that or
  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
  var multiLineStringAttributes = function(coordinates, colour, height) {
    var _coords = [];
    var _colours = [];

    var result;
    coordinates.forEach(coordinate => {
      result = lineStringAttributes(coordinate, colour, height);

      result.vertices.forEach(coord => {
        _coords.push(coord);
      });

      result.colours.forEach(colour => {
        _colours.push(colour);
      });
    });

    return {
      vertices: _coords,
      colours: _colours
    };
  };

  // TODO: This is only used by GeoJSONTile so either roll it into that or
  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
  var polygonAttributes = function(coordinates, colour, height) {
    var earcutData = _toEarcut(coordinates);

    var faces = _triangulate(earcutData.vertices, earcutData.holes, earcutData.dimensions);

    var groupedVertices = [];
    for (i = 0, il = earcutData.vertices.length; i < il; i += earcutData.dimensions) {
      groupedVertices.push(earcutData.vertices.slice(i, i + earcutData.dimensions));
    }

    var extruded = extrudePolygon(groupedVertices, faces, {
      bottom: 0,
      top: height
    });

    var topColor = colour.clone().multiply(light);
    var bottomColor = colour.clone().multiply(shadow);

    var _vertices = extruded.positions;
    var _faces = [];
    var _colours = [];

    var _colour;
    extruded.top.forEach((face, fi) => {
      _colour = [];

      _colour.push([colour.r, colour.g, colour.b]);
      _colour.push([colour.r, colour.g, colour.b]);
      _colour.push([colour.r, colour.g, colour.b]);

      _faces.push(face);
      _colours.push(_colour);
    });

    var allFlat = true;

    if (extruded.sides) {
      if (allFlat) {
        allFlat = false;
      }

      // Set up colours for every vertex with poor-mans AO on the sides
      extruded.sides.forEach((face, fi) => {
        _colour = [];

        // First face is always bottom-bottom-top
        if (fi % 2 === 0) {
          _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
          _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
          _colour.push([topColor.r, topColor.g, topColor.b]);
        // Reverse winding for the second face
        // top-top-bottom
        } else {
          _colour.push([topColor.r, topColor.g, topColor.b]);
          _colour.push([topColor.r, topColor.g, topColor.b]);
          _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
        }

        _faces.push(face);
        _colours.push(_colour);
      });
    }

    // Skip bottom as there's no point rendering it
    // allFaces.push(extruded.faces);

    return {
      vertices: _vertices,
      faces: _faces,
      colours: _colours,
      flat: allFlat
    };
  };

  // TODO: This is only used by GeoJSONTile so either roll it into that or
  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
  var _toEarcut = function(data) {
    var dim = data[0][0].length;
    var result = {vertices: [], holes: [], dimensions: dim};
    var holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        for (var d = 0; d < dim; d++) {
          result.vertices.push(data[i][j][d]);
        }
      }
      if (i > 0) {
        holeIndex += data[i - 1].length;
        result.holes.push(holeIndex);
      }
    }

    return result;
  };

  // TODO: This is only used by GeoJSONTile so either roll it into that or
  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
  var _triangulate = function(contour, holes, dim) {
    // console.time('earcut');

    var faces = earcut(contour, holes, dim);
    var result = [];

    for (i = 0, il = faces.length; i < il; i += 3) {
      result.push(faces.slice(i, i + 3));
    }

    // console.timeEnd('earcut');

    return result;
  };

  return {
    defaultStyle: defaultStyle,
    collectFeatures: collectFeatures,
    lineStringAttributes: lineStringAttributes,
    multiLineStringAttributes: multiLineStringAttributes,
    polygonAttributes: polygonAttributes
  };
})();

export default GeoJSON;
