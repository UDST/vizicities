import EventEmitter from 'eventemitter3';
import extend from 'lodash.assign';
import Geo from './geo/Geo';
import {point as Point} from './geo/Point';
import {latLon as LatLon} from './geo/LatLon';
import Engine from './engine/Engine';
import EnvironmentLayer from './layer/environment/EnvironmentLayer';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// Pretty much any event someone using ViziCities would need will be emitted or
// proxied by World (eg. render events, etc)

class World extends EventEmitter {
  constructor(domId, options) {
    super();

    var defaults = {
      skybox: false,
      postProcessing: false
    };

    this.options = extend({}, defaults, options);

    this._layers = [];
    this._controls = [];

    this._initContainer(domId);
    this._initAttribution();
    this._initEngine();
    this._initEnvironment();
    this._initEvents();

    this._pause = false;

    // Kick off the update and render loop
    this._update();
  }

  _initContainer(domId) {
    this._container = document.getElementById(domId);
  }

  _initAttribution() {
    var message = '<a href="http://vizicities.com" target="_blank">Powered by ViziCities</a>';

    var element = document.createElement('div');
    element.classList.add('vizicities-attribution');

    element.innerHTML = message;

    this._container.appendChild(element);
  }

  _initEngine() {
    this._engine = new Engine(this._container, this);

    // Engine events
    //
    // Consider proxying these through events on World for public access
    // this._engine.on('preRender', () => {});
    // this._engine.on('postRender', () => {});
  }

  _initEnvironment() {
    // Not sure if I want to keep this as a private API
    //
    // Makes sense to allow others to customise their environment so perhaps
    // add some method of disable / overriding the environment settings
    this._environment = new EnvironmentLayer({
      skybox: this.options.skybox
    }).addTo(this);
  }

  _initEvents() {
    this.on('controlsMoveEnd', this._onControlsMoveEnd);
  }

  _onControlsMoveEnd(point) {
    var _point = Point(point.x, point.z);
    this._resetView(this.pointToLatLon(_point), _point);
  }

  // Reset world view
  _resetView(latlon, point) {
    this.emit('preResetView');

    this._moveStart();
    this._move(latlon, point);
    this._moveEnd();

    this.emit('postResetView');
  }

  _moveStart() {
    this.emit('moveStart');
  }

  _move(latlon, point) {
    this._lastPosition = latlon;
    this.emit('move', latlon, point);
  }
  _moveEnd() {
    this.emit('moveEnd');
  }

  _update() {
    if (this._pause) {
      return;
    }

    var delta = this._engine.clock.getDelta();

    // Once _update is called it will run forever, for now
    window.requestAnimationFrame(this._update.bind(this));

    // Update controls
    this._controls.forEach(controls => {
      controls.update(delta);
    });

    this.emit('preUpdate', delta);
    this._engine.update(delta);
    this.emit('postUpdate', delta);
  }

  // Set world view
  setView(latlon) {
    // Store initial geographic coordinate for the [0,0,0] world position
    //
    // The origin point doesn't move in three.js / 3D space so only set it once
    // here instead of every time _resetView is called
    //
    // If it was updated every time then coorindates would shift over time and
    // would be out of place / context with previously-placed points (0,0 would
    // refer to a different point each time)
    this._originLatlon = latlon;
    this._originPoint = this.project(latlon);

    this._resetView(latlon);
    return this;
  }

  // Return world geographic position
  getPosition() {
    return this._lastPosition;
  }

  // Transform geographic coordinate to world point
  //
  // This doesn't take into account the origin offset
  //
  // For example, this takes a geographic coordinate and returns a point
  // relative to the origin point of the projection (not the world)
  project(latlon) {
    return Geo.latLonToPoint(LatLon(latlon));
  }

  // Transform world point to geographic coordinate
  //
  // This doesn't take into account the origin offset
  //
  // For example, this takes a point relative to the origin point of the
  // projection (not the world) and returns a geographic coordinate
  unproject(point) {
    return Geo.pointToLatLon(Point(point));
  }

  // Takes into account the origin offset
  //
  // For example, this takes a geographic coordinate and returns a point
  // relative to the three.js / 3D origin (0,0)
  latLonToPoint(latlon) {
    var projectedPoint = this.project(LatLon(latlon));
    return projectedPoint._subtract(this._originPoint);
  }

  // Takes into account the origin offset
  //
  // For example, this takes a point relative to the three.js / 3D origin (0,0)
  // and returns the exact geographic coordinate at that point
  pointToLatLon(point) {
    var projectedPoint = Point(point).add(this._originPoint);
    return this.unproject(projectedPoint);
  }

  // Return pointscale for a given geographic coordinate
  pointScale(latlon, accurate) {
    return Geo.pointScale(latlon, accurate);
  }

  // Convert from real meters to world units
  //
  // TODO: Would be nice not to have to pass in a pointscale here
  metresToWorld(metres, pointScale, zoom) {
    return Geo.metresToWorld(metres, pointScale, zoom);
  }

  // Convert from real meters to world units
  //
  // TODO: Would be nice not to have to pass in a pointscale here
  worldToMetres(worldUnits, pointScale, zoom) {
    return Geo.worldToMetres(worldUnits, pointScale, zoom);
  }

  // Unsure if it's a good idea to expose this here for components like
  // GridLayer to use (eg. to keep track of a frustum)
  getCamera() {
    return this._engine._camera;
  }

  addLayer(layer) {
    layer._addToWorld(this);

    this._layers.push(layer);

    if (layer.isOutput() && layer.isOutputToScene()) {
      // Could move this into Layer but it'll do here for now
      this._engine._scene.add(layer._object3D);
      this._engine._domScene3D.add(layer._domObject3D);
      this._engine._domScene2D.add(layer._domObject2D);
    }

    this.emit('layerAdded', layer);
    return this;
  }

  // Remove layer from world and scene but don't destroy it entirely
  removeLayer(layer) {
    var layerIndex = this._layers.indexOf(layer);

    if (layerIndex > -1) {
      // Remove from this._layers
      this._layers.splice(layerIndex, 1);
    };

    if (layer.isOutput() && layer.isOutputToScene()) {
      this._engine._scene.remove(layer._object3D);
      this._engine._domScene3D.remove(layer._domObject3D);
      this._engine._domScene2D.remove(layer._domObject2D);
    }

    this.emit('layerRemoved');
    return this;
  }

  addControls(controls) {
    controls._addToWorld(this);

    this._controls.push(controls);

    this.emit('controlsAdded', controls);
    return this;
  }

  // Remove controls from world but don't destroy them entirely
  removeControls(controls) {
    var controlsIndex = this._controls.indexOf(controlsIndex);

    if (controlsIndex > -1) {
      this._controls.splice(controlsIndex, 1);
    };

    this.emit('controlsRemoved', controls);
    return this;
  }

  stop() {
    this._pause = true;
  }

  start() {
    this._pause = false;
    this._update();
  }

  // Destroys the world(!) and removes it from the scene and memory
  //
  // TODO: World out why so much three.js stuff is left in the heap after this
  destroy() {
    this.stop();

    // Remove listeners
    this.off('controlsMoveEnd', this._onControlsMoveEnd);

    var i;

    // Remove all controls
    var controls;
    for (i = this._controls.length - 1; i >= 0; i--) {
      controls = this._controls[0];
      this.removeControls(controls);
      controls.destroy();
    };

    // Remove all layers
    var layer;
    for (i = this._layers.length - 1; i >= 0; i--) {
      layer = this._layers[0];
      this.removeLayer(layer);
      layer.destroy();
    };

    // Environment layer is removed with the other layers
    this._environment = null;

    this._engine.destroy();
    this._engine = null;

    // Clean the container / remove the canvas
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }

    this._container = null;
  }
}

export default World;

var noNew = function(domId, options) {
  return new World(domId, options);
};

// Initialise without requiring new keyword
export {noNew as world};
