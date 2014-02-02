/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.City = function() {
		VIZI.Log("Inititialising city");

		_.extend(this, VIZI.Mediator);

		// Debug tools
		this.dat = new VIZI.Dat();
		this.fps = undefined;
		this.rendererInfo = undefined;

		// UI
		this.ui = {};
		this.ui.loading = undefined;

		// Geo methods
		this.geo = undefined;
			
		// Basic WebGL components (scene, camera, renderer, lights, etc)
		this.webgl = undefined;

		// DOM events (window resize, mouse, keyboard, etc)
		this.domEvents = undefined;

		// Core city-scene objects (floor, skybox, etc)
		this.floor = undefined;

		// References to standard city features
		this.buildings = undefined;

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

		_.defaults(options, {
			areaCoords: {
				bottomLeft: [-0.090062,51.489438],
				topRight: [0.012322,51.519747]
			}, 
			buildings: true,
			buildingsURL: null
		});

		// Output city options
		VIZI.Log(options);

		// Set up geo methods
		self.geo = VIZI.Geo.getInstance({
			areaCoords: options.areaCoords
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

			// Initialise DOM events
			return self.initDOMEvents();
		}).then(function() {
			self.publish("loadingProgress", 0.4);

			// TODO: Work out a way to use progress event of each promises to increment loading progress
			// Perhaps by looping through each promises individually and working out progress fraction by num. of promises / amount processed

			// Load objects using promises
			var promises = [];

			// Load core city objects
			promises.push(self.loadCoreObjects());

			// Load buildings
			if (options.buildings) {
				promises.push(self.loadBuildings(options.buildingsURL));
			}

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

		this.fps = new VIZI.FPS();
		this.rendererInfo = new VIZI.RendererInfo();

		VIZI.Log("Finished intialising debug tools in " + (Date.now() - startTime) + "ms");

		return Q.fcall(function() {});
	};

	// TODO: Move set up of core objects out to somewhere else
	VIZI.City.prototype.initWebGL = function() {
		var startTime = Date.now();

		var deferred = Q.defer();
		
		this.webgl = new VIZI.WebGL();

		this.webgl.init().then(function(result) {
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

	VIZI.City.prototype.loadCoreObjects = function() {
		VIZI.Log("Loading core objects");

		var startTime = Date.now();

		// Set up core components
		this.floor = new VIZI.Floor();

		VIZI.Log("Finished loading core objects in " + (Date.now() - startTime) + "ms");

		return Q.fcall(function() {});
	};

	VIZI.City.prototype.loadBuildings = function(url) {
		VIZI.Log("Loading buildings");

		var startTime = Date.now();

		var deferred = Q.defer();

		var buildingManager = new VIZI.BuildingManager();
		buildingManager.load(url).then(function(value) {
			VIZI.Log(value);
			buildingManager.processFeaturesWorker(value.features).then(function(result) {
				VIZI.Log("Finished loading buildings in " + (Date.now() - startTime) + "ms");
				deferred.resolve(buildingManager);
			}, undefined, function(progress) {
				// Pass-through progress
				deferred.notify(progress);
			});
		}, function(error) {
			console.error(error.stack);
		}).done();

		return deferred.promise;
	};
}());