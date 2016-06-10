// TODO: Consider adopting GeoJSON CSS
// http://wiki.openstreetmap.org/wiki/Geojson_CSS

// TODO: Allow interaction to be defined per-layer to save on resources
//
// For example, only allow polygons to be interactive via a polygonInteractive
// option

import LayerGroup from './LayerGroup';
import extend from 'lodash.assign';
import reqwest from 'reqwest';
import GeoJSON from '../util/GeoJSON';
import Buffer from '../util/Buffer';
import PickingMaterial from '../engine/PickingMaterial';
import PolygonLayer from './geometry/PolygonLayer';
import PolylineLayer from './geometry/PolylineLayer';
import PointLayer from './geometry/PointLayer';

class GeoJSONLayer extends LayerGroup {
  constructor(geojson, options) {
    var defaults = {
      output: false,
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
      keepFeatures: true
    };

    var _options = extend({}, defaults, options);

    if (typeof options.style === 'function') {
      _options.style = options.style;
    } else {
      _options.style = extend({}, defaults.style, options.style);
    }

    super(_options);

    this._geojson = geojson;
  }

  _onAdd(world) {
    // Only add to picking mesh if this layer is controlling output
    //
    // Otherwise, assume another component will eventually add a mesh to
    // the picking scene
    if (this.isOutput()) {
      this._pickingMesh = new THREE.Object3D();
      this.addToPicking(this._pickingMesh);
    }

    // Request data from URL if needed
    if (typeof this._geojson === 'string') {
      this._requestData(this._geojson);
    } else {
      // Process and add GeoJSON to layer
      this._processData(this._geojson);
    }
  }

  _requestData(url) {
    this._request = reqwest({
      url: url,
      type: 'json',
      crossOrigin: true
    }).then(res => {
      // Clear request reference
      this._request = null;
      this._processData(res);
    }).catch(err => {
      console.error(err);

      // Clear request reference
      this._request = null;
    });
  }

  // TODO: Wrap into a helper method so this isn't duplicated in the tiled
  // GeoJSON output layer
  //
  // Need to be careful as to not make it impossible to fork this off into a
  // worker script at a later stage
  _processData(data) {
    // Collects features into a single FeatureCollection
    //
    // Also converts TopoJSON to GeoJSON if instructed
    this._geojson = GeoJSON.collectFeatures(data, this._options.topojson);

    // TODO: Check that GeoJSON is valid / usable

    var features = this._geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = this._geojson.features.filter(this._options.filter);
    }

    var defaults = {};

    // Assume that a style won't be set per feature
    var style = this._options.style;

    var options;
    features.forEach(feature => {
      // Get per-feature style object, if provided
      if (typeof this._options.style === 'function') {
        style = extend({}, GeoJSON.defaultStyle, this._options.style(feature));
      }

      options = extend({}, defaults, {
        // If merging feature layers, stop them outputting themselves
        // If not, let feature layers output themselves to the world
        output: !this.isOutput(),
        interactive: this._options.interactive,
        style: style
      });

      var layer = this._featureToLayer(feature, options);

      if (!layer) {
        return;
      }

      // Sometimes you don't want to store a reference to the feature
      //
      // For example, to save memory when being used by tile layers
      if (this._options.keepFeatures) {
        layer.feature = feature;
      }

      // If defined, call a function for each feature
      //
      // This is commonly used for adding event listeners from the user script
      if (this._options.onEachFeature) {
        this._options.onEachFeature(feature, layer);
      }

      this.addLayer(layer);
    });

    // If merging layers do that now, otherwise skip as the geometry layers
    // should have already outputted themselves
    if (!this.isOutput()) {
      return;
    }

    // From here on we can assume that we want to merge the layers

    var polygonAttributes = [];
    var polygonFlat = true;

    var polylineAttributes = [];
    var pointAttributes = [];

    this._layers.forEach(layer => {
      if (layer instanceof PolygonLayer) {
        polygonAttributes.push(layer.getBufferAttributes());

        if (polygonFlat && !layer.isFlat()) {
          polygonFlat = false;
        }
      } else if (layer instanceof PolylineLayer) {
        polylineAttributes.push(layer.getBufferAttributes());
      } else if (layer instanceof PointLayer) {
        pointAttributes.push(layer.getBufferAttributes());
      }
    });

    if (polygonAttributes.length > 0) {
      var mergedPolygonAttributes = Buffer.mergeAttributes(polygonAttributes);
      this._setPolygonMesh(mergedPolygonAttributes, polygonFlat);
      this.add(this._polygonMesh);
    }

    if (polylineAttributes.length > 0) {
      var mergedPolylineAttributes = Buffer.mergeAttributes(polylineAttributes);
      this._setPolylineMesh(mergedPolylineAttributes);
      this.add(this._polylineMesh);
    }

    if (pointAttributes.length > 0) {
      var mergedPointAttributes = Buffer.mergeAttributes(pointAttributes);
      this._setPointMesh(mergedPointAttributes);
      this.add(this._pointMesh);
    }

    // Clean up layers
    //
    // TODO: Are there ever situations where the unmerged buffer attributes
    // and coordinates would still be required?
    this._layers.forEach(layer => {
      layer.clearBufferAttributes();
      layer.clearCoordinates();
    });
  }

  // Create and store mesh from buffer attributes
  //
  // TODO: De-dupe this from the individual mesh creation logic within each
  // geometry layer (materials, settings, etc)
  //
  // Could make this an abstract method for each geometry layer
  _setPolygonMesh(attributes, flat) {
    var geometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(attributes.vertices, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(attributes.normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(attributes.colours, 3));

    if (attributes.pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(attributes.pickingIds, 1));
    }

    geometry.computeBoundingBox();

    // TODO: Make this work when style is a function per feature
    var style = (typeof this._options.style === 'function') ? this._options.style(this._geojson.features[0]) : this._options.style;
    style = extend({}, GeoJSON.defaultStyle, style);

    var material;
    if (this._options.polygonMaterial && this._options.polygonMaterial instanceof THREE.Material) {
      material = this._options.polygonMaterial;
    } else if (!this._world._environment._skybox) {
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
      material.envMap = this._world._environment._skybox.getRenderTarget();
    }

    var mesh;

    // Pass mesh through callback, if defined
    if (typeof this._options.onPolygonMesh === 'function') {
      mesh = this._options.onPolygonMesh(geometry, material);
    } else {
      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }

    if (flat) {
      material.depthWrite = false;
      mesh.renderOrder = 1;
    }

    if (this._options.interactive && this._pickingMesh) {
      material = new PickingMaterial();
      material.side = THREE.BackSide;

      var pickingMesh = new THREE.Mesh(geometry, material);
      this._pickingMesh.add(pickingMesh);
    }

    this._polygonMesh = mesh;
  }

  _setPolylineMesh(attributes) {
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

    // TODO: Make this work when style is a function per feature
    var style = (typeof this._options.style === 'function') ? this._options.style(this._geojson.features[0]) : this._options.style;
    style = extend({}, GeoJSON.defaultStyle, style);

    var material;
    if (this._options.polylineMaterial && this._options.polylineMaterial instanceof THREE.Material) {
      material = this._options.polylineMaterial;
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
    if (typeof this._options.onPolylineMesh === 'function') {
      mesh = this._options.onPolylineMesh(geometry, material);
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

    this._polylineMesh = mesh;
  }

  _setPointMesh(attributes) {
    var geometry = new THREE.BufferGeometry();

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(attributes.vertices, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(attributes.normals, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(attributes.colours, 3));

    if (attributes.pickingIds) {
      geometry.addAttribute('pickingId', new THREE.BufferAttribute(attributes.pickingIds, 1));
    }

    geometry.computeBoundingBox();

    var material;
    if (this._options.pointMaterial && this._options.pointMaterial instanceof THREE.Material) {
      material = this._options.pointMaterial;
    } else if (!this._world._environment._skybox) {
      material = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors
        // side: THREE.BackSide
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        vertexColors: THREE.VertexColors
        // side: THREE.BackSide
      });
      material.roughness = 1;
      material.metalness = 0.1;
      material.envMapIntensity = 3;
      material.envMap = this._world._environment._skybox.getRenderTarget();
    }

    var mesh;

    // Pass mesh callback, if defined
    if (typeof this._options.onPointMesh === 'function') {
      mesh = this._options.onPointMesh(geometry, material);
    } else {
      mesh = new THREE.Mesh(geometry, material);

      mesh.castShadow = true;
      // mesh.receiveShadow = true;
    }

    if (this._options.interactive && this._pickingMesh) {
      material = new PickingMaterial();
      // material.side = THREE.BackSide;

      var pickingMesh = new THREE.Mesh(geometry, material);
      this._pickingMesh.add(pickingMesh);
    }

    this._pointMesh = mesh;
  }

  // TODO: Support all GeoJSON geometry types
  _featureToLayer(feature, options) {
    var geometry = feature.geometry;
    var coordinates = (geometry.coordinates) ? geometry.coordinates : null;

    if (!coordinates || !geometry) {
      return;
    }

    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
      // Get material instance to use for polygon, if provided
      if (typeof this._options.polygonMaterial === 'function') {
        options.geometry = this._options.polygonMaterial(feature);
      }

      if (typeof this._options.onPolygonMesh === 'function') {
        options.onMesh = this._options.onPolygonMesh;
      }

      // Pass onBufferAttributes callback, if defined
      if (typeof this._options.onPolygonBufferAttributes === 'function') {
        options.onBufferAttributes = this._options.onPolygonBufferAttributes;
      }

      return new PolygonLayer(coordinates, options);
    }

    if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
      // Get material instance to use for line, if provided
      if (typeof this._options.lineMaterial === 'function') {
        options.geometry = this._options.lineMaterial(feature);
      }

      if (typeof this._options.onPolylineMesh === 'function') {
        options.onMesh = this._options.onPolylineMesh;
      }

      // Pass onBufferAttributes callback, if defined
      if (typeof this._options.onPolylineBufferAttributes === 'function') {
        options.onBufferAttributes = this._options.onPolylineBufferAttributes;
      }

      return new PolylineLayer(coordinates, options);
    }

    if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
      // Get geometry object to use for point, if provided
      if (typeof this._options.pointGeometry === 'function') {
        options.geometry = this._options.pointGeometry(feature);
      }

      // Get material instance to use for point, if provided
      if (typeof this._options.pointMaterial === 'function') {
        options.geometry = this._options.pointMaterial(feature);
      }

      if (typeof this._options.onPointMesh === 'function') {
        options.onMesh = this._options.onPointMesh;
      }

      return new PointLayer(coordinates, options);
    }
  }

  _abortRequest() {
    if (!this._request) {
      return;
    }

    this._request.abort();
  }

  // Destroy the layers and remove them from the scene and memory
  destroy() {
    // Cancel any pending requests
    this._abortRequest();

    // Clear request reference
    this._request = null;

    this._geojson = null;

    if (this._pickingMesh) {
      // TODO: Properly dispose of picking mesh
      this._pickingMesh = null;
    }

    if (this._polygonMesh) {
      this._polygonMesh = null;
    }

    if (this._polylineMesh) {
      this._polylineMesh = null;
    }

    if (this._pointMesh) {
      this._pointMesh = null;
    }

    // Run common destruction logic from parent
    super.destroy();
  }
}

export default GeoJSONLayer;

var noNew = function(geojson, options) {
  return new GeoJSONLayer(geojson, options);
};

export {noNew as geoJSONLayer};
