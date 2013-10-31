/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.City = function() {
		VIZI.Log("Inititialising city");

		_.extend(this, VIZI.Mediator);
		
		this.webgl = new VIZI.WebGL();
		this.loop = new VIZI.Loop();

		// this.floor = new VIZI.Floor();
		this.createFloor();
	};

	VIZI.City.prototype.createFloor = function() {
		var floorWireGeom = new THREE.PlaneGeometry(5000, 5000, 200, 200);

		var floorWireMat = new THREE.MeshBasicMaterial({color: 0xeeeeee, wireframe: true});
		var floorWire = new THREE.Mesh(floorWireGeom, floorWireMat);
		floorWire.position.y = -0.3;
		floorWire.rotation.x = - 90 * Math.PI / 180;
		this.publish("addToScene", floorWire);

		var floorGeom = new THREE.PlaneGeometry(60000, 60000, 4, 4);

		var floorMat = new THREE.MeshBasicMaterial({color: 0xffffff});
		var floor = new THREE.Mesh(floorGeom, floorMat);
		floor.position.y = -0.4;
		floor.rotation.x = - 90 * Math.PI / 180;
		this.publish("addToScene", floor);
	};
}());