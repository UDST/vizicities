/* globals window, _, VIZI, THREE, Q, d3 */
(function() {
	"use strict";

	VIZI.Data = function() {
		_.extend(this, VIZI.Mediator);

		// Reference to geo class
		this.geo = VIZI.Geo.getInstance();

		// Reference to grid class
		this.grid = VIZI.Grid.getInstance();

		// Cache
		this.cache = new VIZI.Cache();

		// Objects
		this.objects = {};

		// Use IDs of processed features to prevent duplication on tile boundaries
		// TODO: Remove ids from here when they're manually removed from view
		this.processedIds = {};

		// URL of data source
		this.url = "";

		// Degrees latitude for boundary distance from current position
		// Default to roughly 1km
		this.dataBoundsDistance = 0.009;

		// Degrees latitude for each data tile
		// Default to roughly around 550m
		this.dataTileSize = 0.005;

		// Winding
		this.clockwise = "cw";
		this.counterClockwise = "ccw";

		// Distance constants
		this.YARD_TO_METER = 0.9144;
		this.FOOT_TO_METER = 0.3048;
		this.INCH_TO_METER = 0.0254;
		this.METERS_PER_LEVEL = 3;
	};

	VIZI.Data.prototype.load = function(url, parameters, cacheKey) {
		var self = this;
		var deferred = Q.defer();

		// Check cache
		// TODO: Work out why this causes a lock-up
		// - Might need to use typed arrays
		var cachedFeatures = this.cache.get(cacheKey);
		if (cachedFeatures) {
			VIZI.Log("Loading tile from cache:", cacheKey);
			self.loadProcess(cachedFeatures, cacheKey).done(function() {
				deferred.resolve();
			});
			return deferred.promise;
		}

		// Replace URL placeholders with parameter values
		url = url.replace(/\{([swne])\}/g, function(value, key) {
			// Replace with paramter, otherwise keep existing value
			return parameters[key];
		});

		VIZI.Log("Requesting URL", url);

		// Request data and fulfil promise
		d3.json(url, function(error, data) {
			VIZI.Log("Response for URL", url);
			if (error) {
				deferred.reject(new Error(error));
			} else {
				// No features
				if (data.elements.length === 0) {
					deferred.resolve();
					return;
				}

				var features = self.process(data, true);

				// Add data to cache (including dupes on boundaries)
				self.cache.add(cacheKey, features);
				VIZI.Log("Added data to cache:", cacheKey);

				self.loadProcess(features, cacheKey).done(function() {
					deferred.resolve();
				});
			}
		});

		return deferred.promise;
	};

	VIZI.Data.prototype.loadProcess = function(features, cacheKey) {
		var self = this;
		var deferred = Q.defer();

		var uniqueFeatures = [];

		// Skip duplicate features
		_.each(features, function(feature) {
			// Skip if feature is undefined
			if (!feature) {
				VIZI.Log("Skipping undefined feature");
				return;
			}

			var existingId = _.find(self.processedIds, function(featureIds) {
				return (_.indexOf(featureIds, feature.id) === -1) ? false : true;
			});

			// TODO: Double-check that this is 100% correct as there are a lot of duplicated feature messages showing up
			// TODO: Look into issue where this may prevent the promise from resolving
			if (existingId) {
				VIZI.Log("Skipping duplicated feature");
				return;
			}

			if (!self.processedIds[cacheKey]) {
				self.processedIds[cacheKey] = [];
			}

			self.processedIds[cacheKey].push(feature.id);
			uniqueFeatures.push(feature);
		});

		// End promise if no features left to render
		if (uniqueFeatures.length === 0) {
			VIZI.Log("No features left to pass to worker");
			deferred.resolve();
			return deferred.promise;
		}

		// TODO: Pass-through progress event
		self.generateFeatures(uniqueFeatures).then(function(mesh) {
			// Store reference to mesh for tile
			self.objects[cacheKey] = mesh;
			deferred.resolve();
		}, undefined, function(progress) {
			// Pass-through progress
			deferred.notify(progress);
		});

		return deferred.promise;
	};

	VIZI.Data.prototype.update = function() {};
	VIZI.Data.prototype.process = function(data) {};
	VIZI.Data.prototype.generateFeatures = function(uniqueFeatures) {};

	VIZI.Data.prototype.checkDuplicateCoords = function(prev, current) {
		var dupe = false;
		_.each(prev, function(coord) {
			if (coord[0] === current[0] && coord[1] === current[1]) {
				dupe = true;
			}
		});

		return dupe;
	};

	// Enforce a polygon winding direcetion. Needed for proper backface culling.
	VIZI.Data.prototype.makeWinding = function(points, direction) {
		var winding = THREE.Shape.Utils.isClockWise(points) ? this.clockwise : this.counterClockwise;
		if (winding === direction) {
			return points;
		} else {
			return points.reverse();
		}
	};

	// Convert string distance value into meters
	// From: https://github.com/kekscom/osmbuildings/blob/master/src/Import.js#L39
	VIZI.Data.prototype.toMeters = function(str) {
		str = '' + str;
		var value = parseFloat(str);
		if (value === str) {
			return value <<0;
		}
		if (~str.indexOf('m')) {
			return value <<0;
		}
		if (~str.indexOf('yd')) {
			return value*this.YARD_TO_METER <<0;
		}
		if (~str.indexOf('ft')) {
			return value*this.FOOT_TO_METER <<0;
		}
		if (~str.indexOf('\'')) {
			var parts = str.split('\'');
			var res = parts[0]*this.FOOT_TO_METER + parts[1]*this.INCH_TO_METER;
			return res <<0;
		}
		return value <<0;
	};
}());
