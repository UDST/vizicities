import Tile from './Tile';
import BoxHelper from '../../vendor/BoxHelper';
import THREE from 'three';
import reqwest from 'reqwest';
import topojson from 'topojson';
import Point from '../../geo/Point';
import LatLon from '../../geo/LatLon';
import earcut from 'earcut';
import extend from 'lodash.assign';
import extrudePolygon from '../../util/extrudePolygon';

// TODO: Perform tile request and processing in a Web Worker
//
// Use Operative (https://github.com/padolsey/operative)
//
// Would it make sense to have the worker functionality defined in a static
// method so it only gets initialised once and not on every tile instance?
//
// Otherwise, worker processing logic would have to go in the tile layer so not
// to waste loads of time setting up a brand new worker with three.js for each
// tile every single time.
//
// Unsure of the best way to get three.js and VIZI into the worker
//
// Would need to set up a CRS / projection identical to the world instance
//
// Is it possible to bypass requirements on external script by having multiple
// simple worker methods that each take enough inputs to perform a single task
// without requiring VIZI or three.js? So long as the heaviest logic is done in
// the worker and transferrable objects are used then it should be better than
// nothing. Would probably still need things like earcut...
//
// After all, the three.js logic and object creation will still need to be
// done on the main thread regardless so the worker should try to do as much as
// possible with as few dependencies as possible.
//
// Have a look at how this is done in Tangram before implementing anything as
// the approach there is pretty similar and robust.

class TopoJSONTile extends Tile {
  constructor(quadcode, path, layer, options) {
    super(quadcode, path, layer);

    var defaults = {
      filter: null,
      style: {
        color: '#ffffff'
      }
    };

    this._options = extend(defaults, options);
  }

  // Request data for the tile
  requestTileAsync() {
    // Making this asynchronous really speeds up the LOD framerate
    setTimeout(() => {
      if (!this._mesh) {
        this._mesh = this._createMesh();
        this._requestTile();
      }
    }, 0);
  }

  destroy() {
    // Cancel any pending requests
    this._abortRequest();

    // Clear request reference
    this._request = null;

    super.destroy();
  }

  _createMesh() {
    // Something went wrong and the tile
    //
    // Possibly removed by the cache before loaded
    if (!this._center) {
      return;
    }

    var mesh = new THREE.Object3D();

    mesh.position.x = this._center[0];
    mesh.position.z = this._center[1];

    // var geom = new THREE.PlaneBufferGeometry(this._side, this._side, 1);
    //
    // var material = new THREE.MeshBasicMaterial({
    //   depthWrite: false
    // });
    //
    // var localMesh = new THREE.Mesh(geom, material);
    // localMesh.rotation.x = -90 * Math.PI / 180;
    //
    // mesh.add(localMesh);
    //
    // var box = new BoxHelper(localMesh);
    // mesh.add(box);
    //
    // mesh.add(this._createDebugMesh());

    return mesh;
  }

  _createDebugMesh() {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;

    var context = canvas.getContext('2d');
    context.font = 'Bold 20px Helvetica Neue, Verdana, Arial';
    context.fillStyle = '#ff0000';
    context.fillText(this._quadcode, 20, canvas.width / 2 - 5);
    context.fillText(this._tile.toString(), 20, canvas.width / 2 + 25);

    var texture = new THREE.Texture(canvas);

    // Silky smooth images when tilted
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    // TODO: Set this to renderer.getMaxAnisotropy() / 4
    texture.anisotropy = 4;

    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });

    var geom = new THREE.PlaneBufferGeometry(this._side, this._side, 1);
    var mesh = new THREE.Mesh(geom, material);

    mesh.rotation.x = -90 * Math.PI / 180;
    mesh.position.y = 0.1;

    return mesh;
  }

  _requestTile() {
    var urlParams = {
      x: this._tile[0],
      y: this._tile[1],
      z: this._tile[2]
    };

    var url = this._getTileURL(urlParams);

    this._request = reqwest({
      url: url,
      type: 'json',
      crossOrigin: true
    }).then(res => {
      // Clear request reference
      this._request = null;
      this._processTileData(res);
    }).catch(err => {
      console.error(err);

      // Clear request reference
      this._request = null;
    });
  }

  _processTileData(data) {
    console.time(this._tile);

    var geojson = topojson.feature(data, data.objects.vectile);

    var offset = Point(0, 0);
    offset.x = -1 * this._center[0];
    offset.y = -1 * this._center[1];

    var coordinates;
    var earcutData;
    var faces;

    var allVertices = [];
    var allFaces = [];
    var allColours = [];
    var facesCount = 0;

    var colour = new THREE.Color();

    var features = geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = geojson.features.filter(this._options.filter);
    }

    var style = this._options.style;

    features.forEach(feature => {
      // feature.geometry, feature.properties

      // Get style object, if provided
      if (typeof this._options.style === 'function') {
        style = this._options.style(feature);
      }

      // console.log(style);

      var coordinates = feature.geometry.coordinates;

      // Skip if geometry is a point
      //
      // This should be a user-defined filter as it would be wrong to assume
      // that people won't want to output points
      if (!coordinates[0] || !coordinates[0][0] || !Array.isArray(coordinates[0][0])) {
        return;
      }

      coordinates = coordinates.map(ring => {
        return ring.map(coordinate => {
          var latlon = LatLon(coordinate[1], coordinate[0]);
          var point = this._layer._world.latLonToPoint(latlon);
          return [point.x, point.y];
        });
      });

      earcutData = this._toEarcut(coordinates);

      faces = this._triangulate(earcutData.vertices, earcutData.holes, earcutData.dimensions);

      var groupedVertices = [];
      for (i = 0, il = earcutData.vertices.length; i < il; i += earcutData.dimensions) {
        groupedVertices.push(earcutData.vertices.slice(i, i + earcutData.dimensions));
      }

      var extruded = extrudePolygon(groupedVertices, faces);

      colour.set(style.color);

      // allVertices.push(earcutData.vertices);
      // allColours.push([colour.r, colour.g, colour.b]);
      // allFaces.push(faces);

      allVertices.push(extruded.positions);
      allColours.push([colour.r, colour.g, colour.b]);
      allFaces.push(extruded.faces);

      facesCount += extruded.faces.length;
    });

    // console.log(allVertices);
    // return;

    // Skip if no faces
    //
    // Need to check way before this if there are no faces, before even doing
    // earcut triangulation.
    if (facesCount === 0) {
      this._ready = true;
      return;
    }

    var geometry = new THREE.BufferGeometry();

    // Three components per vertex per face (3 x 3 = 9)
    var vertices = new Float32Array(facesCount * 9);
    var normals = new Float32Array(facesCount * 9);
    var colours = new Float32Array(facesCount * 9);

    var pA = new THREE.Vector3();
    var pB = new THREE.Vector3();
    var pC = new THREE.Vector3();

    var cb = new THREE.Vector3();
    var ab = new THREE.Vector3();

    var dim = 2;

    var index;
    var _faces;
    var _vertices;
    var _colour;
    var lastIndex = 0;
    for (var i = 0; i < allFaces.length; i++) {
      _faces = allFaces[i];
      _vertices = allVertices[i];
      _colour = allColours[i];

      for (var j = 0; j < _faces.length; j++) {
        // Array of vertex indexes for the face
        index = _faces[j][0];
        //
        // var ax = _vertices[index * dim] + offset.x;
        // var ay = 0;
        // var az = _vertices[index * dim + 1] + offset.y;
        //
        // index = _faces[j][1];
        //
        // var bx = _vertices[index * dim] + offset.x;
        // var by = 0;
        // var bz = _vertices[index * dim + 1] + offset.y;
        //
        // index = _faces[j][2];
        //
        // var cx = _vertices[index * dim] + offset.x;
        // var cy = 0;
        // var cz = _vertices[index * dim + 1] + offset.y;

        var ax = _vertices[index][0] + offset.x;
        var ay = _vertices[index][1];
        var az = _vertices[index][2] + offset.y;

        index = _faces[j][1];

        var bx = _vertices[index][0] + offset.x;
        var by = _vertices[index][1];
        var bz = _vertices[index][2] + offset.y;

        index = _faces[j][2];

        var cx = _vertices[index][0] + offset.x;
        var cy = _vertices[index][1];
        var cz = _vertices[index][2] + offset.y;

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

        colours[lastIndex * 9 + 0] = _colour[0];
        colours[lastIndex * 9 + 1] = _colour[1];
        colours[lastIndex * 9 + 2] = _colour[2];

        vertices[lastIndex * 9 + 3] = bx;
        vertices[lastIndex * 9 + 4] = by;
        vertices[lastIndex * 9 + 5] = bz;

        normals[lastIndex * 9 + 3] = nx;
        normals[lastIndex * 9 + 4] = ny;
        normals[lastIndex * 9 + 5] = nz;

        colours[lastIndex * 9 + 3] = _colour[0];
        colours[lastIndex * 9 + 4] = _colour[1];
        colours[lastIndex * 9 + 5] = _colour[2];

        vertices[lastIndex * 9 + 6] = cx;
        vertices[lastIndex * 9 + 7] = cy;
        vertices[lastIndex * 9 + 8] = cz;

        normals[lastIndex * 9 + 6] = nx;
        normals[lastIndex * 9 + 7] = ny;
        normals[lastIndex * 9 + 8] = nz;

        colours[lastIndex * 9 + 6] = _colour[0];
        colours[lastIndex * 9 + 7] = _colour[1];
        colours[lastIndex * 9 + 8] = _colour[2];

        lastIndex++;
      }
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colours, 3));

    geometry.computeBoundingBox();

    var material;
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

    var mesh = new THREE.Mesh(geometry, material);

    // This is only useful for flat objects
    // mesh.renderOrder = 1;

    this._mesh.add(mesh);

    this._ready = true;
    console.timeEnd(this._tile);
    console.log(`${this._tile}: ${features.length} features`);
  }

  _toEarcut(data) {
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
  }

  _triangulate(contour, holes, dim) {
    // console.time('earcut');

    var faces = earcut(contour, holes, dim);
    var result = [];

    for (i = 0, il = faces.length; i < il; i += 3) {
      result.push(faces.slice(i, i + 3));
    }

    // console.timeEnd('earcut');

    return result;
  }

  _abortRequest() {
    if (!this._request) {
      return;
    }

    this._request.abort();
  }
}

// Initialise without requiring new keyword
export default function(quadcode, path, layer, options) {
  return new TopoJSONTile(quadcode, path, layer, options);
};
