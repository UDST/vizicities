import Tile from './Tile';
import {geoJSONLayer as GeoJSONLayer} from '../GeoJSONLayer';
import BoxHelper from '../../vendor/BoxHelper';
import THREE from 'three';
import reqwest from 'reqwest';
import {point as Point} from '../../geo/Point';
import {latLon as LatLon} from '../../geo/LatLon';
import extend from 'lodash.assign';
// import Offset from 'polygon-offset';
import GeoJSON from '../../util/GeoJSON';
import Buffer from '../../util/Buffer';
import PickingMaterial from '../../engine/PickingMaterial';

// TODO: Map picking IDs to some reference within the tile data / geometry so
// that something useful can be done when an object is picked / clicked on

// TODO: Make sure nothing is left behind in the heap after calling destroy()

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

    this._defaultStyle = GeoJSON.defaultStyle;

    var defaults = {
      output: true,
      outputToScene: false,
      interactive: false,
      topojson: false,
      filter: null,
      onEachFeature: null,
      polygonMaterial: null,
      onPolygonMesh: null,
      onPolygonBufferAttributes: null,
      polylineMaterial: null,
      onPolylineMesh: null,
      onPolylineBufferAttributes: null,
      pointGeometry: null,
      pointMaterial: null,
      onPointMesh: null,
      style: GeoJSON.defaultStyle,
      keepFeatures: false
    };

    var _options = extend({}, defaults, options);

    if (typeof options.style === 'function') {
      _options.style = options.style;
    } else {
      _options.style = extend({}, defaults.style, options.style);
    }

    this._options = _options;
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

  // TODO: Destroy GeoJSONLayer
  destroy() {
    // Cancel any pending requests
    this._abortRequest();

    // Clear request reference
    this._request = null;

    if (this._geojsonLayer) {
      this._geojsonLayer.destroy();
      this._geojsonLayer = null;
    }

    this._mesh = null;

    // TODO: Properly dispose of picking mesh
    this._pickingMesh = null;

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

  // _createShadowCanvas() {
  //   var canvas = document.createElement('canvas');
  //
  //   // Rendered at a low resolution and later scaled up for a low-quality blur
  //   canvas.width = 512;
  //   canvas.height = 512;
  //
  //   return canvas;
  // }

  // _addShadow(coordinates) {
  //   var ctx = this._shadowCanvas.getContext('2d');
  //   var width = this._shadowCanvas.width;
  //   var height = this._shadowCanvas.height;
  //
  //   var _coords;
  //   var _offset;
  //   var offset = new Offset();
  //
  //   // Transform coordinates to shadowCanvas space and draw on canvas
  //   coordinates.forEach((ring, index) => {
  //     ctx.beginPath();
  //
  //     _coords = ring.map(coord => {
  //       var xFrac = (coord[0] - this._boundsWorld[0]) / this._side;
  //       var yFrac = (coord[1] - this._boundsWorld[3]) / this._side;
  //       return [xFrac * width, yFrac * height];
  //     });
  //
  //     if (index > 0) {
  //       _offset = _coords;
  //     } else {
  //       _offset = offset.data(_coords).padding(1.3);
  //     }
  //
  //     // TODO: This is super flaky and crashes the browser if run on anything
  //     // put the outer ring (potentially due to winding)
  //     _offset.forEach((coord, index) => {
  //       // var xFrac = (coord[0] - this._boundsWorld[0]) / this._side;
  //       // var yFrac = (coord[1] - this._boundsWorld[3]) / this._side;
  //
  //       if (index === 0) {
  //         ctx.moveTo(coord[0], coord[1]);
  //       } else {
  //         ctx.lineTo(coord[0], coord[1]);
  //       }
  //     });
  //
  //     ctx.closePath();
  //   });
  //
  //   ctx.fillStyle = 'rgba(80, 80, 80, 0.7)';
  //   ctx.fill();
  // }

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

    // Using this creates a huge amount of memory due to the quantity of tiles
    this._geojsonLayer = GeoJSONLayer(data, this._options).addTo(this._world);

    this._mesh = this._geojsonLayer._object3D;
    this._pickingMesh = this._geojsonLayer._pickingMesh;

    // Free the GeoJSON memory as we don't need it
    //
    // TODO: This should probably be a method within GeoJSONLayer
    this._geojsonLayer._geojson = null;

    // TODO: Fix or store shadow canvas stuff and get rid of this code
    // Draw footprint on shadow canvas
    //
    // TODO: Disabled for the time-being until it can be sped up / moved to
    // a worker
    // this._addShadow(coordinates);

    // Output shadow canvas

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

    this._ready = true;
    console.timeEnd(this._tile);
  }

  _abortRequest() {
    if (!this._request) {
      return;
    }

    this._request.abort();
  }
}

export default GeoJSONTile;

var noNew = function(quadcode, path, layer, options) {
  return new GeoJSONTile(quadcode, path, layer, options);
};

// Initialise without requiring new keyword
export {noNew as geoJSONTile};
