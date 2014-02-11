/* globals window, _, VIZI, Q, d3 */
(function() {
	"use strict";

	VIZI.Data = function() {
		_.extend(this, VIZI.Mediator);

		// Reference to geo class
		this.geo = VIZI.Geo.getInstance();

		// Reference to grid class
		this.grid = VIZI.Grid.getInstance();

		// URL of data source
		this.url = "";

		// Degrees latitude for boundary distance from current position
		// Default to roughly 1km
		this.dataBoundsDistance = 0.009;

		// Degrees latitude for each data tile
		// Default to roughly around 550m
		this.dataTileSize = 0.005;

		// Distance constants
		this.YARD_TO_METER = 0.9144;
		this.FOOT_TO_METER = 0.3048;
		this.INCH_TO_METER = 0.0254;
		this.METERS_PER_LEVEL = 3;
	};

	VIZI.Data.prototype.load = function(parameters) {
		var deferred = Q.defer();

		// Replace URL placeholders with parameter values
		var url = this.url.replace(/\{([swne])\}/g, function(value, key) {
			// Replace with paramter, otherwise keep existing value
			return parameters[key];
		});

		// Request data and fulfil promise 
		d3.json(url, function(error, data) {
			if (error) {
				deferred.reject(new Error(error));
			} else {
				deferred.resolve(data);
			}
		});

		return deferred.promise;
	};

	VIZI.Data.prototype.update = function() {};
	VIZI.Data.prototype.process = function(data) {};

	VIZI.Data.prototype.checkDuplicateCoords = function(prev, current) {
		var dupe = false;
		_.each(prev, function(coord) {
			if (coord[0] === current[0] && coord[1] === current[1]) {
				dupe = true;
			}
		});

		return dupe;
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