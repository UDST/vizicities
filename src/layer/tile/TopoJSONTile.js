import Tile from './Tile';
import BoxHelper from '../../vendor/BoxHelper';
import THREE from 'three';
import reqwest from 'reqwest';
import topojson from 'topojson';
import Point from '../../geo/Point';
import LatLon from '../../geo/LatLon';
import earcut from 'earcut';

class TopoJSONTile extends Tile {
  constructor(quadcode, path, layer) {
    super(quadcode, path, layer);
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

    mesh.renderOrder = 1;

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
    var geojson = topojson.feature(data, data.objects.vectile);

    var offset = Point(0, 0);
    offset.x = -1 * this._center[0];
    offset.y = -1 * this._center[1];

    var coordinates;
    var earcutData;
    var faces;
    // var geometry;

    var allVertices = [];
    var allFaces = [];
    var facesCount = 0;

    geojson.features.forEach(feature => {
      // feature.geometry, feature.properties

      var coordinates = feature.geometry.coordinates;

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

      allVertices.push(earcutData.vertices);
      allFaces.push(faces);

      facesCount += faces.length;

      // console.log(earcutData.vertices);
      // console.log(faces);
      // return;

      // geometry = new THREE.BufferGeometry();
      //
      // // Three components per vertex per face (3 x 3 = 9)
      // var vertices = new Float32Array(faces.length * 9);
      //
      // var index;
      // for (var i = 0; i < faces.length; i++) {
      //   // Array of vertex indexes for the face
      //   index = faces[i][0];
      //
      //   vertices[i * 9 + 0] = earcutData.vertices[index * dim];
      //   vertices[i * 9 + 1] = 0;
      //   vertices[i * 9 + 2] = earcutData.vertices[index * dim + 1];
      //
      //   // Array of vertex indexes for the face
      //   index = faces[i][1];
      //
      //   vertices[i * 9 + 3] = earcutData.vertices[index * dim];
      //   vertices[i * 9 + 4] = 0;
      //   vertices[i * 9 + 5] = earcutData.vertices[index * dim + 1];
      //
      //   // Array of vertex indexes for the face
      //   index = faces[i][2];
      //
      //   vertices[i * 9 + 6] = earcutData.vertices[index * dim];
      //   vertices[i * 9 + 7] = 0;
      //   vertices[i * 9 + 8] = earcutData.vertices[index * dim + 1];
      // }

      // var shape = new THREE.Shape();
      //
      // var outer = coordinates.shift();
      // var inners = coordinates;
      //
      // if (!outer || !outer[0] || !Array.isArray(outer[0])) {
      //   return;
      // }
      //
      // // Create outer shape
      // outer.forEach((coord, index) => {
      //   var latlon = LatLon(coord[1], coord[0]);
      //   var point = this._layer._world.latLonToPoint(latlon);
      //
      //   // Move if first coordinate
      //   if (index === 0) {
      //     shape.moveTo(point.x + offset.x, point.y + offset.y);
      //   } else {
      //     shape.lineTo(point.x + offset.x, point.y + offset.y);
      //   }
      // });
      //
      // var geom = new THREE.ShapeGeometry(shape);
      // var mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
      //   color: 0x0000ff,
      //   side: THREE.BackSide,
      //   depthWrite: false
      // }));
      //
      // // Offset
      // // mesh.position.x = -1 * offset.x;
      // // mesh.position.z = -1 * offset.y;
      //
      // mesh.rotation.x = 90 * Math.PI / 180;
      //
      // this._mesh.add(mesh);
    });

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

    var dim = 2;

    var index;
    var _faces;
    var _vertices;
    var lastIndex = 0;
    for (var i = 0; i < allFaces.length; i++) {
      _faces = allFaces[i];
      _vertices = allVertices[i];

      for (var j = 0; j < _faces.length; j++) {
        // Array of vertex indexes for the face
        index = _faces[j][0];

        vertices[lastIndex * 9 + 0] = _vertices[index * dim] + offset.x;
        vertices[lastIndex * 9 + 1] = 0;
        vertices[lastIndex * 9 + 2] = _vertices[index * dim + 1] + offset.y;

        // Array of vertex indexes for the face
        index = _faces[j][1];

        vertices[lastIndex * 9 + 3] = _vertices[index * dim] + offset.x;
        vertices[lastIndex * 9 + 4] = 0;
        vertices[lastIndex * 9 + 5] = _vertices[index * dim + 1] + offset.y;

        // Array of vertex indexes for the face
        index = _faces[j][2];

        vertices[lastIndex * 9 + 6] = _vertices[index * dim] + offset.x;
        vertices[lastIndex * 9 + 7] = 0;
        vertices[lastIndex * 9 + 8] = _vertices[index * dim + 1] + offset.y;

        lastIndex++;
      }
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    var material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.BackSide,
      depthWrite: false
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 1;

    this._mesh.add(mesh);

    this._ready = true;
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
export default function(quadcode, path, layer) {
  return new TopoJSONTile(quadcode, path, layer);
};
