/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.Loop = function() {
		VIZI.Log("Inititialising application loop");

		_.extend(this, VIZI.Mediator);

		// High resolution time
		this.startTime = 0;
		this.lastTickTime = 0;

		this.stopLoop = false;

		this.publish("addToDat", this, {name: "Loop", properties: ["start", "stop"]});

		this.start();
	};

	VIZI.Loop.prototype.start = function() {
		VIZI.Log("Starting application loop");
		this.stopLoop = false;
		this.startTime = (window.performance && window.performance.now) ? (window.performance.now() + window.performance.timing.navigationStart) : Date.now();
		this.tick();
	};

	VIZI.Loop.prototype.stop = function() {
		VIZI.Log("Stopping application loop");
		this.stopLoop = true;
	};

	VIZI.Loop.prototype.tick = function(timestamp) {
		this.publish("fpsTickStart", "Main Loop");

		var delta = timestamp - this.lastTickTime;

		// if (timestamp < 1e12){
		// // .. high resolution timer
		// } else {
		// // integer milliseconds since unix epoch
		// }
		
		this.publish("update", delta);
		this.publish("render", delta);

		this.lastTickTime = timestamp;

		if (!this.stopLoop) {
			// Should probably be a bit more obvious that this comes from Three.js
			// http://stackoverflow.com/questions/6065169/requestanimationframe-with-this-keyword
			window.requestAnimationFrame( this.tick.bind(this) );
		}

		this.publish("fpsTickEnd", "Main Loop");
	};
}());