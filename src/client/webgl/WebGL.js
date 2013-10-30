/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.WebGL = function() {
		VIZI.Log("Inititialising WebGL");

		this.domContainer = this.createDOMContainer();
		this.scene = new VIZI.Scene();
		this.camera = new VIZI.Camera();
		this.lights = undefined;
	};

	VIZI.WebGL.prototype.createDOMContainer = function() {
		VIZI.Log("Creating WebGL DOM container");

		var container = document.createElement("div");
		container.id = "webgl-container";

		document.body.appendChild(container);

		return container;
	};
}());