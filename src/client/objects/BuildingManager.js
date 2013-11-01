/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.BuildingManager = function() {
		VIZI.Log("Inititialising building manager");

		VIZI.ObjectManager.call(this);
	};

	VIZI.BuildingManager.prototype = Object.create( VIZI.ObjectManager.prototype );

	VIZI.BuildingManager.prototype.process = function(data) {
		VIZI.Log("Processing buildings");
		
		var features = data.features;
		var objects = _.map(features, this.processFeature);

		this.combinedObjects = this.combineObjects(objects);

		this.publish("addToScene", this.combinedObjects);
	};

	VIZI.BuildingManager.prototype.processFeature = function(feature) {
		switch (feature.type) {
			case "Feature":
				return new VIZI.Building(feature);
			default:
				VIZI.Log("Unable to process building of type: " + feature.type);
				return;
		}
	};
}());