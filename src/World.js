import EventEmitter from 'eventemitter3';
import extend from 'lodash.assign';
import CRS from './geo/CRS/index';
import Point from './geo/Point';
import LatLon from './geo/LatLon';
import Engine from './engine/Engine';

// Pretty much any event someone using ViziCities would need will be emitted or
// proxied by World (eg. render events, etc)

class World extends EventEmitter {
  constructor(domId, options) {
    super();

    var defaults = {
      crs: CRS.EPSG3857
    };

    this.options = extend(defaults, options);

    this._layers = [];
    this._controls = [];

    this._initContainer(domId);
    this._initEngine();
    this._initEvents();

    // Kick off the update and render loop
    this._update();
  }

  _initContainer(domId) {
    this._container = document.getElementById(domId);
  }

  _initEngine() {
    this._engine = Engine(this._container);

    // Engine events
    //
    // Consider proxying these through events on World for public access
    // this._engine.on('preRender', () => {});
    // this._engine.on('postRender', () => {});
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
    var delta = this._engine.clock.getDelta();

    // Once _update is called it will run forever, for now
    window.requestAnimationFrame(this._update.bind(this));

    // Update controls
    this._controls.forEach(controls => {
      controls.update();
    });

    this.emit('preUpdate');
    this._engine.update(delta);
    this.emit('postUpdate');
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
    return this.options.crs.latLonToPoint(LatLon(latlon));
  }

  // Transform world point to geographic coordinate
  //
  // This doesn't take into account the origin offset
  //
  // For example, this takes a point relative to the origin point of the
  // projection (not the world) and returns a geographic coordinate
  unproject(point) {
    return this.options.crs.pointToLatLon(Point(point));
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

  // Unsure if it's a good idea to expose this here for components like
  // GridLayer to use (eg. to keep track of a frustum)
  getCamera() {
    return this._engine._camera;
  }

  addLayer(layer) {
    layer._addToWorld(this);

    this._layers.push(layer);

    // Could move this into Layer but it'll do here for now
    this._engine._scene.add(layer._layer);

    this.emit('layerAdded', layer);
    return this;
  }

  // Remove layer and perform clean up operations
  removeLayer(layer) {
    var layerIndex = this._layers.indexOf(layer);

    if (layerIndex > -1) {
      // Remove from this._layers
      this._layers.splice(layerIndex, 1);
    };

    this._engine._scene.remove(layer._layer);

    layer.destroy();

    this.emit('layerRemoved');
    return this;
  }

  addControls(controls) {
    controls._addToWorld(this);

    this._controls.push(controls);

    this.emit('controlsAdded', controls);
    return this;
  }

  removeControls(controls) {}
}

// Initialise without requiring new keyword
export default function(domId, options) {
  return new World(domId, options);
};
