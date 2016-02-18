import LatLon from '../../geo/LatLon';
import BoxHelper from '../../vendor/BoxHelper';
import THREE from 'three';

// Manages a single tile and its layers

var r2d = 180 / Math.PI;

class Tile {
  constructor(quadcode, layer) {
    this._layer = layer;
    this._quadcode = quadcode;

    this._ready = false;

    this._tile = this._quadcodeToTile(quadcode);

    // Bottom-left and top-right bounds in WGS84 coordinates
    this._boundsLatLon = this._tileBoundsWGS84(this._tile);

    // Bottom-left and top-right bounds in world coordinates
    this._boundsWorld = this._tileBoundsFromWGS84(this._boundsLatLon);

    // Tile center in world coordinates
    this._center = this._boundsToCenter(this._boundsWorld);

    // Length of a tile side in world coorindates
    this._side = this._getSide(this._boundsWorld);
  }

  // Returns true if the tile mesh and texture are ready to be used
  // Otherwise, returns false
  isReady() {
    return this._ready;
  }

  // Request data for the various tile providers
  //
  // Providers are provided here and not on instantiation of the class so that
  // providers can be easily changed in subsequent requests without heavy
  // management
  //
  // If requestData is called more than once then the provider data will be
  // re-downloaded and the mesh output will be changed
  //
  // Being able to update tile data and output like this on-the-fly makes it
  // appealing for situations where tile data may be dynamic / realtime
  // (eg. realtime traffic tiles)
  //
  // May need to be intelligent about what exactly is updated each time
  // requestData is called as it doesn't make sense to re-request and
  // re-generate a mesh each time when only the image provider needs updating,
  // and likewise it doesn't make sense to update the imagery when only terrain
  // provider changes
  requestTileAsync(imageProviders) {
    // Making this asynchronous really speeds up the LOD framerate
    setTimeout(() => {
      if (!this._mesh) {
        this._mesh = this._createMesh();
        this._requestTextureAsync();
      }
    }, 0);
  }

  getQuadcode() {
    return this._quadcode;
  }

  getBounds() {
    return this._boundsWorld;
  }

  getCenter() {
    return this._center;
  }

  getSide() {
    return this._side;
  }

  getMesh() {
    return this._mesh;
  }

  // Destroys the tile and removes it from the layer and memory
  //
  // Ensure that this leaves no trace of the tile – no textures, no meshes,
  // nothing in memory or the GPU
  destroy() {}

  _createMesh() {
    var mesh = new THREE.Object3D();
    var geom = new THREE.PlaneBufferGeometry(this._side, this._side, 1);

    var material = new THREE.MeshBasicMaterial({
      depthWrite: false
    });

    var localMesh = new THREE.Mesh(geom, material);
    localMesh.rotation.x = -90 * Math.PI / 180;

    mesh.add(localMesh);

    mesh.position.x = this._center[0];
    mesh.position.z = this._center[1];

    var box = new BoxHelper(localMesh);
    mesh.add(box);

    mesh.add(this._createDebugMesh());

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

  _requestTextureAsync() {
    // Pick a letter between a-c
    var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

    // These tiles can be nearly 20 times larger in filesize than OSM tiles!
    var url = 'http://' + letter + '.basemaps.cartocdn.com/light_nolabels/';
    // var url = 'http://' + letter + '.tile.osm.org/';
    // http://a.tiles.wmflabs.org/osm-no-labels/12/2200/1341.png

    var image = document.createElement('img');

    image.addEventListener('load', event => {
      var texture = new THREE.Texture();

      texture.image = image;
      texture.needsUpdate = true;

      // Silky smooth images when tilted
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      // TODO: Set this to renderer.getMaxAnisotropy() / 4
      texture.anisotropy = 4;

      texture.needsUpdate = true;

      this._mesh.children[0].material.map = texture;
      this._mesh.children[0].material.needsUpdate = true;

      this._texture = texture;
      this._ready = true;
    }, false);

    // image.addEventListener('progress', event => {
    //
    // }, false);

    image.addEventListener('error', event => {
      console.error(event);
    }, false);

    image.crossOrigin = '';

    // Load image
    image.src = url + this._tile[2] + '/' + this._tile[0] + '/' + this._tile[1] + '.png';
  }

  // Convert from quadcode to TMS tile coordinates
  _quadcodeToTile(quadcode) {
    var x = 0;
    var y = 0;
    var z = quadcode.length;

    for (var i = z; i > 0; i--) {
      var mask = 1 << (i - 1);
      var q = +quadcode[z - i];
      if (q === 1) {
        x |= mask;
      }
      if (q === 2) {
        y |= mask;
      }
      if (q === 3) {
        x |= mask;
        y |= mask;
      }
    }

    return [x, y, z];
  }

  // Convert WGS84 tile bounds to world coordinates
  _tileBoundsFromWGS84(boundsWGS84) {
    var sw = this._layer._world.latLonToPoint(LatLon(boundsWGS84[1], boundsWGS84[0]));
    var ne = this._layer._world.latLonToPoint(LatLon(boundsWGS84[3], boundsWGS84[2]));

    return [sw.x, sw.y, ne.x, ne.y];
  }

  // Get tile bounds in WGS84 coordinates
  _tileBoundsWGS84(tile) {
    var e = this._tile2lon(tile[0] + 1, tile[2]);
    var w = this._tile2lon(tile[0], tile[2]);
    var s = this._tile2lat(tile[1] + 1, tile[2]);
    var n = this._tile2lat(tile[1], tile[2]);
    return [w, s, e, n];
  }

  _tile2lon(x, z) {
    return x / Math.pow(2, z) * 360 - 180;
  }

  _tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return r2d * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  _boundsToCenter(bounds) {
    var x = bounds[0] + (bounds[2] - bounds[0]) / 2;
    var y = bounds[1] + (bounds[3] - bounds[1]) / 2;

    return [x, y];
  }

  _getSide(bounds) {
    return (new THREE.Vector3(bounds[0], 0, bounds[3])).sub(new THREE.Vector3(bounds[0], 0, bounds[1])).length();
  }
}

export default Tile;
