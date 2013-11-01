/* globals window, _, VIZI, FPSMeter */
(function() {
	"use strict";

	VIZI.FPS = function() {
		VIZI.Log("Inititialising FPS meter");

		_.extend(this, VIZI.Mediator);

		this.domContainer = this.createDOMContainer();
		this.meters = {};

		this.subscribe("fpsTickStart", this.tickStart);
		this.subscribe("fpsTickEnd", this.tickEnd);
	};

	VIZI.FPS.prototype.createDOMContainer = function() {
		VIZI.Log("Creating FPS meter DOM container");

		var container = document.createElement("div");
		container.id = "fps-container";
		container.style.position = "absolute";
		container.style.left = 0;
		container.style.top = 0;

		document.body.appendChild(container);

		return container;
	};

	VIZI.FPS.prototype.createDOMElement = function(name) {
		VIZI.Log("Creating FPS meter DOM element");

		var element = document.createElement("div");
		element.style.float = "left";

		var title = document.createElement("p");

		// Style copied from FPSMeter
		title.style.color = "#999";
		title.style.fontFamily = "sans-serif";
		title.style.fontSize = "10px";
		title.style.fontWeight = "bold";
		title.style.margin = "5px 5px 0 5px";
		title.style.textAlign = "left";
		title.style.textTransform = "uppercase";
		
		title.innerHTML = name;

		element.appendChild(title);

		this.domContainer.appendChild(element);

		return element;
	};

	VIZI.FPS.prototype.createMeter = function(name) {
		VIZI.Log("Creating FPS meter: " + name);

		var domElement = this.createDOMElement(name);

		var meter = new FPSMeter(domElement, {
			theme: "colorful",
			decimals: 0,
			heat: 1,
			graph: 1,
			history: 20,
			position: "relative",
			left: 0,
			top: 0,
			margin: "5px 0 5px 5px"
		});

		this.meters[name] = meter;

		return meter;
	};

	VIZI.FPS.prototype.tickStart = function(name) {
		var meter = (this.meters[name]) ? this.meters[name] : this.createMeter(name);
		meter.tickStart();
	};

	VIZI.FPS.prototype.tickEnd = function(name) {
		var meter = (this.meters[name]) ? this.meters[name] : this.createMeter(name);
		meter.tick();
	};
}());