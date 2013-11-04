/* globals window, _, VIZI, dat */
(function() {
	"use strict";

	VIZI.Dat = function() {
		VIZI.Log("Inititialising dat.GUI");

		_.extend(this, VIZI.Mediator);

		this.gui = this.createGUI();

		this.subscribe("addToDat", this.addToDat);
	};

	VIZI.Dat.prototype.createGUI = function() {
		VIZI.Log("Creating dat.GUI");
		var gui = new dat.GUI();
		return gui;
	};

	VIZI.Dat.prototype.addToDat = function(object, options) {
		VIZI.Log("Adding " + options.name + " to dat.GUI");

		// Create folder
		var folder = this.gui.addFolder(options.name);

		_.each(options.properties, function(property) {
			var controller = folder.add(object, property).listen();

			if (object.datChange) {
				controller.onChange(function() {
					object.datChange();
				});
			}
		});
	};
}());