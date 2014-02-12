/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	// TODO: Work out if a DOMEvents class is needed
	// - What else would go in here aside from resize?
	// - Would resize be better suited elsewhere (like mouse and keyboard controls)?
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

		return Q.fcall(function() {});
	};
}());