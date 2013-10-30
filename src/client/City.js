/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.City = function() {
		VIZI.Log("Inititialising city");

		this.loop = new VIZI.Loop();
		this.webgl = new VIZI.WebGL();
	};
}());