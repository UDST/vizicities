(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("THREE"));
	else if(typeof define === 'function' && define.amd)
		define(["THREE"], factory);
	else if(typeof exports === 'object')
		exports["VIZI"] = factory(require("THREE"));
	else
		root["VIZI"] = factory(root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_18__) {
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
	
	var _geoGeoJs = __webpack_require__(1);
	
	var _geoGeoJs2 = _interopRequireDefault(_geoGeoJs);
	
	var _layerLayer = __webpack_require__(4);
	
	var _layerLayer2 = _interopRequireDefault(_layerLayer);
	
	var _layerGeoJSONWorkerLayer = __webpack_require__(22);
	
	var _layerGeoJSONWorkerLayer2 = _interopRequireDefault(_layerGeoJSONWorkerLayer);
	
	var _layerGeometryPolygonLayer = __webpack_require__(36);
	
	var _layerGeometryPolygonLayer2 = _interopRequireDefault(_layerGeometryPolygonLayer);
	
	var _geoPoint = __webpack_require__(3);
	
	var _geoPoint2 = _interopRequireDefault(_geoPoint);
	
	var _geoLatLon = __webpack_require__(2);
	
	var _geoLatLon2 = _interopRequireDefault(_geoLatLon);
	
	var _utilIndex = __webpack_require__(41);
	
	var _utilIndex2 = _interopRequireDefault(_utilIndex);
	
	var VIZI = {
	  version: '0.3',
	
	  Geo: _geoGeoJs2['default'],
	  Layer: _layerLayer2['default'],
	  layer: _layerLayer.layer,
	  GeoJSONWorkerLayer: _layerGeoJSONWorkerLayer2['default'],
	  geoJSONWorkerLayer: _layerGeoJSONWorkerLayer.geoJSONWorkerLayer,
	  PolygonLayer: _layerGeometryPolygonLayer2['default'],
	  polygonLayer: _layerGeometryPolygonLayer.polygonLayer,
	  Point: _geoPoint2['default'],
	  point: _geoPoint.point,
	  LatLon: _geoLatLon2['default'],
	  latLon: _geoLatLon.latLon,
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
	
	var _LatLon = __webpack_require__(2);
	
	var _Point = __webpack_require__(3);
	
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
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _eventemitter3 = __webpack_require__(5);
	
	var _eventemitter32 = _interopRequireDefault(_eventemitter3);
	
	var _lodashAssign = __webpack_require__(6);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _shortid = __webpack_require__(9);
	
	var _shortid2 = _interopRequireDefault(_shortid);
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _engineScene = __webpack_require__(19);
	
	var _engineScene2 = _interopRequireDefault(_engineScene);
	
	var _vendorCSS3DRenderer = __webpack_require__(20);
	
	var _vendorCSS2DRenderer = __webpack_require__(21);
	
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var keys = __webpack_require__(7),
	    rest = __webpack_require__(8);
	
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var alphabet = __webpack_require__(11);
	var encode = __webpack_require__(13);
	var decode = __webpack_require__(15);
	var isValid = __webpack_require__(16);
	
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
	var clusterWorkerId = __webpack_require__(17) || 0;
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomFromSeed = __webpack_require__(12);
	
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var randomByte = __webpack_require__(14);
	
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(11);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var alphabet = __webpack_require__(11);
	
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
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = 0;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(18);
	
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
/* 20 */
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
	
	var _three = __webpack_require__(18);
	
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
/* 21 */
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
	
	var _three = __webpack_require__(18);
	
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
/* 22 */
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
	
	var _Layer2 = __webpack_require__(4);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(6);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _reqwest = __webpack_require__(23);
	
	var _reqwest2 = _interopRequireDefault(_reqwest);
	
	var _utilGeoJSON = __webpack_require__(25);
	
	var _utilGeoJSON2 = _interopRequireDefault(_utilGeoJSON);
	
	var _utilWorker = __webpack_require__(31);
	
	var _utilWorker2 = _interopRequireDefault(_utilWorker);
	
	var _utilBuffer = __webpack_require__(34);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _utilStringify = __webpack_require__(35);
	
	var _utilStringify2 = _interopRequireDefault(_utilStringify);
	
	var _geometryPolygonLayer = __webpack_require__(36);
	
	var _geometryPolygonLayer2 = _interopRequireDefault(_geometryPolygonLayer);
	
	var _geometryPolylineLayer = __webpack_require__(39);
	
	var _geometryPolylineLayer2 = _interopRequireDefault(_geometryPolylineLayer);
	
	var _geometryPointLayer = __webpack_require__(40);
	
	var _geometryPointLayer2 = _interopRequireDefault(_geometryPointLayer);
	
	var _geoLatLon = __webpack_require__(2);
	
	var _geoPoint = __webpack_require__(3);
	
	var _geoGeo = __webpack_require__(1);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _enginePickingMaterial = __webpack_require__(37);
	
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
/* 23 */
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
	      XHR2 = __webpack_require__(24)
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
/* 24 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * GeoJSON helpers for handling data and generating objects
	 */
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _topojson2 = __webpack_require__(26);
	
	var topojson = _interopRequireWildcard(_topojson2);
	
	var _geojsonMerge = __webpack_require__(27);
	
	var _geojsonMerge2 = _interopRequireDefault(_geojsonMerge);
	
	var _earcut = __webpack_require__(29);
	
	var _earcut2 = _interopRequireDefault(_earcut);
	
	var _extrudePolygon = __webpack_require__(30);
	
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var normalize = __webpack_require__(28);
	
	module.exports = function(inputs) {
	    return {
	        type: 'FeatureCollection',
	        features: inputs.reduce(function(memo, input) {
	            return memo.concat(normalize(input).features);
	        }, [])
	    };
	};


/***/ },
/* 28 */
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
/* 29 */
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
/* 30 */
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
	
	var _lodashAssign = __webpack_require__(6);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _WorkerPool = __webpack_require__(32);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _WorkerPoolWorker = __webpack_require__(33);
	
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	 * BufferGeometry helpers
	 */
	
	var _three = __webpack_require__(18);
	
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
/* 35 */
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
/* 36 */
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
	
	var _Layer2 = __webpack_require__(4);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(6);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(1);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(2);
	
	var _geoPoint = __webpack_require__(3);
	
	var _earcut2 = __webpack_require__(29);
	
	var _earcut3 = _interopRequireDefault(_earcut2);
	
	var _utilExtrudePolygon = __webpack_require__(30);
	
	var _utilExtrudePolygon2 = _interopRequireDefault(_utilExtrudePolygon);
	
	var _enginePickingMaterial = __webpack_require__(37);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(34);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _PickingShader = __webpack_require__(38);
	
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
/* 38 */
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
/* 39 */
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
	
	var _Layer2 = __webpack_require__(4);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(6);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(1);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(2);
	
	var _geoPoint = __webpack_require__(3);
	
	var _enginePickingMaterial = __webpack_require__(37);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(34);
	
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
/* 40 */
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
	
	var _Layer2 = __webpack_require__(4);
	
	var _Layer3 = _interopRequireDefault(_Layer2);
	
	var _lodashAssign = __webpack_require__(6);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _three = __webpack_require__(18);
	
	var _three2 = _interopRequireDefault(_three);
	
	var _geoGeo = __webpack_require__(1);
	
	var _geoGeo2 = _interopRequireDefault(_geoGeo);
	
	var _geoLatLon = __webpack_require__(2);
	
	var _geoPoint = __webpack_require__(3);
	
	var _enginePickingMaterial = __webpack_require__(37);
	
	var _enginePickingMaterial2 = _interopRequireDefault(_enginePickingMaterial);
	
	var _utilBuffer = __webpack_require__(34);
	
	var _utilBuffer2 = _interopRequireDefault(_utilBuffer);
	
	var _PolygonLayer = __webpack_require__(36);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: A lot of these utils don't need to be in separate, tiny files
	
	var _wrapNum = __webpack_require__(42);
	
	var _wrapNum2 = _interopRequireDefault(_wrapNum);
	
	var _extrudePolygon = __webpack_require__(30);
	
	var _extrudePolygon2 = _interopRequireDefault(_extrudePolygon);
	
	var _GeoJSON = __webpack_require__(25);
	
	var _GeoJSON2 = _interopRequireDefault(_GeoJSON);
	
	var _Buffer = __webpack_require__(34);
	
	var _Buffer2 = _interopRequireDefault(_Buffer);
	
	var _Worker = __webpack_require__(31);
	
	var _Worker2 = _interopRequireDefault(_Worker);
	
	var _Stringify = __webpack_require__(35);
	
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
/* 42 */
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