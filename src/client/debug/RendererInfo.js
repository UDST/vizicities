/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.RendererInfo = function() {
		VIZI.Log("Inititialising renderer info");

		_.extend(this, VIZI.Mediator);

		this.domContainer = this.createDOMContainer();
		this.domRender = this.createDOMElement();
		this.domMemory = this.createDOMElement();

		this.subscribe("updateRendererInfo", this.update);
	};

	VIZI.RendererInfo.prototype.createDOMContainer = function() {
		VIZI.Log("Creating renderer info DOM container");

		var container = document.createElement("div");
		container.id = "renderer-info-container";
		container.style.position = "absolute";
		container.style.left = 0;
		container.style.bottom = 0;

		document.body.appendChild(container);

		return container;
	};

	VIZI.RendererInfo.prototype.createDOMElement = function() {
		VIZI.Log("Creating renderer info DOM element");

		var element = document.createElement("div");
		element.style.float = "left";
		element.style.color = "#999";
		element.style.fontFamily = "sans-serif";
		element.style.fontSize = "10px";
		element.style.fontWeight = "bold";
		element.style.lineHeight = "1.2em";
		element.style.margin = "5px";
		element.style.textAlign = "left";
		element.style.textTransform = "uppercase";
		element.style.width = "100px";

		this.domContainer.appendChild(element);

		return element;
	};

	VIZI.RendererInfo.prototype.createInfoStrings = function(info) {
		var memoryString = "";
		memoryString += "Programs: " + info.memory.programs + "<br>";
		memoryString += "Geometries: " + info.memory.geometries + "<br>";
		memoryString += "Textures: " + info.memory.textures + "<br>";

		var renderString = "";
		renderString += "Calls: " + info.render.calls + "<br>";
		renderString += "Vertices: " + info.render.vertices + "<br>";
		renderString += "Faces: " + info.render.faces + "<br>";
		renderString += "Points: " + info.render.points + "<br>";

		return [renderString, memoryString];
	};

	VIZI.RendererInfo.prototype.update = function(info) {
		var infoStrings = this.createInfoStrings(info);
		this.domRender.innerHTML = infoStrings[0];
		this.domMemory.innerHTML = infoStrings[1];
	};
}());