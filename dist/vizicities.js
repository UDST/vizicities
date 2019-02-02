(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("THREE"), require("TweenLite"));
	else if(typeof define === 'function' && define.amd)
		define(["THREE", "TweenLite"], factory);
	else if(typeof exports === 'object')
		exports["VIZI"] = factory(require("THREE"), require("TweenLite"));
	else
		root["VIZI"] = factory(root["THREE"], root["TweenLite"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_53__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _World = __webpack_require__(1);
	
	var _World2 = _interopRequireDefault(_World);
	
	var _controlsIndex = __webpack_require__(49);
	
	var _controlsIndex2 = _interopRequireDefault(_controlsIndex);
	
	var _geoGeoJs = __webpack_require__(6);
	
	var _geoGeoJs2 = _interopRequireDefault(_geoGeoJs);
	
	var _layerLayer = __webpack_require__(34);
	
	var _layerLayer2 = _interopRequireDefault(_layerLayer);
	
	var _layerLayerGroup = __webpack_require__(54);
	
	var _layerLayerGroup2 = _interopRequireDefault(_layerLayerGroup);
	
	var _layerEnvironmentEnvironmentLayer = __webpack_require__(33);
	
	var _layerEnvironmentEnvironmentLayer2 = _interopRequireDefault(_layerEnvironmentEnvironmentLayer);
	
	var _layerTileImageTileLayer = __webpack_require__(55);
	
	var _layerTileImageTileLayer2 = _interopRequireDefault(_layerTileImageTileLayer);
	
	var _layerTileGeoJSONTileLayer = __webpack_require__(70);
	
	var _layerTileGeoJSONTileLayer2 = _interopRequireDefault(_layerTileGeoJSONTileLayer);
	
	var _layerTileTopoJSONTileLayer = __webpack_require__(89);
	
	var _layerTileTopoJSONTileLayer2 = _interopRequireDefault(_layerTileTopoJSONTileLayer);
	
	var _layerTileGeoJSONTile = __webpack_require__(71);
	
	var _layerTileGeoJSONTile2 = _interopRequireDefault(_layerTileGeoJSONTile);
	
	var _layerGeoJSONLayer = __webpack_require__(72);
	
	var _layerGeoJSONLayer2 = _interopRequireDefault(_layerGeoJSONLayer);
	
	var _layerTopoJSONLayer = __webpack_require__(90);
	
	var _layerTopoJSONLayer2 = _interopRequireDefault(_layerTopoJSONLayer);
	
	var _layerGeoJSONWorkerLayer = __webpack_require__(87);
	
	var _layerGeoJSONWorkerLayer2 = _interopRequireDefault(_layerGeoJSONWorkerLayer);
	
	var _layerTopoJSONWorkerLayer = __webpack_require__(91);
	
	var _layerTopoJSONWorkerLayer2 = _interopRequireDefault(_layerTopoJSONWorkerLayer);
	
	var _layerGeometryPolygonLayer = __webpack_require__(84);
	
	var _layerGeometryPolygonLayer2 = _interopRequireDefault(_layerGeometryPolygonLayer);
	
	var _layerGeometryPolylineLayer = __webpack_require__(85);
	
	var _layerGeometryPolylineLayer2 = _interopRequireDefault(_layerGeometryPolylineLayer);
	
	var _layerGeometryPointLayer = __webpack_require__(86);
	
	var _layerGeometryPointLayer2 = _interopRequireDefault(_layerGeometryPointLayer);
	
	var _geoPoint = __webpack_require__(8);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilIndex = __webpack_require__(92);
	
	var _utilIndex2 = _interopRequireDefault(_utilIndex);
	
	var VIZI = {
	  version: '0.3',
	
	  // Public API
	  World: _World2['default'],
	  world: _World.world,
	  Controls: _controlsIndex2['default'],
	  Geo: _geoGeoJs2['default'],
	  Layer: _layerLayer2['default'],
	  layer: _layerLayer.layer,
	  EnvironmentLayer: _layerEnvironmentEnvironmentLayer2['default'],
	  environmentLayer: _layerEnvironmentEnvironmentLayer.environmentLayer,
	  ImageTileLayer: _layerTileImageTileLayer2['default'],
	  imageTileLayer: _layerTileImageTileLayer.imageTileLayer,
	  GeoJSONTileLayer: _layerTileGeoJSONTileLayer2['default'],
	  geoJSONTileLayer: _layerTileGeoJSONTileLayer.geoJSONTileLayer,
	  GeoJSONTile: _layerTileGeoJSONTile2['default'],
	  geoJSONTile: _layerTileGeoJSONTile.geoJSONTile,
	  TopoJSONTileLayer: _layerTileTopoJSONTileLayer2['default'],
	  topoJSONTileLayer: _layerTileTopoJSONTileLayer.topoJSONTileLayer,
	  GeoJSONLayer: _layerGeoJSONLayer2['default'],
	  geoJSONLayer: _layerGeoJSONLayer.geoJSONLayer,
	  TopoJSONLayer: _layerTopoJSONLayer2['default'],
	  topoJSONLayer: _layerTopoJSONLayer.topoJSONLayer,
	  GeoJSONWorkerLayer: _layerGeoJSONWorkerLayer2['default'],
	  geoJSONWorkerLayer: _layerGeoJSONWorkerLayer.geoJSONWorkerLayer,
	  TopoJSONWorkerLayer: _layerTopoJSONWorkerLayer2['default'],
	  topoJSONWorkerLayer: _layerTopoJSONWorkerLayer.topoJSONWorkerLayer,
	  PolygonLayer: _layerGeometryPolygonLayer2['default'],
	  polygonLayer: _layerGeometryPolygonLayer.polygonLayer,
	  PolylineLayer: _layerGeometryPolylineLayer2['default'],
	  polylineLayer: _layerGeometryPolylineLayer.polylineLayer,
	  PointLayer: _layerGeometryPointLayer2['default'],
	  pointLayer: _layerGeometryPointLayer.pointLayer,
	  Point: _geoPoint2['default'],
	  point: _geoPoint.point,
	  LatLon: _geoLatLon2['default'],
	  latLon: _geoLatLon.latLon,
	  PickingMaterial: _enginePickingMaterial2['default'],
	  Util: _utilIndex2['default']
	};
	
	exports['default'] = VIZI;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _eventemitter3 = __webpack_require__(2);
	
	var _eventemitter32 = _interopRequireDefault(_eventemitter3);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _geoGeo = __webpack_require__(6);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoPoint = __webpack_require__(8);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _engineEngine = __webpack_require__(9);
	
	var _engineEngine2 = _interopRequireDefault(_engineEngine);
	
	var _layerEnvironmentEnvironmentLayer = __webpack_require__(33);
	
	var _layerEnvironmentEnvironmentLayer2 = _interopRequireDefault(_layerEnvironmentEnvironmentLayer);
	
	var _utilWorker = __webpack_require__(46);
	
	var _utilWorker2 = _interopRequireDefault(_utilWorker);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// Pretty much any event someone using ViziCities would need will be emitted or
	// proxied by World (eg. render events, etc)
	
	var World = (function (_EventEmitter) {
	  _inherits(World, _EventEmitter);
	
	  function World(domId, options) {
	    var _this = this;
	
	    _classCallCheck(this, World);
	
	    _get(Object.getPrototypeOf(World.prototype), 'constructor', this).call(this);
	
	    var defaults = {
	      skybox: false,
	      postProcessing: false
	    };
	
	    this.options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    this._layers = [];
	    this._controls = [];
	
	    this._initContainer(domId);
	    this._initAttribution();
	    this._initEngine();
	
	    this._initEnvironment().then(function () {
	      _this._initEvents();
	
	      _this._pause = false;
	
	      // Kick off the update and render loop
	      _this._update();
	    });
	  }
	
	  _createClass(World, [{
	    key: 'createWorkers',
	    value: function createWorkers(maxWorkers, workerScript) {
	      return _utilWorker2['default'].createWorkers(maxWorkers, workerScript);
	    }
	  }, {
	    key: '_initContainer',
	    value: function _initContainer(domId) {
	      this._container = document.getElementById(domId);
	    }
	  }, {
	    key: '_initAttribution',
	    value: function _initAttribution() {
	      var message = '<a href="http://vizicities.com" target="_blank">ViziCities</a> | <a id="show-attr" href="#">Attribution</a>';
	
	      var element = document.createElement('div');
	      element.classList.add('vizicities-attribution');
	
	      var additionalElem = document.createElement('div');
	      additionalElem.id = 'attribution-container';
	
	      element.innerHTML = message;
	      element.appendChild(additionalElem);
	
	      this._container.appendChild(element);
	
	      document.getElementById('show-attr').addEventListener('click', function (e) {
	        e.currentTarget.parentNode.classList.toggle('is-visible');
	      });
	    }
	  }, {
	    key: '_initEngine',
	    value: function _initEngine() {
	      this._engine = new _engineEngine2['default'](this._container, this);
	
	      // Engine events
	      //
	      // Consider proxying these through events on World for public access
	      // this._engine.on('preRender', () => {});
	      // this._engine.on('postRender', () => {});
	    }
	  }, {
	    key: '_initEnvironment',
	    value: function _initEnvironment() {
	      // Not sure if I want to keep this as a private API
	      //
	      // Makes sense to allow others to customise their environment so perhaps
	      // add some method of disable / overriding the environment settings
	      this._environment = new _layerEnvironmentEnvironmentLayer2['default']({
	        skybox: this.options.skybox
	      });
	
	      return this._environment.addTo(this);
	    }
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      this.on('controlsMoveEnd', this._onControlsMoveEnd);
	    }
	  }, {
	    key: '_onControlsMoveEnd',
	    value: function _onControlsMoveEnd(point) {
	      var _point = (0, _geoPoint.point)(point.x, point.z);
	      this._resetView(this.pointToLatLon(_point), _point);
	    }
	
	    // Reset world view
	  }, {
	    key: '_resetView',
	    value: function _resetView(latlon, point) {
	      this.emit('preResetView');
	
	      this._moveStart();
	      this._move(latlon, point);
	      this._moveEnd();
	
	      this.emit('postResetView');
	    }
	  }, {
	    key: '_moveStart',
	    value: function _moveStart() {
	      this.emit('moveStart');
	    }
	  }, {
	    key: '_move',
	    value: function _move(latlon, point) {
	      this._lastPosition = latlon;
	      this.emit('move', latlon, point);
	    }
	  }, {
	    key: '_moveEnd',
	    value: function _moveEnd() {
	      this.emit('moveEnd');
	    }
	  }, {
	    key: '_update',
	    value: function _update() {
	      if (this._pause) {
	        return;
	      }
	
	      var delta = this._engine.clock.getDelta();
	
	      // Once _update is called it will run forever, for now
	      window.requestAnimationFrame(this._update.bind(this));
	
	      // Update controls
	      this._controls.forEach(function (controls) {
	        controls.update(delta);
	      });
	
	      this.emit('preUpdate', delta);
	      this._engine.update(delta);
	      this.emit('postUpdate', delta);
	    }
	  }, {
	    key: '_addAttribution',
	    value: function _addAttribution(id, message) {
	      var container = document.getElementById('attribution-container');
	
	      var span = document.createElement('p');
	      span.dataset.layer = id;
	      span.innerHTML = message;
	
	      container.appendChild(span);
	    }
	  }, {
	    key: '_removeAttribution',
	    value: function _removeAttribution(id) {
	      var elem = document.querySelectorAll('#attribution-container [data-layer="' + id + '"]')[0];
	      elem.remove();
	    }
	
	    // Set world view
	  }, {
	    key: 'setView',
	    value: function setView(latlon) {
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
	  }, {
	    key: 'getPosition',
	    value: function getPosition() {
	      return this._lastPosition;
	    }
	
	    // Transform geographic coordinate to world point
	    //
	    // This doesn't take into account the origin offset
	    //
	    // For example, this takes a geographic coordinate and returns a point
	    // relative to the origin point of the projection (not the world)
	  }, {
	    key: 'project',
	    value: function project(latlon) {
	      return _geoGeo2['default'].latLonToPoint((0, _geoLatLon.latLon)(latlon));
	    }
	
	    // Transform world point to geographic coordinate
	    //
	    // This doesn't take into account the origin offset
	    //
	    // For example, this takes a point relative to the origin point of the
	    // projection (not the world) and returns a geographic coordinate
	  }, {
	    key: 'unproject',
	    value: function unproject(point) {
	      return _geoGeo2['default'].pointToLatLon((0, _geoPoint.point)(point));
	    }
	
	    // Takes into account the origin offset
	    //
	    // For example, this takes a geographic coordinate and returns a point
	    // relative to the three.js / 3D origin (0,0)
	  }, {
	    key: 'latLonToPoint',
	    value: function latLonToPoint(latlon) {
	      var projectedPoint = this.project((0, _geoLatLon.latLon)(latlon));
	      return projectedPoint._subtract(this._originPoint);
	    }
	
	    // Takes into account the origin offset
	    //
	    // For example, this takes a point relative to the three.js / 3D origin (0,0)
	    // and returns the exact geographic coordinate at that point
	  }, {
	    key: 'pointToLatLon',
	    value: function pointToLatLon(point) {
	      var projectedPoint = (0, _geoPoint.point)(point).add(this._originPoint);
	      return this.unproject(projectedPoint);
	    }
	
	    // Return pointscale for a given geographic coordinate
	  }, {
	    key: 'pointScale',
	    value: function pointScale(latlon, accurate) {
	      return _geoGeo2['default'].pointScale(latlon, accurate);
	    }
	
	    // Convert from real meters to world units
	    //
	    // TODO: Would be nice not to have to pass in a pointscale here
	  }, {
	    key: 'metresToWorld',
	    value: function metresToWorld(metres, pointScale, zoom) {
	      return _geoGeo2['default'].metresToWorld(metres, pointScale, zoom);
	    }
	
	    // Convert from real meters to world units
	    //
	    // TODO: Would be nice not to have to pass in a pointscale here
	  }, {
	    key: 'worldToMetres',
	    value: function worldToMetres(worldUnits, pointScale, zoom) {
	      return _geoGeo2['default'].worldToMetres(worldUnits, pointScale, zoom);
	    }
	
	    // Unsure if it's a good idea to expose this here for components like
	    // GridLayer to use (eg. to keep track of a frustum)
	  }, {
	    key: 'getCamera',
	    value: function getCamera() {
	      return this._engine._camera;
	    }
	  }, {
	    key: 'addLayer',
	    value: function addLayer(layer) {
	      var _this2 = this;
	
	      // Is is right to assume that there will always be some other layer
	      // managing layers with output set to false?
	      this._layers.push(layer);
	
	      if (layer.isOutput() && layer.isOutputToScene()) {
	        // Could move this into Layer but it'll do here for now
	        this._engine._scene.add(layer._object3D);
	        this._engine._domScene3D.add(layer._domObject3D);
	        this._engine._domScene2D.add(layer._domObject2D);
	      }
	
	      return new Promise(function (resolve, reject) {
	        layer._addToWorld(_this2).then(function () {
	          if (layer._options.attribution) {
	            _this2._addAttribution(layer._options.id, layer._options.attribution);
	          }
	
	          // TODO: Consider moving this so it doesn't fire for layers that are
	          // actually managed by a parent layer (eg. tiles)
	          _this2.emit('layerAdded', layer);
	
	          resolve(_this2);
	        })['catch'](reject);
	      });
	    }
	
	    // Remove layer from world and scene but don't destroy it entirely
	  }, {
	    key: 'removeLayer',
	    value: function removeLayer(layer) {
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
	
	      return Promise.resolve(this);
	    }
	  }, {
	    key: 'addControls',
	    value: function addControls(controls) {
	      controls._addToWorld(this);
	
	      this._controls.push(controls);
	
	      this.emit('controlsAdded', controls);
	
	      return Promise.resolve(this);
	    }
	
	    // Remove controls from world but don't destroy them entirely
	  }, {
	    key: 'removeControls',
	    value: function removeControls(controls) {
	      var controlsIndex = this._controls.indexOf(controlsIndex);
	
	      if (controlsIndex > -1) {
	        this._controls.splice(controlsIndex, 1);
	      };
	
	      this.emit('controlsRemoved', controls);
	
	      return Promise.resolve(this);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this._pause = true;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this._pause = false;
	      this._update();
	    }
	
	    // Destroys the world(!) and removes it from the scene and memory
	    //
	    // TODO: World out why so much three.js stuff is left in the heap after this
	  }, {
	    key: 'destroy',
	    value: function destroy() {
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
	  }]);
	
	  return World;
	})(_eventemitter32['default']);
	
	exports['default'] = World;
	
	var noNew = function noNew(domId, options) {
	  return new World(domId, options);
	};
	
	// Initialise without requiring new keyword
	exports.world = noNew;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var keys = __webpack_require__(4),
	    rest = __webpack_require__(5);
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    stringTag = '[object String]';
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf,
	    nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = rest;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _LatLon = __webpack_require__(7);
	
	var _Point = __webpack_require__(8);
	
	var Geo = {};
	
	// Radius / WGS84 semi-major axis
	Geo.R = 6378137;
	Geo.MAX_LATITUDE = 85.0511287798;
	
	// WGS84 eccentricity
	Geo.ECC = 0.081819191;
	Geo.ECC2 = 0.081819191 * 0.081819191;
	
	Geo.project = function (latlon) {
	  var d = Math.PI / 180;
	  var max = Geo.MAX_LATITUDE;
	  var lat = Math.max(Math.min(max, latlon.lat), -max);
	  var sin = Math.sin(lat * d);
	
	  return (0, _Point.point)(Geo.R * latlon.lon * d, Geo.R * Math.log((1 + sin) / (1 - sin)) / 2);
	}, Geo.unproject = function (point) {
	  var d = 180 / Math.PI;
	
	  return (0, _LatLon.latLon)((2 * Math.atan(Math.exp(point.y / Geo.R)) - Math.PI / 2) * d, point.x * d / Geo.R);
	};
	
	// Converts geo coords to pixel / WebGL ones
	// This just reverses the Y axis to match WebGL
	Geo.latLonToPoint = function (latlon) {
	  var projected = Geo.project(latlon);
	  projected.y *= -1;
	
	  return projected;
	};
	
	// Converts pixel / WebGL coords to geo coords
	// This just reverses the Y axis to match WebGL
	Geo.pointToLatLon = function (point) {
	  var _point = (0, _Point.point)(point.x, point.y * -1);
	  return Geo.unproject(_point);
	};
	
	// Scale factor for converting between real metres and projected metres
	//
	// projectedMetres = realMetres * pointScale
	// realMetres = projectedMetres / pointScale
	//
	// Accurate scale factor uses proper Web Mercator scaling
	// See pg.9: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
	// See: http://jsfiddle.net/robhawkes/yws924cf/
	Geo.pointScale = function (latlon, accurate) {
	  var rad = Math.PI / 180;
	
	  var k;
	
	  if (!accurate) {
	    k = 1 / Math.cos(latlon.lat * rad);
	
	    // [scaleX, scaleY]
	    return [k, k];
	  } else {
	    var lat = latlon.lat * rad;
	    var lon = latlon.lon * rad;
	
	    var a = Geo.R;
	
	    var sinLat = Math.sin(lat);
	    var sinLat2 = sinLat * sinLat;
	
	    var cosLat = Math.cos(lat);
	
	    // Radius meridian
	    var p = a * (1 - Geo.ECC2) / Math.pow(1 - Geo.ECC2 * sinLat2, 3 / 2);
	
	    // Radius prime meridian
	    var v = a / Math.sqrt(1 - Geo.ECC2 * sinLat2);
	
	    // Scale N/S
	    var h = a / p / cosLat;
	
	    // Scale E/W
	    k = a / v / cosLat;
	
	    // [scaleX, scaleY]
	    return [k, h];
	  }
	};
	
	// Convert real metres to projected units
	//
	// Latitude scale is chosen because it fluctuates more than longitude
	Geo.metresToProjected = function (metres, pointScale) {
	  return metres * pointScale[1];
	};
	
	// Convert projected units to real metres
	//
	// Latitude scale is chosen because it fluctuates more than longitude
	Geo.projectedToMetres = function (projectedUnits, pointScale) {
	  return projectedUnits / pointScale[1];
	};
	
	// Convert real metres to a value in world (WebGL) units
	Geo.metresToWorld = function (metres, pointScale) {
	  // Transform metres to projected metres using the latitude point scale
	  //
	  // Latitude scale is chosen because it fluctuates more than longitude
	  var projectedMetres = Geo.metresToProjected(metres, pointScale);
	
	  var scale = Geo.scale();
	
	  // Scale projected metres
	  var scaledMetres = scale * projectedMetres;
	
	  return scaledMetres;
	};
	
	// Convert world (WebGL) units to a value in real metres
	Geo.worldToMetres = function (worldUnits, pointScale) {
	  var scale = Geo.scale();
	
	  var projectedUnits = worldUnits / scale;
	  var realMetres = Geo.projectedToMetres(projectedUnits, pointScale);
	
	  return realMetres;
	};
	
	// If zoom is provided, returns the map width in pixels for a given zoom
	// Else, provides fixed scale value
	Geo.scale = function (zoom) {
	  // If zoom is provided then return scale based on map tile zoom
	  if (zoom >= 0) {
	    return 256 * Math.pow(2, zoom);
	    // Else, return fixed scale value to expand projected coordinates from
	    // their 0 to 1 range into something more practical
	  } else {
	      return 1;
	    }
	};
	
	// Returns zoom level for a given scale value
	// This only works with a scale value that is based on map pixel width
	Geo.zoom = function (scale) {
	  return Math.log(scale / 256) / Math.LN2;
	};
	
	// Distance between two geographical points using spherical law of cosines
	// approximation or Haversine
	//
	// See: http://www.movable-type.co.uk/scripts/latlong.html
	Geo.distance = function (latlon1, latlon2, accurate) {
	  var rad = Math.PI / 180;
	
	  var lat1;
	  var lat2;
	
	  var a;
	
	  if (!accurate) {
	    lat1 = latlon1.lat * rad;
	    lat2 = latlon2.lat * rad;
	
	    a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlon2.lon - latlon1.lon) * rad);
	
	    return Geo.R * Math.acos(Math.min(a, 1));
	  } else {
	    lat1 = latlon1.lat * rad;
	    lat2 = latlon2.lat * rad;
	
	    var lon1 = latlon1.lon * rad;
	    var lon2 = latlon2.lon * rad;
	
	    var deltaLat = lat2 - lat1;
	    var deltaLon = lon2 - lon1;
	
	    var halfDeltaLat = deltaLat / 2;
	    var halfDeltaLon = deltaLon / 2;
	
	    a = Math.sin(halfDeltaLat) * Math.sin(halfDeltaLat) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(halfDeltaLon) * Math.sin(halfDeltaLon);
	
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	    return Geo.R * c;
	  }
	};
	
	Geo.bounds = (function () {
	  var d = Geo.R * Math.PI;
	  return [[-d, -d], [d, d]];
	})();
	
	exports['default'] = Geo;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	/*
	 * LatLon is a helper class for ensuring consistent geographic coordinates.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/LatLng.js
	 */
	
	var LatLon = (function () {
	  function LatLon(lat, lon, alt) {
	    _classCallCheck(this, LatLon);
	
	    if (isNaN(lat) || isNaN(lon)) {
	      throw new Error('Invalid LatLon object: (' + lat + ', ' + lon + ')');
	    }
	
	    this.lat = +lat;
	    this.lon = +lon;
	
	    if (alt !== undefined) {
	      this.alt = +alt;
	    }
	  }
	
	  _createClass(LatLon, [{
	    key: 'clone',
	    value: function clone() {
	      return new LatLon(this.lat, this.lon, this.alt);
	    }
	  }]);
	
	  return LatLon;
	})();
	
	exports['default'] = LatLon;
	
	// Accepts (LatLon), ([lat, lon, alt]), ([lat, lon]) and (lat, lon, alt)
	// Also converts between lng and lon
	var noNew = function noNew(a, b, c) {
	  if (a instanceof LatLon) {
	    return a;
	  }
	  if (Array.isArray(a) && typeof a[0] !== 'object') {
	    if (a.length === 3) {
	      return new LatLon(a[0], a[1], a[2]);
	    }
	    if (a.length === 2) {
	      return new LatLon(a[0], a[1]);
	    }
	    return null;
	  }
	  if (a === undefined || a === null) {
	    return a;
	  }
	  if (typeof a === 'object' && 'lat' in a) {
	    return new LatLon(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	  }
	  if (b === undefined) {
	    return null;
	  }
	  return new LatLon(a, b, c);
	};
	
	// Initialise without requiring new keyword
	exports.latLon = noNew;

/***/ },
/* 8 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*
	 * Point is a helper class for ensuring consistent world positions.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/Point.js
	 */
	
	var Point = (function () {
	  function Point(x, y, round) {
	    _classCallCheck(this, Point);
	
	    this.x = round ? Math.round(x) : x;
	    this.y = round ? Math.round(y) : y;
	  }
	
	  _createClass(Point, [{
	    key: "clone",
	    value: function clone() {
	      return new Point(this.x, this.y);
	    }
	
	    // Non-destructive
	  }, {
	    key: "add",
	    value: function add(point) {
	      return this.clone()._add(_point(point));
	    }
	
	    // Destructive
	  }, {
	    key: "_add",
	    value: function _add(point) {
	      this.x += point.x;
	      this.y += point.y;
	      return this;
	    }
	
	    // Non-destructive
	  }, {
	    key: "subtract",
	    value: function subtract(point) {
	      return this.clone()._subtract(_point(point));
	    }
	
	    // Destructive
	  }, {
	    key: "_subtract",
	    value: function _subtract(point) {
	      this.x -= point.x;
	      this.y -= point.y;
	      return this;
	    }
	  }]);
	
	  return Point;
	})();
	
	exports["default"] = Point;
	
	// Accepts (point), ([x, y]) and (x, y, round)
	var _point = function _point(x, y, round) {
	  if (x instanceof Point) {
	    return x;
	  }
	  if (Array.isArray(x)) {
	    return new Point(x[0], x[1]);
	  }
	  if (x === undefined || x === null) {
	    return x;
	  }
	  return new Point(x, y, round);
	};
	
	// Initialise without requiring new keyword
	exports.point = _point;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _eventemitter3 = __webpack_require__(2);
	
	var _eventemitter32 = _interopRequireDefault(_eventemitter3);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Scene = __webpack_require__(11);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	var _DOMScene3D = __webpack_require__(12);
	
	var _DOMScene3D2 = _interopRequireDefault(_DOMScene3D);
	
	var _DOMScene2D = __webpack_require__(13);
	
	var _DOMScene2D2 = _interopRequireDefault(_DOMScene2D);
	
	var _Renderer = __webpack_require__(14);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _DOMRenderer3D = __webpack_require__(15);
	
	var _DOMRenderer3D2 = _interopRequireDefault(_DOMRenderer3D);
	
	var _DOMRenderer2D = __webpack_require__(17);
	
	var _DOMRenderer2D2 = _interopRequireDefault(_DOMRenderer2D);
	
	var _Camera = __webpack_require__(19);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _Picking = __webpack_require__(20);
	
	var _Picking2 = _interopRequireDefault(_Picking);
	
	var _EffectComposer = __webpack_require__(24);
	
	var _EffectComposer2 = _interopRequireDefault(_EffectComposer);
	
	var _vendorRenderPass = __webpack_require__(29);
	
	var _vendorRenderPass2 = _interopRequireDefault(_vendorRenderPass);
	
	var _vendorShaderPass = __webpack_require__(27);
	
	var _vendorShaderPass2 = _interopRequireDefault(_vendorShaderPass);
	
	var _vendorCopyShader = __webpack_require__(26);
	
	var _vendorCopyShader2 = _interopRequireDefault(_vendorCopyShader);
	
	var _vendorHorizontalTiltShiftShader = __webpack_require__(30);
	
	var _vendorHorizontalTiltShiftShader2 = _interopRequireDefault(_vendorHorizontalTiltShiftShader);
	
	var _vendorVerticalTiltShiftShader = __webpack_require__(31);
	
	var _vendorVerticalTiltShiftShader2 = _interopRequireDefault(_vendorVerticalTiltShiftShader);
	
	var _vendorFXAAShader = __webpack_require__(32);
	
	var _vendorFXAAShader2 = _interopRequireDefault(_vendorFXAAShader);
	
	var Engine = (function (_EventEmitter) {
	  _inherits(Engine, _EventEmitter);
	
	  function Engine(container, world) {
	    _classCallCheck(this, Engine);
	
	    console.log('Init Engine');
	
	    _get(Object.getPrototypeOf(Engine.prototype), 'constructor', this).call(this);
	
	    this._world = world;
	
	    this._scene = _Scene2['default'];
	    this._domScene3D = _DOMScene3D2['default'];
	    this._domScene2D = _DOMScene2D2['default'];
	
	    var antialias = this._world.options.postProcessing ? false : true;
	    this._renderer = (0, _Renderer2['default'])(container, antialias);
	    this._domRenderer3D = (0, _DOMRenderer3D2['default'])(container);
	    this._domRenderer2D = (0, _DOMRenderer2D2['default'])(container);
	
	    this._camera = (0, _Camera2['default'])(container);
	
	    this._container = container;
	
	    // TODO: Make this optional
	    this._picking = (0, _Picking2['default'])(this._world, this._renderer, this._camera);
	
	    this.clock = new _three2['default'].Clock();
	
	    this._frustum = new _three2['default'].Frustum();
	
	    if (this._world.options.postProcessing) {
	      this._initPostProcessing();
	    }
	  }
	
	  // TODO: Set up composer to automatically resize on viewport change
	  // TODO: Update passes that rely on width / height on resize
	  // TODO: Merge default passes into a single shader / pass for performance
	
	  _createClass(Engine, [{
	    key: '_initPostProcessing',
	    value: function _initPostProcessing() {
	      var renderPass = new _vendorRenderPass2['default'](this._scene, this._camera);
	
	      // TODO: Look at using @mattdesl's optimised FXAA shader
	      // https://github.com/mattdesl/three-shader-fxaa
	      var fxaaPass = new _vendorShaderPass2['default'](_vendorFXAAShader2['default']);
	
	      var hblurPass = new _vendorShaderPass2['default'](_vendorHorizontalTiltShiftShader2['default']);
	      var vblurPass = new _vendorShaderPass2['default'](_vendorVerticalTiltShiftShader2['default']);
	      var bluriness = 5;
	
	      hblurPass.uniforms.r.value = vblurPass.uniforms.r.value = 0.6;
	
	      var copyPass = new _vendorShaderPass2['default'](_vendorCopyShader2['default']);
	      copyPass.renderToScreen = true;
	
	      this._composer = (0, _EffectComposer2['default'])(this._renderer, this._container);
	
	      this._composer.addPass(renderPass);
	      this._composer.addPass(fxaaPass);
	      this._composer.addPass(hblurPass);
	      this._composer.addPass(vblurPass);
	      this._composer.addPass(copyPass);
	
	      var self = this;
	      var updatePostProcessingSize = function updatePostProcessingSize() {
	        var width = self._container.clientWidth;
	        var height = self._container.clientHeight;
	
	        // TODO: Re-enable this when perf issues can be solved
	        //
	        // Rendering double the resolution of the screen can be really slow
	        // var pixelRatio = window.devicePixelRatio;
	        var pixelRatio = 1;
	
	        fxaaPass.uniforms.resolution.value.set(1 / (width * pixelRatio), 1 / (height * pixelRatio));
	
	        hblurPass.uniforms.h.value = bluriness / (width * pixelRatio);
	        vblurPass.uniforms.v.value = bluriness / (height * pixelRatio);
	      };
	
	      updatePostProcessingSize();
	      window.addEventListener('resize', updatePostProcessingSize, false);
	    }
	  }, {
	    key: 'update',
	    value: function update(delta) {
	      this.emit('preRender');
	
	      if (this._world.options.postProcessing) {
	        this._composer.render(delta);
	      } else {
	        this._renderer.render(this._scene, this._camera);
	      }
	
	      // Render picking scene
	      // this._renderer.render(this._picking._pickingScene, this._camera);
	
	      // Render DOM scenes
	      this._domRenderer3D.render(this._domScene3D, this._camera);
	      this._domRenderer2D.render(this._domScene2D, this._camera);
	
	      this.emit('postRender');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Remove any remaining objects from scene
	      var child;
	      for (var i = this._scene.children.length - 1; i >= 0; i--) {
	        child = this._scene.children[i];
	
	        if (!child) {
	          continue;
	        }
	
	        this._scene.remove(child);
	
	        if (child.geometry) {
	          // Dispose of mesh and materials
	          child.geometry.dispose();
	          child.geometry = null;
	        }
	
	        if (child.material) {
	          if (child.material.map) {
	            child.material.map.dispose();
	            child.material.map = null;
	          }
	
	          child.material.dispose();
	          child.material = null;
	        }
	      };
	
	      for (var i = this._domScene3D.children.length - 1; i >= 0; i--) {
	        child = this._domScene3D.children[i];
	
	        if (!child) {
	          continue;
	        }
	
	        this._domScene3D.remove(child);
	      };
	
	      for (var i = this._domScene2D.children.length - 1; i >= 0; i--) {
	        child = this._domScene2D.children[i];
	
	        if (!child) {
	          continue;
	        }
	
	        this._domScene2D.remove(child);
	      };
	
	      this._picking.destroy();
	      this._picking = null;
	
	      this._world = null;
	      this._scene = null;
	      this._domScene3D = null;
	      this._domScene2D = null;
	
	      this._composer = null;
	      this._renderer = null;
	
	      this._domRenderer3D = null;
	      this._domRenderer2D = null;
	      this._camera = null;
	      this._clock = null;
	      this._frustum = null;
	    }
	  }]);
	
	  return Engine;
	})(_eventemitter32['default']);
	
	exports['default'] = Engine;
	
	// // Initialise without requiring new keyword
	// export default function(container, world) {
	//   return new Engine(container, world);
	// };
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can be imported from anywhere and will still reference the same scene,
	// though there is a helper reference in Engine.scene
	
	exports['default'] = (function () {
	  var scene = new _three2['default'].Scene();
	
	  // TODO: Re-enable when this works with the skybox
	  // scene.fog = new THREE.Fog(0xffffff, 1, 15000);
	  return scene;
	})();
	
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can be imported from anywhere and will still reference the same scene,
	// though there is a helper reference in Engine.scene
	
	exports['default'] = (function () {
	  var scene = new _three2['default'].Scene();
	  return scene;
	})();
	
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can be imported from anywhere and will still reference the same scene,
	// though there is a helper reference in Engine.scene
	
	exports['default'] = (function () {
	  var scene = new _three2['default'].Scene();
	  return scene;
	})();
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Scene = __webpack_require__(11);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	// This can only be accessed from Engine.renderer if you want to reference the
	// same scene in multiple places
	
	exports['default'] = function (container, antialias) {
	  var renderer = new _three2['default'].WebGLRenderer({
	    antialias: antialias
	
	    // Enabling this removes a lot of z-index intersecting but it also removes
	    // shadows due to a bug in three.js
	    //
	    // See: https://github.com/mrdoob/three.js/issues/7815
	    // logarithmicDepthBuffer: true
	  });
	
	  // TODO: Re-enable when this works with the skybox
	  // renderer.setClearColor(Scene.fog.color, 1);
	
	  renderer.setClearColor(0xffffff, 1);
	
	  // TODO: Re-enable this when perf issues can be solved
	  //
	  // Rendering double the resolution of the screen can be really slow
	  // var pixelRatio = window.devicePixelRatio;
	  var pixelRatio = 1;
	
	  renderer.setPixelRatio(pixelRatio);
	
	  // Gamma settings make things look nicer
	  renderer.gammaInput = true;
	  renderer.gammaOutput = true;
	
	  renderer.shadowMap.enabled = true;
	
	  // TODO: Work out which of the shadowmap types is best
	  // https://github.com/mrdoob/three.js/blob/r56/src/Three.js#L107
	  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	
	  // TODO: Check that leaving this as default (CullFrontFace) is right
	  // renderer.shadowMap.cullFace = THREE.CullFaceBack;
	
	  container.appendChild(renderer.domElement);
	
	  var updateSize = function updateSize() {
	    renderer.setSize(container.clientWidth, container.clientHeight);
	  };
	
	  window.addEventListener('resize', updateSize, false);
	  updateSize();
	
	  return renderer;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _vendorCSS3DRenderer = __webpack_require__(16);
	
	var _DOMScene3D = __webpack_require__(12);
	
	var _DOMScene3D2 = _interopRequireDefault(_DOMScene3D);
	
	// This can only be accessed from Engine.renderer if you want to reference the
	// same scene in multiple places
	
	exports['default'] = function (container) {
	  var renderer = new _vendorCSS3DRenderer.CSS3DRenderer();
	
	  renderer.domElement.style.position = 'absolute';
	  renderer.domElement.style.top = 0;
	
	  container.appendChild(renderer.domElement);
	
	  var updateSize = function updateSize() {
	    renderer.setSize(container.clientWidth, container.clientHeight);
	  };
	
	  window.addEventListener('resize', updateSize, false);
	  updateSize();
	
	  return renderer;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	/**
	 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var CSS3DObject = function CSS3DObject(element) {
	
		_three2['default'].Object3D.call(this);
	
		this.element = element;
		this.element.style.position = 'absolute';
	
		this.addEventListener('removed', function (event) {
	
			if (this.element.parentNode !== null) {
	
				this.element.parentNode.removeChild(this.element);
			}
		});
	};
	
	CSS3DObject.prototype = Object.create(_three2['default'].Object3D.prototype);
	CSS3DObject.prototype.constructor = CSS3DObject;
	
	var CSS3DSprite = function CSS3DSprite(element) {
	
		CSS3DObject.call(this, element);
	};
	
	CSS3DSprite.prototype = Object.create(CSS3DObject.prototype);
	CSS3DSprite.prototype.constructor = CSS3DSprite;
	
	//
	
	var CSS3DRenderer = function CSS3DRenderer() {
	
		console.log('THREE.CSS3DRenderer', _three2['default'].REVISION);
	
		var _width, _height;
		var _widthHalf, _heightHalf;
	
		var matrix = new _three2['default'].Matrix4();
	
		var cache = {
			camera: { fov: 0, style: '' },
			objects: {}
		};
	
		var domElement = document.createElement('div');
		domElement.style.overflow = 'hidden';
	
		domElement.style.WebkitTransformStyle = 'preserve-3d';
		domElement.style.MozTransformStyle = 'preserve-3d';
		domElement.style.oTransformStyle = 'preserve-3d';
		domElement.style.transformStyle = 'preserve-3d';
	
		this.domElement = domElement;
	
		var cameraElement = document.createElement('div');
	
		cameraElement.style.WebkitTransformStyle = 'preserve-3d';
		cameraElement.style.MozTransformStyle = 'preserve-3d';
		cameraElement.style.oTransformStyle = 'preserve-3d';
		cameraElement.style.transformStyle = 'preserve-3d';
	
		domElement.appendChild(cameraElement);
	
		this.setClearColor = function () {};
	
		this.getSize = function () {
	
			return {
				width: _width,
				height: _height
			};
		};
	
		this.setSize = function (width, height) {
	
			_width = width;
			_height = height;
	
			_widthHalf = _width / 2;
			_heightHalf = _height / 2;
	
			domElement.style.width = width + 'px';
			domElement.style.height = height + 'px';
	
			cameraElement.style.width = width + 'px';
			cameraElement.style.height = height + 'px';
		};
	
		var epsilon = function epsilon(value) {
	
			return Math.abs(value) < Number.EPSILON ? 0 : value;
		};
	
		var getCameraCSSMatrix = function getCameraCSSMatrix(matrix) {
	
			var elements = matrix.elements;
	
			return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};
	
		var getObjectCSSMatrix = function getObjectCSSMatrix(matrix) {
	
			var elements = matrix.elements;
	
			return 'translate3d(-50%,-50%,0) matrix3d(' + epsilon(elements[0]) + ',' + epsilon(elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(-elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(-elements[6]) + ',' + epsilon(-elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};
	
		var renderObject = function renderObject(object, camera) {
	
			if (object instanceof CSS3DObject) {
	
				var style;
	
				if (object instanceof CSS3DSprite) {
	
					// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/
	
					matrix.copy(camera.matrixWorldInverse);
					matrix.transpose();
					matrix.copyPosition(object.matrixWorld);
					matrix.scale(object.scale);
	
					matrix.elements[3] = 0;
					matrix.elements[7] = 0;
					matrix.elements[11] = 0;
					matrix.elements[15] = 1;
	
					style = getObjectCSSMatrix(matrix);
				} else {
	
					style = getObjectCSSMatrix(object.matrixWorld);
				}
	
				var element = object.element;
				var cachedStyle = cache.objects[object.id];
	
				if (cachedStyle === undefined || cachedStyle !== style) {
	
					element.style.WebkitTransform = style;
					element.style.MozTransform = style;
					element.style.oTransform = style;
					element.style.transform = style;
	
					cache.objects[object.id] = style;
				}
	
				if (element.parentNode !== cameraElement) {
	
					cameraElement.appendChild(element);
				}
			}
	
			for (var i = 0, l = object.children.length; i < l; i++) {
	
				renderObject(object.children[i], camera);
			}
		};
	
		this.render = function (scene, camera) {
	
			var fov = 0.5 / Math.tan(_three2['default'].Math.degToRad(camera.fov * 0.5)) * _height;
	
			if (cache.camera.fov !== fov) {
	
				domElement.style.WebkitPerspective = fov + 'px';
				domElement.style.MozPerspective = fov + 'px';
				domElement.style.oPerspective = fov + 'px';
				domElement.style.perspective = fov + 'px';
	
				cache.camera.fov = fov;
			}
	
			scene.updateMatrixWorld();
	
			if (camera.parent === null) camera.updateMatrixWorld();
	
			camera.matrixWorldInverse.getInverse(camera.matrixWorld);
	
			var style = 'translate3d(0,0,' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse) + ' translate3d(' + _widthHalf + 'px,' + _heightHalf + 'px, 0)';
	
			if (cache.camera.style !== style) {
	
				cameraElement.style.WebkitTransform = style;
				cameraElement.style.MozTransform = style;
				cameraElement.style.oTransform = style;
				cameraElement.style.transform = style;
	
				cache.camera.style = style;
			}
	
			renderObject(scene, camera);
		};
	};
	
	exports.CSS3DObject = CSS3DObject;
	exports.CSS3DSprite = CSS3DSprite;
	exports.CSS3DRenderer = CSS3DRenderer;
	
	_three2['default'].CSS3DObject = CSS3DObject;
	_three2['default'].CSS3DSprite = CSS3DSprite;
	_three2['default'].CSS3DRenderer = CSS3DRenderer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _vendorCSS2DRenderer = __webpack_require__(18);
	
	var _DOMScene2D = __webpack_require__(13);
	
	var _DOMScene2D2 = _interopRequireDefault(_DOMScene2D);
	
	// This can only be accessed from Engine.renderer if you want to reference the
	// same scene in multiple places
	
	exports['default'] = function (container) {
	  var renderer = new _vendorCSS2DRenderer.CSS2DRenderer();
	
	  renderer.domElement.style.position = 'absolute';
	  renderer.domElement.style.top = 0;
	
	  container.appendChild(renderer.domElement);
	
	  var updateSize = function updateSize() {
	    renderer.setSize(container.clientWidth, container.clientHeight);
	  };
	
	  window.addEventListener('resize', updateSize, false);
	  updateSize();
	
	  return renderer;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var CSS2DObject = function CSS2DObject(element) {
	
		_three2['default'].Object3D.call(this);
	
		this.element = element;
		this.element.style.position = 'absolute';
	
		this.addEventListener('removed', function (event) {
	
			if (this.element.parentNode !== null) {
	
				this.element.parentNode.removeChild(this.element);
			}
		});
	};
	
	CSS2DObject.prototype = Object.create(_three2['default'].Object3D.prototype);
	CSS2DObject.prototype.constructor = CSS2DObject;
	
	//
	
	var CSS2DRenderer = function CSS2DRenderer() {
	
		console.log('THREE.CSS2DRenderer', _three2['default'].REVISION);
	
		var _width, _height;
		var _widthHalf, _heightHalf;
	
		var vector = new _three2['default'].Vector3();
		var viewMatrix = new _three2['default'].Matrix4();
		var viewProjectionMatrix = new _three2['default'].Matrix4();
	
		var frustum = new _three2['default'].Frustum();
	
		var domElement = document.createElement('div');
		domElement.style.overflow = 'hidden';
	
		this.domElement = domElement;
	
		this.setSize = function (width, height) {
	
			_width = width;
			_height = height;
	
			_widthHalf = _width / 2;
			_heightHalf = _height / 2;
	
			domElement.style.width = width + 'px';
			domElement.style.height = height + 'px';
		};
	
		var renderObject = function renderObject(object, camera) {
	
			if (object instanceof CSS2DObject) {
	
				vector.setFromMatrixPosition(object.matrixWorld);
				vector.applyProjection(viewProjectionMatrix);
	
				var element = object.element;
				var style = 'translate(-50%,-50%) translate(' + (vector.x * _widthHalf + _widthHalf) + 'px,' + (-vector.y * _heightHalf + _heightHalf) + 'px)';
	
				element.style.WebkitTransform = style;
				element.style.MozTransform = style;
				element.style.oTransform = style;
				element.style.transform = style;
	
				if (element.parentNode !== domElement) {
	
					domElement.appendChild(element);
				}
	
				// Hide if outside view frustum
				if (!frustum.containsPoint(object.position)) {
					element.style.display = 'none';
				} else {
					element.style.display = 'block';
				}
			}
	
			for (var i = 0, l = object.children.length; i < l; i++) {
	
				renderObject(object.children[i], camera);
			}
		};
	
		this.render = function (scene, camera) {
	
			scene.updateMatrixWorld();
	
			if (camera.parent === null) camera.updateMatrixWorld();
	
			camera.matrixWorldInverse.getInverse(camera.matrixWorld);
	
			viewMatrix.copy(camera.matrixWorldInverse.getInverse(camera.matrixWorld));
			viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, viewMatrix);
	
			frustum.setFromMatrix(new _three2['default'].Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
	
			renderObject(scene, camera);
		};
	};
	
	exports.CSS2DObject = CSS2DObject;
	exports.CSS2DRenderer = CSS2DRenderer;
	
	_three2['default'].CSS2DObject = CSS2DObject;
	_three2['default'].CSS2DRenderer = CSS2DRenderer;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can only be accessed from Engine.camera if you want to reference the
	// same scene in multiple places
	
	// TODO: Ensure that FOV looks natural on all aspect ratios
	// http://stackoverflow.com/q/26655930/997339
	
	exports['default'] = function (container) {
	  var camera = new _three2['default'].PerspectiveCamera(45, 1, 1, 2000000);
	  camera.position.y = 4000;
	  camera.position.z = 4000;
	
	  var updateSize = function updateSize() {
	    camera.aspect = container.clientWidth / container.clientHeight;
	    camera.updateProjectionMatrix();
	  };
	
	  window.addEventListener('resize', updateSize, false);
	  updateSize();
	
	  return camera;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoPoint = __webpack_require__(8);
	
	var _PickingScene = __webpack_require__(21);
	
	var _PickingScene2 = _interopRequireDefault(_PickingScene);
	
	var _lodashThrottle = __webpack_require__(22);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	// TODO: Look into a way of setting this up without passing in a renderer and
	// camera from the engine
	
	// TODO: Add a basic indicator on or around the mouse pointer when it is over
	// something pickable / clickable
	//
	// A simple transparent disc or ring at the mouse point should work to start, or
	// even just changing the cursor to the CSS 'pointer' style
	//
	// Probably want this on mousemove with a throttled update as not to spam the
	// picking method
	//
	// Relies upon the picking method not redrawing the scene every call due to
	// the way TileLayer invalidates the picking scene
	
	var nextId = 1;
	
	var Picking = (function () {
	  function Picking(world, renderer, camera) {
	    _classCallCheck(this, Picking);
	
	    this._world = world;
	    this._renderer = renderer;
	    this._camera = camera;
	
	    this._raycaster = new _three2['default'].Raycaster();
	
	    // TODO: Match this with the line width used in the picking layers
	    this._raycaster.linePrecision = 3;
	
	    this._pickingScene = _PickingScene2['default'];
	    this._pickingTexture = new _three2['default'].WebGLRenderTarget();
	    this._pickingTexture.texture.minFilter = _three2['default'].LinearFilter;
	    this._pickingTexture.texture.generateMipmaps = false;
	
	    this._nextId = 1;
	
	    this._resizeTexture();
	    this._initEvents();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(Picking, [{
	    key: '_initEvents',
	    value: function _initEvents() {
	      this._resizeHandler = this._resizeTexture.bind(this);
	      window.addEventListener('resize', this._resizeHandler, false);
	
	      this._throttledMouseMoveHandler = (0, _lodashThrottle2['default'])(this._onMouseMove.bind(this), 50);
	      this._mouseUpHandler = this._onMouseUp.bind(this);
	      this._world._container.addEventListener('mouseup', this._mouseUpHandler, false);
	      this._world._container.addEventListener('mousemove', this._throttledMouseMoveHandler, false);
	
	      this._world.on('move', this._onWorldMove, this);
	    }
	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp(event) {
	      // Only react to main button click
	      if (event.button !== 0) {
	        return;
	      }
	
	      var point = (0, _geoPoint.point)(event.clientX - this._world._container.offsetLeft, event.clientY - this._world._container.offsetTop);
	
	      var normalisedPoint = (0, _geoPoint.point)(0, 0);
	      normalisedPoint.x = point.x / this._width * 2 - 1;
	      normalisedPoint.y = -(point.y / this._height) * 2 + 1;
	
	      this._pick(point, normalisedPoint);
	    }
	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove(event) {
	      var point = (0, _geoPoint.point)(event.clientX - this._world._container.offsetLeft, event.clientY - this._world._container.offsetTop);
	
	      var normalisedPoint = (0, _geoPoint.point)(0, 0);
	      normalisedPoint.x = point.x / this._width * 2 - 1;
	      normalisedPoint.y = -(point.y / this._height) * 2 + 1;
	
	      this._pick(point, normalisedPoint, true);
	    }
	  }, {
	    key: '_onWorldMove',
	    value: function _onWorldMove() {
	      this._needUpdate = true;
	    }
	
	    // TODO: Ensure this doesn't get out of sync issue with the renderer resize
	  }, {
	    key: '_resizeTexture',
	    value: function _resizeTexture() {
	      var size = this._renderer.getSize();
	
	      this._width = size.width;
	      this._height = size.height;
	
	      this._pickingTexture.setSize(this._width, this._height);
	      this._pixelBuffer = new Uint8Array(4 * this._width * this._height);
	
	      this._needUpdate = true;
	    }
	
	    // TODO: Make this only re-draw the scene if both an update is needed and the
	    // camera has moved since the last update
	    //
	    // Otherwise it re-draws the scene on every click due to the way LOD updates
	    // work in TileLayer – spamming this.add() and this.remove()
	    //
	    // TODO: Pause updates during map move / orbit / zoom as this is unlikely to
	    // be a point in time where the user cares for picking functionality
	  }, {
	    key: '_update',
	    value: function _update() {
	      if (this._needUpdate) {
	        var texture = this._pickingTexture;
	
	        this._renderer.render(this._pickingScene, this._camera, this._pickingTexture);
	
	        // Read the rendering texture
	        this._renderer.readRenderTargetPixels(texture, 0, 0, texture.width, texture.height, this._pixelBuffer);
	
	        this._needUpdate = false;
	      }
	    }
	  }, {
	    key: '_pick',
	    value: function _pick(point, normalisedPoint, hover) {
	      this._update();
	
	      var index = point.x + (this._pickingTexture.height - point.y) * this._pickingTexture.width;
	
	      // Interpret the pixel as an ID
	      var id = this._pixelBuffer[index * 4 + 2] * 255 * 255 + this._pixelBuffer[index * 4 + 1] * 255 + this._pixelBuffer[index * 4 + 0];
	
	      // Skip if ID is 16646655 (white) as the background returns this
	      if (id === 16646655) {
	        if (hover) {
	          this._world.emit('pick-hover-reset');
	        } else {
	          this._world.emit('pick-click-reset');
	        }
	
	        return;
	      }
	
	      this._raycaster.setFromCamera(normalisedPoint, this._camera);
	
	      // Perform ray intersection on picking scene
	      //
	      // TODO: Only perform intersection test on the relevant picking mesh
	      var intersects = this._raycaster.intersectObjects(this._pickingScene.children, true);
	
	      var _point2d = point.clone();
	
	      var _point3d;
	      if (intersects.length > 0) {
	        _point3d = intersects[0].point.clone();
	      }
	
	      // Pass along as much data as possible for now until we know more about how
	      // people use the picking API and what the returned data should be
	      //
	      // TODO: Look into the leak potential for passing so much by reference here
	      // this._world.emit('pick', id, _point2d, _point3d, intersects);
	      // this._world.emit('pick-' + id, _point2d, _point3d, intersects);
	
	      if (hover) {
	        this._world.emit('pick-hover', id, _point2d, _point3d, intersects);
	        this._world.emit('pick-hover-' + id, _point2d, _point3d, intersects);
	      } else {
	        this._world.emit('pick-click', id, _point2d, _point3d, intersects);
	        this._world.emit('pick-click-' + id, _point2d, _point3d, intersects);
	      }
	    }
	
	    // Add mesh to picking scene
	    //
	    // Picking ID should already be added as an attribute
	  }, {
	    key: 'add',
	    value: function add(mesh) {
	      this._pickingScene.add(mesh);
	      this._needUpdate = true;
	    }
	
	    // Remove mesh from picking scene
	  }, {
	    key: 'remove',
	    value: function remove(mesh) {
	      this._pickingScene.remove(mesh);
	      this._needUpdate = true;
	    }
	
	    // Returns next ID to use for picking
	  }, {
	    key: 'getNextId',
	    value: function getNextId() {
	      return nextId++;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // TODO: Find a way to properly remove these listeners as they stay
	      // active at the moment
	      window.removeEventListener('resize', this._resizeHandler, false);
	      this._world._container.removeEventListener('mouseup', this._mouseUpHandler, false);
	      this._world._container.removeEventListener('mousemove', this._throttledMouseMoveHandler, false);
	
	      this._world.off('move', this._onWorldMove);
	
	      if (this._pickingScene.children) {
	        // Remove everything else in the layer
	        var child;
	        for (var i = this._pickingScene.children.length - 1; i >= 0; i--) {
	          child = this._pickingScene.children[i];
	
	          if (!child) {
	            continue;
	          }
	
	          this._pickingScene.remove(child);
	
	          // Probably not a good idea to dispose of geometry due to it being
	          // shared with the non-picking scene
	          // if (child.geometry) {
	          //   // Dispose of mesh and materials
	          //   child.geometry.dispose();
	          //   child.geometry = null;
	          // }
	
	          if (child.material) {
	            if (child.material.map) {
	              child.material.map.dispose();
	              child.material.map = null;
	            }
	
	            child.material.dispose();
	            child.material = null;
	          }
	        }
	      }
	
	      this._pickingScene = null;
	      this._pickingTexture = null;
	      this._pixelBuffer = null;
	
	      this._world = null;
	      this._renderer = null;
	      this._camera = null;
	    }
	  }]);
	
	  return Picking;
	})();
	
	exports['default'] = function (world, renderer, camera) {
	  return new Picking(world, renderer, camera);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can be imported from anywhere and will still reference the same scene,
	// though there is a helper reference in Engine.pickingScene
	
	exports['default'] = (function () {
	  var scene = new _three2['default'].Scene();
	  return scene;
	})();
	
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var debounce = __webpack_require__(23);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide an options object to indicate whether
	 * `func` should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the throttled function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=true] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = throttle;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @type {Function}
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred function to be invoked.
	 */
	var now = Date.now;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime = 0,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (!lastCallTime || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    clearTimeout(timerId);
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastCallTime = lastInvokeTime = 0;
	    lastArgs = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = debounce;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _vendorEffectComposer = __webpack_require__(25);
	
	var _vendorEffectComposer2 = _interopRequireDefault(_vendorEffectComposer);
	
	exports['default'] = function (renderer, container) {
	  var composer = new _vendorEffectComposer2['default'](renderer);
	
	  var updateSize = function updateSize() {
	    // TODO: Re-enable this when perf issues can be solved
	    //
	    // Rendering double the resolution of the screen can be really slow
	    // var pixelRatio = window.devicePixelRatio;
	    var pixelRatio = 1;
	
	    composer.setSize(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
	  };
	
	  window.addEventListener('resize', updateSize, false);
	  updateSize();
	
	  return composer;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _CopyShader = __webpack_require__(26);
	
	var _CopyShader2 = _interopRequireDefault(_CopyShader);
	
	var _ShaderPass = __webpack_require__(27);
	
	var _ShaderPass2 = _interopRequireDefault(_ShaderPass);
	
	var _MaskPass = __webpack_require__(28);
	
	var _MaskPass2 = _interopRequireDefault(_MaskPass);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	var EffectComposer = function EffectComposer(renderer, renderTarget) {
	
		this.renderer = renderer;
	
		if (renderTarget === undefined) {
	
			var pixelRatio = renderer.getPixelRatio();
	
			var width = Math.floor(renderer.context.canvas.width / pixelRatio) || 1;
			var height = Math.floor(renderer.context.canvas.height / pixelRatio) || 1;
			var parameters = { minFilter: _three2['default'].LinearFilter, magFilter: _three2['default'].LinearFilter, format: _three2['default'].RGBAFormat, stencilBuffer: false };
	
			renderTarget = new _three2['default'].WebGLRenderTarget(width, height, parameters);
		}
	
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
	
		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	
		this.passes = [];
	
		if (_CopyShader2['default'] === undefined) console.error("EffectComposer relies on THREE.CopyShader");
	
		this.copyPass = new _ShaderPass2['default'](_CopyShader2['default']);
	};
	
	EffectComposer.prototype = {
	
		swapBuffers: function swapBuffers() {
	
			var tmp = this.readBuffer;
			this.readBuffer = this.writeBuffer;
			this.writeBuffer = tmp;
		},
	
		addPass: function addPass(pass) {
	
			this.passes.push(pass);
		},
	
		insertPass: function insertPass(pass, index) {
	
			this.passes.splice(index, 0, pass);
		},
	
		render: function render(delta) {
	
			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;
	
			var maskActive = false;
	
			var pass,
			    i,
			    il = this.passes.length;
	
			for (i = 0; i < il; i++) {
	
				pass = this.passes[i];
	
				if (!pass.enabled) continue;
	
				pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);
	
				if (pass.needsSwap) {
	
					if (maskActive) {
	
						var context = this.renderer.context;
	
						context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);
	
						this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);
	
						context.stencilFunc(context.EQUAL, 1, 0xffffffff);
					}
	
					this.swapBuffers();
				}
	
				if (pass instanceof _MaskPass2['default']) {
	
					maskActive = true;
				} else if (pass instanceof _MaskPass.ClearMaskPass) {
	
					maskActive = false;
				}
			}
		},
	
		reset: function reset(renderTarget) {
	
			if (renderTarget === undefined) {
	
				renderTarget = this.renderTarget1.clone();
	
				var pixelRatio = this.renderer.getPixelRatio();
	
				renderTarget.setSize(Math.floor(this.renderer.context.canvas.width / pixelRatio), Math.floor(this.renderer.context.canvas.height / pixelRatio));
			}
	
			this.renderTarget1.dispose();
			this.renderTarget1 = renderTarget;
			this.renderTarget2.dispose();
			this.renderTarget2 = renderTarget.clone();
	
			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;
		},
	
		setSize: function setSize(width, height) {
	
			this.renderTarget1.setSize(width, height);
			this.renderTarget2.setSize(width, height);
		}
	
	};
	
	exports['default'] = EffectComposer;
	
	_three2['default'].EffectComposer = EffectComposer;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Full-screen textured quad shader
	 */
	
	var CopyShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"opacity": { type: "f", value: 1.0 }
	
		},
	
		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	
		fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
	
	};
	
	exports["default"] = CopyShader;
	
	_three2["default"].CopyShader = CopyShader;
	module.exports = exports["default"];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	var ShaderPass = function ShaderPass(shader, textureID) {
	
		this.textureID = textureID !== undefined ? textureID : "tDiffuse";
	
		if (shader instanceof _three2["default"].ShaderMaterial) {
	
			this.uniforms = shader.uniforms;
	
			this.material = shader;
		} else if (shader) {
	
			this.uniforms = _three2["default"].UniformsUtils.clone(shader.uniforms);
	
			this.material = new _three2["default"].ShaderMaterial({
	
				defines: shader.defines || {},
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader
	
			});
		}
	
		this.renderToScreen = false;
	
		this.enabled = true;
		this.needsSwap = true;
		this.clear = false;
	
		this.camera = new _three2["default"].OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.scene = new _three2["default"].Scene();
	
		this.quad = new _three2["default"].Mesh(new _three2["default"].PlaneBufferGeometry(2, 2), null);
		this.scene.add(this.quad);
	};
	
	ShaderPass.prototype = {
	
		render: function render(renderer, writeBuffer, readBuffer, delta) {
	
			if (this.uniforms[this.textureID]) {
	
				this.uniforms[this.textureID].value = readBuffer;
			}
	
			this.quad.material = this.material;
	
			if (this.renderToScreen) {
	
				renderer.render(this.scene, this.camera);
			} else {
	
				renderer.render(this.scene, this.camera, writeBuffer, this.clear);
			}
		}
	
	};
	
	exports["default"] = ShaderPass;
	
	_three2["default"].ShaderPass = ShaderPass;
	module.exports = exports["default"];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	var MaskPass = function MaskPass(scene, camera) {
	
		this.scene = scene;
		this.camera = camera;
	
		this.enabled = true;
		this.clear = true;
		this.needsSwap = false;
	
		this.inverse = false;
	};
	
	MaskPass.prototype = {
	
		render: function render(renderer, writeBuffer, readBuffer, delta) {
	
			var context = renderer.context;
	
			// don't update color or depth
	
			context.colorMask(false, false, false, false);
			context.depthMask(false);
	
			// set up stencil
	
			var writeValue, clearValue;
	
			if (this.inverse) {
	
				writeValue = 0;
				clearValue = 1;
			} else {
	
				writeValue = 1;
				clearValue = 0;
			}
	
			context.enable(context.STENCIL_TEST);
			context.stencilOp(context.REPLACE, context.REPLACE, context.REPLACE);
			context.stencilFunc(context.ALWAYS, writeValue, 0xffffffff);
			context.clearStencil(clearValue);
	
			// draw into the stencil buffer
	
			renderer.render(this.scene, this.camera, readBuffer, this.clear);
			renderer.render(this.scene, this.camera, writeBuffer, this.clear);
	
			// re-enable update of color and depth
	
			context.colorMask(true, true, true, true);
			context.depthMask(true);
	
			// only render where stencil is set to 1
	
			context.stencilFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
			context.stencilOp(context.KEEP, context.KEEP, context.KEEP);
		}
	
	};
	
	var ClearMaskPass = function ClearMaskPass() {
	
		this.enabled = true;
	};
	
	ClearMaskPass.prototype = {
	
		render: function render(renderer, writeBuffer, readBuffer, delta) {
	
			var context = renderer.context;
	
			context.disable(context.STENCIL_TEST);
		}
	
	};
	
	exports['default'] = MaskPass;
	exports.ClearMaskPass = ClearMaskPass;
	
	_three2['default'].MaskPass = MaskPass;
	_three2['default'].ClearMaskPass = ClearMaskPass;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 */
	
	var RenderPass = function RenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha) {
	
		this.scene = scene;
		this.camera = camera;
	
		this.overrideMaterial = overrideMaterial;
	
		this.clearColor = clearColor;
		this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 1;
	
		this.oldClearColor = new _three2['default'].Color();
		this.oldClearAlpha = 1;
	
		this.enabled = true;
		this.clear = true;
		this.needsSwap = false;
	};
	
	RenderPass.prototype = {
	
		render: function render(renderer, writeBuffer, readBuffer, delta) {
	
			this.scene.overrideMaterial = this.overrideMaterial;
	
			if (this.clearColor) {
	
				this.oldClearColor.copy(renderer.getClearColor());
				this.oldClearAlpha = renderer.getClearAlpha();
	
				renderer.setClearColor(this.clearColor, this.clearAlpha);
			}
	
			renderer.render(this.scene, this.camera, readBuffer, this.clear);
	
			if (this.clearColor) {
	
				renderer.setClearColor(this.oldClearColor, this.oldClearAlpha);
			}
	
			this.scene.overrideMaterial = null;
		}
	
	};
	
	exports['default'] = RenderPass;
	
	_three2['default'].RenderPass = RenderPass;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
	 *
	 * - 9 samples per pass
	 * - standard deviation 2.7
	 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
	 * - "r" parameter control where "focused" horizontal line lies
	 */
	
	var HorizontalTiltShiftShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"h": { type: "f", value: 1.0 / 512.0 },
			"r": { type: "f", value: 0.35 }
	
		},
	
		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	
		fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float h;", "uniform float r;", "varying vec2 vUv;", "void main() {", "vec4 sum = vec4( 0.0 );", "float hh = h * abs( r - vUv.y );", "sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;", "sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;", "sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;", "sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;", "sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;", "sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;", "sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;", "sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;", "gl_FragColor = sum;", "}"].join("\n")
	
	};
	
	exports["default"] = HorizontalTiltShiftShader;
	
	_three2["default"].HorizontalTiltShiftShader = HorizontalTiltShiftShader;
	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
	 *
	 * - 9 samples per pass
	 * - standard deviation 2.7
	 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
	 * - "r" parameter control where "focused" horizontal line lies
	 */
	
	var VerticalTiltShiftShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"v": { type: "f", value: 1.0 / 512.0 },
			"r": { type: "f", value: 0.35 }
	
		},
	
		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	
		fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float v;", "uniform float r;", "varying vec2 vUv;", "void main() {", "vec4 sum = vec4( 0.0 );", "float vv = v * abs( r - vUv.y );", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;", "gl_FragColor = sum;", "}"].join("\n")
	
	};
	
	exports["default"] = VerticalTiltShiftShader;
	
	_three2["default"].VerticalTiltShiftShader = VerticalTiltShiftShader;
	module.exports = exports["default"];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author davidedc / http://www.sketchpatch.net/
	 *
	 * NVIDIA FXAA by Timothy Lottes
	 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
	 * - WebGL port by @supereggbert
	 * http://www.glge.org/demos/fxaa/
	 */
	
	var FXAAShader = {
	
		uniforms: {
	
			"tDiffuse": { type: "t", value: null },
			"resolution": { type: "v2", value: new _three2["default"].Vector2(1 / 1024, 1 / 512) }
	
		},
	
		vertexShader: ["void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
	
		fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec2 resolution;", "#define FXAA_REDUCE_MIN   (1.0/128.0)", "#define FXAA_REDUCE_MUL   (1.0/8.0)", "#define FXAA_SPAN_MAX     8.0", "void main() {", "vec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;", "vec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;", "vec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );", "vec3 rgbM  = rgbaM.xyz;", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float lumaNW = dot( rgbNW, luma );", "float lumaNE = dot( rgbNE, luma );", "float lumaSW = dot( rgbSW, luma );", "float lumaSE = dot( rgbSE, luma );", "float lumaM  = dot( rgbM,  luma );", "float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );", "float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );", "vec2 dir;", "dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));", "dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));", "float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );", "float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );", "dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),", "max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),", "dir * rcpDirMin)) * resolution;", "vec4 rgbA = (1.0/2.0) * (", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (1.0/3.0 - 0.5)) +", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (2.0/3.0 - 0.5)));", "vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (0.0/3.0 - 0.5)) +", "texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (3.0/3.0 - 0.5)));", "float lumaB = dot(rgbB, vec4(luma, 0.0));", "if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {", "gl_FragColor = rgbA;", "} else {", "gl_FragColor = rgbB;", "}", "}"].join("\n")
	
	};
	
	exports["default"] = FXAAShader;
	
	_three2["default"].FXAAShader = FXAAShader;
	module.exports = exports["default"];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Skybox = __webpack_require__(44);
	
	var _Skybox2 = _interopRequireDefault(_Skybox);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	var EnvironmentLayer = (function (_Layer) {
	  _inherits(EnvironmentLayer, _Layer);
	
	  function EnvironmentLayer(options) {
	    _classCallCheck(this, EnvironmentLayer);
	
	    var defaults = {
	      skybox: false
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(EnvironmentLayer.prototype), 'constructor', this).call(this, _options);
	  }
	
	  _createClass(EnvironmentLayer, [{
	    key: '_onAdd',
	    value: function _onAdd() {
	      this._initLights();
	
	      if (this._options.skybox) {
	        this._initSkybox();
	      }
	
	      // this._initGrid();
	
	      return Promise.resolve(this);
	    }
	
	    // Not fleshed out or thought through yet
	    //
	    // Lights could potentially be put it their own 'layer' to keep this class
	    // much simpler and less messy
	  }, {
	    key: '_initLights',
	    value: function _initLights() {
	      // Position doesn't really matter (the angle is important), however it's
	      // used here so the helpers look more natural.
	
	      if (!this._options.skybox) {
	        var directionalLight = new _three2['default'].DirectionalLight(0xffffff, 1);
	        directionalLight.position.x = 10000;
	        directionalLight.position.y = 10000;
	        directionalLight.position.z = 10000;
	
	        // TODO: Get shadows working in non-PBR scenes
	
	        // directionalLight.castShadow = true;
	        //
	        // var d = 100;
	        // directionalLight.shadow.camera.left = -d;
	        // directionalLight.shadow.camera.right = d;
	        // directionalLight.shadow.camera.top = d;
	        // directionalLight.shadow.camera.bottom = -d;
	        //
	        // directionalLight.shadow.camera.near = 10;
	        // directionalLight.shadow.camera.far = 100;
	        //
	        // // TODO: Need to dial in on a good shadowmap size
	        // directionalLight.shadow.mapSize.width = 2048;
	        // directionalLight.shadow.mapSize.height = 2048;
	        //
	        // // directionalLight.shadowBias = -0.0010;
	        // // directionalLight.shadow.darkness = 0.15;
	
	        var directionalLight2 = new _three2['default'].DirectionalLight(0xffffff, 0.5);
	        directionalLight2.position.x = -10000;
	        directionalLight2.position.y = 10000;
	        directionalLight2.position.z = 0;
	
	        var directionalLight3 = new _three2['default'].DirectionalLight(0xffffff, 0.5);
	        directionalLight3.position.x = 10000;
	        directionalLight3.position.y = 10000;
	        directionalLight3.position.z = -10000;
	
	        this.add(directionalLight);
	        this.add(directionalLight2);
	        this.add(directionalLight3);
	
	        // var helper = new THREE.DirectionalLightHelper(directionalLight, 10);
	        // var helper2 = new THREE.DirectionalLightHelper(directionalLight2, 10);
	        // var helper3 = new THREE.DirectionalLightHelper(directionalLight3, 10);
	        //
	        // this.add(helper);
	        // this.add(helper2);
	        // this.add(helper3);
	      } else {
	          // Directional light that will be projected from the sun
	          this._skyboxLight = new _three2['default'].DirectionalLight(0xffffff, 1);
	
	          this._skyboxLight.castShadow = true;
	
	          var d = 10000;
	          this._skyboxLight.shadow.camera.left = -d;
	          this._skyboxLight.shadow.camera.right = d;
	          this._skyboxLight.shadow.camera.top = d;
	          this._skyboxLight.shadow.camera.bottom = -d;
	
	          this._skyboxLight.shadow.camera.near = 10000;
	          this._skyboxLight.shadow.camera.far = 70000;
	
	          // TODO: Need to dial in on a good shadowmap size
	          this._skyboxLight.shadow.mapSize.width = 2048;
	          this._skyboxLight.shadow.mapSize.height = 2048;
	
	          // this._skyboxLight.shadowBias = -0.0010;
	          // this._skyboxLight.shadow.darkness = 0.15;
	
	          // this._object3D.add(new THREE.CameraHelper(this._skyboxLight.shadow.camera));
	
	          this.add(this._skyboxLight);
	        }
	    }
	  }, {
	    key: '_initSkybox',
	    value: function _initSkybox() {
	      this._skybox = new _Skybox2['default'](this._world, this._skyboxLight);
	      this.add(this._skybox._mesh);
	    }
	
	    // Add grid helper for context during initial development
	  }, {
	    key: '_initGrid',
	    value: function _initGrid() {
	      var size = 4000;
	      var step = 100;
	
	      var gridHelper = new _three2['default'].GridHelper(size, step);
	      this.add(gridHelper);
	    }
	
	    // Clean up environment
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._skyboxLight = null;
	
	      this.remove(this._skybox._mesh);
	      this._skybox.destroy();
	      this._skybox = null;
	
	      _get(Object.getPrototypeOf(EnvironmentLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return EnvironmentLayer;
	})(_Layer3['default']);
	
	exports['default'] = EnvironmentLayer;
	
	var noNew = function noNew(options) {
	  return new EnvironmentLayer(options);
	};
	
	// Initialise without requiring new keyword
	exports.environmentLayer = noNew;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _eventemitter3 = __webpack_require__(2);
	
	var _eventemitter32 = _interopRequireDefault(_eventemitter3);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _shortid = __webpack_require__(35);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _engineScene = __webpack_require__(11);
	
	var _engineScene2 = _interopRequireDefault(_engineScene);
	
	var _vendorCSS3DRenderer = __webpack_require__(16);
	
	var _vendorCSS2DRenderer = __webpack_require__(18);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// TODO: Need a single move method that handles moving all the various object
	// layers so that the DOM layers stay in sync with the 3D layer
	
	// TODO: Double check that objects within the _object3D Object3D parent are frustum
	// culled even if the layer position stays at the default (0,0,0) and the child
	// objects are positioned much further away
	//
	// Or does the layer being at (0,0,0) prevent the child objects from being
	// culled because the layer parent is effectively always in view even if the
	// child is actually out of camera
	
	var Layer = (function (_EventEmitter) {
	  _inherits(Layer, _EventEmitter);
	
	  function Layer(options) {
	    _classCallCheck(this, Layer);
	
	    _get(Object.getPrototypeOf(Layer.prototype), 'constructor', this).call(this);
	
	    var defaults = {
	      id: _shortid2['default'].generate(),
	      output: true,
	      outputToScene: true
	    };
	
	    this._options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    if (this.isOutput()) {
	      this._object3D = new _three2['default'].Object3D();
	
	      this._dom3D = document.createElement('div');
	      this._domObject3D = new _vendorCSS3DRenderer.CSS3DObject(this._dom3D);
	
	      this._dom2D = document.createElement('div');
	      this._domObject2D = new _vendorCSS2DRenderer.CSS2DObject(this._dom2D);
	    }
	  }
	
	  // Add THREE object directly to layer
	
	  _createClass(Layer, [{
	    key: 'add',
	    value: function add(object) {
	      this._object3D.add(object);
	    }
	
	    // Remove THREE object from to layer
	  }, {
	    key: 'remove',
	    value: function remove(object) {
	      this._object3D.remove(object);
	    }
	  }, {
	    key: 'addDOM3D',
	    value: function addDOM3D(object) {
	      this._domObject3D.add(object);
	    }
	  }, {
	    key: 'removeDOM3D',
	    value: function removeDOM3D(object) {
	      this._domObject3D.remove(object);
	    }
	  }, {
	    key: 'addDOM2D',
	    value: function addDOM2D(object) {
	      this._domObject2D.add(object);
	    }
	  }, {
	    key: 'removeDOM2D',
	    value: function removeDOM2D(object) {
	      this._domObject2D.remove(object);
	    }
	
	    // Add layer to world instance and store world reference
	  }, {
	    key: 'addTo',
	    value: function addTo(world) {
	      return world.addLayer(this);
	    }
	
	    // Internal method called by World.addLayer to actually add the layer
	  }, {
	    key: '_addToWorld',
	    value: function _addToWorld(world) {
	      var _this = this;
	
	      this._world = world;
	
	      return new Promise(function (resolve, reject) {
	        _this._onAdd(world).then(function () {
	          _this.emit('added');
	          resolve(_this);
	        })['catch'](reject);
	      });
	    }
	
	    // Must return a promise
	  }, {
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      return Promise.resolve(this);
	    }
	  }, {
	    key: 'getPickingId',
	    value: function getPickingId() {
	      if (this._world._engine._picking) {
	        return this._world._engine._picking.getNextId();
	      }
	
	      return false;
	    }
	
	    // TODO: Tidy this up and don't access so many private properties to work
	  }, {
	    key: 'addToPicking',
	    value: function addToPicking(object) {
	      if (!this._world._engine._picking) {
	        return;
	      }
	
	      this._world._engine._picking.add(object);
	    }
	  }, {
	    key: 'removeFromPicking',
	    value: function removeFromPicking(object) {
	      if (!this._world._engine._picking) {
	        return;
	      }
	
	      this._world._engine._picking.remove(object);
	    }
	  }, {
	    key: 'isOutput',
	    value: function isOutput() {
	      return this._options.output;
	    }
	  }, {
	    key: 'isOutputToScene',
	    value: function isOutputToScene() {
	      return this._options.outputToScene;
	    }
	
	    // TODO: Also hide any attached DOM layers
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this._object3D.visible = false;
	
	      if (this._pickingMesh) {
	        this._pickingMesh.visible = false;
	      }
	    }
	
	    // TODO: Also show any attached DOM layers
	  }, {
	    key: 'show',
	    value: function show() {
	      this._object3D.visible = true;
	
	      if (this._pickingMesh) {
	        this._pickingMesh.visible = true;
	      }
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this._object3D && this._object3D.children) {
	        // Remove everything else in the layer
	        var child;
	        for (var i = this._object3D.children.length - 1; i >= 0; i--) {
	          child = this._object3D.children[i];
	
	          if (!child) {
	            continue;
	          }
	
	          this.remove(child);
	
	          if (child.geometry) {
	            // Dispose of mesh and materials
	            child.geometry.dispose();
	            child.geometry = null;
	          }
	
	          if (child.material) {
	            if (child.material.map) {
	              child.material.map.dispose();
	              child.material.map = null;
	            }
	
	            child.material.dispose();
	            child.material = null;
	          }
	        }
	      }
	
	      if (this._domObject3D && this._domObject3D.children) {
	        // Remove everything else in the layer
	        var child;
	        for (var i = this._domObject3D.children.length - 1; i >= 0; i--) {
	          child = this._domObject3D.children[i];
	
	          if (!child) {
	            continue;
	          }
	
	          this.removeDOM3D(child);
	        }
	      }
	
	      if (this._domObject2D && this._domObject2D.children) {
	        // Remove everything else in the layer
	        var child;
	        for (var i = this._domObject2D.children.length - 1; i >= 0; i--) {
	          child = this._domObject2D.children[i];
	
	          if (!child) {
	            continue;
	          }
	
	          this.removeDOM2D(child);
	        }
	      }
	
	      this._domObject3D = null;
	      this._domObject2D = null;
	
	      this._world = null;
	      this._object3D = null;
	    }
	  }]);
	
	  return Layer;
	})(_eventemitter32['default']);
	
	exports['default'] = Layer;
	
	var noNew = function noNew(options) {
	  return new Layer(options);
	};
	
	exports.layer = noNew;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(36);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(37);
	var encode = __webpack_require__(39);
	var decode = __webpack_require__(41);
	var isValid = __webpack_require__(42);
	
	// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
	// This number should be updated every year or so to keep the generated id short.
	// To regenerate `new Date() - 0` and bump the version. Always bump the version!
	var REDUCE_TIME = 1459707606518;
	
	// don't change unless we change the algos or REDUCE_TIME
	// must be an integer and less than 16
	var version = 6;
	
	// if you are using cluster or multiple servers use this to make each instance
	// has a unique value for worker
	// Note: I don't know if this is automatically set when using third
	// party cluster solutions such as pm2.
	var clusterWorkerId = __webpack_require__(43) || 0;
	
	// Counter is used when shortid is called multiple times in one second.
	var counter;
	
	// Remember the last time shortid was called in case counter is needed.
	var previousSeconds;
	
	/**
	 * Generate unique id
	 * Returns string id
	 */
	function generate() {
	
	    var str = '';
	
	    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);
	
	    if (seconds === previousSeconds) {
	        counter++;
	    } else {
	        counter = 0;
	        previousSeconds = seconds;
	    }
	
	    str = str + encode(alphabet.lookup, version);
	    str = str + encode(alphabet.lookup, clusterWorkerId);
	    if (counter > 0) {
	        str = str + encode(alphabet.lookup, counter);
	    }
	    str = str + encode(alphabet.lookup, seconds);
	
	    return str;
	}
	
	
	/**
	 * Set the seed.
	 * Highly recommended if you don't want people to try to figure out your id schema.
	 * exposed as shortid.seed(int)
	 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
	 */
	function seed(seedValue) {
	    alphabet.seed(seedValue);
	    return module.exports;
	}
	
	/**
	 * Set the cluster worker or machine id
	 * exposed as shortid.worker(int)
	 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
	 * returns shortid module so it can be chained.
	 */
	function worker(workerId) {
	    clusterWorkerId = workerId;
	    return module.exports;
	}
	
	/**
	 *
	 * sets new characters to use in the alphabet
	 * returns the shuffled alphabet
	 */
	function characters(newCharacters) {
	    if (newCharacters !== undefined) {
	        alphabet.characters(newCharacters);
	    }
	
	    return alphabet.shuffled();
	}
	
	
	// Export all other functions as properties of the generate function
	module.exports = generate;
	module.exports.generate = generate;
	module.exports.seed = seed;
	module.exports.worker = worker;
	module.exports.characters = characters;
	module.exports.decode = decode;
	module.exports.isValid = isValid;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(38);
	
	var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
	var alphabet;
	var previousSeed;
	
	var shuffled;
	
	function reset() {
	    shuffled = false;
	}
	
	function setCharacters(_alphabet_) {
	    if (!_alphabet_) {
	        if (alphabet !== ORIGINAL) {
	            alphabet = ORIGINAL;
	            reset();
	        }
	        return;
	    }
	
	    if (_alphabet_ === alphabet) {
	        return;
	    }
	
	    if (_alphabet_.length !== ORIGINAL.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
	    }
	
	    var unique = _alphabet_.split('').filter(function(item, ind, arr){
	       return ind !== arr.lastIndexOf(item);
	    });
	
	    if (unique.length) {
	        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
	    }
	
	    alphabet = _alphabet_;
	    reset();
	}
	
	function characters(_alphabet_) {
	    setCharacters(_alphabet_);
	    return alphabet;
	}
	
	function setSeed(seed) {
	    randomFromSeed.seed(seed);
	    if (previousSeed !== seed) {
	        reset();
	        previousSeed = seed;
	    }
	}
	
	function shuffle() {
	    if (!alphabet) {
	        setCharacters(ORIGINAL);
	    }
	
	    var sourceArray = alphabet.split('');
	    var targetArray = [];
	    var r = randomFromSeed.nextValue();
	    var characterIndex;
	
	    while (sourceArray.length > 0) {
	        r = randomFromSeed.nextValue();
	        characterIndex = Math.floor(r * sourceArray.length);
	        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
	    }
	    return targetArray.join('');
	}
	
	function getShuffled() {
	    if (shuffled) {
	        return shuffled;
	    }
	    shuffled = shuffle();
	    return shuffled;
	}
	
	/**
	 * lookup shuffled letter
	 * @param index
	 * @returns {string}
	 */
	function lookup(index) {
	    var alphabetShuffled = getShuffled();
	    return alphabetShuffled[index];
	}
	
	module.exports = {
	    characters: characters,
	    seed: setSeed,
	    lookup: lookup,
	    shuffled: getShuffled
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	// Found this seed-based random generator somewhere
	// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)
	
	var seed = 1;
	
	/**
	 * return a random number based on a seed
	 * @param seed
	 * @returns {number}
	 */
	function getNextValue() {
	    seed = (seed * 9301 + 49297) % 233280;
	    return seed/(233280.0);
	}
	
	function setSeed(_seed_) {
	    seed = _seed_;
	}
	
	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(40);
	
	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;
	
	    var str = '';
	
	    while (!done) {
	        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
	        done = number < (Math.pow(16, loopCounter + 1 ) );
	        loopCounter++;
	    }
	    return str;
	}
	
	module.exports = encode;


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto
	
	function randomByte() {
	    if (!crypto || !crypto.getRandomValues) {
	        return Math.floor(Math.random() * 256) & 0x30;
	    }
	    var dest = new Uint8Array(1);
	    crypto.getRandomValues(dest);
	    return dest[0] & 0x30;
	}
	
	module.exports = randomByte;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(37);
	
	/**
	 * Decode the id to get the version and worker
	 * Mainly for debugging and testing.
	 * @param id - the shortid-generated id.
	 */
	function decode(id) {
	    var characters = alphabet.shuffled();
	    return {
	        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
	        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
	    };
	}
	
	module.exports = decode;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(37);
	
	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6 ) {
	        return false;
	    }
	
	    var characters = alphabet.characters();
	    var len = id.length;
	    for(var i = 0; i < len;i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}
	
	module.exports = isShortId;


/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Sky = __webpack_require__(45);
	
	var _Sky2 = _interopRequireDefault(_Sky);
	
	var _lodashThrottle = __webpack_require__(22);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	var cubemap = {
	  vertexShader: ['varying vec3 vPosition;', 'void main() {', 'vPosition = position;', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
	
	  fragmentShader: ['uniform samplerCube cubemap;', 'varying vec3 vPosition;', 'void main() {', 'gl_FragColor = textureCube(cubemap, normalize(vPosition));', '}'].join('\n')
	};
	
	var Skybox = (function () {
	  function Skybox(world, light) {
	    _classCallCheck(this, Skybox);
	
	    this._world = world;
	    this._light = light;
	
	    this._settings = {
	      distance: 38000,
	      turbidity: 10,
	      reileigh: 2,
	      mieCoefficient: 0.005,
	      mieDirectionalG: 0.8,
	      luminance: 1,
	      // 0.48 is a cracking dusk / sunset
	      // 0.4 is a beautiful early-morning / late-afternoon
	      // 0.2 is a nice day time
	      inclination: 0.48, // Elevation / inclination
	      azimuth: 0.25 };
	
	    // Facing front
	    this._initSkybox();
	    this._updateUniforms();
	    this._initEvents();
	  }
	
	  _createClass(Skybox, [{
	    key: '_initEvents',
	    value: function _initEvents() {
	      // Throttled to 1 per 100ms
	      this._throttledWorldUpdate = (0, _lodashThrottle2['default'])(this._update, 100);
	      this._world.on('preUpdate', this._throttledWorldUpdate, this);
	    }
	  }, {
	    key: '_initSkybox',
	    value: function _initSkybox() {
	      // Cube camera for skybox
	      this._cubeCamera = new _three2['default'].CubeCamera(1, 20000000, 128);
	
	      // Cube material
	      var cubeTarget = this._cubeCamera.renderTarget;
	
	      // Add Sky Mesh
	      this._sky = new _Sky2['default']();
	      this._skyScene = new _three2['default'].Scene();
	      this._skyScene.add(this._sky.mesh);
	
	      // Add Sun Helper
	      this._sunSphere = new _three2['default'].Mesh(new _three2['default'].SphereBufferGeometry(2000, 16, 8), new _three2['default'].MeshBasicMaterial({
	        color: 0xffffff
	      }));
	
	      // TODO: This isn't actually visible because it's not added to the layer
	      // this._sunSphere.visible = true;
	
	      var skyboxUniforms = {
	        cubemap: { type: 't', value: cubeTarget }
	      };
	
	      var skyboxMat = new _three2['default'].ShaderMaterial({
	        uniforms: skyboxUniforms,
	        vertexShader: cubemap.vertexShader,
	        fragmentShader: cubemap.fragmentShader,
	        side: _three2['default'].BackSide
	      });
	
	      this._mesh = new _three2['default'].Mesh(new _three2['default'].BoxGeometry(1900000, 1900000, 1900000), skyboxMat);
	
	      this._updateSkybox = true;
	    }
	  }, {
	    key: '_updateUniforms',
	    value: function _updateUniforms() {
	      var settings = this._settings;
	      var uniforms = this._sky.uniforms;
	      uniforms.turbidity.value = settings.turbidity;
	      uniforms.reileigh.value = settings.reileigh;
	      uniforms.luminance.value = settings.luminance;
	      uniforms.mieCoefficient.value = settings.mieCoefficient;
	      uniforms.mieDirectionalG.value = settings.mieDirectionalG;
	
	      var theta = Math.PI * (settings.inclination - 0.5);
	      var phi = 2 * Math.PI * (settings.azimuth - 0.5);
	
	      this._sunSphere.position.x = settings.distance * Math.cos(phi);
	      this._sunSphere.position.y = settings.distance * Math.sin(phi) * Math.sin(theta);
	      this._sunSphere.position.z = settings.distance * Math.sin(phi) * Math.cos(theta);
	
	      // Move directional light to sun position
	      this._light.position.copy(this._sunSphere.position);
	
	      this._sky.uniforms.sunPosition.value.copy(this._sunSphere.position);
	    }
	  }, {
	    key: '_update',
	    value: function _update(delta) {
	      if (this._updateSkybox) {
	        this._updateSkybox = false;
	      } else {
	        return;
	      }
	
	      // if (!this._angle) {
	      //   this._angle = 0;
	      // }
	      //
	      // // Animate inclination
	      // this._angle += Math.PI * delta;
	      // this._settings.inclination = 0.5 * (Math.sin(this._angle) / 2 + 0.5);
	
	      // Update light intensity depending on elevation of sun (day to night)
	      this._light.intensity = 1 - 0.95 * (this._settings.inclination / 0.5);
	
	      // // console.log(delta, this._angle, this._settings.inclination);
	      //
	      // TODO: Only do this when the uniforms have been changed
	      this._updateUniforms();
	
	      // TODO: Only do this when the cubemap has actually changed
	      this._cubeCamera.updateCubeMap(this._world._engine._renderer, this._skyScene);
	    }
	  }, {
	    key: 'getRenderTarget',
	    value: function getRenderTarget() {
	      return this._cubeCamera.renderTarget;
	    }
	  }, {
	    key: 'setInclination',
	    value: function setInclination(inclination) {
	      this._settings.inclination = inclination;
	      this._updateSkybox = true;
	    }
	
	    // Destroy the skybox and remove it from memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._world.off('preUpdate', this._throttledWorldUpdate);
	      this._throttledWorldUpdate = null;
	
	      this._world = null;
	      this._light = null;
	
	      this._cubeCamera = null;
	
	      this._sky.mesh.geometry.dispose();
	      this._sky.mesh.geometry = null;
	
	      if (this._sky.mesh.material.map) {
	        this._sky.mesh.material.map.dispose();
	        this._sky.mesh.material.map = null;
	      }
	
	      this._sky.mesh.material.dispose();
	      this._sky.mesh.material = null;
	
	      this._sky.mesh = null;
	      this._sky = null;
	
	      this._skyScene = null;
	
	      this._sunSphere.geometry.dispose();
	      this._sunSphere.geometry = null;
	
	      if (this._sunSphere.material.map) {
	        this._sunSphere.material.map.dispose();
	        this._sunSphere.material.map = null;
	      }
	
	      this._sunSphere.material.dispose();
	      this._sunSphere.material = null;
	
	      this._sunSphere = null;
	
	      this._mesh.geometry.dispose();
	      this._mesh.geometry = null;
	
	      if (this._mesh.material.map) {
	        this._mesh.material.map.dispose();
	        this._mesh.material.map = null;
	      }
	
	      this._mesh.material.dispose();
	      this._mesh.material = null;
	    }
	  }]);
	
	  return Skybox;
	})();
	
	exports['default'] = Skybox;
	
	var noNew = function noNew(world, light) {
	  return new Skybox(world, light);
	};
	
	// Initialise without requiring new keyword
	exports.skybox = noNew;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/*eslint eqeqeq:0*/
	
	/**
	 * @author zz85 / https://github.com/zz85
	 *
	 * Based on 'A Practical Analytic Model for Daylight'
	 * aka The Preetham Model, the de facto standard analytic skydome model
	 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
	 *
	 * First implemented by Simon Wallner
	 * http://www.simonwallner.at/projects/atmospheric-scattering
	 *
	 * Improved by Martin Upitis
	 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
	 *
	 * Three.js integration by zz85 http://twitter.com/blurspline
	*/
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	_three2['default'].ShaderLib['sky'] = {
	
		uniforms: {
	
			luminance: { type: 'f', value: 1 },
			turbidity: { type: 'f', value: 2 },
			reileigh: { type: 'f', value: 1 },
			mieCoefficient: { type: 'f', value: 0.005 },
			mieDirectionalG: { type: 'f', value: 0.8 },
			sunPosition: { type: 'v3', value: new _three2['default'].Vector3() }
	
		},
	
		vertexShader: ['varying vec3 vWorldPosition;', 'void main() {', 'vec4 worldPosition = modelMatrix * vec4( position, 1.0 );', 'vWorldPosition = worldPosition.xyz;', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
	
		fragmentShader: ['uniform sampler2D skySampler;', 'uniform vec3 sunPosition;', 'varying vec3 vWorldPosition;', 'vec3 cameraPos = vec3(0., 0., 0.);', '// uniform sampler2D sDiffuse;', '// const float turbidity = 10.0; //', '// const float reileigh = 2.; //', '// const float luminance = 1.0; //', '// const float mieCoefficient = 0.005;', '// const float mieDirectionalG = 0.8;', 'uniform float luminance;', 'uniform float turbidity;', 'uniform float reileigh;', 'uniform float mieCoefficient;', 'uniform float mieDirectionalG;', '// constants for atmospheric scattering', 'const float e = 2.71828182845904523536028747135266249775724709369995957;', 'const float pi = 3.141592653589793238462643383279502884197169;', 'const float n = 1.0003; // refractive index of air', 'const float N = 2.545E25; // number of molecules per unit volume for air at', '// 288.15K and 1013mb (sea level -45 celsius)', 'const float pn = 0.035;	// depolatization factor for standard air', '// wavelength of used primaries, according to preetham', 'const vec3 lambda = vec3(680E-9, 550E-9, 450E-9);', '// mie stuff', '// K coefficient for the primaries', 'const vec3 K = vec3(0.686, 0.678, 0.666);', 'const float v = 4.0;', '// optical length at zenith for molecules', 'const float rayleighZenithLength = 8.4E3;', 'const float mieZenithLength = 1.25E3;', 'const vec3 up = vec3(0.0, 1.0, 0.0);', 'const float EE = 1000.0;', 'const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;', '// 66 arc seconds -> degrees, and the cosine of that', '// earth shadow hack', 'const float cutoffAngle = pi/1.95;', 'const float steepness = 1.5;', 'vec3 totalRayleigh(vec3 lambda)', '{', 'return (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn));', '}',
	
		// see http://blenderartists.org/forum/showthread.php?321110-Shaders-and-Skybox-madness
		'// A simplied version of the total Reayleigh scattering to works on browsers that use ANGLE', 'vec3 simplifiedRayleigh()', '{', 'return 0.0005 / vec3(94, 40, 18);',
		// return 0.00054532832366 / (3.0 * 2.545E25 * pow(vec3(680E-9, 550E-9, 450E-9), vec3(4.0)) * 6.245);
		'}', 'float rayleighPhase(float cosTheta)', '{	 ', 'return (3.0 / (16.0*pi)) * (1.0 + pow(cosTheta, 2.0));', '//	return (1.0 / (3.0*pi)) * (1.0 + pow(cosTheta, 2.0));', '//	return (3.0 / 4.0) * (1.0 + pow(cosTheta, 2.0));', '}', 'vec3 totalMie(vec3 lambda, vec3 K, float T)', '{', 'float c = (0.2 * T ) * 10E-18;', 'return 0.434 * c * pi * pow((2.0 * pi) / lambda, vec3(v - 2.0)) * K;', '}', 'float hgPhase(float cosTheta, float g)', '{', 'return (1.0 / (4.0*pi)) * ((1.0 - pow(g, 2.0)) / pow(1.0 - 2.0*g*cosTheta + pow(g, 2.0), 1.5));', '}', 'float sunIntensity(float zenithAngleCos)', '{', 'return EE * max(0.0, 1.0 - exp(-((cutoffAngle - acos(zenithAngleCos))/steepness)));', '}', '// float logLuminance(vec3 c)', '// {', '// 	return log(c.r * 0.2126 + c.g * 0.7152 + c.b * 0.0722);', '// }', '// Filmic ToneMapping http://filmicgames.com/archives/75', 'float A = 0.15;', 'float B = 0.50;', 'float C = 0.10;', 'float D = 0.20;', 'float E = 0.02;', 'float F = 0.30;', 'float W = 1000.0;', 'vec3 Uncharted2Tonemap(vec3 x)', '{', 'return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;', '}', 'void main() ', '{', 'float sunfade = 1.0-clamp(1.0-exp((sunPosition.y/450000.0)),0.0,1.0);', '// luminance =  1.0 ;// vWorldPosition.y / 450000. + 0.5; //sunPosition.y / 450000. * 1. + 0.5;', '// gl_FragColor = vec4(sunfade, sunfade, sunfade, 1.0);', 'float reileighCoefficient = reileigh - (1.0* (1.0-sunfade));', 'vec3 sunDirection = normalize(sunPosition);', 'float sunE = sunIntensity(dot(sunDirection, up));', '// extinction (absorbtion + out scattering) ', '// rayleigh coefficients',
	
		// 'vec3 betaR = totalRayleigh(lambda) * reileighCoefficient;',
		'vec3 betaR = simplifiedRayleigh() * reileighCoefficient;', '// mie coefficients', 'vec3 betaM = totalMie(lambda, K, turbidity) * mieCoefficient;', '// optical length', '// cutoff angle at 90 to avoid singularity in next formula.', 'float zenithAngle = acos(max(0.0, dot(up, normalize(vWorldPosition - cameraPos))));', 'float sR = rayleighZenithLength / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253));', 'float sM = mieZenithLength / (cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253));', '// combined extinction factor	', 'vec3 Fex = exp(-(betaR * sR + betaM * sM));', '// in scattering', 'float cosTheta = dot(normalize(vWorldPosition - cameraPos), sunDirection);', 'float rPhase = rayleighPhase(cosTheta*0.5+0.5);', 'vec3 betaRTheta = betaR * rPhase;', 'float mPhase = hgPhase(cosTheta, mieDirectionalG);', 'vec3 betaMTheta = betaM * mPhase;', 'vec3 Lin = pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * (1.0 - Fex),vec3(1.5));', 'Lin *= mix(vec3(1.0),pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * Fex,vec3(1.0/2.0)),clamp(pow(1.0-dot(up, sunDirection),5.0),0.0,1.0));', '//nightsky', 'vec3 direction = normalize(vWorldPosition - cameraPos);', 'float theta = acos(direction.y); // elevation --> y-axis, [-pi/2, pi/2]', 'float phi = atan(direction.z, direction.x); // azimuth --> x-axis [-pi/2, pi/2]', 'vec2 uv = vec2(phi, theta) / vec2(2.0*pi, pi) + vec2(0.5, 0.0);', '// vec3 L0 = texture2D(skySampler, uv).rgb+0.1 * Fex;', 'vec3 L0 = vec3(0.1) * Fex;', '// composition + solar disc', '//if (cosTheta > sunAngularDiameterCos)', 'float sundisk = smoothstep(sunAngularDiameterCos,sunAngularDiameterCos+0.00002,cosTheta);', '// if (normalize(vWorldPosition - cameraPos).y>0.0)', 'L0 += (sunE * 19000.0 * Fex)*sundisk;', 'vec3 whiteScale = 1.0/Uncharted2Tonemap(vec3(W));', 'vec3 texColor = (Lin+L0);   ', 'texColor *= 0.04 ;', 'texColor += vec3(0.0,0.001,0.0025)*0.3;', 'float g_fMaxLuminance = 1.0;', 'float fLumScaled = 0.1 / luminance;     ', 'float fLumCompressed = (fLumScaled * (1.0 + (fLumScaled / (g_fMaxLuminance * g_fMaxLuminance)))) / (1.0 + fLumScaled); ', 'float ExposureBias = fLumCompressed;', 'vec3 curr = Uncharted2Tonemap((log2(2.0/pow(luminance,4.0)))*texColor);', 'vec3 color = curr*whiteScale;', 'vec3 retColor = pow(color,vec3(1.0/(1.2+(1.2*sunfade))));', 'gl_FragColor.rgb = retColor;', 'gl_FragColor.a = 1.0;', '}'].join('\n')
	
	};
	
	var Sky = function Sky() {
	
		var skyShader = _three2['default'].ShaderLib['sky'];
		var skyUniforms = _three2['default'].UniformsUtils.clone(skyShader.uniforms);
	
		var skyMat = new _three2['default'].ShaderMaterial({
			fragmentShader: skyShader.fragmentShader,
			vertexShader: skyShader.vertexShader,
			uniforms: skyUniforms,
			side: _three2['default'].BackSide
		});
	
		var skyGeo = new _three2['default'].SphereBufferGeometry(450000, 32, 15);
		var skyMesh = new _three2['default'].Mesh(skyGeo, skyMat);
	
		// Expose variables
		this.mesh = skyMesh;
		this.uniforms = skyUniforms;
	};
	
	exports['default'] = Sky;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _WorkerPool = __webpack_require__(47);
	
	var _WorkerPool2 = _interopRequireDefault(_WorkerPool);
	
	var Worker = (function () {
	  var _maxWorkers = 2;
	  var pool;
	
	  var createWorkers = function createWorkers(maxWorkers, workerScript) {
	    pool = new _WorkerPool2['default']({
	      numThreads: maxWorkers ? maxWorkers : _maxWorkers,
	      workerScript: workerScript ? workerScript : 'vizicities-worker.js'
	    });
	
	    return pool.createWorkers();
	  };
	
	  var exec = function exec(method, args, transferrables) {
	    return pool.exec(method, args, transferrables);
	  };
	
	  return {
	    createWorkers: createWorkers,
	    exec: exec
	  };
	})();
	
	exports['default'] = Worker;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _WorkerPoolWorker = __webpack_require__(48);
	
	var _WorkerPoolWorker2 = _interopRequireDefault(_WorkerPoolWorker);
	
	var DEBUG = false;
	
	var WorkerPool = (function () {
	  function WorkerPool(options) {
	    _classCallCheck(this, WorkerPool);
	
	    this.numThreads = options.numThreads || 2;
	    this.workerScript = options.workerScript;
	
	    this.workers = [];
	    this.tasks = [];
	  }
	
	  _createClass(WorkerPool, [{
	    key: 'createWorkers',
	    value: function createWorkers() {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        var workerPromises = [];
	
	        for (var i = 0; i < _this.numThreads; i++) {
	          workerPromises.push(_this.createWorker());
	        }
	
	        Promise.all(workerPromises).then(function () {
	          if (DEBUG) {
	            console.log('All workers ready', performance.now());
	          }
	          resolve();
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: 'createWorker',
	    value: function createWorker() {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        // Initialise worker
	        var worker = new _WorkerPoolWorker2['default']({
	          workerScript: _this2.workerScript
	        });
	
	        // Start worker and wait for it to be ready
	        return worker.start().then(function () {
	          if (DEBUG) {
	            console.log('Worker ready', performance.now());
	          }
	
	          // Add worker to pool
	          _this2.workers.push(worker);
	
	          resolve();
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: 'getFreeWorker',
	    value: function getFreeWorker() {
	      return this.workers.find(function (worker) {
	        return !worker.busy;
	      });
	    }
	
	    // Execute task on a worker
	  }, {
	    key: 'exec',
	    value: function exec(method, args, transferrables) {
	      var deferred = Promise.deferred();
	
	      // Create task
	      var task = {
	        method: method,
	        args: args,
	        transferrables: transferrables,
	        deferred: deferred
	      };
	
	      // Add task to queue
	      this.tasks.push(task);
	
	      // Trigger task processing
	      this.processTasks();
	
	      // Return task promise
	      return task.deferred.promise;
	    }
	  }, {
	    key: 'processTasks',
	    value: function processTasks() {
	      var _this3 = this;
	
	      if (DEBUG) {
	        console.log('Processing tasks');
	      }
	
	      if (this.tasks.length === 0) {
	        return;
	      }
	
	      // Find free worker
	      var worker = this.getFreeWorker();
	
	      if (!worker) {
	        if (DEBUG) {
	          console.log('No workers free');
	        }
	        return;
	      }
	
	      // Get oldest task
	      var task = this.tasks.shift();
	
	      // Execute task on worker
	      worker.exec(task.method, task.args, task.transferrables).then(function (result) {
	        // Trigger task processing
	        _this3.processTasks();
	
	        // Return result in deferred task promise
	        task.deferred.resolve(result);
	      });
	    }
	  }]);
	
	  return WorkerPool;
	})();
	
	exports['default'] = WorkerPool;
	
	// Quick shim to create deferred native promises
	Promise.deferred = function () {
	  var result = {};
	
	  result.promise = new Promise(function (resolve, reject) {
	    result.resolve = resolve;
	    result.reject = reject;
	  });
	
	  return result;
	};
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var DEBUG = false;
	
	var WorkerPoolWorker = (function () {
	  function WorkerPoolWorker(options) {
	    _classCallCheck(this, WorkerPoolWorker);
	
	    this.workerScript = options.workerScript;
	
	    this.ready = false;
	    this.busy = false;
	    this.deferred = null;
	  }
	
	  _createClass(WorkerPoolWorker, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this.worker = new Worker(_this.workerScript);
	
	        var onStartup = function onStartup(event) {
	          if (!event.data || event.data.type !== 'startup') {
	            reject();
	            return;
	          }
	
	          _this.ready = true;
	
	          // Remove temporary message handler
	          _this.worker.removeEventListener('message', onStartup);
	
	          // Set up listener to respond to normal events now
	          _this.worker.addEventListener('message', function (event) {
	            _this.onMessage(event);
	          });
	
	          // Resolve once worker is ready
	          resolve();
	        };
	
	        // Set up temporary event listener for warmup
	        _this.worker.addEventListener('message', onStartup);
	      });
	    }
	  }, {
	    key: 'exec',
	    value: function exec(method, args, transferrables) {
	      if (DEBUG) {
	        console.log('Execute', method, args, transferrables);
	      }
	
	      var deferred = Promise.deferred();
	
	      this.busy = true;
	      this.deferred = deferred;
	
	      this.worker.postMessage({
	        method: method,
	        args: args
	      }, transferrables);
	
	      return deferred.promise;
	    }
	  }, {
	    key: 'onMessage',
	    value: function onMessage(event) {
	      console.log('Message received from worker', performance.now());
	
	      this.busy = false;
	
	      if (!event.data || event.data.type === 'error' || event.data.type !== 'result') {
	        this.deferred.reject(event.data.payload);
	        return;
	      }
	
	      this.deferred.resolve(event.data.payload);
	    }
	  }]);
	
	  return WorkerPoolWorker;
	})();
	
	exports['default'] = WorkerPoolWorker;
	
	// Quick shim to create deferred native promises
	Promise.deferred = function () {
	  var result = {};
	
	  result.promise = new Promise(function (resolve, reject) {
	    result.resolve = resolve;
	    result.reject = reject;
	  });
	
	  return result;
	};
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _ControlsOrbit = __webpack_require__(50);
	
	var _ControlsOrbit2 = _interopRequireDefault(_ControlsOrbit);
	
	var Controls = {
	  Orbit: _ControlsOrbit2['default'],
	  orbit: _ControlsOrbit.orbit, orbit: _ControlsOrbit.orbit
	};
	
	exports['default'] = Controls;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _eventemitter3 = __webpack_require__(2);
	
	var _eventemitter32 = _interopRequireDefault(_eventemitter3);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _vendorOrbitControls = __webpack_require__(51);
	
	var _vendorOrbitControls2 = _interopRequireDefault(_vendorOrbitControls);
	
	var _TweenLite = __webpack_require__(53);
	
	var _TweenLite2 = _interopRequireDefault(_TweenLite);
	
	var Orbit = (function (_EventEmitter) {
	  _inherits(Orbit, _EventEmitter);
	
	  function Orbit() {
	    _classCallCheck(this, Orbit);
	
	    _get(Object.getPrototypeOf(Orbit.prototype), 'constructor', this).call(this);
	
	    // Prevent animation from pausing when tab is inactive
	    _TweenLite2['default'].lagSmoothing(0);
	  }
	
	  // Proxy control events
	  //
	  // There's currently no distinction between pan, orbit and zoom events
	
	  _createClass(Orbit, [{
	    key: '_initEvents',
	    value: function _initEvents() {
	      var _this = this;
	
	      this._controls.addEventListener('start', function (event) {
	        _this._world.emit('controlsMoveStart', event.target.target);
	      });
	
	      this._controls.addEventListener('change', function (event) {
	        _this._world.emit('controlsMove', event.target.target);
	      });
	
	      this._controls.addEventListener('end', function (event) {
	        _this._world.emit('controlsMoveEnd', event.target.target);
	      });
	    }
	
	    // Moving the camera along the [x,y,z] axis based on a target position
	  }, {
	    key: 'panTo',
	    value: function panTo(point, animate) {}
	  }, {
	    key: 'panBy',
	    value: function panBy(pointDelta, animate) {}
	
	    // Zooming the camera in and out
	  }, {
	    key: 'zoomTo',
	    value: function zoomTo(metres, animate) {}
	  }, {
	    key: 'zoomBy',
	    value: function zoomBy(metresDelta, animate) {}
	
	    // Force camera to look at something other than the target
	  }, {
	    key: 'lookAt',
	    value: function lookAt(point, animate) {}
	
	    // Make camera look at the target
	  }, {
	    key: 'lookAtTarget',
	    value: function lookAtTarget() {}
	
	    // Tilt (up and down)
	  }, {
	    key: 'tiltTo',
	    value: function tiltTo(angle, animate) {}
	  }, {
	    key: 'tiltBy',
	    value: function tiltBy(angleDelta, animate) {}
	
	    // Rotate (left and right)
	  }, {
	    key: 'rotateTo',
	    value: function rotateTo(angle, animate) {}
	  }, {
	    key: 'rotateBy',
	    value: function rotateBy(angleDelta, animate) {}
	
	    // Fly to the given point, animating pan and tilt/rotation to final position
	    // with nice zoom out and in
	    //
	    // TODO: Calling flyTo a second time before the previous animation has
	    // completed should immediately start the new animation from wherever the
	    // previous one has got to
	    //
	    // TODO: Long-distance pans should prevent the quadtree grid from trying to
	    // update by not firing the control update events every frame until the
	    // pan velocity calms down a bit
	    //
	    // TODO: Long-distance plans should zoom out further
	    //
	    // TODO: Return a promise?
	  }, {
	    key: 'flyToPoint',
	    value: function flyToPoint(point, duration, zoom) {
	      // Animation time in seconds
	      var animationTime = duration || 2;
	
	      this._flyTarget = new _three2['default'].Vector3(point.x, 0, point.y);
	
	      // Calculate delta from current position to fly target
	      var diff = new _three2['default'].Vector3().subVectors(this._controls.target, this._flyTarget);
	
	      this._flyTween = new _TweenLite2['default']({
	        x: 0,
	        z: 0,
	        // zoom: 0,
	        prev: {
	          x: 0,
	          z: 0
	        }
	      }, animationTime, {
	        x: diff.x,
	        z: diff.z,
	        // zoom: 1,
	        onUpdate: function onUpdate(tween) {
	          var controls = this._controls;
	
	          // Work out difference since last frame
	          var deltaX = tween.target.x - tween.target.prev.x;
	          var deltaZ = tween.target.z - tween.target.prev.z;
	
	          // Move some fraction toward the target point
	          controls.panLeft(deltaX, controls.object.matrix);
	          controls.panUp(deltaZ, controls.object.matrix);
	
	          tween.target.prev.x = tween.target.x;
	          tween.target.prev.z = tween.target.z;
	
	          // console.log(Math.sin((tween.target.zoom - 0.5) * Math.PI));
	
	          // TODO: Get zoom to dolly in and out on pan
	          // controls.object.zoom -= Math.sin((tween.target.zoom - 0.5) * Math.PI);
	          // controls.object.updateProjectionMatrix();
	        },
	        onComplete: function onComplete(tween) {
	          // console.log(`Arrived at flyTarget`);
	          this._flyTarget = null;
	        },
	        onUpdateParams: ['{self}'],
	        onCompleteParams: ['{self}'],
	        callbackScope: this,
	        ease: Power1.easeInOut
	      });
	
	      if (!zoom) {
	        return;
	      }
	
	      var zoomTime = animationTime / 2;
	
	      this._zoomTweenIn = new _TweenLite2['default']({
	        zoom: 0
	      }, zoomTime, {
	        zoom: 1,
	        onUpdate: function onUpdate(tween) {
	          var controls = this._controls;
	          controls.dollyIn(1 - 0.01 * tween.target.zoom);
	        },
	        onComplete: function onComplete(tween) {},
	        onUpdateParams: ['{self}'],
	        onCompleteParams: ['{self}'],
	        callbackScope: this,
	        ease: Power1.easeInOut
	      });
	
	      this._zoomTweenOut = new _TweenLite2['default']({
	        zoom: 0
	      }, zoomTime, {
	        zoom: 1,
	        delay: zoomTime,
	        onUpdate: function onUpdate(tween) {
	          var controls = this._controls;
	          controls.dollyOut(0.99 + 0.01 * tween.target.zoom);
	        },
	        onComplete: function onComplete(tween) {},
	        onUpdateParams: ['{self}'],
	        onCompleteParams: ['{self}'],
	        callbackScope: this,
	        ease: Power1.easeInOut
	      });
	    }
	
	    // TODO: Return a promise?
	  }, {
	    key: 'flyToLatLon',
	    value: function flyToLatLon(latlon, duration, noZoom) {
	      var point = this._world.latLonToPoint(latlon);
	      this.flyToPoint(point, duration, noZoom);
	    }
	
	    // TODO: Make this animate over a user-defined period of time
	    //
	    // Perhaps use TweenMax for now and implement as a more lightweight solution
	    // later on once it all works
	    // _animateFlyTo(delta) {
	    //   var controls = this._controls;
	    //
	    //   // this._controls.panLeft(50, controls._controls.object.matrix);
	    //   // this._controls.panUp(50, controls._controls.object.matrix);
	    //   // this._controls.dollyIn(this._controls.getZoomScale());
	    //   // this._controls.dollyOut(this._controls.getZoomScale());
	    //
	    //   // Calculate delta from current position to fly target
	    //   var diff = new THREE.Vector3().subVectors(this._controls.target, this._flyTarget);
	    //
	    //   // 1000 units per second
	    //   var speed = 1000 * (delta / 1000);
	    //
	    //   // Remove fly target after arrival and snap to target
	    //   if (diff.length() < 0.01) {
	    //     console.log(`Arrived at flyTarget`);
	    //     this._flyTarget = null;
	    //     speed = 1;
	    //   }
	    //
	    //   // Move some fraction toward the target point
	    //   controls.panLeft(diff.x * speed, controls.object.matrix);
	    //   controls.panUp(diff.z * speed, controls.object.matrix);
	    // }
	
	    // Proxy to OrbitControls.update()
	  }, {
	    key: 'update',
	    value: function update(delta) {
	      this._controls.update(delta);
	    }
	
	    // Add controls to world instance and store world reference
	  }, {
	    key: 'addTo',
	    value: function addTo(world) {
	      return world.addControls(this);
	    }
	
	    // Internal method called by World.addControls to actually add the controls
	  }, {
	    key: '_addToWorld',
	    value: function _addToWorld(world) {
	      this._world = world;
	
	      // TODO: Override panLeft and panUp methods to prevent panning on Y axis
	      // See: http://stackoverflow.com/a/26188674/997339
	      this._controls = new _vendorOrbitControls2['default'](world._engine._camera, world._container);
	
	      // Disable keys for now as no events are fired for them anyway
	      this._controls.keys = false;
	
	      // 89 degrees
	      this._controls.maxPolarAngle = 1.5533;
	
	      // this._controls.enableDamping = true;
	      // this._controls.dampingFactor = 0.25;
	
	      this._initEvents();
	
	      // TODO: Remove now that this is a promise?
	      this.emit('added');
	
	      return Promise.resolve(this);
	    }
	
	    // Destroys the controls and removes them from memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // TODO: Remove event listeners
	
	      this._controls.dispose();
	
	      this._world = null;
	      this._controls = null;
	    }
	  }]);
	
	  return Orbit;
	})(_eventemitter32['default']);
	
	exports['default'] = Orbit;
	
	var noNew = function noNew() {
	  return new Orbit();
	};
	
	// Initialise without requiring new keyword
	exports.orbit = noNew;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _hammerjs = __webpack_require__(52);
	
	var _hammerjs2 = _interopRequireDefault(_hammerjs);
	
	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	
	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finter swipe
	
	var OrbitControls = function OrbitControls(object, domElement) {
	
		this.object = object;
	
		this.domElement = domElement !== undefined ? domElement : document;
	
		// Set to false to disable this control
		this.enabled = true;
	
		// "target" sets the location of focus, where the object orbits around
		this.target = new _three2['default'].Vector3();
	
		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;
	
		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;
	
		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians
	
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = -Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians
	
		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;
	
		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;
	
		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;
	
		// Set to false to disable panning
		this.enablePan = true;
		this.keyPanSpeed = 7.0; // pixels moved per arrow key push
	
		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
	
		// Set to false to disable use of the keys
		this.enableKeys = true;
	
		// The four arrow keys
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
		// Mouse buttons
		this.mouseButtons = { ORBIT: _three2['default'].MOUSE.LEFT, ZOOM: _three2['default'].MOUSE.MIDDLE, PAN: _three2['default'].MOUSE.RIGHT };
	
		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;
	
		//
		// public methods
		//
	
		this.getPolarAngle = function () {
	
			return phi;
		};
	
		this.getAzimuthalAngle = function () {
	
			return theta;
		};
	
		this.reset = function () {
	
			scope.target.copy(scope.target0);
			scope.object.position.copy(scope.position0);
			scope.object.zoom = scope.zoom0;
	
			scope.object.updateProjectionMatrix();
			scope.dispatchEvent(changeEvent);
	
			scope.update();
	
			state = STATE.NONE;
		};
	
		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = (function () {
	
			var offset = new _three2['default'].Vector3();
	
			// so camera.up is the orbit axis
			var quat = new _three2['default'].Quaternion().setFromUnitVectors(object.up, new _three2['default'].Vector3(0, 1, 0));
			var quatInverse = quat.clone().inverse();
	
			var lastPosition = new _three2['default'].Vector3();
			var lastQuaternion = new _three2['default'].Quaternion();
	
			return function () {
	
				var position = scope.object.position;
	
				offset.copy(position).sub(scope.target);
	
				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion(quat);
	
				// angle from z-axis around y-axis
	
				theta = Math.atan2(offset.x, offset.z);
	
				// angle from y-axis
	
				phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);
	
				if (scope.autoRotate && state === STATE.NONE) {
	
					rotateLeft(getAutoRotationAngle());
				}
	
				theta += thetaDelta;
				phi += phiDelta;
	
				// restrict theta to be between desired limits
				theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, theta));
	
				// restrict phi to be between desired limits
				phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, phi));
	
				// restrict phi to be betwee EPS and PI-EPS
				phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));
	
				var radius = offset.length() * scale;
	
				// restrict radius to be between desired limits
				radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, radius));
	
				// move target to panned location
				scope.target.add(panOffset);
	
				offset.x = radius * Math.sin(phi) * Math.sin(theta);
				offset.y = radius * Math.cos(phi);
				offset.z = radius * Math.sin(phi) * Math.cos(theta);
	
				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion(quatInverse);
	
				position.copy(scope.target).add(offset);
	
				scope.object.lookAt(scope.target);
	
				if (scope.enableDamping === true) {
	
					thetaDelta *= 1 - scope.dampingFactor;
					phiDelta *= 1 - scope.dampingFactor;
				} else {
	
					thetaDelta = 0;
					phiDelta = 0;
				}
	
				scale = 1;
				panOffset.set(0, 0, 0);
	
				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8
	
				if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
	
					scope.dispatchEvent(changeEvent);
	
					lastPosition.copy(scope.object.position);
					lastQuaternion.copy(scope.object.quaternion);
					zoomChanged = false;
	
					return true;
				}
	
				return false;
			};
		})();
	
		this.dispose = function () {
	
			scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
			scope.domElement.removeEventListener('mousedown', onMouseDown, false);
			scope.domElement.removeEventListener('mousewheel', onMouseWheel, false);
			scope.domElement.removeEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox
	
			scope.domElement.removeEventListener('touchstart', onTouchStart, false);
			scope.domElement.removeEventListener('touchend', onTouchEnd, false);
			scope.domElement.removeEventListener('touchmove', onTouchMove, false);
	
			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);
			document.removeEventListener('mouseout', onMouseUp, false);
	
			window.removeEventListener('keydown', onKeyDown, false);
	
			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
		};
	
		//
		// internals
		//
	
		var scope = this;
	
		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };
	
		var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };
	
		var state = STATE.NONE;
	
		var EPS = 0.000001;
	
		// current position in spherical coordinates
		var theta;
		var phi;
	
		var phiDelta = 0;
		var thetaDelta = 0;
		var scale = 1;
		var panOffset = new _three2['default'].Vector3();
		var zoomChanged = false;
	
		var rotateStart = new _three2['default'].Vector2();
		var rotateEnd = new _three2['default'].Vector2();
		var rotateDelta = new _three2['default'].Vector2();
	
		var panStart = new _three2['default'].Vector2();
		var panEnd = new _three2['default'].Vector2();
		var panDelta = new _three2['default'].Vector2();
	
		var dollyStart = new _three2['default'].Vector2();
		var dollyEnd = new _three2['default'].Vector2();
		var dollyDelta = new _three2['default'].Vector2();
	
		function getAutoRotationAngle() {
	
			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
		}
	
		function getZoomScale() {
	
			return Math.pow(0.95, scope.zoomSpeed);
		}
	
		function rotateLeft(angle) {
	
			thetaDelta -= angle;
		}
	
		function rotateUp(angle) {
	
			phiDelta -= angle;
		}
	
		var panLeft = (function () {
	
			var v = new _three2['default'].Vector3();
	
			// return function panLeft( distance, objectMatrix ) {
			//
			// 	var te = objectMatrix.elements;
			//
			// 	// get X column of objectMatrix
			// 	v.set( te[ 0 ], te[ 1 ], te[ 2 ] );
			//
			// 	v.multiplyScalar( - distance );
			//
			// 	panOffset.add( v );
			//
			// };
	
			// Fixed panning to x/y plane
			return function panLeft(distance, objectMatrix) {
				var te = objectMatrix.elements;
				// var adjDist = distance / Math.cos(phi);
	
				v.set(te[0], 0, te[2]);
				v.multiplyScalar(-distance);
	
				panOffset.add(v);
			};
		})();
	
		// Fixed panning to x/y plane
		var panUp = (function () {
	
			var v = new _three2['default'].Vector3();
	
			// return function panUp( distance, objectMatrix ) {
			//
			// 	var te = objectMatrix.elements;
			//
			// 	// get Y column of objectMatrix
			// 	v.set( te[ 4 ], te[ 5 ], te[ 6 ] );
			//
			// 	v.multiplyScalar( distance );
			//
			// 	panOffset.add( v );
			//
			// };
	
			return function panUp(distance, objectMatrix) {
				var te = objectMatrix.elements;
				var adjDist = distance / Math.cos(phi);
	
				v.set(te[4], 0, te[6]);
				v.multiplyScalar(adjDist);
	
				panOffset.add(v);
			};
		})();
	
		// deltaX and deltaY are in pixels; right and down are positive
		var pan = (function () {
	
			var offset = new _three2['default'].Vector3();
	
			return function (deltaX, deltaY) {
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				if (scope.object instanceof _three2['default'].PerspectiveCamera) {
	
					// perspective
					var position = scope.object.position;
					offset.copy(position).sub(scope.target);
					var targetDistance = offset.length();
	
					// half of the fov is center to top of screen
					targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);
	
					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
					panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
				} else if (scope.object instanceof _three2['default'].OrthographicCamera) {
	
					// orthographic
					panLeft(deltaX * (scope.object.right - scope.object.left) / element.clientWidth, scope.object.matrix);
					panUp(deltaY * (scope.object.top - scope.object.bottom) / element.clientHeight, scope.object.matrix);
				} else {
	
					// camera neither orthographic nor perspective
					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
					scope.enablePan = false;
				}
			};
		})();
	
		function dollyIn(dollyScale) {
	
			if (scope.object instanceof _three2['default'].PerspectiveCamera) {
	
				scale /= dollyScale;
			} else if (scope.object instanceof _three2['default'].OrthographicCamera) {
	
				scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
			} else {
	
				console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
				scope.enableZoom = false;
			}
		}
	
		function dollyOut(dollyScale) {
	
			if (scope.object instanceof _three2['default'].PerspectiveCamera) {
	
				scale *= dollyScale;
			} else if (scope.object instanceof _three2['default'].OrthographicCamera) {
	
				scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
			} else {
	
				console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
				scope.enableZoom = false;
			}
		}
	
		//
		// event callbacks - update the object state
		//
	
		function handleMouseDownRotate(event) {
	
			//console.log( 'handleMouseDownRotate' );
	
			rotateStart.set(event.clientX, event.clientY);
		}
	
		function handleMouseDownDolly(event) {
	
			//console.log( 'handleMouseDownDolly' );
	
			dollyStart.set(event.clientX, event.clientY);
		}
	
		function handleMouseDownPan(event) {
	
			//console.log( 'handleMouseDownPan' );
	
			panStart.set(event.clientX, event.clientY);
		}
	
		function handleMouseMoveRotate(event) {
	
			//console.log( 'handleMouseMoveRotate' );
	
			rotateEnd.set(event.clientX, event.clientY);
			rotateDelta.subVectors(rotateEnd, rotateStart);
	
			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
			// rotating across whole screen goes 360 degrees around
			rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
	
			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
	
			rotateStart.copy(rotateEnd);
	
			scope.update();
		}
	
		function handleMouseMoveDolly(event) {
	
			//console.log( 'handleMouseMoveDolly' );
	
			dollyEnd.set(event.clientX, event.clientY);
	
			dollyDelta.subVectors(dollyEnd, dollyStart);
	
			if (dollyDelta.y > 0) {
	
				dollyIn(getZoomScale());
			} else if (dollyDelta.y < 0) {
	
				dollyOut(getZoomScale());
			}
	
			dollyStart.copy(dollyEnd);
	
			scope.update();
		}
	
		function handleMouseMovePan(event) {
	
			//console.log( 'handleMouseMovePan' );
	
			panEnd.set(event.clientX, event.clientY);
	
			panDelta.subVectors(panEnd, panStart);
	
			pan(panDelta.x, panDelta.y);
	
			panStart.copy(panEnd);
	
			scope.update();
		}
	
		function handleMouseUp(event) {
	
			//console.log( 'handleMouseUp' );
	
		}
	
		function handleMouseWheel(event) {
	
			//console.log( 'handleMouseWheel' );
	
			var delta = 0;
	
			if (event.wheelDelta !== undefined) {
	
				// WebKit / Opera / Explorer 9
	
				delta = event.wheelDelta;
			} else if (event.detail !== undefined) {
	
				// Firefox
	
				delta = -event.detail;
			}
	
			if (delta > 0) {
	
				dollyOut(getZoomScale());
			} else if (delta < 0) {
	
				dollyIn(getZoomScale());
			}
	
			scope.update();
		}
	
		function handleKeyDown(event) {
	
			//console.log( 'handleKeyDown' );
	
			switch (event.keyCode) {
	
				case scope.keys.UP:
					pan(0, scope.keyPanSpeed);
					scope.update();
					break;
	
				case scope.keys.BOTTOM:
					pan(0, -scope.keyPanSpeed);
					scope.update();
					break;
	
				case scope.keys.LEFT:
					pan(scope.keyPanSpeed, 0);
					scope.update();
					break;
	
				case scope.keys.RIGHT:
					pan(-scope.keyPanSpeed, 0);
					scope.update();
					break;
	
			}
		}
	
		function handleTouchStartRotate(event) {
	
			//console.log( 'handleTouchStartRotate' );
	
			rotateStart.set(event.pointers[0].pageX, event.pointers[0].pageY);
		}
	
		function handleTouchStartDolly(event) {
	
			//console.log( 'handleTouchStartDolly' );
	
			var dx = event.pointers[0].pageX - event.pointers[1].pageX;
			var dy = event.pointers[0].pageY - event.pointers[1].pageY;
	
			var distance = Math.sqrt(dx * dx + dy * dy);
	
			dollyStart.set(0, distance);
		}
	
		function handleTouchStartPan(event) {
	
			//console.log( 'handleTouchStartPan' );
	
			panStart.set(event.deltaX, event.deltaY);
		}
	
		function handleTouchMoveRotate(event) {
	
			//console.log( 'handleTouchMoveRotate' );
	
			rotateEnd.set(event.pointers[0].pageX, event.pointers[0].pageY);
			rotateDelta.subVectors(rotateEnd, rotateStart);
	
			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
			// rotating across whole screen goes 360 degrees around
			rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);
	
			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);
	
			rotateStart.copy(rotateEnd);
	
			scope.update();
		}
	
		function handleTouchMoveDolly(event) {
	
			//console.log( 'handleTouchMoveDolly' );
	
			var dx = event.pointers[0].pageX - event.pointers[1].pageX;
			var dy = event.pointers[0].pageY - event.pointers[1].pageY;
	
			var distance = Math.sqrt(dx * dx + dy * dy);
	
			dollyEnd.set(0, distance);
	
			dollyDelta.subVectors(dollyEnd, dollyStart);
	
			if (dollyDelta.y > 0) {
	
				dollyOut(getZoomScale());
			} else if (dollyDelta.y < 0) {
	
				dollyIn(getZoomScale());
			}
	
			dollyStart.copy(dollyEnd);
	
			scope.update();
		}
	
		function handleTouchMovePan(event) {
	
			//console.log( 'handleTouchMovePan' );
	
			panEnd.set(event.deltaX, event.deltaY);
	
			panDelta.subVectors(panEnd, panStart);
	
			pan(panDelta.x, panDelta.y);
	
			panStart.copy(panEnd);
	
			scope.update();
		}
	
		function handleTouchEnd(event) {}
	
		//console.log( 'handleTouchEnd' );
	
		//
		// event handlers - FSM: listen for events and reset state
		//
	
		function onMouseDown(event) {
	
			if (scope.enabled === false) return;
	
			event.preventDefault();
	
			if (event.button === scope.mouseButtons.ORBIT) {
	
				if (scope.enableRotate === false) return;
	
				handleMouseDownRotate(event);
	
				state = STATE.ROTATE;
			} else if (event.button === scope.mouseButtons.ZOOM) {
	
				if (scope.enableZoom === false) return;
	
				handleMouseDownDolly(event);
	
				state = STATE.DOLLY;
			} else if (event.button === scope.mouseButtons.PAN) {
	
				if (scope.enablePan === false) return;
	
				handleMouseDownPan(event);
	
				state = STATE.PAN;
			}
	
			if (state !== STATE.NONE) {
	
				document.addEventListener('mousemove', onMouseMove, false);
				document.addEventListener('mouseup', onMouseUp, false);
				document.addEventListener('mouseout', onMouseUp, false);
	
				scope.dispatchEvent(startEvent);
			}
		}
	
		function onMouseMove(event) {
	
			if (scope.enabled === false) return;
	
			event.preventDefault();
	
			if (state === STATE.ROTATE) {
	
				if (scope.enableRotate === false) return;
	
				handleMouseMoveRotate(event);
			} else if (state === STATE.DOLLY) {
	
				if (scope.enableZoom === false) return;
	
				handleMouseMoveDolly(event);
			} else if (state === STATE.PAN) {
	
				if (scope.enablePan === false) return;
	
				handleMouseMovePan(event);
			}
		}
	
		function onMouseUp(event) {
	
			if (scope.enabled === false) return;
	
			handleMouseUp(event);
	
			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);
			document.removeEventListener('mouseout', onMouseUp, false);
	
			scope.dispatchEvent(endEvent);
	
			state = STATE.NONE;
		}
	
		function onMouseWheel(event) {
	
			if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE) return;
	
			event.preventDefault();
			event.stopPropagation();
	
			handleMouseWheel(event);
	
			scope.dispatchEvent(startEvent); // not sure why these are here...
			scope.dispatchEvent(endEvent);
		}
	
		function onKeyDown(event) {
	
			if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
	
			handleKeyDown(event);
		}
	
		function onTouchStart(event) {
	
			if (scope.enabled === false) return;
	
			switch (event.touches.length) {
	
				case 1:
					// one-fingered touch: rotate
	
					if (scope.enableRotate === false) return;
	
					handleTouchStartRotate(event);
	
					state = STATE.TOUCH_ROTATE;
	
					break;
	
				case 2:
					// two-fingered touch: dolly
	
					if (scope.enableZoom === false) return;
	
					handleTouchStartDolly(event);
	
					state = STATE.TOUCH_DOLLY;
	
					break;
	
				case 3:
					// three-fingered touch: pan
	
					if (scope.enablePan === false) return;
	
					handleTouchStartPan(event);
	
					state = STATE.TOUCH_PAN;
	
					break;
	
				default:
	
					state = STATE.NONE;
	
			}
	
			if (state !== STATE.NONE) {
	
				scope.dispatchEvent(startEvent);
			}
		}
	
		function onTouchMove(event) {
	
			if (scope.enabled === false) return;
	
			event.preventDefault();
			event.stopPropagation();
	
			switch (event.touches.length) {
	
				case 1:
					// one-fingered touch: rotate
	
					if (scope.enableRotate === false) return;
					if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...
	
					handleTouchMoveRotate(event);
	
					break;
	
				case 2:
					// two-fingered touch: dolly
	
					if (scope.enableZoom === false) return;
					if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...
	
					handleTouchMoveDolly(event);
	
					break;
	
				case 3:
					// three-fingered touch: pan
	
					if (scope.enablePan === false) return;
					if (state !== STATE.TOUCH_PAN) return; // is this needed?...
	
					handleTouchMovePan(event);
	
					break;
	
				default:
	
					state = STATE.NONE;
	
			}
		}
	
		function onTouchEnd(event) {
	
			if (scope.enabled === false) return;
	
			handleTouchEnd(event);
	
			scope.dispatchEvent(endEvent);
	
			state = STATE.NONE;
		}
	
		function onContextMenu(event) {
	
			event.preventDefault();
		}
	
		//
	
		scope.domElement.addEventListener('contextmenu', onContextMenu, false);
	
		scope.domElement.addEventListener('mousedown', onMouseDown, false);
		scope.domElement.addEventListener('mousewheel', onMouseWheel, false);
		scope.domElement.addEventListener('MozMousePixelScroll', onMouseWheel, false); // firefox
	
		// scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
		// scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
		// scope.domElement.addEventListener( 'touchmove', onTouchMove, false );
	
		scope.hammer = new _hammerjs2['default'](scope.domElement);
	
		scope.hammer.get('pan').set({
			pointers: 0,
			direction: _hammerjs2['default'].DIRECTION_ALL
		});
	
		scope.hammer.get('pinch').set({
			enable: true,
			threshold: 0.1
		});
	
		scope.hammer.on('panstart', function (event) {
			if (scope.enabled === false) {
				return;
			}
	
			if (event.pointerType === 'mouse') {
				return;
			}
	
			if (event.pointers.length === 1) {
				if (scope.enablePan === false) {
					return;
				}
	
				handleTouchStartPan(event);
				// panStart.set(event.deltaX, event.deltaY);
	
				state = STATE.TOUCH_PAN;
			} else if (event.pointers.length === 2) {
				if (scope.enableRotate === false) return;
	
				handleTouchStartRotate(event);
	
				state = STATE.TOUCH_ROTATE;
			}
	
			if (state !== STATE.NONE) {
				scope.dispatchEvent(startEvent);
			}
		});
	
		scope.hammer.on('panend', function (event) {
			if (event.pointerType === 'mouse') {
				return;
			}
	
			onTouchEnd(event);
		});
	
		scope.hammer.on('panmove', function (event) {
			if (scope.enabled === false) return;
	
			if (event.pointerType === 'mouse') {
				return;
			}
	
			// event.preventDefault();
			// event.stopPropagation();
	
			if (event.pointers.length === 1) {
				if (scope.enablePan === false) return;
				if (state !== STATE.TOUCH_PAN) return; // is this needed?...
	
				handleTouchMovePan(event);
	
				// panEnd.set( event.deltaX, event.deltaY );
				//
				// panDelta.subVectors( panEnd, panStart );
				//
				// pan( panDelta.x, panDelta.y );
				//
				// panStart.copy( panEnd );
				//
				// scope.update();
			} else if (event.pointers.length === 2) {
					if (scope.enableRotate === false) return;
					if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...
	
					handleTouchMoveRotate(event);
				}
		});
	
		scope.hammer.on('pinchstart', function (event) {
			if (scope.enabled === false) return;
	
			if (event.pointerType === 'mouse') {
				return;
			}
	
			if (scope.enableZoom === false) return;
	
			handleTouchStartDolly(event);
	
			// var dx = event.pointers[ 0 ].pageX - event.pointers[ 1 ].pageX;
			// var dy = event.pointers[ 0 ].pageY - event.pointers[ 1 ].pageY;
			//
			// var distance = Math.sqrt( dx * dx + dy * dy );
			//
			// dollyStart.set( 0, distance );
			//
			state = STATE.TOUCH_DOLLY;
	
			if (state !== STATE.NONE) {
				scope.dispatchEvent(startEvent);
			}
		});
	
		scope.hammer.on('pinchend', function (event) {
			if (event.pointerType === 'mouse') {
				return;
			}
	
			onTouchEnd(event);
		});
	
		scope.hammer.on('pinchmove', function (event) {
			if (scope.enabled === false) return;
	
			if (event.pointerType === 'mouse') {
				return;
			}
	
			// event.preventDefault();
			// event.stopPropagation();
	
			if (scope.enableZoom === false) return;
			if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...
	
			handleTouchMoveDolly(event);
	
			// var dx = event.pointers[ 0 ].pageX - event.pointers[ 1 ].pageX;
			// var dy = event.pointers[ 0 ].pageY - event.pointers[ 1 ].pageY;
			//
			// var distance = Math.sqrt( dx * dx + dy * dy );
			//
			// dollyEnd.set( 0, distance );
			//
			// dollyDelta.subVectors( dollyEnd, dollyStart );
			//
			// if ( dollyDelta.y > 0 ) {
			//
			// 	dollyOut( getZoomScale() );
			//
			// } else if ( dollyDelta.y < 0 ) {
			//
			// 	dollyIn( getZoomScale() );
			//
			// }
			//
			// dollyStart.copy( dollyEnd );
			//
			// scope.update();
		});
	
		window.addEventListener('keydown', onKeyDown, false);
	
		// Expose controls methods for programmatic control
		this.panLeft = panLeft;
		this.panUp = panUp;
		this.pan = pan;
		this.dollyIn = dollyIn;
		this.dollyOut = dollyOut;
		this.getZoomScale = getZoomScale;
		this.rotateLeft = rotateLeft;
		this.rotateUp = rotateUp;
	
		// force an update at start
	
		this.update();
	};
	
	OrbitControls.prototype = Object.create(_three2['default'].EventDispatcher.prototype);
	OrbitControls.prototype.constructor = _three2['default'].OrbitControls;
	
	Object.defineProperties(OrbitControls.prototype, {
	
		center: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .center has been renamed to .target');
				return this.target;
			}
	
		},
	
		// backward compatibility
	
		noZoom: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
				return !this.enableZoom;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
				this.enableZoom = !value;
			}
	
		},
	
		noRotate: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
				return !this.enableRotate;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
				this.enableRotate = !value;
			}
	
		},
	
		noPan: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
				return !this.enablePan;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
				this.enablePan = !value;
			}
	
		},
	
		noKeys: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
				return !this.enableKeys;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
				this.enableKeys = !value;
			}
	
		},
	
		staticMoving: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
				return !this.constraint.enableDamping;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
				this.constraint.enableDamping = !value;
			}
	
		},
	
		dynamicDampingFactor: {
	
			get: function get() {
	
				console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
				return this.constraint.dampingFactor;
			},
	
			set: function set(value) {
	
				console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
				this.constraint.dampingFactor = value;
			}
	
		}
	
	});
	
	exports['default'] = OrbitControls;
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	
	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        assign(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	
	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;
	
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	
	    this.primaryTouch = null;
	    this.lastTouches = [];
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }
	
	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}
	
	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];
	
	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}
	
	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
	
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {
	
	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});
	
	    this.id = uniqueId();
	
	    this.manager = null;
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	
	        emit(self.options.event); // simple 'eventName' events
	
	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	
	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});
	
	    this.options.inputTarget = this.options.inputTarget || element;
	
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        recognizer = this.get(recognizer);
	
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
	
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}
	
	})(window, document, 'Hammer');


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var LayerGroup = (function (_Layer) {
	  _inherits(LayerGroup, _Layer);
	
	  function LayerGroup(options) {
	    _classCallCheck(this, LayerGroup);
	
	    var defaults = {
	      output: false
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(LayerGroup.prototype), 'constructor', this).call(this, _options);
	
	    this._layers = [];
	  }
	
	  _createClass(LayerGroup, [{
	    key: 'addLayer',
	    value: function addLayer(layer) {
	      this._layers.push(layer);
	      return this._world.addLayer(layer);
	    }
	  }, {
	    key: 'removeLayer',
	    value: function removeLayer(layer) {
	      var layerIndex = this._layers.indexOf(layer);
	
	      if (layerIndex > -1) {
	        // Remove from this._layers
	        this._layers.splice(layerIndex, 1);
	      };
	
	      this._world.removeLayer(layer);
	    }
	  }, {
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      return Promise.resolve(this);
	    }
	
	    // Destroy the layers and remove them from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // TODO: Sometimes this is already null, find out why
	      if (this._layers) {
	        for (var i = 0; i < this._layers.length; i++) {
	          this._layers[i].destroy();
	        }
	
	        this._layers = null;
	      }
	
	      _get(Object.getPrototypeOf(LayerGroup.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return LayerGroup;
	})(_Layer3['default']);
	
	exports['default'] = LayerGroup;
	
	var noNew = function noNew(options) {
	  return new LayerGroup(options);
	};
	
	exports.layerGroup = noNew;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _TileLayer2 = __webpack_require__(56);
	
	var _TileLayer3 = _interopRequireDefault(_TileLayer2);
	
	var _ImageTile = __webpack_require__(66);
	
	var _ImageTile2 = _interopRequireDefault(_ImageTile);
	
	var _ImageTileLayerBaseMaterial = __webpack_require__(69);
	
	var _ImageTileLayerBaseMaterial2 = _interopRequireDefault(_ImageTileLayerBaseMaterial);
	
	var _lodashThrottle = __webpack_require__(22);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// DONE: Find a way to avoid the flashing caused by the gap between old tiles
	// being removed and the new tiles being ready for display
	//
	// DONE: Simplest first step for MVP would be to give each tile mesh the colour
	// of the basemap ground so it blends in a little more, or have a huge ground
	// plane underneath all the tiles that shows through between tile updates.
	//
	// Could keep the old tiles around until the new ones are ready, though they'd
	// probably need to be layered in a way so the old tiles don't overlap new ones,
	// which is similar to how Leaflet approaches this (it has 2 layers)
	//
	// Could keep the tile from the previous quadtree level visible until all 4
	// tiles at the new / current level have finished loading and are displayed.
	// Perhaps by keeping a map of tiles by quadcode and a boolean for each of the
	// child quadcodes showing whether they are loaded and in view. If all true then
	// remove the parent tile, otherwise keep it on a lower layer.
	
	// TODO: Load and display a base layer separate to the LOD grid that is at a low
	// resolution – used as a backup / background to fill in empty areas / distance
	
	// DONE: Fix the issue where some tiles just don't load, or at least the texture
	// never shows up – tends to happen if you quickly zoom in / out past it while
	// it's still loading, leaving a blank space
	
	// TODO: Optimise the request of many image tiles – look at how Leaflet and
	// OpenWebGlobe approach this (eg. batching, queues, etc)
	
	// TODO: Cancel pending tile requests if they get removed from view before they
	// reach a ready state (eg. cancel image requests, etc). Need to ensure that the
	// images are re-requested when the tile is next in scene (even if from cache)
	
	// TODO: Consider not performing an LOD calculation on every frame, instead only
	// on move end so panning, orbiting and zooming stays smooth. Otherwise it's
	// possible for performance to tank if you pan, orbit or zoom rapidly while all
	// the LOD calculations are being made and new tiles requested.
	//
	// Pending tiles should continue to be requested and output to the scene on each
	// frame, but no new LOD calculations should be made.
	
	// This tile layer both updates the quadtree and outputs tiles on every frame
	// (throttled to some amount)
	//
	// This is because the computational complexity of image tiles is generally low
	// and so there isn't much jank when running these calculations and outputs in
	// realtime
	//
	// The benefit to doing this is that the underlying map layer continues to
	// refresh and update during movement, which is an arguably better experience
	
	var ImageTileLayer = (function (_TileLayer) {
	  _inherits(ImageTileLayer, _TileLayer);
	
	  function ImageTileLayer(path, options) {
	    _classCallCheck(this, ImageTileLayer);
	
	    var defaults = {
	      distance: 300000
	    };
	
	    options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(ImageTileLayer.prototype), 'constructor', this).call(this, options);
	
	    this._path = path;
	  }
	
	  _createClass(ImageTileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _get(Object.getPrototypeOf(ImageTileLayer.prototype), '_onAdd', _this).call(_this, world).then(function () {
	          // TODO: Removed because it causes depth buffer intersection issues
	          // with layer on top for some reason. Need to work out why and fix.
	          //
	          // Add base layer
	          // var geom = new THREE.PlaneBufferGeometry(2000000, 2000000, 1);
	
	          // var baseMaterial;
	          // if (this._world._environment._skybox) {
	          //   baseMaterial = ImageTileLayerBaseMaterial('#f5f5f3', this._world._environment._skybox.getRenderTarget());
	          // } else {
	          //   baseMaterial = ImageTileLayerBaseMaterial('#f5f5f3');
	          // }
	
	          // var mesh = new THREE.Mesh(geom, baseMaterial);
	
	          // // Setting this causes a depth-buffer intersection issue on the
	          // // all-the-things example
	          // // mesh.renderOrder = -1;
	
	          // mesh.rotation.x = -90 * Math.PI / 180;
	
	          // // TODO: It might be overkill to receive a shadow on the base layer as it's
	          // // rarely seen (good to have if performance difference is negligible)
	          // mesh.receiveShadow = true;
	
	          // this._baseLayer = mesh;
	          // this.add(mesh);
	
	          // Trigger initial quadtree calculation on the next frame
	          //
	          // TODO: This is a hack to ensure the camera is all set up - a better
	          // solution should be found
	          setTimeout(function () {
	            _this._calculateLOD();
	            _this._initEvents();
	          }, 0);
	
	          resolve(_this);
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      // Run LOD calculations based on render calls
	      //
	      // Throttled to 1 LOD calculation per 100ms
	      this._throttledWorldUpdate = (0, _lodashThrottle2['default'])(this._onWorldUpdate, 100);
	
	      this._world.on('preUpdate', this._throttledWorldUpdate, this);
	      // this._world.on('move', this._onWorldMove, this);
	    }
	  }, {
	    key: '_onWorldUpdate',
	    value: function _onWorldUpdate() {
	      this._calculateLOD();
	      this._outputTiles();
	    }
	  }, {
	    key: '_onWorldMove',
	    value: function _onWorldMove(latlon, point) {
	      this._moveBaseLayer(point);
	    }
	  }, {
	    key: '_moveBaseLayer',
	    value: function _moveBaseLayer(point) {
	      this._baseLayer.position.x = point.x;
	      this._baseLayer.position.z = point.y;
	    }
	  }, {
	    key: '_createTile',
	    value: function _createTile(quadcode, layer) {
	      return new _ImageTile2['default'](quadcode, this._path, layer);
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._world.off('preUpdate', this._throttledWorldUpdate);
	      this._world.off('move', this._onWorldMove);
	
	      this._throttledWorldUpdate = null;
	
	      // Dispose of mesh and materials
	      this._baseLayer.geometry.dispose();
	      this._baseLayer.geometry = null;
	
	      if (this._baseLayer.material.map) {
	        this._baseLayer.material.map.dispose();
	        this._baseLayer.material.map = null;
	      }
	
	      this._baseLayer.material.dispose();
	      this._baseLayer.material = null;
	
	      this._baseLayer = null;
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(ImageTileLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return ImageTileLayer;
	})(_TileLayer3['default']);
	
	exports['default'] = ImageTileLayer;
	
	var noNew = function noNew(path, options) {
	  return new ImageTileLayer(path, options);
	};
	
	// Initialise without requiring new keyword
	exports.imageTileLayer = noNew;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _TileCache = __webpack_require__(57);
	
	var _TileCache2 = _interopRequireDefault(_TileCache);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// TODO: Consider removing picking from TileLayer instances as there aren't
	// (m)any situations where it would be practical
	//
	// For example, how would you even know what picking IDs to listen to and what
	// to do with them?
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// TODO: Consider keeping a single TileLayer / LOD instance running by default
	// that keeps a standard LOD grid for other layers to utilise, rather than
	// having to create their own, unique LOD grid and duplicate calculations when
	// they're going to use the same grid setup anyway
	//
	// It still makes sense to be able to have a custom LOD grid for some layers as
	// they may want to customise things, maybe not even using a quadtree at all!
	//
	// Perhaps it makes sense to split out the quadtree stuff into a singleton and
	// pass in the necessary parameters each time for the calculation step.
	//
	// Either way, it seems silly to force layers to have to create a new LOD grid
	// each time and create extra, duplicated processing every frame.
	
	// TODO: Allow passing in of options to define min/max LOD and a distance to use
	// for culling tiles beyond that distance.
	
	// DONE: Prevent tiles from being loaded if they are further than a certain
	// distance from the camera and are unlikely to be seen anyway
	
	// TODO: Avoid performing LOD calculation when it isn't required. For example,
	// when nothing has changed since the last frame and there are no tiles to be
	// loaded or in need of rendering
	
	// TODO: Only remove tiles from the layer that aren't to be rendered in the
	// current frame – it seems excessive to remove all tiles and re-add them on
	// every single frame, even if it's just array manipulation
	
	// TODO: Fix LOD calculation so min and max LOD can be changed without causing
	// problems (eg. making min above 5 causes all sorts of issues)
	
	// TODO: Reuse THREE objects where possible instead of creating new instances
	// on every LOD calculation
	
	// TODO: Consider not using THREE or LatLon / Point objects in LOD calculations
	// to avoid creating unnecessary memory for garbage collection
	
	// TODO: Prioritise loading of tiles at highest level in the quadtree (those
	// closest to the camera) so visual inconsistancies during loading are minimised
	
	var TileLayer = (function (_Layer) {
	  _inherits(TileLayer, _Layer);
	
	  function TileLayer(options) {
	    var _this = this;
	
	    _classCallCheck(this, TileLayer);
	
	    var defaults = {
	      picking: false,
	      maxCache: 1000,
	      maxLOD: 18
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(TileLayer.prototype), 'constructor', this).call(this, _options);
	
	    this._destroy = false;
	
	    this._tileCache = new _TileCache2['default'](this._options.maxCache, function (tile) {
	      _this._destroyTile(tile);
	    });
	
	    // List of tiles from the previous LOD calculation
	    this._tileList = [];
	
	    // TODO: Work out why changing the minLOD causes loads of issues
	    this._minLOD = 3;
	    this._maxLOD = this._options.maxLOD;
	
	    this._frustum = new _three2['default'].Frustum();
	    this._tiles = new _three2['default'].Object3D();
	    this._tilesPicking = new _three2['default'].Object3D();
	  }
	
	  _createClass(TileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      this.addToPicking(this._tilesPicking);
	      this.add(this._tiles);
	
	      return Promise.resolve();
	    }
	  }, {
	    key: '_updateFrustum',
	    value: function _updateFrustum() {
	      var camera = this._world.getCamera();
	      var projScreenMatrix = new _three2['default'].Matrix4();
	      projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
	
	      this._frustum.setFromMatrix(camera.projectionMatrix);
	      this._frustum.setFromMatrix(new _three2['default'].Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
	    }
	  }, {
	    key: '_tileInFrustum',
	    value: function _tileInFrustum(tile) {
	      var bounds = tile.getBounds();
	      return this._frustum.intersectsBox(new _three2['default'].Box3(new _three2['default'].Vector3(bounds[0], 0, bounds[3]), new _three2['default'].Vector3(bounds[2], 0, bounds[1])));
	    }
	
	    // Update and output tiles from the previous LOD checklist
	  }, {
	    key: '_outputTiles',
	    value: function _outputTiles() {
	      var _this2 = this;
	
	      if (!this._tiles || this._destroy) {
	        return;
	      }
	
	      // Remove all tiles from layer
	      this._removeTiles();
	
	      // Add / re-add tiles
	      this._tileList.forEach(function (tile) {
	        // Are the mesh and texture ready?
	        //
	        // If yes, continue
	        // If no, skip
	        if (!tile.isReady()) {
	          return;
	        }
	
	        // Add tile to layer (and to scene) if not already there
	        _this2._tiles.add(tile.getMesh());
	
	        if (tile.getPickingMesh()) {
	          _this2._tilesPicking.add(tile.getPickingMesh());
	        }
	      });
	
	      // Emit event notifying of new tiles
	      this.emit('tilesList', this._tileList.map(function (tile) {
	        return tile;
	      }));
	    }
	
	    // Works out tiles in the view frustum and stores them in an array
	    //
	    // Does not output the tiles, deferring this to _outputTiles()
	  }, {
	    key: '_calculateLOD',
	    value: function _calculateLOD() {
	      var _this3 = this;
	
	      if (this._stop || !this._world || this._destroy) {
	        return;
	      }
	
	      // var start = performance.now();
	
	      var camera = this._world.getCamera();
	
	      // 1. Update and retrieve camera frustum
	      this._updateFrustum(this._frustum, camera);
	
	      // 2. Add the four root items of the quadtree to a check list
	      var checkList = this._checklist;
	      checkList = [];
	      checkList.push(this._requestTile('0', this));
	      checkList.push(this._requestTile('1', this));
	      checkList.push(this._requestTile('2', this));
	      checkList.push(this._requestTile('3', this));
	
	      // 3. Call Divide, passing in the check list
	      this._divide(checkList);
	
	      // // 4. Remove all tiles from layer
	      //
	      // Moved to _outputTiles() for now
	      // this._removeTiles();
	
	      // Order tile-list by zoom so nearest tiles are requested first
	      checkList.sort(function (a, b) {
	        return a._quadcode.length < b._quadcode.length;
	      });
	
	      // 5. Filter the tiles remaining in the check list
	      var tileList = checkList.filter(function (tile, index) {
	        // Skip tile if it's not in the current view frustum
	        if (!_this3._tileInFrustum(tile)) {
	          return false;
	        }
	
	        if (_this3._options.distance && _this3._options.distance > 0) {
	          // TODO: Can probably speed this up
	          var center = tile.getCenter();
	          var dist = new _three2['default'].Vector3(center[0], 0, center[1]).sub(camera.position).length();
	
	          // Manual distance limit to cut down on tiles so far away
	          if (dist > _this3._options.distance) {
	            return false;
	          }
	        }
	
	        // Does the tile have a mesh?
	        //
	        // If yes, continue
	        // If no, generate tile mesh, request texture and skip
	        if (!tile.getMesh() || tile.isAborted()) {
	          tile.requestTileAsync();
	        }
	
	        return true;
	
	        // Are the mesh and texture ready?
	        //
	        // If yes, continue
	        // If no, skip
	        // if (!tile.isReady()) {
	        //   return;
	        // }
	        //
	        // // Add tile to layer (and to scene)
	        // this._tiles.add(tile.getMesh());
	      });
	
	      // Get list of tiles that were in the previous update but not the
	      // current one (for aborting requests, etc)
	      var missingTiles = this._tileList.filter(function (item) {
	        return !tileList.includes(item);
	      });
	
	      // Abort tiles that are no longer in view
	      missingTiles.forEach(function (tile) {
	        return tile._abortRequest();
	      });
	
	      this._tileList = tileList;
	
	      // console.log(performance.now() - start);
	    }
	  }, {
	    key: '_divide',
	    value: function _divide(checkList) {
	      var count = 0;
	      var currentItem;
	      var quadcode;
	
	      // 1. Loop until count equals check list length
	      while (count != checkList.length) {
	        currentItem = checkList[count];
	        quadcode = currentItem.getQuadcode();
	
	        // 2. Increase count and continue loop if quadcode equals max LOD / zoom
	        if (currentItem.length === this._maxLOD) {
	          count++;
	          continue;
	        }
	
	        // 3. Else, calculate screen-space error metric for quadcode
	        if (this._screenSpaceError(currentItem)) {
	          // 4. If error is sufficient...
	
	          // 4a. Remove parent item from the check list
	          checkList.splice(count, 1);
	
	          // 4b. Add 4 child items to the check list
	          checkList.push(this._requestTile(quadcode + '0', this));
	          checkList.push(this._requestTile(quadcode + '1', this));
	          checkList.push(this._requestTile(quadcode + '2', this));
	          checkList.push(this._requestTile(quadcode + '3', this));
	
	          // 4d. Continue the loop without increasing count
	          continue;
	        } else {
	          // 5. Else, increase count and continue loop
	          count++;
	        }
	      }
	    }
	  }, {
	    key: '_screenSpaceError',
	    value: function _screenSpaceError(tile) {
	      var minDepth = this._minLOD;
	      var maxDepth = this._maxLOD;
	
	      var quadcode = tile.getQuadcode();
	
	      var camera = this._world.getCamera();
	
	      // Tweak this value to refine specific point that each quad is subdivided
	      //
	      // It's used to multiple the dimensions of the tile sides before
	      // comparing against the tile distance from camera
	      var quality = 3.0;
	
	      // 1. Return false if quadcode length equals maxDepth (stop dividing)
	      if (quadcode.length === maxDepth) {
	        return false;
	      }
	
	      // 2. Return true if quadcode length is less than minDepth
	      if (quadcode.length < minDepth) {
	        return true;
	      }
	
	      // 3. Return false if quadcode bounds are not in view frustum
	      if (!this._tileInFrustum(tile)) {
	        return false;
	      }
	
	      var center = tile.getCenter();
	
	      // 4. Calculate screen-space error metric
	      // TODO: Use closest distance to one of the 4 tile corners
	      var dist = new _three2['default'].Vector3(center[0], 0, center[1]).sub(camera.position).length();
	
	      var error = quality * tile.getSide() / dist;
	
	      // 5. Return true if error is greater than 1.0, else return false
	      return error > 1.0;
	    }
	  }, {
	    key: '_removeTiles',
	    value: function _removeTiles() {
	      if (!this._tiles || !this._tiles.children) {
	        return;
	      }
	
	      for (var i = this._tiles.children.length - 1; i >= 0; i--) {
	        this._tiles.remove(this._tiles.children[i]);
	      }
	
	      if (!this._tilesPicking || !this._tilesPicking.children) {
	        return;
	      }
	
	      for (var i = this._tilesPicking.children.length - 1; i >= 0; i--) {
	        this._tilesPicking.remove(this._tilesPicking.children[i]);
	      }
	    }
	
	    // Return a new tile instance
	  }, {
	    key: '_createTile',
	    value: function _createTile(quadcode, layer) {}
	
	    // Get a cached tile or request a new one if not in cache
	  }, {
	    key: '_requestTile',
	    value: function _requestTile(quadcode, layer) {
	      var tile = this._tileCache.getTile(quadcode);
	
	      if (!tile) {
	        // Set up a brand new tile
	        tile = this._createTile(quadcode, layer);
	
	        // Add tile to cache, though it won't be ready yet as the data is being
	        // requested from various places asynchronously
	        this._tileCache.setTile(quadcode, tile);
	      }
	
	      return tile;
	    }
	  }, {
	    key: '_destroyTile',
	    value: function _destroyTile(tile) {
	      // Remove tile from scene
	      this._tiles.remove(tile.getMesh());
	
	      // Delete any references to the tile within this component
	
	      // Call destory on tile instance
	      tile.destroy();
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this._stop = false;
	
	      if (this._tilesPicking) {
	        this._tilesPicking.visible = true;
	      }
	
	      this._calculateLOD();
	      _get(Object.getPrototypeOf(TileLayer.prototype), 'show', this).call(this);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this._stop = true;
	
	      if (this._tilesPicking) {
	        this._tilesPicking.visible = false;
	      }
	
	      _get(Object.getPrototypeOf(TileLayer.prototype), 'hide', this).call(this);
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._destroy = true;
	
	      if (this._tiles.children) {
	        // Remove all tiles
	        for (var i = this._tiles.children.length - 1; i >= 0; i--) {
	          this._tiles.remove(this._tiles.children[i]);
	        }
	      }
	
	      // Remove tile from picking scene
	      this.removeFromPicking(this._tilesPicking);
	
	      if (this._tilesPicking.children) {
	        // Remove all tiles
	        for (var i = this._tilesPicking.children.length - 1; i >= 0; i--) {
	          this._tilesPicking.remove(this._tilesPicking.children[i]);
	        }
	      }
	
	      this._tileCache.destroy();
	      this._tileCache = null;
	
	      this._tiles = null;
	      this._tilesPicking = null;
	      this._frustum = null;
	
	      _get(Object.getPrototypeOf(TileLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return TileLayer;
	})(_Layer3['default']);
	
	exports['default'] = TileLayer;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _lruCache = __webpack_require__(58);
	
	var _lruCache2 = _interopRequireDefault(_lruCache);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// This process is based on a similar approach taken by OpenWebGlobe
	// See: https://github.com/OpenWebGlobe/WebViewer/blob/master/source/core/globecache.js
	
	var TileCache = (function () {
	  function TileCache(cacheLimit, onDestroyTile) {
	    _classCallCheck(this, TileCache);
	
	    this._cache = (0, _lruCache2['default'])({
	      max: cacheLimit,
	      dispose: function dispose(key, tile) {
	        onDestroyTile(tile);
	      }
	    });
	  }
	
	  // Returns true if all specified tile providers are ready to be used
	  // Otherwise, returns false
	
	  _createClass(TileCache, [{
	    key: 'isReady',
	    value: function isReady() {
	      return false;
	    }
	
	    // Get a cached tile without requesting a new one
	  }, {
	    key: 'getTile',
	    value: function getTile(quadcode) {
	      return this._cache.get(quadcode);
	    }
	
	    // Add tile to cache
	  }, {
	    key: 'setTile',
	    value: function setTile(quadcode, tile) {
	      this._cache.set(quadcode, tile);
	    }
	
	    // Destroy the cache and remove it from memory
	    //
	    // TODO: Call destroy method on items in cache
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._cache.reset();
	      this._cache = null;
	    }
	  }]);
	
	  return TileCache;
	})();
	
	exports['default'] = TileCache;
	
	var noNew = function noNew(cacheLimit, onDestroyTile) {
	  return new TileCache(cacheLimit, onDestroyTile);
	};
	
	// Initialise without requiring new keyword
	exports.tileCache = noNew;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = LRUCache
	
	// This will be a proper iterable 'Map' in engines that support it,
	// or a fakey-fake PseudoMap in older versions.
	var Map = __webpack_require__(59)
	var util = __webpack_require__(62)
	
	// A linked list to keep track of recently-used-ness
	var Yallist = __webpack_require__(65)
	
	// use symbols if possible, otherwise just _props
	var symbols = {}
	var hasSymbol = typeof Symbol === 'function'
	var makeSymbol
	/* istanbul ignore if */
	if (hasSymbol) {
	  makeSymbol = function (key) {
	    return Symbol.for(key)
	  }
	} else {
	  makeSymbol = function (key) {
	    return '_' + key
	  }
	}
	
	function priv (obj, key, val) {
	  var sym
	  if (symbols[key]) {
	    sym = symbols[key]
	  } else {
	    sym = makeSymbol(key)
	    symbols[key] = sym
	  }
	  if (arguments.length === 2) {
	    return obj[sym]
	  } else {
	    obj[sym] = val
	    return val
	  }
	}
	
	function naiveLength () { return 1 }
	
	// lruList is a yallist where the head is the youngest
	// item, and the tail is the oldest.  the list contains the Hit
	// objects as the entries.
	// Each Hit object has a reference to its Yallist.Node.  This
	// never changes.
	//
	// cache is a Map (or PseudoMap) that matches the keys to
	// the Yallist.Node object.
	function LRUCache (options) {
	  if (!(this instanceof LRUCache)) {
	    return new LRUCache(options)
	  }
	
	  if (typeof options === 'number') {
	    options = { max: options }
	  }
	
	  if (!options) {
	    options = {}
	  }
	
	  var max = priv(this, 'max', options.max)
	  // Kind of weird to have a default max of Infinity, but oh well.
	  if (!max ||
	      !(typeof max === 'number') ||
	      max <= 0) {
	    priv(this, 'max', Infinity)
	  }
	
	  var lc = options.length || naiveLength
	  if (typeof lc !== 'function') {
	    lc = naiveLength
	  }
	  priv(this, 'lengthCalculator', lc)
	
	  priv(this, 'allowStale', options.stale || false)
	  priv(this, 'maxAge', options.maxAge || 0)
	  priv(this, 'dispose', options.dispose)
	  this.reset()
	}
	
	// resize the cache when the max changes.
	Object.defineProperty(LRUCache.prototype, 'max', {
	  set: function (mL) {
	    if (!mL || !(typeof mL === 'number') || mL <= 0) {
	      mL = Infinity
	    }
	    priv(this, 'max', mL)
	    trim(this)
	  },
	  get: function () {
	    return priv(this, 'max')
	  },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'allowStale', {
	  set: function (allowStale) {
	    priv(this, 'allowStale', !!allowStale)
	  },
	  get: function () {
	    return priv(this, 'allowStale')
	  },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'maxAge', {
	  set: function (mA) {
	    if (!mA || !(typeof mA === 'number') || mA < 0) {
	      mA = 0
	    }
	    priv(this, 'maxAge', mA)
	    trim(this)
	  },
	  get: function () {
	    return priv(this, 'maxAge')
	  },
	  enumerable: true
	})
	
	// resize the cache when the lengthCalculator changes.
	Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
	  set: function (lC) {
	    if (typeof lC !== 'function') {
	      lC = naiveLength
	    }
	    if (lC !== priv(this, 'lengthCalculator')) {
	      priv(this, 'lengthCalculator', lC)
	      priv(this, 'length', 0)
	      priv(this, 'lruList').forEach(function (hit) {
	        hit.length = priv(this, 'lengthCalculator').call(this, hit.value, hit.key)
	        priv(this, 'length', priv(this, 'length') + hit.length)
	      }, this)
	    }
	    trim(this)
	  },
	  get: function () { return priv(this, 'lengthCalculator') },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'length', {
	  get: function () { return priv(this, 'length') },
	  enumerable: true
	})
	
	Object.defineProperty(LRUCache.prototype, 'itemCount', {
	  get: function () { return priv(this, 'lruList').length },
	  enumerable: true
	})
	
	LRUCache.prototype.rforEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = priv(this, 'lruList').tail; walker !== null;) {
	    var prev = walker.prev
	    forEachStep(this, fn, walker, thisp)
	    walker = prev
	  }
	}
	
	function forEachStep (self, fn, node, thisp) {
	  var hit = node.value
	  if (isStale(self, hit)) {
	    del(self, node)
	    if (!priv(self, 'allowStale')) {
	      hit = undefined
	    }
	  }
	  if (hit) {
	    fn.call(thisp, hit.value, hit.key, self)
	  }
	}
	
	LRUCache.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = priv(this, 'lruList').head; walker !== null;) {
	    var next = walker.next
	    forEachStep(this, fn, walker, thisp)
	    walker = next
	  }
	}
	
	LRUCache.prototype.keys = function () {
	  return priv(this, 'lruList').toArray().map(function (k) {
	    return k.key
	  }, this)
	}
	
	LRUCache.prototype.values = function () {
	  return priv(this, 'lruList').toArray().map(function (k) {
	    return k.value
	  }, this)
	}
	
	LRUCache.prototype.reset = function () {
	  if (priv(this, 'dispose') &&
	      priv(this, 'lruList') &&
	      priv(this, 'lruList').length) {
	    priv(this, 'lruList').forEach(function (hit) {
	      priv(this, 'dispose').call(this, hit.key, hit.value)
	    }, this)
	  }
	
	  priv(this, 'cache', new Map()) // hash of items by key
	  priv(this, 'lruList', new Yallist()) // list of items in order of use recency
	  priv(this, 'length', 0) // length of items in the list
	}
	
	LRUCache.prototype.dump = function () {
	  return priv(this, 'lruList').map(function (hit) {
	    if (!isStale(this, hit)) {
	      return {
	        k: hit.key,
	        v: hit.value,
	        e: hit.now + (hit.maxAge || 0)
	      }
	    }
	  }, this).toArray().filter(function (h) {
	    return h
	  })
	}
	
	LRUCache.prototype.dumpLru = function () {
	  return priv(this, 'lruList')
	}
	
	LRUCache.prototype.inspect = function (n, opts) {
	  var str = 'LRUCache {'
	  var extras = false
	
	  var as = priv(this, 'allowStale')
	  if (as) {
	    str += '\n  allowStale: true'
	    extras = true
	  }
	
	  var max = priv(this, 'max')
	  if (max && max !== Infinity) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  max: ' + util.inspect(max, opts)
	    extras = true
	  }
	
	  var maxAge = priv(this, 'maxAge')
	  if (maxAge) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  maxAge: ' + util.inspect(maxAge, opts)
	    extras = true
	  }
	
	  var lc = priv(this, 'lengthCalculator')
	  if (lc && lc !== naiveLength) {
	    if (extras) {
	      str += ','
	    }
	    str += '\n  length: ' + util.inspect(priv(this, 'length'), opts)
	    extras = true
	  }
	
	  var didFirst = false
	  priv(this, 'lruList').forEach(function (item) {
	    if (didFirst) {
	      str += ',\n  '
	    } else {
	      if (extras) {
	        str += ',\n'
	      }
	      didFirst = true
	      str += '\n  '
	    }
	    var key = util.inspect(item.key).split('\n').join('\n  ')
	    var val = { value: item.value }
	    if (item.maxAge !== maxAge) {
	      val.maxAge = item.maxAge
	    }
	    if (lc !== naiveLength) {
	      val.length = item.length
	    }
	    if (isStale(this, item)) {
	      val.stale = true
	    }
	
	    val = util.inspect(val, opts).split('\n').join('\n  ')
	    str += key + ' => ' + val
	  })
	
	  if (didFirst || extras) {
	    str += '\n'
	  }
	  str += '}'
	
	  return str
	}
	
	LRUCache.prototype.set = function (key, value, maxAge) {
	  maxAge = maxAge || priv(this, 'maxAge')
	
	  var now = maxAge ? Date.now() : 0
	  var len = priv(this, 'lengthCalculator').call(this, value, key)
	
	  if (priv(this, 'cache').has(key)) {
	    if (len > priv(this, 'max')) {
	      del(this, priv(this, 'cache').get(key))
	      return false
	    }
	
	    var node = priv(this, 'cache').get(key)
	    var item = node.value
	
	    // dispose of the old one before overwriting
	    if (priv(this, 'dispose')) {
	      priv(this, 'dispose').call(this, key, item.value)
	    }
	
	    item.now = now
	    item.maxAge = maxAge
	    item.value = value
	    priv(this, 'length', priv(this, 'length') + (len - item.length))
	    item.length = len
	    this.get(key)
	    trim(this)
	    return true
	  }
	
	  var hit = new Entry(key, value, len, now, maxAge)
	
	  // oversized objects fall out of cache automatically.
	  if (hit.length > priv(this, 'max')) {
	    if (priv(this, 'dispose')) {
	      priv(this, 'dispose').call(this, key, value)
	    }
	    return false
	  }
	
	  priv(this, 'length', priv(this, 'length') + hit.length)
	  priv(this, 'lruList').unshift(hit)
	  priv(this, 'cache').set(key, priv(this, 'lruList').head)
	  trim(this)
	  return true
	}
	
	LRUCache.prototype.has = function (key) {
	  if (!priv(this, 'cache').has(key)) return false
	  var hit = priv(this, 'cache').get(key).value
	  if (isStale(this, hit)) {
	    return false
	  }
	  return true
	}
	
	LRUCache.prototype.get = function (key) {
	  return get(this, key, true)
	}
	
	LRUCache.prototype.peek = function (key) {
	  return get(this, key, false)
	}
	
	LRUCache.prototype.pop = function () {
	  var node = priv(this, 'lruList').tail
	  if (!node) return null
	  del(this, node)
	  return node.value
	}
	
	LRUCache.prototype.del = function (key) {
	  del(this, priv(this, 'cache').get(key))
	}
	
	LRUCache.prototype.load = function (arr) {
	  // reset the cache
	  this.reset()
	
	  var now = Date.now()
	  // A previous serialized cache has the most recent items first
	  for (var l = arr.length - 1; l >= 0; l--) {
	    var hit = arr[l]
	    var expiresAt = hit.e || 0
	    if (expiresAt === 0) {
	      // the item was created without expiration in a non aged cache
	      this.set(hit.k, hit.v)
	    } else {
	      var maxAge = expiresAt - now
	      // dont add already expired items
	      if (maxAge > 0) {
	        this.set(hit.k, hit.v, maxAge)
	      }
	    }
	  }
	}
	
	LRUCache.prototype.prune = function () {
	  var self = this
	  priv(this, 'cache').forEach(function (value, key) {
	    get(self, key, false)
	  })
	}
	
	function get (self, key, doUse) {
	  var node = priv(self, 'cache').get(key)
	  if (node) {
	    var hit = node.value
	    if (isStale(self, hit)) {
	      del(self, node)
	      if (!priv(self, 'allowStale')) hit = undefined
	    } else {
	      if (doUse) {
	        priv(self, 'lruList').unshiftNode(node)
	      }
	    }
	    if (hit) hit = hit.value
	  }
	  return hit
	}
	
	function isStale (self, hit) {
	  if (!hit || (!hit.maxAge && !priv(self, 'maxAge'))) {
	    return false
	  }
	  var stale = false
	  var diff = Date.now() - hit.now
	  if (hit.maxAge) {
	    stale = diff > hit.maxAge
	  } else {
	    stale = priv(self, 'maxAge') && (diff > priv(self, 'maxAge'))
	  }
	  return stale
	}
	
	function trim (self) {
	  if (priv(self, 'length') > priv(self, 'max')) {
	    for (var walker = priv(self, 'lruList').tail;
	         priv(self, 'length') > priv(self, 'max') && walker !== null;) {
	      // We know that we're about to delete this one, and also
	      // what the next least recently used key will be, so just
	      // go ahead and set it now.
	      var prev = walker.prev
	      del(self, walker)
	      walker = prev
	    }
	  }
	}
	
	function del (self, node) {
	  if (node) {
	    var hit = node.value
	    if (priv(self, 'dispose')) {
	      priv(self, 'dispose').call(this, hit.key, hit.value)
	    }
	    priv(self, 'length', priv(self, 'length') - hit.length)
	    priv(self, 'cache').delete(hit.key)
	    priv(self, 'lruList').removeNode(node)
	  }
	}
	
	// classy, since V8 prefers predictable objects.
	function Entry (key, value, length, now, maxAge) {
	  this.key = key
	  this.value = value
	  this.length = length
	  this.now = now
	  this.maxAge = maxAge || 0
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' &&
	    process.env.npm_lifecycle_script === 'test')
	  process.env.TEST_PSEUDOMAP = 'true'
	
	if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
	  module.exports = Map
	} else {
	  module.exports = __webpack_require__(61)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 60 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 61 */
/***/ function(module, exports) {

	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	module.exports = PseudoMap
	
	function PseudoMap (set) {
	  if (!(this instanceof PseudoMap)) // whyyyyyyy
	    throw new TypeError("Constructor PseudoMap requires 'new'")
	
	  this.clear()
	
	  if (set) {
	    if ((set instanceof PseudoMap) ||
	        (typeof Map === 'function' && set instanceof Map))
	      set.forEach(function (value, key) {
	        this.set(key, value)
	      }, this)
	    else if (Array.isArray(set))
	      set.forEach(function (kv) {
	        this.set(kv[0], kv[1])
	      }, this)
	    else
	      throw new TypeError('invalid argument')
	  }
	}
	
	PseudoMap.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  Object.keys(this._data).forEach(function (k) {
	    if (k !== 'size')
	      fn.call(thisp, this._data[k].value, this._data[k].key)
	  }, this)
	}
	
	PseudoMap.prototype.has = function (k) {
	  return !!find(this._data, k)
	}
	
	PseudoMap.prototype.get = function (k) {
	  var res = find(this._data, k)
	  return res && res.value
	}
	
	PseudoMap.prototype.set = function (k, v) {
	  set(this._data, k, v)
	}
	
	PseudoMap.prototype.delete = function (k) {
	  var res = find(this._data, k)
	  if (res) {
	    delete this._data[res._index]
	    this._data.size--
	  }
	}
	
	PseudoMap.prototype.clear = function () {
	  var data = Object.create(null)
	  data.size = 0
	
	  Object.defineProperty(this, '_data', {
	    value: data,
	    enumerable: false,
	    configurable: true,
	    writable: false
	  })
	}
	
	Object.defineProperty(PseudoMap.prototype, 'size', {
	  get: function () {
	    return this._data.size
	  },
	  set: function (n) {},
	  enumerable: true,
	  configurable: true
	})
	
	PseudoMap.prototype.values =
	PseudoMap.prototype.keys =
	PseudoMap.prototype.entries = function () {
	  throw new Error('iterators are not implemented in this version')
	}
	
	// Either identical, or both NaN
	function same (a, b) {
	  return a === b || a !== a && b !== b
	}
	
	function Entry (k, v, i) {
	  this.key = k
	  this.value = v
	  this._index = i
	}
	
	function find (data, k) {
	  for (var i = 0, s = '_' + k, key = s;
	       hasOwnProperty.call(data, key);
	       key = s + i++) {
	    if (same(data[key].key, k))
	      return data[key]
	  }
	}
	
	function set (data, k, v) {
	  for (var i = 0, s = '_' + k, key = s;
	       hasOwnProperty.call(data, key);
	       key = s + i++) {
	    if (same(data[key].key, k)) {
	      data[key].value = v
	      return
	    }
	  }
	  data.size++
	  data[key] = new Entry(k, v, key)
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(63);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(64);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(60)))

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 64 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = Yallist
	
	Yallist.Node = Node
	Yallist.create = Yallist
	
	function Yallist (list) {
	  var self = this
	  if (!(self instanceof Yallist)) {
	    self = new Yallist()
	  }
	
	  self.tail = null
	  self.head = null
	  self.length = 0
	
	  if (list && typeof list.forEach === 'function') {
	    list.forEach(function (item) {
	      self.push(item)
	    })
	  } else if (arguments.length > 0) {
	    for (var i = 0, l = arguments.length; i < l; i++) {
	      self.push(arguments[i])
	    }
	  }
	
	  return self
	}
	
	Yallist.prototype.removeNode = function (node) {
	  if (node.list !== this) {
	    throw new Error('removing node which does not belong to this list')
	  }
	
	  var next = node.next
	  var prev = node.prev
	
	  if (next) {
	    next.prev = prev
	  }
	
	  if (prev) {
	    prev.next = next
	  }
	
	  if (node === this.head) {
	    this.head = next
	  }
	  if (node === this.tail) {
	    this.tail = prev
	  }
	
	  node.list.length --
	  node.next = null
	  node.prev = null
	  node.list = null
	}
	
	Yallist.prototype.unshiftNode = function (node) {
	  if (node === this.head) {
	    return
	  }
	
	  if (node.list) {
	    node.list.removeNode(node)
	  }
	
	  var head = this.head
	  node.list = this
	  node.next = head
	  if (head) {
	    head.prev = node
	  }
	
	  this.head = node
	  if (!this.tail) {
	    this.tail = node
	  }
	  this.length ++
	}
	
	Yallist.prototype.pushNode = function (node) {
	  if (node === this.tail) {
	    return
	  }
	
	  if (node.list) {
	    node.list.removeNode(node)
	  }
	
	  var tail = this.tail
	  node.list = this
	  node.prev = tail
	  if (tail) {
	    tail.next = node
	  }
	
	  this.tail = node
	  if (!this.head) {
	    this.head = node
	  }
	  this.length ++
	}
	
	Yallist.prototype.push = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    push(this, arguments[i])
	  }
	  return this.length
	}
	
	Yallist.prototype.unshift = function () {
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    unshift(this, arguments[i])
	  }
	  return this.length
	}
	
	Yallist.prototype.pop = function () {
	  if (!this.tail)
	    return undefined
	
	  var res = this.tail.value
	  this.tail = this.tail.prev
	  this.tail.next = null
	  this.length --
	  return res
	}
	
	Yallist.prototype.shift = function () {
	  if (!this.head)
	    return undefined
	
	  var res = this.head.value
	  this.head = this.head.next
	  this.head.prev = null
	  this.length --
	  return res
	}
	
	Yallist.prototype.forEach = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = this.head, i = 0; walker !== null; i++) {
	    fn.call(thisp, walker.value, i, this)
	    walker = walker.next
	  }
	}
	
	Yallist.prototype.forEachReverse = function (fn, thisp) {
	  thisp = thisp || this
	  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
	    fn.call(thisp, walker.value, i, this)
	    walker = walker.prev
	  }
	}
	
	Yallist.prototype.get = function (n) {
	  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.next
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	}
	
	Yallist.prototype.getReverse = function (n) {
	  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
	    // abort out of the list early if we hit a cycle
	    walker = walker.prev
	  }
	  if (i === n && walker !== null) {
	    return walker.value
	  }
	}
	
	Yallist.prototype.map = function (fn, thisp) {
	  thisp = thisp || this
	  var res = new Yallist()
	  for (var walker = this.head; walker !== null; ) {
	    res.push(fn.call(thisp, walker.value, this))
	    walker = walker.next
	  }
	  return res
	}
	
	Yallist.prototype.mapReverse = function (fn, thisp) {
	  thisp = thisp || this
	  var res = new Yallist()
	  for (var walker = this.tail; walker !== null;) {
	    res.push(fn.call(thisp, walker.value, this))
	    walker = walker.prev
	  }
	  return res
	}
	
	Yallist.prototype.reduce = function (fn, initial) {
	  var acc
	  var walker = this.head
	  if (arguments.length > 1) {
	    acc = initial
	  } else if (this.head) {
	    walker = this.head.next
	    acc = this.head.value
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }
	
	  for (var i = 0; walker !== null; i++) {
	    acc = fn(acc, walker.value, i)
	    walker = walker.next
	  }
	
	  return acc
	}
	
	Yallist.prototype.reduceReverse = function (fn, initial) {
	  var acc
	  var walker = this.tail
	  if (arguments.length > 1) {
	    acc = initial
	  } else if (this.tail) {
	    walker = this.tail.prev
	    acc = this.tail.value
	  } else {
	    throw new TypeError('Reduce of empty list with no initial value')
	  }
	
	  for (var i = this.length - 1; walker !== null; i--) {
	    acc = fn(acc, walker.value, i)
	    walker = walker.prev
	  }
	
	  return acc
	}
	
	Yallist.prototype.toArray = function () {
	  var arr = new Array(this.length)
	  for (var i = 0, walker = this.head; walker !== null; i++) {
	    arr[i] = walker.value
	    walker = walker.next
	  }
	  return arr
	}
	
	Yallist.prototype.toArrayReverse = function () {
	  var arr = new Array(this.length)
	  for (var i = 0, walker = this.tail; walker !== null; i++) {
	    arr[i] = walker.value
	    walker = walker.prev
	  }
	  return arr
	}
	
	Yallist.prototype.slice = function (from, to) {
	  to = to || this.length
	  if (to < 0) {
	    to += this.length
	  }
	  from = from || 0
	  if (from < 0) {
	    from += this.length
	  }
	  var ret = new Yallist()
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0
	  }
	  if (to > this.length) {
	    to = this.length
	  }
	  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
	    walker = walker.next
	  }
	  for (; walker !== null && i < to; i++, walker = walker.next) {
	    ret.push(walker.value)
	  }
	  return ret
	}
	
	Yallist.prototype.sliceReverse = function (from, to) {
	  to = to || this.length
	  if (to < 0) {
	    to += this.length
	  }
	  from = from || 0
	  if (from < 0) {
	    from += this.length
	  }
	  var ret = new Yallist()
	  if (to < from || to < 0) {
	    return ret
	  }
	  if (from < 0) {
	    from = 0
	  }
	  if (to > this.length) {
	    to = this.length
	  }
	  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
	    walker = walker.prev
	  }
	  for (; walker !== null && i > from; i--, walker = walker.prev) {
	    ret.push(walker.value)
	  }
	  return ret
	}
	
	Yallist.prototype.reverse = function () {
	  var head = this.head
	  var tail = this.tail
	  for (var walker = head; walker !== null; walker = walker.prev) {
	    var p = walker.prev
	    walker.prev = walker.next
	    walker.next = p
	  }
	  this.head = tail
	  this.tail = head
	  return this
	}
	
	function push (self, item) {
	  self.tail = new Node(item, self.tail, null, self)
	  if (!self.head) {
	    self.head = self.tail
	  }
	  self.length ++
	}
	
	function unshift (self, item) {
	  self.head = new Node(item, null, self.head, self)
	  if (!self.tail) {
	    self.tail = self.head
	  }
	  self.length ++
	}
	
	function Node (value, prev, next, list) {
	  if (!(this instanceof Node)) {
	    return new Node(value, prev, next, list)
	  }
	
	  this.list = list
	  this.value = value
	
	  if (prev) {
	    prev.next = this
	    this.prev = prev
	  } else {
	    this.prev = null
	  }
	
	  if (next) {
	    next.prev = this
	    this.next = next
	  } else {
	    this.next = null
	  }
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Tile2 = __webpack_require__(67);
	
	var _Tile3 = _interopRequireDefault(_Tile2);
	
	var _vendorBoxHelper = __webpack_require__(68);
	
	var _vendorBoxHelper2 = _interopRequireDefault(_vendorBoxHelper);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	var ImageTile = (function (_Tile) {
	  _inherits(ImageTile, _Tile);
	
	  function ImageTile(quadcode, path, layer) {
	    _classCallCheck(this, ImageTile);
	
	    _get(Object.getPrototypeOf(ImageTile.prototype), 'constructor', this).call(this, quadcode, path, layer);
	  }
	
	  // Request data for the tile
	
	  _createClass(ImageTile, [{
	    key: 'requestTileAsync',
	    value: function requestTileAsync() {
	      var _this = this;
	
	      // Making this asynchronous really speeds up the LOD framerate
	      setTimeout(function () {
	        if (!_this._mesh) {
	          _this._mesh = _this._createMesh();
	        }
	
	        _this._requestTile();
	      }, 0);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Cancel any pending requests
	      this._abortRequest();
	
	      // Clear image reference
	      this._image = null;
	
	      _get(Object.getPrototypeOf(ImageTile.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: '_createMesh',
	    value: function _createMesh() {
	      // Something went wrong and the tile
	      //
	      // Possibly removed by the cache before loaded
	      if (!this._center) {
	        return;
	      }
	
	      var mesh = new _three2['default'].Object3D();
	      var geom = new _three2['default'].PlaneBufferGeometry(this._side, this._side, 1);
	
	      var material;
	      if (!this._world._environment._skybox) {
	        material = new _three2['default'].MeshBasicMaterial({
	          depthWrite: false
	        });
	
	        // var material = new THREE.MeshPhongMaterial({
	        //   depthWrite: false
	        // });
	      } else {
	          // Other MeshStandardMaterial settings
	          //
	          // material.envMapIntensity will change the amount of colour reflected(?)
	          // from the environment map – can be greater than 1 for more intensity
	
	          material = new _three2['default'].MeshStandardMaterial({
	            depthWrite: false
	          });
	          material.roughness = 1;
	          material.metalness = 0.1;
	          material.envMap = this._world._environment._skybox.getRenderTarget();
	        }
	
	      var localMesh = new _three2['default'].Mesh(geom, material);
	      localMesh.rotation.x = -90 * Math.PI / 180;
	
	      localMesh.receiveShadow = true;
	
	      // Setting this causes a depth-buffer intersection issue on the
	      // all-the-things example
	      // localMesh.renderOrder = 2;
	
	      mesh.add(localMesh);
	
	      // Setting this causes a depth-buffer intersection issue on the
	      // all-the-things example
	      // mesh.renderOrder = 2;
	
	      mesh.position.x = this._center[0];
	      mesh.position.z = this._center[1];
	
	      // var box = new BoxHelper(localMesh);
	      // mesh.add(box);
	      //
	      // mesh.add(this._createDebugMesh());
	
	      return mesh;
	    }
	  }, {
	    key: '_createDebugMesh',
	    value: function _createDebugMesh() {
	      var canvas = document.createElement('canvas');
	      canvas.width = 256;
	      canvas.height = 256;
	
	      var context = canvas.getContext('2d');
	      context.font = 'Bold 20px Helvetica Neue, Verdana, Arial';
	      context.fillStyle = '#ff0000';
	      context.fillText(this._quadcode, 20, canvas.width / 2 - 5);
	      context.fillText(this._tile.toString(), 20, canvas.width / 2 + 25);
	
	      var texture = new _three2['default'].Texture(canvas);
	
	      // Silky smooth images when tilted
	      texture.magFilter = _three2['default'].LinearFilter;
	      texture.minFilter = _three2['default'].LinearMipMapLinearFilter;
	
	      // TODO: Set this to renderer.getMaxAnisotropy() / 4
	      texture.anisotropy = 4;
	
	      texture.needsUpdate = true;
	
	      var material = new _three2['default'].MeshBasicMaterial({
	        map: texture,
	        transparent: true,
	        depthWrite: false
	      });
	
	      var geom = new _three2['default'].PlaneBufferGeometry(this._side, this._side, 1);
	      var mesh = new _three2['default'].Mesh(geom, material);
	
	      mesh.rotation.x = -90 * Math.PI / 180;
	      mesh.position.y = 0.1;
	
	      return mesh;
	    }
	  }, {
	    key: '_requestTile',
	    value: function _requestTile() {
	      var _this2 = this;
	
	      var urlParams = {
	        x: this._tile[0],
	        y: this._tile[1],
	        z: this._tile[2]
	      };
	
	      var url = this._getTileURL(urlParams);
	
	      var image = document.createElement('img');
	
	      this._aborted = false;
	
	      image.addEventListener('load', function (event) {
	        if (_this2.isAborted()) {
	          return;
	        }
	
	        var texture = new _three2['default'].Texture();
	
	        texture.image = image;
	        texture.needsUpdate = true;
	
	        // Silky smooth images when tilted
	        texture.magFilter = _three2['default'].LinearFilter;
	        texture.minFilter = _three2['default'].LinearMipMapLinearFilter;
	
	        // TODO: Set this to renderer.getMaxAnisotropy() / 4
	        texture.anisotropy = 4;
	
	        texture.needsUpdate = true;
	
	        // Something went wrong and the tile or its material is missing
	        //
	        // Possibly removed by the cache before the image loaded
	        if (!_this2._mesh || !_this2._mesh.children[0] || !_this2._mesh.children[0].material) {
	          return;
	        }
	
	        _this2._mesh.children[0].material.map = texture;
	        _this2._mesh.children[0].material.needsUpdate = true;
	
	        _this2._texture = texture;
	        _this2._ready = true;
	      }, false);
	
	      // image.addEventListener('progress', event => {}, false);
	      // image.addEventListener('error', event => {}, false);
	
	      image.crossOrigin = '';
	
	      // Load image
	      image.src = url;
	
	      this._image = image;
	    }
	  }, {
	    key: '_abortRequest',
	    value: function _abortRequest() {
	      if (!this._image || this._ready) {
	        return;
	      }
	
	      this._aborted = true;
	
	      this._image.src = '';
	    }
	  }]);
	
	  return ImageTile;
	})(_Tile3['default']);
	
	exports['default'] = ImageTile;
	
	var noNew = function noNew(quadcode, path, layer) {
	  return new ImageTile(quadcode, path, layer);
	};
	
	// Initialise without requiring new keyword
	exports.imageTile = noNew;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _geoPoint = __webpack_require__(8);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// Manages a single tile and its layers
	
	var r2d = 180 / Math.PI;
	
	var tileURLRegex = /\{([szxy])\}/g;
	
	var Tile = (function () {
	  function Tile(quadcode, path, layer) {
	    _classCallCheck(this, Tile);
	
	    this._layer = layer;
	    this._world = layer._world;
	    this._quadcode = quadcode;
	    this._path = path;
	
	    this._ready = false;
	    this._aborted = false;
	
	    this._tile = this._quadcodeToTile(quadcode);
	
	    // Bottom-left and top-right bounds in WGS84 coordinates
	    this._boundsLatLon = this._tileBoundsWGS84(this._tile);
	
	    // Bottom-left and top-right bounds in world coordinates
	    this._boundsWorld = this._tileBoundsFromWGS84(this._boundsLatLon);
	
	    // Tile center in world coordinates
	    this._center = this._boundsToCenter(this._boundsWorld);
	
	    // Tile center in projected coordinates
	    this._centerLatlon = this._world.pointToLatLon((0, _geoPoint.point)(this._center[0], this._center[1]));
	
	    // Length of a tile side in world coorindates
	    this._side = this._getSide(this._boundsWorld);
	
	    // Point scale for tile (for unit conversion)
	    this._pointScale = this._world.pointScale(this._centerLatlon);
	  }
	
	  // Returns true if the tile mesh and texture are ready to be used
	  // Otherwise, returns false
	
	  _createClass(Tile, [{
	    key: 'isReady',
	    value: function isReady() {
	      return this._ready;
	    }
	  }, {
	    key: 'isAborted',
	    value: function isAborted() {
	      return this._aborted;
	    }
	
	    // Request data for the tile
	  }, {
	    key: 'requestTileAsync',
	    value: function requestTileAsync() {}
	  }, {
	    key: 'getQuadcode',
	    value: function getQuadcode() {
	      return this._quadcode;
	    }
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return this._boundsWorld;
	    }
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	      return this._center;
	    }
	  }, {
	    key: 'getSide',
	    value: function getSide() {
	      return this._side;
	    }
	  }, {
	    key: 'getMesh',
	    value: function getMesh() {
	      return this._mesh;
	    }
	  }, {
	    key: 'getPickingMesh',
	    value: function getPickingMesh() {
	      return this._pickingMesh;
	    }
	
	    // Destroys the tile and removes it from the layer and memory
	    //
	    // Ensure that this leaves no trace of the tile – no textures, no meshes,
	    // nothing in memory or the GPU
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // console.log('Destroying tile', this._quadcode);
	
	      // Delete reference to layer and world
	      this._layer = null;
	      this._world = null;
	
	      // Delete location references
	      this._boundsLatLon = null;
	      this._boundsWorld = null;
	      this._center = null;
	
	      // Done if no mesh
	      if (!this._mesh && !this._pickingMesh) {
	        return;
	      }
	
	      this.destroyMesh(this._mesh);
	      this.destroyMesh(this._pickingMesh);
	
	      this._mesh = null;
	      this._pickingMesh = null;
	    }
	  }, {
	    key: 'destroyMesh',
	    value: function destroyMesh(mesh) {
	      var _this = this;
	
	      var dispose = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      if (mesh) {
	        if (mesh.children) {
	          mesh.children.forEach(function (child) {
	            mesh.remove(child);
	            _this.destroyMesh(child);
	          });
	        }
	
	        if (dispose) {
	          if (mesh.geometry) {
	            mesh.geometry.dispose();
	            mesh.geometry = null;
	          }
	
	          if (mesh.material) {
	            if (mesh.material.map) {
	              mesh.material.map.dispose();
	              mesh.material.map = null;
	            }
	
	            mesh.material.dispose();
	            mesh.material = null;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_createMesh',
	    value: function _createMesh() {}
	  }, {
	    key: '_createDebugMesh',
	    value: function _createDebugMesh() {}
	  }, {
	    key: '_getTileURL',
	    value: function _getTileURL(urlParams) {
	      if (!urlParams.s) {
	        // Default to a random choice of a, b or c
	        urlParams.s = String.fromCharCode(97 + Math.floor(Math.random() * 3));
	      }
	
	      tileURLRegex.lastIndex = 0;
	      return this._path.replace(tileURLRegex, function (value, key) {
	        // Replace with paramter, otherwise keep existing value
	        return urlParams[key];
	      });
	    }
	
	    // Convert from quadcode to TMS tile coordinates
	  }, {
	    key: '_quadcodeToTile',
	    value: function _quadcodeToTile(quadcode) {
	      var x = 0;
	      var y = 0;
	      var z = quadcode.length;
	
	      for (var i = z; i > 0; i--) {
	        var mask = 1 << i - 1;
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
	  }, {
	    key: '_tileBoundsFromWGS84',
	    value: function _tileBoundsFromWGS84(boundsWGS84) {
	      var sw = this._layer._world.latLonToPoint((0, _geoLatLon.latLon)(boundsWGS84[1], boundsWGS84[0]));
	      var ne = this._layer._world.latLonToPoint((0, _geoLatLon.latLon)(boundsWGS84[3], boundsWGS84[2]));
	
	      return [sw.x, sw.y, ne.x, ne.y];
	    }
	
	    // Get tile bounds in WGS84 coordinates
	  }, {
	    key: '_tileBoundsWGS84',
	    value: function _tileBoundsWGS84(tile) {
	      var e = this._tile2lon(tile[0] + 1, tile[2]);
	      var w = this._tile2lon(tile[0], tile[2]);
	      var s = this._tile2lat(tile[1] + 1, tile[2]);
	      var n = this._tile2lat(tile[1], tile[2]);
	      return [w, s, e, n];
	    }
	  }, {
	    key: '_tile2lon',
	    value: function _tile2lon(x, z) {
	      return x / Math.pow(2, z) * 360 - 180;
	    }
	  }, {
	    key: '_tile2lat',
	    value: function _tile2lat(y, z) {
	      var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
	      return r2d * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
	    }
	  }, {
	    key: '_boundsToCenter',
	    value: function _boundsToCenter(bounds) {
	      var x = bounds[0] + (bounds[2] - bounds[0]) / 2;
	      var y = bounds[1] + (bounds[3] - bounds[1]) / 2;
	
	      return [x, y];
	    }
	  }, {
	    key: '_getSide',
	    value: function _getSide(bounds) {
	      return new _three2['default'].Vector3(bounds[0], 0, bounds[3]).sub(new _three2['default'].Vector3(bounds[0], 0, bounds[1])).length();
	    }
	  }]);
	
	  return Tile;
	})();
	
	exports['default'] = Tile;
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/* eslint-disable */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	BoxHelper = function (object) {
	
		var indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
		var positions = new Float32Array(8 * 3);
	
		var geometry = new _three2['default'].BufferGeometry();
		geometry.setIndex(new _three2['default'].BufferAttribute(indices, 1));
		geometry.addAttribute('position', new _three2['default'].BufferAttribute(positions, 3));
	
		_three2['default'].LineSegments.call(this, geometry, new _three2['default'].LineBasicMaterial({ linewidth: 2, color: 0xff0000 }));
	
		if (object !== undefined) {
	
			this.update(object);
		}
	};
	
	BoxHelper.prototype = Object.create(_three2['default'].LineSegments.prototype);
	BoxHelper.prototype.constructor = BoxHelper;
	
	BoxHelper.prototype.update = (function () {
	
		var box = new _three2['default'].Box3();
	
		return function (object) {
	
			box.setFromObject(object);
	
			if (box.isEmpty()) return;
	
			var min = box.min;
			var max = box.max;
	
			/*
	    5____4
	  1/___0/|
	  | 6__|_7
	  2/___3/
	  	0: max.x, max.y, max.z
	  1: min.x, max.y, max.z
	  2: min.x, min.y, max.z
	  3: max.x, min.y, max.z
	  4: max.x, max.y, min.z
	  5: min.x, max.y, min.z
	  6: min.x, min.y, min.z
	  7: max.x, min.y, min.z
	  */
	
			var position = this.geometry.attributes.position;
			var array = position.array;
	
			array[0] = max.x;array[1] = max.y;array[2] = max.z;
			array[3] = min.x;array[4] = max.y;array[5] = max.z;
			array[6] = min.x;array[7] = min.y;array[8] = max.z;
			array[9] = max.x;array[10] = min.y;array[11] = max.z;
			array[12] = max.x;array[13] = max.y;array[14] = min.z;
			array[15] = min.x;array[16] = max.y;array[17] = min.z;
			array[18] = min.x;array[19] = min.y;array[20] = min.z;
			array[21] = max.x;array[22] = min.y;array[23] = min.z;
	
			position.needsUpdate = true;
	
			this.geometry.computeBoundingSphere();
		};
	})();
	
	exports['default'] = BoxHelper;
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	exports['default'] = function (colour, skyboxTarget) {
	  var canvas = document.createElement('canvas');
	  canvas.width = 1;
	  canvas.height = 1;
	
	  var context = canvas.getContext('2d');
	  context.fillStyle = colour;
	  context.fillRect(0, 0, canvas.width, canvas.height);
	  // context.strokeStyle = '#D0D0CF';
	  // context.strokeRect(0, 0, canvas.width, canvas.height);
	
	  var texture = new _three2['default'].Texture(canvas);
	
	  // // Silky smooth images when tilted
	  // texture.magFilter = THREE.LinearFilter;
	  // texture.minFilter = THREE.LinearMipMapLinearFilter;
	  // //
	  // // // TODO: Set this to renderer.getMaxAnisotropy() / 4
	  // texture.anisotropy = 4;
	
	  // texture.wrapS = THREE.RepeatWrapping;
	  // texture.wrapT = THREE.RepeatWrapping;
	  // texture.repeat.set(segments, segments);
	
	  texture.needsUpdate = true;
	
	  var material;
	
	  if (!skyboxTarget) {
	    material = new _three2['default'].MeshBasicMaterial({
	      map: texture,
	      depthWrite: false
	    });
	  } else {
	    material = new _three2['default'].MeshStandardMaterial({
	      map: texture,
	      depthWrite: false
	    });
	    material.roughness = 1;
	    material.metalness = 0.1;
	    material.envMap = skyboxTarget;
	  }
	
	  return material;
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _TileLayer2 = __webpack_require__(56);
	
	var _TileLayer3 = _interopRequireDefault(_TileLayer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _GeoJSONTile = __webpack_require__(71);
	
	var _GeoJSONTile2 = _interopRequireDefault(_GeoJSONTile);
	
	var _lodashThrottle = __webpack_require__(22);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	// TODO: Offer on-the-fly slicing of static, non-tile-based GeoJSON files into a
	// tile grid using geojson-vt
	//
	// See: https://github.com/mapbox/geojson-vt
	
	// TODO: Make sure nothing is left behind in the heap after calling destroy()
	
	// TODO: Consider pausing per-frame output during movement so there's little to
	// no jank caused by previous tiles still processing
	
	// This tile layer only updates the quadtree after world movement has occurred
	//
	// Tiles from previous quadtree updates are updated and outputted every frame
	// (or at least every frame, throttled to some amount)
	//
	// This is because the complexity of TopoJSON tiles requires a lot of processing
	// and so makes movement janky if updates occur every frame – only updating
	// after movement means frame drops are less obvious due to heavy processing
	// occurring while the view is generally stationary
	//
	// The downside is that until new tiles are requested and outputted you will
	// see blank spaces as you orbit and move around
	//
	// An added benefit is that it dramatically reduces the number of tiles being
	// requested over a period of time and the time it takes to go from request to
	// screen output
	//
	// It may be possible to perform these updates per-frame once Web Worker
	// processing is added
	
	var GeoJSONTileLayer = (function (_TileLayer) {
	  _inherits(GeoJSONTileLayer, _TileLayer);
	
	  function GeoJSONTileLayer(path, options) {
	    _classCallCheck(this, GeoJSONTileLayer);
	
	    var defaults = {
	      maxLOD: 14,
	      distance: 30000,
	      workers: false
	    };
	
	    options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(GeoJSONTileLayer.prototype), 'constructor', this).call(this, options);
	
	    this.defaults = defaults;
	
	    this._path = path;
	  }
	
	  _createClass(GeoJSONTileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _get(Object.getPrototypeOf(GeoJSONTileLayer.prototype), '_onAdd', _this).call(_this, world).then(function () {
	          // Trigger initial quadtree calculation on the next frame
	          //
	          // TODO: This is a hack to ensure the camera is all set up - a better
	          // solution should be found
	          setTimeout(function () {
	            _this._calculateLOD();
	            _this._initEvents();
	          }, 0);
	
	          resolve(_this);
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      // Run LOD calculations based on render calls
	      //
	      // Throttled to 1 LOD calculation per 100ms
	      this._throttledWorldUpdate = (0, _lodashThrottle2['default'])(this._onWorldUpdate, 100);
	
	      this._world.on('preUpdate', this._throttledWorldUpdate, this);
	      this._world.on('move', this._onWorldMove, this);
	      this._world.on('controlsMove', this._onControlsMove, this);
	    }
	
	    // Update and output tiles each frame (throttled)
	  }, {
	    key: '_onWorldUpdate',
	    value: function _onWorldUpdate() {
	      if (this._pauseOutput || this._disableOutput) {
	        return;
	      }
	
	      this._outputTiles();
	    }
	
	    // Update tiles grid after world move, but don't output them
	  }, {
	    key: '_onWorldMove',
	    value: function _onWorldMove(latlon, point) {
	      if (this._disableOutput) {
	        return;
	      }
	
	      this._pauseOutput = false;
	      this._calculateLOD();
	    }
	
	    // Pause updates during control movement for less visual jank
	  }, {
	    key: '_onControlsMove',
	    value: function _onControlsMove() {
	      if (this._disableOutput) {
	        return;
	      }
	
	      this._pauseOutput = true;
	    }
	  }, {
	    key: '_createTile',
	    value: function _createTile(quadcode, layer) {
	      var newOptions = (0, _lodashAssign2['default'])({}, this.defaults, this._options, {
	        outputToScene: false
	      });
	
	      delete newOptions.attribution;
	
	      return new _GeoJSONTile2['default'](quadcode, this._path, layer, newOptions);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this._pauseOutput = true;
	      _get(Object.getPrototypeOf(GeoJSONTileLayer.prototype), 'hide', this).call(this);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this._pauseOutput = false;
	      _get(Object.getPrototypeOf(GeoJSONTileLayer.prototype), 'show', this).call(this);
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._world.off('preUpdate', this._throttledWorldUpdate);
	      this._world.off('move', this._onWorldMove);
	
	      this._throttledWorldUpdate = null;
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(GeoJSONTileLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return GeoJSONTileLayer;
	})(_TileLayer3['default']);
	
	exports['default'] = GeoJSONTileLayer;
	
	var noNew = function noNew(path, options) {
	  return new GeoJSONTileLayer(path, options);
	};
	
	// Initialise without requiring new keyword
	exports.geoJSONTileLayer = noNew;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Tile2 = __webpack_require__(67);
	
	var _Tile3 = _interopRequireDefault(_Tile2);
	
	var _GeoJSONLayer = __webpack_require__(72);
	
	var _GeoJSONWorkerLayer = __webpack_require__(87);
	
	var _vendorBoxHelper = __webpack_require__(68);
	
	var _vendorBoxHelper2 = _interopRequireDefault(_vendorBoxHelper);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _reqwest = __webpack_require__(73);
	
	var _reqwest2 = _interopRequireDefault(_reqwest);
	
	var _geoPoint = __webpack_require__(8);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	// import Offset from 'polygon-offset';
	
	var _utilGeoJSON = __webpack_require__(75);
	
	var _utilGeoJSON2 = _interopRequireDefault(_utilGeoJSON);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
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
	
	var GeoJSONTile = (function (_Tile) {
	  _inherits(GeoJSONTile, _Tile);
	
	  function GeoJSONTile(quadcode, path, layer, options) {
	    _classCallCheck(this, GeoJSONTile);
	
	    _get(Object.getPrototypeOf(GeoJSONTile.prototype), 'constructor', this).call(this, quadcode, path, layer);
	
	    this._defaultStyle = _utilGeoJSON2['default'].defaultStyle;
	
	    var defaults = {
	      workers: false,
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
	      style: _utilGeoJSON2['default'].defaultStyle,
	      keepFeatures: false
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    if (typeof options.style === 'function') {
	      _options.style = options.style;
	    } else {
	      _options.style = (0, _lodashAssign2['default'])({}, defaults.style, options.style);
	    }
	
	    this._options = _options;
	  }
	
	  // Request data for the tile
	
	  _createClass(GeoJSONTile, [{
	    key: 'requestTileAsync',
	    value: function requestTileAsync() {
	      var _this = this;
	
	      // Making this asynchronous really speeds up the LOD framerate
	      setTimeout(function () {
	        if (!_this._mesh) {
	          _this._mesh = _this._createMesh();
	          // this._shadowCanvas = this._createShadowCanvas();
	        }
	
	        _this._requestTile();
	      }, 0);
	    }
	
	    // TODO: Destroy GeoJSONLayer
	  }, {
	    key: 'destroy',
	    value: function destroy() {
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
	
	      _get(Object.getPrototypeOf(GeoJSONTile.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: '_createMesh',
	    value: function _createMesh() {
	      // Something went wrong and the tile
	      //
	      // Possibly removed by the cache before loaded
	      if (!this._center) {
	        return;
	      }
	
	      var mesh = new _three2['default'].Object3D();
	      // mesh.add(this._createDebugMesh());
	
	      return mesh;
	    }
	  }, {
	    key: '_createDebugMesh',
	    value: function _createDebugMesh() {
	      var canvas = document.createElement('canvas');
	      canvas.width = 256;
	      canvas.height = 256;
	
	      var context = canvas.getContext('2d');
	      context.font = 'Bold 20px Helvetica Neue, Verdana, Arial';
	      context.fillStyle = '#ff0000';
	      context.fillText(this._quadcode, 20, canvas.width / 2 - 5);
	      context.fillText(this._tile.toString(), 20, canvas.width / 2 + 25);
	
	      var texture = new _three2['default'].Texture(canvas);
	
	      // Silky smooth images when tilted
	      texture.magFilter = _three2['default'].LinearFilter;
	      texture.minFilter = _three2['default'].LinearMipMapLinearFilter;
	
	      // TODO: Set this to renderer.getMaxAnisotropy() / 4
	      texture.anisotropy = 4;
	
	      texture.needsUpdate = true;
	
	      var material = new _three2['default'].MeshBasicMaterial({
	        map: texture,
	        transparent: true,
	        depthWrite: false
	      });
	
	      var geom = new _three2['default'].PlaneBufferGeometry(this._side, this._side, 1);
	      var mesh = new _three2['default'].Mesh(geom, material);
	
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
	
	  }, {
	    key: '_requestTile',
	    value: function _requestTile() {
	      var _this2 = this;
	
	      var urlParams = {
	        x: this._tile[0],
	        y: this._tile[1],
	        z: this._tile[2]
	      };
	
	      var url = this._getTileURL(urlParams);
	
	      this._aborted = false;
	
	      if (!this._options.workers) {
	        this._request = (0, _reqwest2['default'])({
	          url: url,
	          type: 'json',
	          crossOrigin: true,
	          headers: this._options.headers
	        }).then(function (res) {
	          // Clear request reference
	          _this2._request = null;
	          _this2._processTileData(res);
	        })['catch'](function (err) {
	          // Clear request reference
	          _this2._request = null;
	        });
	      } else {
	        this._processTileData(url);
	      }
	    }
	  }, {
	    key: '_processTileData',
	    value: function _processTileData(data) {
	      var _this3 = this;
	
	      // console.time(this._tile);
	
	      var GeoJSONClass = !this._options.workers ? _GeoJSONLayer.geoJSONLayer : _GeoJSONWorkerLayer.geoJSONWorkerLayer;
	
	      // Using this creates a huge amount of memory due to the quantity of tiles
	      this._geojsonLayer = GeoJSONClass(data, this._options);
	      this._geojsonLayer.addTo(this._world).then(function () {
	        // TODO: This never seems to be called on worker layers. Find out why.
	        if (_this3.isAborted()) {
	          // this._geojsonLayer._aborted = true;
	          // this._geojsonLayer = null;
	          return;
	        }
	
	        // TODO: This is a hack to stop old tile meshes hanging around. Fix or
	        // move to somewhere more robust.
	        //
	        // Could potentially just overwrite mesh on first index each time
	        //
	        // This makes some worker tiles to not appear properly – showing the
	        // points mesh but not the polygon mesh, etc.
	        //
	        // Only do this for non-worker layers for now as it seems to cause issues
	        // with worker tiles showing for a moment and then disappearing forever
	        if (!_this3._options.workers) {
	          _this3.destroyMesh(_this3._mesh);
	        }
	
	        // TOSO: Work out if the picking mesh needs destroying here
	        // this.destroyMesh(this._pickingMesh);
	
	        _this3._mesh.add(_this3._geojsonLayer._object3D);
	        _this3._pickingMesh = _this3._geojsonLayer._pickingMesh;
	
	        // Free the GeoJSON memory as we don't need it
	        //
	        // TODO: This should probably be a method within GeoJSONLayer
	        if (_this3._geojsonLayer._geojson) {
	          _this3._geojsonLayer._geojson = null;
	        }
	
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
	
	        _this3._ready = true;
	        // console.timeEnd(this._tile);
	      })['catch'](function () {});
	    }
	  }, {
	    key: '_abortRequest',
	    value: function _abortRequest() {
	      if (!this._request && !this._options.workers || this._ready) {
	        return;
	      }
	
	      this._aborted = true;
	
	      if (this._request) {
	        this._request.abort();
	      }
	    }
	  }]);
	
	  return GeoJSONTile;
	})(_Tile3['default']);
	
	exports['default'] = GeoJSONTile;
	
	var noNew = function noNew(quadcode, path, layer, options) {
	  return new GeoJSONTile(quadcode, path, layer, options);
	};
	
	// Initialise without requiring new keyword
	exports.geoJSONTile = noNew;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: Consider adopting GeoJSON CSS
	// http://wiki.openstreetmap.org/wiki/Geojson_CSS
	
	// TODO: Allow interaction to be defined per-layer to save on resources
	//
	// For example, only allow polygons to be interactive via a polygonInteractive
	// option
	
	var _LayerGroup2 = __webpack_require__(54);
	
	var _LayerGroup3 = _interopRequireDefault(_LayerGroup2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _reqwest = __webpack_require__(73);
	
	var _reqwest2 = _interopRequireDefault(_reqwest);
	
	var _utilGeoJSON = __webpack_require__(75);
	
	var _utilGeoJSON2 = _interopRequireDefault(_utilGeoJSON);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _geometryPolygonLayer = __webpack_require__(84);
	
	var _geometryPolygonLayer2 = _interopRequireDefault(_geometryPolygonLayer);
	
	var _geometryPolylineLayer = __webpack_require__(85);
	
	var _geometryPolylineLayer2 = _interopRequireDefault(_geometryPolylineLayer);
	
	var _geometryPointLayer = __webpack_require__(86);
	
	var _geometryPointLayer2 = _interopRequireDefault(_geometryPointLayer);
	
	var GeoJSONLayer = (function (_LayerGroup) {
	  _inherits(GeoJSONLayer, _LayerGroup);
	
	  function GeoJSONLayer(geojson, options) {
	    _classCallCheck(this, GeoJSONLayer);
	
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
	      style: _utilGeoJSON2['default'].defaultStyle,
	      keepFeatures: true
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    if (typeof options.style === 'function') {
	      _options.style = options.style;
	    } else {
	      _options.style = (0, _lodashAssign2['default'])({}, defaults.style, options.style);
	    }
	
	    _get(Object.getPrototypeOf(GeoJSONLayer.prototype), 'constructor', this).call(this, _options);
	
	    this._geojson = geojson;
	  }
	
	  _createClass(GeoJSONLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
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
	        return this._requestData(this._geojson);
	      } else {
	        // Process and add GeoJSON to layer
	        return this._processData(this._geojson);
	      }
	    }
	  }, {
	    key: '_requestData',
	    value: function _requestData(url) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this._request = (0, _reqwest2['default'])({
	          url: url,
	          type: 'json',
	          crossOrigin: true
	        }).then(function (res) {
	          // Clear request reference
	          _this._request = null;
	          _this._processData(res).then(function () {
	            resolve(_this);
	          });
	        })['catch'](function (err) {
	          console.error(err);
	
	          // Clear request reference
	          _this._request = null;
	
	          reject(err);
	        });
	      });
	    }
	
	    // TODO: Wrap into a helper method so this isn't duplicated in the tiled
	    // GeoJSON output layer
	    //
	    // Need to be careful as to not make it impossible to fork this off into a
	    // worker script at a later stage
	  }, {
	    key: '_processData',
	    value: function _processData(data) {
	      var _this2 = this;
	
	      return new Promise(function (resolve) {
	        // Collects features into a single FeatureCollection
	        //
	        // Also converts TopoJSON to GeoJSON if instructed
	        _this2._geojson = _utilGeoJSON2['default'].collectFeatures(data, _this2._options.topojson);
	
	        // TODO: Check that GeoJSON is valid / usable
	
	        var features = _this2._geojson.features;
	
	        // Run filter, if provided
	        if (_this2._options.filter) {
	          features = _this2._geojson.features.filter(_this2._options.filter);
	        }
	
	        var defaults = {};
	
	        // Assume that a style won't be set per feature
	        var style = _this2._options.style;
	
	        var layerPromises = [];
	
	        var options;
	        features.forEach(function (feature) {
	          // Get per-feature style object, if provided
	          if (typeof _this2._options.style === 'function') {
	            style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, _this2._options.style(feature));
	          }
	
	          options = (0, _lodashAssign2['default'])({}, defaults, {
	            // If merging feature layers, stop them outputting themselves
	            // If not, let feature layers output themselves to the world
	            output: !_this2.isOutput(),
	            interactive: _this2._options.interactive,
	            style: style
	          });
	
	          var layer = _this2._featureToLayer(feature, options);
	
	          if (!layer) {
	            return;
	          }
	
	          // Sometimes you don't want to store a reference to the feature
	          //
	          // For example, to save memory when being used by tile layers
	          if (_this2._options.keepFeatures) {
	            layer.feature = feature;
	          }
	
	          // If defined, call a function for each feature
	          //
	          // This is commonly used for adding event listeners from the user script
	          if (_this2._options.onEachFeature) {
	            _this2._options.onEachFeature(feature, layer);
	          }
	
	          // TODO: Make this a promise array and only continue on completion
	          layerPromises.push(_this2.addLayer(layer));
	        });
	
	        Promise.all(layerPromises).then(function (results) {
	          // If merging layers do that now, otherwise skip as the geometry layers
	          // should have already outputted themselves
	          if (!_this2.isOutput()) {
	            resolve();
	            return;
	          }
	
	          // From here on we can assume that we want to merge the layers
	
	          var polygonAttributes = [];
	          var polygonOutlineAttributes = [];
	          var polygonAttributeLengths = {
	            positions: 3,
	            normals: 3,
	            colors: 3
	          };
	          var polygonFlat = true;
	
	          var polylineAttributes = [];
	          var polylineAttributeLengths = {
	            positions: 3,
	            colors: 3
	          };
	          var polylineFlat = true;
	
	          var pointAttributes = [];
	          var pointAttributeLengths = {
	            positions: 3,
	            normals: 3,
	            colors: 3
	          };
	          var pointFlat = true;
	
	          _this2._layers.forEach(function (layer) {
	            if (layer instanceof _geometryPolygonLayer2['default']) {
	              polygonAttributes.push(layer.getBufferAttributes());
	
	              var outlineBufferAttributes = layer.getOutlineBufferAttributes();
	              if (outlineBufferAttributes) {
	                polygonOutlineAttributes.push(outlineBufferAttributes);
	              }
	
	              if (polygonFlat && !layer.isFlat()) {
	                polygonFlat = false;
	              }
	
	              if (_this2._options.interactive) {
	                polygonAttributeLengths.pickingIds = 1;
	              }
	            } else if (layer instanceof _geometryPolylineLayer2['default']) {
	              polylineAttributes.push(layer.getBufferAttributes());
	
	              if (polylineFlat && !layer.isFlat()) {
	                polylineFlat = false;
	              }
	
	              if (_this2._options.interactive) {
	                polylineAttributeLengths.pickingIds = 1;
	              }
	            } else if (layer instanceof _geometryPointLayer2['default']) {
	              pointAttributes.push(layer.getBufferAttributes());
	
	              if (pointFlat && !layer.isFlat()) {
	                pointFlat = false;
	              }
	
	              if (_this2._options.interactive) {
	                pointAttributeLengths.pickingIds = 1;
	              }
	            }
	          });
	
	          var style;
	
	          if (polygonAttributes.length > 0) {
	            var mergedPolygonAttributes = _utilBuffer2['default'].mergeAttributes(polygonAttributes);
	
	            var mergedPolygonOutlineAttributes;
	            if (polygonOutlineAttributes.length > 0) {
	              mergedPolygonOutlineAttributes = _utilBuffer2['default'].mergeAttributes(polygonOutlineAttributes);
	            }
	
	            style = typeof _this2._options.style === 'function' ? _this2._options.style(_this2._geojson.features[0]) : _this2._options.style;
	            style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	            _this2._setPolygonMesh(mergedPolygonAttributes, polygonAttributeLengths, style, polygonFlat).then(function (result) {
	              _this2._polygonMesh = result.mesh;
	              _this2.add(_this2._polygonMesh);
	
	              if (mergedPolygonOutlineAttributes) {
	                style = typeof _this2._options.style === 'function' ? _this2._options.style(_this2._geojson.features[0]) : _this2._options.style;
	                style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	                if (style.outlineRenderOrder !== undefined) {
	                  style.lineRenderOrder = style.outlineRenderOrder;
	                } else {
	                  style.lineRenderOrder = style.renderOrder ? style.renderOrder + 1 : 4;
	                }
	
	                if (style.outlineWidth) {
	                  style.lineWidth = style.outlineWidth;
	                }
	
	                _this2._setPolylineMesh(mergedPolygonOutlineAttributes, polylineAttributeLengths, style, true).then(function (result) {
	                  _this2.add(result.mesh);
	                });
	              }
	
	              if (result.pickingMesh) {
	                _this2._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          if (polylineAttributes.length > 0) {
	            var mergedPolylineAttributes = _utilBuffer2['default'].mergeAttributes(polylineAttributes);
	
	            style = typeof _this2._options.style === 'function' ? _this2._options.style(_this2._geojson.features[0]) : _this2._options.style;
	            style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	            _this2._setPolylineMesh(mergedPolylineAttributes, polylineAttributeLengths, style, polylineFlat).then(function (result) {
	              _this2._polylineMesh = result.mesh;
	              _this2.add(_this2._polylineMesh);
	
	              if (result.pickingMesh) {
	                _this2._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          if (pointAttributes.length > 0) {
	            var mergedPointAttributes = _utilBuffer2['default'].mergeAttributes(pointAttributes);
	
	            style = typeof _this2._options.style === 'function' ? _this2._options.style(_this2._geojson.features[0]) : _this2._options.style;
	            style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	            _this2._setPointMesh(mergedPointAttributes, pointAttributeLengths, style, pointFlat).then(function (result) {
	              _this2._pointMesh = result.mesh;
	              _this2.add(_this2._pointMesh);
	
	              if (result.pickingMesh) {
	                _this2._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          // Clean up layers
	          //
	          // TODO: Are there ever situations where the unmerged buffer attributes
	          // and coordinates would still be required?
	          _this2._layers.forEach(function (layer) {
	            layer.clearBufferAttributes();
	            layer.clearCoordinates();
	          });
	
	          resolve();
	        });
	      });
	    }
	
	    // Create and store mesh from buffer attributes
	    //
	    // TODO: Probably remove this and call static method directly as it's just a proxy
	  }, {
	    key: '_setPolygonMesh',
	    value: function _setPolygonMesh(attributes, attributeLengths, style, flat) {
	      return _geometryPolygonLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options, this._world._environment._skybox);
	    }
	  }, {
	    key: '_setPolylineMesh',
	    value: function _setPolylineMesh(attributes, attributeLengths, style, flat) {
	      return _geometryPolylineLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options);
	    }
	  }, {
	    key: '_setPointMesh',
	    value: function _setPointMesh(attributes, attributeLengths, style, flat) {
	      return _geometryPointLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options);
	    }
	
	    // TODO: Support all GeoJSON geometry types
	  }, {
	    key: '_featureToLayer',
	    value: function _featureToLayer(feature, options) {
	      var geometry = feature.geometry;
	      var coordinates = geometry.coordinates ? geometry.coordinates : null;
	
	      if (!coordinates || !geometry) {
	        return;
	      }
	
	      if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
	        // Get material instance to use for polygon, if provided
	        if (typeof this._options.polygonMaterial === 'function') {
	          options.polygonMaterial = this._options.polygonMaterial(feature);
	        }
	
	        if (typeof this._options.onPolygonMesh === 'function') {
	          options.onPolygonMesh = this._options.onPolygonMesh;
	        }
	
	        // Pass onBufferAttributes callback, if defined
	        if (typeof this._options.onPolygonBufferAttributes === 'function') {
	          options.onBufferAttributes = this._options.onPolygonBufferAttributes;
	        }
	
	        return new _geometryPolygonLayer2['default'](coordinates, options);
	      }
	
	      if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
	        // Get material instance to use for line, if provided
	        if (typeof this._options.lineMaterial === 'function') {
	          options.lineMaterial = this._options.lineMaterial(feature);
	        }
	
	        if (typeof this._options.onPolylineMesh === 'function') {
	          options.onPolylineMesh = this._options.onPolylineMesh;
	        }
	
	        // Pass onBufferAttributes callback, if defined
	        if (typeof this._options.onPolylineBufferAttributes === 'function') {
	          options.onBufferAttributes = this._options.onPolylineBufferAttributes;
	        }
	
	        return new _geometryPolylineLayer2['default'](coordinates, options);
	      }
	
	      if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
	        // Get geometry object to use for point, if provided
	        if (typeof this._options.pointGeometry === 'function') {
	          options.pointGeometry = this._options.pointGeometry(feature);
	        }
	
	        // Get material instance to use for point, if provided
	        if (typeof this._options.pointMaterial === 'function') {
	          options.pointMaterial = this._options.pointMaterial(feature);
	        }
	
	        if (typeof this._options.onPointMesh === 'function') {
	          options.onPointMesh = this._options.onPointMesh;
	        }
	
	        return new _geometryPointLayer2['default'](coordinates, options);
	      }
	    }
	  }, {
	    key: '_abortRequest',
	    value: function _abortRequest() {
	      if (!this._request) {
	        return;
	      }
	
	      this._request.abort();
	    }
	
	    // Destroy the layers and remove them from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
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
	      _get(Object.getPrototypeOf(GeoJSONLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return GeoJSONLayer;
	})(_LayerGroup3['default']);
	
	exports['default'] = GeoJSONLayer;
	
	var noNew = function noNew(geojson, options) {
	  return new GeoJSONLayer(geojson, options);
	};
	
	exports.geoJSONLayer = noNew;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * Reqwest! A general purpose XHR connection manager
	  * license MIT (c) Dustin Diaz 2015
	  * https://github.com/ded/reqwest
	  */
	
	!function (name, context, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else context[name] = definition()
	}('reqwest', this, function () {
	
	  var context = this
	
	  if ('window' in context) {
	    var doc = document
	      , byTag = 'getElementsByTagName'
	      , head = doc[byTag]('head')[0]
	  } else {
	    var XHR2
	    try {
	      XHR2 = __webpack_require__(74)
	    } catch (ex) {
	      throw new Error('Peer dependency `xhr2` required! Please npm install xhr2')
	    }
	  }
	
	
	  var httpsRe = /^http/
	    , protocolRe = /(^\w+):\/\//
	    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	    , readyState = 'readyState'
	    , contentType = 'Content-Type'
	    , requestedWith = 'X-Requested-With'
	    , uniqid = 0
	    , callbackPrefix = 'reqwest_' + (+new Date())
	    , lastValue // data stored by the most recent JSONP callback
	    , xmlHttpRequest = 'XMLHttpRequest'
	    , xDomainRequest = 'XDomainRequest'
	    , noop = function () {}
	
	    , isArray = typeof Array.isArray == 'function'
	        ? Array.isArray
	        : function (a) {
	            return a instanceof Array
	          }
	
	    , defaultHeaders = {
	          'contentType': 'application/x-www-form-urlencoded'
	        , 'requestedWith': xmlHttpRequest
	        , 'accept': {
	              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
	            , 'xml':  'application/xml, text/xml'
	            , 'html': 'text/html'
	            , 'text': 'text/plain'
	            , 'json': 'application/json, text/javascript'
	            , 'js':   'application/javascript, text/javascript'
	          }
	      }
	
	    , xhr = function(o) {
	        // is it x-domain
	        if (o['crossOrigin'] === true) {
	          var xhr = context[xmlHttpRequest] ? new XMLHttpRequest() : null
	          if (xhr && 'withCredentials' in xhr) {
	            return xhr
	          } else if (context[xDomainRequest]) {
	            return new XDomainRequest()
	          } else {
	            throw new Error('Browser does not support cross-origin requests')
	          }
	        } else if (context[xmlHttpRequest]) {
	          return new XMLHttpRequest()
	        } else if (XHR2) {
	          return new XHR2()
	        } else {
	          return new ActiveXObject('Microsoft.XMLHTTP')
	        }
	      }
	    , globalSetupOptions = {
	        dataFilter: function (data) {
	          return data
	        }
	      }
	
	  function succeed(r) {
	    var protocol = protocolRe.exec(r.url)
	    protocol = (protocol && protocol[1]) || context.location.protocol
	    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response
	  }
	
	  function handleReadyState(r, success, error) {
	    return function () {
	      // use _aborted to mitigate against IE err c00c023f
	      // (can't read props on aborted request objects)
	      if (r._aborted) return error(r.request)
	      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
	      if (r.request && r.request[readyState] == 4) {
	        r.request.onreadystatechange = noop
	        if (succeed(r)) success(r.request)
	        else
	          error(r.request)
	      }
	    }
	  }
	
	  function setHeaders(http, o) {
	    var headers = o['headers'] || {}
	      , h
	
	    headers['Accept'] = headers['Accept']
	      || defaultHeaders['accept'][o['type']]
	      || defaultHeaders['accept']['*']
	
	    var isAFormData = typeof FormData !== 'undefined' && (o['data'] instanceof FormData);
	    // breaks cross-origin requests with legacy browsers
	    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
	    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
	    for (h in headers)
	      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
	  }
	
	  function setCredentials(http, o) {
	    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
	      http.withCredentials = !!o['withCredentials']
	    }
	  }
	
	  function generalCallback(data) {
	    lastValue = data
	  }
	
	  function urlappend (url, s) {
	    return url + (/\?/.test(url) ? '&' : '?') + s
	  }
	
	  function handleJsonp(o, fn, err, url) {
	    var reqId = uniqid++
	      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
	      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
	      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
	      , match = url.match(cbreg)
	      , script = doc.createElement('script')
	      , loaded = 0
	      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1
	
	    if (match) {
	      if (match[3] === '?') {
	        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
	      } else {
	        cbval = match[3] // provided callback func name
	      }
	    } else {
	      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
	    }
	
	    context[cbval] = generalCallback
	
	    script.type = 'text/javascript'
	    script.src = url
	    script.async = true
	    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
	      // need this for IE due to out-of-order onreadystatechange(), binding script
	      // execution to an event listener gives us control over when the script
	      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	      script.htmlFor = script.id = '_reqwest_' + reqId
	    }
	
	    script.onload = script.onreadystatechange = function () {
	      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
	        return false
	      }
	      script.onload = script.onreadystatechange = null
	      script.onclick && script.onclick()
	      // Call the user callback with the last value stored and clean up values and scripts.
	      fn(lastValue)
	      lastValue = undefined
	      head.removeChild(script)
	      loaded = 1
	    }
	
	    // Add the script to the DOM head
	    head.appendChild(script)
	
	    // Enable JSONP timeout
	    return {
	      abort: function () {
	        script.onload = script.onreadystatechange = null
	        err({}, 'Request is aborted: timeout', {})
	        lastValue = undefined
	        head.removeChild(script)
	        loaded = 1
	      }
	    }
	  }
	
	  function getRequest(fn, err) {
	    var o = this.o
	      , method = (o['method'] || 'GET').toUpperCase()
	      , url = typeof o === 'string' ? o : o['url']
	      // convert non-string objects to query-string form unless o['processData'] is false
	      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
	        ? reqwest.toQueryString(o['data'])
	        : (o['data'] || null)
	      , http
	      , sendWait = false
	
	    // if we're working on a GET request and we have data then we should append
	    // query string to end of URL and not post data
	    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
	      url = urlappend(url, data)
	      data = null
	    }
	
	    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)
	
	    // get the xhr from the factory if passed
	    // if the factory returns null, fall-back to ours
	    http = (o.xhr && o.xhr(o)) || xhr(o)
	
	    http.open(method, url, o['async'] === false ? false : true)
	    setHeaders(http, o)
	    setCredentials(http, o)
	    if (context[xDomainRequest] && http instanceof context[xDomainRequest]) {
	        http.onload = fn
	        http.onerror = err
	        // NOTE: see
	        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
	        http.onprogress = function() {}
	        sendWait = true
	    } else {
	      http.onreadystatechange = handleReadyState(this, fn, err)
	    }
	    o['before'] && o['before'](http)
	    if (sendWait) {
	      setTimeout(function () {
	        http.send(data)
	      }, 200)
	    } else {
	      http.send(data)
	    }
	    return http
	  }
	
	  function Reqwest(o, fn) {
	    this.o = o
	    this.fn = fn
	
	    init.apply(this, arguments)
	  }
	
	  function setType(header) {
	    // json, javascript, text/plain, text/html, xml
	    if (header === null) return undefined; //In case of no content-type.
	    if (header.match('json')) return 'json'
	    if (header.match('javascript')) return 'js'
	    if (header.match('text')) return 'html'
	    if (header.match('xml')) return 'xml'
	  }
	
	  function init(o, fn) {
	
	    this.url = typeof o == 'string' ? o : o['url']
	    this.timeout = null
	
	    // whether request has been fulfilled for purpose
	    // of tracking the Promises
	    this._fulfilled = false
	    // success handlers
	    this._successHandler = function(){}
	    this._fulfillmentHandlers = []
	    // error handlers
	    this._errorHandlers = []
	    // complete (both success and fail) handlers
	    this._completeHandlers = []
	    this._erred = false
	    this._responseArgs = {}
	
	    var self = this
	
	    fn = fn || function () {}
	
	    if (o['timeout']) {
	      this.timeout = setTimeout(function () {
	        timedOut()
	      }, o['timeout'])
	    }
	
	    if (o['success']) {
	      this._successHandler = function () {
	        o['success'].apply(o, arguments)
	      }
	    }
	
	    if (o['error']) {
	      this._errorHandlers.push(function () {
	        o['error'].apply(o, arguments)
	      })
	    }
	
	    if (o['complete']) {
	      this._completeHandlers.push(function () {
	        o['complete'].apply(o, arguments)
	      })
	    }
	
	    function complete (resp) {
	      o['timeout'] && clearTimeout(self.timeout)
	      self.timeout = null
	      while (self._completeHandlers.length > 0) {
	        self._completeHandlers.shift()(resp)
	      }
	    }
	
	    function success (resp) {
	      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
	      resp = (type !== 'jsonp') ? self.request : resp
	      // use global data filter on response text
	      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
	        , r = filteredResponse
	      try {
	        resp.responseText = r
	      } catch (e) {
	        // can't assign this in IE<=8, just ignore
	      }
	      if (r) {
	        switch (type) {
	        case 'json':
	          try {
	            resp = context.JSON ? context.JSON.parse(r) : eval('(' + r + ')')
	          } catch (err) {
	            return error(resp, 'Could not parse JSON in response', err)
	          }
	          break
	        case 'js':
	          resp = eval(r)
	          break
	        case 'html':
	          resp = r
	          break
	        case 'xml':
	          resp = resp.responseXML
	              && resp.responseXML.parseError // IE trololo
	              && resp.responseXML.parseError.errorCode
	              && resp.responseXML.parseError.reason
	            ? null
	            : resp.responseXML
	          break
	        }
	      }
	
	      self._responseArgs.resp = resp
	      self._fulfilled = true
	      fn(resp)
	      self._successHandler(resp)
	      while (self._fulfillmentHandlers.length > 0) {
	        resp = self._fulfillmentHandlers.shift()(resp)
	      }
	
	      complete(resp)
	    }
	
	    function timedOut() {
	      self._timedOut = true
	      self.request.abort()
	    }
	
	    function error(resp, msg, t) {
	      resp = self.request
	      self._responseArgs.resp = resp
	      self._responseArgs.msg = msg
	      self._responseArgs.t = t
	      self._erred = true
	      while (self._errorHandlers.length > 0) {
	        self._errorHandlers.shift()(resp, msg, t)
	      }
	      complete(resp)
	    }
	
	    this.request = getRequest.call(this, success, error)
	  }
	
	  Reqwest.prototype = {
	    abort: function () {
	      this._aborted = true
	      this.request.abort()
	    }
	
	  , retry: function () {
	      init.call(this, this.o, this.fn)
	    }
	
	    /**
	     * Small deviation from the Promises A CommonJs specification
	     * http://wiki.commonjs.org/wiki/Promises/A
	     */
	
	    /**
	     * `then` will execute upon successful requests
	     */
	  , then: function (success, fail) {
	      success = success || function () {}
	      fail = fail || function () {}
	      if (this._fulfilled) {
	        this._responseArgs.resp = success(this._responseArgs.resp)
	      } else if (this._erred) {
	        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
	      } else {
	        this._fulfillmentHandlers.push(success)
	        this._errorHandlers.push(fail)
	      }
	      return this
	    }
	
	    /**
	     * `always` will execute whether the request succeeds or fails
	     */
	  , always: function (fn) {
	      if (this._fulfilled || this._erred) {
	        fn(this._responseArgs.resp)
	      } else {
	        this._completeHandlers.push(fn)
	      }
	      return this
	    }
	
	    /**
	     * `fail` will execute when the request fails
	     */
	  , fail: function (fn) {
	      if (this._erred) {
	        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
	      } else {
	        this._errorHandlers.push(fn)
	      }
	      return this
	    }
	  , 'catch': function (fn) {
	      return this.fail(fn)
	    }
	  }
	
	  function reqwest(o, fn) {
	    return new Reqwest(o, fn)
	  }
	
	  // normalize newline variants according to spec -> CRLF
	  function normalize(s) {
	    return s ? s.replace(/\r?\n/g, '\r\n') : ''
	  }
	
	  function serial(el, cb) {
	    var n = el.name
	      , t = el.tagName.toLowerCase()
	      , optCb = function (o) {
	          // IE gives value="" even where there is no value attribute
	          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
	          if (o && !o['disabled'])
	            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
	        }
	      , ch, ra, val, i
	
	    // don't serialize elements that are disabled or without a name
	    if (el.disabled || !n) return
	
	    switch (t) {
	    case 'input':
	      if (!/reset|button|image|file/i.test(el.type)) {
	        ch = /checkbox/i.test(el.type)
	        ra = /radio/i.test(el.type)
	        val = el.value
	        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
	        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
	      }
	      break
	    case 'textarea':
	      cb(n, normalize(el.value))
	      break
	    case 'select':
	      if (el.type.toLowerCase() === 'select-one') {
	        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
	      } else {
	        for (i = 0; el.length && i < el.length; i++) {
	          el.options[i].selected && optCb(el.options[i])
	        }
	      }
	      break
	    }
	  }
	
	  // collect up all form elements found from the passed argument elements all
	  // the way down to child elements; pass a '<form>' or form fields.
	  // called with 'this'=callback to use for serial() on each element
	  function eachFormElement() {
	    var cb = this
	      , e, i
	      , serializeSubtags = function (e, tags) {
	          var i, j, fa
	          for (i = 0; i < tags.length; i++) {
	            fa = e[byTag](tags[i])
	            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
	          }
	        }
	
	    for (i = 0; i < arguments.length; i++) {
	      e = arguments[i]
	      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
	      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
	    }
	  }
	
	  // standard query string style serialization
	  function serializeQueryString() {
	    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
	  }
	
	  // { 'name': 'value', ... } style serialization
	  function serializeHash() {
	    var hash = {}
	    eachFormElement.apply(function (name, value) {
	      if (name in hash) {
	        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
	        hash[name].push(value)
	      } else hash[name] = value
	    }, arguments)
	    return hash
	  }
	
	  // [ { name: 'name', value: 'value' }, ... ] style serialization
	  reqwest.serializeArray = function () {
	    var arr = []
	    eachFormElement.apply(function (name, value) {
	      arr.push({name: name, value: value})
	    }, arguments)
	    return arr
	  }
	
	  reqwest.serialize = function () {
	    if (arguments.length === 0) return ''
	    var opt, fn
	      , args = Array.prototype.slice.call(arguments, 0)
	
	    opt = args.pop()
	    opt && opt.nodeType && args.push(opt) && (opt = null)
	    opt && (opt = opt.type)
	
	    if (opt == 'map') fn = serializeHash
	    else if (opt == 'array') fn = reqwest.serializeArray
	    else fn = serializeQueryString
	
	    return fn.apply(null, args)
	  }
	
	  reqwest.toQueryString = function (o, trad) {
	    var prefix, i
	      , traditional = trad || false
	      , s = []
	      , enc = encodeURIComponent
	      , add = function (key, value) {
	          // If value is a function, invoke it and return its value
	          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
	          s[s.length] = enc(key) + '=' + enc(value)
	        }
	    // If an array was passed in, assume that it is an array of form elements.
	    if (isArray(o)) {
	      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
	    } else {
	      // If traditional, encode the "old" way (the way 1.3.2 or older
	      // did it), otherwise encode params recursively.
	      for (prefix in o) {
	        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
	      }
	    }
	
	    // spaces should be + according to spec
	    return s.join('&').replace(/%20/g, '+')
	  }
	
	  function buildParams(prefix, obj, traditional, add) {
	    var name, i, v
	      , rbracket = /\[\]$/
	
	    if (isArray(obj)) {
	      // Serialize array item.
	      for (i = 0; obj && i < obj.length; i++) {
	        v = obj[i]
	        if (traditional || rbracket.test(prefix)) {
	          // Treat each array item as a scalar.
	          add(prefix, v)
	        } else {
	          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
	        }
	      }
	    } else if (obj && obj.toString() === '[object Object]') {
	      // Serialize object item.
	      for (name in obj) {
	        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
	      }
	
	    } else {
	      // Serialize scalar item.
	      add(prefix, obj)
	    }
	  }
	
	  reqwest.getcallbackPrefix = function () {
	    return callbackPrefix
	  }
	
	  // jQuery and Zepto compatibility, differences can be remapped here so you can call
	  // .ajax.compat(options, callback)
	  reqwest.compat = function (o, fn) {
	    if (o) {
	      o['type'] && (o['method'] = o['type']) && delete o['type']
	      o['dataType'] && (o['type'] = o['dataType'])
	      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
	      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
	    }
	    return new Reqwest(o, fn)
	  }
	
	  reqwest.ajaxSetup = function (options) {
	    options = options || {}
	    for (var k in options) {
	      globalSetupOptions[k] = options[k]
	    }
	  }
	
	  return reqwest
	});


/***/ },
/* 74 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * GeoJSON helpers for handling data and generating objects
	 */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _topojson2 = __webpack_require__(76);
	
	var topojson = _interopRequireWildcard(_topojson2);
	
	var _geojsonMerge = __webpack_require__(77);
	
	var _geojsonMerge2 = _interopRequireDefault(_geojsonMerge);
	
	var _earcut = __webpack_require__(79);
	
	var _earcut2 = _interopRequireDefault(_earcut);
	
	var _extrudePolygon = __webpack_require__(80);
	
	var _extrudePolygon2 = _interopRequireDefault(_extrudePolygon);
	
	// TODO: Make it so height can be per-coordinate / point but connected together
	// as a linestring (eg. GPS points with an elevation at each point)
	//
	// This isn't really valid GeoJSON so perhaps something best left to an external
	// component for now, until a better approach can be considered
	//
	// See: http://lists.geojson.org/pipermail/geojson-geojson.org/2009-June/000489.html
	
	// Light and dark colours used for poor-mans AO gradient on object sides
	var light = new _three2['default'].Color(0xffffff);
	var shadow = new _three2['default'].Color(0x666666);
	
	var GeoJSON = (function () {
	  var defaultStyle = {
	    color: '#ffffff',
	    outline: false,
	    outlineColor: '#000000',
	    transparent: false,
	    opacity: 1,
	    blending: _three2['default'].NormalBlending,
	    height: 0,
	    lineOpacity: 1,
	    lineTransparent: false,
	    lineColor: '#ffffff',
	    lineWidth: 1,
	    lineBlending: _three2['default'].NormalBlending
	  };
	
	  // Attempts to merge together multiple GeoJSON Features or FeatureCollections
	  // into a single FeatureCollection
	  var collectFeatures = function collectFeatures(data, _topojson) {
	    var collections = [];
	
	    if (_topojson) {
	      // TODO: Allow TopoJSON objects to be overridden as an option
	
	      // If not overridden, merge all features from all objects
	      for (var tk in data.objects) {
	        collections.push(topojson.feature(data, data.objects[tk]));
	      }
	
	      return (0, _geojsonMerge2['default'])(collections);
	    } else {
	      // If root doesn't have a type then let's see if there are features in the
	      // next step down
	      if (!data.type) {
	        // TODO: Allow GeoJSON objects to be overridden as an option
	
	        // If not overridden, merge all features from all objects
	        for (var gk in data) {
	          if (!data[gk].type) {
	            continue;
	          }
	
	          collections.push(data[gk]);
	        }
	
	        return (0, _geojsonMerge2['default'])(collections);
	      } else if (Array.isArray(data)) {
	        return (0, _geojsonMerge2['default'])(data);
	      } else {
	        return data;
	      }
	    }
	  };
	
	  // TODO: This is only used by GeoJSONTile so either roll it into that or
	  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
	  var lineStringAttributes = function lineStringAttributes(coordinates, colour, height) {
	    var _coords = [];
	    var _colours = [];
	
	    var nextCoord;
	
	    // Connect coordinate with the next to make a pair
	    //
	    // LineSegments requires pairs of vertices so repeat the last point if
	    // there's an odd number of vertices
	    coordinates.forEach(function (coordinate, index) {
	      _colours.push([colour.r, colour.g, colour.b]);
	      _coords.push([coordinate[0], height, coordinate[1]]);
	
	      nextCoord = coordinates[index + 1] ? coordinates[index + 1] : coordinate;
	
	      _colours.push([colour.r, colour.g, colour.b]);
	      _coords.push([nextCoord[0], height, nextCoord[1]]);
	    });
	
	    return {
	      vertices: _coords,
	      colours: _colours
	    };
	  };
	
	  // TODO: This is only used by GeoJSONTile so either roll it into that or
	  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
	  var multiLineStringAttributes = function multiLineStringAttributes(coordinates, colour, height) {
	    var _coords = [];
	    var _colours = [];
	
	    var result;
	    coordinates.forEach(function (coordinate) {
	      result = lineStringAttributes(coordinate, colour, height);
	
	      result.vertices.forEach(function (coord) {
	        _coords.push(coord);
	      });
	
	      result.colours.forEach(function (colour) {
	        _colours.push(colour);
	      });
	    });
	
	    return {
	      vertices: _coords,
	      colours: _colours
	    };
	  };
	
	  // TODO: This is only used by GeoJSONTile so either roll it into that or
	  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
	  var polygonAttributes = function polygonAttributes(coordinates, colour, height) {
	    var earcutData = _toEarcut(coordinates);
	
	    var faces = _triangulate(earcutData.vertices, earcutData.holes, earcutData.dimensions);
	
	    var groupedVertices = [];
	    for (i = 0, il = earcutData.vertices.length; i < il; i += earcutData.dimensions) {
	      groupedVertices.push(earcutData.vertices.slice(i, i + earcutData.dimensions));
	    }
	
	    var extruded = (0, _extrudePolygon2['default'])(groupedVertices, faces, {
	      bottom: 0,
	      top: height
	    });
	
	    var topColor = colour.clone().multiply(light);
	    var bottomColor = colour.clone().multiply(shadow);
	
	    var _vertices = extruded.positions;
	    var _faces = [];
	    var _colours = [];
	
	    var _colour;
	    extruded.top.forEach(function (face, fi) {
	      _colour = [];
	
	      _colour.push([colour.r, colour.g, colour.b]);
	      _colour.push([colour.r, colour.g, colour.b]);
	      _colour.push([colour.r, colour.g, colour.b]);
	
	      _faces.push(face);
	      _colours.push(_colour);
	    });
	
	    var allFlat = true;
	
	    if (extruded.sides) {
	      if (allFlat) {
	        allFlat = false;
	      }
	
	      // Set up colours for every vertex with poor-mans AO on the sides
	      extruded.sides.forEach(function (face, fi) {
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
	
	    return {
	      vertices: _vertices,
	      faces: _faces,
	      colours: _colours,
	      flat: allFlat
	    };
	  };
	
	  // TODO: This is only used by GeoJSONTile so either roll it into that or
	  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
	  var _toEarcut = function _toEarcut(data) {
	    var dim = data[0][0].length;
	    var result = { vertices: [], holes: [], dimensions: dim };
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
	  };
	
	  // TODO: This is only used by GeoJSONTile so either roll it into that or
	  // update GeoJSONTile to use the new GeoJSONLayer or geometry layers
	  var _triangulate = function _triangulate(contour, holes, dim) {
	    // console.time('earcut');
	
	    var faces = (0, _earcut2['default'])(contour, holes, dim);
	    var result = [];
	
	    for (i = 0, il = faces.length; i < il; i += 3) {
	      result.push(faces.slice(i, i + 3));
	    }
	
	    // console.timeEnd('earcut');
	
	    return result;
	  };
	
	  return {
	    defaultStyle: defaultStyle,
	    collectFeatures: collectFeatures,
	    lineStringAttributes: lineStringAttributes,
	    multiLineStringAttributes: multiLineStringAttributes,
	    polygonAttributes: polygonAttributes
	  };
	})();
	
	exports['default'] = GeoJSON;
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.topojson = global.topojson || {})));
	}(this, (function (exports) { 'use strict';
	
	function noop() {}
	
	function transformAbsolute(transform) {
	  if (!transform) return noop;
	  var x0,
	      y0,
	      kx = transform.scale[0],
	      ky = transform.scale[1],
	      dx = transform.translate[0],
	      dy = transform.translate[1];
	  return function(point, i) {
	    if (!i) x0 = y0 = 0;
	    point[0] = (x0 += point[0]) * kx + dx;
	    point[1] = (y0 += point[1]) * ky + dy;
	  };
	}
	
	function transformRelative(transform) {
	  if (!transform) return noop;
	  var x0,
	      y0,
	      kx = transform.scale[0],
	      ky = transform.scale[1],
	      dx = transform.translate[0],
	      dy = transform.translate[1];
	  return function(point, i) {
	    if (!i) x0 = y0 = 0;
	    var x1 = Math.round((point[0] - dx) / kx),
	        y1 = Math.round((point[1] - dy) / ky);
	    point[0] = x1 - x0;
	    point[1] = y1 - y0;
	    x0 = x1;
	    y0 = y1;
	  };
	}
	
	function reverse(array, n) {
	  var t, j = array.length, i = j - n;
	  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
	}
	
	function bisect(a, x) {
	  var lo = 0, hi = a.length;
	  while (lo < hi) {
	    var mid = lo + hi >>> 1;
	    if (a[mid] < x) lo = mid + 1;
	    else hi = mid;
	  }
	  return lo;
	}
	
	function feature(topology, o) {
	  return o.type === "GeometryCollection" ? {
	    type: "FeatureCollection",
	    features: o.geometries.map(function(o) { return feature$1(topology, o); })
	  } : feature$1(topology, o);
	}
	
	function feature$1(topology, o) {
	  var f = {
	    type: "Feature",
	    id: o.id,
	    properties: o.properties || {},
	    geometry: object(topology, o)
	  };
	  if (o.id == null) delete f.id;
	  return f;
	}
	
	function object(topology, o) {
	  var absolute = transformAbsolute(topology.transform),
	      arcs = topology.arcs;
	
	  function arc(i, points) {
	    if (points.length) points.pop();
	    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
	      points.push(p = a[k].slice());
	      absolute(p, k);
	    }
	    if (i < 0) reverse(points, n);
	  }
	
	  function point(p) {
	    p = p.slice();
	    absolute(p, 0);
	    return p;
	  }
	
	  function line(arcs) {
	    var points = [];
	    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
	    if (points.length < 2) points.push(points[0].slice());
	    return points;
	  }
	
	  function ring(arcs) {
	    var points = line(arcs);
	    while (points.length < 4) points.push(points[0].slice());
	    return points;
	  }
	
	  function polygon(arcs) {
	    return arcs.map(ring);
	  }
	
	  function geometry(o) {
	    var t = o.type;
	    return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
	        : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
	        : null;
	  }
	
	  var geometryType = {
	    Point: function(o) { return point(o.coordinates); },
	    MultiPoint: function(o) { return o.coordinates.map(point); },
	    LineString: function(o) { return line(o.arcs); },
	    MultiLineString: function(o) { return o.arcs.map(line); },
	    Polygon: function(o) { return polygon(o.arcs); },
	    MultiPolygon: function(o) { return o.arcs.map(polygon); }
	  };
	
	  return geometry(o);
	}
	
	function stitchArcs(topology, arcs) {
	  var stitchedArcs = {},
	      fragmentByStart = {},
	      fragmentByEnd = {},
	      fragments = [],
	      emptyIndex = -1;
	
	  // Stitch empty arcs first, since they may be subsumed by other arcs.
	  arcs.forEach(function(i, j) {
	    var arc = topology.arcs[i < 0 ? ~i : i], t;
	    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
	      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
	    }
	  });
	
	  arcs.forEach(function(i) {
	    var e = ends(i),
	        start = e[0],
	        end = e[1],
	        f, g;
	
	    if (f = fragmentByEnd[start]) {
	      delete fragmentByEnd[f.end];
	      f.push(i);
	      f.end = end;
	      if (g = fragmentByStart[end]) {
	        delete fragmentByStart[g.start];
	        var fg = g === f ? f : f.concat(g);
	        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
	      } else {
	        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
	      }
	    } else if (f = fragmentByStart[end]) {
	      delete fragmentByStart[f.start];
	      f.unshift(i);
	      f.start = start;
	      if (g = fragmentByEnd[start]) {
	        delete fragmentByEnd[g.end];
	        var gf = g === f ? f : g.concat(f);
	        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
	      } else {
	        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
	      }
	    } else {
	      f = [i];
	      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
	    }
	  });
	
	  function ends(i) {
	    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
	    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
	    else p1 = arc[arc.length - 1];
	    return i < 0 ? [p1, p0] : [p0, p1];
	  }
	
	  function flush(fragmentByEnd, fragmentByStart) {
	    for (var k in fragmentByEnd) {
	      var f = fragmentByEnd[k];
	      delete fragmentByStart[f.start];
	      delete f.start;
	      delete f.end;
	      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
	      fragments.push(f);
	    }
	  }
	
	  flush(fragmentByEnd, fragmentByStart);
	  flush(fragmentByStart, fragmentByEnd);
	  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });
	
	  return fragments;
	}
	
	function mesh(topology) {
	  return object(topology, meshArcs.apply(this, arguments));
	}
	
	function meshArcs(topology, o, filter) {
	  var arcs = [];
	
	  function arc(i) {
	    var j = i < 0 ? ~i : i;
	    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
	  }
	
	  function line(arcs) {
	    arcs.forEach(arc);
	  }
	
	  function polygon(arcs) {
	    arcs.forEach(line);
	  }
	
	  function geometry(o) {
	    if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
	    else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
	  }
	
	  if (arguments.length > 1) {
	    var geomsByArc = [],
	        geom;
	
	    var geometryType = {
	      LineString: line,
	      MultiLineString: polygon,
	      Polygon: polygon,
	      MultiPolygon: function(arcs) { arcs.forEach(polygon); }
	    };
	
	    geometry(o);
	
	    geomsByArc.forEach(arguments.length < 3
	        ? function(geoms) { arcs.push(geoms[0].i); }
	        : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
	  } else {
	    for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
	  }
	
	  return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
	}
	
	function cartesianTriangleArea(triangle) {
	  var a = triangle[0], b = triangle[1], c = triangle[2];
	  return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
	}
	
	function ring(ring) {
	  var i = -1,
	      n = ring.length,
	      a,
	      b = ring[n - 1],
	      area = 0;
	
	  while (++i < n) {
	    a = b;
	    b = ring[i];
	    area += a[0] * b[1] - a[1] * b[0];
	  }
	
	  return area / 2;
	}
	
	function merge(topology) {
	  return object(topology, mergeArcs.apply(this, arguments));
	}
	
	function mergeArcs(topology, objects) {
	  var polygonsByArc = {},
	      polygons = [],
	      components = [];
	
	  objects.forEach(function(o) {
	    if (o.type === "Polygon") register(o.arcs);
	    else if (o.type === "MultiPolygon") o.arcs.forEach(register);
	  });
	
	  function register(polygon) {
	    polygon.forEach(function(ring$$) {
	      ring$$.forEach(function(arc) {
	        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
	      });
	    });
	    polygons.push(polygon);
	  }
	
	  function area(ring$$) {
	    return Math.abs(ring(object(topology, {type: "Polygon", arcs: [ring$$]}).coordinates[0]));
	  }
	
	  polygons.forEach(function(polygon) {
	    if (!polygon._) {
	      var component = [],
	          neighbors = [polygon];
	      polygon._ = 1;
	      components.push(component);
	      while (polygon = neighbors.pop()) {
	        component.push(polygon);
	        polygon.forEach(function(ring$$) {
	          ring$$.forEach(function(arc) {
	            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
	              if (!polygon._) {
	                polygon._ = 1;
	                neighbors.push(polygon);
	              }
	            });
	          });
	        });
	      }
	    }
	  });
	
	  polygons.forEach(function(polygon) {
	    delete polygon._;
	  });
	
	  return {
	    type: "MultiPolygon",
	    arcs: components.map(function(polygons) {
	      var arcs = [], n;
	
	      // Extract the exterior (unique) arcs.
	      polygons.forEach(function(polygon) {
	        polygon.forEach(function(ring$$) {
	          ring$$.forEach(function(arc) {
	            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
	              arcs.push(arc);
	            }
	          });
	        });
	      });
	
	      // Stitch the arcs into one or more rings.
	      arcs = stitchArcs(topology, arcs);
	
	      // If more than one ring is returned,
	      // at most one of these rings can be the exterior;
	      // choose the one with the greatest absolute area.
	      if ((n = arcs.length) > 1) {
	        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
	          if ((ki = area(arcs[i])) > k) {
	            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
	          }
	        }
	      }
	
	      return arcs;
	    })
	  };
	}
	
	function neighbors(objects) {
	  var indexesByArc = {}, // arc index -> array of object indexes
	      neighbors = objects.map(function() { return []; });
	
	  function line(arcs, i) {
	    arcs.forEach(function(a) {
	      if (a < 0) a = ~a;
	      var o = indexesByArc[a];
	      if (o) o.push(i);
	      else indexesByArc[a] = [i];
	    });
	  }
	
	  function polygon(arcs, i) {
	    arcs.forEach(function(arc) { line(arc, i); });
	  }
	
	  function geometry(o, i) {
	    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
	    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
	  }
	
	  var geometryType = {
	    LineString: line,
	    MultiLineString: polygon,
	    Polygon: polygon,
	    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
	  };
	
	  objects.forEach(geometry);
	
	  for (var i in indexesByArc) {
	    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
	      for (var k = j + 1; k < m; ++k) {
	        var ij = indexes[j], ik = indexes[k], n;
	        if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
	        if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
	      }
	    }
	  }
	
	  return neighbors;
	}
	
	function compareArea(a, b) {
	  return a[1][2] - b[1][2];
	}
	
	function minAreaHeap() {
	  var heap = {},
	      array = [],
	      size = 0;
	
	  heap.push = function(object) {
	    up(array[object._ = size] = object, size++);
	    return size;
	  };
	
	  heap.pop = function() {
	    if (size <= 0) return;
	    var removed = array[0], object;
	    if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
	    return removed;
	  };
	
	  heap.remove = function(removed) {
	    var i = removed._, object;
	    if (array[i] !== removed) return; // invalid request
	    if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
	    return i;
	  };
	
	  function up(object, i) {
	    while (i > 0) {
	      var j = ((i + 1) >> 1) - 1,
	          parent = array[j];
	      if (compareArea(object, parent) >= 0) break;
	      array[parent._ = i] = parent;
	      array[object._ = i = j] = object;
	    }
	  }
	
	  function down(object, i) {
	    while (true) {
	      var r = (i + 1) << 1,
	          l = r - 1,
	          j = i,
	          child = array[j];
	      if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
	      if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
	      if (j === i) break;
	      array[child._ = i] = child;
	      array[object._ = i = j] = object;
	    }
	  }
	
	  return heap;
	}
	
	function presimplify(topology, triangleArea) {
	  var absolute = transformAbsolute(topology.transform),
	      relative = transformRelative(topology.transform),
	      heap = minAreaHeap();
	
	  if (!triangleArea) triangleArea = cartesianTriangleArea;
	
	  topology.arcs.forEach(function(arc) {
	    var triangles = [],
	        maxArea = 0,
	        triangle,
	        i,
	        n,
	        p;
	
	    // To store each point’s effective area, we create a new array rather than
	    // extending the passed-in point to workaround a Chrome/V8 bug (getting
	    // stuck in smi mode). For midpoints, the initial effective area of
	    // Infinity will be computed in the next step.
	    for (i = 0, n = arc.length; i < n; ++i) {
	      p = arc[i];
	      absolute(arc[i] = [p[0], p[1], Infinity], i);
	    }
	
	    for (i = 1, n = arc.length - 1; i < n; ++i) {
	      triangle = arc.slice(i - 1, i + 2);
	      triangle[1][2] = triangleArea(triangle);
	      triangles.push(triangle);
	      heap.push(triangle);
	    }
	
	    for (i = 0, n = triangles.length; i < n; ++i) {
	      triangle = triangles[i];
	      triangle.previous = triangles[i - 1];
	      triangle.next = triangles[i + 1];
	    }
	
	    while (triangle = heap.pop()) {
	      var previous = triangle.previous,
	          next = triangle.next;
	
	      // If the area of the current point is less than that of the previous point
	      // to be eliminated, use the latter's area instead. This ensures that the
	      // current point cannot be eliminated without eliminating previously-
	      // eliminated points.
	      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
	      else maxArea = triangle[1][2];
	
	      if (previous) {
	        previous.next = next;
	        previous[2] = triangle[2];
	        update(previous);
	      }
	
	      if (next) {
	        next.previous = previous;
	        next[0] = triangle[0];
	        update(next);
	      }
	    }
	
	    arc.forEach(relative);
	  });
	
	  function update(triangle) {
	    heap.remove(triangle);
	    triangle[1][2] = triangleArea(triangle);
	    heap.push(triangle);
	  }
	
	  return topology;
	}
	
	var version = "1.6.27";
	
	exports.version = version;
	exports.mesh = mesh;
	exports.meshArcs = meshArcs;
	exports.merge = merge;
	exports.mergeArcs = mergeArcs;
	exports.feature = feature;
	exports.neighbors = neighbors;
	exports.presimplify = presimplify;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var normalize = __webpack_require__(78);
	
	module.exports = function(inputs) {
	    return {
	        type: 'FeatureCollection',
	        features: inputs.reduce(function(memo, input) {
	            return memo.concat(normalize(input).features);
	        }, [])
	    };
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = normalize;
	
	var types = {
	    Point: 'geometry',
	    MultiPoint: 'geometry',
	    LineString: 'geometry',
	    MultiLineString: 'geometry',
	    Polygon: 'geometry',
	    MultiPolygon: 'geometry',
	    GeometryCollection: 'geometry',
	    Feature: 'feature',
	    FeatureCollection: 'featurecollection'
	};
	
	/**
	 * Normalize a GeoJSON feature into a FeatureCollection.
	 *
	 * @param {object} gj geojson data
	 * @returns {object} normalized geojson data
	 */
	function normalize(gj) {
	    if (!gj || !gj.type) return null;
	    var type = types[gj.type];
	    if (!type) return null;
	
	    if (type === 'geometry') {
	        return {
	            type: 'FeatureCollection',
	            features: [{
	                type: 'Feature',
	                properties: {},
	                geometry: gj
	            }]
	        };
	    } else if (type === 'feature') {
	        return {
	            type: 'FeatureCollection',
	            features: [gj]
	        };
	    } else if (type === 'featurecollection') {
	        return gj;
	    }
	}


/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = earcut;
	
	function earcut(data, holeIndices, dim) {
	
	    dim = dim || 2;
	
	    var hasHoles = holeIndices && holeIndices.length,
	        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
	        outerNode = linkedList(data, 0, outerLen, dim, true),
	        triangles = [];
	
	    if (!outerNode) return triangles;
	
	    var minX, minY, maxX, maxY, x, y, size;
	
	    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
	
	    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
	    if (data.length > 80 * dim) {
	        minX = maxX = data[0];
	        minY = maxY = data[1];
	
	        for (var i = dim; i < outerLen; i += dim) {
	            x = data[i];
	            y = data[i + 1];
	            if (x < minX) minX = x;
	            if (y < minY) minY = y;
	            if (x > maxX) maxX = x;
	            if (y > maxY) maxY = y;
	        }
	
	        // minX, minY and size are later used to transform coords into integers for z-order calculation
	        size = Math.max(maxX - minX, maxY - minY);
	    }
	
	    earcutLinked(outerNode, triangles, dim, minX, minY, size);
	
	    return triangles;
	}
	
	// create a circular doubly linked list from polygon points in the specified winding order
	function linkedList(data, start, end, dim, clockwise) {
	    var i, last;
	
	    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
	        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	    } else {
	        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
	    }
	
	    if (last && equals(last, last.next)) {
	        removeNode(last);
	        last = last.next;
	    }
	
	    return last;
	}
	
	// eliminate colinear or duplicate points
	function filterPoints(start, end) {
	    if (!start) return start;
	    if (!end) end = start;
	
	    var p = start,
	        again;
	    do {
	        again = false;
	
	        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
	            removeNode(p);
	            p = end = p.prev;
	            if (p === p.next) return null;
	            again = true;
	
	        } else {
	            p = p.next;
	        }
	    } while (again || p !== end);
	
	    return end;
	}
	
	// main ear slicing loop which triangulates a polygon (given as a linked list)
	function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
	    if (!ear) return;
	
	    // interlink polygon nodes in z-order
	    if (!pass && size) indexCurve(ear, minX, minY, size);
	
	    var stop = ear,
	        prev, next;
	
	    // iterate through ears, slicing them one by one
	    while (ear.prev !== ear.next) {
	        prev = ear.prev;
	        next = ear.next;
	
	        if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
	            // cut off the triangle
	            triangles.push(prev.i / dim);
	            triangles.push(ear.i / dim);
	            triangles.push(next.i / dim);
	
	            removeNode(ear);
	
	            // skipping the next vertice leads to less sliver triangles
	            ear = next.next;
	            stop = next.next;
	
	            continue;
	        }
	
	        ear = next;
	
	        // if we looped through the whole remaining polygon and can't find any more ears
	        if (ear === stop) {
	            // try filtering points and slicing again
	            if (!pass) {
	                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
	
	            // if this didn't work, try curing all small self-intersections locally
	            } else if (pass === 1) {
	                ear = cureLocalIntersections(ear, triangles, dim);
	                earcutLinked(ear, triangles, dim, minX, minY, size, 2);
	
	            // as a last resort, try splitting the remaining polygon into two
	            } else if (pass === 2) {
	                splitEarcut(ear, triangles, dim, minX, minY, size);
	            }
	
	            break;
	        }
	    }
	}
	
	// check whether a polygon node forms a valid ear with adjacent nodes
	function isEar(ear) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	
	    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	
	    // now make sure we don't have other points inside the potential ear
	    var p = ear.next.next;
	
	    while (p !== ear.prev) {
	        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.next;
	    }
	
	    return true;
	}
	
	function isEarHashed(ear, minX, minY, size) {
	    var a = ear.prev,
	        b = ear,
	        c = ear.next;
	
	    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
	
	    // triangle bbox; min & max are calculated like this for speed
	    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
	        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
	        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
	        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);
	
	    // z-order range for the current triangle bbox;
	    var minZ = zOrder(minTX, minTY, minX, minY, size),
	        maxZ = zOrder(maxTX, maxTY, minX, minY, size);
	
	    // first look for points inside the triangle in increasing z-order
	    var p = ear.nextZ;
	
	    while (p && p.z <= maxZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.nextZ;
	    }
	
	    // then look for points in decreasing z-order
	    p = ear.prevZ;
	
	    while (p && p.z >= minZ) {
	        if (p !== ear.prev && p !== ear.next &&
	            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
	            area(p.prev, p, p.next) >= 0) return false;
	        p = p.prevZ;
	    }
	
	    return true;
	}
	
	// go through all polygon nodes and cure small local self-intersections
	function cureLocalIntersections(start, triangles, dim) {
	    var p = start;
	    do {
	        var a = p.prev,
	            b = p.next.next;
	
	        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
	
	            triangles.push(a.i / dim);
	            triangles.push(p.i / dim);
	            triangles.push(b.i / dim);
	
	            // remove two nodes involved
	            removeNode(p);
	            removeNode(p.next);
	
	            p = start = b;
	        }
	        p = p.next;
	    } while (p !== start);
	
	    return p;
	}
	
	// try splitting polygon into two and triangulate them independently
	function splitEarcut(start, triangles, dim, minX, minY, size) {
	    // look for a valid diagonal that divides the polygon into two
	    var a = start;
	    do {
	        var b = a.next.next;
	        while (b !== a.prev) {
	            if (a.i !== b.i && isValidDiagonal(a, b)) {
	                // split the polygon in two by the diagonal
	                var c = splitPolygon(a, b);
	
	                // filter colinear points around the cuts
	                a = filterPoints(a, a.next);
	                c = filterPoints(c, c.next);
	
	                // run earcut on each half
	                earcutLinked(a, triangles, dim, minX, minY, size);
	                earcutLinked(c, triangles, dim, minX, minY, size);
	                return;
	            }
	            b = b.next;
	        }
	        a = a.next;
	    } while (a !== start);
	}
	
	// link every hole into the outer loop, producing a single-ring polygon without holes
	function eliminateHoles(data, holeIndices, outerNode, dim) {
	    var queue = [],
	        i, len, start, end, list;
	
	    for (i = 0, len = holeIndices.length; i < len; i++) {
	        start = holeIndices[i] * dim;
	        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	        list = linkedList(data, start, end, dim, false);
	        if (list === list.next) list.steiner = true;
	        queue.push(getLeftmost(list));
	    }
	
	    queue.sort(compareX);
	
	    // process holes from left to right
	    for (i = 0; i < queue.length; i++) {
	        eliminateHole(queue[i], outerNode);
	        outerNode = filterPoints(outerNode, outerNode.next);
	    }
	
	    return outerNode;
	}
	
	function compareX(a, b) {
	    return a.x - b.x;
	}
	
	// find a bridge between vertices that connects hole with an outer ring and and link it
	function eliminateHole(hole, outerNode) {
	    outerNode = findHoleBridge(hole, outerNode);
	    if (outerNode) {
	        var b = splitPolygon(outerNode, hole);
	        filterPoints(b, b.next);
	    }
	}
	
	// David Eberly's algorithm for finding a bridge between hole and outer polygon
	function findHoleBridge(hole, outerNode) {
	    var p = outerNode,
	        hx = hole.x,
	        hy = hole.y,
	        qx = -Infinity,
	        m;
	
	    // find a segment intersected by a ray from the hole's leftmost point to the left;
	    // segment's endpoint with lesser x will be potential connection point
	    do {
	        if (hy <= p.y && hy >= p.next.y) {
	            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
	            if (x <= hx && x > qx) {
	                qx = x;
	                if (x === hx) {
	                    if (hy === p.y) return p;
	                    if (hy === p.next.y) return p.next;
	                }
	                m = p.x < p.next.x ? p : p.next;
	            }
	        }
	        p = p.next;
	    } while (p !== outerNode);
	
	    if (!m) return null;
	
	    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint
	
	    // look for points inside the triangle of hole point, segment intersection and endpoint;
	    // if there are no points found, we have a valid connection;
	    // otherwise choose the point of the minimum angle with the ray as connection point
	
	    var stop = m,
	        mx = m.x,
	        my = m.y,
	        tanMin = Infinity,
	        tan;
	
	    p = m.next;
	
	    while (p !== stop) {
	        if (hx >= p.x && p.x >= mx &&
	                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
	
	            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential
	
	            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
	                m = p;
	                tanMin = tan;
	            }
	        }
	
	        p = p.next;
	    }
	
	    return m;
	}
	
	// interlink polygon nodes in z-order
	function indexCurve(start, minX, minY, size) {
	    var p = start;
	    do {
	        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
	        p.prevZ = p.prev;
	        p.nextZ = p.next;
	        p = p.next;
	    } while (p !== start);
	
	    p.prevZ.nextZ = null;
	    p.prevZ = null;
	
	    sortLinked(p);
	}
	
	// Simon Tatham's linked list merge sort algorithm
	// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
	function sortLinked(list) {
	    var i, p, q, e, tail, numMerges, pSize, qSize,
	        inSize = 1;
	
	    do {
	        p = list;
	        list = null;
	        tail = null;
	        numMerges = 0;
	
	        while (p) {
	            numMerges++;
	            q = p;
	            pSize = 0;
	            for (i = 0; i < inSize; i++) {
	                pSize++;
	                q = q.nextZ;
	                if (!q) break;
	            }
	
	            qSize = inSize;
	
	            while (pSize > 0 || (qSize > 0 && q)) {
	
	                if (pSize === 0) {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                } else if (qSize === 0 || !q) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else if (p.z <= q.z) {
	                    e = p;
	                    p = p.nextZ;
	                    pSize--;
	                } else {
	                    e = q;
	                    q = q.nextZ;
	                    qSize--;
	                }
	
	                if (tail) tail.nextZ = e;
	                else list = e;
	
	                e.prevZ = tail;
	                tail = e;
	            }
	
	            p = q;
	        }
	
	        tail.nextZ = null;
	        inSize *= 2;
	
	    } while (numMerges > 1);
	
	    return list;
	}
	
	// z-order of a point given coords and size of the data bounding box
	function zOrder(x, y, minX, minY, size) {
	    // coords are transformed into non-negative 15-bit integer range
	    x = 32767 * (x - minX) / size;
	    y = 32767 * (y - minY) / size;
	
	    x = (x | (x << 8)) & 0x00FF00FF;
	    x = (x | (x << 4)) & 0x0F0F0F0F;
	    x = (x | (x << 2)) & 0x33333333;
	    x = (x | (x << 1)) & 0x55555555;
	
	    y = (y | (y << 8)) & 0x00FF00FF;
	    y = (y | (y << 4)) & 0x0F0F0F0F;
	    y = (y | (y << 2)) & 0x33333333;
	    y = (y | (y << 1)) & 0x55555555;
	
	    return x | (y << 1);
	}
	
	// find the leftmost node of a polygon ring
	function getLeftmost(start) {
	    var p = start,
	        leftmost = start;
	    do {
	        if (p.x < leftmost.x) leftmost = p;
	        p = p.next;
	    } while (p !== start);
	
	    return leftmost;
	}
	
	// check if a point lies within a convex triangle
	function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
	           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
	           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
	}
	
	// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
	function isValidDiagonal(a, b) {
	    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
	           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
	}
	
	// signed area of a triangle
	function area(p, q, r) {
	    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	}
	
	// check if two points are equal
	function equals(p1, p2) {
	    return p1.x === p2.x && p1.y === p2.y;
	}
	
	// check if two segments intersect
	function intersects(p1, q1, p2, q2) {
	    if ((equals(p1, q1) && equals(p2, q2)) ||
	        (equals(p1, q2) && equals(p2, q1))) return true;
	    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
	           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
	}
	
	// check if a polygon diagonal intersects any polygon segments
	function intersectsPolygon(a, b) {
	    var p = a;
	    do {
	        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
	                intersects(p, p.next, a, b)) return true;
	        p = p.next;
	    } while (p !== a);
	
	    return false;
	}
	
	// check if a polygon diagonal is locally inside the polygon
	function locallyInside(a, b) {
	    return area(a.prev, a, a.next) < 0 ?
	        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
	        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
	}
	
	// check if the middle point of a polygon diagonal is inside the polygon
	function middleInside(a, b) {
	    var p = a,
	        inside = false,
	        px = (a.x + b.x) / 2,
	        py = (a.y + b.y) / 2;
	    do {
	        if (((p.y > py) !== (p.next.y > py)) && (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
	            inside = !inside;
	        p = p.next;
	    } while (p !== a);
	
	    return inside;
	}
	
	// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
	// if one belongs to the outer ring and another to a hole, it merges it into a single ring
	function splitPolygon(a, b) {
	    var a2 = new Node(a.i, a.x, a.y),
	        b2 = new Node(b.i, b.x, b.y),
	        an = a.next,
	        bp = b.prev;
	
	    a.next = b;
	    b.prev = a;
	
	    a2.next = an;
	    an.prev = a2;
	
	    b2.next = a2;
	    a2.prev = b2;
	
	    bp.next = b2;
	    b2.prev = bp;
	
	    return b2;
	}
	
	// create a node and optionally link it with previous one (in a circular doubly linked list)
	function insertNode(i, x, y, last) {
	    var p = new Node(i, x, y);
	
	    if (!last) {
	        p.prev = p;
	        p.next = p;
	
	    } else {
	        p.next = last.next;
	        p.prev = last;
	        last.next.prev = p;
	        last.next = p;
	    }
	    return p;
	}
	
	function removeNode(p) {
	    p.next.prev = p.prev;
	    p.prev.next = p.next;
	
	    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
	}
	
	function Node(i, x, y) {
	    // vertice index in coordinates array
	    this.i = i;
	
	    // vertex coordinates
	    this.x = x;
	    this.y = y;
	
	    // previous and next vertice nodes in a polygon ring
	    this.prev = null;
	    this.next = null;
	
	    // z-order curve value
	    this.z = null;
	
	    // previous and next nodes in z-order
	    this.prevZ = null;
	    this.nextZ = null;
	
	    // indicates whether this is a steiner point
	    this.steiner = false;
	}
	
	// return a percentage difference between the polygon area and its triangulation area;
	// used to verify correctness of triangulation
	earcut.deviation = function (data, holeIndices, dim, triangles) {
	    var hasHoles = holeIndices && holeIndices.length;
	    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
	
	    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
	    if (hasHoles) {
	        for (var i = 0, len = holeIndices.length; i < len; i++) {
	            var start = holeIndices[i] * dim;
	            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
	            polygonArea -= Math.abs(signedArea(data, start, end, dim));
	        }
	    }
	
	    var trianglesArea = 0;
	    for (i = 0; i < triangles.length; i += 3) {
	        var a = triangles[i] * dim;
	        var b = triangles[i + 1] * dim;
	        var c = triangles[i + 2] * dim;
	        trianglesArea += Math.abs(
	            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
	            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
	    }
	
	    return polygonArea === 0 && trianglesArea === 0 ? 0 :
	        Math.abs((trianglesArea - polygonArea) / polygonArea);
	};
	
	function signedArea(data, start, end, dim) {
	    var sum = 0;
	    for (var i = start, j = end - dim; i < end; i += dim) {
	        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	        j = i;
	    }
	    return sum;
	}
	
	// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
	earcut.flatten = function (data) {
	    var dim = data[0][0].length,
	        result = {vertices: [], holes: [], dimensions: dim},
	        holeIndex = 0;
	
	    for (var i = 0; i < data.length; i++) {
	        for (var j = 0; j < data[i].length; j++) {
	            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
	        }
	        if (i > 0) {
	            holeIndex += data[i - 1].length;
	            result.holes.push(holeIndex);
	        }
	    }
	    return result;
	};


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * Extrude a polygon given its vertices and triangulated faces
	 *
	 * Based on:
	 * https://github.com/freeman-lab/extrude
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var extrudePolygon = function extrudePolygon(points, faces, _options) {
	  var defaults = {
	    top: 1,
	    bottom: 0,
	    closed: true
	  };
	
	  var options = (0, _lodashAssign2['default'])({}, defaults, _options);
	
	  var n = points.length;
	  var positions;
	  var cells;
	  var topCells;
	  var bottomCells;
	  var sideCells;
	
	  // If bottom and top values are identical then return the flat shape
	  options.top === options.bottom ? flat() : full();
	
	  function flat() {
	    positions = points.map(function (p) {
	      return [p[0], options.top, p[1]];
	    });
	    cells = faces;
	    topCells = faces;
	  }
	
	  function full() {
	    positions = [];
	    points.forEach(function (p) {
	      positions.push([p[0], options.top, p[1]]);
	    });
	    points.forEach(function (p) {
	      positions.push([p[0], options.bottom, p[1]]);
	    });
	
	    cells = [];
	    for (var i = 0; i < n; i++) {
	      if (i === n - 1) {
	        cells.push([i + n, n, i]);
	        cells.push([0, i, n]);
	      } else {
	        cells.push([i + n, i + n + 1, i]);
	        cells.push([i + 1, i, i + n + 1]);
	      }
	    }
	
	    sideCells = [].concat(cells);
	
	    if (options.closed) {
	      var top = faces;
	      var bottom = top.map(function (p) {
	        return p.map(function (v) {
	          return v + n;
	        });
	      });
	      bottom = bottom.map(function (p) {
	        return [p[0], p[2], p[1]];
	      });
	      cells = cells.concat(top).concat(bottom);
	
	      topCells = top;
	      bottomCells = bottom;
	    }
	  }
	
	  return {
	    positions: positions,
	    faces: cells,
	    top: topCells,
	    bottom: bottomCells,
	    sides: sideCells
	  };
	};
	
	exports['default'] = extrudePolygon;
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * BufferGeometry helpers
	 */
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var Buffer = (function () {
	  // Merge TypedArrays of the same type
	  // Returns merged array as well as indexes for splitting the array
	  var mergeFloat32Arrays = function mergeFloat32Arrays(arrays) {
	    var size = 0;
	    var map = new Int32Array(arrays.length * 2);
	
	    var lastIndex = 0;
	    var length;
	
	    // Find size of each array
	    arrays.forEach(function (_array, index) {
	      length = _array.length;
	      size += length;
	      map.set([lastIndex, lastIndex + length], index * 2);
	      lastIndex += length;
	    });
	
	    // Create a new array of total size
	    var mergedArray = new Float32Array(size);
	
	    // Add each array to the new array
	    arrays.forEach(function (_array, index) {
	      mergedArray.set(_array, map[index * 2]);
	    });
	
	    return [mergedArray, map];
	  };
	
	  var splitFloat32Array = function splitFloat32Array(data) {
	    var arr = data[0];
	    var map = data[1];
	
	    var start;
	    var arrays = [];
	
	    // Iterate over map
	    for (var i = 0; i < map.length / 2; i++) {
	      start = i * 2;
	      arrays.push(arr.subarray(map[start], map[start + 1]));
	    }
	
	    return arrays;
	  };
	
	  // TODO: Create a generic method that can work for any typed array
	  var mergeUint8Arrays = function mergeUint8Arrays(arrays) {
	    var size = 0;
	    var map = new Int32Array(arrays.length * 2);
	
	    var lastIndex = 0;
	    var length;
	
	    // Find size of each array
	    arrays.forEach(function (_array, index) {
	      length = _array.length;
	      size += length;
	      map.set([lastIndex, lastIndex + length], index * 2);
	      lastIndex += length;
	    });
	
	    // Create a new array of total size
	    var mergedArray = new Uint8Array(size);
	
	    // Add each array to the new array
	    arrays.forEach(function (_array, index) {
	      mergedArray.set(_array, map[index * 2]);
	    });
	
	    return [mergedArray, map];
	  };
	
	  // TODO: Dedupe with splitFloat32Array
	  var splitUint8Array = function splitUint8Array(data) {
	    var arr = data[0];
	    var map = data[1];
	
	    var start;
	    var arrays = [];
	
	    // Iterate over map
	    for (var i = 0; i < map.length / 2; i++) {
	      start = i * 2;
	      arrays.push(arr.subarray(map[start], map[start + 1]));
	    }
	
	    return arrays;
	  };
	
	  // Merge multiple attribute objects into a single attribute object
	  //
	  // Attribute objects must all use the same attribute keys
	  var mergeAttributes = function mergeAttributes(attributes) {
	    var lengths = {};
	
	    // Find array lengths
	    attributes.forEach(function (_attributes) {
	      for (var k in _attributes) {
	        if (!lengths[k]) {
	          lengths[k] = 0;
	        }
	
	        lengths[k] += _attributes[k].length;
	      }
	    });
	
	    var mergedAttributes = {};
	
	    // Set up arrays to merge into
	    for (var k in lengths) {
	      mergedAttributes[k] = new Float32Array(lengths[k]);
	    }
	
	    var lastLengths = {};
	
	    attributes.forEach(function (_attributes) {
	      for (var k in _attributes) {
	        if (!lastLengths[k]) {
	          lastLengths[k] = 0;
	        }
	
	        mergedAttributes[k].set(_attributes[k], lastLengths[k]);
	
	        lastLengths[k] += _attributes[k].length;
	      }
	    });
	
	    return mergedAttributes;
	  };
	
	  var createLineGeometry = function createLineGeometry(lines, offset) {
	    var geometry = new _three2['default'].BufferGeometry();
	
	    var vertices = new Float32Array(lines.verticesCount * 3);
	    var colours = new Float32Array(lines.verticesCount * 3);
	
	    var pickingIds;
	    if (lines.pickingIds) {
	      // One component per vertex (1)
	      pickingIds = new Float32Array(lines.verticesCount);
	    }
	
	    var _vertices;
	    var _colour;
	    var _pickingId;
	
	    var lastIndex = 0;
	
	    for (var i = 0; i < lines.vertices.length; i++) {
	      _vertices = lines.vertices[i];
	      _colour = lines.colours[i];
	
	      if (pickingIds) {
	        _pickingId = lines.pickingIds[i];
	      }
	
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
	
	        if (pickingIds) {
	          pickingIds[lastIndex] = _pickingId;
	        }
	
	        lastIndex++;
	      }
	    }
	
	    // itemSize = 3 because there are 3 values (components) per vertex
	    geometry.addAttribute('position', new _three2['default'].BufferAttribute(vertices, 3));
	    geometry.addAttribute('color', new _three2['default'].BufferAttribute(colours, 3));
	
	    if (pickingIds) {
	      geometry.addAttribute('pickingId', new _three2['default'].BufferAttribute(pickingIds, 1));
	    }
	
	    geometry.computeBoundingBox();
	
	    return geometry;
	  };
	
	  // TODO: Make picking IDs optional
	  var createGeometry = function createGeometry(attributes, offset) {
	    var geometry = new _three2['default'].BufferGeometry();
	
	    // Three components per vertex per face (3 x 3 = 9)
	    var vertices = new Float32Array(attributes.facesCount * 9);
	    var normals = new Float32Array(attributes.facesCount * 9);
	    var colours = new Float32Array(attributes.facesCount * 9);
	
	    var pickingIds;
	    if (attributes.pickingIds) {
	      // One component per vertex per face (1 x 3 = 3)
	      pickingIds = new Float32Array(attributes.facesCount * 3);
	    }
	
	    var pA = new _three2['default'].Vector3();
	    var pB = new _three2['default'].Vector3();
	    var pC = new _three2['default'].Vector3();
	
	    var cb = new _three2['default'].Vector3();
	    var ab = new _three2['default'].Vector3();
	
	    var index;
	    var _faces;
	    var _vertices;
	    var _colour;
	    var _pickingId;
	    var lastIndex = 0;
	    for (var i = 0; i < attributes.faces.length; i++) {
	      _faces = attributes.faces[i];
	      _vertices = attributes.vertices[i];
	      _colour = attributes.colours[i];
	
	      if (pickingIds) {
	        _pickingId = attributes.pickingIds[i];
	      }
	
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
	
	        if (pickingIds) {
	          pickingIds[lastIndex * 3 + 0] = _pickingId;
	          pickingIds[lastIndex * 3 + 1] = _pickingId;
	          pickingIds[lastIndex * 3 + 2] = _pickingId;
	        }
	
	        lastIndex++;
	      }
	    }
	
	    // itemSize = 3 because there are 3 values (components) per vertex
	    geometry.addAttribute('position', new _three2['default'].BufferAttribute(vertices, 3));
	    geometry.addAttribute('normal', new _three2['default'].BufferAttribute(normals, 3));
	    geometry.addAttribute('color', new _three2['default'].BufferAttribute(colours, 3));
	
	    if (pickingIds) {
	      geometry.addAttribute('pickingId', new _three2['default'].BufferAttribute(pickingIds, 1));
	    }
	
	    geometry.computeBoundingBox();
	
	    return geometry;
	  };
	
	  var textEncoder = new TextEncoder('utf-8');
	  var textDecoder = new TextDecoder('utf-8');
	
	  var stringToUint8Array = function stringToUint8Array(str) {
	    return textEncoder.encode(str);
	  };
	
	  var uint8ArrayToString = function uint8ArrayToString(ab) {
	    return textDecoder.decode(ab);
	  };
	
	  return {
	    mergeFloat32Arrays: mergeFloat32Arrays,
	    splitFloat32Array: splitFloat32Array,
	    mergeUint8Arrays: mergeUint8Arrays,
	    splitUint8Array: splitUint8Array,
	    mergeAttributes: mergeAttributes,
	    createLineGeometry: createLineGeometry,
	    createGeometry: createGeometry,
	    stringToUint8Array: stringToUint8Array,
	    uint8ArrayToString: uint8ArrayToString
	  };
	})();
	
	exports['default'] = Buffer;
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _PickingShader = __webpack_require__(83);
	
	var _PickingShader2 = _interopRequireDefault(_PickingShader);
	
	// FROM: https://github.com/brianxu/GPUPicker/blob/master/GPUPicker.js
	
	var PickingMaterial = function PickingMaterial() {
	  _three2['default'].ShaderMaterial.call(this, {
	    uniforms: {
	      size: {
	        type: 'f',
	        value: 0.01
	      },
	      scale: {
	        type: 'f',
	        value: 400
	      }
	    },
	    // attributes: ['position', 'id'],
	    vertexShader: _PickingShader2['default'].vertexShader,
	    fragmentShader: _PickingShader2['default'].fragmentShader
	  });
	
	  this.linePadding = 2;
	};
	
	PickingMaterial.prototype = Object.create(_three2['default'].ShaderMaterial.prototype);
	
	PickingMaterial.prototype.constructor = PickingMaterial;
	
	PickingMaterial.prototype.setPointSize = function (size) {
	  this.uniforms.size.value = size;
	};
	
	PickingMaterial.prototype.setPointScale = function (scale) {
	  this.uniforms.scale.value = scale;
	};
	
	exports['default'] = PickingMaterial;
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	// FROM: https://github.com/brianxu/GPUPicker/blob/master/GPUPicker.js
	
	var PickingShader = {
		vertexShader: ['attribute float pickingId;',
		// '',
		// 'uniform float size;',
		// 'uniform float scale;',
		'', 'varying vec4 worldId;', '', 'void main() {', '  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
		// '  gl_PointSize = size * ( scale / length( mvPosition.xyz ) );',
		'  vec3 a = fract(vec3(1.0/255.0, 1.0/(255.0*255.0), 1.0/(255.0*255.0*255.0)) * pickingId);', '  a -= a.xxy * vec3(0.0, 1.0/255.0, 1.0/255.0);', '  worldId = vec4(a,1);', '  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n'),
	
		fragmentShader: ['#ifdef GL_ES\n', 'precision highp float;\n', '#endif\n', '', 'varying vec4 worldId;', '', 'void main() {', '  gl_FragColor = worldId;', '}'].join('\n')
	};
	
	exports['default'] = PickingShader;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: Move duplicated logic between geometry layrs into GeometryLayer
	
	// TODO: Look at ways to drop unneeded references to array buffers, etc to
	// reduce memory footprint
	
	// TODO: Support dynamic updating / hiding / animation of geometry
	//
	// This could be pretty hard as it's all packed away within BufferGeometry and
	// may even be merged by another layer (eg. GeoJSONLayer)
	//
	// How much control should this layer support? Perhaps a different or custom
	// layer would be better suited for animation, for example.
	
	// TODO: Allow _setBufferAttributes to use a custom function passed in to
	// generate a custom mesh
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(6);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _geoPoint = __webpack_require__(8);
	
	var _earcut2 = __webpack_require__(79);
	
	var _earcut3 = _interopRequireDefault(_earcut2);
	
	var _utilExtrudePolygon = __webpack_require__(80);
	
	var _utilExtrudePolygon2 = _interopRequireDefault(_utilExtrudePolygon);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var PolygonLayer = (function (_Layer) {
	  _inherits(PolygonLayer, _Layer);
	
	  function PolygonLayer(coordinates, options) {
	    _classCallCheck(this, PolygonLayer);
	
	    var defaults = {
	      output: true,
	      interactive: false,
	      // Custom material override
	      //
	      // TODO: Should this be in the style object?
	      polygonMaterial: null,
	      onPolygonMesh: null,
	      onBufferAttributes: null,
	      // This default style is separate to Util.GeoJSON.defaultStyle
	      style: {
	        color: '#ffffff',
	        transparent: false,
	        opacity: 1,
	        blending: _three2['default'].NormalBlending,
	        height: 0
	      }
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(PolygonLayer.prototype), 'constructor', this).call(this, _options);
	
	    // Return coordinates as array of polygons so it's easy to support
	    // MultiPolygon features (a single polygon would be a MultiPolygon with a
	    // single polygon in the array)
	    this._coordinates = PolygonLayer.isSingle(coordinates) ? [coordinates] : coordinates;
	  }
	
	  _createClass(PolygonLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this._setCoordinates();
	
	        if (_this._options.interactive) {
	          // Only add to picking mesh if this layer is controlling output
	          //
	          // Otherwise, assume another component will eventually add a mesh to
	          // the picking scene
	          if (_this.isOutput()) {
	            _this._pickingMesh = new _three2['default'].Object3D();
	            _this.addToPicking(_this._pickingMesh);
	          }
	
	          _this._setPickingId();
	          _this._addPickingEvents();
	        }
	
	        PolygonLayer.SetBufferAttributes(_this._projectedCoordinates, _this._options).then(function (result) {
	          _this._bufferAttributes = _utilBuffer2['default'].mergeAttributes(result.attributes);
	
	          if (result.outlineAttributes.length > 0) {
	            _this._outlineBufferAttributes = _utilBuffer2['default'].mergeAttributes(result.outlineAttributes);
	          }
	
	          _this._flat = result.flat;
	
	          if (_this.isOutput()) {
	            var attributeLengths = {
	              positions: 3,
	              normals: 3,
	              colors: 3,
	              tops: 1
	            };
	
	            if (_this._options.interactive) {
	              attributeLengths.pickingIds = 1;
	            }
	
	            var style = _this._options.style;
	
	            // Set mesh if not merging elsewhere
	            PolygonLayer.SetMesh(_this._bufferAttributes, attributeLengths, _this._flat, style, _this._options, _this._world._environment._skybox).then(function (result) {
	              // Output mesh
	              _this.add(result.mesh);
	
	              if (result.pickingMesh) {
	                _this._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          result.attributes = null;
	          result.outlineAttributes = null;
	          result = null;
	
	          resolve(_this);
	        })['catch'](reject);
	      });
	    }
	
	    // Return center of polygon as a LatLon
	    //
	    // This is used for things like placing popups / UI elements on the layer
	    //
	    // TODO: Find proper center position instead of returning first coordinate
	    // SEE: https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Polygon.js#L15
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	      return this._center;
	    }
	
	    // Return polygon bounds in geographic coordinates
	    //
	    // TODO: Implement getBounds()
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {}
	
	    // Get unique ID for picking interaction
	  }, {
	    key: '_setPickingId',
	    value: function _setPickingId() {
	      this._pickingId = this.getPickingId();
	    }
	
	    // Set up and re-emit interaction events
	  }, {
	    key: '_addPickingEvents',
	    value: function _addPickingEvents() {
	      var _this2 = this;
	
	      // TODO: Find a way to properly remove this listener on destroy
	      this._world.on('pick-' + this._pickingId, function (point2d, point3d, intersects) {
	        // Re-emit click event from the layer
	        _this2.emit('click', _this2, point2d, point3d, intersects);
	      });
	    }
	
	    // Create and store reference to THREE.BufferAttribute data for this layer
	  }, {
	    key: 'getBufferAttributes',
	    value: function getBufferAttributes() {
	      return this._bufferAttributes;
	    }
	  }, {
	    key: 'getOutlineBufferAttributes',
	    value: function getOutlineBufferAttributes() {
	      return this._outlineBufferAttributes;
	    }
	
	    // Used by external components to clear some memory when the attributes
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the attributes here after merging them
	    // using something like the GeoJSONLayer
	  }, {
	    key: 'clearBufferAttributes',
	    value: function clearBufferAttributes() {
	      this._bufferAttributes = null;
	      this._outlineBufferAttributes = null;
	    }
	
	    // Threshold angle is currently in rads
	  }, {
	    key: 'clearCoordinates',
	
	    // Used by external components to clear some memory when the coordinates
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the coordinates here after this
	    // layer is merged in something like the GeoJSONLayer
	    value: function clearCoordinates() {
	      this._coordinates = null;
	      this._projectedCoordinates = null;
	    }
	  }, {
	    key: '_setCoordinates',
	
	    // Convert and project coordinates
	    //
	    // TODO: Calculate bounds
	    value: function _setCoordinates() {
	      this._bounds = [];
	      this._coordinates = this._convertCoordinates(this._coordinates);
	
	      this._projectedBounds = [];
	      this._projectedCoordinates = this._projectCoordinates();
	
	      this._center = this._coordinates[0][0][0];
	    }
	
	    // Recursively convert input coordinates into LatLon objects
	    //
	    // Calculate geographic bounds at the same time
	    //
	    // TODO: Calculate geographic bounds
	  }, {
	    key: '_convertCoordinates',
	    value: function _convertCoordinates(coordinates) {
	      return coordinates.map(function (_coordinates) {
	        return _coordinates.map(function (ring) {
	          return ring.map(function (coordinate) {
	            return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	          });
	        });
	      });
	    }
	
	    // Recursively project coordinates into world positions
	    //
	    // Calculate world bounds, offset and pointScale at the same time
	    //
	    // TODO: Calculate world bounds
	  }, {
	    key: '_projectCoordinates',
	    value: function _projectCoordinates() {
	      var _this3 = this;
	
	      var point;
	      return this._coordinates.map(function (_coordinates) {
	        return _coordinates.map(function (ring) {
	          return ring.map(function (latlon) {
	            point = _this3._world.latLonToPoint(latlon);
	
	            // TODO: Is offset ever being used or needed?
	            if (!_this3._offset) {
	              _this3._offset = (0, _geoPoint.point)(0, 0);
	              _this3._offset.x = -1 * point.x;
	              _this3._offset.y = -1 * point.y;
	
	              _this3._options.pointScale = _this3._world.pointScale(latlon);
	            }
	
	            return point;
	          });
	        });
	      });
	    }
	
	    // Convert coordinates array to something earcut can understand
	  }, {
	    key: 'isFlat',
	
	    // Returns true if the polygon is flat (has no height)
	    value: function isFlat() {
	      return this._flat;
	    }
	
	    // Returns true if coordinates refer to a single geometry
	    //
	    // For example, not coordinates for a MultiPolygon GeoJSON feature
	  }, {
	    key: 'destroy',
	
	    // TODO: Make sure this is cleaning everything
	    value: function destroy() {
	      if (this._pickingMesh) {
	        // TODO: Properly dispose of picking mesh
	        this._pickingMesh = null;
	      }
	
	      this.clearCoordinates();
	      this.clearBufferAttributes();
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(PolygonLayer.prototype), 'destroy', this).call(this);
	    }
	  }], [{
	    key: 'SetBufferAttributes',
	    value: function SetBufferAttributes(coordinates, options) {
	      return new Promise(function (resolve) {
	        var height = 0;
	
	        // Convert height into world units
	        if (options.style.height && options.style.height !== 0) {
	          height = _geoGeo2['default'].metresToWorld(options.style.height, options.pointScale);
	        }
	
	        var colour = new _three2['default'].Color();
	        colour.set(options.style.color);
	
	        // Light and dark colours used for poor-mans AO gradient on object sides
	        var light = new _three2['default'].Color(0xffffff);
	        var shadow = new _three2['default'].Color(0x666666);
	
	        var flat = true;
	
	        var outlineAttributes = [];
	
	        // For each polygon
	        var attributes = coordinates.map(function (_coordinates) {
	          // Convert coordinates to earcut format
	          var _earcut = PolygonLayer.ToEarcut(_coordinates);
	
	          // Triangulate faces using earcut
	          var faces = PolygonLayer.Triangulate(_earcut.vertices, _earcut.holes, _earcut.dimensions);
	
	          var groupedVertices = [];
	          for (i = 0, il = _earcut.vertices.length; i < il; i += _earcut.dimensions) {
	            groupedVertices.push(_earcut.vertices.slice(i, i + _earcut.dimensions));
	          }
	
	          var extruded = (0, _utilExtrudePolygon2['default'])(groupedVertices, faces, {
	            bottom: 0,
	            top: height
	          });
	
	          var topColor = colour.clone().multiply(light);
	          var bottomColor = colour.clone().multiply(shadow);
	
	          var _vertices = extruded.positions;
	          var _faces = [];
	          var _colours = [];
	          var _tops = [];
	
	          var _colour;
	          extruded.top.forEach(function (face, fi) {
	            _colour = [];
	
	            _colour.push([colour.r, colour.g, colour.b]);
	            _colour.push([colour.r, colour.g, colour.b]);
	            _colour.push([colour.r, colour.g, colour.b]);
	
	            _tops.push([true, true, true]);
	
	            _faces.push(face);
	            _colours.push(_colour);
	          });
	
	          if (extruded.sides) {
	            flat = false;
	
	            // Set up colours for every vertex with poor-mans AO on the sides
	            extruded.sides.forEach(function (face, fi) {
	              _colour = [];
	
	              // First face is always bottom-bottom-top
	              if (fi % 2 === 0) {
	                _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
	                _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
	                _colour.push([topColor.r, topColor.g, topColor.b]);
	
	                _tops.push([false, false, true]);
	                // Reverse winding for the second face
	                // top-top-bottom
	              } else {
	                  _colour.push([topColor.r, topColor.g, topColor.b]);
	                  _colour.push([topColor.r, topColor.g, topColor.b]);
	                  _colour.push([bottomColor.r, bottomColor.g, bottomColor.b]);
	
	                  _tops.push([true, true, false]);
	                }
	
	              _faces.push(face);
	              _colours.push(_colour);
	            });
	          }
	
	          // Skip bottom as there's no point rendering it
	          // allFaces.push(extruded.faces);
	
	          var polygon = {
	            vertices: _vertices,
	            faces: _faces,
	            colours: _colours,
	            tops: _tops,
	            facesCount: _faces.length
	          };
	
	          if (options.style.outline) {
	            var outlineColour = new _three2['default'].Color();
	            outlineColour.set(options.style.outlineColor || 0x000000);
	
	            outlineAttributes.push(PolygonLayer.Set2DOutline(_coordinates, outlineColour));
	          }
	
	          if (options.interactive && options.pickingId) {
	            // Inject picking ID
	            polygon.pickingId = options.pickingId;
	          }
	
	          // Convert polygon representation to proper attribute arrays
	          return PolygonLayer.ToAttributes(polygon);
	        });
	
	        resolve({
	          attributes: attributes,
	          outlineAttributes: outlineAttributes,
	          flat: flat
	        });
	      });
	    }
	  }, {
	    key: 'Set2DOutline',
	    value: function Set2DOutline(coordinates, colour) {
	      var _vertices = [];
	
	      coordinates.forEach(function (ring) {
	        var _ring = ring.map(function (coordinate) {
	          return [coordinate.x, 0, coordinate.y];
	        });
	
	        // Add in duplicate vertices for line segments to work
	        var verticeCount = _ring.length;
	        var first = true;
	        while (--verticeCount) {
	          if (first || verticeCount === 0) {
	            first = false;
	            continue;
	          }
	
	          _ring.splice(verticeCount + 1, 0, _ring[verticeCount]);
	        }
	
	        _vertices = _vertices.concat(_ring);
	      });
	
	      _colour = [colour.r, colour.g, colour.b];
	
	      var vertices = new Float32Array(_vertices.length * 3);
	      var colours = new Float32Array(_vertices.length * 3);
	
	      var lastIndex = 0;
	
	      for (var i = 0; i < _vertices.length; i++) {
	        var ax = _vertices[i][0];
	        var ay = _vertices[i][1];
	        var az = _vertices[i][2];
	
	        var c1 = _colour;
	
	        vertices[lastIndex * 3 + 0] = ax;
	        vertices[lastIndex * 3 + 1] = ay;
	        vertices[lastIndex * 3 + 2] = az;
	
	        colours[lastIndex * 3 + 0] = c1[0];
	        colours[lastIndex * 3 + 1] = c1[1];
	        colours[lastIndex * 3 + 2] = c1[2];
	
	        lastIndex++;
	      }
	
	      var attributes = {
	        positions: vertices,
	        colors: colours
	      };
	
	      return attributes;
	    }
	  }, {
	    key: 'SetMesh',
	    value: function SetMesh(attributes, attributeLengths, flat, style, options, skybox) {
	      var geometry = new _three2['default'].BufferGeometry();
	
	      for (var key in attributes) {
	        geometry.addAttribute(key.slice(0, -1), new _three2['default'].BufferAttribute(attributes[key], attributeLengths[key]));
	      }
	
	      geometry.computeBoundingBox();
	
	      var material;
	      if (options.polygonMaterial && options.polygonMaterial instanceof _three2['default'].Material) {
	        material = options.polygonMaterial;
	      } else if (!skybox) {
	        material = new _three2['default'].MeshPhongMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          side: _three2['default'].BackSide,
	          transparent: style.transparent,
	          opacity: style.opacity,
	          blending: style.blending
	        });
	      } else {
	        material = new _three2['default'].MeshStandardMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          side: _three2['default'].BackSide,
	          transparent: style.transparent,
	          opacity: style.opacity,
	          blending: style.blending
	        });
	        material.roughness = 1;
	        material.metalness = 0.1;
	        material.envMapIntensity = 3;
	        material.envMap = skybox.getRenderTarget();
	      }
	
	      var mesh;
	
	      // Pass mesh through callback, if defined
	      if (typeof options.onPolygonMesh === 'function') {
	        mesh = options.onPolygonMesh(geometry, material);
	      } else {
	        mesh = new _three2['default'].Mesh(geometry, material);
	
	        mesh.castShadow = true;
	        mesh.receiveShadow = true;
	      }
	
	      if (flat) {
	        material.depthWrite = false;
	
	        var renderOrder = style.renderOrder !== undefined ? style.renderOrder : 3;
	        mesh.renderOrder = renderOrder;
	      }
	
	      if (options.interactive) {
	        material = new _enginePickingMaterial2['default']();
	        material.side = _three2['default'].BackSide;
	
	        var pickingMesh = new _three2['default'].Mesh(geometry, material);
	      }
	
	      return Promise.resolve({
	        mesh: mesh,
	        pickingMesh: pickingMesh
	      });
	    }
	  }, {
	    key: 'ToEarcut',
	    value: function ToEarcut(coordinates) {
	      var dim = 2;
	      var result = { vertices: [], holes: [], dimensions: dim };
	      var holeIndex = 0;
	
	      for (var i = 0; i < coordinates.length; i++) {
	        for (var j = 0; j < coordinates[i].length; j++) {
	          // for (var d = 0; d < dim; d++) {
	          result.vertices.push(coordinates[i][j].x);
	          result.vertices.push(coordinates[i][j].y);
	          // }
	        }
	        if (i > 0) {
	          holeIndex += coordinates[i - 1].length;
	          result.holes.push(holeIndex);
	        }
	      }
	
	      return result;
	    }
	
	    // Triangulate earcut-based input using earcut
	  }, {
	    key: 'Triangulate',
	    value: function Triangulate(contour, holes, dim) {
	      // console.time('earcut');
	
	      var faces = (0, _earcut3['default'])(contour, holes, dim);
	      var result = [];
	
	      for (i = 0, il = faces.length; i < il; i += 3) {
	        result.push(faces.slice(i, i + 3));
	      }
	
	      // console.timeEnd('earcut');
	
	      return result;
	    }
	
	    // Transform polygon representation into attribute arrays that can be used by
	    // THREE.BufferGeometry
	    //
	    // TODO: Can this be simplified? It's messy and huge
	  }, {
	    key: 'ToAttributes',
	    value: function ToAttributes(polygon) {
	      // Three components per vertex per face (3 x 3 = 9)
	      var positions = new Float32Array(polygon.facesCount * 9);
	      var normals = new Float32Array(polygon.facesCount * 9);
	      var colours = new Float32Array(polygon.facesCount * 9);
	
	      // One component per vertex per face (1 x 3 = 3)
	      var tops = new Float32Array(polygon.facesCount * 3);
	
	      var pickingIds;
	      if (polygon.pickingId) {
	        // One component per vertex per face (1 x 3 = 3)
	        pickingIds = new Float32Array(polygon.facesCount * 3);
	      }
	
	      var pA = new _three2['default'].Vector3();
	      var pB = new _three2['default'].Vector3();
	      var pC = new _three2['default'].Vector3();
	
	      var cb = new _three2['default'].Vector3();
	      var ab = new _three2['default'].Vector3();
	
	      var index;
	
	      var _faces = polygon.faces;
	      var _vertices = polygon.vertices;
	      var _colour = polygon.colours;
	      var _tops = polygon.tops;
	
	      var _pickingId;
	      if (pickingIds) {
	        _pickingId = polygon.pickingId;
	      }
	
	      var lastIndex = 0;
	
	      for (var i = 0; i < _faces.length; i++) {
	        // Array of vertex indexes for the face
	        index = _faces[i][0];
	
	        var ax = _vertices[index][0];
	        var ay = _vertices[index][1];
	        var az = _vertices[index][2];
	
	        var c1 = _colour[i][0];
	        var t1 = _tops[i][0];
	
	        index = _faces[i][1];
	
	        var bx = _vertices[index][0];
	        var by = _vertices[index][1];
	        var bz = _vertices[index][2];
	
	        var c2 = _colour[i][1];
	        var t2 = _tops[i][1];
	
	        index = _faces[i][2];
	
	        var cx = _vertices[index][0];
	        var cy = _vertices[index][1];
	        var cz = _vertices[index][2];
	
	        var c3 = _colour[i][2];
	        var t3 = _tops[i][2];
	
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
	
	        positions[lastIndex * 9 + 0] = ax;
	        positions[lastIndex * 9 + 1] = ay;
	        positions[lastIndex * 9 + 2] = az;
	
	        normals[lastIndex * 9 + 0] = nx;
	        normals[lastIndex * 9 + 1] = ny;
	        normals[lastIndex * 9 + 2] = nz;
	
	        colours[lastIndex * 9 + 0] = c1[0];
	        colours[lastIndex * 9 + 1] = c1[1];
	        colours[lastIndex * 9 + 2] = c1[2];
	
	        positions[lastIndex * 9 + 3] = bx;
	        positions[lastIndex * 9 + 4] = by;
	        positions[lastIndex * 9 + 5] = bz;
	
	        normals[lastIndex * 9 + 3] = nx;
	        normals[lastIndex * 9 + 4] = ny;
	        normals[lastIndex * 9 + 5] = nz;
	
	        colours[lastIndex * 9 + 3] = c2[0];
	        colours[lastIndex * 9 + 4] = c2[1];
	        colours[lastIndex * 9 + 5] = c2[2];
	
	        positions[lastIndex * 9 + 6] = cx;
	        positions[lastIndex * 9 + 7] = cy;
	        positions[lastIndex * 9 + 8] = cz;
	
	        normals[lastIndex * 9 + 6] = nx;
	        normals[lastIndex * 9 + 7] = ny;
	        normals[lastIndex * 9 + 8] = nz;
	
	        colours[lastIndex * 9 + 6] = c3[0];
	        colours[lastIndex * 9 + 7] = c3[1];
	        colours[lastIndex * 9 + 8] = c3[2];
	
	        tops[lastIndex * 3 + 0] = t1;
	        tops[lastIndex * 3 + 1] = t2;
	        tops[lastIndex * 3 + 2] = t3;
	
	        if (pickingIds) {
	          pickingIds[lastIndex * 3 + 0] = _pickingId;
	          pickingIds[lastIndex * 3 + 1] = _pickingId;
	          pickingIds[lastIndex * 3 + 2] = _pickingId;
	        }
	
	        lastIndex++;
	      }
	
	      var attributes = {
	        positions: positions,
	        normals: normals,
	        colors: colours,
	        tops: tops
	      };
	
	      if (pickingIds) {
	        attributes.pickingIds = pickingIds;
	      }
	
	      return attributes;
	    }
	  }, {
	    key: 'isSingle',
	    value: function isSingle(coordinates) {
	      return !Array.isArray(coordinates[0][0][0]);
	    }
	  }]);
	
	  return PolygonLayer;
	})(_Layer3['default']);
	
	exports['default'] = PolygonLayer;
	
	var noNew = function noNew(coordinates, options) {
	  return new PolygonLayer(coordinates, options);
	};
	
	exports.polygonLayer = noNew;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: Move duplicated logic between geometry layrs into GeometryLayer
	
	// TODO: Look at ways to drop unneeded references to array buffers, etc to
	// reduce memory footprint
	
	// TODO: Provide alternative output using tubes and splines / curves
	
	// TODO: Support dynamic updating / hiding / animation of geometry
	//
	// This could be pretty hard as it's all packed away within BufferGeometry and
	// may even be merged by another layer (eg. GeoJSONLayer)
	//
	// How much control should this layer support? Perhaps a different or custom
	// layer would be better suited for animation, for example.
	
	// TODO: Allow _setBufferAttributes to use a custom function passed in to
	// generate a custom mesh
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(6);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _geoPoint = __webpack_require__(8);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var PolylineLayer = (function (_Layer) {
	  _inherits(PolylineLayer, _Layer);
	
	  function PolylineLayer(coordinates, options) {
	    _classCallCheck(this, PolylineLayer);
	
	    var defaults = {
	      output: true,
	      interactive: false,
	      // Custom material override
	      //
	      // TODO: Should this be in the style object?
	      polylineMaterial: null,
	      onPolylineMesh: null,
	      onBufferAttributes: null,
	      // This default style is separate to Util.GeoJSON.defaultStyle
	      style: {
	        lineOpacity: 1,
	        lineTransparent: false,
	        lineColor: '#ffffff',
	        lineWidth: 1,
	        lineBlending: _three2['default'].NormalBlending
	      }
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(PolylineLayer.prototype), 'constructor', this).call(this, _options);
	
	    // Return coordinates as array of lines so it's easy to support
	    // MultiLineString features (a single line would be a MultiLineString with a
	    // single line in the array)
	    this._coordinates = PolylineLayer.isSingle(coordinates) ? [coordinates] : coordinates;
	
	    // Polyline features are always flat (for now at least)
	    this._flat = true;
	  }
	
	  _createClass(PolylineLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this._setCoordinates();
	
	        if (_this._options.interactive) {
	          // Only add to picking mesh if this layer is controlling output
	          //
	          // Otherwise, assume another component will eventually add a mesh to
	          // the picking scene
	          if (_this.isOutput()) {
	            _this._pickingMesh = new _three2['default'].Object3D();
	            _this.addToPicking(_this._pickingMesh);
	          }
	
	          _this._setPickingId();
	          _this._addPickingEvents();
	        }
	
	        // Store geometry representation as instances of THREE.BufferAttribute
	        PolylineLayer.SetBufferAttributes(_this._projectedCoordinates, _this._options).then(function (result) {
	          _this._bufferAttributes = _utilBuffer2['default'].mergeAttributes(result.attributes);
	          _this._flat = result.flat;
	
	          var attributeLengths = {
	            positions: 3,
	            colors: 3
	          };
	
	          if (_this._options.interactive) {
	            attributeLengths.pickingIds = 1;
	          }
	
	          if (_this.isOutput()) {
	            var style = _this._options.style;
	
	            // Set mesh if not merging elsewhere
	            PolylineLayer.SetMesh(_this._bufferAttributes, attributeLengths, _this._flat, style, _this._options).then(function (result) {
	              // Output mesh
	              _this.add(result.mesh);
	
	              if (result.pickingMesh) {
	                _this._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          result.attributes = null;
	          result = null;
	
	          resolve(_this);
	        });
	      });
	    }
	
	    // Return center of polyline as a LatLon
	    //
	    // This is used for things like placing popups / UI elements on the layer
	    //
	    // TODO: Find proper center position instead of returning first coordinate
	    // SEE: https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Polyline.js#L59
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	      return this._center;
	    }
	
	    // Return line bounds in geographic coordinates
	    //
	    // TODO: Implement getBounds()
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {}
	
	    // Get unique ID for picking interaction
	  }, {
	    key: '_setPickingId',
	    value: function _setPickingId() {
	      this._pickingId = this.getPickingId();
	    }
	
	    // Set up and re-emit interaction events
	  }, {
	    key: '_addPickingEvents',
	    value: function _addPickingEvents() {
	      var _this2 = this;
	
	      // TODO: Find a way to properly remove this listener on destroy
	      this._world.on('pick-' + this._pickingId, function (point2d, point3d, intersects) {
	        // Re-emit click event from the layer
	        _this2.emit('click', _this2, point2d, point3d, intersects);
	      });
	    }
	  }, {
	    key: 'getBufferAttributes',
	    value: function getBufferAttributes() {
	      return this._bufferAttributes;
	    }
	
	    // Used by external components to clear some memory when the attributes
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the attributes here after merging them
	    // using something like the GeoJSONLayer
	  }, {
	    key: 'clearBufferAttributes',
	    value: function clearBufferAttributes() {
	      this._bufferAttributes = null;
	    }
	
	    // Used by external components to clear some memory when the coordinates
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the coordinates here after this
	    // layer is merged in something like the GeoJSONLayer
	  }, {
	    key: 'clearCoordinates',
	    value: function clearCoordinates() {
	      this._coordinates = null;
	      this._projectedCoordinates = null;
	    }
	  }, {
	    key: '_setCoordinates',
	
	    // Convert and project coordinates
	    //
	    // TODO: Calculate bounds
	    value: function _setCoordinates() {
	      this._bounds = [];
	      this._coordinates = this._convertCoordinates(this._coordinates);
	
	      this._projectedBounds = [];
	      this._projectedCoordinates = this._projectCoordinates();
	
	      this._center = this._coordinates[0][0];
	    }
	
	    // Recursively convert input coordinates into LatLon objects
	    //
	    // Calculate geographic bounds at the same time
	    //
	    // TODO: Calculate geographic bounds
	  }, {
	    key: '_convertCoordinates',
	    value: function _convertCoordinates(coordinates) {
	      return coordinates.map(function (_coordinates) {
	        return _coordinates.map(function (coordinate) {
	          return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	        });
	      });
	    }
	
	    // Recursively project coordinates into world positions
	    //
	    // Calculate world bounds, offset and pointScale at the same time
	    //
	    // TODO: Calculate world bounds
	  }, {
	    key: '_projectCoordinates',
	    value: function _projectCoordinates() {
	      var _this3 = this;
	
	      var point;
	      return this._coordinates.map(function (_coordinates) {
	        return _coordinates.map(function (latlon) {
	          point = _this3._world.latLonToPoint(latlon);
	
	          // TODO: Is offset ever being used or needed?
	          if (!_this3._offset) {
	            _this3._offset = (0, _geoPoint.point)(0, 0);
	            _this3._offset.x = -1 * point.x;
	            _this3._offset.y = -1 * point.y;
	
	            _this3._options.pointScale = _this3._world.pointScale(latlon);
	          }
	
	          return point;
	        });
	      });
	    }
	  }, {
	    key: 'isFlat',
	
	    // Returns true if the line is flat (has no height)
	    value: function isFlat() {
	      return this._flat;
	    }
	
	    // Returns true if coordinates refer to a single geometry
	    //
	    // For example, not coordinates for a MultiLineString GeoJSON feature
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this._pickingMesh) {
	        // TODO: Properly dispose of picking mesh
	        this._pickingMesh = null;
	      }
	
	      this.clearCoordinates();
	      this.clearBufferAttributes();
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(PolylineLayer.prototype), 'destroy', this).call(this);
	    }
	  }], [{
	    key: 'SetBufferAttributes',
	    value: function SetBufferAttributes(coordinates, options) {
	      return new Promise(function (resolve) {
	        var height = 0;
	
	        // Convert height into world units
	        if (options.style.lineHeight) {
	          height = _geoGeo2['default'].metresToWorld(options.style.lineHeight, options.pointScale);
	        }
	
	        var colour = new _three2['default'].Color();
	        colour.set(options.style.lineColor);
	
	        var flat = true;
	
	        // For each line
	        var attributes = coordinates.map(function (_projectedCoordinates) {
	          var _vertices = [];
	          var _colours = [];
	
	          // Connect coordinate with the next to make a pair
	          //
	          // LineSegments requires pairs of vertices so repeat the last point if
	          // there's an odd number of vertices
	          var nextCoord;
	          _projectedCoordinates.forEach(function (coordinate, index) {
	            _colours.push([colour.r, colour.g, colour.b]);
	            _vertices.push([coordinate.x, height, coordinate.y]);
	
	            nextCoord = _projectedCoordinates[index + 1] ? _projectedCoordinates[index + 1] : coordinate;
	
	            _colours.push([colour.r, colour.g, colour.b]);
	            _vertices.push([nextCoord.x, height, nextCoord.y]);
	          });
	
	          var line = {
	            vertices: _vertices,
	            colours: _colours,
	            verticesCount: _vertices.length
	          };
	
	          if (options.interactive && options.pickingId) {
	            // Inject picking ID
	            line.pickingId = options.pickingId;
	          }
	
	          // Convert line representation to proper attribute arrays
	          return PolylineLayer.ToAttributes(line);
	        });
	
	        resolve({
	          attributes: attributes,
	          flat: flat
	        });
	      });
	    }
	  }, {
	    key: 'SetMesh',
	    value: function SetMesh(attributes, attributeLengths, flat, style, options) {
	      var geometry = new _three2['default'].BufferGeometry();
	
	      for (var key in attributes) {
	        geometry.addAttribute(key.slice(0, -1), new _three2['default'].BufferAttribute(attributes[key], attributeLengths[key]));
	      }
	
	      geometry.computeBoundingBox();
	
	      var material;
	      if (options.polylineMaterial && options.polylineMaterial instanceof _three2['default'].Material) {
	        material = options.polylineMaterial;
	      } else {
	        material = new _three2['default'].LineBasicMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          linewidth: style.lineWidth,
	          transparent: style.lineTransparent,
	          opacity: style.lineOpacity,
	          blending: style.lineBlending
	        });
	      }
	
	      var mesh;
	
	      // Pass mesh through callback, if defined
	      if (typeof options.onPolylineMesh === 'function') {
	        mesh = options.onPolylineMesh(geometry, material);
	      } else {
	        mesh = new _three2['default'].LineSegments(geometry, material);
	
	        if (style.lineRenderOrder !== undefined) {
	          material.depthWrite = false;
	          mesh.renderOrder = style.lineRenderOrder;
	        }
	
	        mesh.castShadow = true;
	        // mesh.receiveShadow = true;
	      }
	
	      if (options.interactive) {
	        material = new _enginePickingMaterial2['default']();
	        // material.side = THREE.BackSide;
	
	        // Make the line wider / easier to pick
	        material.linewidth = style.lineWidth + material.linePadding;
	
	        var pickingMesh = new _three2['default'].LineSegments(geometry, material);
	      }
	
	      return Promise.resolve({
	        mesh: mesh,
	        pickingMesh: pickingMesh
	      });
	    }
	  }, {
	    key: 'ToAttributes',
	    value: function ToAttributes(line) {
	      // Three components per vertex
	      var vertices = new Float32Array(line.verticesCount * 3);
	      var colours = new Float32Array(line.verticesCount * 3);
	
	      var pickingIds;
	      if (line.pickingId) {
	        // One component per vertex
	        pickingIds = new Float32Array(line.verticesCount);
	      }
	
	      var _vertices = line.vertices;
	      var _colour = line.colours;
	
	      var _pickingId;
	      if (pickingIds) {
	        _pickingId = line.pickingId;
	      }
	
	      var lastIndex = 0;
	
	      for (var i = 0; i < _vertices.length; i++) {
	        var ax = _vertices[i][0];
	        var ay = _vertices[i][1];
	        var az = _vertices[i][2];
	
	        var c1 = _colour[i];
	
	        vertices[lastIndex * 3 + 0] = ax;
	        vertices[lastIndex * 3 + 1] = ay;
	        vertices[lastIndex * 3 + 2] = az;
	
	        colours[lastIndex * 3 + 0] = c1[0];
	        colours[lastIndex * 3 + 1] = c1[1];
	        colours[lastIndex * 3 + 2] = c1[2];
	
	        if (pickingIds) {
	          pickingIds[lastIndex] = _pickingId;
	        }
	
	        lastIndex++;
	      }
	
	      var attributes = {
	        positions: vertices,
	        colors: colours
	      };
	
	      if (pickingIds) {
	        attributes.pickingIds = pickingIds;
	      }
	
	      return attributes;
	    }
	  }, {
	    key: 'isSingle',
	    value: function isSingle(coordinates) {
	      return !Array.isArray(coordinates[0][0]);
	    }
	  }]);
	
	  return PolylineLayer;
	})(_Layer3['default']);
	
	exports['default'] = PolylineLayer;
	
	var noNew = function noNew(coordinates, options) {
	  return new PolylineLayer(coordinates, options);
	};
	
	exports.polylineLayer = noNew;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: Move duplicated logic between geometry layrs into GeometryLayer
	
	// TODO: Look at ways to drop unneeded references to array buffers, etc to
	// reduce memory footprint
	
	// TODO: Point features may be using custom models / meshes and so an approach
	// needs to be found to allow these to be brokwn down into buffer attributes for
	// merging
	//
	// Can probably use fromGeometry() or setFromObject() from THREE.BufferGeometry
	// and pull out the attributes
	
	// TODO: Support sprite objects using textures
	
	// TODO: Provide option to billboard geometry so it always faces the camera
	
	// TODO: Support dynamic updating / hiding / animation of geometry
	//
	// This could be pretty hard as it's all packed away within BufferGeometry and
	// may even be merged by another layer (eg. GeoJSONLayer)
	//
	// How much control should this layer support? Perhaps a different or custom
	// layer would be better suited for animation, for example.
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(10);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(6);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _geoPoint = __webpack_require__(8);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _PolygonLayer = __webpack_require__(84);
	
	var _PolygonLayer2 = _interopRequireDefault(_PolygonLayer);
	
	var PointLayer = (function (_Layer) {
	  _inherits(PointLayer, _Layer);
	
	  function PointLayer(coordinates, options) {
	    _classCallCheck(this, PointLayer);
	
	    var defaults = {
	      output: true,
	      interactive: false,
	      // THREE.Geometry or THREE.BufferGeometry to use for point output
	      pointGeometry: null,
	      // Custom material override
	      //
	      // TODO: Should this be in the style object?
	      pointMaterial: null,
	      onPointMesh: null,
	      // This default style is separate to Util.GeoJSON.defaultStyle
	      style: {
	        pointColor: '#ff0000'
	      }
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(PointLayer.prototype), 'constructor', this).call(this, _options);
	
	    // Return coordinates as array of points so it's easy to support
	    // MultiPoint features (a single point would be a MultiPoint with a
	    // single point in the array)
	    this._coordinates = PointLayer.isSingle(coordinates) ? [coordinates] : coordinates;
	
	    this._flat = false;
	  }
	
	  _createClass(PointLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        _this._setCoordinates();
	
	        if (_this._options.interactive) {
	          // Only add to picking mesh if this layer is controlling output
	          //
	          // Otherwise, assume another component will eventually add a mesh to
	          // the picking scene
	          if (_this.isOutput()) {
	            _this._pickingMesh = new _three2['default'].Object3D();
	            _this.addToPicking(_this._pickingMesh);
	          }
	
	          _this._setPickingId();
	          _this._addPickingEvents();
	        }
	
	        // Store geometry representation as instances of THREE.BufferAttribute
	        PointLayer.SetBufferAttributes(_this._projectedCoordinates, _this._options).then(function (result) {
	          _this._bufferAttributes = _utilBuffer2['default'].mergeAttributes(result.attributes);
	          _this._flat = result.flat;
	
	          var attributeLengths = {
	            positions: 3,
	            normals: 3,
	            colors: 3
	          };
	
	          if (_this._options.interactive) {
	            attributeLengths.pickingIds = 1;
	          }
	
	          if (_this.isOutput()) {
	            var style = _this._options.style;
	
	            // Set mesh if not merging elsewhere
	            // TODO: Dedupe with PolygonLayer as they are identical
	            PointLayer.SetMesh(_this._bufferAttributes, attributeLengths, _this._flat, style, _this._options, _this._world._environment._skybox).then(function (result) {
	              // Output mesh
	              _this.add(result.mesh);
	
	              if (result.pickingMesh) {
	                _this._pickingMesh.add(result.pickingMesh);
	              }
	            });
	          }
	
	          result.attributes = null;
	          result = null;
	
	          resolve(_this);
	        })['catch'](reject);
	      });
	    }
	
	    // Return center of point as a LatLon
	    //
	    // This is used for things like placing popups / UI elements on the layer
	  }, {
	    key: 'getCenter',
	    value: function getCenter() {
	      return this._center;
	    }
	
	    // Return point bounds in geographic coordinates
	    //
	    // While not useful for single points, it could be useful for MultiPoint
	    //
	    // TODO: Implement getBounds()
	  }, {
	    key: 'getBounds',
	    value: function getBounds() {}
	
	    // Get unique ID for picking interaction
	  }, {
	    key: '_setPickingId',
	    value: function _setPickingId() {
	      this._pickingId = this.getPickingId();
	    }
	
	    // Set up and re-emit interaction events
	  }, {
	    key: '_addPickingEvents',
	    value: function _addPickingEvents() {
	      var _this2 = this;
	
	      // TODO: Find a way to properly remove this listener on destroy
	      this._world.on('pick-' + this._pickingId, function (point2d, point3d, intersects) {
	        // Re-emit click event from the layer
	        _this2.emit('click', _this2, point2d, point3d, intersects);
	      });
	    }
	  }, {
	    key: 'getBufferAttributes',
	    value: function getBufferAttributes() {
	      return this._bufferAttributes;
	    }
	
	    // Used by external components to clear some memory when the attributes
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the attributes here after merging them
	    // using something like the GeoJSONLayer
	  }, {
	    key: 'clearBufferAttributes',
	    value: function clearBufferAttributes() {
	      this._bufferAttributes = null;
	    }
	
	    // Used by external components to clear some memory when the coordinates
	    // are no longer required to be stored in this layer
	    //
	    // For example, you would want to clear the coordinates here after this
	    // layer is merged in something like the GeoJSONLayer
	  }, {
	    key: 'clearCoordinates',
	    value: function clearCoordinates() {
	      this._coordinates = null;
	      this._projectedCoordinates = null;
	    }
	  }, {
	    key: '_setCoordinates',
	
	    // Convert and project coordinates
	    //
	    // TODO: Calculate bounds
	    value: function _setCoordinates() {
	      this._bounds = [];
	      this._coordinates = this._convertCoordinates(this._coordinates);
	
	      this._projectedBounds = [];
	      this._projectedCoordinates = this._projectCoordinates();
	
	      this._center = this._coordinates;
	    }
	
	    // Recursively convert input coordinates into LatLon objects
	    //
	    // Calculate geographic bounds at the same time
	    //
	    // TODO: Calculate geographic bounds
	  }, {
	    key: '_convertCoordinates',
	    value: function _convertCoordinates(coordinates) {
	      return coordinates.map(function (coordinate) {
	        return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	      });
	    }
	
	    // Recursively project coordinates into world positions
	    //
	    // Calculate world bounds, offset and pointScale at the same time
	    //
	    // TODO: Calculate world bounds
	  }, {
	    key: '_projectCoordinates',
	    value: function _projectCoordinates() {
	      var _this3 = this;
	
	      var _point;
	      return this._coordinates.map(function (latlon) {
	        _point = _this3._world.latLonToPoint(latlon);
	
	        // TODO: Is offset ever being used or needed?
	        if (!_this3._offset) {
	          _this3._offset = (0, _geoPoint.point)(0, 0);
	          _this3._offset.x = -1 * _point.x;
	          _this3._offset.y = -1 * _point.y;
	
	          _this3._options.pointScale = _this3._world.pointScale(latlon);
	        }
	
	        return _point;
	      });
	    }
	
	    // Returns true if the line is flat (has no height)
	  }, {
	    key: 'isFlat',
	    value: function isFlat() {
	      return this._flat;
	    }
	
	    // Returns true if coordinates refer to a single geometry
	    //
	    // For example, not coordinates for a MultiPoint GeoJSON feature
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      if (this._pickingMesh) {
	        // TODO: Properly dispose of picking mesh
	        this._pickingMesh = null;
	      }
	
	      this.clearCoordinates();
	      this.clearBufferAttributes();
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(PointLayer.prototype), 'destroy', this).call(this);
	    }
	  }], [{
	    key: 'SetBufferAttributes',
	    value: function SetBufferAttributes(coordinates, options) {
	      return new Promise(function (resolve) {
	        var height = 0;
	
	        // Convert height into world units
	        if (options.style.pointHeight) {
	          height = _geoGeo2['default'].metresToWorld(options.style.pointHeight, options.pointScale);
	        }
	
	        var colour = new _three2['default'].Color();
	        colour.set(options.style.pointColor);
	
	        // Use default geometry if none has been provided or the provided geometry
	        // isn't valid
	        if (!options.pointGeometry || !options.pointGeometry instanceof _three2['default'].Geometry || !options.pointGeometry instanceof _three2['default'].BufferGeometry) {
	          // Debug geometry for points is a thin bar
	          //
	          // TODO: Allow point geometry to be customised / overridden
	          var geometryWidth = _geoGeo2['default'].metresToWorld(25, options.pointScale);
	          var geometryHeight = _geoGeo2['default'].metresToWorld(200, options.pointScale);
	          var _geometry = new _three2['default'].BoxGeometry(geometryWidth, geometryHeight, geometryWidth);
	
	          // Shift geometry up so it sits on the ground
	          _geometry.translate(0, geometryHeight * 0.5, 0);
	
	          // Pull attributes out of debug geometry
	          geometry = new _three2['default'].BufferGeometry().fromGeometry(_geometry);
	        } else {
	          if (options.geometry instanceof _three2['default'].BufferGeometry) {
	            geometry = options.pointGeometry;
	          } else {
	            geometry = new _three2['default'].BufferGeometry().fromGeometry(options.pointGeometry);
	          }
	        }
	
	        var attributes = coordinates.map(function (coordinate) {
	          var _vertices = [];
	          var _normals = [];
	          var _colours = [];
	
	          var _geometry = geometry.clone();
	          _geometry.translate(coordinate.x, height, coordinate.y);
	
	          var _vertices = _geometry.attributes.position.clone().array;
	          var _normals = _geometry.attributes.normal.clone().array;
	          var _colours = _geometry.attributes.color.clone().array;
	
	          for (var i = 0; i < _colours.length; i += 3) {
	            _colours[i] = colour.r;
	            _colours[i + 1] = colour.g;
	            _colours[i + 2] = colour.b;
	          }
	
	          var _point = {
	            positions: _vertices,
	            normals: _normals,
	            colors: _colours
	          };
	
	          if (options.interactive && options.pickingId) {
	            // Inject picking ID
	            _point.pickingId = options.pickingId;
	          }
	
	          return _point;
	        });
	
	        resolve({
	          attributes: attributes,
	          flat: false
	        });
	      });
	    }
	  }, {
	    key: 'SetMesh',
	    value: function SetMesh(attributes, attributeLengths, flat, style, options, skybox) {
	      var geometry = new _three2['default'].BufferGeometry();
	
	      for (var key in attributes) {
	        geometry.addAttribute(key.slice(0, -1), new _three2['default'].BufferAttribute(attributes[key], attributeLengths[key]));
	      }
	
	      geometry.computeBoundingBox();
	
	      var material;
	      if (options.pointMaterial && options.pointMaterial instanceof _three2['default'].Material) {
	        material = options.pointMaterial;
	      } else if (!skybox) {
	        material = new _three2['default'].MeshPhongMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          // side: THREE.BackSide,
	          transparent: style.transparent,
	          opacity: style.opacity,
	          blending: style.blending
	        });
	      } else {
	        material = new _three2['default'].MeshStandardMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          // side: THREE.BackSide,
	          transparent: style.transparent,
	          opacity: style.opacity,
	          blending: style.blending
	        });
	        material.roughness = 1;
	        material.metalness = 0.1;
	        material.envMapIntensity = 3;
	        material.envMap = skybox.getRenderTarget();
	      }
	
	      var mesh;
	
	      // Pass mesh through callback, if defined
	      if (typeof options.onPolygonMesh === 'function') {
	        mesh = options.onPolygonMesh(geometry, material);
	      } else {
	        mesh = new _three2['default'].Mesh(geometry, material);
	
	        mesh.castShadow = true;
	        mesh.receiveShadow = true;
	      }
	
	      if (flat) {
	        material.depthWrite = false;
	        mesh.renderOrder = 4;
	      }
	
	      if (options.interactive) {
	        material = new _enginePickingMaterial2['default']();
	        material.side = _three2['default'].BackSide;
	
	        var pickingMesh = new _three2['default'].Mesh(geometry, material);
	      }
	
	      return Promise.resolve({
	        mesh: mesh,
	        pickingMesh: pickingMesh
	      });
	    }
	  }, {
	    key: 'isSingle',
	    value: function isSingle(coordinates) {
	      return !Array.isArray(coordinates[0]);
	    }
	  }]);
	
	  return PointLayer;
	})(_Layer3['default']);
	
	exports['default'] = PointLayer;
	
	var noNew = function noNew(coordinates, options) {
	  return new PointLayer(coordinates, options);
	};
	
	exports.pointLayer = noNew;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(34);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _reqwest = __webpack_require__(73);
	
	var _reqwest2 = _interopRequireDefault(_reqwest);
	
	var _utilGeoJSON = __webpack_require__(75);
	
	var _utilGeoJSON2 = _interopRequireDefault(_utilGeoJSON);
	
	var _utilWorker = __webpack_require__(46);
	
	var _utilWorker2 = _interopRequireDefault(_utilWorker);
	
	var _utilBuffer = __webpack_require__(81);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _utilStringify = __webpack_require__(88);
	
	var _utilStringify2 = _interopRequireDefault(_utilStringify);
	
	var _geometryPolygonLayer = __webpack_require__(84);
	
	var _geometryPolygonLayer2 = _interopRequireDefault(_geometryPolygonLayer);
	
	var _geometryPolylineLayer = __webpack_require__(85);
	
	var _geometryPolylineLayer2 = _interopRequireDefault(_geometryPolylineLayer);
	
	var _geometryPointLayer = __webpack_require__(86);
	
	var _geometryPointLayer2 = _interopRequireDefault(_geometryPointLayer);
	
	var _geoLatLon = __webpack_require__(7);
	
	var _geoPoint = __webpack_require__(8);
	
	var _geoGeo = __webpack_require__(6);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _enginePickingMaterial = __webpack_require__(82);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	// TODO: Allow filter method to be run inside a worker to improve performance
	// TODO: Allow onEachFeature method to be run inside a worker to improve performance
	
	var GeoJSONWorkerLayer = (function (_Layer) {
	  _inherits(GeoJSONWorkerLayer, _Layer);
	
	  function GeoJSONWorkerLayer(geojson, options) {
	    _classCallCheck(this, GeoJSONWorkerLayer);
	
	    var defaults = {
	      topojson: false,
	      style: _utilGeoJSON2['default'].defaultStyle,
	      onEachFeature: null,
	      onEachFeatureWorker: null,
	      onAddAttributes: null,
	      interactive: false,
	      pointGeometry: null,
	      onClick: null,
	      headers: {}
	    };
	
	    var _options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    if (typeof options.style === 'object') {
	      _options.style = (0, _lodashAssign2['default'])({}, defaults.style, options.style);
	    }
	
	    _get(Object.getPrototypeOf(GeoJSONWorkerLayer.prototype), 'constructor', this).call(this, _options);
	
	    this._aborted = false;
	    this._geojson = geojson;
	  }
	
	  _createClass(GeoJSONWorkerLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      if (this._options.interactive) {
	        // Worker layer always controls output to add a picking mesh
	        this._pickingMesh = new THREE.Object3D();
	      }
	
	      // Process GeoJSON
	      return this._process(this._geojson);
	    }
	
	    // Use workers to request and process GeoJSON, returning data structure
	    // containing geometry and any supplementary data for output
	  }, {
	    key: '_process',
	    value: function _process(_geojson) {
	      var _this = this;
	
	      return new Promise(function (resolve, reject) {
	        var style = _this._options.style;
	
	        // TODO: Convert to buffer and use transferrable objects
	        if (typeof _this._options.style === 'function') {
	          style = _utilStringify2['default'].functionToString(_this._options.style);
	        }
	
	        var pointGeometry = _this._options.pointGeometry;
	
	        // TODO: Convert to buffer and use transferrable objects
	        if (typeof _this._options.pointGeometry === 'function') {
	          pointGeometry = _utilStringify2['default'].functionToString(_this._options.pointGeometry);
	        }
	
	        var geojson = _geojson;
	        var transferrables = [];
	
	        if (typeof geojson !== 'string') {
	          _this._geojson = geojson = _utilBuffer2['default'].stringToUint8Array(JSON.stringify(geojson));
	          transferrables.push(geojson.buffer);
	          _this._execWorker(geojson, _this._options.topojson, _this._world._originPoint, style, _this._options.interactive, pointGeometry, transferrables).then(function () {
	            resolve();
	          })['catch'](reject);
	        } else if (typeof _this._options.filter === 'function' || typeof _this._options.onEachFeature === 'function') {
	          GeoJSONWorkerLayer.RequestGeoJSON(geojson).then(function (res) {
	            // if (this._aborted) {
	            //   resolve();
	            //   return;
	            // }
	
	            var fc = _utilGeoJSON2['default'].collectFeatures(res, _this._options.topojson);
	            var features = fc.features;
	
	            // Run filter, if provided
	            if (_this._options.filter) {
	              fc.features = features.filter(_this._options.filter);
	            }
	
	            if (_this._options.onEachFeature) {
	              var feature;
	              for (var i = 0; i < features.length; i++) {
	                feature = features[i];
	                _this._options.onEachFeature(feature);
	              };
	            }
	
	            _this._geojson = geojson = _utilBuffer2['default'].stringToUint8Array(JSON.stringify(fc));
	            transferrables.push(geojson.buffer);
	
	            _this._execWorker(geojson, false, _this._options.headers, _this._world._originPoint, style, _this._options.interactive, pointGeometry, transferrables).then(function () {
	              resolve();
	            })['catch'](reject);
	          });
	        } else {
	          _this._execWorker(geojson, _this._options.topojson, _this._options.headers, _this._world._originPoint, style, _this._options.interactive, pointGeometry, transferrables).then(function () {
	            resolve();
	          })['catch'](reject);
	        }
	      });
	    }
	  }, {
	    key: '_execWorker',
	    value: function _execWorker(geojson, topojson, headers, originPoint, style, interactive, pointGeometry, transferrables) {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        console.time('Worker round trip');
	
	        _utilWorker2['default'].exec('GeoJSONWorkerLayer.Process', [geojson, topojson, headers, originPoint, style, interactive, pointGeometry], transferrables).then(function (results) {
	          console.timeEnd('Worker round trip');
	
	          // if (this._aborted) {
	          //   resolve();
	          //   return;
	          // }
	
	          var processPromises = [];
	
	          if (results.polygons) {
	            processPromises.push(_this2._processPolygonResults(results.polygons));
	          }
	
	          if (results.polylines) {
	            processPromises.push(_this2._processPolylineResults(results.polylines));
	          }
	
	          if (results.points) {
	            processPromises.push(_this2._processPointResults(results.points));
	          }
	
	          if (processPromises.length > 0) {
	            Promise.all(processPromises).then(function () {
	              resolve();
	            })['catch'](reject);
	          } else {
	            resolve();
	          }
	        });
	      });
	    }
	
	    // TODO: Dedupe with polyline method
	  }, {
	    key: '_processPolygonResults',
	    value: function _processPolygonResults(results) {
	      var _this3 = this;
	
	      return new Promise(function (resolve, reject) {
	        var splitPositions = _utilBuffer2['default'].splitFloat32Array(results.attributes.positions);
	        var splitNormals = _utilBuffer2['default'].splitFloat32Array(results.attributes.normals);
	        var splitColors = _utilBuffer2['default'].splitFloat32Array(results.attributes.colors);
	        var splitTops = _utilBuffer2['default'].splitFloat32Array(results.attributes.tops);
	
	        var splitOutlinePositions;
	        var splitOutlineColors;
	
	        if (results.outlineAttributes) {
	          splitOutlinePositions = _utilBuffer2['default'].splitFloat32Array(results.outlineAttributes.positions);
	          splitOutlineColors = _utilBuffer2['default'].splitFloat32Array(results.outlineAttributes.colors);
	        }
	
	        var splitProperties;
	        if (results.properties) {
	          splitProperties = _utilBuffer2['default'].splitUint8Array(results.properties);
	        }
	
	        var flats = results.flats;
	
	        var objects = [];
	        var outlineObjects = [];
	
	        var obj;
	        var pickingId;
	        var pickingIds;
	        var properties;
	
	        var polygonAttributeLengths = {
	          positions: 3,
	          normals: 3,
	          colors: 3,
	          tops: 1
	        };
	
	        var polygonOutlineAttributeLengths = {
	          positions: 3,
	          colors: 3
	        };
	
	        for (var i = 0; i < splitPositions.length; i++) {
	          if (splitProperties && splitProperties[i]) {
	            properties = JSON.parse(_utilBuffer2['default'].uint8ArrayToString(splitProperties[i]));
	          } else {
	            properties = {};
	          }
	
	          // WORKERS: obj.attributes should actually an array of polygons for
	          // the feature, though the current logic isn't aware of that
	          obj = {
	            attributes: [{
	              positions: splitPositions[i],
	              normals: splitNormals[i],
	              colors: splitColors[i],
	              tops: splitTops[i]
	            }],
	            properties: properties,
	            flat: flats[i]
	          };
	
	          // WORKERS: If interactive, generate unique ID for each feature, create
	          // the buffer attributes and set up event listeners
	          if (_this3._options.interactive) {
	            pickingId = _this3.getPickingId();
	
	            pickingIds = new Float32Array(splitPositions[i].length / 3);
	            pickingIds.fill(pickingId);
	
	            obj.attributes[0].pickingIds = pickingIds;
	
	            polygonAttributeLengths.pickingIds = 1;
	
	            _this3._addPicking(pickingId, properties);
	          }
	
	          // TODO: Make this specific to polygon attributes
	          if (typeof _this3._options.onAddAttributes === 'function') {
	            var customAttributes = _this3._options.onAddAttributes(obj.attributes[0], properties);
	            var customAttribute;
	            for (var key in customAttributes) {
	              customAttribute = customAttributes[key];
	              obj.attributes[0][key] = customAttribute.value;
	              polygonAttributeLengths[key] = customAttribute.length;
	            }
	          }
	
	          objects.push(obj);
	        }
	
	        for (var i = 0; i < splitOutlinePositions.length; i++) {
	          obj = {
	            attributes: [{
	              positions: splitOutlinePositions[i],
	              colors: splitOutlineColors[i]
	            }],
	            flat: true
	          };
	
	          outlineObjects.push(obj);
	        }
	
	        var polygonAttributes = [];
	        var polygonOutlineAttributes = [];
	
	        var polygonFlat = true;
	
	        for (var i = 0; i < objects.length; i++) {
	          obj = objects[i];
	
	          // TODO: Work out why obj.flat is rarely set to something other than
	          // true or false. Potentially undefined.
	          if (polygonFlat && obj.flat === false) {
	            polygonFlat = false;
	          }
	
	          var bufferAttributes = _utilBuffer2['default'].mergeAttributes(obj.attributes);
	          polygonAttributes.push(bufferAttributes);
	        };
	
	        for (var i = 0; i < outlineObjects.length; i++) {
	          obj = outlineObjects[i];
	
	          var bufferAttributes = _utilBuffer2['default'].mergeAttributes(obj.attributes);
	          polygonOutlineAttributes.push(bufferAttributes);
	        };
	
	        var outputPromises = [];
	
	        var style;
	
	        if (polygonAttributes.length > 0) {
	          var mergedPolygonAttributes = _utilBuffer2['default'].mergeAttributes(polygonAttributes);
	
	          // TODO: Make this work when style is a function per feature
	          style = typeof _this3._options.style === 'function' ? _this3._options.style(objects[0]) : _this3._options.style;
	          style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	          outputPromises.push(_this3._setPolygonMesh(mergedPolygonAttributes, polygonAttributeLengths, style, polygonFlat));
	        }
	
	        if (polygonOutlineAttributes.length > 0) {
	          var mergedPolygonOutlineAttributes = _utilBuffer2['default'].mergeAttributes(polygonOutlineAttributes);
	
	          style = typeof _this3._options.style === 'function' ? _this3._options.style(objects[0]) : _this3._options.style;
	          style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	          if (style.outlineRenderOrder !== undefined) {
	            style.lineRenderOrder = style.outlineRenderOrder;
	          } else {
	            style.lineRenderOrder = style.renderOrder ? style.renderOrder + 1 : 4;
	          }
	
	          if (style.outlineWidth) {
	            style.lineWidth = style.outlineWidth;
	          }
	
	          outputPromises.push(_this3._setPolylineMesh(mergedPolygonOutlineAttributes, polygonOutlineAttributeLengths, style, true));
	        }
	
	        Promise.all(outputPromises).then(function (results) {
	          var _results = _slicedToArray(results, 2);
	
	          var polygonResult = _results[0];
	          var outlineResult = _results[1];
	
	          if (polygonResult) {
	            _this3._polygonMesh = polygonResult.mesh;
	            _this3.add(_this3._polygonMesh);
	
	            if (polygonResult.pickingMesh) {
	              _this3._pickingMesh.add(polygonResult.pickingMesh);
	            }
	          }
	
	          if (outlineResult) {
	            _this3.add(outlineResult.mesh);
	          }
	
	          resolve();
	        })['catch'](reject);
	      });
	    }
	
	    // TODO: Dedupe with polygon method
	  }, {
	    key: '_processPolylineResults',
	    value: function _processPolylineResults(results) {
	      var _this4 = this;
	
	      return new Promise(function (resolve, reject) {
	        var splitPositions = _utilBuffer2['default'].splitFloat32Array(results.attributes.positions);
	        var splitColors = _utilBuffer2['default'].splitFloat32Array(results.attributes.colors);
	
	        var splitProperties;
	        if (results.properties) {
	          splitProperties = _utilBuffer2['default'].splitUint8Array(results.properties);
	        }
	
	        var flats = results.flats;
	
	        var objects = [];
	        var obj;
	        var pickingId;
	        var pickingIds;
	        var properties;
	
	        var polylineAttributeLengths = {
	          positions: 3,
	          colors: 3
	        };
	
	        for (var i = 0; i < splitPositions.length; i++) {
	          if (splitProperties && splitProperties[i]) {
	            properties = JSON.parse(_utilBuffer2['default'].uint8ArrayToString(splitProperties[i]));
	          } else {
	            properties = {};
	          }
	
	          // WORKERS: obj.attributes should actually an array of polygons for
	          // the feature, though the current logic isn't aware of that
	          obj = {
	            attributes: [{
	              positions: splitPositions[i],
	              colors: splitColors[i]
	            }],
	            properties: properties,
	            flat: flats[i]
	          };
	
	          // WORKERS: If interactive, generate unique ID for each feature, create
	          // the buffer attributes and set up event listeners
	          if (_this4._options.interactive) {
	            pickingId = _this4.getPickingId();
	
	            pickingIds = new Float32Array(splitPositions[i].length / 3);
	            pickingIds.fill(pickingId);
	
	            obj.attributes[0].pickingIds = pickingIds;
	
	            polylineAttributeLengths.pickingIds = 1;
	
	            _this4._addPicking(pickingId, properties);
	          }
	
	          // TODO: Make this specific to polyline attributes
	          if (typeof _this4._options.onAddAttributes === 'function') {
	            var customAttributes = _this4._options.onAddAttributes(obj.attributes[0], properties);
	            var customAttribute;
	            for (var key in customAttributes) {
	              customAttribute = customAttributes[key];
	              obj.attributes[0][key] = customAttribute.value;
	              polylineAttributeLengths[key] = customAttribute.length;
	            }
	          }
	
	          objects.push(obj);
	        }
	
	        var polylineAttributes = [];
	
	        var polylineFlat = true;
	
	        for (var i = 0; i < objects.length; i++) {
	          obj = objects[i];
	
	          if (polylineFlat && !obj.flat) {
	            polylineFlat = false;
	          }
	
	          var bufferAttributes = _utilBuffer2['default'].mergeAttributes(obj.attributes);
	          polylineAttributes.push(bufferAttributes);
	        };
	
	        if (polylineAttributes.length > 0) {
	          var mergedPolylineAttributes = _utilBuffer2['default'].mergeAttributes(polylineAttributes);
	
	          // TODO: Make this work when style is a function per feature
	          var style = typeof _this4._options.style === 'function' ? _this4._options.style(objects[0]) : _this4._options.style;
	          style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	          _this4._setPolylineMesh(mergedPolylineAttributes, polylineAttributeLengths, style, polylineFlat).then(function (result) {
	            _this4._polylineMesh = result.mesh;
	            _this4.add(_this4._polylineMesh);
	
	            if (result.pickingMesh) {
	              _this4._pickingMesh.add(result.pickingMesh);
	            }
	
	            resolve();
	          })['catch'](reject);
	        } else {
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: '_processPointResults',
	    value: function _processPointResults(results) {
	      var _this5 = this;
	
	      return new Promise(function (resolve, reject) {
	        var splitPositions = _utilBuffer2['default'].splitFloat32Array(results.attributes.positions);
	        var splitNormals = _utilBuffer2['default'].splitFloat32Array(results.attributes.normals);
	        var splitColors = _utilBuffer2['default'].splitFloat32Array(results.attributes.colors);
	
	        var splitProperties;
	        if (results.properties) {
	          splitProperties = _utilBuffer2['default'].splitUint8Array(results.properties);
	        }
	
	        var flats = results.flats;
	
	        var objects = [];
	        var obj;
	        var pickingId;
	        var pickingIds;
	        var properties;
	
	        var pointAttributeLengths = {
	          positions: 3,
	          normals: 3,
	          colors: 3
	        };
	
	        for (var i = 0; i < splitPositions.length; i++) {
	          if (splitProperties && splitProperties[i]) {
	            properties = JSON.parse(_utilBuffer2['default'].uint8ArrayToString(splitProperties[i]));
	          } else {
	            properties = {};
	          }
	
	          // WORKERS: obj.attributes should actually an array of polygons for
	          // the feature, though the current logic isn't aware of that
	          obj = {
	            attributes: [{
	              positions: splitPositions[i],
	              normals: splitNormals[i],
	              colors: splitColors[i]
	            }],
	            properties: properties,
	            flat: flats[i]
	          };
	
	          // WORKERS: If interactive, generate unique ID for each feature, create
	          // the buffer attributes and set up event listeners
	          if (_this5._options.interactive) {
	            pickingId = _this5.getPickingId();
	
	            pickingIds = new Float32Array(splitPositions[i].length / 3);
	            pickingIds.fill(pickingId);
	
	            obj.attributes[0].pickingIds = pickingIds;
	
	            pointAttributeLengths.pickingIds = 1;
	
	            _this5._addPicking(pickingId, properties);
	          }
	
	          // TODO: Make this specific to polygon attributes
	          if (typeof _this5._options.onAddAttributes === 'function') {
	            var customAttributes = _this5._options.onAddAttributes(obj.attributes[0], properties);
	            var customAttribute;
	            for (var key in customAttributes) {
	              customAttribute = customAttributes[key];
	              obj.attributes[0][key] = customAttribute.value;
	              pointAttributeLengths[key] = customAttribute.length;
	            }
	          }
	
	          objects.push(obj);
	        }
	
	        var pointAttributes = [];
	
	        var pointFlat = true;
	
	        for (var i = 0; i < objects.length; i++) {
	          obj = objects[i];
	
	          if (pointFlat && !obj.flat) {
	            pointFlat = false;
	          }
	
	          var bufferAttributes = _utilBuffer2['default'].mergeAttributes(obj.attributes);
	          pointAttributes.push(bufferAttributes);
	        };
	
	        if (pointAttributes.length > 0) {
	          var mergedPointAttributes = _utilBuffer2['default'].mergeAttributes(pointAttributes);
	
	          // TODO: Make this work when style is a function per feature
	          var style = typeof _this5._options.style === 'function' ? _this5._options.style(objects[0]) : _this5._options.style;
	          style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, style);
	
	          _this5._setPointMesh(mergedPointAttributes, pointAttributeLengths, style, pointFlat).then(function (result) {
	            _this5._pointMesh = result.mesh;
	            _this5.add(_this5._pointMesh);
	
	            if (result.pickingMesh) {
	              _this5._pickingMesh.add(result.pickingMesh);
	            }
	
	            resolve();
	          })['catch'](reject);
	        } else {
	          resolve();
	        }
	      });
	    }
	
	    // TODO: At some point this needs to return all the features to the main thread
	    // so it can generate meshes and output to the scene, as well as perhaps creating
	    // individual layers / components for each feature to track things like picking
	    // and properties
	    //
	    // TODO: Find a way so the origin point isn't needed to be passed in as it
	    // feels a bit messy and against the idea of a static Geo class
	    //
	    // TODO: Support passing custom geometry for point layers
	  }, {
	    key: '_setPolygonMesh',
	
	    // Create and store mesh from buffer attributes
	    //
	    // Could make this an abstract method for each geometry layer
	    value: function _setPolygonMesh(attributes, attributeLengths, style, flat) {
	      if (!this._world) {
	        return Promise.reject();
	      }
	
	      return _geometryPolygonLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options, this._world._environment._skybox);
	    }
	  }, {
	    key: '_setPolylineMesh',
	    value: function _setPolylineMesh(attributes, attributeLengths, style, flat) {
	      if (!this._world) {
	        return Promise.reject();
	      }
	
	      return _geometryPolylineLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options);
	    }
	  }, {
	    key: '_setPointMesh',
	    value: function _setPointMesh(attributes, attributeLengths, style, flat) {
	      if (!this._world) {
	        return Promise.reject();
	      }
	
	      return _geometryPointLayer2['default'].SetMesh(attributes, attributeLengths, flat, style, this._options, this._world._environment._skybox);
	    }
	
	    // Set up and re-emit interaction events
	  }, {
	    key: '_addPicking',
	    value: function _addPicking(pickingId, properties) {
	      var _this6 = this;
	
	      this._world.on('pick-click-' + pickingId, function (pickingId, point2d, point3d, intersects) {
	        _this6._world.emit('click', _this6, properties, point2d, point3d);
	      });
	
	      this._world.on('pick-hover-' + pickingId, function (pickingId, point2d, point3d, intersects) {
	        _this6._world.emit('hover', _this6, properties, point2d, point3d);
	      });
	    }
	
	    // TODO: Finish cleanup
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(GeoJSONWorkerLayer.prototype), 'destroy', this).call(this);
	    }
	  }], [{
	    key: 'Process',
	    value: function Process(geojson, topojson, headers, originPoint, _style, _properties, _pointGeometry) {
	      return new Promise(function (resolve, reject) {
	        GeoJSONWorkerLayer.ProcessGeoJSON(geojson, headers).then(function (res) {
	          // Collects features into a single FeatureCollection
	          //
	          // Also converts TopoJSON to GeoJSON if instructed
	          var geojson = _utilGeoJSON2['default'].collectFeatures(res, topojson);
	
	          // TODO: Check that GeoJSON is valid / usable
	
	          var features = geojson.features;
	
	          // TODO: Run filter, if provided (must be static)
	
	          var pointScale;
	          var polygons = [];
	          var polylines = [];
	          var points = [];
	
	          // Deserialise style function if provided
	          if (typeof _style === 'string') {
	            _style = _utilStringify2['default'].stringToFunction(_style);
	          }
	
	          // Assume that a style won't be set per feature
	          var style = _style;
	
	          var pointGeometry;
	          // Deserialise pointGeometry function if provided
	          if (typeof _pointGeometry === 'string') {
	            pointGeometry = _utilStringify2['default'].stringToFunction(_pointGeometry);
	          }
	
	          var feature;
	          for (var i = 0; i < features.length; i++) {
	            feature = features[i];
	
	            var geometry = feature.geometry;
	            var coordinates = geometry.coordinates ? geometry.coordinates : null;
	
	            if (!coordinates || !geometry) {
	              return;
	            }
	
	            // Get per-feature style object, if provided
	            if (typeof _style === 'function') {
	              style = (0, _lodashAssign2['default'])({}, _utilGeoJSON2['default'].defaultStyle, _style(feature));
	              // console.log(feature, style);
	            }
	
	            if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
	              coordinates = _geometryPolygonLayer2['default'].isSingle(coordinates) ? [coordinates] : coordinates;
	
	              var converted = coordinates.map(function (_coordinates) {
	                return _coordinates.map(function (ring) {
	                  return ring.map(function (coordinate) {
	                    return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	                  });
	                });
	              });
	
	              var point;
	              var projected = converted.map(function (_coordinates) {
	                return _coordinates.map(function (ring) {
	                  return ring.map(function (latlon) {
	                    point = _geoGeo2['default'].latLonToPoint(latlon)._subtract(originPoint);
	
	                    if (!pointScale) {
	                      pointScale = _geoGeo2['default'].pointScale(latlon);
	                    }
	
	                    return point;
	                  });
	                });
	              });
	
	              var polygon = {
	                projected: projected,
	                options: {
	                  pointScale: pointScale,
	                  style: style
	                }
	              };
	
	              if (_properties) {
	                polygon.properties = feature.properties;
	              }
	
	              polygons.push(polygon);
	            }
	
	            if (geometry.type === 'LineString' || geometry.type === 'MultiLineString') {
	              coordinates = _geometryPolylineLayer2['default'].isSingle(coordinates) ? [coordinates] : coordinates;
	
	              var converted = coordinates.map(function (_coordinates) {
	                return _coordinates.map(function (coordinate) {
	                  return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	                });
	              });
	
	              var point;
	              var projected = converted.map(function (_coordinates) {
	                return _coordinates.map(function (latlon) {
	                  point = _geoGeo2['default'].latLonToPoint(latlon)._subtract(originPoint);
	
	                  if (!pointScale) {
	                    pointScale = _geoGeo2['default'].pointScale(latlon);
	                  }
	
	                  return point;
	                });
	              });
	
	              var polyline = {
	                projected: projected,
	                options: {
	                  pointScale: pointScale,
	                  style: style
	                }
	              };
	
	              if (_properties) {
	                polyline.properties = feature.properties;
	              }
	
	              polylines.push(polyline);
	            }
	
	            if (geometry.type === 'Point' || geometry.type === 'MultiPoint') {
	              coordinates = _geometryPointLayer2['default'].isSingle(coordinates) ? [coordinates] : coordinates;
	
	              var converted = coordinates.map(function (coordinate) {
	                return (0, _geoLatLon.latLon)(coordinate[1], coordinate[0]);
	              });
	
	              var point;
	              var projected = converted.map(function (latlon) {
	                point = _geoGeo2['default'].latLonToPoint(latlon)._subtract(originPoint);
	
	                if (!pointScale) {
	                  pointScale = _geoGeo2['default'].pointScale(latlon);
	                }
	
	                return point;
	              });
	
	              var point = {
	                projected: projected,
	                options: {
	                  pointGeometry: pointGeometry(feature),
	                  pointScale: pointScale,
	                  style: style
	                }
	              };
	
	              if (_properties) {
	                point.properties = feature.properties;
	              }
	
	              points.push(point);
	            }
	          };
	
	          var polygonBufferPromises = [];
	          var polylineBufferPromises = [];
	          var pointBufferPromises = [];
	
	          var polygon;
	          for (var i = 0; i < polygons.length; i++) {
	            polygon = polygons[i];
	            polygonBufferPromises.push(_geometryPolygonLayer2['default'].SetBufferAttributes(polygon.projected, polygon.options));
	          };
	
	          var polyline;
	          for (var i = 0; i < polylines.length; i++) {
	            polyline = polylines[i];
	            polylineBufferPromises.push(_geometryPolylineLayer2['default'].SetBufferAttributes(polyline.projected, polyline.options));
	          };
	
	          var point;
	          for (var i = 0; i < points.length; i++) {
	            point = points[i];
	            pointBufferPromises.push(_geometryPointLayer2['default'].SetBufferAttributes(point.projected, point.options));
	          };
	
	          var data = {};
	          var transferrables = [];
	
	          // TODO: Make this work with polylines too
	          // TODO: Make this so it's not a nest of promises
	          GeoJSONWorkerLayer.ProcessPolygons(polygonBufferPromises, polygons, _properties).then(function (result) {
	            data.polygons = result.data;
	            transferrables = transferrables.concat(result.transferrables);
	
	            GeoJSONWorkerLayer.ProcessPolylines(polylineBufferPromises, polylines, _properties).then(function (result) {
	              data.polylines = result.data;
	              transferrables = transferrables.concat(result.transferrables);
	
	              GeoJSONWorkerLayer.ProcessPoints(pointBufferPromises, points, _properties).then(function (result) {
	                data.points = result.data;
	                transferrables = transferrables.concat(result.transferrables);
	
	                resolve({
	                  data: data,
	                  transferrables: transferrables
	                });
	              });
	            });
	          });
	        });
	      });
	    }
	  }, {
	    key: 'ProcessPolygons',
	    value: function ProcessPolygons(polygonPromises, polygons, _properties) {
	      return new Promise(function (resolve, reject) {
	        Promise.all(polygonPromises).then(function (results) {
	          var transferrables = [];
	
	          var positions = [];
	          var normals = [];
	          var colors = [];
	          var tops = [];
	
	          var outlinePositions = [];
	          var outlineColors = [];
	
	          var properties = [];
	
	          var flats = [];
	          var polygon;
	
	          var result;
	          for (var i = 0; i < results.length; i++) {
	            result = results[i];
	
	            polygon = polygons[i];
	
	            // WORKERS: Making this a typed array will speed up transfer time
	            // As things stand this adds on a few milliseconds
	            flats.push(result.flat);
	
	            // WORKERS: result.attributes is actually an array of polygons for each
	            // feature, though the current logic isn't keeping these all together
	
	            var attributes;
	            for (var j = 0; j < result.attributes.length; j++) {
	              attributes = result.attributes[j];
	
	              positions.push(attributes.positions);
	              normals.push(attributes.normals);
	              colors.push(attributes.colors);
	              tops.push(attributes.tops);
	
	              if (_properties) {
	                properties.push(_utilBuffer2['default'].stringToUint8Array(JSON.stringify(polygon.properties)));
	              }
	            };
	
	            var outlineAttributes;
	            for (var j = 0; j < result.outlineAttributes.length; j++) {
	              outlineAttributes = result.outlineAttributes[j];
	
	              outlinePositions.push(outlineAttributes.positions);
	              outlineColors.push(outlineAttributes.colors);
	            };
	          };
	
	          var mergedAttributes = {
	            positions: _utilBuffer2['default'].mergeFloat32Arrays(positions),
	            normals: _utilBuffer2['default'].mergeFloat32Arrays(normals),
	            colors: _utilBuffer2['default'].mergeFloat32Arrays(colors),
	            tops: _utilBuffer2['default'].mergeFloat32Arrays(tops)
	          };
	
	          var mergedOutlineAttributes = {
	            positions: _utilBuffer2['default'].mergeFloat32Arrays(outlinePositions),
	            colors: _utilBuffer2['default'].mergeFloat32Arrays(outlineColors)
	          };
	
	          transferrables.push(mergedAttributes.positions[0].buffer);
	          transferrables.push(mergedAttributes.positions[1].buffer);
	
	          transferrables.push(mergedAttributes.normals[0].buffer);
	          transferrables.push(mergedAttributes.normals[1].buffer);
	
	          transferrables.push(mergedAttributes.colors[0].buffer);
	          transferrables.push(mergedAttributes.colors[1].buffer);
	
	          transferrables.push(mergedAttributes.tops[0].buffer);
	          transferrables.push(mergedAttributes.tops[1].buffer);
	
	          transferrables.push(mergedOutlineAttributes.positions[0].buffer);
	          transferrables.push(mergedOutlineAttributes.positions[1].buffer);
	
	          transferrables.push(mergedOutlineAttributes.colors[0].buffer);
	          transferrables.push(mergedOutlineAttributes.colors[1].buffer);
	
	          var mergedProperties;
	          if (_properties) {
	            mergedProperties = _utilBuffer2['default'].mergeUint8Arrays(properties);
	
	            transferrables.push(mergedProperties[0].buffer);
	            transferrables.push(mergedProperties[1].buffer);
	          }
	
	          var output = {
	            attributes: mergedAttributes,
	            outlineAttributes: mergedOutlineAttributes,
	            flats: flats
	          };
	
	          if (_properties) {
	            output.properties = mergedProperties;
	          }
	
	          // TODO: Also return GeoJSON features that can be mapped to objects on
	          // the main thread. Allow user to provide filter / toggles to only return
	          // properties from the GeoJSON that they need (eg. don't return geometry,
	          // or don't return properties.height)
	          resolve({
	            data: output,
	            transferrables: transferrables
	          });
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: 'ProcessPolylines',
	    value: function ProcessPolylines(polylinePromises, polylines, _properties) {
	      return new Promise(function (resolve, reject) {
	        Promise.all(polylinePromises).then(function (results) {
	          var transferrables = [];
	
	          var positions = [];
	          var colors = [];
	
	          var properties = [];
	
	          var flats = [];
	          var polyline;
	
	          var result;
	          for (var i = 0; i < results.length; i++) {
	            result = results[i];
	
	            polyline = polylines[i];
	
	            // WORKERS: Making this a typed array will speed up transfer time
	            // As things stand this adds on a few milliseconds
	            flats.push(result.flat);
	
	            // WORKERS: result.attributes is actually an array of polygons for each
	            // feature, though the current logic isn't keeping these all together
	
	            var attributes;
	            for (var j = 0; j < result.attributes.length; j++) {
	              attributes = result.attributes[j];
	
	              positions.push(attributes.positions);
	              colors.push(attributes.colors);
	
	              if (_properties) {
	                properties.push(_utilBuffer2['default'].stringToUint8Array(JSON.stringify(polyline.properties)));
	              }
	            };
	          };
	
	          var mergedAttributes = {
	            positions: _utilBuffer2['default'].mergeFloat32Arrays(positions),
	            colors: _utilBuffer2['default'].mergeFloat32Arrays(colors)
	          };
	
	          transferrables.push(mergedAttributes.positions[0].buffer);
	          transferrables.push(mergedAttributes.positions[1].buffer);
	
	          transferrables.push(mergedAttributes.colors[0].buffer);
	          transferrables.push(mergedAttributes.colors[1].buffer);
	
	          var mergedProperties;
	          if (_properties) {
	            mergedProperties = _utilBuffer2['default'].mergeUint8Arrays(properties);
	
	            transferrables.push(mergedProperties[0].buffer);
	            transferrables.push(mergedProperties[1].buffer);
	          }
	
	          var output = {
	            attributes: mergedAttributes,
	            flats: flats
	          };
	
	          if (_properties) {
	            output.properties = mergedProperties;
	          }
	
	          // TODO: Also return GeoJSON features that can be mapped to objects on
	          // the main thread. Allow user to provide filter / toggles to only return
	          // properties from the GeoJSON that they need (eg. don't return geometry,
	          // or don't return properties.height)
	          resolve({
	            data: output,
	            transferrables: transferrables
	          });
	        })['catch'](reject);
	      });
	    }
	
	    // TODO: Dedupe with ProcessPolygons as they are identical
	  }, {
	    key: 'ProcessPoints',
	    value: function ProcessPoints(pointPromises, points, _properties) {
	      return new Promise(function (resolve, reject) {
	        Promise.all(pointPromises).then(function (results) {
	          var transferrables = [];
	
	          var positions = [];
	          var normals = [];
	          var colors = [];
	
	          var properties = [];
	
	          var flats = [];
	          var point;
	
	          var result;
	          for (var i = 0; i < results.length; i++) {
	            result = results[i];
	
	            point = points[i];
	
	            // WORKERS: Making this a typed array will speed up transfer time
	            // As things stand this adds on a few milliseconds
	            flats.push(result.flat);
	
	            // WORKERS: result.attributes is actually an array of polygons for each
	            // feature, though the current logic isn't keeping these all together
	
	            var attributes;
	            for (var j = 0; j < result.attributes.length; j++) {
	              attributes = result.attributes[j];
	
	              positions.push(attributes.positions);
	              normals.push(attributes.normals);
	              colors.push(attributes.colors);
	
	              if (_properties) {
	                properties.push(_utilBuffer2['default'].stringToUint8Array(JSON.stringify(polygon.properties)));
	              }
	            };
	          };
	
	          var mergedAttributes = {
	            positions: _utilBuffer2['default'].mergeFloat32Arrays(positions),
	            normals: _utilBuffer2['default'].mergeFloat32Arrays(normals),
	            colors: _utilBuffer2['default'].mergeFloat32Arrays(colors)
	          };
	
	          transferrables.push(mergedAttributes.positions[0].buffer);
	          transferrables.push(mergedAttributes.positions[1].buffer);
	
	          transferrables.push(mergedAttributes.normals[0].buffer);
	          transferrables.push(mergedAttributes.normals[1].buffer);
	
	          transferrables.push(mergedAttributes.colors[0].buffer);
	          transferrables.push(mergedAttributes.colors[1].buffer);
	
	          var mergedProperties;
	          if (_properties) {
	            mergedProperties = _utilBuffer2['default'].mergeUint8Arrays(properties);
	
	            transferrables.push(mergedProperties[0].buffer);
	            transferrables.push(mergedProperties[1].buffer);
	          }
	
	          var output = {
	            attributes: mergedAttributes,
	            flats: flats
	          };
	
	          if (_properties) {
	            output.properties = mergedProperties;
	          }
	
	          // TODO: Also return GeoJSON features that can be mapped to objects on
	          // the main thread. Allow user to provide filter / toggles to only return
	          // properties from the GeoJSON that they need (eg. don't return geometry,
	          // or don't return properties.height)
	          resolve({
	            data: output,
	            transferrables: transferrables
	          });
	        })['catch'](reject);
	      });
	    }
	  }, {
	    key: 'ProcessGeoJSON',
	    value: function ProcessGeoJSON(geojson, headers) {
	      if (typeof geojson === 'string') {
	        return GeoJSONWorkerLayer.RequestGeoJSON(geojson, headers);
	      } else {
	        return Promise.resolve(JSON.parse(_utilBuffer2['default'].uint8ArrayToString(geojson)));
	      }
	    }
	  }, {
	    key: 'RequestGeoJSON',
	    value: function RequestGeoJSON(path, headers) {
	      return (0, _reqwest2['default'])({
	        url: path,
	        type: 'json',
	        crossOrigin: true,
	        headers: headers
	      });
	    }
	  }]);
	
	  return GeoJSONWorkerLayer;
	})(_Layer3['default']);
	
	exports['default'] = GeoJSONWorkerLayer;
	
	var noNew = function noNew(geojson, options) {
	  return new GeoJSONWorkerLayer(geojson, options);
	};
	
	exports.geoJSONWorkerLayer = noNew;

/***/ },
/* 88 */
/***/ function(module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var Stringify = (function () {
	  var functionToString = function functionToString(f) {
	    return f.toString();
	  };
	
	  // Based on https://github.com/tangrams/tangram/blob/2a31893c814cf15d5077f87ffa10af20160716b9/src/utils/utils.js#L245
	  var stringToFunction = function stringToFunction(str) {
	    if (typeof str === 'string' && str.match(/^\s*function\s*\w*\s*\([\s\S]*\)\s*\{[\s\S]*\}/m) != null) {
	      var f;
	
	      try {
	        eval('f = ' + str);
	        return f;
	      } catch (err) {
	        return str;
	      }
	    }
	  };
	
	  return {
	    functionToString: functionToString,
	    stringToFunction: stringToFunction
	  };
	})();
	
	exports['default'] = Stringify;
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _GeoJSONTileLayer2 = __webpack_require__(70);
	
	var _GeoJSONTileLayer3 = _interopRequireDefault(_GeoJSONTileLayer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var TopoJSONTileLayer = (function (_GeoJSONTileLayer) {
	  _inherits(TopoJSONTileLayer, _GeoJSONTileLayer);
	
	  function TopoJSONTileLayer(path, options) {
	    _classCallCheck(this, TopoJSONTileLayer);
	
	    var defaults = {
	      topojson: true
	    };
	
	    options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(TopoJSONTileLayer.prototype), 'constructor', this).call(this, path, options);
	  }
	
	  return TopoJSONTileLayer;
	})(_GeoJSONTileLayer3['default']);
	
	exports['default'] = TopoJSONTileLayer;
	
	var noNew = function noNew(path, options) {
	  return new TopoJSONTileLayer(path, options);
	};
	
	exports.topoJSONTileLayer = noNew;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _GeoJSONLayer2 = __webpack_require__(72);
	
	var _GeoJSONLayer3 = _interopRequireDefault(_GeoJSONLayer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var TopoJSONLayer = (function (_GeoJSONLayer) {
	  _inherits(TopoJSONLayer, _GeoJSONLayer);
	
	  function TopoJSONLayer(topojson, options) {
	    _classCallCheck(this, TopoJSONLayer);
	
	    var defaults = {
	      topojson: true
	    };
	
	    options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(TopoJSONLayer.prototype), 'constructor', this).call(this, topojson, options);
	  }
	
	  return TopoJSONLayer;
	})(_GeoJSONLayer3['default']);
	
	exports['default'] = TopoJSONLayer;
	
	var noNew = function noNew(topojson, options) {
	  return new TopoJSONLayer(topojson, options);
	};
	
	// Initialise without requiring new keyword
	exports.topoJSONLayer = noNew;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _GeoJSONWorkerLayer2 = __webpack_require__(87);
	
	var _GeoJSONWorkerLayer3 = _interopRequireDefault(_GeoJSONWorkerLayer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var TopoJSONWorkerLayer = (function (_GeoJSONWorkerLayer) {
	  _inherits(TopoJSONWorkerLayer, _GeoJSONWorkerLayer);
	
	  function TopoJSONWorkerLayer(topojson, options) {
	    _classCallCheck(this, TopoJSONWorkerLayer);
	
	    var defaults = {
	      topojson: true
	    };
	
	    options = (0, _lodashAssign2['default'])({}, defaults, options);
	
	    _get(Object.getPrototypeOf(TopoJSONWorkerLayer.prototype), 'constructor', this).call(this, topojson, options);
	  }
	
	  return TopoJSONWorkerLayer;
	})(_GeoJSONWorkerLayer3['default']);
	
	exports['default'] = TopoJSONWorkerLayer;
	
	var noNew = function noNew(topojson, options) {
	  return new TopoJSONWorkerLayer(topojson, options);
	};
	
	// Initialise without requiring new keyword
	exports.topoJSONWorkerLayer = noNew;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: A lot of these utils don't need to be in separate, tiny files
	
	var _wrapNum = __webpack_require__(93);
	
	var _wrapNum2 = _interopRequireDefault(_wrapNum);
	
	var _extrudePolygon = __webpack_require__(80);
	
	var _extrudePolygon2 = _interopRequireDefault(_extrudePolygon);
	
	var _GeoJSON = __webpack_require__(75);
	
	var _GeoJSON2 = _interopRequireDefault(_GeoJSON);
	
	var _Buffer = __webpack_require__(81);
	
	var _Buffer2 = _interopRequireDefault(_Buffer);
	
	var _Worker = __webpack_require__(46);
	
	var _Worker2 = _interopRequireDefault(_Worker);
	
	var _Stringify = __webpack_require__(88);
	
	var _Stringify2 = _interopRequireDefault(_Stringify);
	
	var Util = {};
	
	Util.wrapNum = _wrapNum2['default'];
	Util.extrudePolygon = _extrudePolygon2['default'];
	Util.GeoJSON = _GeoJSON2['default'];
	Util.Buffer = _Buffer2['default'];
	Util.Worker = _Worker2['default'];
	Util.Stringify = _Stringify2['default'];
	
	exports['default'] = Util;
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*
	 * Wrap the given number to lie within a certain range (eg. longitude)
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/core/Util.js
	 */
	
	var wrapNum = function wrapNum(x, range, includeMax) {
	  var max = range[1];
	  var min = range[0];
	  var d = max - min;
	  return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	};
	
	exports["default"] = wrapNum;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;