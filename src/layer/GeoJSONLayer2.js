import LayerGroup from './LayerGroup';
import extend from 'lodash.assign';
import reqwest from 'reqwest';
import GeoJSON from '../util/GeoJSON';
import Buffer from '../util/Buffer';
import PickingMaterial from '../engine/PickingMaterial';
import {polygonLayer as PolygonLayer} from './geometry/PolygonLayer';

class GeoJSONLayer2 extends LayerGroup {
  constructor(geojson, options) {
    var defaults = {
      output: false,
      interactive: false,
      topojson: false
    };

    var _options = extend({}, defaults, options);

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

  _processData(data) {
    var geojson = GeoJSON.collectFeatures(data, this._options.topojson);

    // TODO: Check that GeoJSON is valid / usable

    var features = geojson.features;

    // Run filter, if provided
    if (this._options.filter) {
      features = geojson.features.filter(this._options.filter);
    }

    var defaults = {};

    var options;
    features.forEach(feature => {
      options = extend({}, defaults, {
        // If merging feature layers, stop them outputting themselves
        // If not, let feature layers output themselves to the world
        output: !this.isOutput(),
        interactive: this._options.interactive,
        style: {
          color: '#ff0000'
        }
      });

      var layer = this._featureToLayer(feature, options);

      if (!layer) {
        return;
      }

      layer.feature = feature;

      this.addLayer(layer);
    });

    // If merging layers do that now, otherwise skip
    if (!this.isOutput()) {
      return;
    }

    var attributes = [];
    var flat = true;

    this._layers.forEach(layer => {
      attributes.push(layer.getBufferAttributes());

      if (flat && !layer.isFlat()) {
        flat = false;
      }
    });

    // From here on we can assume that we want to merge the layers

    var mergedAttributes = Buffer.mergeAttributes(attributes);

    this._setMesh(mergedAttributes, flat);
    this.add(this._mesh);
  }

  // Create and store mesh from buffer attributes
  //
  // TODO: De-dupe this from the individual mesh creation logic within each
  // geometry layer (materials, settings, etc)
  _setMesh(attributes, flat) {
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

    this._mesh = mesh;
  }

  _featureToLayer(feature, options) {
    var geometry = feature.geometry;
    var coordinates = (geometry.coordinates) ? geometry.coordinates : null;

    if (!coordinates || !geometry) {
      return;
    }

    if (geometry.type === 'Polygon') {
      return PolygonLayer(coordinates, options);
    }
  }

  // Destroy the layers and remove them from the scene and memory
  destroy() {
    super.destroy();
  }
}

export default GeoJSONLayer2;

var noNew = function(geojson, options) {
  return new GeoJSONLayer2(geojson, options);
};

export {noNew as geoJSONLayer2};
