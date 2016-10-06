// TODO: Move duplicated logic between geometry layrs into GeometryLayer

// TODO: Look at ways to drop unneeded references to array buffers, etc to
// reduce memory footprint

// TODO: Point features may be using custom models / meshes and so an approach
// needs to be found to allow these to be brokwn down into buffer attributes for
// merging
//
// Can probably use fromGeometry() or setFromObject() from THREE.BufferGeometry
// and pull out the attributes

// TODO: Support sprite objects using textures

// TODO: Provide option to billboard geometry so it always faces the camera

// TODO: Support dynamic updating / hiding / animation of geometry
//
// This could be pretty hard as it's all packed away within BufferGeometry and
// may even be merged by another layer (eg. GeoJSONLayer)
//
// How much control should this layer support? Perhaps a different or custom
// layer would be better suited for animation, for example.

import Layer from '../Layer';
import extend from 'lodash.assign';
import THREE from 'three';
import Geo from '../../geo/Geo';
import {latLon as LatLon} from '../../geo/LatLon';
import {point as Point} from '../../geo/Point';
import PickingMaterial from '../../engine/PickingMaterial';
import Buffer from '../../util/Buffer';
import PolygonLayer from './PolygonLayer';

class PointLayer extends Layer {
  constructor(coordinates, options) {
    var defaults = {
      output: true,
      interactive: false,
      // THREE.Geometry or THREE.BufferGeometry to use for point output
      pointGeometry: null,
      // Custom material override
      //
      // TODO: Should this be in the style object?
      pointMaterial: null,
      onPointMesh: null,
      // This default style is separate to Util.GeoJSON.defaultStyle
      style: {
        pointColor: '#ff0000'
      }
    };

    var _options = extend({}, defaults, options);

    super(_options);

    // Return coordinates as array of points so it's easy to support
    // MultiPoint features (a single point would be a MultiPoint with a
    // single point in the array)
    this._coordinates = (PointLayer.isSingle(coordinates)) ? [coordinates] : coordinates;

    this._flat = false;
  }

  _onAdd(world) {
    return new Promise((resolve, reject) => {
      this._setCoordinates();

      if (this._options.interactive) {
        // Only add to picking mesh if this layer is controlling output
        //
        // Otherwise, assume another component will eventually add a mesh to
        // the picking scene
        if (this.isOutput()) {
          this._pickingMesh = new THREE.Object3D();
          this.addToPicking(this._pickingMesh);
        }

        this._setPickingId();
        this._addPickingEvents();
      }

      // Store geometry representation as instances of THREE.BufferAttribute
      PointLayer.SetBufferAttributes(this._projectedCoordinates, this._options).then((result) => {
        this._bufferAttributes = Buffer.mergeAttributes(result.attributes);
        this._flat = result.flat;

        var attributeLengths = {
          positions: 3,
          normals: 3,
          colors: 3
        };

        if (this._options.interactive) {
          attributeLengths.pickingIds = 1;
        }

        if (this.isOutput()) {
          var style = this._options.style;

          // Set mesh if not merging elsewhere
          // TODO: Dedupe with PolygonLayer as they are identical
          PointLayer.SetMesh(this._bufferAttributes, attributeLengths, this._flat, style, this._options, this._world._environment._skybox).then((result) => {
            // Output mesh
            this.add(result.mesh);

            if (result.pickingMesh) {
              this._pickingMesh.add(result.pickingMesh);
            }
          });
        }

        result.attributes = null;
        result = null;

        resolve(this);
      }).catch(reject);
    });
  }

  // Return center of point as a LatLon
  //
  // This is used for things like placing popups / UI elements on the layer
  getCenter() {
    return this._center;
  }

  // Return point bounds in geographic coordinates
  //
  // While not useful for single points, it could be useful for MultiPoint
  //
  // TODO: Implement getBounds()
  getBounds() {}

  // Get unique ID for picking interaction
  _setPickingId() {
    this._pickingId = this.getPickingId();
  }

  // Set up and re-emit interaction events
  _addPickingEvents() {
    // TODO: Find a way to properly remove this listener on destroy
    this._world.on('pick-' + this._pickingId, (point2d, point3d, intersects) => {
      // Re-emit click event from the layer
      this.emit('click', this, point2d, point3d, intersects);
    });
  }

  static SetBufferAttributes(coordinates, options) {
    return new Promise((resolve) => {
      var height = 0;

      // Convert height into world units
      if (options.style.pointHeight) {
        height = Geo.metresToWorld(options.style.pointHeight, options.pointScale);
      }

      var colour = new THREE.Color();
      colour.set(options.style.pointColor);

      // Use default geometry if none has been provided or the provided geometry
      // isn't valid
      if (!options.pointGeometry || (!options.pointGeometry instanceof THREE.Geometry || !options.pointGeometry instanceof THREE.BufferGeometry)) {
        // Debug geometry for points is a thin bar
        //
        // TODO: Allow point geometry to be customised / overridden
        var geometryWidth = Geo.metresToWorld(25, options.pointScale);
        var geometryHeight = Geo.metresToWorld(200, options.pointScale);
        var _geometry = new THREE.BoxGeometry(geometryWidth, geometryHeight, geometryWidth);

        // Shift geometry up so it sits on the ground
        _geometry.translate(0, geometryHeight * 0.5, 0);

        // Pull attributes out of debug geometry
        geometry = new THREE.BufferGeometry().fromGeometry(_geometry);
      } else {
        if (options.geometry instanceof THREE.BufferGeometry) {
          geometry = options.pointGeometry;
        } else {
          geometry = new THREE.BufferGeometry().fromGeometry(options.pointGeometry);
        }
      }

      var attributes = coordinates.map((coordinate) => {
        var _vertices = [];
        var _normals = [];
        var _colours = [];

        var _geometry = geometry.clone();
        _geometry.translate(coordinate.x, height, coordinate.y);

        var _vertices = _geometry.attributes.position.clone().array;
        var _normals = _geometry.attributes.normal.clone().array;
        var _colours = _geometry.attributes.color.clone().array;

        for (var i = 0; i < _colours.length; i += 3) {
          _colours[i] = colour.r;
          _colours[i + 1] = colour.g;
          _colours[i + 2] = colour.b;
        }

        var _point = {
          positions: _vertices,
          normals: _normals,
          colors: _colours
        };

        if (options.interactive && options.pickingId) {
          // Inject picking ID
          _point.pickingId = options.pickingId;
        }

        return _point;
      });

      resolve({
        attributes: attributes,
        flat: false
      });
    });
  }

  getBufferAttributes() {
    return this._bufferAttributes;
  }

  // Used by external components to clear some memory when the attributes
  // are no longer required to be stored in this layer
  //
  // For example, you would want to clear the attributes here after merging them
  // using something like the GeoJSONLayer
  clearBufferAttributes() {
    this._bufferAttributes = null;
  }

  // Used by external components to clear some memory when the coordinates
  // are no longer required to be stored in this layer
  //
  // For example, you would want to clear the coordinates here after this
  // layer is merged in something like the GeoJSONLayer
  clearCoordinates() {
    this._coordinates = null;
    this._projectedCoordinates = null;
  }

  static SetMesh(attributes, attributeLengths, flat, style, options, skybox) {
    var geometry = new THREE.BufferGeometry();

    for (var key in attributes) {
      geometry.addAttribute(key.slice(0, -1), new THREE.BufferAttribute(attributes[key], attributeLengths[key]));
    }

    geometry.computeBoundingBox();

    var material;
    if (options.pointMaterial && options.pointMaterial instanceof THREE.Material) {
      material = options.pointMaterial;
    } else if (!skybox) {
      material = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
        // side: THREE.BackSide,
        transparent: style.transparent,
        opacity: style.opacity,
        blending: style.blending
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        vertexColors: THREE.VertexColors,
        // side: THREE.BackSide,
        transparent: style.transparent,
        opacity: style.opacity,
        blending: style.blending
      });
      material.roughness = 1;
      material.metalness = 0.1;
      material.envMapIntensity = 3;
      material.envMap = skybox.getRenderTarget();
    }

    var mesh;

    // Pass mesh through callback, if defined
    if (typeof options.onPolygonMesh === 'function') {
      mesh = options.onPolygonMesh(geometry, material);
    } else {
      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }

    if (flat) {
      material.depthWrite = false;
      mesh.renderOrder = 1;
    }

    if (options.interactive) {
      material = new PickingMaterial();
      material.side = THREE.BackSide;

      var pickingMesh = new THREE.Mesh(geometry, material);
    }

    return Promise.resolve({
      mesh: mesh,
      pickingMesh: pickingMesh
    });
  }

  // Convert and project coordinates
  //
  // TODO: Calculate bounds
  _setCoordinates() {
    this._bounds = [];
    this._coordinates = this._convertCoordinates(this._coordinates);

    this._projectedBounds = [];
    this._projectedCoordinates = this._projectCoordinates();

    this._center = this._coordinates;
  }

  // Recursively convert input coordinates into LatLon objects
  //
  // Calculate geographic bounds at the same time
  //
  // TODO: Calculate geographic bounds
  _convertCoordinates(coordinates) {
    return coordinates.map(coordinate => {
      return LatLon(coordinate[1], coordinate[0]);
    });
  }

  // Recursively project coordinates into world positions
  //
  // Calculate world bounds, offset and pointScale at the same time
  //
  // TODO: Calculate world bounds
  _projectCoordinates() {
    var _point;
    return this._coordinates.map(latlon => {
      _point = this._world.latLonToPoint(latlon);

      // TODO: Is offset ever being used or needed?
      if (!this._offset) {
        this._offset = Point(0, 0);
        this._offset.x = -1 * _point.x;
        this._offset.y = -1 * _point.y;

        this._options.pointScale = this._world.pointScale(latlon);
      }

      return _point;
    });
  }

  // Returns true if the line is flat (has no height)
  isFlat() {
    return this._flat;
  }

  // Returns true if coordinates refer to a single geometry
  //
  // For example, not coordinates for a MultiPoint GeoJSON feature
  static isSingle(coordinates) {
    return !Array.isArray(coordinates[0]);
  }

  destroy() {
    if (this._pickingMesh) {
      // TODO: Properly dispose of picking mesh
      this._pickingMesh = null;
    }

    this.clearCoordinates();
    this.clearBufferAttributes();

    // Run common destruction logic from parent
    super.destroy();
  }
}

export default PointLayer;

var noNew = function(coordinates, options) {
  return new PointLayer(coordinates, options);
};

export {noNew as pointLayer};
