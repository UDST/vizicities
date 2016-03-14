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
import {latLon as LatLon} from '../../geo/LatLon';
import {point as Point} from '../../geo/Point';
import PickingMaterial from '../../engine/PickingMaterial';
import Buffer from '../../util/Buffer';

class PointLayer extends Layer {
  constructor(coordinates, options) {
    var defaults = {
      output: true,
      interactive: false,
      // THREE.Geometry or THREE.BufferGeometry to use for point output
      geometry: null,
      // Custom material override
      //
      // TODO: Should this be in the style object?
      material: null,
      onMesh: null,
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

    // Point features are always flat (for now at least)
    //
    // This won't always be the case once custom point objects / meshes are
    // added
    this._flat = true;
  }

  _onAdd(world) {
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
    this._setBufferAttributes();

    if (this.isOutput()) {
      // Set mesh if not merging elsewhere
      this._setMesh(this._bufferAttributes);

      // Output mesh
      this.add(this._mesh);
    }
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

  // Create and store reference to THREE.BufferAttribute data for this layer
  _setBufferAttributes() {
    var height = 0;

    // Convert height into world units
    if (this._options.style.pointHeight) {
      height = this._world.metresToWorld(this._options.style.pointHeight, this._pointScale);
    }

    var colour = new THREE.Color();
    colour.set(this._options.style.pointColor);

    var geometry;

    // Use default geometry if none has been provided or the provided geometry
    // isn't valid
    if (!this._options.geometry || (!this._options.geometry instanceof THREE.Geometry || !this._options.geometry instanceof THREE.BufferGeometry)) {
      // Debug geometry for points is a thin bar
      //
      // TODO: Allow point geometry to be customised / overridden
      var geometryWidth = this._world.metresToWorld(25, this._pointScale);
      var geometryHeight = this._world.metresToWorld(200, this._pointScale);
      var _geometry = new THREE.BoxGeometry(geometryWidth, geometryHeight, geometryWidth);

      // Shift geometry up so it sits on the ground
      _geometry.translate(0, geometryHeight * 0.5, 0);

      // Pull attributes out of debug geometry
      geometry = new THREE.BufferGeometry().fromGeometry(_geometry);
    } else {
      if (this._options.geometry instanceof THREE.BufferGeometry) {
        geometry = this._options.geometry;
      } else {
        geometry = new THREE.BufferGeometry().fromGeometry(this._options.geometry);
      }
    }

    // For each point
    var attributes = this._projectedCoordinates.map(coordinate => {
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
        vertices: _vertices,
        normals: _normals,
        colours: _colours
      };

      if (this._options.interactive && this._pickingId) {
        // Inject picking ID
        // point.pickingId = this._pickingId;
        _point.pickingIds = new Float32Array(_vertices.length / 3);
        for (var i = 0; i < _point.pickingIds.length; i++) {
          _point.pickingIds[i] = this._pickingId;
        }
      }

      // Convert point representation to proper attribute arrays
      // return this._toAttributes(_point);
      return _point;
    });

    this._bufferAttributes = Buffer.mergeAttributes(attributes);

    // Original attributes are no longer required so free the memory
    attributes = null;
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

  // Create and store mesh from buffer attributes
  //
  // This is only called if the layer is controlling its own output
  _setMesh(attributes) {
    var geometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(attributes.vertices, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(attributes.normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(attributes.colours, 3));

    if (attributes.pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(attributes.pickingIds, 1));
    }

    geometry.computeBoundingBox();

    var material;

    if (this._options.material && this._options.material instanceof THREE.Material) {
      material = this._options.material;
    } else if (!this._world._environment._skybox) {
      material = new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors
        // side: THREE.BackSide
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        vertexColors: THREE.VertexColors
        // side: THREE.BackSide
      });
      material.roughness = 1;
      material.metalness = 0.1;
      material.envMapIntensity = 3;
      material.envMap = this._world._environment._skybox.getRenderTarget();
    }

    var mesh;

    // Pass mesh through callback, if defined
    if (typeof this._options.onMesh === 'function') {
      mesh = this._options.onMesh(geometry, material);
    } else {
      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      // mesh.receiveShadow = true;
    }

    if (this._options.interactive && this._pickingMesh) {
      material = new PickingMaterial();
      // material.side = THREE.BackSide;

      var pickingMesh = new THREE.Mesh(geometry, material);
      this._pickingMesh.add(pickingMesh);
    }

    this._mesh = mesh;
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

        this._pointScale = this._world.pointScale(latlon);
      }

      return _point;
    });
  }

  // Transform line representation into attribute arrays that can be used by
  // THREE.BufferGeometry
  //
  // TODO: Can this be simplified? It's messy and huge
  _toAttributes(line) {
    // Three components per vertex
    var vertices = new Float32Array(line.verticesCount * 3);
    var colours = new Float32Array(line.verticesCount * 3);

    var pickingIds;
    if (line.pickingId) {
      // One component per vertex
      pickingIds = new Float32Array(line.verticesCount);
    }

    var _vertices = line.vertices;
    var _colour = line.colours;

    var _pickingId;
    if (pickingIds) {
      _pickingId = line.pickingId;
    }

    var lastIndex = 0;

    for (var i = 0; i < _vertices.length; i++) {
      var ax = _vertices[i][0];
      var ay = _vertices[i][1];
      var az = _vertices[i][2];

      var c1 = _colour[i];

      vertices[lastIndex * 3 + 0] = ax;
      vertices[lastIndex * 3 + 1] = ay;
      vertices[lastIndex * 3 + 2] = az;

      colours[lastIndex * 3 + 0] = c1[0];
      colours[lastIndex * 3 + 1] = c1[1];
      colours[lastIndex * 3 + 2] = c1[2];

      if (pickingIds) {
        pickingIds[lastIndex] = _pickingId;
      }

      lastIndex++;
    }

    var attributes = {
      vertices: vertices,
      colours: colours
    };

    if (pickingIds) {
      attributes.pickingIds = pickingIds;
    }

    return attributes;
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
