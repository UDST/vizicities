/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Object = function() {
		_.extend(this, VIZI.Mediator);
	};

	VIZI.Object.prototype.createObject = function() {};
}());