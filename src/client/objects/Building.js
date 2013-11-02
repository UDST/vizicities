/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Building = function(feature) {
		VIZI.Log("Inititialising building object");

		VIZI.Object.call(this);

		this.debugTimes = {
			"createObject": 0,
			"createShape": 0,
			"extrude": 0,
			"applyVertexColors": 0,
			"createMesh": 0
		};

		this.materials = [
			new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors})
		];

		this.object = this.createObject(feature);
	};

	VIZI.Building.prototype = Object.create( VIZI.Object.prototype );

	// TODO: Handle multi-polygons
	VIZI.Building.prototype.createObject = function(feature) {
		var createObjectTime = Date.now();

		var properties = feature.properties;

		var area = properties.area;

		// Skip if building area is too small
		if (area < 200) {
			return;
		}

		var colour = new THREE.Color(0xcccccc);
		
		var coords = feature.geometry.coordinates[0];

		var createShapeTime = Date.now();
		var shape = this.createShapeFromCoords(coords);
		this.debugTimes.createShape = Date.now() - createShapeTime;

		var height = 10 * this.geo.pixelsPerMeter;

		var extrudeSettings = { amount: height, bevelEnabled: false };

		var extrudeTime = Date.now();
		var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		this.debugTimes.extrude = Date.now() - extrudeTime;

		var applyVertexColorsTime = Date.now();
		VIZI.applyVertexColors( geom, colour );
		this.debugTimes.applyVertexColors = Date.now() - applyVertexColorsTime;
		
		// Move geom to 0,0 and return offset
		// var offset = THREE.GeometryUtils.center( geom );

		geom.computeFaceNormals();

		var createMeshTime = Date.now();
		var mesh = new THREE.Mesh(geom, this.materials[0]);
		this.debugTimes.createMesh = Date.now() - createMeshTime;

		mesh.position.y = height;

		// Flip buildings as they are up-side down
		mesh.rotation.x = 90 * Math.PI / 180;

		this.debugTimes.createObject = Date.now() - createObjectTime;

		return mesh;
	};
}());