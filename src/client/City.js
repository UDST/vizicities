/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.City = function() {
		VIZI.Log("Inititialising city");

		_.extend(this, VIZI.Mediator);

		// Debug tools
		this.dat = undefined;
		this.fps = undefined;
		this.rendererInfo = undefined;

		// UI
		this.ui = {};
		this.ui.loading = undefined;

		// Geo methods
		this.geo = undefined;

		// Grid manager
		this.grid = undefined;

		// Data gathering and processing
		this.data = undefined;
			
		// Basic WebGL components (scene, camera, renderer, lights, etc)
		this.webgl = undefined;

		// DOM events (window resize, etc)
		this.domEvents = undefined;

		// Controls (mouse, keyboard, Leap, etc)
		this.controls = undefined;

		// Core city-scene objects (floor, skybox, etc)
		this.floor = undefined;

		// Main application loop
		this.loop = undefined;

		this.publish("addToDat", this, {name: "City", properties: ["init"]});
	};

	VIZI.City.prototype.init = function(options) {
		VIZI.Log("Loading city");

		var startTime = Date.now();
		var self = this;

		if (!options) {
			options = {};
		}

		var hash = window.location.hash.replace('#', '');
		var coordCheck = /^(\-?\d+(\.\d+)?),(\-?\d+(\.\d+)?)$/;
		if (coordCheck.test(hash) && !_.has(options, 'coords')) {
			options.coords = hash.split(',');
		}

		_.defaults(options, {
			coords: [-0.01924, 51.50358]
		});

		// Output city options
		VIZI.Log(options);

		// Set up geo methods
		self.geo = VIZI.Geo.getInstance({
			center: options.coords
		});

		// Load city using promises

		self.publish("loadingProgress", 0);

		// Initialise loading UI
		this.initLoadingUI().then(function() {
			self.publish("loadingProgress", 0.1);

			// Initialise debug tools
			return self.initDebug();
		}).then(function() {
			self.publish("loadingProgress", 0.2);

			// Initialise WebGL
			return self.initWebGL();
		}).then(function() {
			self.publish("loadingProgress", 0.3);

			var promises = [];

			// Initialise DOM events
			promises.push(self.initDOMEvents());

			// Initialise controls
			promises.push(self.initControls());

			return Q.allSettled(promises);
		}).then(function() {
			self.publish("loadingProgress", 0.4);

			// Initialise grid manager
			return self.initGrid();
		}).then(function() {
			self.publish("loadingProgress", 0.5);

			// Set up data loader
			self.data = new VIZI.DataOverpass();

			// TODO: Work out a way to use progress event of each promises to increment loading progress
			// Perhaps by looping through each promises individually and working out progress fraction by num. of promises / amount processed

			// Load objects using promises
			var promises = [];

			// Load core city objects
			promises.push(self.loadCoreObjects());

			// Load data from the OSM Overpass API
			promises.push(self.loadOverpass());

			return Q.allSettled(promises);
		}).then(function (results) {
			// Set up and start application loop
			self.loop = new VIZI.Loop();

			self.publish("loadingProgress", 1);
			self.publish("loadingComplete");

			VIZI.Log("Finished loading city in " + (Date.now() - startTime) + "ms");
		});
	};

	VIZI.City.prototype.initLoadingUI = function() {
		var startTime = Date.now();

		var deferred = Q.defer();

		this.ui.loading = new VIZI.Loading();

		this.ui.loading.init().then(function(result) {
			VIZI.Log("Finished intialising loading UI in " + (Date.now() - startTime) + "ms");

			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.City.prototype.initDebug = function() {
		VIZI.Log("Intialising debug tools");

		var startTime = Date.now();

		if (VIZI.DEBUG) {
			this.dat = new VIZI.Dat();
			this.fps = new VIZI.FPS();
			this.rendererInfo = new VIZI.RendererInfo();
		}

		VIZI.Log("Finished intialising debug tools in " + (Date.now() - startTime) + "ms");

		return Q.fcall(function() {});
	};

	// TODO: Move set up of core objects out to somewhere else
	VIZI.City.prototype.initWebGL = function() {
		var startTime = Date.now();

		var deferred = Q.defer();
		
		this.webgl = new VIZI.WebGL();

		this.webgl.init(this.geo.centerPixels).then(function(result) {
			VIZI.Log("Finished intialising WebGL in " + (Date.now() - startTime) + "ms");

			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.City.prototype.initDOMEvents = function() {
		var startTime = Date.now();

		var deferred = Q.defer();

		this.domEvents = new VIZI.DOMEvents();

		this.domEvents.init().then(function(result) {
			VIZI.Log("Finished intialising DOM events in " + (Date.now() - startTime) + "ms");

			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.City.prototype.initControls = function() {
		var startTime = Date.now();

		var deferred = Q.defer();

		this.controls = VIZI.Controls.getInstance();

		this.controls.init(this.webgl.camera).then(function(result) {
			VIZI.Log("Finished intialising controls in " + (Date.now() - startTime) + "ms");

			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.City.prototype.initGrid = function() {
		var startTime = Date.now();

		var deferred = Q.defer();

		// Set up grid manager
		this.grid = VIZI.Grid.getInstance();

		this.grid.init(this.geo.center).then(function(result) {
			VIZI.Log("Finished intialising grid manager in " + (Date.now() - startTime) + "ms");

			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.City.prototype.loadCoreObjects = function() {
		VIZI.Log("Loading core objects");

		var startTime = Date.now();

		// Set up core components
		this.floor = new VIZI.Floor();

		VIZI.Log("Finished loading core objects in " + (Date.now() - startTime) + "ms");

		return Q.fcall(function() {});
	};

	VIZI.City.prototype.loadOverpass = function() {
		VIZI.Log("Loading data from OSM Overpass API");

		var startTime = Date.now();

		var deferred = Q.defer();

		this.data.update().done(function() {
			VIZI.Log("Finished loading Overpass data in " + (Date.now() - startTime) + "ms");
			deferred.resolve();
		});

		return deferred.promise;
	};
}());