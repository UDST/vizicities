/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.Keyboard = (function() {
		var Keyboard = function() {
			VIZI.Log("Inititialising mouse manager");

			_.extend(this, VIZI.Mediator);

			this.state = {
				keys: {}
			};

			this.initDOMEvents();
		};

		Keyboard.prototype.initDOMEvents = function() {
			var self = this;

			document.addEventListener("keydown", function(event) {
				self.onKeyDown(event);
			}, false);

			document.addEventListener("keyup", function(event) {
				self.onKeyUp(event);
			}, false);
		};

		Keyboard.prototype.onKeyDown = function(event) {
			var key = this.keyCodeToString(event.keyCode);

			if (!key) {
				return;
			}

			this.state.keys[key] = true;
		};

		Keyboard.prototype.onKeyUp = function(event) {
			var key = this.keyCodeToString(event.keyCode);

			if (!key) {
				return;
			}

			this.state.keys[key] = false;
		};

		Keyboard.prototype.keyCodeToString = function(keyCode) {
			var key;

			switch (keyCode) {
				case 16:
					key = "leftShift";
					break;
				default:
					key = false;
			}

			return key;
		};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Keyboard",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function() {
				if ( instance  ===  undefined )  {
					instance = new Keyboard();
				}

				return instance;
			}
		};

		return _static;
	}());
}());