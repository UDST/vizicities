/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Camera = function(pos, capZoom, capOrbit) {
		VIZI.Log("Inititialising WebGL camera");

		_.extend(this, VIZI.Mediator);

		this.cameraRadius = 1500;
		this.theta = 45; // Horizontal orbit
		this.phi = 80; // Vertical oribt

		this.capZoom = (capZoom === false) ? false : true;
		this.capOrbit = (capOrbit === false) ? false : true;

		this.target = new THREE.Object3D();
		this.updateTargetPositon(pos);

		this.camera = this.createCamera();
		this.lookAtTarget();

		this.publish("addToScene", this.camera);
		this.publish("addToDat", this, {name: "Camera", properties: ["cameraRadius", "theta", "phi"]});

		this.subscribe("resize", this.resize);
		this.subscribe("zoomControl", this.zoom);
		this.subscribe("panControl", this.pan);
		this.subscribe("orbitControl", this.orbit);
	};

	VIZI.Camera.prototype.createCamera = function() {
		VIZI.Log("Creating WebGL camera");

		var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 2, 40000 );
		this.updatePosition(camera);

		return camera;
	};

	// TODO: Why is a camera object being passed in?
	VIZI.Camera.prototype.updatePosition = function(camera) {
		camera = (camera) ? camera : this.camera;
		camera.position.x = this.target.position.x + this.cameraRadius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		camera.position.y = this.target.position.y + this.cameraRadius * Math.sin( this.phi * Math.PI / 360 );
		camera.position.z = this.target.position.z + this.cameraRadius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		camera.updateMatrix();

		this.publish("targetPositionChanged", this.target.position);
	};

	VIZI.Camera.prototype.updateTargetPositon = function(pos) {
		this.target.position.x = pos[0];
		this.target.position.z = pos[1];
	};

	VIZI.Camera.prototype.lookAtTarget = function() {
		this.camera.lookAt(this.target.position);
	};

	VIZI.Camera.prototype.resize = function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	};

	VIZI.Camera.prototype.zoom = function(delta) {
		var oldcameraRadius = this.cameraRadius;

		this.cameraRadius += delta;

		var cameraRadiusDiff = this.cameraRadius - oldcameraRadius;

		if (this.capZoom) {
		// Cap zoom to bounds
			var zoomCapLow = 250;
			if (this.cameraRadius < zoomCapLow) {
				this.cameraRadius = zoomCapLow;
				cameraRadiusDiff = zoomCapLow - oldcameraRadius;
			}

			var zoomCapHigh = 2000;
			if (this.cameraRadius > zoomCapHigh) {
				this.cameraRadius = zoomCapHigh;
				cameraRadiusDiff = zoomCapHigh - oldcameraRadius;
			}
		}
		
		this.camera.translateZ( cameraRadiusDiff );

		this.updatePosition();

		this.publish("render");
	};

	VIZI.Camera.prototype.pan = function(delta3d) {
		this.target.position.x += delta3d.x;
		this.target.position.z += delta3d.z;

		this.updatePosition();

		// Forced render prevents annoying glitch when panning
		// TODO: Stop this causing twice as many frames being rendered while panning
		// - Perhaps aspects of .render() can be performed without updating the display
		// - https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js#L3199
		// TODO: If unavoidable, think about ways to reduce the performance impact of double-rendering
		// - Removing post-processing during pan
		// - Lowering quality / upscaling during pan
		// - Enabling lower LOD during pan
		// - Removing high-detailed objects during pan (buildings)
		// - Pausing animations during pan (AI, live data, etc)
		this.publish("render");
	};

	VIZI.Camera.prototype.orbit = function(delta2d, theta, phi) {
		// Round delta to next highest pixel to prevent jerkiness
		this.theta = - ( delta2d.x * 0.5 ) + theta;
		this.phi = ( delta2d.y * 0.5 ) + phi;

		if (this.capOrbit) {
			// Cap orbit to bounds
			this.phi = Math.min( 175, Math.max( 65, this.phi ) );

			// Let controls know that the cap has been hit
			if (this.phi === 175 || this.phi === 65) {
				this.publish("orbitControlCap");
			}
		}

		this.updatePosition();
		this.lookAtTarget();

		this.publish("render");
	};

	VIZI.Camera.prototype.datChange = function() {
		this.updatePosition();
		this.lookAtTarget();
	};
}());