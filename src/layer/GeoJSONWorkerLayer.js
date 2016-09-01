import Layer from './Layer';
import extend from 'lodash.assign';
import reqwest from 'reqwest';
import GeoJSON from '../util/GeoJSON';
import Worker from '../util/Worker';
import Buffer from '../util/Buffer';
import Stringify from '../util/Stringify';
import PolygonLayer from './geometry/PolygonLayer';
import {latLon as LatLon} from '../geo/LatLon';
import {point as Point} from '../geo/Point';
import Geo from '../geo/Geo';
import PickingMaterial from '../engine/PickingMaterial';

class GeoJSONWorkerLayer extends Layer {
  constructor(geojson, options) {
    var defaults = {
      topojson: false,
      style: GeoJSON.defaultStyle,
      onEachFeature: null,
      onEachFeatureWorker: null,
      onAddAttributes: null,
      interactive: false,
      onClick: null,
      headers: {}
    };

    var _options = extend({}, defaults, options);

    if (typeof options.style === 'object') {
      _options.style = extend({}, defaults.style, options.style);
    }

    super(_options);

    this._geojson = geojson;
  }

  _onAdd(world) {
    if (this._options.interactive) {
      // Worker layer always controls output to add a picking mesh
      this._pickingMesh = new THREE.Object3D();
    }

    // Process GeoJSON
    return this._process(this._geojson);
  }

  // Use workers to request and process GeoJSON, returning data structure
  // containing geometry and any supplementary data for output
  _process(_geojson) {
    return new Promise((resolve, reject) => {
      var style = this._options.style;

      if (typeof this._options.style === 'function') {
        style = Stringify.functionToString(this._options.style);
      }

      var geojson = _geojson;
      var transferrables = [];

      if (typeof geojson !== 'string') {
        this._geojson = geojson = Buffer.stringToUint8Array(JSON.stringify(geojson));
        transferrables.push(geojson.buffer);
        this._execWorker(geojson, this._options.topojson, this._world._originPoint, style, this._options.interactive, transferrables).then(() => {
          resolve();
        });
      } else if (typeof this._options.onEachFeature === 'function') {
        GeoJSONWorkerLayer.RequestGeoJSON(geojson).then((res) => {
          var fc = GeoJSON.collectFeatures(res, this._options.topojson);
          var features = fc.features;

          var feature;
          for (var i = 0; i < features.length; i++) {
            feature = features[i];
            this._options.onEachFeature(feature);
          };

          this._geojson = geojson = Buffer.stringToUint8Array(JSON.stringify(fc));
          transferrables.push(geojson.buffer);

          this._execWorker(geojson, false, this._options.headers, this._world._originPoint, style, this._options.interactive, transferrables).then(() => {
            resolve();
          });
        });
      } else {
        this._execWorker(geojson, this._options.topojson, this._options.headers, this._world._originPoint, style, this._options.interactive, transferrables).then(() => {
          resolve();
        });
      }
    });
  }

  _execWorker(geojson, topojson, headers, originPoint, style, interactive, transferrables) {
    return new Promise((resolve, reject) => {
      console.time('Worker round trip');

      Worker.exec('GeoJSONWorkerLayer.Process', [geojson, topojson, headers, originPoint, style, interactive], transferrables).then((results) => {
        console.timeEnd('Worker round trip');

        var splitVertices = Buffer.splitFloat32Array(results.attributes.vertices);
        var splitNormals = Buffer.splitFloat32Array(results.attributes.normals);
        var splitColours = Buffer.splitFloat32Array(results.attributes.colours);

        var splitProperties;
        if (results.properties) {
          splitProperties = Buffer.splitUint8Array(results.properties);
        }

        // var splitPickingIds;
        // if (results.pickingIds) {
        //   splitPickingIds = Buffer.splitFloat32Array(results.attributes.pickingIds);
        // }

        var flats = results.flats;

        var objects = [];
        var obj;
        var pickingId;
        var pickingIds;
        var properties;

        var polygonAttributeLengths = {
          positions: 3,
          normals: 3,
          colors: 3
        };

        for (var i = 0; i < splitVertices.length; i++) {
          if (splitProperties && splitProperties[i]) {
            properties = JSON.parse(Buffer.uint8ArrayToString(splitProperties[i]));
          } else {
            properties = {};
          }

          // WORKERS: obj.attributes should actually an array of polygons for
          // the feature, though the current logic isn't aware of that
          obj = {
            attributes: [{
              positions: splitVertices[i],
              normals: splitNormals[i],
              colors: splitColours[i]
            }],
            properties: properties,
            flat: flats[i]
          };

          // if (splitPickingIds && splitPickingIds[i]) {
          //   obj.attributes.pickingIds = splitPickingIds[i];
          // }

          // WORKERS: If interactive, generate unique ID for each feature, create
          // the buffer attributes and set up event listeners
          if (this._options.interactive) {
            pickingId = this.getPickingId();

            pickingIds = new Float32Array(splitVertices[i].length / 3);
            pickingIds.fill(pickingId);

            obj.attributes[0].pickingIds = pickingIds;

            polygonAttributeLengths.pickingIds = 1;

            this._addPicking(pickingId, properties);
          }

          if (typeof this._options.onAddAttributes === 'function') {
            var customAttributes = this._options.onAddAttributes(obj.attributes[0], properties);
            var customAttribute;
            for (var key in customAttributes) {
              customAttribute = customAttributes[key];
              obj.attributes[0][key] = customAttribute.value;
              polygonAttributeLengths[key] = customAttribute.length;
            }
          }

          objects.push(obj);
        }

        var polygonAttributes = [];

        var polygonFlat = true;

        var obj;
        for (var i = 0; i < objects.length; i++) {
          obj = objects[i];

          if (polygonFlat && !obj.flat) {
            polygonFlat = false;
          }

          var bufferAttributes = Buffer.mergeAttributes(obj.attributes);
          polygonAttributes.push(bufferAttributes);
        };

        // console.log(splitVertices, splitNormals, splitColours, splitPickingIds);

        // var layer;

        // var polygonAttributes = [];
        // var polygonFlat = true;

        // objects.forEach((obj, index) => {
        //   layer = polygonWorkerLayers[index];
        //   layer.createGeometry(obj);

        //   if (layer.isOutput()) {
        //     return;
        //   }

        //   polygonAttributes.push(layer.getBufferAttributes());

        //   if (polygonFlat && !layer.isFlat()) {
        //     polygonFlat = false;
        //   }
        // });

        if (polygonAttributes.length > 0) {
          var mergedPolygonAttributes = Buffer.mergeAttributes(polygonAttributes);

          // TODO: Make this work when style is a function per feature
          var style = (typeof this._options.style === 'function') ? this._options.style(objects[0]) : this._options.style;
          style = extend({}, GeoJSON.defaultStyle, style);

          this._setPolygonMesh(mergedPolygonAttributes, polygonAttributeLengths, style, polygonFlat);
          this.add(this._polygonMesh);
        }

        resolve();
      });
    });
  }

  // TODO: At some point this needs to return all the features to the main thread
  // so it can generate meshes and output to the scene, as well as perhaps creating
  // individual layers / components for each feature to track things like picking
  // and properties
  //
  // TODO: Find a way so the origin point isn't needed to be passed in as it
  // feels a bit messy and against the idea of a static Geo class
  static Process(geojson, topojson, headers, originPoint, _style, _properties) {
    return new Promise((resolve, reject) => {
      GeoJSONWorkerLayer.ProcessGeoJSON(geojson, headers).then((res) => {
        // Collects features into a single FeatureCollection
        //
        // Also converts TopoJSON to GeoJSON if instructed
        var geojson = GeoJSON.collectFeatures(res, topojson);

        // TODO: Check that GeoJSON is valid / usable

        var features = geojson.features;

        // TODO: Run filter, if provided (must be static)

        var pointScale;
        var polygons = [];

        // Deserialise style function if provided
        if (typeof _style === 'string') {
          _style = Stringify.stringToFunction(_style);
        }

        // Assume that a style won't be set per feature
        var style = _style;

        var feature;
        for (var i = 0; i < features.length; i++) {
          feature = features[i];

          var geometry = feature.geometry;
          var coordinates = (geometry.coordinates) ? geometry.coordinates : null;

          if (!coordinates || !geometry) {
            return;
          }

          // Get per-feature style object, if provided
          if (typeof _style === 'function') {
            style = extend({}, GeoJSON.defaultStyle, _style(feature));
            // console.log(feature, style);
          }

          if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
            coordinates = (PolygonLayer.isSingle(coordinates)) ? [coordinates] : coordinates;

            var converted = coordinates.map(_coordinates => {
              return _coordinates.map(ring => {
                return ring.map(coordinate => {
                  return LatLon(coordinate[1], coordinate[0]);
                });
              });
            });

            var point;
            var projected = converted.map(_coordinates => {
              return _coordinates.map(ring => {
                return ring.map(latlon => {
                  point = Geo.latLonToPoint(latlon)._subtract(originPoint);

                  if (!pointScale) {
                    pointScale = Geo.pointScale(latlon);
                  }

                  return point;
                });
              });
            });

            var polygon = {
              projected: projected,
              options: {
                pointScale: pointScale,
                style: style
              }
            };

            if (_properties) {
              polygon.properties = feature.properties;
            }

            polygons.push(polygon);
          }

          if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {}

          if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {}
        };

        var bufferPromises = [];

        var polygon;
        for (var i = 0; i < polygons.length; i++) {
          polygon = polygons[i];
          bufferPromises.push(PolygonLayer.SetBufferAttributes(polygon.projected, polygon.options));
        };

        Promise.all(bufferPromises).then((results) => {
          var transferrables = [];
          var transferrablesSize = 0;

          var vertices = [];
          var normals = [];
          var colours = [];
          // var pickingIds = [];

          var properties = [];

          var flats = [];
          var polygon;

          var result;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            polygon = polygons[i];

            // WORKERS: Making this a typed array will speed up transfer time
            // As things stand this adds on a few milliseconds
            flats.push(result.flat);

            // WORKERS: result.attributes is actually an array of polygons for each
            // feature, though the current logic isn't keeping these all together

            var attributes;
            for (var j = 0; j < result.attributes.length; j++) {
              attributes = result.attributes[j];

              vertices.push(attributes.vertices);
              normals.push(attributes.normals);
              colours.push(attributes.colours);

              // WORKERS: Handle interaction back in the main thread
              // if (attributes.pickingIds) {
              //   pickingIds.push(attributes.pickingIds);
              // }

              if (_properties) {
                properties.push(Buffer.stringToUint8Array(JSON.stringify(polygon.properties)));
              }
            };
          };

          var mergedAttributes = {
            vertices: Buffer.mergeFloat32Arrays(vertices),
            normals: Buffer.mergeFloat32Arrays(normals),
            colours: Buffer.mergeFloat32Arrays(colours)
          };

          transferrables.push(mergedAttributes.vertices[0].buffer);
          transferrables.push(mergedAttributes.vertices[1].buffer);

          transferrables.push(mergedAttributes.normals[0].buffer);
          transferrables.push(mergedAttributes.normals[1].buffer);

          transferrables.push(mergedAttributes.colours[0].buffer);
          transferrables.push(mergedAttributes.colours[1].buffer);

          var mergedProperties;
          if (_properties) {
            mergedProperties = Buffer.mergeUint8Arrays(properties);

            transferrables.push(mergedProperties[0].buffer);
            transferrables.push(mergedProperties[1].buffer);
          }

          // WORKERS: Handle interaction back in the main thread
          // if (pickingIds.length > 0) {
          //   mergedAttributes.pickingIds = Buffer.mergeFloat32Arrays(pickingIds);
          //   transferrables.push(mergedAttributes.pickingIds[0].buffer);
          //   transferrables.push(mergedAttributes.pickingIds[1].buffer);
          // }

          var output = {
            attributes: mergedAttributes,
            flats: flats
          };

          if (_properties) {
            output.properties = mergedProperties;
          }

          // TODO: Also return GeoJSON features that can be mapped to objects on
          // the main thread. Allow user to provide filter / toggles to only return
          // properties from the GeoJSON that they need (eg. don't return geometry,
          // or don't return properties.height)
          resolve({
            data: output,
            transferrables: transferrables
          });
        });
      });
    });
  }

  static ProcessGeoJSON(geojson, headers) {
    if (typeof geojson === 'string') {
      return GeoJSONWorkerLayer.RequestGeoJSON(geojson, headers);
    } else {
      return Promise.resolve(JSON.parse(Buffer.uint8ArrayToString(geojson)));
    }
  }

  static RequestGeoJSON(path, headers) {
    return reqwest({
      url: path,
      type: 'json',
      crossOrigin: true,
      headers: headers
    });
  }

  // Create and store mesh from buffer attributes
  //
  // Could make this an abstract method for each geometry layer
  _setPolygonMesh(attributes, attributeLengths, style, flat) {
    var geometry = new THREE.BufferGeometry();

    for (var key in attributes) {
      geometry.addAttribute(key.slice(0, -1), new THREE.BufferAttribute(attributes[key], attributeLengths[key]));
    }

    geometry.computeBoundingBox();

    // Temporary until the above style logic is fixed for workers
    // var style = extend({}, GeoJSON.defaultStyle);

    var material;
    if (this._options.polygonMaterial && this._options.polygonMaterial instanceof THREE.Material) {
      material = this._options.polygonMaterial;
    } else if (!this._world._environment._skybox) {
      material = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.BackSide,
        transparent: style.transparent,
        opacity: style.opacity,
        blending: style.blending
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        vertexColors: THREE.VertexColors,
        side: THREE.BackSide,
        transparent: style.transparent,
        opacity: style.opacity,
        blending: style.blending
      });
      material.roughness = 1;
      material.metalness = 0.1;
      material.envMapIntensity = 3;
      material.envMap = this._world._environment._skybox.getRenderTarget();
    }

    var mesh;

    // Pass mesh through callback, if defined
    if (typeof this._options.onPolygonMesh === 'function') {
      mesh = this._options.onPolygonMesh(geometry, material);
    } else {
      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }

    if (flat) {
      material.depthWrite = false;
      mesh.renderOrder = 1;
    }

    if (this._options.interactive && this._pickingMesh) {
      material = new PickingMaterial();
      material.side = THREE.BackSide;

      var pickingMesh = new THREE.Mesh(geometry, material);
      this._pickingMesh.add(pickingMesh);

      this.addToPicking(this._pickingMesh);
    }

    this._polygonMesh = mesh;
  }

  // Set up and re-emit interaction events
  _addPicking(pickingId, properties) {
    this._world.on('pick-click-' + pickingId, (pickingId, point2d, point3d, intersects) => {
      this._world.emit('click', this, properties);
    });

    this._world.on('pick-hover-' + pickingId, (pickingId, point2d, point3d, intersects) => {
      this._world.emit('hover', this, properties);
    });
  }

  // TODO: Finish cleanup
  destroy() {
    // Run common destruction logic from parent
    super.destroy();
  }
}

export default GeoJSONWorkerLayer;

var noNew = function(geojson, options) {
  return new GeoJSONWorkerLayer(geojson, options);
};

export {noNew as geoJSONWorkerLayer};
