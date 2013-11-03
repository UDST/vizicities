/* globals window, _, VIZI, Q */
(function() {
	"use strict";

	VIZI.Loading = function() {
		VIZI.Log("Initialising loading UI");

		_.extend(this, VIZI.Mediator);

		this.domContainer = undefined;
		this.domTimer = undefined;
	};

	VIZI.Loading.prototype.init = function() {
		var deferred = Q.defer();

		this.domContainer = this.createDOMContainer();
		this.domTimer = this.createDOMTimer();

		this.subscribe("loadingComplete", this.remove);

		deferred.resolve();

		return deferred.promise;
	};

	VIZI.Loading.prototype.createDOMContainer = function() {
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

		document.body.appendChild(container);

		return container;
	};

	// Eventually use a nice animated spinning 3D city loading thing
	// Or CSS loading bars, like:
	// http://codepen.io/collection/HtAne
	// http://codepen.io/SLembas/pen/kotcg
	VIZI.Loading.prototype.createDOMTimer = function() {
		VIZI.Log("Creating loading UI timer DOM");

		var timerContainerDOM = document.createElement("div");
		timerContainerDOM.classList.add("timer-container");

		var timerDOM = document.createElement("div");
		timerDOM.classList.add("timer");

		var handDOM = document.createElement("div");
		handDOM.classList.add("hand");

		timerDOM.appendChild(handDOM);
		timerContainerDOM.appendChild(timerDOM);
		this.domContainer.appendChild(timerContainerDOM);
	};

	VIZI.Loading.prototype.remove = function() {
		var self = this;

		self.domContainer.classList.add("inactive");

		setTimeout(function() {
			VIZI.Log("Removing loading UI DOM container");
			document.body.removeChild(self.domContainer);
		}, 2000);
	};
}());