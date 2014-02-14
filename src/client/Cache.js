/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.Cache = function() {
		_.extend(this, VIZI.Mediator);

		this.data = {};
	};

	VIZI.Cache.prototype.get = function(key) {
		return this.data[key];
	};
	
	VIZI.Cache.prototype.add = function(key, value) {
		this.data[key] = value;
	};
}());