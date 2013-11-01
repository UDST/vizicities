/* globals window, _, VIZI, d3 */
(function() {
	"use strict";

	VIZI.Geo = (function() {
		var Geo = function(options) {
			this.projection = this.setProjection(options.areaCoords);
			this.pixelsPerMeter = this.setPixelsPerMeter();
		};

		Geo.prototype.setProjection = function(areaCoords) {
			return d3.geo.mercator()
				.center([
					areaCoords.bottomLeft[0] + (areaCoords.topRight[0] - areaCoords.bottomLeft[0]) / 2, 
					areaCoords.bottomLeft[1] + (areaCoords.topRight[1] - areaCoords.bottomLeft[1]) / 2
				]) // Geographic coordinates of map centre
				.translate([0, 0]) // Pixel coordinates of .center()
				.scale(10000000);
		};

		// TODO: Stop using London as a base for this
		Geo.prototype.setPixelsPerMeter = function() {
			var metersPerLat = 111200;
			var pixelsPerLat = this.projection([0, 50])[1] - this.projection([0, 51])[1];
			return pixelsPerLat / metersPerLat;
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