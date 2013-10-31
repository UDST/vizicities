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
}());