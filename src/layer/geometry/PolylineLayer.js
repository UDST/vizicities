// TODO: Move duplicated logic between geometry layrs into GeometryLayer

// TODO: Look at ways to drop unneeded references to array buffers, etc to
// reduce memory footprint

// TODO: Provide alternative output using tubes and splines / curves

// TODO: Support dynamic updating / hiding / animation of geometry
//
// This could be pretty hard as it's all packed away within BufferGeometry and
// may even be merged by another layer (eg. GeoJSONLayer)
//
// How much control should this layer support? Perhaps a different or custom
// layer would be better suited for animation, for example.

// TODO: Allow _setBufferAttributes to use a custom function passed in to
// generate a custom mesh

import Layer from '../Layer';
import extend from 'lodash.assign';
import THREE from 'three';
import {latLon as LatLon} from '../../geo/LatLon';
import {point as Point} from '../../geo/Point';
import PickingMaterial from '../../engine/PickingMaterial';
import Buffer from '../../util/Buffer';

class PolylineLayer extends Layer {
  constructor(coordinates, options) {
    var defaults = {
      output: true,
      interactive: false,
      // Custom material override
      //
      // TODO: Should this be in the style object?
      material: null,
      onMesh: null,
      onBufferAttributes: null,
      // This default style is separate to Util.GeoJSON.defaultStyle
      style: {
        lineOpacity: 1,
        lineTransparent: false,
        lineColor: '#ffffff',
        lineWidth: 1,
        lineBlending: THREE.NormalBlending
      }
    };

    var _options = extend({}, defaults, options);

    super(_options);

    // Return coordinates as array of lines so it's easy to support
    // MultiLineString features (a single line would be a MultiLineString with a
    // single line in the array)
    this._coordinates = (PolylineLayer.isSingle(coordinates)) ? [coordinates] : coordinates;

    // Polyline features are always flat (for now at least)
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

  // Return center of polyline as a LatLon
  //
  // This is used for things like placing popups / UI elements on the layer
  //
  // TODO: Find proper center position instead of returning first coordinate
  // SEE: https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Polyline.js#L59
  getCenter() {
    return this._center;
  }

  // Return line bounds in geographic coordinates
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
    var attributes;

    // Only use this if you know what you're doing
    if (typeof this._options.onBufferAttributes === 'function') {
      // TODO: Probably want to pass something less general as arguments,
      // though passing the instance will do for now (it's everything)
      attributes = this._options.onBufferAttributes(this);
    } else {
      var height = 0;

      // Convert height into world units
      if (this._options.style.lineHeight) {
        height = this._world.metresToWorld(this._options.style.lineHeight, this._pointScale);
      }

      var colour = new THREE.Color();
      colour.set(this._options.style.lineColor);

      // For each line
      attributes = this._projectedCoordinates.map(_projectedCoordinates => {
        var _vertices = [];
        var _colours = [];

        // Connect coordinate with the next to make a pair
        //
        // LineSegments requires pairs of vertices so repeat the last point if
        // there's an odd number of vertices
        var nextCoord;
        _projectedCoordinates.forEach((coordinate, index) => {
          _colours.push([colour.r, colour.g, colour.b]);
          _vertices.push([coordinate.x, height, coordinate.y]);

          nextCoord = (_projectedCoordinates[index + 1]) ? _projectedCoordinates[index + 1] : coordinate;

          _colours.push([colour.r, colour.g, colour.b]);
          _vertices.push([nextCoord.x, height, nextCoord.y]);
        });

        var line = {
          vertices: _vertices,
          colours: _colours,
          verticesCount: _vertices.length
        };

        if (this._options.interactive && this._pickingId) {
          // Inject picking ID
          line.pickingId = this._pickingId;
        }

        // Convert line representation to proper attribute arrays
        return this._toAttributes(line);
      });
    }

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

    if (attributes.normals) {
      geometry.addAttribute('normal', new THREE.BufferAttribute(attributes.normals, 3));
    }

    geometry.addAttribute('color', new THREE.BufferAttribute(attributes.colours, 3));

    if (attributes.pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(attributes.pickingIds, 1));
    }

    geometry.computeBoundingBox();

    var style = this._options.style;
    var material;

    if (this._options.material && this._options.material instanceof THREE.Material) {
      material = this._options.material;
    } else {
      material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        linewidth: style.lineWidth,
        transparent: style.lineTransparent,
        opacity: style.lineOpacity,
        blending: style.lineBlending
      });
    }

    var mesh;

    // Pass mesh through callback, if defined
    if (typeof this._options.onMesh === 'function') {
      mesh = this._options.onMesh(geometry, material);
    } else {
      mesh = new THREE.LineSegments(geometry, material);

      if (style.lineRenderOrder !== undefined) {
        material.depthWrite = false;
        mesh.renderOrder = style.lineRenderOrder;
      }

      mesh.castShadow = true;
      // mesh.receiveShadow = true;
    }

    // TODO: Allow this to be overridden, or copy mesh instead of creating a new
    // one just for picking
    if (this._options.interactive && this._pickingMesh) {
      material = new PickingMaterial();
      // material.side = THREE.BackSide;

      // Make the line wider / easier to pick
      material.linewidth = style.lineWidth + material.linePadding;

      var pickingMesh = new THREE.LineSegments(geometry, material);
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

    this._center = this._coordinates[0][0];
  }

  // Recursively convert input coordinates into LatLon objects
  //
  // Calculate geographic bounds at the same time
  //
  // TODO: Calculate geographic bounds
  _convertCoordinates(coordinates) {
    return coordinates.map(_coordinates => {
      return _coordinates.map(coordinate => {
        return LatLon(coordinate[1], coordinate[0]);
      });
    });
  }

  // Recursively project coordinates into world positions
  //
  // Calculate world bounds, offset and pointScale at the same time
  //
  // TODO: Calculate world bounds
  _projectCoordinates() {
    var point;
    return this._coordinates.map(_coordinates => {
      return _coordinates.map(latlon => {
        point = this._world.latLonToPoint(latlon);

        // TODO: Is offset ever being used or needed?
        if (!this._offset) {
          this._offset = Point(0, 0);
          this._offset.x = -1 * point.x;
          this._offset.y = -1 * point.y;

          this._pointScale = this._world.pointScale(latlon);
        }

        return point;
      });
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

    var normals;
    var _normals;
    if (line.normals) {
      normals = new Float32Array(line.verticesCount * 3);
      _normals = line.normals;
    }

    var _pickingId;
    if (pickingIds) {
      _pickingId = line.pickingId;
    }

    var lastIndex = 0;

    for (var i = 0; i < _vertices.length; i++) {
      var ax = _vertices[i][0];
      var ay = _vertices[i][1];
      var az = _vertices[i][2];

      var nx;
      var ny;
      var nz;
      if (_normals) {
        nx = _normals[i][0];
        ny = _normals[i][1];
        nz = _normals[i][2];
      }

      var c1 = _colour[i];

      vertices[lastIndex * 3 + 0] = ax;
      vertices[lastIndex * 3 + 1] = ay;
      vertices[lastIndex * 3 + 2] = az;

      if (normals) {
        normals[lastIndex * 3 + 0] = nx;
        normals[lastIndex * 3 + 1] = ny;
        normals[lastIndex * 3 + 2] = nz;
      }

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

    if (normals) {
      attributes.normals = normals;
    }

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
  // For example, not coordinates for a MultiLineString GeoJSON feature
  static isSingle(coordinates) {
    return !Array.isArray(coordinates[0][0]);
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

export default PolylineLayer;

var noNew = function(coordinates, options) {
  return new PolylineLayer(coordinates, options);
};

export {noNew as polylineLayer};
