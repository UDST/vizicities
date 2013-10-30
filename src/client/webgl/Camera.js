/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Camera = function() {
		VIZI.Log("Inititialising WebGL camera");

		_.extend(this, VIZI.Mediator);

		this.cameraRadius = 6000;
		this.theta = 45;
		this.onMouseDownTheta = 45;
		this.phi = 60;
		this.onMouseDownPhi = 60;

		this.target = new THREE.Object3D();

		this.camera = this.createCamera();

		this.publish("addToScene", this.camera);
	};

	VIZI.Camera.prototype.createCamera = function() {
		VIZI.Log("Creating WebGL camera");

		var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 2, 40000 );
		camera.position.x = this.cameraRadius * Math.sin( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );
		camera.position.y = this.cameraRadius * Math.sin( this.phi * Math.PI / 360 );
		camera.position.z = this.cameraRadius * Math.cos( this.theta * Math.PI / 360 ) * Math.cos( this.phi * Math.PI / 360 );

		return camera;
	};

	VIZI.Camera.prototype.enableControls = function() {
		this.subscribe("mouseDown", function(event) {
			VIZI.Log("Camera mouse down handler");
		});

		this.subscribe("mouseUp", function(event) {
			VIZI.Log("Camera mouse up handler");
		});

		this.subscribe("mouseMove", function(event) {
			VIZI.Log("Camera mouse move handler");
		});

		this.subscribe("mouseWheel", function(event) {
			VIZI.Log("Camera mouse wheel handler");
		});
	};
}());