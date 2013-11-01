/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.DOMEvents = function() {
		VIZI.Log("Inititialising DOM events");

		_.extend(this, VIZI.Mediator);

		var self = this;

		// Window resize
		window.addEventListener( "resize", function(event) {
			self.publish("resize", event);
		}, false );

		// Keyboard

		// Mouse
	};
}());