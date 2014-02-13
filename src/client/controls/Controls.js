/* globals window, _, Q, VIZI */
(function() {
	"use strict";

	VIZI.Controls = (function() {
		var Controls = function() {
			VIZI.Log("Inititialising controls");

			_.extend(this, VIZI.Mediator);

			this.mouse = undefined;
		};

		Controls.prototype.init = function(camera) {
			this.mouse = VIZI.Mouse.getInstance(camera);

			this.subscribe("update", this.onUpdate);

			return Q.fcall(function() {});
		};

		Controls.prototype.onUpdate = function() {
			var mouseState = this.mouse.state;

			// Zoom
			if (mouseState.wheelDelta !== 0) {
				this.publish("zoomControl", -1 * mouseState.wheelDelta);
			}

			// Pan
			if (mouseState.buttons.left) {
				this.publish("panControl", mouseState.pos3dDelta);
			}

			// Zero deltas
			this.mouse.resetDelta();
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