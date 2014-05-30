/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Camera = function(options) {
		VIZI.Log("Inititialising WebGL camera");

		_.extend(this, VIZI.Mediator);

		_.defaults(options, {
			cameraRadius: 1500,
			theta: 45,
			phi: 80,
			cameraFov: 40,
			near: 2,
			far: 40000,
			capZoom: true,
			capOrbit: true,
			zoomCapLow: 250,
			zoomCapHigh: 2000,
			orbitCapLow: 65,
			orbitCapHigh: 175,
			target: [0, 0],
		});

		this.target = new THREE.Object3D();

		this.load(options);

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

		var camera = new THREE.PerspectiveCamera(this.options.cameraFov, window.innerWidth / window.innerHeight, this.options.near, this.options.far);
		this.updatePosition(camera);

		return camera;
	};

	// TODO: Why is a camera object being passed in?
	VIZI.Camera.prototype.updatePosition = function(camera) {
		camera = (camera) ? camera : this.camera;
		camera.position.x = this.target.position.x + this.options.cameraRadius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		camera.position.y = this.target.position.y + this.options.cameraRadius * Math.sin( this.phi * Math.PI / 360 );
		camera.position.z = this.target.position.z + this.options.cameraRadius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
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
		var oldcameraRadius = this.options.cameraRadius;

		this.options.cameraRadius += delta;

		var cameraRadiusDiff = this.options.cameraRadius - oldcameraRadius;

		if (this.options.capZoom) {
		// Cap zoom to bounds
			var zoomCapLow = this.options.zoomCapLow;
			if (this.options.cameraRadius < zoomCapLow) {
				this.options.cameraRadius = zoomCapLow;
				cameraRadiusDiff = zoomCapLow - oldcameraRadius;
			}

			var zoomCapHigh = this.options.zoomCapHigh;
			if (this.options.cameraRadius > zoomCapHigh) {
				this.options.cameraRadius = zoomCapHigh;
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

		if (this.options.capOrbit) {
			// Cap orbit to bounds
			this.phi = Math.min( this.options.orbitCapHigh, Math.max( this.options.orbitCapLow, this.phi ) );

			// Let controls know that the cap has been hit
			if (this.phi === this.options.orbitCapHigh || this.phi === this.options.orbitCapLow) {
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

	VIZI.Camera.prototype.serialize = function() {

		this.options.theta = this.theta;
		this.options.phi = this.phi;
		this.options.target[0] = this.target.position.x;
		this.options.target[1] = this.target.position.z;

		return this.options;
	};

	VIZI.Camera.prototype.load = function(serialized) {
		this.options = serialized;
		this.theta = this.options.theta;
		this.phi = this.options.phi;

		this.updateTargetPositon(this.options.target);
		if (this.camera) {
			this.camera.updateProjectionMatrix();
			this.updatePosition();
		}
	};

}());