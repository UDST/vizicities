(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("proj4"), require("THREE"));
	else if(typeof define === 'function' && define.amd)
		define(["proj4", "THREE"], factory);
	else if(typeof exports === 'object')
		exports["VIZI"] = factory(require("proj4"), require("THREE"));
	else
		root["VIZI"] = factory(root["proj4"], root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_24__) {
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
	
	var _controlsIndex = __webpack_require__(28);
	
	var _controlsIndex2 = _interopRequireDefault(_controlsIndex);
	
	var _layerEnvironmentEnvironmentLayer = __webpack_require__(31);
	
	var _layerEnvironmentEnvironmentLayer2 = _interopRequireDefault(_layerEnvironmentEnvironmentLayer);
	
	var _layerTileImageTileLayer = __webpack_require__(37);
	
	var _layerTileImageTileLayer2 = _interopRequireDefault(_layerTileImageTileLayer);
	
	var _layerTileTopoJSONTileLayer = __webpack_require__(52);
	
	var _layerTileTopoJSONTileLayer2 = _interopRequireDefault(_layerTileTopoJSONTileLayer);
	
	var _geoPoint = __webpack_require__(11);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(10);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var VIZI = {
	  version: '0.3',
	
	  // Public API
	  World: _World2['default'],
	  Controls: _controlsIndex2['default'],
	  EnvironmentLayer: _layerEnvironmentEnvironmentLayer2['default'],
	  ImageTileLayer: _layerTileImageTileLayer2['default'],
	  TopoJSONTileLayer: _layerTileTopoJSONTileLayer2['default'],
	  Point: _geoPoint2['default'],
	  LatLon: _geoLatLon2['default']
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
	
	var _geoCRSIndex = __webpack_require__(6);
	
	var _geoCRSIndex2 = _interopRequireDefault(_geoCRSIndex);
	
	var _geoPoint = __webpack_require__(11);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(10);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _engineEngine = __webpack_require__(23);
	
	var _engineEngine2 = _interopRequireDefault(_engineEngine);
	
	// Pretty much any event someone using ViziCities would need will be emitted or
	// proxied by World (eg. render events, etc)
	
	var World = (function (_EventEmitter) {
	  _inherits(World, _EventEmitter);
	
	  function World(domId, options) {
	    _classCallCheck(this, World);
	
	    _get(Object.getPrototypeOf(World.prototype), 'constructor', this).call(this);
	
	    var defaults = {
	      crs: _geoCRSIndex2['default'].EPSG3857,
	      skybox: false
	    };
	
	    this.options = (0, _lodashAssign2['default'])(defaults, options);
	
	    this._layers = [];
	    this._controls = [];
	
	    this._initContainer(domId);
	    this._initEngine();
	    this._initEnvironment();
	    this._initEvents();
	
	    // Kick off the update and render loop
	    this._update();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(World, [{
	    key: '_initContainer',
	    value: function _initContainer(domId) {
	      this._container = document.getElementById(domId);
	    }
	  }, {
	    key: '_initEngine',
	    value: function _initEngine() {
	      this._engine = (0, _engineEngine2['default'])(this._container);
	
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
	      this._environment = VIZI.EnvironmentLayer({
	        skybox: this.options.skybox
	      }).addTo(this);
	    }
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      this.on('controlsMoveEnd', this._onControlsMoveEnd);
	    }
	  }, {
	    key: '_onControlsMoveEnd',
	    value: function _onControlsMoveEnd(point) {
	      var _point = (0, _geoPoint2['default'])(point.x, point.z);
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
	      var delta = this._engine.clock.getDelta();
	
	      // Once _update is called it will run forever, for now
	      window.requestAnimationFrame(this._update.bind(this));
	
	      // Update controls
	      this._controls.forEach(function (controls) {
	        controls.update();
	      });
	
	      this.emit('preUpdate', delta);
	      this._engine.update(delta);
	      this.emit('postUpdate', delta);
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
	      return this.options.crs.latLonToPoint((0, _geoLatLon2['default'])(latlon));
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
	      return this.options.crs.pointToLatLon((0, _geoPoint2['default'])(point));
	    }
	
	    // Takes into account the origin offset
	    //
	    // For example, this takes a geographic coordinate and returns a point
	    // relative to the three.js / 3D origin (0,0)
	  }, {
	    key: 'latLonToPoint',
	    value: function latLonToPoint(latlon) {
	      var projectedPoint = this.project((0, _geoLatLon2['default'])(latlon));
	      return projectedPoint._subtract(this._originPoint);
	    }
	
	    // Takes into account the origin offset
	    //
	    // For example, this takes a point relative to the three.js / 3D origin (0,0)
	    // and returns the exact geographic coordinate at that point
	  }, {
	    key: 'pointToLatLon',
	    value: function pointToLatLon(point) {
	      var projectedPoint = (0, _geoPoint2['default'])(point).add(this._originPoint);
	      return this.unproject(projectedPoint);
	    }
	
	    // Return pointscale for a given geographic coordinate
	  }, {
	    key: 'pointScale',
	    value: function pointScale(latlon, accurate) {
	      return this.options.crs.pointScale(latlon, accurate);
	    }
	
	    // Convert from real meters to world units
	    //
	    // TODO: Would be nice not to have to pass in a pointscale here
	  }, {
	    key: 'metresToWorld',
	    value: function metresToWorld(metres, pointScale, zoom) {
	      return this.options.crs.metresToWorld(metres, pointScale, zoom);
	    }
	
	    // Convert from real meters to world units
	    //
	    // TODO: Would be nice not to have to pass in a pointscale here
	  }, {
	    key: 'worldToMetres',
	    value: function worldToMetres(worldUnits, pointScale, zoom) {
	      return this.options.crs.worldToMetres(worldUnits, pointScale, zoom);
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
	      layer._addToWorld(this);
	
	      this._layers.push(layer);
	
	      // Could move this into Layer but it'll do here for now
	      this._engine._scene.add(layer._layer);
	
	      this.emit('layerAdded', layer);
	      return this;
	    }
	
	    // Remove layer and perform clean up operations
	  }, {
	    key: 'removeLayer',
	    value: function removeLayer(layer) {
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
	  }, {
	    key: 'addControls',
	    value: function addControls(controls) {
	      controls._addToWorld(this);
	
	      this._controls.push(controls);
	
	      this.emit('controlsAdded', controls);
	      return this;
	    }
	  }, {
	    key: 'removeControls',
	    value: function removeControls(controls) {}
	  }]);
	
	  return World;
	})(_eventemitter32['default']);
	
	exports['default'] = function (domId, options) {
	  return new World(domId, options);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	 * @param {Boolean} once Only emit once
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
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
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
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
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
	 * @param {Mixed} context The context of the function.
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
	 * lodash 4.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
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
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
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
	  if ((!eq(objValue, value) ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
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
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
	
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
	
	    customizer = typeof customizer == 'function' ? (length--, customizer) : undefined;
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
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
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
	 * @type Function
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
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
	
	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
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
	  copyObject(source, keys(source), object);
	});
	
	module.exports = assign;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
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
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
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
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
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
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
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
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	 * @type Function
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
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
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
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
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
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
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
	 * @param {...*} args The arguments to invoke `func` with.
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
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
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
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
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
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _CRSEPSG3857 = __webpack_require__(7);
	
	var _CRSEPSG38572 = _interopRequireDefault(_CRSEPSG3857);
	
	var _CRSEPSG3395 = __webpack_require__(15);
	
	var _CRSEPSG33952 = _interopRequireDefault(_CRSEPSG3395);
	
	var _CRSEPSG4326 = __webpack_require__(17);
	
	var _CRSEPSG43262 = _interopRequireDefault(_CRSEPSG4326);
	
	var _CRSSimple = __webpack_require__(19);
	
	var _CRSSimple2 = _interopRequireDefault(_CRSSimple);
	
	var _CRSProj4 = __webpack_require__(20);
	
	var _CRSProj42 = _interopRequireDefault(_CRSProj4);
	
	var CRS = {};
	
	CRS.EPSG3857 = _CRSEPSG38572['default'];
	CRS.EPSG900913 = _CRSEPSG3857.EPSG900913;
	CRS.EPSG3395 = _CRSEPSG33952['default'];
	CRS.EPSG4326 = _CRSEPSG43262['default'];
	CRS.Simple = _CRSSimple2['default'];
	CRS.Proj4 = _CRSProj42['default'];
	
	exports['default'] = CRS;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS.EPSG3857 (WGS 84 / Pseudo-Mercator) CRS implementation.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG3857.js
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRSEarth = __webpack_require__(8);
	
	var _CRSEarth2 = _interopRequireDefault(_CRSEarth);
	
	var _projectionProjectionSphericalMercator = __webpack_require__(13);
	
	var _projectionProjectionSphericalMercator2 = _interopRequireDefault(_projectionProjectionSphericalMercator);
	
	var _utilTransformation = __webpack_require__(14);
	
	var _utilTransformation2 = _interopRequireDefault(_utilTransformation);
	
	var _EPSG3857 = {
	  code: 'EPSG:3857',
	  projection: _projectionProjectionSphericalMercator2['default'],
	
	  // Work out how to de-dupe this (scoping issue)
	  transformScale: 1 / (Math.PI * _projectionProjectionSphericalMercator2['default'].R),
	
	  // Scale and transformation inputs changed to account for central origin in
	  // WebGL, instead of top-left origin used in Leaflet
	  transformation: (function () {
	    // TODO: Cannot use this.transformScale due to scope
	    var scale = 1 / (Math.PI * _projectionProjectionSphericalMercator2['default'].R);
	
	    return new _utilTransformation2['default'](scale, 0, -scale, 0);
	  })()
	};
	
	var EPSG3857 = (0, _lodashAssign2['default'])({}, _CRSEarth2['default'], _EPSG3857);
	
	var EPSG900913 = (0, _lodashAssign2['default'])({}, EPSG3857, {
	  code: 'EPSG:900913'
	});
	
	exports.EPSG900913 = EPSG900913;
	exports['default'] = EPSG3857;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS.Earth is the base class for all CRS representing Earth.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.Earth.js
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRS = __webpack_require__(9);
	
	var _CRS2 = _interopRequireDefault(_CRS);
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var Earth = {
	  wrapLon: [-180, 180],
	
	  R: 6378137,
	
	  // Distance between two geographical points using spherical law of cosines
	  // approximation or Haversine
	  //
	  // See: http://www.movable-type.co.uk/scripts/latlong.html
	  distance: function distance(latlon1, latlon2, accurate) {
	    var rad = Math.PI / 180;
	
	    var lat1;
	    var lat2;
	
	    var a;
	
	    if (!accurate) {
	      lat1 = latlon1.lat * rad;
	      lat2 = latlon2.lat * rad;
	
	      a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlon2.lon - latlon1.lon) * rad);
	
	      return this.R * Math.acos(Math.min(a, 1));
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
	
	      return this.R * c;
	    }
	  },
	
	  // Scale factor for converting between real metres and projected metres
	  //
	  // projectedMetres = realMetres * pointScale
	  // realMetres = projectedMetres / pointScale
	  //
	  // Defaults to a scale factor of 1 if no calculation method exists
	  //
	  // Probably need to run this through the CRS transformation or similar so the
	  // resulting scale is relative to the dimensions of the world space
	  // Eg. 1 metre in projected space is likly scaled up or down to some other
	  // number
	  pointScale: function pointScale(latlon, accurate) {
	    return this.projection.pointScale ? this.projection.pointScale(latlon, accurate) : [1, 1];
	  },
	
	  // Convert real metres to projected units
	  //
	  // Latitude scale is chosen because it fluctuates more than longitude
	  metresToProjected: function metresToProjected(metres, pointScale) {
	    return metres * pointScale[1];
	  },
	
	  // Convert projected units to real metres
	  //
	  // Latitude scale is chosen because it fluctuates more than longitude
	  projectedToMetres: function projectedToMetres(projectedUnits, pointScale) {
	    return projectedUnits / pointScale[1];
	  },
	
	  // Convert real metres to a value in world (WebGL) units
	  metresToWorld: function metresToWorld(metres, pointScale, zoom) {
	    // Transform metres to projected metres using the latitude point scale
	    //
	    // Latitude scale is chosen because it fluctuates more than longitude
	    var projectedMetres = this.metresToProjected(metres, pointScale);
	
	    var scale = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      scale /= 2;
	    }
	
	    // Scale projected metres
	    var scaledMetres = scale * (this.transformScale * projectedMetres);
	
	    // Not entirely sure why this is neccessary
	    if (zoom) {
	      scaledMetres /= pointScale[1];
	    }
	
	    return scaledMetres;
	  },
	
	  // Convert world (WebGL) units to a value in real metres
	  worldToMetres: function worldToMetres(worldUnits, pointScale, zoom) {
	    var scale = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      scale /= 2;
	    }
	
	    var projectedUnits = worldUnits / scale / this.transformScale;
	    var realMetres = this.projectedToMetres(projectedUnits, pointScale);
	
	    // Not entirely sure why this is neccessary
	    if (zoom) {
	      realMetres *= pointScale[1];
	    }
	
	    return realMetres;
	  }
	};
	
	exports['default'] = (0, _lodashAssign2['default'])({}, _CRS2['default'], Earth);
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS is the base object for all defined CRS (Coordinate Reference Systems)
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.js
	 */
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var _Point = __webpack_require__(11);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var _utilWrapNum = __webpack_require__(12);
	
	var _utilWrapNum2 = _interopRequireDefault(_utilWrapNum);
	
	var CRS = {
	  // Scale factor determines final dimensions of world space
	  //
	  // Projection transformation in range -1 to 1 is multiplied by scale factor to
	  // find final world coordinates
	  //
	  // Scale factor can be considered as half the amount of the desired dimension
	  // for the largest side when transformation is equal to 1 or -1, or as the
	  // distance between 0 and 1 on the largest side
	  //
	  // For example, if you want the world dimensions to be between -1000 and 1000
	  // then the scale factor will be 1000
	  scaleFactor: 1000000,
	
	  // Converts geo coords to pixel / WebGL ones
	  latLonToPoint: function latLonToPoint(latlon, zoom) {
	    var projectedPoint = this.projection.project(latlon);
	    var scale = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      scale /= 2;
	    }
	
	    return this.transformation._transform(projectedPoint, scale);
	  },
	
	  // Converts pixel / WebGL coords to geo coords
	  pointToLatLon: function pointToLatLon(point, zoom) {
	    var scale = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      scale /= 2;
	    }
	
	    var untransformedPoint = this.transformation.untransform(point, scale);
	
	    return this.projection.unproject(untransformedPoint);
	  },
	
	  // Converts geo coords to projection-specific coords (e.g. in meters)
	  project: function project(latlon) {
	    return this.projection.project(latlon);
	  },
	
	  // Converts projected coords to geo coords
	  unproject: function unproject(point) {
	    return this.projection.unproject(point);
	  },
	
	  // If zoom is provided, returns the map width in pixels for a given zoom
	  // Else, provides fixed scale value
	  scale: function scale(zoom) {
	    // If zoom is provided then return scale based on map tile zoom
	    if (zoom >= 0) {
	      return 256 * Math.pow(2, zoom);
	      // Else, return fixed scale value to expand projected coordinates from
	      // their 0 to 1 range into something more practical
	    } else {
	        return this.scaleFactor;
	      }
	  },
	
	  // Returns zoom level for a given scale value
	  // This only works with a scale value that is based on map pixel width
	  zoom: function zoom(scale) {
	    return Math.log(scale / 256) / Math.LN2;
	  },
	
	  // Returns the bounds of the world in projected coords if applicable
	  getProjectedBounds: function getProjectedBounds(zoom) {
	    if (this.infinite) {
	      return null;
	    }
	
	    var b = this.projection.bounds;
	    var s = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      s /= 2;
	    }
	
	    // Bottom left
	    var min = this.transformation.transform((0, _Point2['default'])(b[0]), s);
	
	    // Top right
	    var max = this.transformation.transform((0, _Point2['default'])(b[1]), s);
	
	    return [min, max];
	  },
	
	  // Whether a coordinate axis wraps in a given range (e.g. longitude from -180 to 180); depends on CRS
	  // wrapLon: [min, max],
	  // wrapLat: [min, max],
	
	  // If true, the coordinate space will be unbounded (infinite in all directions)
	  // infinite: false,
	
	  // Wraps geo coords in certain ranges if applicable
	  wrapLatLon: function wrapLatLon(latlon) {
	    var lat = this.wrapLat ? (0, _utilWrapNum2['default'])(latlon.lat, this.wrapLat, true) : latlon.lat;
	    var lon = this.wrapLon ? (0, _utilWrapNum2['default'])(latlon.lon, this.wrapLon, true) : latlon.lon;
	    var alt = latlon.alt;
	
	    return (0, _LatLon2['default'])(lat, lon, alt);
	  }
	};
	
	exports['default'] = CRS;
	module.exports = exports['default'];

/***/ },
/* 10 */
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
	
	  // Initialise without requiring new keyword
	  //
	  // Accepts (LatLon), ([lat, lon, alt]), ([lat, lon]) and (lat, lon, alt)
	  // Also converts between lng and lon
	
	  _createClass(LatLon, [{
	    key: 'clone',
	    value: function clone() {
	      return new LatLon(this.lat, this.lon, this.alt);
	    }
	  }]);
	
	  return LatLon;
	})();
	
	exports['default'] = function (a, b, c) {
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
	
	;
	module.exports = exports['default'];

/***/ },
/* 11 */
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
	
	  // Accepts (point), ([x, y]) and (x, y, round)
	
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
	exports["default"] = _point;
	module.exports = exports["default"];

/***/ },
/* 12 */
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS
	 * used by default.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.SphericalMercator.js
	 */
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var _Point = __webpack_require__(11);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var SphericalMercator = {
	  // Radius / WGS84 semi-major axis
	  R: 6378137,
	  MAX_LATITUDE: 85.0511287798,
	
	  // WGS84 eccentricity
	  ECC: 0.081819191,
	  ECC2: 0.081819191 * 0.081819191,
	
	  project: function project(latlon) {
	    var d = Math.PI / 180;
	    var max = this.MAX_LATITUDE;
	    var lat = Math.max(Math.min(max, latlon.lat), -max);
	    var sin = Math.sin(lat * d);
	
	    return (0, _Point2['default'])(this.R * latlon.lon * d, this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	  },
	
	  unproject: function unproject(point) {
	    var d = 180 / Math.PI;
	
	    return (0, _LatLon2['default'])((2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d, point.x * d / this.R);
	  },
	
	  // Scale factor for converting between real metres and projected metres
	  //
	  // projectedMetres = realMetres * pointScale
	  // realMetres = projectedMetres / pointScale
	  //
	  // Accurate scale factor uses proper Web Mercator scaling
	  // See pg.9: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
	  // See: http://jsfiddle.net/robhawkes/yws924cf/
	  pointScale: function pointScale(latlon, accurate) {
	    var rad = Math.PI / 180;
	
	    var k;
	
	    if (!accurate) {
	      k = 1 / Math.cos(latlon.lat * rad);
	
	      // [scaleX, scaleY]
	      return [k, k];
	    } else {
	      var lat = latlon.lat * rad;
	      var lon = latlon.lon * rad;
	
	      var a = this.R;
	
	      var sinLat = Math.sin(lat);
	      var sinLat2 = sinLat * sinLat;
	
	      var cosLat = Math.cos(lat);
	
	      // Radius meridian
	      var p = a * (1 - this.ECC2) / Math.pow(1 - this.ECC2 * sinLat2, 3 / 2);
	
	      // Radius prime meridian
	      var v = a / Math.sqrt(1 - this.ECC2 * sinLat2);
	
	      // Scale N/S
	      var h = a / p / cosLat;
	
	      // Scale E/W
	      k = a / v / cosLat;
	
	      // [scaleX, scaleY]
	      return [k, h];
	    }
	  },
	
	  // Not using this.R due to scoping
	  bounds: (function () {
	    var d = 6378137 * Math.PI;
	    return [[-d, -d], [d, d]];
	  })()
	};
	
	exports['default'] = SphericalMercator;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	/*
	 * Transformation is an utility class to perform simple point transformations
	 * through a 2d-matrix.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geometry/Transformation.js
	 */
	
	var _geoPoint = __webpack_require__(11);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var Transformation = (function () {
	  function Transformation(a, b, c, d) {
	    _classCallCheck(this, Transformation);
	
	    this._a = a;
	    this._b = b;
	    this._c = c;
	    this._d = d;
	  }
	
	  _createClass(Transformation, [{
	    key: 'transform',
	    value: function transform(point, scale) {
	      // Copy input point as to not destroy the original data
	      return this._transform(point.clone(), scale);
	    }
	
	    // Destructive transform (faster)
	  }, {
	    key: '_transform',
	    value: function _transform(point, scale) {
	      scale = scale || 1;
	
	      point.x = scale * (this._a * point.x + this._b);
	      point.y = scale * (this._c * point.y + this._d);
	      return point;
	    }
	  }, {
	    key: 'untransform',
	    value: function untransform(point, scale) {
	      scale = scale || 1;
	      return (0, _geoPoint2['default'])((point.x / scale - this._b) / this._a, (point.y / scale - this._d) / this._c);
	    }
	  }]);
	
	  return Transformation;
	})();
	
	exports['default'] = Transformation;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS.EPSG3395 (WGS 84 / World Mercator) CRS implementation.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG3395.js
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRSEarth = __webpack_require__(8);
	
	var _CRSEarth2 = _interopRequireDefault(_CRSEarth);
	
	var _projectionProjectionMercator = __webpack_require__(16);
	
	var _projectionProjectionMercator2 = _interopRequireDefault(_projectionProjectionMercator);
	
	var _utilTransformation = __webpack_require__(14);
	
	var _utilTransformation2 = _interopRequireDefault(_utilTransformation);
	
	var _EPSG3395 = {
	  code: 'EPSG:3395',
	  projection: _projectionProjectionMercator2['default'],
	
	  // Work out how to de-dupe this (scoping issue)
	  transformScale: 1 / (Math.PI * _projectionProjectionMercator2['default'].R),
	
	  // Scale and transformation inputs changed to account for central origin in
	  // WebGL, instead of top-left origin used in Leaflet
	  transformation: (function () {
	    // TODO: Cannot use this.transformScale due to scope
	    var scale = 1 / (Math.PI * _projectionProjectionMercator2['default'].R);
	
	    return new _utilTransformation2['default'](scale, 0, -scale, 0);
	  })()
	};
	
	var EPSG3395 = (0, _lodashAssign2['default'])({}, _CRSEarth2['default'], _EPSG3395);
	
	exports['default'] = EPSG3395;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * Mercator projection that takes into account that the Earth is not a perfect
	 * sphere. Less popular than spherical mercator; used by projections like
	 * EPSG:3395.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.Mercator.js
	 */
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var _Point = __webpack_require__(11);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var Mercator = {
	  // Radius / WGS84 semi-major axis
	  R: 6378137,
	  R_MINOR: 6356752.314245179,
	
	  // WGS84 eccentricity
	  ECC: 0.081819191,
	  ECC2: 0.081819191 * 0.081819191,
	
	  project: function project(latlon) {
	    var d = Math.PI / 180;
	    var r = this.R;
	    var y = latlon.lat * d;
	    var tmp = this.R_MINOR / r;
	    var e = Math.sqrt(1 - tmp * tmp);
	    var con = e * Math.sin(y);
	
	    var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
	    y = -r * Math.log(Math.max(ts, 1E-10));
	
	    return (0, _Point2['default'])(latlon.lon * d * r, y);
	  },
	
	  unproject: function unproject(point) {
	    var d = 180 / Math.PI;
	    var r = this.R;
	    var tmp = this.R_MINOR / r;
	    var e = Math.sqrt(1 - tmp * tmp);
	    var ts = Math.exp(-point.y / r);
	    var phi = Math.PI / 2 - 2 * Math.atan(ts);
	
	    for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
	      con = e * Math.sin(phi);
	      con = Math.pow((1 - con) / (1 + con), e / 2);
	      dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
	      phi += dphi;
	    }
	
	    return (0, _LatLon2['default'])(phi * d, point.x * d / r);
	  },
	
	  // Scale factor for converting between real metres and projected metres
	  //
	  // projectedMetres = realMetres * pointScale
	  // realMetres = projectedMetres / pointScale
	  //
	  // See pg.8: http://www.hydrometronics.com/downloads/Web%20Mercator%20-%20Non-Conformal,%20Non-Mercator%20(notes).pdf
	  pointScale: function pointScale(latlon) {
	    var rad = Math.PI / 180;
	    var lat = latlon.lat * rad;
	    var sinLat = Math.sin(lat);
	    var sinLat2 = sinLat * sinLat;
	    var cosLat = Math.cos(lat);
	
	    var k = Math.sqrt(1 - this.ECC2 * sinLat2) / cosLat;
	
	    // [scaleX, scaleY]
	    return [k, k];
	  },
	
	  bounds: [[-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]]
	};
	
	exports['default'] = Mercator;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.EPSG4326.js
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRSEarth = __webpack_require__(8);
	
	var _CRSEarth2 = _interopRequireDefault(_CRSEarth);
	
	var _projectionProjectionLatLon = __webpack_require__(18);
	
	var _projectionProjectionLatLon2 = _interopRequireDefault(_projectionProjectionLatLon);
	
	var _utilTransformation = __webpack_require__(14);
	
	var _utilTransformation2 = _interopRequireDefault(_utilTransformation);
	
	var _EPSG4326 = {
	  code: 'EPSG:4326',
	  projection: _projectionProjectionLatLon2['default'],
	
	  // Work out how to de-dupe this (scoping issue)
	  transformScale: 1 / 180,
	
	  // Scale and transformation inputs changed to account for central origin in
	  // WebGL, instead of top-left origin used in Leaflet
	  //
	  // TODO: Cannot use this.transformScale due to scope
	  transformation: new _utilTransformation2['default'](1 / 180, 0, -1 / 180, 0)
	};
	
	var EPSG4326 = (0, _lodashAssign2['default'])({}, _CRSEarth2['default'], _EPSG4326);
	
	exports['default'] = EPSG4326;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326
	 * and Simple.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/projection/Projection.LonLat.js
	 */
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var _Point = __webpack_require__(11);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var ProjectionLatLon = {
	  project: function project(latlon) {
	    return (0, _Point2['default'])(latlon.lon, latlon.lat);
	  },
	
	  unproject: function unproject(point) {
	    return (0, _LatLon2['default'])(point.y, point.x);
	  },
	
	  // Scale factor for converting between real metres and degrees
	  //
	  // degrees = realMetres * pointScale
	  // realMetres = degrees / pointScale
	  //
	  // See: http://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
	  // See: http://gis.stackexchange.com/questions/75528/length-of-a-degree-where-do-the-terms-in-this-formula-come-from
	  pointScale: function pointScale(latlon) {
	    var m1 = 111132.92;
	    var m2 = -559.82;
	    var m3 = 1.175;
	    var m4 = -0.0023;
	    var p1 = 111412.84;
	    var p2 = -93.5;
	    var p3 = 0.118;
	
	    var rad = Math.PI / 180;
	    var lat = latlon.lat * rad;
	
	    var latlen = m1 + m2 * Math.cos(2 * lat) + m3 * Math.cos(4 * lat) + m4 * Math.cos(6 * lat);
	    var lonlen = p1 * Math.cos(lat) + p2 * Math.cos(3 * lat) + p3 * Math.cos(5 * lat);
	
	    return [1 / latlen, 1 / lonlen];
	  },
	
	  bounds: [[-180, -90], [180, 90]]
	};
	
	exports['default'] = ProjectionLatLon;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * A simple CRS that can be used for flat non-Earth maps like panoramas or game
	 * maps.
	 *
	 * Based on:
	 * https://github.com/Leaflet/Leaflet/blob/master/src/geo/crs/CRS.Simple.js
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRS = __webpack_require__(9);
	
	var _CRS2 = _interopRequireDefault(_CRS);
	
	var _projectionProjectionLatLon = __webpack_require__(18);
	
	var _projectionProjectionLatLon2 = _interopRequireDefault(_projectionProjectionLatLon);
	
	var _utilTransformation = __webpack_require__(14);
	
	var _utilTransformation2 = _interopRequireDefault(_utilTransformation);
	
	var _Simple = {
	  projection: _projectionProjectionLatLon2['default'],
	
	  // Straight 1:1 mapping (-1, -1 would be top-left)
	  transformation: new _utilTransformation2['default'](1, 0, 1, 0),
	
	  scale: function scale(zoom) {
	    // If zoom is provided then return scale based on map tile zoom
	    if (zoom) {
	      return Math.pow(2, zoom);
	      // Else, make no change to scale – may need to increase this or make it a
	      // user-definable variable
	    } else {
	        return 1;
	      }
	  },
	
	  zoom: function zoom(scale) {
	    return Math.log(scale) / Math.LN2;
	  },
	
	  distance: function distance(latlon1, latlon2) {
	    var dx = latlon2.lon - latlon1.lon;
	    var dy = latlon2.lat - latlon1.lat;
	
	    return Math.sqrt(dx * dx + dy * dy);
	  },
	
	  infinite: true
	};
	
	var Simple = (0, _lodashAssign2['default'])({}, _CRS2['default'], _Simple);
	
	exports['default'] = Simple;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * CRS.Proj4 for any Proj4-supported CRS.
	 */
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _CRSEarth = __webpack_require__(8);
	
	var _CRSEarth2 = _interopRequireDefault(_CRSEarth);
	
	var _projectionProjectionProj4 = __webpack_require__(21);
	
	var _projectionProjectionProj42 = _interopRequireDefault(_projectionProjectionProj4);
	
	var _utilTransformation = __webpack_require__(14);
	
	var _utilTransformation2 = _interopRequireDefault(_utilTransformation);
	
	var _Proj4 = function _Proj4(code, def, bounds) {
	  var projection = (0, _projectionProjectionProj42['default'])(def, bounds);
	
	  // Transformation calcuations
	  var diffX = projection.bounds[1][0] - projection.bounds[0][0];
	  var diffY = projection.bounds[1][1] - projection.bounds[0][1];
	
	  var halfX = diffX / 2;
	  var halfY = diffY / 2;
	
	  // This is the raw scale factor
	  var scaleX = 1 / halfX;
	  var scaleY = 1 / halfY;
	
	  // Find the minimum scale factor
	  //
	  // The minimum scale factor comes from the largest side and is the one
	  // you want to use for both axis so they stay relative in dimension
	  var scale = Math.min(scaleX, scaleY);
	
	  // Find amount to offset each axis by to make the central point lie on
	  // the [0,0] origin
	  var offsetX = scale * (projection.bounds[0][0] + halfX);
	  var offsetY = scale * (projection.bounds[0][1] + halfY);
	
	  return {
	    code: code,
	    projection: projection,
	
	    transformScale: scale,
	
	    // Map the input to a [-1,1] range with [0,0] in the centre
	    transformation: new _utilTransformation2['default'](scale, -offsetX, -scale, offsetY)
	  };
	};
	
	var Proj4 = function Proj4(code, def, bounds) {
	  return (0, _lodashAssign2['default'])({}, _CRSEarth2['default'], _Proj4(code, def, bounds));
	};
	
	exports['default'] = Proj4;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * Proj4 support for any projection.
	 */
	
	var _proj4 = __webpack_require__(22);
	
	var _proj42 = _interopRequireDefault(_proj4);
	
	var _LatLon = __webpack_require__(10);
	
	var _LatLon2 = _interopRequireDefault(_LatLon);
	
	var _Point = __webpack_require__(11);
	
	var _Point2 = _interopRequireDefault(_Point);
	
	var Proj4 = function Proj4(def, bounds) {
	  var proj = (0, _proj42['default'])(def);
	
	  var project = function project(latlon) {
	    return (0, _Point2['default'])(proj.forward([latlon.lon, latlon.lat]));
	  };
	
	  var unproject = function unproject(point) {
	    var inverse = proj.inverse([point.x, point.y]);
	    return (0, _LatLon2['default'])(inverse[1], inverse[0]);
	  };
	
	  return {
	    project: project,
	    unproject: unproject,
	
	    // Scale factor for converting between real metres and projected metres\
	    //
	    // Need to work out the best way to provide the pointScale calculations
	    // for custom, unknown projections (if wanting to override default)
	    //
	    // For now, user can manually override crs.pointScale or
	    // crs.projection.pointScale
	    //
	    // projectedMetres = realMetres * pointScale
	    // realMetres = projectedMetres / pointScale
	    pointScale: function pointScale(latlon, accurate) {
	      return [1, 1];
	    },
	
	    // Try and calculate bounds if none are provided
	    //
	    // This will provide incorrect bounds for some projections, so perhaps make
	    // bounds a required input instead
	    bounds: (function () {
	      if (bounds) {
	        return bounds;
	      } else {
	        var bottomLeft = project([-90, -180]);
	        var topRight = project([90, 180]);
	
	        return [bottomLeft, topRight];
	      }
	    })()
	  };
	};
	
	exports['default'] = Proj4;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
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
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Scene = __webpack_require__(25);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	var _Renderer = __webpack_require__(26);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _Camera = __webpack_require__(27);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var Engine = (function (_EventEmitter) {
	  _inherits(Engine, _EventEmitter);
	
	  function Engine(container) {
	    _classCallCheck(this, Engine);
	
	    console.log('Init Engine');
	
	    _get(Object.getPrototypeOf(Engine.prototype), 'constructor', this).call(this);
	
	    this._scene = _Scene2['default'];
	    this._renderer = (0, _Renderer2['default'])(container);
	    this._camera = (0, _Camera2['default'])(container);
	    this.clock = new _three2['default'].Clock();
	
	    this._frustum = new _three2['default'].Frustum();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(Engine, [{
	    key: 'update',
	    value: function update(delta) {
	      this.emit('preRender');
	      this._renderer.render(this._scene, this._camera);
	      this.emit('postRender');
	    }
	  }]);
	
	  return Engine;
	})(_eventemitter32['default']);
	
	exports['default'] = function (container) {
	  return new Engine(container);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(24);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Scene = __webpack_require__(25);
	
	var _Scene2 = _interopRequireDefault(_Scene);
	
	// This can only be accessed from Engine.renderer if you want to reference the
	// same scene in multiple places
	
	exports['default'] = function (container) {
	  var renderer = new _three2['default'].WebGLRenderer({
	    antialias: true
	  });
	
	  // TODO: Re-enable when this works with the skybox
	  // renderer.setClearColor(Scene.fog.color, 1);
	
	  renderer.setClearColor(0xffffff, 1);
	
	  // Gamma settings make things look nicer
	  renderer.gammaInput = true;
	  renderer.gammaOutput = true;
	
	  renderer.shadowMap.enabled = true;
	  renderer.shadowMap.cullFace = _three2['default'].CullFaceBack;
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	// This can only be accessed from Engine.camera if you want to reference the
	// same scene in multiple places
	
	// TODO: Ensure that FOV looks natural on all aspect ratios
	// http://stackoverflow.com/q/26655930/997339
	
	exports['default'] = function (container) {
	  var camera = new _three2['default'].PerspectiveCamera(45, 1, 1, 200000);
	  camera.position.y = 400;
	  camera.position.z = 400;
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _ControlsOrbit = __webpack_require__(29);
	
	var _ControlsOrbit2 = _interopRequireDefault(_ControlsOrbit);
	
	var Controls = {
	  Orbit: _ControlsOrbit2['default']
	};
	
	exports['default'] = Controls;
	module.exports = exports['default'];

/***/ },
/* 29 */
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
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _vendorOrbitControls = __webpack_require__(30);
	
	var _vendorOrbitControls2 = _interopRequireDefault(_vendorOrbitControls);
	
	var Orbit = (function (_EventEmitter) {
	  _inherits(Orbit, _EventEmitter);
	
	  function Orbit() {
	    _classCallCheck(this, Orbit);
	
	    _get(Object.getPrototypeOf(Orbit.prototype), 'constructor', this).call(this);
	  }
	
	  // Initialise without requiring new keyword
	
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
	    key: '_panTo',
	    value: function _panTo(point, animate) {}
	  }, {
	    key: '_panBy',
	    value: function _panBy(pointDelta, animate) {}
	
	    // Zooming the camera in and out
	  }, {
	    key: '_zoomTo',
	    value: function _zoomTo(metres, animate) {}
	  }, {
	    key: '_zoomBy',
	    value: function _zoomBy(metresDelta, animate) {}
	
	    // Force camera to look at something other than the target
	  }, {
	    key: '_lookAt',
	    value: function _lookAt(point, animate) {}
	
	    // Make camera look at the target
	  }, {
	    key: '_lookAtTarget',
	    value: function _lookAtTarget() {}
	
	    // Tilt (up and down)
	  }, {
	    key: '_tiltTo',
	    value: function _tiltTo(angle, animate) {}
	  }, {
	    key: '_tiltBy',
	    value: function _tiltBy(angleDelta, animate) {}
	
	    // Rotate (left and right)
	  }, {
	    key: '_rotateTo',
	    value: function _rotateTo(angle, animate) {}
	  }, {
	    key: '_rotateBy',
	    value: function _rotateBy(angleDelta, animate) {}
	
	    // Fly to the given point, animating pan and tilt/rotation to final position
	    // with nice zoom out and in
	    //
	    // Calling flyTo a second time before the previous animation has completed
	    // will immediately start the new animation from wherever the previous one
	    // has got to
	  }, {
	    key: '_flyTo',
	    value: function _flyTo(point, noZoom) {}
	
	    // Proxy to OrbitControls.update()
	  }, {
	    key: 'update',
	    value: function update() {
	      this._controls.update();
	    }
	
	    // Add controls to world instance and store world reference
	  }, {
	    key: 'addTo',
	    value: function addTo(world) {
	      world.addControls(this);
	      return this;
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
	
	      this.emit('added');
	    }
	  }]);
	
	  return Orbit;
	})(_eventemitter32['default']);
	
	exports['default'] = function () {
	  return new Orbit();
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/*eslint eqeqeq:0*/
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
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
	
			rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
		}
	
		function handleTouchStartDolly(event) {
	
			//console.log( 'handleTouchStartDolly' );
	
			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;
	
			var distance = Math.sqrt(dx * dx + dy * dy);
	
			dollyStart.set(0, distance);
		}
	
		function handleTouchStartPan(event) {
	
			//console.log( 'handleTouchStartPan' );
	
			panStart.set(event.touches[0].pageX, event.touches[0].pageY);
		}
	
		function handleTouchMoveRotate(event) {
	
			//console.log( 'handleTouchMoveRotate' );
	
			rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
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
	
			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;
	
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
	
			panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
	
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
	
		scope.domElement.addEventListener('touchstart', onTouchStart, false);
		scope.domElement.addEventListener('touchend', onTouchEnd, false);
		scope.domElement.addEventListener('touchmove', onTouchMove, false);
	
		window.addEventListener('keydown', onKeyDown, false);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(32);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Skybox = __webpack_require__(33);
	
	var _Skybox2 = _interopRequireDefault(_Skybox);
	
	var EnvironmentLayer = (function (_Layer) {
	  _inherits(EnvironmentLayer, _Layer);
	
	  function EnvironmentLayer(options) {
	    _classCallCheck(this, EnvironmentLayer);
	
	    _get(Object.getPrototypeOf(EnvironmentLayer.prototype), 'constructor', this).call(this);
	
	    var defaults = {
	      skybox: false
	    };
	
	    this._options = (0, _lodashAssign2['default'])(defaults, options);
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(EnvironmentLayer, [{
	    key: '_onAdd',
	    value: function _onAdd() {
	      this._initLights();
	
	      if (this._options.skybox) {
	        this._initSkybox();
	      }
	
	      // this._initGrid();
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
	        var directionalLight = new _three2['default'].DirectionalLight(0x999999);
	        directionalLight.intesity = 0.1;
	        directionalLight.position.x = 100;
	        directionalLight.position.y = 100;
	        directionalLight.position.z = 100;
	
	        var directionalLight2 = new _three2['default'].DirectionalLight(0x999999);
	        directionalLight2.intesity = 0.1;
	        directionalLight2.position.x = -100;
	        directionalLight2.position.y = 100;
	        directionalLight2.position.z = -100;
	
	        var helper = new _three2['default'].DirectionalLightHelper(directionalLight, 10);
	        var helper2 = new _three2['default'].DirectionalLightHelper(directionalLight2, 10);
	
	        this.add(directionalLight);
	        this.add(directionalLight2);
	
	        this.add(helper);
	        this.add(helper2);
	      } else {
	        // Directional light that will be projected from the sun
	        this._skyboxLight = new _three2['default'].DirectionalLight(0xffffff, 1);
	
	        this._skyboxLight.castShadow = true;
	
	        var d = 1000;
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
	
	        // this._layer.add(new THREE.CameraHelper(this._skyboxLight.shadow.camera));
	
	        this.add(this._skyboxLight);
	      }
	    }
	  }, {
	    key: '_initSkybox',
	    value: function _initSkybox() {
	      this._skybox = (0, _Skybox2['default'])(this._world, this._skyboxLight);
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
	
	exports['default'] = function (options) {
	  return new EnvironmentLayer(options);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 32 */
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
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _engineScene = __webpack_require__(25);
	
	var _engineScene2 = _interopRequireDefault(_engineScene);
	
	var Layer = (function (_EventEmitter) {
	  _inherits(Layer, _EventEmitter);
	
	  function Layer() {
	    _classCallCheck(this, Layer);
	
	    _get(Object.getPrototypeOf(Layer.prototype), 'constructor', this).call(this);
	
	    this._layer = new _three2['default'].Object3D();
	  }
	
	  // Add THREE object directly to layer
	
	  _createClass(Layer, [{
	    key: 'add',
	    value: function add(object) {
	      this._layer.add(object);
	    }
	
	    // Remove THREE object from to layer
	  }, {
	    key: 'remove',
	    value: function remove(object) {
	      this._layer.remove(object);
	    }
	
	    // Add layer to world instance and store world reference
	  }, {
	    key: 'addTo',
	    value: function addTo(world) {
	      world.addLayer(this);
	      return this;
	    }
	
	    // Internal method called by World.addLayer to actually add the layer
	  }, {
	    key: '_addToWorld',
	    value: function _addToWorld(world) {
	      this._world = world;
	      this._onAdd(world);
	      this.emit('added');
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Remove everything else in the layer
	      var child;
	      for (i = this._layer.children.length - 1; i >= 0; i--) {
	        child = this._layer.children[i];
	
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
	
	      this._world = null;
	      this._layer = null;
	    }
	  }]);
	
	  return Layer;
	})(_eventemitter32['default']);
	
	exports['default'] = Layer;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _Sky = __webpack_require__(34);
	
	var _Sky2 = _interopRequireDefault(_Sky);
	
	var _lodashThrottle = __webpack_require__(35);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
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
	
	  // Initialise without requiring new keyword
	
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
	      this._cubeCamera = new _three2['default'].CubeCamera(1, 2000000, 128);
	
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
	
	      this._mesh = new _three2['default'].Mesh(new _three2['default'].BoxGeometry(190000, 190000, 190000), skyboxMat);
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
	      if (!this._done) {
	        this._done = true;
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
	
	exports['default'] = function (world, light) {
	  return new Skybox(world, light);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 34 */
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
	
	var _three = __webpack_require__(24);
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var debounce = __webpack_require__(36);
	
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
	 * on the trailing edge of the timeout only if the the throttled function is
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
	 * // avoid excessively updating the position while scrolling
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // cancel a trailing throttled invocation
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
	  return debounce(func, wait, { 'leading': leading, 'maxWait': wait, 'trailing': trailing });
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
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = throttle;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
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
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
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
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it's invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
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
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      leading = false,
	      maxWait = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(toNumber(options.maxWait) || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    args = maxTimeoutId = thisArg = timeoutId = trailingCall = undefined;
	  }
	
	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }
	
	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }
	
	  function flush() {
	    if ((timeoutId && trailingCall) || (maxTimeoutId && trailing)) {
	      result = func.apply(thisArg, args);
	    }
	    cancel();
	    return result;
	  }
	
	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }
	
	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);
	
	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;
	
	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
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
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
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
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _TileLayer2 = __webpack_require__(38);
	
	var _TileLayer3 = _interopRequireDefault(_TileLayer2);
	
	var _ImageTile = __webpack_require__(48);
	
	var _ImageTile2 = _interopRequireDefault(_ImageTile);
	
	var _ImageTileLayerBaseMaterial = __webpack_require__(51);
	
	var _ImageTileLayerBaseMaterial2 = _interopRequireDefault(_ImageTileLayerBaseMaterial);
	
	var _lodashThrottle = __webpack_require__(35);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
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
	
	var ImageTileLayer = (function (_TileLayer) {
	  _inherits(ImageTileLayer, _TileLayer);
	
	  function ImageTileLayer(path, options) {
	    _classCallCheck(this, ImageTileLayer);
	
	    var defaults = {
	      distance: 40000
	    };
	
	    options = (0, _lodashAssign2['default'])(defaults, options);
	
	    _get(Object.getPrototypeOf(ImageTileLayer.prototype), 'constructor', this).call(this, options);
	
	    this._path = path;
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(ImageTileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      _get(Object.getPrototypeOf(ImageTileLayer.prototype), '_onAdd', this).call(this, world);
	
	      // Add base layer
	      var geom = new _three2['default'].PlaneBufferGeometry(200000, 200000, 1);
	
	      var baseMaterial;
	      if (this._world._environment._skybox) {
	        baseMaterial = (0, _ImageTileLayerBaseMaterial2['default'])('#f5f5f3', this._world._environment._skybox.getRenderTarget());
	      } else {
	        baseMaterial = (0, _ImageTileLayerBaseMaterial2['default'])('#f5f5f3');
	      }
	
	      var mesh = new _three2['default'].Mesh(geom, baseMaterial);
	      mesh.rotation.x = -90 * Math.PI / 180;
	
	      // TODO: It might be overkill to receive a shadow on the base layer as it's
	      // rarely seen (good to have if performance difference is negligible)
	      mesh.receiveShadow = true;
	
	      this._baseLayer = mesh;
	      this.add(mesh);
	
	      // Trigger initial quadtree calculation on the next frame
	      //
	      // TODO: This is a hack to ensure the camera is all set up - a better
	      // solution should be found
	      setTimeout(function () {
	        _this._calculateLOD();
	        _this._initEvents();
	      }, 0);
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
	    }
	  }, {
	    key: '_onWorldUpdate',
	    value: function _onWorldUpdate() {
	      this._calculateLOD();
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
	      return (0, _ImageTile2['default'])(quadcode, this._path, layer);
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
	
	exports['default'] = function (path, options) {
	  return new ImageTileLayer(path, options);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(32);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _TileCache = __webpack_require__(39);
	
	var _TileCache2 = _interopRequireDefault(_TileCache);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
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
	
	    _get(Object.getPrototypeOf(TileLayer.prototype), 'constructor', this).call(this, options);
	
	    var defaults = {
	      maxCache: 1000,
	      maxLOD: 18
	    };
	
	    this._options = (0, _lodashAssign2['default'])(defaults, options);
	
	    this._tileCache = (0, _TileCache2['default'])(this._options.maxCache, function (tile) {
	      _this._destroyTile(tile);
	    });
	
	    // TODO: Work out why changing the minLOD causes loads of issues
	    this._minLOD = 3;
	    this._maxLOD = this._options.maxLOD;
	
	    this._frustum = new _three2['default'].Frustum();
	    this._tiles = new _three2['default'].Object3D();
	  }
	
	  _createClass(TileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      this.add(this._tiles);
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
	  }, {
	    key: '_calculateLOD',
	    value: function _calculateLOD() {
	      var _this2 = this;
	
	      if (this._stop || !this._world) {
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
	
	      // 4. Remove all tiles from layer
	      this._removeTiles();
	
	      // 5. Render the tiles remaining in the check list
	      checkList.forEach(function (tile, index) {
	        // Skip tile if it's not in the current view frustum
	        if (!_this2._tileInFrustum(tile)) {
	          return;
	        }
	
	        if (_this2._options.distance && _this2._options.distance > 0) {
	          // TODO: Can probably speed this up
	          var center = tile.getCenter();
	          var dist = new _three2['default'].Vector3(center[0], 0, center[1]).sub(camera.position).length();
	
	          // Manual distance limit to cut down on tiles so far away
	          if (dist > _this2._options.distance) {
	            return;
	          }
	        }
	
	        // Does the tile have a mesh?
	        //
	        // If yes, continue
	        // If no, generate tile mesh, request texture and skip
	        if (!tile.getMesh()) {
	          tile.requestTileAsync();
	          return;
	        }
	
	        // Are the mesh and texture ready?
	        //
	        // If yes, continue
	        // If no, skip
	        if (!tile.isReady()) {
	          return;
	        }
	
	        // Add tile to layer (and to scene)
	        _this2._tiles.add(tile.getMesh());
	      });
	
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
	      for (var i = this._tiles.children.length - 1; i >= 0; i--) {
	        this._tiles.remove(this._tiles.children[i]);
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
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var i;
	
	      // Remove all tiles
	      for (i = this._tiles.children.length - 1; i >= 0; i--) {
	        this._tiles.remove(this._tiles.children[i]);
	      }
	
	      this._tileCache.destroy();
	      this._tileCache = null;
	
	      this._tiles = null;
	      this._frustum = null;
	
	      _get(Object.getPrototypeOf(TileLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return TileLayer;
	})(_Layer3['default']);
	
	exports['default'] = TileLayer;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _lruCache = __webpack_require__(40);
	
	var _lruCache2 = _interopRequireDefault(_lruCache);
	
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
	
	  // Initialise without requiring new keyword
	
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
	
	exports['default'] = function (cacheLimit, onDestroyTile) {
	  return new TileCache(cacheLimit, onDestroyTile);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = LRUCache
	
	// This will be a proper iterable 'Map' in engines that support it,
	// or a fakey-fake PseudoMap in older versions.
	var Map = __webpack_require__(41)
	var util = __webpack_require__(44)
	
	// A linked list to keep track of recently-used-ness
	var Yallist = __webpack_require__(47)
	
	// use symbols if possible, otherwise just _props
	var symbols = {}
	var hasSymbol = typeof Symbol === 'function'
	var makeSymbol
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' &&
	    process.env.npm_lifecycle_script === 'test')
	  process.env.TEST_PSEUDOMAP = 'true'
	
	if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
	  module.exports = Map
	} else {
	  module.exports = __webpack_require__(43)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
/* 43 */
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
/* 44 */
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
	
	exports.isBuffer = __webpack_require__(45);
	
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
	exports.inherits = __webpack_require__(46);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(42)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 46 */
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
/* 47 */
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Tile2 = __webpack_require__(49);
	
	var _Tile3 = _interopRequireDefault(_Tile2);
	
	var _vendorBoxHelper = __webpack_require__(50);
	
	var _vendorBoxHelper2 = _interopRequireDefault(_vendorBoxHelper);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var ImageTile = (function (_Tile) {
	  _inherits(ImageTile, _Tile);
	
	  function ImageTile(quadcode, path, layer) {
	    _classCallCheck(this, ImageTile);
	
	    _get(Object.getPrototypeOf(ImageTile.prototype), 'constructor', this).call(this, quadcode, path, layer);
	  }
	
	  // Initialise without requiring new keyword
	
	  // Request data for the tile
	
	  _createClass(ImageTile, [{
	    key: 'requestTileAsync',
	    value: function requestTileAsync() {
	      var _this = this;
	
	      // Making this asynchronous really speeds up the LOD framerate
	      setTimeout(function () {
	        if (!_this._mesh) {
	          _this._mesh = _this._createMesh();
	          _this._requestTile();
	        }
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
	
	      mesh.add(localMesh);
	      mesh.renderOrder = 0;
	
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
	
	      image.addEventListener('load', function (event) {
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
	      if (!this._image) {
	        return;
	      }
	
	      this._image.src = '';
	    }
	  }]);
	
	  return ImageTile;
	})(_Tile3['default']);
	
	exports['default'] = function (quadcode, path, layer) {
	  return new ImageTile(quadcode, path, layer);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _geoPoint = __webpack_require__(11);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(10);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
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
	
	    this._tile = this._quadcodeToTile(quadcode);
	
	    // Bottom-left and top-right bounds in WGS84 coordinates
	    this._boundsLatLon = this._tileBoundsWGS84(this._tile);
	
	    // Bottom-left and top-right bounds in world coordinates
	    this._boundsWorld = this._tileBoundsFromWGS84(this._boundsLatLon);
	
	    // Tile center in world coordinates
	    this._center = this._boundsToCenter(this._boundsWorld);
	
	    // Tile center in projected coordinates
	    this._centerLatlon = this._world.pointToLatLon(VIZI.Point(this._center[0], this._center[1]));
	
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
	
	    // Destroys the tile and removes it from the layer and memory
	    //
	    // Ensure that this leaves no trace of the tile – no textures, no meshes,
	    // nothing in memory or the GPU
	  }, {
	    key: 'destroy',
	    value: function destroy() {
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
	        this._mesh.children.forEach(function (child) {
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
	      var sw = this._layer._world.latLonToPoint((0, _geoLatLon2['default'])(boundsWGS84[1], boundsWGS84[0]));
	      var ne = this._layer._world.latLonToPoint((0, _geoLatLon2['default'])(boundsWGS84[3], boundsWGS84[2]));
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// jscs:disable
	/*eslint eqeqeq:0*/
	
	var _three = __webpack_require__(24);
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(24);
	
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _TileLayer2 = __webpack_require__(38);
	
	var _TileLayer3 = _interopRequireDefault(_TileLayer2);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _TopoJSONTile = __webpack_require__(53);
	
	var _TopoJSONTile2 = _interopRequireDefault(_TopoJSONTile);
	
	var _lodashThrottle = __webpack_require__(35);
	
	var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var TopoJSONTileLayer = (function (_TileLayer) {
	  _inherits(TopoJSONTileLayer, _TileLayer);
	
	  function TopoJSONTileLayer(path, options) {
	    _classCallCheck(this, TopoJSONTileLayer);
	
	    var defaults = {
	      maxLOD: 14,
	      distance: 2000
	    };
	
	    options = (0, _lodashAssign2['default'])(defaults, options);
	
	    _get(Object.getPrototypeOf(TopoJSONTileLayer.prototype), 'constructor', this).call(this, options);
	
	    this._path = path;
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(TopoJSONTileLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      _get(Object.getPrototypeOf(TopoJSONTileLayer.prototype), '_onAdd', this).call(this, world);
	
	      // Trigger initial quadtree calculation on the next frame
	      //
	      // TODO: This is a hack to ensure the camera is all set up - a better
	      // solution should be found
	      setTimeout(function () {
	        _this._calculateLOD();
	        _this._initEvents();
	      }, 0);
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
	    }
	  }, {
	    key: '_onWorldUpdate',
	    value: function _onWorldUpdate() {
	      this._calculateLOD();
	    }
	  }, {
	    key: '_onWorldMove',
	    value: function _onWorldMove(latlon, point) {}
	  }, {
	    key: '_createTile',
	    value: function _createTile(quadcode, layer) {
	      var options = {};
	
	      if (this._options.filter) {
	        options.filter = this._options.filter;
	      }
	
	      if (this._options.style) {
	        options.style = this._options.style;
	      }
	
	      return (0, _TopoJSONTile2['default'])(quadcode, this._path, layer, options);
	    }
	
	    // Destroys the layer and removes it from the scene and memory
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._world.off('preUpdate', this._throttledWorldUpdate);
	      this._world.off('move', this._onWorldMove);
	
	      this._throttledWorldUpdate = null;
	
	      // Run common destruction logic from parent
	      _get(Object.getPrototypeOf(TopoJSONTileLayer.prototype), 'destroy', this).call(this);
	    }
	  }]);
	
	  return TopoJSONTileLayer;
	})(_TileLayer3['default']);
	
	exports['default'] = function (path, options) {
	  return new TopoJSONTileLayer(path, options);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Tile2 = __webpack_require__(49);
	
	var _Tile3 = _interopRequireDefault(_Tile2);
	
	var _vendorBoxHelper = __webpack_require__(50);
	
	var _vendorBoxHelper2 = _interopRequireDefault(_vendorBoxHelper);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _reqwest = __webpack_require__(54);
	
	var _reqwest2 = _interopRequireDefault(_reqwest);
	
	var _topojson = __webpack_require__(56);
	
	var _topojson2 = _interopRequireDefault(_topojson);
	
	var _geoPoint = __webpack_require__(11);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(10);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _earcut = __webpack_require__(57);
	
	var _earcut2 = _interopRequireDefault(_earcut);
	
	var _lodashAssign = __webpack_require__(3);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _utilExtrudePolygon = __webpack_require__(58);
	
	var _utilExtrudePolygon2 = _interopRequireDefault(_utilExtrudePolygon);
	
	var _polygonOffset = __webpack_require__(59);
	
	var _polygonOffset2 = _interopRequireDefault(_polygonOffset);
	
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
	
	var TopoJSONTile = (function (_Tile) {
	  _inherits(TopoJSONTile, _Tile);
	
	  function TopoJSONTile(quadcode, path, layer, options) {
	    _classCallCheck(this, TopoJSONTile);
	
	    _get(Object.getPrototypeOf(TopoJSONTile.prototype), 'constructor', this).call(this, quadcode, path, layer);
	
	    var defaults = {
	      filter: null,
	      style: {
	        color: '#ffffff'
	      }
	    };
	
	    this._options = (0, _lodashAssign2['default'])(defaults, options);
	  }
	
	  // Initialise without requiring new keyword
	
	  // Request data for the tile
	
	  _createClass(TopoJSONTile, [{
	    key: 'requestTileAsync',
	    value: function requestTileAsync() {
	      var _this = this;
	
	      // Making this asynchronous really speeds up the LOD framerate
	      setTimeout(function () {
	        if (!_this._mesh) {
	          _this._mesh = _this._createMesh();
	          // this._shadowCanvas = this._createShadowCanvas();
	          _this._requestTile();
	        }
	      }, 0);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      // Cancel any pending requests
	      this._abortRequest();
	
	      // Clear request reference
	      this._request = null;
	
	      _get(Object.getPrototypeOf(TopoJSONTile.prototype), 'destroy', this).call(this);
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
	    key: '_createShadowCanvas',
	    value: function _createShadowCanvas() {
	      var canvas = document.createElement('canvas');
	
	      // Rendered at a low resolution and later scaled up for a low-quality blur
	      canvas.width = 512;
	      canvas.height = 512;
	
	      return canvas;
	    }
	  }, {
	    key: '_addShadow',
	    value: function _addShadow(coordinates) {
	      var _this2 = this;
	
	      var ctx = this._shadowCanvas.getContext('2d');
	      var width = this._shadowCanvas.width;
	      var height = this._shadowCanvas.height;
	
	      var _coords;
	      var _offset;
	      var offset = new _polygonOffset2['default']();
	
	      // Transform coordinates to shadowCanvas space and draw on canvas
	      coordinates.forEach(function (ring, index) {
	        ctx.beginPath();
	
	        _coords = ring.map(function (coord) {
	          var xFrac = (coord[0] - _this2._boundsWorld[0]) / _this2._side;
	          var yFrac = (coord[1] - _this2._boundsWorld[3]) / _this2._side;
	          return [xFrac * width, yFrac * height];
	        });
	
	        if (index > 0) {
	          _offset = _coords;
	        } else {
	          _offset = offset.data(_coords).padding(1.3);
	        }
	
	        // TODO: This is super flaky and crashes the browser if run on anything
	        // put the outer ring (potentially due to winding)
	        _offset.forEach(function (coord, index) {
	          // var xFrac = (coord[0] - this._boundsWorld[0]) / this._side;
	          // var yFrac = (coord[1] - this._boundsWorld[3]) / this._side;
	
	          if (index === 0) {
	            ctx.moveTo(coord[0], coord[1]);
	          } else {
	            ctx.lineTo(coord[0], coord[1]);
	          }
	        });
	
	        ctx.closePath();
	      });
	
	      ctx.fillStyle = 'rgba(80, 80, 80, 0.7)';
	      ctx.fill();
	    }
	  }, {
	    key: '_requestTile',
	    value: function _requestTile() {
	      var _this3 = this;
	
	      var urlParams = {
	        x: this._tile[0],
	        y: this._tile[1],
	        z: this._tile[2]
	      };
	
	      var url = this._getTileURL(urlParams);
	
	      this._request = (0, _reqwest2['default'])({
	        url: url,
	        type: 'json',
	        crossOrigin: true
	      }).then(function (res) {
	        // Clear request reference
	        _this3._request = null;
	        _this3._processTileData(res);
	      })['catch'](function (err) {
	        console.error(err);
	
	        // Clear request reference
	        _this3._request = null;
	      });
	    }
	  }, {
	    key: '_processTileData',
	    value: function _processTileData(data) {
	      var _this4 = this;
	
	      console.time(this._tile);
	
	      var geojson = _topojson2['default'].feature(data, data.objects.vectile);
	
	      var offset = (0, _geoPoint2['default'])(0, 0);
	      offset.x = -1 * this._center[0];
	      offset.y = -1 * this._center[1];
	
	      var coordinates;
	      var earcutData;
	      var faces;
	
	      var allVertices = [];
	      var allFaces = [];
	      var allColours = [];
	      var facesCount = 0;
	
	      var colour = new _three2['default'].Color();
	
	      var light = new _three2['default'].Color(0xffffff);
	      var shadow = new _three2['default'].Color(0x666666);
	
	      var features = geojson.features;
	
	      // Run filter, if provided
	      if (this._options.filter) {
	        features = geojson.features.filter(this._options.filter);
	      }
	
	      var style = this._options.style;
	
	      features.forEach(function (feature) {
	        // feature.geometry, feature.properties
	
	        // Get style object, if provided
	        if (typeof _this4._options.style === 'function') {
	          style = _this4._options.style(feature);
	        }
	
	        var coordinates = feature.geometry.coordinates;
	
	        // Skip if geometry is a point
	        //
	        // This should be a user-defined filter as it would be wrong to assume
	        // that people won't want to output points
	        //
	        // The default use-case should be to output points in a different way
	        if (!coordinates[0] || !coordinates[0][0] || !Array.isArray(coordinates[0][0])) {
	          return;
	        }
	
	        coordinates = coordinates.map(function (ring) {
	          return ring.map(function (coordinate) {
	            var latlon = (0, _geoLatLon2['default'])(coordinate[1], coordinate[0]);
	            var point = _this4._layer._world.latLonToPoint(latlon);
	            return [point.x, point.y];
	          });
	        });
	
	        // Draw footprint on shadow canvas
	        //
	        // TODO: Disabled for the time-being until it can be sped up / moved to
	        // a worker
	        // this._addShadow(coordinates);
	
	        earcutData = _this4._toEarcut(coordinates);
	
	        faces = _this4._triangulate(earcutData.vertices, earcutData.holes, earcutData.dimensions);
	
	        var groupedVertices = [];
	        for (i = 0, il = earcutData.vertices.length; i < il; i += earcutData.dimensions) {
	          groupedVertices.push(earcutData.vertices.slice(i, i + earcutData.dimensions));
	        }
	
	        var height = 0;
	
	        if (style.height) {
	          height = _this4._world.metresToWorld(style.height, _this4._pointScale);
	        }
	
	        var extruded = (0, _utilExtrudePolygon2['default'])(groupedVertices, faces, {
	          bottom: 0,
	          top: height
	        });
	
	        colour.set(style.color);
	
	        var topColor = colour.clone().multiply(light);
	        var bottomColor = colour.clone().multiply(shadow);
	
	        var _faces = [];
	        var _colours = [];
	
	        allVertices.push(extruded.positions);
	
	        var _colour;
	        extruded.top.forEach(function (face, fi) {
	          _colour = [];
	
	          _colour.push([colour.r, colour.g, colour.b]);
	          _colour.push([colour.r, colour.g, colour.b]);
	          _colour.push([colour.r, colour.g, colour.b]);
	
	          _faces.push(face);
	          _colours.push(_colour);
	        });
	
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
	
	        // Skip bottom as there's no point rendering it
	        // allFaces.push(extruded.faces);
	
	        allFaces.push(_faces);
	        allColours.push(_colours);
	
	        facesCount += _faces.length;
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
	
	      // Skip if no faces
	      //
	      // Need to check way before this if there are no faces, before even doing
	      // earcut triangulation.
	      if (facesCount === 0) {
	        this._ready = true;
	        return;
	      }
	
	      var geometry = new _three2['default'].BufferGeometry();
	
	      // Three components per vertex per face (3 x 3 = 9)
	      var vertices = new Float32Array(facesCount * 9);
	      var normals = new Float32Array(facesCount * 9);
	      var colours = new Float32Array(facesCount * 9);
	
	      var pA = new _three2['default'].Vector3();
	      var pB = new _three2['default'].Vector3();
	      var pC = new _three2['default'].Vector3();
	
	      var cb = new _three2['default'].Vector3();
	      var ab = new _three2['default'].Vector3();
	
	      var dim = 2;
	
	      var index;
	      var _faces;
	      var _vertices;
	      var _colour;
	      var lastIndex = 0;
	      for (var i = 0; i < allFaces.length; i++) {
	        _faces = allFaces[i];
	        _vertices = allVertices[i];
	        _colour = allColours[i];
	
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
	
	          lastIndex++;
	        }
	      }
	
	      // itemSize = 3 because there are 3 values (components) per vertex
	      geometry.addAttribute('position', new _three2['default'].BufferAttribute(vertices, 3));
	      geometry.addAttribute('normal', new _three2['default'].BufferAttribute(normals, 3));
	      geometry.addAttribute('color', new _three2['default'].BufferAttribute(colours, 3));
	
	      geometry.computeBoundingBox();
	
	      var material;
	      if (!this._world._environment._skybox) {
	        material = new _three2['default'].MeshPhongMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          side: _three2['default'].BackSide
	        });
	      } else {
	        material = new _three2['default'].MeshStandardMaterial({
	          vertexColors: _three2['default'].VertexColors,
	          side: _three2['default'].BackSide
	        });
	        material.roughness = 1;
	        material.metalness = 0.1;
	        material.envMapIntensity = 3;
	        material.envMap = this._world._environment._skybox.getRenderTarget();
	      }
	
	      var mesh = new _three2['default'].Mesh(geometry, material);
	
	      mesh.castShadow = true;
	      mesh.receiveShadow = true;
	
	      // This is only useful for flat objects
	      // mesh.renderOrder = 1;
	
	      this._mesh.add(mesh);
	
	      this._ready = true;
	      console.timeEnd(this._tile);
	      console.log(this._tile + ': ' + features.length + ' features');
	    }
	  }, {
	    key: '_toEarcut',
	    value: function _toEarcut(data) {
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
	    }
	  }, {
	    key: '_triangulate',
	    value: function _triangulate(contour, holes, dim) {
	      // console.time('earcut');
	
	      var faces = (0, _earcut2['default'])(contour, holes, dim);
	      var result = [];
	
	      for (i = 0, il = faces.length; i < il; i += 3) {
	        result.push(faces.slice(i, i + 3));
	      }
	
	      // console.timeEnd('earcut');
	
	      return result;
	    }
	  }, {
	    key: '_abortRequest',
	    value: function _abortRequest() {
	      if (!this._request) {
	        return;
	      }
	
	      this._request.abort();
	    }
	  }]);
	
	  return TopoJSONTile;
	})(_Tile3['default']);
	
	exports['default'] = function (quadcode, path, layer, options) {
	  return new TopoJSONTile(quadcode, path, layer, options);
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 54 */
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
	      XHR2 = __webpack_require__(55)
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
/* 55 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.topojson = {})));
	}(this, function (exports) { 'use strict';
	
	  function noop() {}
	
	  function absolute(transform) {
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
	
	  function relative(transform) {
	    if (!transform) return noop;
	    var x0,
	        y0,
	        kx = transform.scale[0],
	        ky = transform.scale[1],
	        dx = transform.translate[0],
	        dy = transform.translate[1];
	    return function(point, i) {
	      if (!i) x0 = y0 = 0;
	      var x1 = (point[0] - dx) / kx | 0,
	          y1 = (point[1] - dy) / ky | 0;
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
	    var absolute$$ = absolute(topology.transform),
	        arcs = topology.arcs;
	
	    function arc(i, points) {
	      if (points.length) points.pop();
	      for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
	        points.push(p = a[k].slice());
	        absolute$$(p, k);
	      }
	      if (i < 0) reverse(points, n);
	    }
	
	    function point(p) {
	      p = p.slice();
	      absolute$$(p, 0);
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
	
	  function triangle(triangle) {
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
	
	    function exterior(ring$$) {
	      return ring(object(topology, {type: "Polygon", arcs: [ring$$]}).coordinates[0]) > 0; // TODO allow spherical?
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
	        // this exterior ring has the same winding order
	        // as any exterior ring in the original polygons.
	        if ((n = arcs.length) > 1) {
	          var sgn = exterior(polygons[0][0]);
	          for (var i = 0, t; i < n; ++i) {
	            if (sgn === exterior(arcs[i])) {
	              t = arcs[0], arcs[0] = arcs[i], arcs[i] = t;
	              break;
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
	    var absolute$$ = absolute(topology.transform),
	        relative$$ = relative(topology.transform),
	        heap = minAreaHeap();
	
	    if (!triangleArea) triangleArea = triangle;
	
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
	        absolute$$(arc[i] = [p[0], p[1], Infinity], i);
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
	
	      arc.forEach(relative$$);
	    });
	
	    function update(triangle) {
	      heap.remove(triangle);
	      triangle[1][2] = triangleArea(triangle);
	      heap.push(triangle);
	    }
	
	    return topology;
	  }
	
	  var version = "1.6.24";
	
	  exports.version = version;
	  exports.mesh = mesh;
	  exports.meshArcs = meshArcs;
	  exports.merge = merge;
	  exports.mergeArcs = mergeArcs;
	  exports.feature = feature;
	  exports.neighbors = neighbors;
	  exports.presimplify = presimplify;
	
	}));

/***/ },
/* 57 */
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
	    var sum = 0,
	        i, j, last;
	
	    // calculate original winding order of a polygon ring
	    for (i = start, j = end - dim; i < end; i += dim) {
	        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
	        j = i;
	    }
	
	    // link points into circular doubly-linked list in the specified winding order
	    if (clockwise === (sum > 0)) {
	        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	    } else {
	        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
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
	
	        // a self-intersection where edge (v[i-1],v[i]) intersects (v[i+1],v[i+2])
	        if (intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
	
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
	                m = p.x < p.next.x ? p : p.next;
	            }
	        }
	        p = p.next;
	    } while (p !== outerNode);
	
	    if (!m) return null;
	
	    if (hole.x === m.x) return m.prev; // hole touches outer segment; pick lower endpoint
	
	    // look for points inside the triangle of hole point, segment intersection and endpoint;
	    // if there are no points found, we have a valid connection;
	    // otherwise choose the point of the minimum angle with the ray as connection point
	
	    var stop = m,
	        tanMin = Infinity,
	        tan;
	
	    p = m.next;
	
	    while (p !== stop) {
	        if (hx >= p.x && p.x >= m.x &&
	                pointInTriangle(hy < m.y ? hx : qx, hy, m.x, m.y, hy < m.y ? qx : hx, hy, p.x, p.y)) {
	
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
	    return equals(a, b) || a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
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


/***/ },
/* 58 */
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
	
	  var options = (0, _lodashAssign2['default'])(defaults, _options);
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var GreinerHormann = __webpack_require__(60);
	var Edge = __webpack_require__(65);
	var intersection = __webpack_require__(66);
	
	"use strict";
	
	var min = Math.min,
	    max = Math.max,
	    atan2 = Math.atan2;
	
	/**
	 * Offset builder
	 *
	 * @param {Array.<Object>=} vertices
	 * @param {Number=}        arcSegments
	 * @constructor
	 */
	function Offset(vertices, arcSegments) {
	
	    /**
	     * @type {Array.<Object>}
	     */
	    this.vertices = null;
	
	    /**
	     * @type {Array.<Edge>}
	     */
	    this.edges = null;
	
	    /**
	     * @type {Boolean}
	     */
	    this._closed = false;
	
	    if (vertices) {
	        this.data(vertices);
	    }
	
	    /**
	     * Segments in edge bounding arches
	     * @type {Number}
	     */
	    this._arcSegments = arcSegments || 5;
	};
	
	/**
	 * Change data set
	 * @param  {Array.<Array>} vertices
	 * @return {Offset}
	 */
	Offset.prototype.data = function(vertices) {
	    vertices = this.validate(vertices);
	
	    var edges = [];
	    for (var i = 0, len = vertices.length; i < len; i++) {
	        edges.push(new Edge(vertices[i], vertices[(i + 1) % len]));
	    }
	
	    this.vertices = vertices;
	    this.edges = edges;
	    return this;
	};
	
	/**
	 * @param  {Number} arcSegments
	 * @return {Offset}
	 */
	Offset.prototype.arcSegments = function(arcSegments) {
	    this._arcSegments = arcSegments;
	    return this;
	};
	
	/**
	 * Validates if the first and last points repeat
	 * TODO: check CCW
	 *
	 * @param  {Array.<Object>} vertices
	 */
	Offset.prototype.validate = function(vertices) {
	    var len = vertices.length;
	    if (vertices[0][0] === vertices[len - 1][0] &&
	        vertices[0][1] === vertices[len - 1][1]) {
	        vertices = vertices.slice(0, len - 1);
	        this._closed = true;
	    }
	    return vertices;
	};
	
	/**
	 * Creates arch between two edges
	 *
	 * @param  {Array.<Object>} vertices
	 * @param  {Object}         center
	 * @param  {Number}         radius
	 * @param  {Object}         startVertex
	 * @param  {Object}         endVertex
	 * @param  {Number}         segments
	 * @param  {Boolean}        outwards
	 */
	Offset.prototype.createArc = function(vertices, center, radius, startVertex,
	    endVertex, segments, outwards) {
	
	    var PI2 = Math.PI * 2,
	        startAngle = atan2(startVertex[1] - center[1], startVertex[0] - center[0]),
	        endAngle = atan2(endVertex[1] - center[1], endVertex[0] - center[0]);
	
	    // odd number please
	    if (segments % 2 === 0) {
	        segments -= 1;
	    }
	
	    if (startAngle < 0) {
	        startAngle += PI2;
	    }
	
	    if (endAngle < 0) {
	        endAngle += PI2;
	    }
	
	    var angle = ((startAngle > endAngle) ?
	            (startAngle - endAngle) :
	            (startAngle + PI2 - endAngle)),
	        segmentAngle = ((outwards) ? -angle : PI2 - angle) / segments;
	
	    vertices.push(startVertex);
	    for (var i = 1; i < segments; ++i) {
	        angle = startAngle + segmentAngle * i;
	        vertices.push([
	            center[0] + Math.cos(angle) * radius,
	            center[1] + Math.sin(angle) * radius
	        ]);
	    }
	    vertices.push(endVertex);
	};
	
	/**
	 * Create padding polygon
	 *
	 * @param  {Number} distance
	 * @return {Array.<Number>}
	 */
	Offset.prototype.padding = function(dist) {
	    var offsetEdges = [],
	        vertices = [],
	        i, len, union;
	
	    for (i = 0, len = this.edges.length; i < len; i++) {
	        var edge = this.edges[i],
	            dx = edge._outNormal[0] * dist,
	            dy = edge._outNormal[1] * dist;
	        offsetEdges.push(edge.offset(dx, dy));
	    }
	
	    for (i = 0, len = offsetEdges.length; i < len; i++) {
	        var thisEdge = offsetEdges[i],
	            prevEdge = offsetEdges[(i + len - 1) % len],
	            vertex = intersection(
	                prevEdge.current,
	                prevEdge.next,
	                thisEdge.current,
	                thisEdge.next);
	
	        if (vertex)
	            vertices.push(vertex);
	        else {
	            this.createArc(
	                vertices,
	                this.edges[i].current,
	                dist,
	                prevEdge.next,
	                thisEdge.current,
	                this._arcSegments,
	                false);
	        }
	    }
	    union = GreinerHormann.union(vertices, vertices);
	    vertices = union ? union[0] : vertices;
	
	    vertices = this.ensureLastPoint(vertices);
	    return vertices;
	};
	
	/**
	 * Creates margin polygon
	 * @param  {Number} dist
	 * @return {Array.<Object>}
	 */
	Offset.prototype.margin = function(dist) {
	    var offsetEdges = [],
	        vertices = [],
	        i, len, union;
	    for (i = 0, len = this.edges.length; i < len; i++) {
	        var edge = this.edges[i],
	            dx = edge._inNormal[0] * dist,
	            dy = edge._inNormal[1] * dist;
	
	        offsetEdges.push(edge.offset(dx, dy));
	    }
	
	    for (i = 0, len = offsetEdges.length; i < len; i++) {
	        var thisEdge = offsetEdges[i],
	            prevEdge = offsetEdges[(i + len - 1) % len],
	            vertex = intersection(
	                prevEdge.current,
	                prevEdge.next,
	                thisEdge.current,
	                thisEdge.next
	            );
	
	        if (vertex) {
	            vertices.push(vertex);
	        } else {
	            this.createArc(
	                vertices,
	                this.edges[i].current,
	                dist,
	                prevEdge.next,
	                thisEdge.current,
	                this._arcSegments,
	                true
	            );
	        }
	    }
	
	    union = GreinerHormann.union(vertices, vertices);
	    if (union) {
	        union = union[0];
	        // that's the toll
	        vertices = union.slice(0, union.length / 2);
	    }
	
	    vertices = this.ensureLastPoint(vertices);
	    return vertices;
	};
	
	/**
	 * @param  {Array.<Object>} vertices
	 * @return {Array.<Object>}
	 */
	Offset.prototype.ensureLastPoint = function(vertices) {
	    if (this._closed) {
	        vertices.push([
	            vertices[0][0],
	            vertices[0][1]
	        ]);
	    }
	    return vertices;
	};
	
	/**
	 * Decides by the sign if it's a padding or a margin
	 *
	 * @param  {Number} dist
	 * @return {Array.<Object>}
	 */
	Offset.prototype.offset = function(dist) {
	    return dist === 0 ?
	        this.vertices :
	        (dist > 0 ? this.margin(dist) : this.padding(-dist));
	};
	
	module.exports = Offset;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var clip = __webpack_require__(61);
	
	module.exports = {
	    /**
	     * @api
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
	     * @return {Array.<Array.<Number>>|Array.<Array.<Object>|Null}
	     */
	    union: function(polygonA, polygonB) {
	        return clip(polygonA, polygonB, false, false);
	    },
	
	    /**
	     * @api
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
	     * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
	     */
	    intersection: function(polygonA, polygonB) {
	        return clip(polygonA, polygonB, true, true);
	    },
	
	    /**
	     * @api
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
	     * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
	     * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
	     */
	    diff: function(polygonA, polygonB) {
	        return clip(polygonA, polygonB, false, true);
	    },
	
	    clip: clip
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var Polygon = __webpack_require__(62);
	
	/**
	 * Clip driver
	 * @api
	 * @param  {Array.<Array.<Number>>} polygonA
	 * @param  {Array.<Array.<Number>>} polygonB
	 * @param  {Boolean}                sourceForwards
	 * @param  {Boolean}                clipForwards
	 * @return {Array.<Array.<Number>>}
	 */
	module.exports = function(polygonA, polygonB, eA, eB) {
	    var result, source = new Polygon(polygonA),
	        clip = new Polygon(polygonB),
	        result = source.clip(clip, eA, eB);
	
	    return result;
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var Vertex = __webpack_require__(63);
	var Intersection = __webpack_require__(64);
	
	/**
	 * Polygon representation
	 * @param {Array.<Array.<Number>>} p
	 * @param {Boolean=}               arrayVertices
	 *
	 * @constructor
	 */
	var Polygon = function(p, arrayVertices) {
	
	    /**
	     * @type {Vertex}
	     */
	    this.first = null;
	
	    /**
	     * @type {Number}
	     */
	    this.vertices = 0;
	
	    /**
	     * @type {Vertex}
	     */
	    this._lastUnprocessed = null;
	
	    /**
	     * Whether to handle input and output as [x,y] or {x:x,y:y}
	     * @type {Boolean}
	     */
	    this._arrayVertices = (typeof arrayVertices === "undefined") ?
	        Array.isArray(p[0]) :
	        arrayVertices;
	
	    for (var i = 0, len = p.length; i < len; i++) {
	        this.addVertex(new Vertex(p[i]));
	    }
	};
	
	/**
	 * Add a vertex object to the polygon
	 * (vertex is added at the 'end' of the list')
	 *
	 * @param vertex
	 */
	Polygon.prototype.addVertex = function(vertex) {
	    if (this.first == null) {
	        this.first = vertex;
	        this.first.next = vertex;
	        this.first.prev = vertex;
	    } else {
	        var next = this.first,
	            prev = next.prev;
	
	        next.prev = vertex;
	        vertex.next = next;
	        vertex.prev = prev;
	        prev.next = vertex;
	    }
	    this.vertices++;
	};
	
	/**
	 * Inserts a vertex inbetween start and end
	 *
	 * @param {Vertex} vertex
	 * @param {Vertex} start
	 * @param {Vertex} end
	 */
	Polygon.prototype.insertVertex = function(vertex, start, end) {
	    var prev, curr = start;
	
	    while (!curr.equals(end) && curr._distance < vertex._distance) {
	        curr = curr.next;
	    }
	
	    vertex.next = curr;
	    prev = curr.prev;
	
	    vertex.prev = prev;
	    prev.next = vertex;
	    curr.prev = vertex;
	
	    this.vertices++;
	};
	
	/**
	 * Get next non-intersection point
	 * @param  {Vertex} v
	 * @return {Vertex}
	 */
	Polygon.prototype.getNext = function(v) {
	    var c = v;
	    while (c._isIntersection) {
	        c = c.next;
	    }
	    return c;
	};
	
	/**
	 * Unvisited intersection
	 * @return {Vertex}
	 */
	Polygon.prototype.getFirstIntersect = function() {
	    var v = this._firstIntersect || this.first;
	
	    do {
	        if (v._isIntersection && !v._visited) {
	            break;
	        }
	
	        v = v.next;
	    } while (!v.equals(this.first));
	
	    this._firstIntersect = v;
	    return v;
	};
	
	/**
	 * Does the polygon have unvisited vertices
	 * @return {Boolean} [description]
	 */
	Polygon.prototype.hasUnprocessed = function() {
	    var v = this._lastUnprocessed || this.first;
	    do {
	        if (v._isIntersection && !v._visited) {
	            this._lastUnprocessed = v;
	            return true;
	        }
	
	        v = v.next;
	    } while (!v.equals(this.first));
	
	    this._lastUnprocessed = null;
	    return false;
	};
	
	/**
	 * The output depends on what you put in, arrays or objects
	 * @return {Array.<Array<Number>|Array.<Object>}
	 */
	Polygon.prototype.getPoints = function() {
	    var points = [],
	        v = this.first;
	
	    if (this._arrayVertices) {
	        do {
	            points.push([v.x, v.y]);
	            v = v.next;
	        } while (v !== this.first);
	    } else {
	        do {
	            points.push({
	                x: v.x,
	                y: v.y
	            });
	            v = v.next;
	        } while (v !== this.first);
	    }
	
	    return points;
	};
	
	/**
	 * Clip polygon against another one.
	 * Result depends on algorithm direction:
	 *
	 * Intersection: forwards forwards
	 * Union:        backwars backwards
	 * Diff:         backwards forwards
	 *
	 * @param {Polygon} clip
	 * @param {Boolean} sourceForwards
	 * @param {Boolean} clipForwards
	 */
	Polygon.prototype.clip = function(clip, sourceForwards, clipForwards) {
	    var sourceVertex = this.first,
	        clipVertex = clip.first,
	        sourceInClip, clipInSource;
	
	    // calculate and mark intersections
	    do {
	        if (!sourceVertex._isIntersection) {
	            do {
	                if (!clipVertex._isIntersection) {
	                    var i = new Intersection(
	                        sourceVertex,
	                        this.getNext(sourceVertex.next),
	                        clipVertex, clip.getNext(clipVertex.next));
	
	                    if (i.valid()) {
	                        var sourceIntersection =
	                            Vertex.createIntersection(i.x, i.y, i.toSource),
	                            clipIntersection =
	                            Vertex.createIntersection(i.x, i.y, i.toClip);
	
	                        sourceIntersection._corresponding = clipIntersection;
	                        clipIntersection._corresponding = sourceIntersection;
	
	                        this.insertVertex(
	                            sourceIntersection,
	                            sourceVertex,
	                            this.getNext(sourceVertex.next));
	                        clip.insertVertex(
	                            clipIntersection,
	                            clipVertex,
	                            clip.getNext(clipVertex.next));
	                    }
	                }
	                clipVertex = clipVertex.next;
	            } while (!clipVertex.equals(clip.first));
	        }
	
	        sourceVertex = sourceVertex.next;
	    } while (!sourceVertex.equals(this.first));
	
	    // phase two - identify entry/exit points
	    sourceVertex = this.first;
	    clipVertex = clip.first;
	
	    sourceInClip = sourceVertex.isInside(clip);
	    clipInSource = clipVertex.isInside(this);
	
	    sourceForwards ^= sourceInClip;
	    clipForwards ^= clipInSource;
	
	    do {
	        if (sourceVertex._isIntersection) {
	            sourceVertex._isEntry = sourceForwards;
	            sourceForwards = !sourceForwards;
	        }
	        sourceVertex = sourceVertex.next;
	    } while (!sourceVertex.equals(this.first));
	
	    do {
	        if (clipVertex._isIntersection) {
	            clipVertex._isEntry = clipForwards;
	            clipForwards = !clipForwards;
	        }
	        clipVertex = clipVertex.next;
	    } while (!clipVertex.equals(clip.first));
	
	    // phase three - construct a list of clipped polygons
	    var list = [];
	
	    while (this.hasUnprocessed()) {
	        var current = this.getFirstIntersect(),
	            // keep format
	            clipped = new Polygon([], this._arrayVertices);
	
	        clipped.addVertex(new Vertex(current.x, current.y));
	        do {
	            current.visit();
	            if (current._isEntry) {
	                do {
	                    current = current.next;
	                    clipped.addVertex(new Vertex(current.x, current.y));
	                } while (!current._isIntersection);
	
	            } else {
	                do {
	                    current = current.prev;
	                    clipped.addVertex(new Vertex(current.x, current.y));
	                } while (!current._isIntersection);
	            }
	            current = current._corresponding;
	        } while (!current._visited);
	
	        list.push(clipped.getPoints());
	    }
	
	    if (list.length === 0) {
	        if (sourceInClip) {
	            list.push(this.getPoints());
	        }
	        if (clipInSource) {
	            list.push(clip.getPoints());
	        }
	        if (list.length === 0) {
	            list = null;
	        }
	    }
	
	    return list;
	};
	
	module.exports = Polygon;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Vertex representation
	 *
	 * @param {Number|Array.<Number>} x
	 * @param {Number=}               y
	 *
	 * @constructor
	 */
	var Vertex = function(x, y) {
	
	    if (arguments.length === 1) {
	        // Coords
	        if (Array.isArray(x)) {
	            y = x[1];
	            x = x[0];
	        } else {
	            y = x.y;
	            x = x.x;
	        }
	    }
	
	    /**
	     * X coordinate
	     * @type {Number}
	     */
	    this.x = x;
	
	    /**
	     * Y coordinate
	     * @type {Number}
	     */
	    this.y = y;
	
	    /**
	     * Next node
	     * @type {Vertex}
	     */
	    this.next = null;
	
	    /**
	     * Previous vertex
	     * @type {Vertex}
	     */
	    this.prev = null;
	
	    /**
	     * Corresponding intersection in other polygon
	     */
	    this._corresponding = null;
	
	    /**
	     * Distance from previous
	     */
	    this._distance = 0.0;
	
	    /**
	     * Entry/exit point in another polygon
	     * @type {Boolean}
	     */
	    this._isEntry = true;
	
	    /**
	     * Intersection vertex flag
	     * @type {Boolean}
	     */
	    this._isIntersection = false;
	
	    /**
	     * Loop check
	     * @type {Boolean}
	     */
	    this._visited = false;
	};
	
	/**
	 * Creates intersection vertex
	 * @param  {Number} x
	 * @param  {Number} y
	 * @param  {Number} distance
	 * @return {Vertex}
	 */
	Vertex.createIntersection = function(x, y, distance) {
	    var vertex = new Vertex(x, y);
	    vertex._distance = distance;
	    vertex._isIntersection = true;
	    vertex._isEntry = false;
	    return vertex;
	};
	
	/**
	 * Mark as visited
	 */
	Vertex.prototype.visit = function() {
	    this._visited = true;
	    if (this._corresponding !== null && !this._corresponding._visited) {
	        this._corresponding.visit();
	    }
	};
	
	/**
	 * Convenience
	 * @param  {Vertex}  v
	 * @return {Boolean}
	 */
	Vertex.prototype.equals = function(v) {
	    return this.x === v.x && this.y === v.y;
	};
	
	/**
	 * Check if vertex is inside a polygon by odd-even rule:
	 * If the number of intersections of a ray out of the point and polygon
	 * segments is odd - the point is inside.
	 * @param {Polygon} poly
	 * @return {Boolean}
	 */
	Vertex.prototype.isInside = function(poly) {
	    var oddNodes = false,
	        vertex = poly.first,
	        next = vertex.next,
	        x = this.x,
	        y = this.y;
	
	    do {
	        if ((vertex.y < y && next.y >= y ||
	                next.y < y && vertex.y >= y) &&
	            (vertex.x <= x || next.x <= x)) {
	
	            oddNodes ^= (vertex.x + (y - vertex.y) /
	                (next.y - vertex.y) * (next.x - vertex.x) < x);
	        }
	
	        vertex = vertex.next;
	        next = vertex.next || poly.first;
	    } while (!vertex.equals(poly.first));
	
	    return oddNodes;
	};
	
	module.exports = Vertex;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Intersection
	 * @param {Vertex} s1
	 * @param {Vertex} s2
	 * @param {Vertex} c1
	 * @param {Vertex} c2
	 * @constructor
	 */
	var Intersection = function(s1, s2, c1, c2) {
	
	    /**
	     * @type {Number}
	     */
	    this.x = 0.0;
	
	    /**
	     * @type {Number}
	     */
	    this.y = 0.0;
	
	    /**
	     * @type {Number}
	     */
	    this.toSource = 0.0;
	
	    /**
	     * @type {Number}
	     */
	    this.toClip = 0.0;
	
	    var d = (c2.y - c1.y) * (s2.x - s1.x) - (c2.x - c1.x) * (s2.y - s1.y);
	
	    if (d === 0) {
	        return;
	    }
	
	    /**
	     * @type {Number}
	     */
	    this.toSource = ((c2.x - c1.x) * (s1.y - c1.y) - (c2.y - c1.y) * (s1.x - c1.x)) / d;
	
	    /**
	     * @type {Number}
	     */
	    this.toClip = ((s2.x - s1.x) * (s1.y - c1.y) - (s2.y - s1.y) * (s1.x - c1.x)) / d;
	
	    if (this.valid()) {
	        this.x = s1.x + this.toSource * (s2.x - s1.x);
	        this.y = s1.y + this.toSource * (s2.y - s1.y);
	    }
	};
	
	/**
	 * @return {Boolean}
	 */
	Intersection.prototype.valid = function() {
	    return (0 < this.toSource && this.toSource < 1) && (0 < this.toClip && this.toClip < 1);
	};
	
	module.exports = Intersection;


/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Offset edge of the polygon
	 *
	 * @param  {Object} current
	 * @param  {Object} next
	 * @cosntructor
	 */
	function Edge(current, next) {
	
	    /**
	     * @type {Object}
	     */
	    this.current = current;
	
	    /**
	     * @type {Object}
	     */
	    this.next = next;
	
	    /**
	     * @type {Object}
	     */
	    this._inNormal = this.inwardsNormal();
	
	    /**
	     * @type {Object}
	     */
	    this._outNormal = this.outwardsNormal();
	};
	
	/**
	 * Creates outwards normal
	 * @return {Object}
	 */
	Edge.prototype.outwardsNormal = function() {
	    var inwards = this.inwardsNormal();
	    return [
	        -inwards[0],
	        -inwards[1]
	    ];
	};
	
	/**
	 * Creates inwards normal
	 * @return {Object}
	 */
	Edge.prototype.inwardsNormal = function() {
	    var dx = this.next[0] - this.current[0],
	        dy = this.next[1] - this.current[1],
	        edgeLength = Math.sqrt(dx * dx + dy * dy);
	
	    return [
	        -dy / edgeLength,
	        dx / edgeLength
	    ];
	};
	
	/**
	 * Offsets the edge by dx, dy
	 * @param  {Number} dx
	 * @param  {Number} dy
	 * @return {Edge}
	 */
	Edge.prototype.offset = function(dx, dy) {
	    var current = this.current,
	        next = this.next;
	
	    return new Edge([
	        current[0] + dx,
	        current[1] + dy
	    ], [
	        next[0] + dx,
	        next[1] + dy
	    ]);
	};
	
	module.exports = Edge;


/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Vector intersection, if present
	 *
	 * @param  {Object} A0
	 * @param  {Object} A1
	 * @param  {Object} B0
	 * @param  {Object} B1
	 *
	 * @return {Object|null}
	 */
	module.exports = function intersection(A0, A1, B0, B1) {
	    var den = (B1[1] - B0[1]) * (A1[0] - A0[0]) -
	        (B1[0] - B0[0]) * (A1[1] - A0[1]);
	
	    // lines are parallel or conincident
	    if (den == 0) {
	        return null;
	    }
	
	    var ua = ((B1[0] - B0[0]) * (A0[1] - B0[1]) -
	        (B1[1] - B0[1]) * (A0[0] - B0[0])) / den;
	
	    var ub = ((A1[0] - A0[0]) * (A0[1] - B0[1]) -
	        (A1[1] - A0[1]) * (A0[0] - B0[0])) / den;
	
	    if (ua < 0 || ub < 0 || ua > 1 || ub > 1) {
	        return null;
	    }
	
	    return [
	        A0[0] + ua * (A1[0] - A0[0]),
	        A0[1] + ua * (A1[1] - A0[1])
	    ];
	};


/***/ }
/******/ ])
});
;