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

		//set up variables for oculus rendering
		this.viewAngle = 0;
		this.bodyAxis = new THREE.Vector3(0, 1, 0);
		this.bodyAngle = 0;

		this.publish("addToScene", this.camera);
		this.publish("addToDat", this, {name: "Camera", properties: ["cameraRadius", "theta", "phi"]});

		this.subscribe("resize", this.resize);
		this.subscribe("zoomControl", this.zoom);
		this.subscribe("panControl", this.pan);
		this.subscribe("orbitControl", this.orbit);
		if(VIZI.ENABLE_OCULUS)
		{
			this.subscribe("oculusControl", this.oculus);
			this.subscribe("firstPersonControl", this.firstPerson);
		}
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
			//if the oculus is enabled allow users to zoom in to street level
			if(VIZI.ENABLE_OCULUS){
				zoomCapLow = 10;
			}

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

	VIZI.Camera.prototype.oculus = function(quatValues) {
		// make a quaternion for the the body angle rotated about the Y axis.
		var quat = new THREE.Quaternion();
		quat.setFromAxisAngle(this.bodyAxis, this.bodyAngle);

		// make a quaternion for the current orientation of the Rift
		var quatCam = new THREE.Quaternion(quatValues.x, quatValues.y, quatValues.z, quatValues.w);

		// multiply the body rotation by the Rift rotation.
		quat.multiply(quatCam);

		// Make a vector pointing along the Z axis and rotate it accoring to the combined look/body angle.
		var xzVector = new THREE.Vector3(0, 0, 1);
		xzVector.applyQuaternion(quat);

		// Compute the X/Z angle based on the combined look/body angle.  This will be used for FPS style movement controls
		// so you can steer with a combination of the keyboard and by moving your head.
		this.viewAngle = Math.atan2(xzVector.z, xzVector.x) + Math.PI;

		// Apply the combined look/body angle to the camera.
		this.camera.quaternion.copy(quat);

		//this.updatePosition();
		//this.lookAtTarget();

		this.publish("render");
	};

	VIZI.Camera.prototype.firstPerson = function(keys) {
		//movement step
		var step = 10;

		//move in the requested direction(s), base movement on view angle
		if(keys.up){
			this.target.position.x += Math.cos(this.viewAngle) * step;
			this.target.position.z += Math.sin(this.viewAngle) * step;
		}

		if(keys.down){
			this.target.position.x -= Math.cos(this.viewAngle) * step;
			this.target.position.z -= Math.sin(this.viewAngle) * step;
		}

		if(keys.left){
			this.target.position.x -= Math.cos(this.viewAngle + Math.PI/2) * step;
      this.target.position.z -= Math.sin(this.viewAngle + Math.PI/2) * step;
		}

		if(keys.right){
			this.target.position.x += Math.cos(this.viewAngle + Math.PI/2) * step;
      this.target.position.z += Math.sin(this.viewAngle + Math.PI/2) * step;
		}

		this.updatePosition();
		this.publish("render");
	};

	VIZI.Camera.prototype.datChange = function() {
		this.updatePosition();
		this.lookAtTarget();
	};
}());
