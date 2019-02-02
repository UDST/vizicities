// TODO: Move duplicated logic between geometry layrs into GeometryLayer

// TODO: Look at ways to drop unneeded references to array buffers, etc to
// reduce memory footprint

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
import Geo from '../../geo/Geo';
import {latLon as LatLon} from '../../geo/LatLon';
import {point as Point} from '../../geo/Point';
import earcut from 'earcut';
import extrudePolygon from '../../util/extrudePolygon';
import PickingMaterial from '../../engine/PickingMaterial';
import Buffer from '../../util/Buffer';

class PolygonLayer extends Layer {
  constructor(coordinates, options) {
    var defaults = {
      output: true,
      interactive: false,
      // Custom material override
      //
      // TODO: Should this be in the style object?
      polygonMaterial: null,
      onPolygonMesh: null,
      onBufferAttributes: null,
      // This default style is separate to Util.GeoJSON.defaultStyle
      style: {
        color: '#ffffff',
        transparent: false,
        opacity: 1,
        blending: THREE.NormalBlending,
        height: 0
      }
    };

    var _options = extend({}, defaults, options);

    super(_options);

    // Return coordinates as array of polygons so it's easy to support
    // MultiPolygon features (a single polygon would be a MultiPolygon with a
    // single polygon in the array)
    this._coordinates = (PolygonLayer.isSingle(coordinates)) ? [coordinates] : coordinates;
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

      PolygonLayer.SetBufferAttributes(this._projectedCoordinates, this._options).then((result) => {
        this._bufferAttributes = Buffer.mergeAttributes(result.attributes);

        if (result.outlineAttributes.length > 0) {
          this._outlineBufferAttributes = Buffer.mergeAttributes(result.outlineAttributes);
        }

        this._flat = result.flat;

        if (this.isOutput()) {
          var attributeLengths = {
            positions: 3,
            normals: 3,
            colors: 3,
            tops: 1
          };

          if (this._options.interactive) {
            attributeLengths.pickingIds = 1;
          }

          var style = this._options.style;

          // Set mesh if not merging elsewhere
          PolygonLayer.SetMesh(this._bufferAttributes, attributeLengths, this._flat, style, this._options, this._world._environment._skybox).then((result) => {
            // Output mesh
            this.add(result.mesh);

            if (result.pickingMesh) {
              this._pickingMesh.add(result.pickingMesh);
            }
          });
        }

        result.attributes = null;
        result.outlineAttributes = null;
        result = null;

        resolve(this);
      }).catch(reject);
    });
  }

  // Return center of polygon as a LatLon
  //
  // This is used for things like placing popups / UI elements on the layer
  //
  // TODO: Find proper center position instead of returning first coordinate
  // SEE: https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Polygon.js#L15
  getCenter() {
    return this._center;
  }

  // Return polygon bounds in geographic coordinates
  //
  // TODO: Implement getBounds()
  getBounds() {}

  // Get unique ID for picking interaction
  _setPickingId() {
    this._pickingId = this._options.pickingId = this.getPickingId();
  }

  // Set up and re-emit interaction events
  _addPickingEvents() {
    // TODO: Find a way to properly remove this listener on destroy
    this._world.on('pick-click-' + this._pickingId, (point2d, point3d, intersects) => {
      // Re-emit click event from the layer
      this.emit('click', this, point2d, point3d, intersects);
    });

    this._world.on('pick-hover-' + this._pickingId, (point2d, point3d, intersects) => {
      // Re-emit click event from the layer
      this.emit('hover', this, point2d, point3d, intersects);
    });
  }

  // Create and store reference to THREE.BufferAttribute data for this layer
  static SetBufferAttributes(coordinates, options) {
    return new Promise((resolve) => {
      var height = 0;

      // Convert height into world units
      if (options.style.height && options.style.height !== 0) {
        height = Geo.metresToWorld(options.style.height, options.pointScale);
      }

      var colour = new THREE.Color();
      colour.set(options.style.color);

      // Light and dark colours used for poor-mans AO gradient on object sides
      var light = new THREE.Color(0xffffff);
      var shadow  = new THREE.Color(0x666666);

      var flat = true;

      var outlineAttributes = [];

      // For each polygon
      var attributes = coordinates.map(_coordinates => {
        // Convert coordinates to earcut format
        var _earcut = PolygonLayer.ToEarcut(_coordinates);

        // Triangulate faces using earcut
        var faces = PolygonLayer.Triangulate(_earcut.vertices, _earcut.holes, _earcut.dimensions);

        var groupedVertices = [];
        for (i = 0, il = _earcut.vertices.length; i < il; i += _earcut.dimensions) {
          groupedVertices.push(_earcut.vertices.slice(i, i + _earcut.dimensions));
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
        var _tops = [];

        var _colour;
        extruded.top.forEach((face, fi) => {
          _colour = [];

          _colour.push([colour.r, colour.g, colour.b]);
          _colour.push([colour.r, colour.g, colour.b]);
          _colour.push([colour.r, colour.g, colour.b]);

          _tops.push([true, true, true]);

          _faces.push(face);
          _colours.push(_colour);
        });

        if (extruded.sides) {
          flat = false;

          // Set up colours for every vertex with poor-mans AO on the sides
          extruded.sides.forEach((face, fi) => {
            _colour = [];

            // First face is always bottom-bottom-top
            if (fi % 2 === 0) {
              _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
              _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
              _colour.push([topColor.r, topColor.g, topColor.b]);

              _tops.push([false, false, true]);
            // Reverse winding for the second face
            // top-top-bottom
            } else {
              _colour.push([topColor.r, topColor.g, topColor.b]);
              _colour.push([topColor.r, topColor.g, topColor.b]);
              _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);

              _tops.push([true, true, false]);
            }

            _faces.push(face);
            _colours.push(_colour);
          });
        }

        // Skip bottom as there's no point rendering it
        // allFaces.push(extruded.faces);

        var polygon = {
          vertices: _vertices,
          faces: _faces,
          colours: _colours,
          tops: _tops,
          facesCount: _faces.length
        };

        if (options.style.outline) {
          var outlineColour = new THREE.Color();
          outlineColour.set(options.style.outlineColor || 0x000000);

          outlineAttributes.push(PolygonLayer.Set2DOutline(_coordinates, outlineColour));
        }

        if (options.interactive && options.pickingId) {
          // Inject picking ID
          polygon.pickingId = options.pickingId;
        }

        // Convert polygon representation to proper attribute arrays
        return PolygonLayer.ToAttributes(polygon);
      });

      resolve({
        attributes: attributes,
        outlineAttributes: outlineAttributes,
        flat: flat
      });
    });
  }

  getBufferAttributes() {
    return this._bufferAttributes;
  }

  getOutlineBufferAttributes() {
    return this._outlineBufferAttributes;
  }

  // Used by external components to clear some memory when the attributes
  // are no longer required to be stored in this layer
  //
  // For example, you would want to clear the attributes here after merging them
  // using something like the GeoJSONLayer
  clearBufferAttributes() {
    this._bufferAttributes = null;
    this._outlineBufferAttributes = null;
  }

  // Threshold angle is currently in rads
  static Set2DOutline(coordinates, colour) {
    var _vertices = [];

    coordinates.forEach((ring) => {
      var _ring = ring.map((coordinate) => {
        return [coordinate.x, 0, coordinate.y];
      });

      // Add in duplicate vertices for line segments to work
      var verticeCount = _ring.length;
      var first = true;
      while (--verticeCount) {
        if (first || verticeCount === 0) {
          first = false;
          continue;
        }

        _ring.splice(verticeCount + 1, 0, _ring[verticeCount]);
      }

      _vertices = _vertices.concat(_ring);
    });

    _colour = [colour.r, colour.g, colour.b];

    var vertices = new Float32Array(_vertices.length * 3);
    var colours = new Float32Array(_vertices.length * 3);

    var lastIndex = 0;

    for (var i = 0; i < _vertices.length; i++) {
      var ax = _vertices[i][0];
      var ay = _vertices[i][1];
      var az = _vertices[i][2];

      var c1 = _colour;

      vertices[lastIndex * 3 + 0] = ax;
      vertices[lastIndex * 3 + 1] = ay;
      vertices[lastIndex * 3 + 2] = az;

      colours[lastIndex * 3 + 0] = c1[0];
      colours[lastIndex * 3 + 1] = c1[1];
      colours[lastIndex * 3 + 2] = c1[2];

      lastIndex++;
    }

    var attributes = {
      positions: vertices,
      colors: colours
    };

    return attributes;
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
    if (options.polygonMaterial && options.polygonMaterial instanceof THREE.Material) {
      material = options.polygonMaterial;
    } else if (!skybox) {
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

    if (flat || style.renderOrder !== undefined) {
      if (!style.ignoreDepth) {
        material.depthWrite = false;
      }

      var renderOrder = (style.renderOrder !== undefined) ? style.renderOrder : 3;
      mesh.renderOrder = renderOrder;
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

    this._center = this._coordinates[0][0][0];
  }

  // Recursively convert input coordinates into LatLon objects
  //
  // Calculate geographic bounds at the same time
  //
  // TODO: Calculate geographic bounds
  _convertCoordinates(coordinates) {
    return coordinates.map(_coordinates => {
      return _coordinates.map(ring => {
        return ring.map(coordinate => {
          return LatLon(coordinate[1], coordinate[0]);
        });
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
      return _coordinates.map(ring => {
        return ring.map(latlon => {
          point = this._world.latLonToPoint(latlon);

          // TODO: Is offset ever being used or needed?
          if (!this._offset) {
            this._offset = Point(0, 0);
            this._offset.x = -1 * point.x;
            this._offset.y = -1 * point.y;

            this._options.pointScale = this._world.pointScale(latlon);
          }

          return point;
        });
      });
    });
  }

  // Convert coordinates array to something earcut can understand
  static ToEarcut(coordinates) {
    var dim = 2;
    var result = {vertices: [], holes: [], dimensions: dim};
    var holeIndex = 0;

    for (var i = 0; i < coordinates.length; i++) {
      for (var j = 0; j < coordinates[i].length; j++) {
        // for (var d = 0; d < dim; d++) {
        result.vertices.push(coordinates[i][j].x);
        result.vertices.push(coordinates[i][j].y);
        // }
      }
      if (i > 0) {
        holeIndex += coordinates[i - 1].length;
        result.holes.push(holeIndex);
      }
    }

    return result;
  }

  // Triangulate earcut-based input using earcut
  static Triangulate(contour, holes, dim) {
    // console.time('earcut');

    var faces = earcut(contour, holes, dim);
    var result = [];

    for (i = 0, il = faces.length; i < il; i += 3) {
      result.push(faces.slice(i, i + 3));
    }

    // console.timeEnd('earcut');

    return result;
  }

  // Transform polygon representation into attribute arrays that can be used by
  // THREE.BufferGeometry
  //
  // TODO: Can this be simplified? It's messy and huge
  static ToAttributes(polygon) {
    // Three components per vertex per face (3 x 3 = 9)
    var positions = new Float32Array(polygon.facesCount * 9);
    var normals = new Float32Array(polygon.facesCount * 9);
    var colours = new Float32Array(polygon.facesCount * 9);

    // One component per vertex per face (1 x 3 = 3)
    var tops = new Float32Array(polygon.facesCount * 3);

    var pickingIds;
    if (polygon.pickingId) {
      // One component per vertex per face (1 x 3 = 3)
      pickingIds = new Float32Array(polygon.facesCount * 3);
    }

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    var index;

    var _faces = polygon.faces;
    var _vertices = polygon.vertices;
    var _colour = polygon.colours;
    var _tops = polygon.tops;

    var _pickingId;
    if (pickingIds) {
      _pickingId = polygon.pickingId;
    }

    var lastIndex = 0;

    for (var i = 0; i < _faces.length; i++) {
      // Array of vertex indexes for the face
      index = _faces[i][0];

      var ax = _vertices[index][0];
      var ay = _vertices[index][1];
      var az = _vertices[index][2];

      var c1 = _colour[i][0];
      var t1 = _tops[i][0];

      index = _faces[i][1];

      var bx = _vertices[index][0];
      var by = _vertices[index][1];
      var bz = _vertices[index][2];

      var c2 = _colour[i][1];
      var t2 = _tops[i][1];

      index = _faces[i][2];

      var cx = _vertices[index][0];
      var cy = _vertices[index][1];
      var cz = _vertices[index][2];

      var c3 = _colour[i][2];
      var t3 = _tops[i][2];

      // Flat face normals
      // From: http://threejs.org/examples/webgl_buffergeometry.html
      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);

      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);

      cb.normalize();

      var nx = cb.x;
      var ny = cb.y;
      var nz = cb.z;

      positions[lastIndex * 9 + 0] = ax;
      positions[lastIndex * 9 + 1] = ay;
      positions[lastIndex * 9 + 2] = az;

      normals[lastIndex * 9 + 0] = nx;
      normals[lastIndex * 9 + 1] = ny;
      normals[lastIndex * 9 + 2] = nz;

      colours[lastIndex * 9 + 0] = c1[0];
      colours[lastIndex * 9 + 1] = c1[1];
      colours[lastIndex * 9 + 2] = c1[2];

      positions[lastIndex * 9 + 3] = bx;
      positions[lastIndex * 9 + 4] = by;
      positions[lastIndex * 9 + 5] = bz;

      normals[lastIndex * 9 + 3] = nx;
      normals[lastIndex * 9 + 4] = ny;
      normals[lastIndex * 9 + 5] = nz;

      colours[lastIndex * 9 + 3] = c2[0];
      colours[lastIndex * 9 + 4] = c2[1];
      colours[lastIndex * 9 + 5] = c2[2];

      positions[lastIndex * 9 + 6] = cx;
      positions[lastIndex * 9 + 7] = cy;
      positions[lastIndex * 9 + 8] = cz;

      normals[lastIndex * 9 + 6] = nx;
      normals[lastIndex * 9 + 7] = ny;
      normals[lastIndex * 9 + 8] = nz;

      colours[lastIndex * 9 + 6] = c3[0];
      colours[lastIndex * 9 + 7] = c3[1];
      colours[lastIndex * 9 + 8] = c3[2];

      tops[lastIndex * 3 + 0] = t1;
      tops[lastIndex * 3 + 1] = t2;
      tops[lastIndex * 3 + 2] = t3;

      if (pickingIds) {
        pickingIds[lastIndex * 3 + 0] = _pickingId;
        pickingIds[lastIndex * 3 + 1] = _pickingId;
        pickingIds[lastIndex * 3 + 2] = _pickingId;
      }

      lastIndex++;
    }

    var attributes = {
      positions: positions,
      normals: normals,
      colors: colours,
      tops: tops
    };

    if (pickingIds) {
      attributes.pickingIds = pickingIds;
    }

    return attributes;
  }

  // Returns true if the polygon is flat (has no height)
  isFlat() {
    return this._flat;
  }

  // Returns true if coordinates refer to a single geometry
  //
  // For example, not coordinates for a MultiPolygon GeoJSON feature
  static isSingle(coordinates) {
    return !Array.isArray(coordinates[0][0][0]);
  }

  // TODO: Make sure this is cleaning everything
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

export default PolygonLayer;

var noNew = function(coordinates, options) {
  return new PolygonLayer(coordinates, options);
};

export {noNew as polygonLayer};
