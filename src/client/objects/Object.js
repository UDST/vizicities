/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Object = function() {
		_.extend(this, VIZI.Mediator);

		this.geo = VIZI.Geo.getInstance();
		this.object = undefined;
	};

	VIZI.Object.prototype.createObject = function() {};
}());