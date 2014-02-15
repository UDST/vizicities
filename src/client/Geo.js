/* globals window, _, VIZI, d3 */
(function() {
	"use strict";

	VIZI.Geo = (function() {
		var Geo = function(options) {
			_.extend(this, VIZI.Mediator);

			// Meters per degree latitude
			// Given radius of earth is 6378137 meters
			// (2 * Math.PI / 360) * 6378137 = 111319.49079327357
			// From: http://stackoverflow.com/a/7478827/997339
			this.metersPerLat = 111319.49;

			this.tileSize = 256;
			this.tileZoom = 15;

			this.projection = this.setProjection(options.center);

			// Center of view
			this.center = options.center || [0, 0];
			this.centerPixels = this.projection(this.center);
			this.bounds = this.getBounds(this.center);

			this.pixelsPerMeter = this.setPixelsPerMeter();

			this.subscribe("targetPositionChanged", this.onTargetChanged);
		};

		Geo.prototype.setProjection = function(coords) {
			return d3.geo.mercator()
				.center(coords) // Geographic coordinates of map centre
				.translate([0, 0]) // Pixel coordinates of .center()
				// Scale is the pixel width of the entire world when projected using the mercator projection.
				// So, if your json data had outlines for the whole world – spanning from lat/lng -180,90 to 
				// latLng 180,-90 – and if someScale was 1024, then the world would be drawn such that it exactly 
				// fits within a 1024x1024-pixel square.
				// http://stackoverflow.com/a/13277197/997339
				//.scale(256 * Math.pow(2, 14)); // Map width = tileSize * Math.pow(2, zoom)
				// Bitwise method
				// "Bitwise shifting any number x to the left by y bits yields x * 2^y."
				// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#<<_(Left_shift)
				// Map width (scale) = tilesize << zoom
				.scale(this.tileSize << this.tileZoom);
		};

		// TODO: Stop using London as a base for this
		// Pixel-per-meter: http://wiki.openstreetmap.org/wiki/Zoom_levels
		Geo.prototype.setPixelsPerMeter = function() {
			var pixelsPerLat = this.projection([0, 50])[1] - this.projection([0, 51])[1];
			// var pixelsPerLat = 6378137 * Math.cos(this.center[1])/Math.pow((this.tileZoom + 8), 2);
			return pixelsPerLat / this.metersPerLat;
		};

		// Return geographic boundary around given coordindate
		Geo.prototype.getBounds = function(coords, distance) {
			// Distance in degrees to calculate bounds from center
			// Default is around 1km each direction
			var distanceLat = distance || 0.009;
			var distanceLon = distanceLat * 2;

			var bounds = {
				n: this.decimalPlaces(coords[1] + distanceLat),
				e: this.decimalPlaces(coords[0] + distanceLon),
				s: this.decimalPlaces(coords[1] - distanceLat),
				w: this.decimalPlaces(coords[0] - distanceLat)
			};

			return bounds;
		};

		Geo.prototype.onTargetChanged = function(pos3d) {
			this.centerPixels = [pos3d.x, pos3d.z];
			this.center = this.projection.invert(this.centerPixels);
			this.bounds = this.getBounds(this.center);

			this.publish("centerPositionChanged", this.centerPixels, this.center, this.bounds);
		};

		Geo.prototype.decimalPlaces = function(num, places) {
			places = places || 5;
			return parseFloat(num).toFixed(places);
		};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Geo",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function( options ) {
				if ( instance  ===  undefined )  {
					instance = new Geo( options );
				}

				return instance;
			}
		};

		return _static;
	}());
}());