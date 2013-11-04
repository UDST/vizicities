/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.DOMEvents = function() {
		VIZI.Log("Inititialising DOM events");

		_.extend(this, VIZI.Mediator);
	};

	VIZI.DOMEvents.prototype.init = function() {
		var self = this;
		
		// Window resize
		window.addEventListener( "resize", function(event) {
			self.publish("resize", event);
		}, false );

		// Keyboard

		// Mouse

		return Q.fcall(function() {});
	};
}());