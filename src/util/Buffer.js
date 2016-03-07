/*
 * BufferGeometry helpers
 */

import THREE from 'three';

var Buffer = (function() {
  // Merge multiple attribute objects into a single attribute object
  //
  // Attribute objects must all use the same attribute keys
  var mergeAttributes = function(attributes) {
    var lengths = {};

    // Find array lengths
    attributes.forEach(_attributes => {
      for (var k in _attributes) {
        if (!lengths[k]) {
          lengths[k] = 0;
        }

        lengths[k] += _attributes[k].length;
      }
    });

    var mergedAttributes = {};

    // Set up arrays to merge into
    for (var k in lengths) {
      mergedAttributes[k] = new Float32Array(lengths[k]);
    }

    var lastLengths = {};

    attributes.forEach(_attributes => {
      for (var k in _attributes) {
        if (!lastLengths[k]) {
          lastLengths[k] = 0;
        }

        mergedAttributes[k].set(_attributes[k], lastLengths[k]);

        lastLengths[k] += _attributes[k].length;
      }
    });

    return mergedAttributes;
  };

  var createLineGeometry = function(lines, offset) {
    var geometry = new THREE.BufferGeometry();

    var vertices = new Float32Array(lines.verticesCount * 3);
    var colours = new Float32Array(lines.verticesCount * 3);

    var pickingIds;
    if (lines.pickingIds) {
      // One component per vertex (1)
      pickingIds = new Float32Array(lines.verticesCount);
    }

    var _vertices;
    var _colour;
    var _pickingId;

    var lastIndex = 0;

    for (var i = 0; i < lines.vertices.length; i++) {
      _vertices = lines.vertices[i];
      _colour = lines.colours[i];

      if (pickingIds) {
        _pickingId = lines.pickingIds[i];
      }

      for (var j = 0; j < _vertices.length; j++) {
        var ax = _vertices[j][0] + offset.x;
        var ay = _vertices[j][1];
        var az = _vertices[j][2] + offset.y;

        var c1 = _colour[j];

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
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colours, 3));

    if (pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(pickingIds, 1));
    }

    geometry.computeBoundingBox();

    return geometry;
  };

  // TODO: Make picking IDs optional
  var createGeometry = function(attributes, offset) {
    var geometry = new THREE.BufferGeometry();

    // Three components per vertex per face (3 x 3 = 9)
    var vertices = new Float32Array(attributes.facesCount * 9);
    var normals = new Float32Array(attributes.facesCount * 9);
    var colours = new Float32Array(attributes.facesCount * 9);

    var pickingIds;
    if (attributes.pickingIds) {
      // One component per vertex per face (1 x 3 = 3)
      pickingIds = new Float32Array(attributes.facesCount * 3);
    }

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    var index;
    var _faces;
    var _vertices;
    var _colour;
    var _pickingId;
    var lastIndex = 0;
    for (var i = 0; i < attributes.faces.length; i++) {
      _faces = attributes.faces[i];
      _vertices = attributes.vertices[i];
      _colour = attributes.colours[i];

      if (pickingIds) {
        _pickingId = attributes.pickingIds[i];
      }

      for (var j = 0; j < _faces.length; j++) {
        // Array of vertex indexes for the face
        index = _faces[j][0];

        var ax = _vertices[index][0] + offset.x;
        var ay = _vertices[index][1];
        var az = _vertices[index][2] + offset.y;

        var c1 = _colour[j][0];

        index = _faces[j][1];

        var bx = _vertices[index][0] + offset.x;
        var by = _vertices[index][1];
        var bz = _vertices[index][2] + offset.y;

        var c2 = _colour[j][1];

        index = _faces[j][2];

        var cx = _vertices[index][0] + offset.x;
        var cy = _vertices[index][1];
        var cz = _vertices[index][2] + offset.y;

        var c3 = _colour[j][2];

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

        vertices[lastIndex * 9 + 0] = ax;
        vertices[lastIndex * 9 + 1] = ay;
        vertices[lastIndex * 9 + 2] = az;

        normals[lastIndex * 9 + 0] = nx;
        normals[lastIndex * 9 + 1] = ny;
        normals[lastIndex * 9 + 2] = nz;

        colours[lastIndex * 9 + 0] = c1[0];
        colours[lastIndex * 9 + 1] = c1[1];
        colours[lastIndex * 9 + 2] = c1[2];

        vertices[lastIndex * 9 + 3] = bx;
        vertices[lastIndex * 9 + 4] = by;
        vertices[lastIndex * 9 + 5] = bz;

        normals[lastIndex * 9 + 3] = nx;
        normals[lastIndex * 9 + 4] = ny;
        normals[lastIndex * 9 + 5] = nz;

        colours[lastIndex * 9 + 3] = c2[0];
        colours[lastIndex * 9 + 4] = c2[1];
        colours[lastIndex * 9 + 5] = c2[2];

        vertices[lastIndex * 9 + 6] = cx;
        vertices[lastIndex * 9 + 7] = cy;
        vertices[lastIndex * 9 + 8] = cz;

        normals[lastIndex * 9 + 6] = nx;
        normals[lastIndex * 9 + 7] = ny;
        normals[lastIndex * 9 + 8] = nz;

        colours[lastIndex * 9 + 6] = c3[0];
        colours[lastIndex * 9 + 7] = c3[1];
        colours[lastIndex * 9 + 8] = c3[2];

        if (pickingIds) {
          pickingIds[lastIndex * 3 + 0] = _pickingId;
          pickingIds[lastIndex * 3 + 1] = _pickingId;
          pickingIds[lastIndex * 3 + 2] = _pickingId;
        }

        lastIndex++;
      }
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colours, 3));

    if (pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(pickingIds, 1));
    }

    geometry.computeBoundingBox();

    return geometry;
  };

  return {
    mergeAttributes: mergeAttributes,
    createLineGeometry: createLineGeometry,
    createGeometry: createGeometry
  };
})();

export default Buffer;
