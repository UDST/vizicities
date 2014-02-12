/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Camera = function(pos) {
		VIZI.Log("Inititialising WebGL camera");

		_.extend(this, VIZI.Mediator);

		this.cameraRadius = 4100;
		this.theta = 45; // Horizontal orbit
		this.onMouseDownTheta = 45;
		this.phi = 80; // Vertical oribt
		this.onMouseDownPhi = 80;	

		this.target = new THREE.Object3D();
		this.updateTargetPositon(pos);

		this.camera = this.createCamera();
		this.update();

		this.publish("addToScene", this.camera);
		this.publish("addToDat", this, {name: "Camera", properties: ["cameraRadius", "theta", "phi"]});

		this.subscribe("resize", this.resize);
		this.subscribe("zoomControl", this.zoom);

		this.subscribe("update", this.update);
	};

	VIZI.Camera.prototype.createCamera = function() {
		VIZI.Log("Creating WebGL camera");

		var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 2, 40000 );
		return camera;
	};

	// TODO: Why is a camera object being passed in?
	VIZI.Camera.prototype.updatePosition = function() {
		this.camera.position.x = this.target.position.x + this.cameraRadius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		this.camera.position.y = this.target.position.y + this.cameraRadius * Math.sin( this.phi * Math.PI / 360 );
		this.camera.position.z = this.target.position.z + this.cameraRadius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		this.camera.updateMatrix();
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
		this.cameraRadius = Math.max(Math.min(this.cameraRadius, 8000), 1000);
	};

	VIZI.Camera.prototype.update = function() {
		this.updatePosition();
		this.lookAtTarget();
	};

	VIZI.Camera.prototype.datChange = function() {
		this.updatePosition();
		this.lookAtTarget();
	};
}());