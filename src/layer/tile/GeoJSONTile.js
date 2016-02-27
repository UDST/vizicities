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
import Offset from 'polygon-offset';
import geojsonMerge from 'geojson-merge';

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

class GeoJSONTile extends Tile {
  constructor(quadcode, path, layer, options) {
    super(quadcode, path, layer);

    this._defaultStyle = {
      color: '#ffffff',
      height: 0,
      lineOpacity: 1,
      lineTransparent: false,
      lineColor: '#ffffff',
      lineWidth: 1,
      lineBlending: THREE.NormalBlending
    };

    var defaults = {
      topojson: false,
      filter: null,
      style: this._defaultStyle
    };

    this._options = extend(defaults, options);
  }

  // Request data for the tile
  requestTileAsync() {
    // Making this asynchronous really speeds up the LOD framerate
    setTimeout(() => {
      if (!this._mesh) {
        this._mesh = this._createMesh();
        // this._shadowCanvas = this._createShadowCanvas();
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

  _createShadowCanvas() {
    var canvas = document.createElement('canvas');

    // Rendered at a low resolution and later scaled up for a low-quality blur
    canvas.width = 512;
    canvas.height = 512;

    return canvas;
  }

  _addShadow(coordinates) {
    var ctx = this._shadowCanvas.getContext('2d');
    var width = this._shadowCanvas.width;
    var height = this._shadowCanvas.height;

    var _coords;
    var _offset;
    var offset = new Offset();

    // Transform coordinates to shadowCanvas space and draw on canvas
    coordinates.forEach((ring, index) => {
      ctx.beginPath();

      _coords = ring.map(coord => {
        var xFrac = (coord[0] - this._boundsWorld[0]) / this._side;
        var yFrac = (coord[1] - this._boundsWorld[3]) / this._side;
        return [xFrac * width, yFrac * height];
      });

      if (index > 0) {
        _offset = _coords;
      } else {
        _offset = offset.data(_coords).padding(1.3);
      }

      // TODO: This is super flaky and crashes the browser if run on anything
      // put the outer ring (potentially due to winding)
      _offset.forEach((coord, index) => {
        // var xFrac = (coord[0] - this._boundsWorld[0]) / this._side;
        // var yFrac = (coord[1] - this._boundsWorld[3]) / this._side;

        if (index === 0) {
          ctx.moveTo(coord[0], coord[1]);
        } else {
          ctx.lineTo(coord[0], coord[1]);
        }
      });

      ctx.closePath();
    });

    ctx.fillStyle = 'rgba(80, 80, 80, 0.7)';
    ctx.fill();
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

  _processLineString(coordinates, colour) {
    coordinates = coordinates.map(coordinate => {
      var latlon = LatLon(coordinate[1], coordinate[0]);
      var point = this._layer._world.latLonToPoint(latlon);
      return [point.x, point.y];
    });

    var _coords = [];
    var _colours = [];

    var nextCoord;

    // Connect coordinate with the next to make a pair
    //
    // LineSegments requires pairs of vertices so repeat the last point if
    // there's an odd number of vertices
    coordinates.forEach((coordinate, index) => {
      // TODO: Don't hardcode y-value
      _colours.push([colour.r, colour.g, colour.b]);
      _coords.push([coordinate[0], 0, coordinate[1]]);

      nextCoord = (coordinates[index + 1]) ? coordinates[index + 1] : coordinate;

      _colours.push([colour.r, colour.g, colour.b]);
      _coords.push([nextCoord[0], 0, nextCoord[1]]);
    });

    return [_coords, _colours];
  }

  _processMultiLineString(coordinates, colour) {
    var _coords = [];
    var _colours = [];

    var result;
    coordinates.forEach(coordinate => {
      result = this._processLineString(coordinate, colour);

      result[0].forEach(coord => {
        _coords.push(coord);
      });

      result[1].forEach(colour => {
        _colours.push(colour);
      });
    });

    return [_coords, _colours];
  }

  _processTileData(data) {
    console.time(this._tile);

    var geojson;

    if (this._options.topojson) {
      // TODO: Allow TopoJSON objects to be overridden as an option

      var collections = [];

      // If not overridden, merge all features from all objects
      for (var key in data.objects) {
        collections.push(topojson.feature(data, data.objects[key]));
      }

      geojson = geojsonMerge(collections);
    } else {
      // If root doesn't have a type then let's see if there are features in the
      // next step down
      if (!data.type) {
        // TODO: Allow GeoJSON objects to be overridden as an option

        var collections = [];

        // If not overridden, merge all features from all objects
        for (var key in data) {
          if (!data[key].type) {
            continue;
          }

          collections.push(data[key]);
        }

        geojson = geojsonMerge(collections);
      } else {
        geojson = data;
      }
    }

    // TODO: Check that GeoJSON is valid / usable

    var offset = Point(0, 0);
    offset.x = -1 * this._center[0];
    offset.y = -1 * this._center[1];

    var coordinates;

    var features = geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = geojson.features.filter(this._options.filter);
    }

    var style = this._options.style;

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

    // Polygon variables
    var earcutData;
    var faces;

    var colour = new THREE.Color();

    // Light and dark colours used for poor-mans AO gradient on object sides
    var light = new THREE.Color(0xffffff);
    var shadow  = new THREE.Color(0x666666);

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

        var linestringResults = this._processLineString(coordinates, colour);

        lines.vertices.push(linestringResults[0]);
        lines.colours.push(linestringResults[1]);
        lines.verticesCount += linestringResults[0].length;
      }

      if (feature.geometry.type === 'MultiLineString') {
        colour.set(style.lineColor);

        var multiLinestringResults = this._processMultiLineString(coordinates, colour);

        lines.vertices.push(multiLinestringResults[0]);
        lines.colours.push(multiLinestringResults[1]);
        lines.verticesCount += multiLinestringResults[0].length;
      }

      if (feature.geometry.type === 'Polygon') {
        colour.set(style.color);

        coordinates = coordinates.map(ring => {
          return ring.map(coordinate => {
            var latlon = LatLon(coordinate[1], coordinate[0]);
            var point = this._layer._world.latLonToPoint(latlon);
            return [point.x, point.y];
          });
        });

        // Draw footprint on shadow canvas
        //
        // TODO: Disabled for the time-being until it can be sped up / moved to
        // a worker
        // this._addShadow(coordinates);

        earcutData = this._toEarcut(coordinates);

        faces = this._triangulate(earcutData.vertices, earcutData.holes, earcutData.dimensions);

        var groupedVertices = [];
        for (i = 0, il = earcutData.vertices.length; i < il; i += earcutData.dimensions) {
          groupedVertices.push(earcutData.vertices.slice(i, i + earcutData.dimensions));
        }

        var height = 0;

        if (style.height) {
          height = this._world.metresToWorld(style.height, this._pointScale);
        }

        var extruded = extrudePolygon(groupedVertices, faces, {
          bottom: 0,
          top: height
        });

        var topColor = colour.clone().multiply(light);
        var bottomColor = colour.clone().multiply(shadow);

        var _faces = [];
        var _colours = [];

        polygons.vertices.push(extruded.positions);

        var _colour;
        extruded.top.forEach((face, fi) => {
          _colour = [];

          _colour.push([colour.r, colour.g, colour.b]);
          _colour.push([colour.r, colour.g, colour.b]);
          _colour.push([colour.r, colour.g, colour.b]);

          _faces.push(face);
          _colours.push(_colour);
        });

        if (extruded.sides) {
          if (polygons.allFlat) {
            polygons.allFlat = false;
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

        polygons.faces.push(_faces);
        polygons.colours.push(_colours);

        polygons.facesCount += _faces.length;
      }
    });

    // Output shadow canvas
    //
    // TODO: Disabled for the time-being until it can be sped up / moved to
    // a worker

    // var texture = new THREE.Texture(this._shadowCanvas);
    //
    // // Silky smooth images when tilted
    // texture.magFilter = THREE.LinearFilter;
    // texture.minFilter = THREE.LinearMipMapLinearFilter;
    //
    // // TODO: Set this to renderer.getMaxAnisotropy() / 4
    // texture.anisotropy = 4;
    //
    // texture.needsUpdate = true;
    //
    // var material;
    // if (!this._world._environment._skybox) {
    //   material = new THREE.MeshBasicMaterial({
    //     map: texture,
    //     transparent: true,
    //     depthWrite: false
    //   });
    // } else {
    //   material = new THREE.MeshStandardMaterial({
    //     map: texture,
    //     transparent: true,
    //     depthWrite: false
    //   });
    //   material.roughness = 1;
    //   material.metalness = 0.1;
    //   material.envMap = this._world._environment._skybox.getRenderTarget();
    // }
    //
    // var geom = new THREE.PlaneBufferGeometry(this._side, this._side, 1);
    // var mesh = new THREE.Mesh(geom, material);
    //
    // mesh.castShadow = false;
    // mesh.receiveShadow = false;
    // mesh.renderOrder = 1;
    //
    // mesh.rotation.x = -90 * Math.PI / 180;
    //
    // this._mesh.add(mesh);

    // Output lines
    if (lines.vertices.length > 0) {
      var geometry = new THREE.BufferGeometry();

      var vertices = new Float32Array(lines.verticesCount * 3);
      var colours = new Float32Array(lines.verticesCount * 3);

      var _vertices;
      var _colour;

      var lastIndex = 0;

      for (var i = 0; i < lines.vertices.length; i++) {
        _vertices = lines.vertices[i];
        _colour = lines.colours[i];

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

          lastIndex++;
        }
      }

      // itemSize = 3 because there are 3 values (components) per vertex
      geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geometry.addAttribute('color', new THREE.BufferAttribute(colours, 3));

      geometry.computeBoundingBox();

      var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        linewidth: style.lineWidth,
        transparent: style.lineTransparent,
        opacity: style.lineOpacity,
        blending: style.lineBlending
      });

      var mesh = new THREE.LineSegments(geometry, material);

      if (style.lineRenderOrder) {
        mesh.renderOrder = style.lineRenderOrder;
      }

      // TODO: Can a line cast a shadow?
      // mesh.castShadow = true;

      this._mesh.add(mesh);
    }

    // Output polygons
    if (polygons.facesCount > 0) {
      var geometry = new THREE.BufferGeometry();

      // Three components per vertex per face (3 x 3 = 9)
      var vertices = new Float32Array(polygons.facesCount * 9);
      var normals = new Float32Array(polygons.facesCount * 9);
      var colours = new Float32Array(polygons.facesCount * 9);

      var pA = new THREE.Vector3();
      var pB = new THREE.Vector3();
      var pC = new THREE.Vector3();

      var cb = new THREE.Vector3();
      var ab = new THREE.Vector3();

      var index;
      var _faces;
      var _vertices;
      var _colour;
      var lastIndex = 0;
      for (var i = 0; i < polygons.faces.length; i++) {
        _faces = polygons.faces[i];
        _vertices = polygons.vertices[i];
        _colour = polygons.colours[i];

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

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (polygons.allFlat) {
        // This is only useful for flat objects
        mesh.renderOrder = 1;
      }

      this._mesh.add(mesh);
    }

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
  return new GeoJSONTile(quadcode, path, layer, options);
};
