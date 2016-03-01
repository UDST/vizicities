import {point as Point} from '../../geo/Point';
import {latLon as LatLon} from '../../geo/LatLon';
import THREE from 'three';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// Manages a single tile and its layers

var r2d = 180 / Math.PI;

var tileURLRegex = /\{([szxy])\}/g;

class Tile {
  constructor(quadcode, path, layer) {
    this._layer = layer;
    this._world = layer._world;
    this._quadcode = quadcode;
    this._path = path;

    this._ready = false;

    this._tile = this._quadcodeToTile(quadcode);

    // Bottom-left and top-right bounds in WGS84 coordinates
    this._boundsLatLon = this._tileBoundsWGS84(this._tile);

    // Bottom-left and top-right bounds in world coordinates
    this._boundsWorld = this._tileBoundsFromWGS84(this._boundsLatLon);

    // Tile center in world coordinates
    this._center = this._boundsToCenter(this._boundsWorld);

    // Tile center in projected coordinates
    this._centerLatlon = this._world.pointToLatLon(Point(this._center[0], this._center[1]));

    // Length of a tile side in world coorindates
    this._side = this._getSide(this._boundsWorld);

    // Point scale for tile (for unit conversion)
    this._pointScale = this._world.pointScale(this._centerLatlon);
  }

  // Returns true if the tile mesh and texture are ready to be used
  // Otherwise, returns false
  isReady() {
    return this._ready;
  }

  // Request data for the tile
  requestTileAsync() {}

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

  getPickingMesh() {
    return this._pickingMesh;
  }

  // Destroys the tile and removes it from the layer and memory
  //
  // Ensure that this leaves no trace of the tile – no textures, no meshes,
  // nothing in memory or the GPU
  destroy() {
    // Delete reference to layer and world
    this._layer = null;
    this._world = null;

    // Delete location references
    this._boundsLatLon = null;
    this._boundsWorld = null;
    this._center = null;

    // Done if no mesh
    if (!this._mesh) {
      return;
    }

    if (this._mesh.children) {
      // Dispose of mesh and materials
      this._mesh.children.forEach(child => {
        child.geometry.dispose();
        child.geometry = null;

        if (child.material.map) {
          child.material.map.dispose();
          child.material.map = null;
        }

        child.material.dispose();
        child.material = null;
      });
    } else {
      this._mesh.geometry.dispose();
      this._mesh.geometry = null;

      if (this._mesh.material.map) {
        this._mesh.material.map.dispose();
        this._mesh.material.map = null;
      }

      this._mesh.material.dispose();
      this._mesh.material = null;
    }
  }

  _createMesh() {}
  _createDebugMesh() {}

  _getTileURL(urlParams) {
    if (!urlParams.s) {
      // Default to a random choice of a, b or c
      urlParams.s = String.fromCharCode(97 + Math.floor(Math.random() * 3));
    }

    tileURLRegex.lastIndex = 0;
    return this._path.replace(tileURLRegex, function(value, key) {
      // Replace with paramter, otherwise keep existing value
      return urlParams[key];
    });
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
