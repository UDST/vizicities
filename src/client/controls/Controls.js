/* globals window, _, Q, VIZI */
(function() {
	"use strict";

	VIZI.Controls = (function() {
		var Controls = function() {
			VIZI.Log("Inititialising controls");

			_.extend(this, VIZI.Mediator);

			this.enabled = undefined;

			this.mouse = undefined;
			this.keyboard = undefined;
		};

		Controls.prototype.init = function(domElement, camera, options) {
			if (options.enable) {
				this.mouse = VIZI.Mouse.getInstance(domElement, camera);
				this.keyboard = VIZI.Keyboard.getInstance(domElement);

				this.subscribe("update", this.onUpdate);
				this.subscribe("orbitControlCap", this.orbitCapReset);
			}
			this.enabled = options.enable;

			return Q.fcall(function() {});
		};

		Controls.prototype.onUpdate = function() {
			var mouseState = this.mouse.state;
			var keyboardState = this.keyboard.state;

			// Zoom
			if (mouseState.wheelDelta !== 0) {
				this.publish("zoomControl", -1 * mouseState.wheelDelta);
			}

			// Pan
			if (mouseState.buttons.left && !keyboardState.keys.shift) {
				this.publish("panControl", mouseState.pos3dDelta);
			}

			// Orbit
			if ((mouseState.buttons.left && keyboardState.keys.shift) || mouseState.buttons.middle) {
				this.publish("orbitControl", mouseState.downPos2dDelta, mouseState.camera.startTheta, mouseState.camera.startPhi);
			}

			// Zero deltas
			this.mouse.resetDelta();
		};

		Controls.prototype.orbitCapReset = function() {
			this.mouse.updateCamera();
		};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Controls",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function() {
				if ( instance  ===  undefined )  {
					instance = new Controls();
				}

				return instance;
			}
		};

		return _static;
	}());
}());