/* globals window, _, VIZI, THREE, Q */
(function() {
	"use strict";

	VIZI.ObjectManager = function() {
		_.extend(this, VIZI.Mediator);
	};

	VIZI.ObjectManager.prototype.load = function(url) {
		var deferred = Q.defer();

		// JSON load stuffs

		return deferred.promise;
	};
}());