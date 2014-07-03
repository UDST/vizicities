/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.Loading = function() {
		VIZI.Log("Initialising loading UI");

		_.extend(this, VIZI.Mediator);

		this.domContainer = undefined;
		this.domTimer = undefined;
		this.domIndicator = undefined;
	};

	VIZI.Loading.prototype.init = function(domElement) {
		this.domContainer = this.createDOMContainer(domElement);
		this.domTimer = this.createDOMTimer();
		this.domIndicator = this.createDOMIndicator();

		this.subscribe("loadingProgress", this.progress);
		this.subscribe("loadingComplete", function() {
			this.remove(domElement);
		});

		return Q.fcall(function() {});
	};

	VIZI.Loading.prototype.createDOMContainer = function(domElement) {
		VIZI.Log("Creating loading UI DOM container");

		var container = document.createElement("div");
		container.id = "ui-loading-container";

		container.style.background = "#666";
		container.style.left = 0;
		container.style.height = "100%";
		container.style.position = "absolute";
		container.style.top = 0;
		container.style.width = "100%";
		container.style.zIndex = 9999;

		domElement.appendChild(container);

		return container;
	};

	// Eventually use a nice animated spinning 3D city loading thing
	// Or CSS loading bars, like:
	// http://codepen.io/collection/HtAne
	// http://codepen.io/SLembas/pen/kotcg
	VIZI.Loading.prototype.createDOMTimer = function() {
		VIZI.Log("Creating loading UI timer DOM");

		var timerContainerDOM = document.createElement("div");
		timerContainerDOM.classList.add("ui-loading-timer-container");

		var timerDOM = document.createElement("div");
		timerDOM.classList.add("ui-loading-timer");

		var handDOM = document.createElement("div");
		handDOM.classList.add("ui-loading-hand");

		timerDOM.appendChild(handDOM);
		timerContainerDOM.appendChild(timerDOM);
		this.domContainer.appendChild(timerContainerDOM);

		return timerContainerDOM;
	};

	VIZI.Loading.prototype.createDOMIndicator = function() {
		VIZI.Log("Creating loading UI indicator DOM");

		var indicatorContainerDOM = document.createElement("div");
		indicatorContainerDOM.classList.add("ui-loading-indicator-container");

		var indicatorBarDOM = document.createElement("div");
		indicatorBarDOM.classList.add("ui-loading-indicator-bar");

		indicatorContainerDOM.appendChild(indicatorBarDOM);
		this.domContainer.appendChild(indicatorContainerDOM);

		return indicatorBarDOM;
	};

	VIZI.Loading.prototype.progress = function(fraction) {
		var position = (-100 + (100 * fraction)) + "%";

		this.domIndicator.style.WebkitTransform = "translate3d(" + position + ", 0, 0)";
		this.domIndicator.style.MozTransform = "translate3d(" + position + ", 0, 0)";
		this.domIndicator.style.transform = "translate3d(" + position + ", 0, 0)";
	};

	VIZI.Loading.prototype.remove = function(domElement) {
		var self = this;

		setTimeout(function() {
			self.domContainer.classList.add("inactive");
		}, 800);

		setTimeout(function() {
			VIZI.Log("Removing loading UI DOM container");
			domElement.removeChild(self.domContainer);
		}, 2000);
	};
}());