/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Object = function() {
		_.extend(this, VIZI.Mediator);

		this.geo = VIZI.Geo.getInstance();
		this.object = undefined;
	};

	VIZI.Object.prototype.createObject = function() {};

	VIZI.Object.prototype.createShapeFromCoords = function(coords) {
		var self = this;
		var shape = new THREE.Shape();

		_.each(coords, function(element, index) {
			var projectedCoords = self.geo.projection(element);

			// Move if first coordinate
			if (index === 0) {
				shape.moveTo( projectedCoords[0], projectedCoords[1] );
			} else {
				shape.lineTo( projectedCoords[0], projectedCoords[1] );
			}
		});

		return shape;
	};
}());