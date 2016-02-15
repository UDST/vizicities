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
	
	var _layerTileGridLayer = __webpack_require__(33);
	
	var _layerTileGridLayer2 = _interopRequireDefault(_layerTileGridLayer);
	
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
	  GridLayer: _layerTileGridLayer2['default'],
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
	      crs: _geoCRSIndex2['default'].EPSG3857
	    };
	
	    this.options = (0, _lodashAssign2['default'])(defaults, options);
	
	    this._layers = [];
	    this._controls = [];
	
	    this._initContainer(domId);
	    this._initEngine();
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
	    key: '_initEvents',
	    value: function _initEvents() {
	      this.on('controlsMoveEnd', this._onControlsMoveEnd);
	    }
	  }, {
	    key: '_onControlsMoveEnd',
	    value: function _onControlsMoveEnd(point) {
	      var _point = (0, _geoPoint2['default'])(point.x, point.z);
	      this._resetView(this.pointToLatLon(_point));
	    }
	
	    // Reset world view
	  }, {
	    key: '_resetView',
	    value: function _resetView(latlon) {
	      this.emit('preResetView');
	
	      this._moveStart();
	      this._move(latlon);
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
	    value: function _move(latlon) {
	      this._lastPosition = latlon;
	      this.emit('move', latlon);
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
	
	      this.emit('preUpdate');
	      this._engine.update(delta);
	      this.emit('postUpdate');
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
	    value: function removeLayer(layer) {}
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
	    var scaledMetres = scale * (this.transformScale * projectedMetres) / pointScale[1];
	
	    return scaledMetres;
	  },
	
	  // Convert world (WebGL) units to a value in real metres
	  worldToMetres: function worldToMetres(worldUnits, pointScale, zoom) {
	    var scale = this.scale(zoom);
	
	    // Half scale if using zoom as WebGL origin is in the centre, not top left
	    if (zoom) {
	      scale /= 2;
	    }
	
	    var projectedUnits = worldUnits / scale / this.transformScale * pointScale[1];
	    var realMetres = this.projectedToMetres(projectedUnits, pointScale);
	
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
	  scene.fog = new _three2['default'].Fog(0xffffff, 1, 15000);
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
	
	  renderer.setClearColor(_Scene2['default'].fog.color, 1);
	
	  // Gamma settings make things look nicer
	  renderer.gammaInput = true;
	  renderer.gammaOutput = true;
	
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
	
	exports['default'] = function (container) {
	  var camera = new _three2['default'].PerspectiveCamera(40, 1, 1, 40000);
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
	
	var _threeOrbitControls = __webpack_require__(30);
	
	var _threeOrbitControls2 = _interopRequireDefault(_threeOrbitControls);
	
	var _OrbitControls = (0, _threeOrbitControls2['default'])(_three2['default']);
	
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
	        _this._world.emit('controlsMoveStart', event.target.center);
	      });
	
	      this._controls.addEventListener('change', function (event) {
	        _this._world.emit('controlsMove', event.target.center);
	      });
	
	      this._controls.addEventListener('end', function (event) {
	        _this._world.emit('controlsMoveEnd', event.target.center);
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
	      this._controls = new _OrbitControls(world._engine._camera, world._container);
	
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
/***/ function(module, exports) {

	module.exports = function(THREE) {
		var MOUSE = THREE.MOUSE
		if (!MOUSE)
			MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
	
		/**
		 * @author qiao / https://github.com/qiao
		 * @author mrdoob / http://mrdoob.com
		 * @author alteredq / http://alteredqualia.com/
		 * @author WestLangley / http://github.com/WestLangley
		 * @author erich666 / http://erichaines.com
		 */
		/*global THREE, console */
	
		function OrbitConstraint ( object ) {
	
			this.object = object;
	
			// "target" sets the location of focus, where the object orbits around
			// and where it pans with respect to.
			this.target = new THREE.Vector3();
	
			// Limits to how far you can dolly in and out ( PerspectiveCamera only )
			this.minDistance = 0;
			this.maxDistance = Infinity;
	
			// Limits to how far you can zoom in and out ( OrthographicCamera only )
			this.minZoom = 0;
			this.maxZoom = Infinity;
	
			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			this.minPolarAngle = 0; // radians
			this.maxPolarAngle = Math.PI; // radians
	
			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
			this.minAzimuthAngle = - Infinity; // radians
			this.maxAzimuthAngle = Infinity; // radians
	
			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			this.enableDamping = false;
			this.dampingFactor = 0.25;
	
			////////////
			// internals
	
			var scope = this;
	
			var EPS = 0.000001;
	
			// Current position in spherical coordinate system.
			var theta;
			var phi;
	
			// Pending changes
			var phiDelta = 0;
			var thetaDelta = 0;
			var scale = 1;
			var panOffset = new THREE.Vector3();
			var zoomChanged = false;
	
			// API
	
			this.getPolarAngle = function () {
	
				return phi;
	
			};
	
			this.getAzimuthalAngle = function () {
	
				return theta;
	
			};
	
			this.rotateLeft = function ( angle ) {
	
				thetaDelta -= angle;
	
			};
	
			this.rotateUp = function ( angle ) {
	
				phiDelta -= angle;
	
			};
	
			// pass in distance in world space to move left
			this.panLeft = function() {
	
				var v = new THREE.Vector3();
	
			  return function panLeft(distance) {
			    var te = this.object.matrix.elements;
			    var adjDist = distance / Math.cos(phi);
	
			    v.set(te[ 0 ], 0, te[ 2 ]).normalize();
			    v.multiplyScalar(-adjDist);
	
			    panOffset.add(v);
			  };
	
			}();
	
			// pass in distance in world space to move up
			this.panUp = function() {
	
				var v = new THREE.Vector3();
	
			  return function panUp(distance) {
			    var te = this.object.matrix.elements;
			    var adjDist = distance / Math.cos(phi);
	
			    v.set(te[ 8 ], 0, te[ 10 ]).normalize();
			    v.multiplyScalar(-adjDist);
	
			    panOffset.add(v);
			  };
	
			}();
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			this.pan = function ( deltaX, deltaY, screenWidth, screenHeight ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					// perspective
					var position = scope.object.position;
					var offset = position.clone().sub( scope.target );
					var targetDistance = offset.length();
	
					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );
	
					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					scope.panLeft( 2 * deltaX * targetDistance / screenHeight );
					scope.panUp( 2 * deltaY * targetDistance / screenHeight );
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					// orthographic
					scope.panLeft( deltaX * ( scope.object.right - scope.object.left ) / screenWidth );
					scope.panUp( deltaY * ( scope.object.top - scope.object.bottom ) / screenHeight );
	
				} else {
	
					// camera neither orthographic or perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
	
				}
	
			};
	
			this.dollyIn = function ( dollyScale ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					scale /= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
	
				} else {
	
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			this.dollyOut = function ( dollyScale ) {
	
				if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					scale *= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
					scope.object.updateProjectionMatrix();
					zoomChanged = true;
	
				} else {
	
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			this.update = function() {
	
				var offset = new THREE.Vector3();
	
				// so camera.up is the orbit axis
				var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
				var quatInverse = quat.clone().inverse();
	
				var lastPosition = new THREE.Vector3();
				var lastQuaternion = new THREE.Quaternion();
	
				return function () {
	
					var position = this.object.position;
	
					offset.copy( position ).sub( this.target );
	
					// rotate offset to "y-axis-is-up" space
					offset.applyQuaternion( quat );
	
					// angle from z-axis around y-axis
	
					theta = Math.atan2( offset.x, offset.z );
	
					// angle from y-axis
	
					phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );
	
					theta += thetaDelta;
					phi += phiDelta;
	
					// restrict theta to be between desired limits
					theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );
	
					// restrict phi to be between desired limits
					phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );
	
					// restrict phi to be betwee EPS and PI-EPS
					phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );
	
					var radius = offset.length() * scale;
	
					// restrict radius to be between desired limits
					radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );
	
					// move target to panned location
					this.target.add( panOffset );
	
					offset.x = radius * Math.sin( phi ) * Math.sin( theta );
					offset.y = radius * Math.cos( phi );
					offset.z = radius * Math.sin( phi ) * Math.cos( theta );
	
					// rotate offset back to "camera-up-vector-is-up" space
					offset.applyQuaternion( quatInverse );
	
					position.copy( this.target ).add( offset );
	
					this.object.lookAt( this.target );
	
					if ( this.enableDamping === true ) {
	
						thetaDelta *= ( 1 - this.dampingFactor );
						phiDelta *= ( 1 - this.dampingFactor );
	
					} else {
	
						thetaDelta = 0;
						phiDelta = 0;
	
					}
	
					scale = 1;
					panOffset.set( 0, 0, 0 );
	
					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8
	
					if ( zoomChanged ||
						 lastPosition.distanceToSquared( this.object.position ) > EPS ||
						8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > EPS ) {
	
						lastPosition.copy( this.object.position );
						lastQuaternion.copy( this.object.quaternion );
						zoomChanged = false;
	
						return true;
	
					}
	
					return false;
	
				};
	
			}();
	
		};
	
	
		// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
		// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
		// supported.
		//
		//    Orbit - left mouse / touch: one finger move
		//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
		//    Pan - right mouse, or arrow keys / touch: three finter swipe
	
		function OrbitControls ( object, domElement ) {
	
			var constraint = new OrbitConstraint( object );
	
			this.domElement = ( domElement !== undefined ) ? domElement : document;
	
			// API
	
			Object.defineProperty( this, 'constraint', {
	
				get: function() {
	
					return constraint;
	
				}
	
			} );
	
			this.getPolarAngle = function () {
	
				return constraint.getPolarAngle();
	
			};
	
			this.getAzimuthalAngle = function () {
	
				return constraint.getAzimuthalAngle();
	
			};
	
			// Set to false to disable this control
			this.enabled = true;
	
			// center is old, deprecated; use "target" instead
			this.center = this.target;
	
			// This option actually enables dollying in and out; left as "zoom" for
			// backwards compatibility.
			// Set to false to disable zooming
			this.enableZoom = true;
			this.zoomSpeed = 1.0;
	
			// Set to false to disable rotating
			this.enableRotate = true;
			this.rotateSpeed = 1.0;
	
			// Set to false to disable panning
			this.enablePan = true;
			this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
	
			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			this.autoRotate = false;
			this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
	
			// Set to false to disable use of the keys
			this.enableKeys = true;
	
			// The four arrow keys
			this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
			// Mouse buttons
			this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
	
			////////////
			// internals
	
			var scope = this;
	
			var rotateStart = new THREE.Vector2();
			var rotateEnd = new THREE.Vector2();
			var rotateDelta = new THREE.Vector2();
	
			var panStart = new THREE.Vector2();
			var panEnd = new THREE.Vector2();
			var panDelta = new THREE.Vector2();
	
			var dollyStart = new THREE.Vector2();
			var dollyEnd = new THREE.Vector2();
			var dollyDelta = new THREE.Vector2();
	
			var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
	
			var state = STATE.NONE;
	
			// for reset
	
			this.target0 = this.target.clone();
			this.position0 = this.object.position.clone();
			this.zoom0 = this.object.zoom;
	
			// events
	
			var changeEvent = { type: 'change' };
			var startEvent = { type: 'start' };
			var endEvent = { type: 'end' };
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			function pan( deltaX, deltaY ) {
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				constraint.pan( deltaX, deltaY, element.clientWidth, element.clientHeight );
	
			}
	
			this.update = function () {
	
				if ( this.autoRotate && state === STATE.NONE ) {
	
					constraint.rotateLeft( getAutoRotationAngle() );
	
				}
	
				if ( constraint.update() === true ) {
	
					this.dispatchEvent( changeEvent );
	
				}
	
			};
	
			this.reset = function () {
	
				state = STATE.NONE;
	
				this.target.copy( this.target0 );
				this.object.position.copy( this.position0 );
				this.object.zoom = this.zoom0;
	
				this.object.updateProjectionMatrix();
				this.dispatchEvent( changeEvent );
	
				this.update();
	
			};
	
			function getAutoRotationAngle() {
	
				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	
			}
	
			function getZoomScale() {
	
				return Math.pow( 0.95, scope.zoomSpeed );
	
			}
	
			function onMouseDown( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
	
				if ( event.button === scope.mouseButtons.ORBIT ) {
	
					if ( scope.enableRotate === false ) return;
	
					state = STATE.ROTATE;
	
					rotateStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.ZOOM ) {
	
					if ( scope.enableZoom === false ) return;
	
					state = STATE.DOLLY;
	
					dollyStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.PAN ) {
	
					if ( scope.enablePan === false ) return;
	
					state = STATE.PAN;
	
					panStart.set( event.clientX, event.clientY );
	
				}
	
				if ( state !== STATE.NONE ) {
	
					document.addEventListener( 'mousemove', onMouseMove, false );
					document.addEventListener( 'mouseup', onMouseUp, false );
					scope.dispatchEvent( startEvent );
	
				}
	
			}
	
			function onMouseMove( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				if ( state === STATE.ROTATE ) {
	
					if ( scope.enableRotate === false ) return;
	
					rotateEnd.set( event.clientX, event.clientY );
					rotateDelta.subVectors( rotateEnd, rotateStart );
	
					// rotating across whole screen goes 360 degrees around
					constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	
					// rotating up and down along whole screen attempts to go 360, but limited to 180
					constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
					rotateStart.copy( rotateEnd );
	
				} else if ( state === STATE.DOLLY ) {
	
					if ( scope.enableZoom === false ) return;
	
					dollyEnd.set( event.clientX, event.clientY );
					dollyDelta.subVectors( dollyEnd, dollyStart );
	
					if ( dollyDelta.y > 0 ) {
	
						constraint.dollyIn( getZoomScale() );
	
					} else if ( dollyDelta.y < 0 ) {
	
						constraint.dollyOut( getZoomScale() );
	
					}
	
					dollyStart.copy( dollyEnd );
	
				} else if ( state === STATE.PAN ) {
	
					if ( scope.enablePan === false ) return;
	
					panEnd.set( event.clientX, event.clientY );
					panDelta.subVectors( panEnd, panStart );
	
					pan( panDelta.x, panDelta.y );
	
					panStart.copy( panEnd );
	
				}
	
				if ( state !== STATE.NONE ) scope.update();
	
			}
	
			function onMouseUp( /* event */ ) {
	
				if ( scope.enabled === false ) return;
	
				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );
				scope.dispatchEvent( endEvent );
				state = STATE.NONE;
	
			}
	
			function onMouseWheel( event ) {
	
				if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;
	
				event.preventDefault();
				event.stopPropagation();
	
				var delta = 0;
	
				if ( event.wheelDelta !== undefined ) {
	
					// WebKit / Opera / Explorer 9
	
					delta = event.wheelDelta;
	
				} else if ( event.detail !== undefined ) {
	
					// Firefox
	
					delta = - event.detail;
	
				}
	
				if ( delta > 0 ) {
	
					constraint.dollyOut( getZoomScale() );
	
				} else if ( delta < 0 ) {
	
					constraint.dollyIn( getZoomScale() );
	
				}
	
				scope.update();
				scope.dispatchEvent( startEvent );
				scope.dispatchEvent( endEvent );
	
			}
	
			function onKeyDown( event ) {
	
				if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;
	
				switch ( event.keyCode ) {
	
					case scope.keys.UP:
						pan( 0, scope.keyPanSpeed );
						scope.update();
						break;
	
					case scope.keys.BOTTOM:
						pan( 0, - scope.keyPanSpeed );
						scope.update();
						break;
	
					case scope.keys.LEFT:
						pan( scope.keyPanSpeed, 0 );
						scope.update();
						break;
	
					case scope.keys.RIGHT:
						pan( - scope.keyPanSpeed, 0 );
						scope.update();
						break;
	
				}
	
			}
	
			function touchstart( event ) {
	
				if ( scope.enabled === false ) return;
	
				switch ( event.touches.length ) {
	
					case 1:	// one-fingered touch: rotate
	
						if ( scope.enableRotate === false ) return;
	
						state = STATE.TOUCH_ROTATE;
	
						rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;
	
					case 2:	// two-fingered touch: dolly
	
						if ( scope.enableZoom === false ) return;
	
						state = STATE.TOUCH_DOLLY;
	
						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );
						dollyStart.set( 0, distance );
						break;
	
					case 3: // three-fingered touch: pan
	
						if ( scope.enablePan === false ) return;
	
						state = STATE.TOUCH_PAN;
	
						panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						break;
	
					default:
	
						state = STATE.NONE;
	
				}
	
				if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );
	
			}
	
			function touchmove( event ) {
	
				if ( scope.enabled === false ) return;
	
				event.preventDefault();
				event.stopPropagation();
	
				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				switch ( event.touches.length ) {
	
					case 1: // one-fingered touch: rotate
	
						if ( scope.enableRotate === false ) return;
						if ( state !== STATE.TOUCH_ROTATE ) return;
	
						rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						rotateDelta.subVectors( rotateEnd, rotateStart );
	
						// rotating across whole screen goes 360 degrees around
						constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
						// rotating up and down along whole screen attempts to go 360, but limited to 180
						constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
						rotateStart.copy( rotateEnd );
	
						scope.update();
						break;
	
					case 2: // two-fingered touch: dolly
	
						if ( scope.enableZoom === false ) return;
						if ( state !== STATE.TOUCH_DOLLY ) return;
	
						var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						var distance = Math.sqrt( dx * dx + dy * dy );
	
						dollyEnd.set( 0, distance );
						dollyDelta.subVectors( dollyEnd, dollyStart );
	
						if ( dollyDelta.y > 0 ) {
	
							constraint.dollyOut( getZoomScale() );
	
						} else if ( dollyDelta.y < 0 ) {
	
							constraint.dollyIn( getZoomScale() );
	
						}
	
						dollyStart.copy( dollyEnd );
	
						scope.update();
						break;
	
					case 3: // three-fingered touch: pan
	
						if ( scope.enablePan === false ) return;
						if ( state !== STATE.TOUCH_PAN ) return;
	
						panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						panDelta.subVectors( panEnd, panStart );
	
						pan( panDelta.x, panDelta.y );
	
						panStart.copy( panEnd );
	
						scope.update();
						break;
	
					default:
	
						state = STATE.NONE;
	
				}
	
			}
	
			function touchend( /* event */ ) {
	
				if ( scope.enabled === false ) return;
	
				scope.dispatchEvent( endEvent );
				state = STATE.NONE;
	
			}
	
			function contextmenu( event ) {
	
				event.preventDefault();
	
			}
	
			this.dispose = function() {
	
				this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
				this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
				this.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
				this.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
				this.domElement.removeEventListener( 'touchstart', touchstart, false );
				this.domElement.removeEventListener( 'touchend', touchend, false );
				this.domElement.removeEventListener( 'touchmove', touchmove, false );
	
				document.removeEventListener( 'mousemove', onMouseMove, false );
				document.removeEventListener( 'mouseup', onMouseUp, false );
	
				window.removeEventListener( 'keydown', onKeyDown, false );
	
			}
	
			this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	
			this.domElement.addEventListener( 'mousedown', onMouseDown, false );
			this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
			this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
			this.domElement.addEventListener( 'touchstart', touchstart, false );
			this.domElement.addEventListener( 'touchend', touchend, false );
			this.domElement.addEventListener( 'touchmove', touchmove, false );
	
			window.addEventListener( 'keydown', onKeyDown, false );
	
			// force an update at start
			this.update();
	
		};
	
		OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
		OrbitControls.prototype.constructor = OrbitControls;
	
		Object.defineProperties( OrbitControls.prototype, {
	
			object: {
	
				get: function () {
	
					return this.constraint.object;
	
				}
	
			},
	
			target: {
	
				get: function () {
	
					return this.constraint.target;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: target is now immutable. Use target.set() instead.' );
					this.constraint.target.copy( value );
	
				}
	
			},
	
			minDistance : {
	
				get: function () {
	
					return this.constraint.minDistance;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minDistance = value;
	
				}
	
			},
	
			maxDistance : {
	
				get: function () {
	
					return this.constraint.maxDistance;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxDistance = value;
	
				}
	
			},
	
			minZoom : {
	
				get: function () {
	
					return this.constraint.minZoom;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minZoom = value;
	
				}
	
			},
	
			maxZoom : {
	
				get: function () {
	
					return this.constraint.maxZoom;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxZoom = value;
	
				}
	
			},
	
			minPolarAngle : {
	
				get: function () {
	
					return this.constraint.minPolarAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minPolarAngle = value;
	
				}
	
			},
	
			maxPolarAngle : {
	
				get: function () {
	
					return this.constraint.maxPolarAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxPolarAngle = value;
	
				}
	
			},
	
			minAzimuthAngle : {
	
				get: function () {
	
					return this.constraint.minAzimuthAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.minAzimuthAngle = value;
	
				}
	
			},
	
			maxAzimuthAngle : {
	
				get: function () {
	
					return this.constraint.maxAzimuthAngle;
	
				},
	
				set: function ( value ) {
	
					this.constraint.maxAzimuthAngle = value;
	
				}
	
			},
	
			enableDamping : {
	
				get: function () {
	
					return this.constraint.enableDamping;
	
				},
	
				set: function ( value ) {
	
					this.constraint.enableDamping = value;
	
				}
	
			},
	
			dampingFactor : {
	
				get: function () {
	
					return this.constraint.dampingFactor;
	
				},
	
				set: function ( value ) {
	
					this.constraint.dampingFactor = value;
	
				}
	
			},
	
			// backward compatibility
	
			noZoom: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					return ! this.enableZoom;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					this.enableZoom = ! value;
	
				}
	
			},
	
			noRotate: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					return ! this.enableRotate;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					this.enableRotate = ! value;
	
				}
	
			},
	
			noPan: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					return ! this.enablePan;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					this.enablePan = ! value;
	
				}
	
			},
	
			noKeys: {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					return ! this.enableKeys;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					this.enableKeys = ! value;
	
				}
	
			},
	
			staticMoving : {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					return ! this.constraint.enableDamping;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					this.constraint.enableDamping = ! value;
	
				}
	
			},
	
			dynamicDampingFactor : {
	
				get: function () {
	
					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					return this.constraint.dampingFactor;
	
				},
	
				set: function ( value ) {
	
					console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					this.constraint.dampingFactor = value;
	
				}
	
			}
	
		} );
	
		return OrbitControls;
	}


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
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var EnvironmentLayer = (function (_Layer) {
	  _inherits(EnvironmentLayer, _Layer);
	
	  function EnvironmentLayer() {
	    _classCallCheck(this, EnvironmentLayer);
	
	    _get(Object.getPrototypeOf(EnvironmentLayer.prototype), 'constructor', this).call(this);
	
	    this._initLights();
	    this._initGrid();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(EnvironmentLayer, [{
	    key: '_onAdd',
	    value: function _onAdd() {}
	
	    // Not fleshed out or thought through yet
	    //
	    // Lights could potentially be put it their own 'layer' to keep this class
	    // much simpler and less messy
	  }, {
	    key: '_initLights',
	    value: function _initLights() {
	      // Position doesn't really matter (the angle is important), however it's
	      // used here so the helpers look more natural.
	
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
	
	      this._layer.add(directionalLight);
	      this._layer.add(directionalLight2);
	
	      this._layer.add(helper);
	      this._layer.add(helper2);
	    }
	
	    // Add grid helper for context during initial development
	  }, {
	    key: '_initGrid',
	    value: function _initGrid() {
	      var size = 4000;
	      var step = 100;
	
	      var gridHelper = new _three2['default'].GridHelper(size, step);
	      this._layer.add(gridHelper);
	    }
	  }]);
	
	  return EnvironmentLayer;
	})(_Layer3['default']);
	
	exports['default'] = function () {
	  return new EnvironmentLayer();
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
	
	  // Add layer to world instance and store world reference
	
	  _createClass(Layer, [{
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
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Layer2 = __webpack_require__(32);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _Surface = __webpack_require__(34);
	
	var _Surface2 = _interopRequireDefault(_Surface);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	// TODO: Prevent tiles from being loaded if they are further than a certain
	// distance from the camera and are unlikely to be seen anyway
	
	var GridLayer = (function (_Layer) {
	  _inherits(GridLayer, _Layer);
	
	  function GridLayer() {
	    _classCallCheck(this, GridLayer);
	
	    _get(Object.getPrototypeOf(GridLayer.prototype), 'constructor', this).call(this);
	
	    this._minLOD = 3;
	    this._maxLOD = 18;
	    this._frustum = new _three2['default'].Frustum();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(GridLayer, [{
	    key: '_onAdd',
	    value: function _onAdd(world) {
	      var _this = this;
	
	      this._initEvents();
	
	      // Trigger initial quadtree calculation on the next frame
	      //
	      // TODO: This is a hack to ensure the camera is all set up - a better
	      // solution should be found
	      setTimeout(function () {
	        _this._calculateLOD();
	      }, 0);
	    }
	  }, {
	    key: '_initEvents',
	    value: function _initEvents() {
	      var _this2 = this;
	
	      this._world.on('move', function (latlon) {
	        _this2._calculateLOD();
	      });
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
	    key: '_surfaceInFrustum',
	    value: function _surfaceInFrustum(surface) {
	      return this._frustum.intersectsBox(new _three2['default'].Box3(new _three2['default'].Vector3(surface.bounds[0], 0, surface.bounds[3]), new _three2['default'].Vector3(surface.bounds[2], 0, surface.bounds[1])));
	    }
	  }, {
	    key: '_calculateLOD',
	    value: function _calculateLOD() {
	      var _this3 = this;
	
	      var camera = this._world.getCamera();
	
	      // 1. Update and retrieve camera frustum
	      this._updateFrustum(this._frustum, camera);
	
	      // 2. Add the four root items of the quadtree to a check list
	      var checkList = this._checklist;
	      checkList = [];
	      checkList.push((0, _Surface2['default'])('0', this._world));
	      checkList.push((0, _Surface2['default'])('1', this._world));
	      checkList.push((0, _Surface2['default'])('2', this._world));
	      checkList.push((0, _Surface2['default'])('3', this._world));
	
	      // 3. Call Divide, passing in the check list
	      this._divide(checkList);
	
	      // 4. Render the quadtree items remaining in the check list
	      checkList.forEach(function (surface, index) {
	        if (!_this3._surfaceInFrustum(surface)) {
	          return;
	        }
	
	        // console.log(surface);
	
	        // surface.render();
	        _this3._layer.add(surface.mesh);
	      });
	    }
	  }, {
	    key: '_divide',
	    value: function _divide(checkList) {
	      var count = 0;
	      var currentItem;
	      var quadkey;
	
	      // 1. Loop until count equals check list length
	      while (count != checkList.length) {
	        currentItem = checkList[count];
	        quadkey = currentItem.quadkey;
	
	        // 2. Increase count and continue loop if quadkey equals max LOD / zoom
	        if (currentItem.length === this._maxLOD) {
	          count++;
	          continue;
	        }
	
	        // 3. Else, calculate screen-space error metric for quadkey
	        if (this._screenSpaceError(currentItem)) {
	          // 4. If error is sufficient...
	
	          // 4a. Remove parent item from the check list
	          checkList.splice(count, 1);
	
	          // 4b. Add 4 child items to the check list
	          checkList.push((0, _Surface2['default'])(quadkey + '0', this._world));
	          checkList.push((0, _Surface2['default'])(quadkey + '1', this._world));
	          checkList.push((0, _Surface2['default'])(quadkey + '2', this._world));
	          checkList.push((0, _Surface2['default'])(quadkey + '3', this._world));
	
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
	    value: function _screenSpaceError(surface) {
	      var minDepth = this._minLOD;
	      var maxDepth = this._maxLOD;
	
	      var camera = this._world.getCamera();
	
	      // Tweak this value to refine specific point that each quad is subdivided
	      //
	      // It's used to multiple the dimensions of the surface sides before
	      // comparing against the surface distance from camera
	      var quality = 3.0;
	
	      // 1. Return false if quadkey length is greater than maxDepth
	      if (surface.quadkey.length > maxDepth) {
	        return false;
	      }
	
	      // 2. Return true if quadkey length is less than minDepth
	      if (surface.quadkey.length < minDepth) {
	        return true;
	      }
	
	      // 3. Return false if quadkey bounds are not in view frustum
	      if (!this._surfaceInFrustum(surface)) {
	        return false;
	      }
	
	      // 4. Calculate screen-space error metric
	      // TODO: Use closest distance to one of the 4 surface corners
	      var dist = new _three2['default'].Vector3(surface.center[0], 0, surface.center[1]).sub(camera.position).length();
	
	      // console.log(surface, dist);
	
	      var error = quality * surface.side / dist;
	
	      // 5. Return true if error is greater than 1.0, else return false
	      return error > 1.0;
	    }
	  }]);
	
	  return GridLayer;
	})(_Layer3['default']);
	
	exports['default'] = function () {
	  return new GridLayer();
	};
	
	;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _geoLatLon = __webpack_require__(10);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _three = __webpack_require__(24);
	
	var _three2 = _interopRequireDefault(_three);
	
	var r2d = 180 / Math.PI;
	
	var loader = new _three2['default'].TextureLoader();
	loader.setCrossOrigin('');
	
	var Surface = (function () {
	  function Surface(quadkey, world) {
	    _classCallCheck(this, Surface);
	
	    this.world = world;
	    this.quadkey = quadkey;
	    this.tile = this._quadkeyToTile(quadkey);
	    this.bounds = this._tileBounds(this.tile);
	    this.center = this._boundsToCenter(this.bounds);
	    this.side = new _three2['default'].Vector3(this.bounds[0], 0, this.bounds[3]).sub(new _three2['default'].Vector3(this.bounds[0], 0, this.bounds[1])).length();
	
	    this.mesh = this._createMesh();
	  }
	
	  // Initialise without requiring new keyword
	
	  _createClass(Surface, [{
	    key: '_createDebugMesh',
	    value: function _createDebugMesh() {
	      var canvas = document.createElement('canvas');
	      canvas.width = 256;
	      canvas.height = 256;
	
	      var context = canvas.getContext('2d');
	      context.font = 'Bold 20px Helvetica Neue, Verdana, Arial';
	      context.fillStyle = 'rgba(255,0,0,1)';
	      context.fillText(this.quadkey, 20, canvas.width / 2 + 10);
	
	      var texture = new _three2['default'].Texture(canvas);
	
	      // Silky smooth images when tilted
	      texture.magFilter = _three2['default'].LinearFilter;
	      texture.minFilter = _three2['default'].LinearMipMapLinearFilter;
	
	      // TODO: Set this to renderer.getMaxAnisotropy() / 4
	      texture.anisotropy = 4;
	
	      texture.needsUpdate = true;
	
	      var material = new _three2['default'].MeshBasicMaterial({
	        map: texture,
	        transparent: true
	      });
	
	      var geom = new _three2['default'].PlaneGeometry(this.side, this.side, 1);
	      var mesh = new _three2['default'].Mesh(geom, material);
	
	      mesh.rotation.x = -90 * Math.PI / 180;
	      mesh.position.y = 0.1;
	
	      return mesh;
	    }
	  }, {
	    key: '_createMesh',
	    value: function _createMesh() {
	      var mesh = new _three2['default'].Object3D();
	      var geom = new _three2['default'].PlaneGeometry(this.side, this.side, 1);
	
	      var material = new _three2['default'].MeshBasicMaterial();
	
	      var localMesh = new _three2['default'].Mesh(geom, material);
	      localMesh.rotation.x = -90 * Math.PI / 180;
	
	      mesh.add(localMesh);
	
	      mesh.position.x = this.center[0];
	      mesh.position.z = this.center[1];
	
	      var box = new _three2['default'].BoxHelper(localMesh);
	      mesh.add(box);
	
	      mesh.add(this._createDebugMesh());
	
	      // var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
	      // var url = 'http://' + letter + '.basemaps.cartocdn.com/light_nolabels/';
	      // // var url = 'http://tile.stamen.com/toner-lite/';
	      //
	      // loader.load(url + this.tile[2] + '/' + this.tile[0] + '/' + this.tile[1] + '@2x.png', texture => {
	      //   console.log('Loaded');
	      //   // Silky smooth images when tilted
	      //   texture.magFilter = THREE.LinearFilter;
	      //   texture.minFilter = THREE.LinearMipMapLinearFilter;
	      //
	      //   // TODO: Set this to renderer.getMaxAnisotropy() / 4
	      //   texture.anisotropy = 4;
	      //
	      //   texture.needsUpdate = true;
	      //
	      //   var material = new THREE.MeshBasicMaterial({map: texture});
	      //
	      //   var localMesh = new THREE.Mesh(geom, material);
	      //   localMesh.rotation.x = -90 * Math.PI / 180;
	      //
	      //   // Sometimes tiles don't appear, even though the images have loaded ok
	      //   // This helps a little but it's a total hack and the real solution needs
	      //   // to be found.
	      //   setTimeout(function() {
	      //     mesh.add(localMesh);
	      //   }, 2000);
	      //
	      //   mesh.position.x = this.center[0];
	      //   mesh.position.z = this.center[1];
	      //
	      //   var box = new THREE.BoxHelper(localMesh);
	      //   mesh.add(box);
	      //
	      //   this._createDebugMesh();
	      // });
	
	      return mesh;
	    }
	  }, {
	    key: '_quadkeyToTile',
	    value: function _quadkeyToTile(quadkey) {
	      var x = 0;
	      var y = 0;
	      var z = quadkey.length;
	
	      for (var i = z; i > 0; i--) {
	        var mask = 1 << i - 1;
	        var q = +quadkey[z - i];
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
	  }, {
	    key: '_boundsToCenter',
	    value: function _boundsToCenter(bounds) {
	      var x = bounds[0] + (bounds[2] - bounds[0]) / 2;
	      var y = bounds[1] + (bounds[3] - bounds[1]) / 2;
	
	      return [x, y];
	    }
	  }, {
	    key: '_tileBounds',
	    value: function _tileBounds(tile) {
	      var boundsWGS84 = this._tileBoundsWGS84(tile);
	
	      var sw = this.world.latLonToPoint((0, _geoLatLon2['default'])(boundsWGS84[1], boundsWGS84[0]));
	      var ne = this.world.latLonToPoint((0, _geoLatLon2['default'])(boundsWGS84[3], boundsWGS84[2]));
	
	      return [sw.x, sw.y, ne.x, ne.y];
	      // return [swMerc[0], -swMerc[1], neMerc[0], -neMerc[1]];
	    }
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
	  }]);
	
	  return Surface;
	})();
	
	exports['default'] = function (quadkey, world) {
	  return new Surface(quadkey, world);
	};
	
	;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;