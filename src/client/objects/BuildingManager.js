/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.BuildingManager = function() {
		VIZI.Log("Inititialising building manager");

		VIZI.ObjectManager.call(this);
	};

	VIZI.BuildingManager.prototype = Object.create( VIZI.ObjectManager.prototype );

	VIZI.BuildingManager.prototype.processFeature = function(feature) {
		switch (feature.type) {
			case "Feature":
				return new VIZI.Building(feature);
			default:
				VIZI.Log("Unable to process building of type: " + feature.type);
				return;
		}
	};

	VIZI.BuildingManager.prototype.debugTimes = function() {
		var self = this;
		
		var totals = {};
		_.each(self.objects, function(object) {
			_.each(object.debugTimes, function(time, key) {
				if (!totals[key]) {
					totals[key] = 0;
				}

				totals[key] += time;
				// _.each(item, function(time) {
				// 	total += time;
				// });
				// VIZI.Log(key + ": " + total/_.size(item));
			});
		});

		var averages = {};
		_.each(totals, function(total, key) {
			averages[key] = total / _.size(self.objects);
		});

		VIZI.Log({totals: totals, averages: averages});
	};
}());