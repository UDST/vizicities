/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Scene = function() {
		VIZI.Log("Inititialising WebGL scene");

		_.extend(this, VIZI.Mediator);

		this.scene = this.createScene();
		this.objects = [];

		// Listeners
		this.subscribe("addToScene", function(object) {
			VIZI.Log("Scene add object handler");
			VIZI.Log(object);
			this.addToScene(object);
		});

		this.subscribe("removeFromScene", function(object) {
			VIZI.Log("Scene remove object handler");
			VIZI.Log(object);
			this.removeFromScene(object);
		});
	};

	VIZI.Scene.prototype.createScene = function() {
		VIZI.Log("Creating WebGL scene");

		var scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xffffff, 1, 40000);

		return scene;
	};

	VIZI.Scene.prototype.addToScene = function(object) {
		this.scene.add(object);
		this.objects.push(object);
	};

	VIZI.Scene.prototype.removeFromScene = function(object) {
		this.scene.remove(object);

		// Clean up
		// http://mrdoob.github.io/three.js/examples/webgl_test_memory.html
		if (object.geometry) {
			object.geometry.dispose();
		}

		if (object.material) {
			object.material.dispose();
		}

		if (object.texture) {
			object.texture.dispose();
		}

		// Remove object from objects array
		var index = _.indexOf(this.objects, object);
		if (index > -1) {
			this.objects.splice(index, 1);
		}
	};
}());