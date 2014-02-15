/* globals window, _, VIZI, Q, d3, simplify */
(function() {
	"use strict";

	VIZI.DataOverpass = function() {
		VIZI.Log("Inititialising Overpass API manager");

		VIZI.Data.call(this);

		// TODO: It's entirely possible that these queries are picking up duplicate ways. Need to look into it.
		// TODO: Ways that cross over tile boundaries will likely get picked up by a query for each tile. Look into that.
		// OSM Buildings handles this by not rendering items with an id that it already knows about
		// https://github.com/kekscom/osmbuildings/blob/master/src/Data.js#L59
		// Good Overpass queries: https://raw2.github.com/bigr/map1/master/import_osm.eu1000
		this.queryHigh = "[out:json];" +
			"((" + 
			// "rel({s},{w},{n},{e})[waterway~%22riverbank|dock%22];" +
			// "rel({s},{w},{n},{e})[waterway=%22canal%22][area=%22yes%22];" +
			// "rel({s},{w},{n},{e})[natural~%22water|scrub%22];" +
			// "rel({s},{w},{n},{e})[leisure~%22park|pitch%22];" +
			// "rel({s},{w},{n},{e})[landuse~%22grass|meadow|forest%22];" +
			// ");(._;way(r););(._;node(w););(" +
			"way({s},{w},{n},{e})[%22building%22];" +
			"way({s},{w},{n},{e})[waterway~%22riverbank|dock%22];" +
			"way({s},{w},{n},{e})[waterway=%22canal%22][area=%22yes%22];" +
			"way({s},{w},{n},{e})[natural~%22water|scrub%22];" +
			"way({s},{w},{n},{e})[leisure~%22park|pitch%22];" +
			"way({s},{w},{n},{e})[landuse~%22grass|meadow|forest%22];" +
			");(._;node(w);););out;";

		this.queryLow = "[out:json];" +
			"((" + 
			"rel({s},{w},{n},{e})[waterway~%22riverbank|dock%22];" +
			"rel({s},{w},{n},{e})[waterway=%22canal%22][area=%22yes%22];" +
			"rel({s},{w},{n},{e})[natural~%22water|scrub%22];" +
			"rel({s},{w},{n},{e})[leisure~%22park|pitch%22];" +
			"rel({s},{w},{n},{e})[landuse~%22grass|meadow|forest|commercial|retail|industrial|construction|brownfield%22];" +
			");(._;way(r););(._;node(w););(" +
			"way({s},{w},{n},{e})[waterway~%22riverbank|dock%22];" +
			"way({s},{w},{n},{e})[waterway=%22canal%22][area=%22yes%22];" +
			"way({s},{w},{n},{e})[natural~%22water|scrub%22];" +
			"way({s},{w},{n},{e})[leisure~%22park|pitch%22];" +
			"way({s},{w},{n},{e})[landuse~%22grass|meadow|forest|commercial|retail|industrial|construction|brownfield%22];" +
			");(._;node(w);););out;";

		// URL of data source
		this.urlBase = "http://overpass-api.de/api/interpreter?data=";
		// this.urlBase = "http://overpass.osm.rambler.ru/cgi/interpreter?data=";
		this.urlHigh = this.urlBase + this.queryHigh;
		this.urlLow = this.urlBase + this.queryLow;
	};

	VIZI.DataOverpass.prototype = Object.create( VIZI.Data.prototype );

	VIZI.DataOverpass.prototype.update = function() {
		var self = this;
		var deferred = Q.defer();

		var promiseQueue = [];
		promiseQueue.push(self.updateByLevel(self.grid.boundsHigh, self.urlHigh));
		// TODO: Re-enable low queries when loading performance and optimisation is sorted
		// promiseQueue.push(self.updateByLevel(self.grid.boundsLow, self.urlLow));

		Q.all(promiseQueue).done(function() {
			deferred.resolve();
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	// TODO: Send one big query for bounds and split into tiles on return
	//  - Seems like the sending and receiving of XHR requests are expensive, not the processing
	VIZI.DataOverpass.prototype.updateByLevel = function(bounds, url) {
		var self = this;
		var deferred = Q.defer();

		// TODO: Skip cached tiles
		// TODO: Tiles can have the same way so ignore ways already loaded

		// Load objects using promises
		var promiseQueue = [];

		var tileCount = [bounds.e-bounds.w, bounds.s-bounds.n];
		// Rows
		for (var i = 0; i < tileCount[0]; i++) {
			// Columns
			for (var j = 0; j < tileCount[1]; j++) {
				var tileCoords = [bounds.w + j, bounds.n + i];
				var tileBounds = {
					n: bounds.n + i,
					e: 1 + bounds.w + j,
					s: 1 + bounds.n + i,
					w: bounds.w + j
				};
				
				var tileBoundsLonLat = self.grid.getBoundsLonLat(tileBounds);

				var cacheKey = tileCoords[0] + ":" + tileCoords[1];
				promiseQueue.push(self.load(url, tileBoundsLonLat, cacheKey));
			}
		}

		Q.all(promiseQueue).done(function() {
			deferred.resolve();
		}, function(error) {
			deferred.reject(error);
		});

		// TODO: Add data to cache

		return deferred.promise;
	};

	// Process data (convert from Overpass format to a common ViziCities format)
	// http://wiki.openstreetmap.org/wiki/Talk:Overpass_API/Language_Guide#JSON_Syntax
	VIZI.DataOverpass.prototype.process = function(data) {
		var self = this;

		var nodes = {};
		var ways = [];

		var elements = data.elements;
		_.each(elements, function(element) {
			// Find a way to do this without passing the node and way objects
			switch (element.type) {
				case "node":
					self.processNode(nodes, element);
					break;
				case "way":
					self.processWay(nodes, ways, element);
					break;
			}
		});

		return ways;
	};

	VIZI.DataOverpass.prototype.processNode = function(nodes, element) {
		nodes[element.id] = this.geo.projection([element.lon, element.lat]);
	};

	// TODO: Validate polygon to make sure it's renderable (eg. complete, and no cross-overs)
	// TODO: Use simplify.js to reduce complexity of polygons
	VIZI.DataOverpass.prototype.processWay = function(nodes, ways, element) {
		var self = this;

		var points = element.nodes;
		var pointCount = points.length;

		var tags = element.tags || {};
		
		// Not enough points to make an object
		if (pointCount < 4) {
			return;
		}

		var coordinates = [];
		var dupe = false;
		_.each(points, function(point, index) {
			// Shouldn"t duplicate any points apart from first and last
			if (index < pointCount-1 && self.checkDuplicateCoords(coordinates, nodes[point])) {
				dupe = true;
			}

			coordinates.push(nodes[point]);
		});

		if (dupe) {
			VIZI.Log("Skipping feature as it has duplicate coordinates", element.id, coordinates);
			return;
		}

		// Simplify coordinates
		// TODO: Perform this in the worker thread
		var simplifyTolerance = 3; // Three.js units
		var simplifiedCoords = simplify(coordinates, simplifyTolerance);

		// VIZI.Log("Original coord count:", coordinates.length);
		// VIZI.Log("Simplified coord count:", simplifiedCoords.length);

		// VIZI.Log("Original coord example:", coordinates[0], coordinates[1]);
		// VIZI.Log("Simplified coord example:", simplifiedCoords[0], simplifiedCoords[1]);

		// Not enough points to make an object
		if (simplifiedCoords.length < 4) {
			return;
		}

		tags.height = this.processHeight(tags);
		tags.colour = this.processColour(tags);

		// TODO: Calculate area
		// getGeodesicArea from http://dev.openlayers.org/releases/OpenLayers-2.10/lib/OpenLayers/Geometry/LinearRing.js
		// More info: http://gis.stackexchange.com/a/8496/14967
		// tags.area;

		ways.push({
			id: element.id,
			coordinates: simplifiedCoords,
			properties: tags
		});
	};

	VIZI.DataOverpass.prototype.processHeight = function(tags) {
		// Distance conversion
		// From: https://github.com/kekscom/osmbuildings/blob/master/src/Import.js#L39
		var height;
		var scalingFactor = (tags["building"] === "office") ? 1.45 : 1;
		if (tags.height) {
			height = this.toMeters(tags.height);
		} else if (!height && tags["building:height"]) {
			height = this.toMeters(tags["building:height"]);
		} else if (!height && tags.levels) {
			height = tags.levels * this.METERS_PER_LEVEL * scalingFactor <<0;
		} else if (!height && tags["building:levels"]) {
			height = tags["building:levels"] * this.METERS_PER_LEVEL * scalingFactor <<0;
		} else if (tags["building"]) {
			height = 10 + Math.random() * 10;
		} else if (tags["landuse"] === "forest") {
			height = 6;
		// } else if (tags["waterway"] || tags["natural"] && /water|scrub/.test(tags["natural"]) || tags["leisure"] && /park|pitch/.test(tags["leisure"]) || tags["landuse"] && /grass|meadow|commercial|retail|industrial|brownfield/.test(tags["landuse"])) {
		} else if (tags["waterway"] || tags["natural"] === "water") {
			height = 0.05;
		} else {
			height = 0.1;
		}

		height *= this.geo.pixelsPerMeter;

		return height;
	};

	VIZI.DataOverpass.prototype.processColour = function(tags) {
		var colour;
		if (tags["building"] || tags["building:part"]) {
			colour = 0xEEEEEE;
		} else if (tags["waterway"] || tags["natural"] === "water") {
			colour = 0x6DCCFF;
		} else if (tags["landuse"] === "forest") {
			colour = 0x7ea410;
		} else if (tags["natural"] === "scrub" || tags["leisure"] && /park|pitch/.test(tags["leisure"]) || tags["landuse"] && /grass|meadow/.test(tags["landuse"])) {
			colour = 0xc0da75;
		} else if (tags["landuse"] && /industrial|construction|brownfield/.test(tags["landuse"])) {
			colour = 0xd8c7b5;
		} else if (tags["landuse"] && /commercial|retail/.test(tags["landuse"])) {
			colour = 0xa9bbd6;
		} else {
			VIZI.Log("Setting default colour for feaure", tags);
			colour = 0xFF0000;
		}

		return colour;
	};
}());