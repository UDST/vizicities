import Tile from './Tile';
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

// TODO: Look into using a GeoJSONLayer to represent and output the tile data
// instead of duplicating a lot of effort within this class

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
      picking: false,
      topojson: false,
      filter: null,
      onClick: null,
      style: this._defaultStyle
    };

    this._options = extend({}, defaults, options);

    if (typeof options.style === 'function') {
      this._options.style = options.style;
    } else {
      this._options.style = extend({}, defaults.style, options.style);
    }
  }

  // Request data for the tile
  requestTileAsync() {
    // Making this asynchronous really speeds up the LOD framerate
    setTimeout(() => {
      if (!this._mesh) {
        this._mesh = this._createMesh();

        if (this._options.picking) {
          this._pickingMesh = this._createPickingMesh();
        }

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

  _createPickingMesh() {
    if (!this._center) {
      return;
    }

    var mesh = new THREE.Object3D();

    mesh.position.x = this._center[0];
    mesh.position.z = this._center[1];

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

    var geojson = GeoJSON.collectFeatures(data, this._options.topojson);

    // TODO: Check that GeoJSON is valid / usable

    var features = geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = geojson.features.filter(this._options.filter);
    }

    var style = this._options.style;

    var offset = Point(0, 0);
    offset.x = -1 * this._center[0];
    offset.y = -1 * this._center[1];

    // TODO: Wrap into a helper method so this isn't duplicated in the non-tiled
    // GeoJSON output layer
    //
    // Need to be careful as to not make it impossible to fork this off into a
    // worker script at a later stage
    //
    // Also unsure as to whether it's wise to lump so much into a black box
    //
    // var meshes = GeoJSON.createMeshes(features, offset, style);

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

    if (this._options.picking) {
      polygons.pickingIds = [];
      lines.pickingIds = [];
    }

    var colour = new THREE.Color();

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
        style = extend({}, this._defaultStyle, this._options.style(feature));
      }

      var coordinates = feature.geometry.coordinates;

      // if (feature.geometry.type === 'LineString') {
      if (feature.geometry.type === 'LineString') {
        colour.set(style.lineColor);

        coordinates = coordinates.map(coordinate => {
          var latlon = LatLon(coordinate[1], coordinate[0]);
          var point = this._layer._world.latLonToPoint(latlon);
          return [point.x, point.y];
        });

        var height = 0;

        if (style.lineHeight) {
          height = this._world.metresToWorld(style.lineHeight, this._pointScale);
        }

        var linestringAttributes = GeoJSON.lineStringAttributes(coordinates, colour, height);

        lines.vertices.push(linestringAttributes.vertices);
        lines.colours.push(linestringAttributes.colours);

        if (this._options.picking) {
          var pickingId = this._layer.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          lines.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        lines.verticesCount += linestringAttributes.vertices.length;
      }

      if (feature.geometry.type === 'MultiLineString') {
        colour.set(style.lineColor);

        coordinates = coordinates.map(_coordinates => {
          return _coordinates.map(coordinate => {
            var latlon = LatLon(coordinate[1], coordinate[0]);
            var point = this._layer._world.latLonToPoint(latlon);
            return [point.x, point.y];
          });
        });

        var height = 0;

        if (style.lineHeight) {
          height = this._world.metresToWorld(style.lineHeight, this._pointScale);
        }

        var multiLinestringAttributes = GeoJSON.multiLineStringAttributes(coordinates, colour, height);

        lines.vertices.push(multiLinestringAttributes.vertices);
        lines.colours.push(multiLinestringAttributes.colours);

        if (this._options.picking) {
          var pickingId = this._layer.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          lines.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        lines.verticesCount += multiLinestringAttributes.vertices.length;
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

        var height = 0;

        if (style.height) {
          height = this._world.metresToWorld(style.height, this._pointScale);
        }

        // Draw footprint on shadow canvas
        //
        // TODO: Disabled for the time-being until it can be sped up / moved to
        // a worker
        // this._addShadow(coordinates);

        var polygonAttributes = GeoJSON.polygonAttributes(coordinates, colour, height);

        polygons.vertices.push(polygonAttributes.vertices);
        polygons.faces.push(polygonAttributes.faces);
        polygons.colours.push(polygonAttributes.colours);

        if (this._options.picking) {
          var pickingId = this._layer.getPickingId();

          // Inject picking ID
          //
          // TODO: Perhaps handle this within the GeoJSON helper
          polygons.pickingIds.push(pickingId);

          if (this._options.onClick) {
            // TODO: Find a way to properly remove this listener on destroy
            this._world.on('pick-' + pickingId, (point2d, point3d, intersects) => {
              this._options.onClick(feature, point2d, point3d, intersects);
            });
          }
        }

        if (polygons.allFlat && !polygonAttributes.flat) {
          polygons.allFlat = false;
        }

        polygons.facesCount += polygonAttributes.faces.length;
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

    var geometry;
    var material;
    var mesh;

    // Output lines
    if (lines.vertices.length > 0) {
      geometry = Buffer.createLineGeometry(lines, offset);

      material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        linewidth: style.lineWidth,
        transparent: style.lineTransparent,
        opacity: style.lineOpacity,
        blending: style.lineBlending
      });

      mesh = new THREE.LineSegments(geometry, material);

      if (style.lineRenderOrder !== undefined) {
        material.depthWrite = false;
        mesh.renderOrder = style.lineRenderOrder;
      }

      // TODO: Can a line cast a shadow?
      // mesh.castShadow = true;

      this._mesh.add(mesh);

      if (this._options.picking) {
        material = new PickingMaterial();
        material.side = THREE.BackSide;

        // Make the line wider / easier to pick
        material.linewidth = style.lineWidth + material.linePadding;

        var pickingMesh = new THREE.LineSegments(geometry, material);
        this._pickingMesh.add(pickingMesh);
      }
    }

    // Output polygons
    if (polygons.facesCount > 0) {
      geometry = Buffer.createGeometry(polygons, offset);

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

      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (polygons.allFlat) {
        material.depthWrite = false;
        mesh.renderOrder = 1;
      }

      this._mesh.add(mesh);

      if (this._options.picking) {
        material = new PickingMaterial();
        material.side = THREE.BackSide;

        var pickingMesh = new THREE.Mesh(geometry, material);
        this._pickingMesh.add(pickingMesh);
      }
    }

    this._ready = true;
    console.timeEnd(this._tile);
    console.log(`${this._tile}: ${features.length} features`);
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
