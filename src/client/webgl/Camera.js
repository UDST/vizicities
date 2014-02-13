/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Camera = function(pos) {
		VIZI.Log("Inititialising WebGL camera");

		_.extend(this, VIZI.Mediator);

		this.cameraRadius = 4100;
		this.theta = 45; // Horizontal orbit
		this.phi = 80; // Vertical oribt

		this.target = new THREE.Object3D();
		this.updateTargetPositon(pos);

		this.camera = this.createCamera();
		this.lookAtTarget();

		this.publish("addToScene", this.camera);
		this.publish("addToDat", this, {name: "Camera", properties: ["cameraRadius", "theta", "phi"]});

		this.subscribe("resize", this.resize);
		this.subscribe("zoomControl", this.zoom);
		this.subscribe("panControl", this.pan);
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
		this.cameraRadius += delta;

		// Cap zoom to bounds
		this.cameraRadius = Math.max(Math.min(this.cameraRadius, 5000), 1000);

		this.updatePosition();
	};

	VIZI.Camera.prototype.pan = function(delta3d) {
		// TODO: Remove if it looks like this isn't breaking anything
		// this.camera.position.x += delta3d.x;
		// this.camera.position.z += delta3d.z;
		// this.camera.updateMatrix();

		this.target.position.x += delta3d.x;
		this.target.position.z += delta3d.z;

		this.updatePosition();

		// Forced render prevents annoying glitch when panning
		// TODO: Stop this causing twice as many frames being rendered while panning
		this.publish("render");
	};

	VIZI.Camera.prototype.datChange = function() {
		this.updatePosition();
		this.lookAtTarget();
	};
}());