/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Building = function(feature) {
		VIZI.Log("Inititialising building object");

		VIZI.Object.call(this);

		this.materials = [
			new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors})
		];

		this.object = this.createObject(feature);
	};

	VIZI.Building.prototype = Object.create( VIZI.Object.prototype );

	// TODO: Handle multi-polygons
	VIZI.Building.prototype.createObject = function(feature) {
		var properties = feature.properties;

		var area = properties.area;

		// Skip if building area is too small
		if (area < 200) {
			return;
		}

		var colour = new THREE.Color(0xcccccc);
		
		var coords = feature.geometry.coordinates[0];
		var shape = this.createShapeFromCoords(coords);

		var height = 10 * this.geo.pixelsPerMeter;

		var extrudeSettings = { amount: height, bevelEnabled: false };
		var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

		VIZI.applyVertexColors( geom, colour );
		
		// Move geom to 0,0 and return offset
		// var offset = THREE.GeometryUtils.center( geom );

		geom.computeFaceNormals();
		var mesh = new THREE.Mesh(geom, this.materials[0]);

		mesh.position.y = height;

		// Flip buildings as they are up-side down
		mesh.rotation.x = 90 * Math.PI / 180;

		return mesh;
	};
}());