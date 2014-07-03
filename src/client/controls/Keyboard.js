/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.Keyboard = (function() {
		var Keyboard = function(domElement) {
			VIZI.Log("Inititialising mouse manager");

			_.extend(this, VIZI.Mediator);

			this.state = {
				keys: {}
			};

			this.initDOMEvents(domElement);
		};

		// TODO: Work out if domElement should be used instead of document
		Keyboard.prototype.initDOMEvents = function(domElement) {
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
					key = "shift";
					break;
				case 38:
					key = "up";
					break;
				case 40:
					key = "down";
					break;
				case 37:
					key = "left";
					break;
				case 39:
					key = "right";
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
			getInstance: function(domElement) {
				if ( instance  ===  undefined )  {
					instance = new Keyboard(domElement);
				}

				return instance;
			}
		};

		return _static;
	}());
}());
