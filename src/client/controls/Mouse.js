/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Mouse = (function() {
		var Mouse = function(camera) {
			VIZI.Log("Inititialising mouse manager");

			_.extend(this, VIZI.Mediator);

			// Reference to camera for 3D projection
			this.camera = camera;
			this.projector = new THREE.Projector();

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
				wheelDelta: 0,
				camera: {
					downTheta: this.camera.theta,
					downPhi: this.camera.phi
				}
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

			state.pos2d.x = event.clientX;
			state.pos2d.y = event.clientY;

			state.downPos2d.x = event.clientX;
			state.downPos2d.y = event.clientY;

			var pos3d = this.mouseIn3d(state.downPos2d);

			state.pos3d.x = pos3d.x;
			state.pos3d.y = pos3d.y;
			state.pos3d.z = pos3d.z;

			state.downPos3d.x = pos3d.x;
			state.downPos3d.y = pos3d.y;
			state.downPos3d.z = pos3d.z;

			state.camera.downTheta = this.camera.theta;
			state.camera.downPhi = this.camera.phi;
		};

		Mouse.prototype.onMouseMove = function(event) {
			event.preventDefault();

			var state = this.state;

			state.pos2dDelta.x = event.clientX - state.pos2d.x;
			state.pos2dDelta.y = event.clientY - state.pos2d.y;

			state.pos2d.x = event.clientX;
			state.pos2d.y = event.clientY;

			var pos3d = this.mouseIn3d(state.pos2d);

			state.pos3dDelta.x = state.downPos3d.x - pos3d.x;
			state.pos3dDelta.y = state.downPos3d.y - pos3d.y;
			state.pos3dDelta.z = state.downPos3d.z - pos3d.z;	

			state.pos3d.x = pos3d.x;
			state.pos3d.y = pos3d.y;
			state.pos3d.z = pos3d.z;
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

			// TODO: Reset mouse down positions?
		};

		Mouse.prototype.onMouseWheel = function(event) {
			event.preventDefault();

			var state = this.state;
			
			state.wheelDelta += event.wheelDeltaY;
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

		Mouse.prototype.mouseIn3d = function(pos2d) {
			var camera = this.camera.camera;

			var vector = new THREE.Vector3(
				( pos2d.x / window.innerWidth ) * 2 - 1,
				- ( pos2d.y / window.innerHeight ) * 2 + 1,
				0.5
			);

			this.projector.unprojectVector( vector, camera );

			var dir = vector.sub( camera.position ).normalize();

			var distance = - camera.position.y / dir.y;

			var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

			return pos;
		};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Mouse",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function(camera) {
				if ( instance  ===  undefined )  {
					instance = new Mouse(camera);
				}

				return instance;
			}
		};

		return _static;
	}());
}());