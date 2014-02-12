/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Mouse = (function() {
		var Mouse = function() {
			VIZI.Log("Inititialising mouse manager");

			_.extend(this, VIZI.Mediator);

			this.state = {
				buttons: {
					left: false,
					right: false,
					middle: false
				},
				pos2d: new THREE.Vector2(),
				downPos2d: new THREE.Vector2(),
				pos3d: new THREE.Vector3(),
				downPos3d: new THREE.Vector3(),
				pos2dDelta: new THREE.Vector2(),
				pos3dDelta: new THREE.Vector3(),
				wheelDelta: 0
			};

			this.initDOMEvents();
		};

		Mouse.prototype.initDOMEvents = function() {
			var self = this;

			document.addEventListener("mousedown", function(event) {
				self.onMouseDown(event);
			}, false);

			document.addEventListener("mousemove", function(event) {
				self.onMouseMove(event);
			}, false);

			document.addEventListener("mouseup", function(event) {
				self.onMouseUp(event);
			}, false);

			document.addEventListener("mousewheel", function(event) {
				self.onMouseWheel(event);
			}, false);
		};

		Mouse.prototype.onMouseDown = function(event) {
			event.preventDefault();

			var state = this.state;

			if (event.button === 0) {
				state.buttons.left = true;
			}

			if (event.button === 1) {
				state.buttons.middle = true;
			}

			if (event.button === 2) {
				state.buttons.right = true;
			}

			state.downPos2d.x = event.clientX;
			state.downPos2d.y = event.clientY;

			// TODO: Update 3D position

			// this.publish("mouseDown", {pos2d: state.downPos2d});
		};

		Mouse.prototype.onMouseMove = function(event) {
			event.preventDefault();

			var state = this.state;

			state.pos2dDelta.x = event.clientX - state.pos2d.x;
			state.pos2dDelta.y = event.clientY - state.pos2d.y;

			state.pos2d.x = event.clientX;
			state.pos2d.y = event.clientY;

			// TODO: Update 3D position

			// this.publish("mouseMove", {pos2d: state.pos2d, delta: delta});
		};

		Mouse.prototype.onMouseUp = function(event) {
			event.preventDefault();

			var state = this.state;

			if (event.button === 0) {
				state.buttons.left = false;
			}

			if (event.button === 1) {
				state.buttons.middle = false;
			}

			if (event.button === 2) {
				state.buttons.right = false;
			}

			// TODO: Update 3D position

			// this.publish("mouseUp", {pos2d: state.pos2d, delta: delta});
		};

		Mouse.prototype.onMouseWheel = function(event) {
			event.preventDefault();

			var state = this.state;
			
			state.wheelDelta += event.wheelDeltaY;

			// this.publish("mouseWheel", {delta: delta});
		};

		Mouse.prototype.resetDelta = function() {
			var state = this.state;

			state.pos2dDelta.x = 0;
			state.pos2dDelta.y = 0;

			state.pos3dDelta.x = 0;
			state.pos3dDelta.y = 0;
			state.pos3dDelta.z = 0;
			
			state.wheelDelta = 0;
		};

		// TODO: Get working
		Mouse.prototype.mouseIn3D = function(pos2d) {};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Mouse",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function() {
				if ( instance  ===  undefined )  {
					instance = new Mouse();
				}

				return instance;
			}
		};

		return _static;
	}());
}());