/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Floor = function() {
		VIZI.Log("Inititialising floor object");

		// Extend Object class
		VIZI.Object.call(this);

		this.object = this.createObject();
	};

	VIZI.Floor.prototype.createObject = function() {
		var floorContainer = new THREE.Object3D();

		var floorWireGeom = new THREE.PlaneGeometry(5000, 5000, 200, 200);
		// var floorWireMat = new THREE.MeshBasicMaterial({color: 0xeeeeee, wireframe: true});
		// var floorWire = new THREE.Mesh(floorWireGeom, floorWireMat);
		// floorWire.position.y = -0.3;
		// floorWire.rotation.x = - 90 * Math.PI / 180;

		// floorContainer.add(floorWire);

		var floorGeom = new THREE.PlaneGeometry(60000, 60000, 4, 4);
		var floorMat = new THREE.MeshBasicMaterial({color: 0xffffff});
		var floor = new THREE.Mesh(floorGeom, floorMat);
		floor.position.y = -0.4;
		floor.rotation.x = - 90 * Math.PI / 180;

		floorContainer.add(floor);

		this.publish("addToScene", floorContainer);

		return floorContainer;
	};
}());