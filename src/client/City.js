/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.City = function() {
		VIZI.Log("Inititialising city");

		_.extend(this, VIZI.Mediator);
			
		// Set up basic WebGL components (scene, camera, lights, renderer)
		this.webgl = new VIZI.WebGL();

		// Set up core city-scene objects (floor, skybox, etc)
		this.floor = new VIZI.Floor();

		// References to standard city features
		this.buildings = undefined;

		// Set up and start application loop
		this.loop = new VIZI.Loop();
	};

	VIZI.City.prototype.loadBuildings = function(url) {
		VIZI.Log("Loading buildings");

		var buildingManager = new VIZI.BuildingManager();
		buildingManager.load(url).then(console.log, console.error).done();
	};
}());