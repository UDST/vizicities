import Layer from './Layer';
import THREE from 'three';
import reqwest from 'reqwest';
import extend from 'lodash.assign';
import {point as Point} from '../geo/Point';
import {latLon as LatLon} from '../geo/LatLon';
import GeoJSON from '../util/GeoJSON';
import Buffer from '../util/Buffer';
import PickingMaterial from '../engine/PickingMaterial';

class GeoJSONLayer extends Layer {
  constructor(geojson, options) {
    var defaults = {
      picking: false,
      topojson: false,
      filter: null,
      onClick: null,
      style: GeoJSON.defaultStyle
    };

    var _options = extend({}, defaults, options);

    super(_options);

    if (typeof options.style === 'function') {
      this._options.style = options.style;
    } else {
      this._options.style = extend({}, defaults.style, options.style);
    }

    this._defaultStyle = GeoJSON.defaultStyle;

    this._geojson = geojson;

    this._pickingMesh = new THREE.Object3D();
  }

  _onAdd(world) {
    this.addToPicking(this._pickingMesh);

    // Request data from URL if needed
    if (typeof this._geojson === 'string') {
      this._requestData(this._geojson);
    } else {
      // Process and add GeoJSON to layer
      this._processData(this._geojson);
    }
  }

  _requestData(url) {
    this._request = reqwest({
      url: url,
      type: 'json',
      crossOrigin: true
    }).then(res => {
      // Clear request reference
      this._request = null;
      this._processData(res);
    }).catch(err => {
      console.error(err);

      // Clear request reference
      this._request = null;
    });
  }

  _processData(data) {
    console.time('GeoJSON');

    var geojson = GeoJSON.collectFeatures(data, this._options.topojson);

    // TODO: Check that GeoJSON is valid / usable

    var features = geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = geojson.features.filter(this._options.filter);
    }

    var style = this._options.style;

    var offset;

    // TODO: Wrap into a helper method so this isn't duplicated in the tiled
    // GeoJSON output layer
    //
    // Need to be careful as to not make it impossible to fork this off into a
    // worker script at a later stage
    //
    // Also unsure as to whether it's wise to lump so much into a black box
    //
    // var meshes = GeoJSON.createMeshes(features, offset, style);

    var polygons = {
      vertices: [],
      faces: [],
      colours: [],
      facesCount: 0,
      allFlat: true
    };

    var lines = {
      vertices: [],
      colours: [],
      verticesCount: 0
    };

    if (this._options.picking) {
      polygons.pickingIds = [];
      lines.pickingIds = [];
    }

    var colour = new THREE.Color();

    features.forEach(feature => {
      // feature.geometry, feature.properties

      // Skip features that aren't supported
      //
      // TODO: Add support for all GeoJSON geometry types, including Multi...
      // geometry types
      if (
        feature.geometry.type !== 'Polygon' &&
        feature.geometry.type !== 'LineString' &&
        feature.geometry.type !== 'MultiLineString'
      ) {
        return;
      }

      // Get style object, if provided
      if (typeof this._options.style === 'function') {
        style = extend(this._defaultStyle, this._options.style(feature));
      }

      var coordinates = feature.geometry.coordinates;

      // if (feature.geometry.type === 'LineString') {
      if (feature.geometry.type === 'LineString') {
        colour.set(style.lineColor);

        coordinates = coordinates.map(coordinate => {
          var latlon = LatLon(coordinate[1], coordinate[0]);
          var point = this._world.latLonToPoint(latlon);

          if (!offset) {
            offset = Point(0, 0);
            offset.x = -1 * point.x;
            offset.y = -1 * point.y;

            this._pointScale = this._world.pointScale(latlon);
          }

          return [point.x, point.y];
        });

        var height = 0;

        if (style.lineHeight) {
          height = this._world.metresToWorld(style.lineHeight, this._pointScale);
        }

        var linestringAttributes = GeoJSON.lineStringAttributes(coordinates, colour, height);

        lines.vertices.push(linestringAttributes.vertices);
        lines.colours.push(linestringAttributes.colours);

        if (this._options.picking) {
          var pickingId = this.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          lines.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        lines.verticesCount += linestringAttributes.vertices.length;
      }

      if (feature.geometry.type === 'MultiLineString') {
        colour.set(style.lineColor);

        coordinates = coordinates.map(_coordinates => {
          return _coordinates.map(coordinate => {
            var latlon = LatLon(coordinate[1], coordinate[0]);
            var point = this._world.latLonToPoint(latlon);

            if (!offset) {
              offset = Point(0, 0);
              offset.x = -1 * point.x;
              offset.y = -1 * point.y;

              this._pointScale = this._world.pointScale(latlon);
            }

            return [point.x, point.y];
          });
        });

        var height = 0;

        if (style.lineHeight) {
          height = this._world.metresToWorld(style.lineHeight, this._pointScale);
        }

        var multiLinestringAttributes = GeoJSON.multiLineStringAttributes(coordinates, colour, height);

        lines.vertices.push(multiLinestringAttributes.vertices);
        lines.colours.push(multiLinestringAttributes.colours);

        if (this._options.picking) {
          var pickingId = this.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          lines.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        lines.verticesCount += multiLinestringAttributes.vertices.length;
      }

      if (feature.geometry.type === 'Polygon') {
        colour.set(style.color);

        coordinates = coordinates.map(ring => {
          return ring.map(coordinate => {
            var latlon = LatLon(coordinate[1], coordinate[0]);
            var point = this._world.latLonToPoint(latlon);

            if (!offset) {
              offset = Point(0, 0);
              offset.x = -1 * point.x;
              offset.y = -1 * point.y;

              this._pointScale = this._world.pointScale(latlon);
            }

            return [point.x, point.y];
          });
        });

        var height = 0;

        if (style.height) {
          height = this._world.metresToWorld(style.height, this._pointScale);
        }

        var polygonAttributes = GeoJSON.polygonAttributes(coordinates, colour, height);

        polygons.vertices.push(polygonAttributes.vertices);
        polygons.faces.push(polygonAttributes.faces);
        polygons.colours.push(polygonAttributes.colours);

        if (this._options.picking) {
          var pickingId = this.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          polygons.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        if (polygons.allFlat && !polygonAttributes.flat) {
          polygons.allFlat = false;
        }

        polygons.facesCount += polygonAttributes.faces.length;
      }
    });

    var geometry;
    var material;
    var mesh;

    if (this._options.picking) {
      // Move picking mesh to origin Point
      this._pickingMesh.position.x = -offset.x;
      this._pickingMesh.position.z = -offset.y;
    }

    // Output lines
    if (lines.vertices.length > 0) {
      geometry = Buffer.createLineGeometry(lines, offset);

      material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        linewidth: style.lineWidth,
        transparent: style.lineTransparent,
        opacity: style.lineOpacity,
        blending: style.lineBlending
      });

      mesh = new THREE.LineSegments(geometry, material);

      if (style.lineRenderOrder !== undefined) {
        material.depthWrite = false;
        mesh.renderOrder = style.lineRenderOrder;
      }

      // TODO: Can a line cast a shadow?
      // mesh.castShadow = true;

      this.add(mesh);

      if (this._options.picking) {
        material = new PickingMaterial();
        material.side = THREE.BackSide;

        // Make the line wider / easier to pick
        material.linewidth = style.lineWidth + material.linePadding;

        var pickingMesh = new THREE.LineSegments(geometry, material);
        this._pickingMesh.add(pickingMesh);
      }
    }

    // Output polygons
    if (polygons.facesCount > 0) {
      geometry = Buffer.createGeometry(polygons, offset);

      if (!this._world._environment._skybox) {
        material = new THREE.MeshPhongMaterial({
          vertexColors: THREE.VertexColors,
          side: THREE.BackSide
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          vertexColors: THREE.VertexColors,
          side: THREE.BackSide
        });
        material.roughness = 1;
        material.metalness = 0.1;
        material.envMapIntensity = 3;
        material.envMap = this._world._environment._skybox.getRenderTarget();
      }

      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (polygons.allFlat) {
        material.depthWrite = false;
        mesh.renderOrder = 1;
      }

      this.add(mesh);

      if (this._options.picking) {
        material = new PickingMaterial();
        material.side = THREE.BackSide;

        var pickingMesh = new THREE.Mesh(geometry, material);
        this._pickingMesh.add(pickingMesh);
      }
    }

    // Move layer to origin Point
    //
    // TODO: Is there a better way to ensure everything is aligned right and
    // able to be frustum-culled?
    this._object3D.position.x = -offset.x;
    this._object3D.position.z = -offset.y;

    console.timeEnd('GeoJSON');
  }

  _abortRequest() {
    if (!this._request) {
      return;
    }

    this._request.abort();
  }

  destroy() {
    // Cancel any pending requests
    this._abortRequest();

    // Clear request reference
    this._request = null;

    // TODO: Properly dispose of picking mesh
    this._pickingMesh = null;

    // Run common destruction logic from parent
    super.destroy();
  }
}

export default GeoJSONLayer;

var noNew = function(geojson, options) {
  return new GeoJSONLayer(geojson, options);
};

// Initialise without requiring new keyword
export {noNew as geoJSONLayer};
