/* globals window, _, VIZI, Q, d3, simplify, throat */
(function() {
	"use strict";

	VIZI.DataOverpass = function(options) {
		VIZI.Log("Inititialising Overpass API manager");

		VIZI.Data.call(this);

		_.defaults(options, {
			gridUpdate: true
		});

		this.objectManager = new VIZI.ObjectManagerOverpass();

		// TODO: It's entirely possible that these queries are picking up duplicate ways. Need to look into it.
		// TODO: Ways that cross over tile boundaries will likely get picked up by a query for each tile. Look into that.
		// OSM Buildings handles this by not rendering items with an id that it already knows about
		// https://github.com/kekscom/osmbuildings/blob/master/src/Data.js#L59
		// Good Overpass queries: https://raw2.github.com/bigr/map1/master/import_osm.eu1000
		this.queryHigh = "[out:json];" +
			"((" +
			"rel({s},{w},{n},{e})[%22building%22];" +
			"rel({s},{w},{n},{e})[type=%22building%22];" +
			");(._;way(r););(._;node(w););(" +
			"way({s},{w},{n},{e})[%22building%22];" +
			"way({s},{w},{n},{e})[%22building:part%22];" +
			"way({s},{w},{n},{e})[aeroway~%22aerodrome|runway%22];" +
			"way({s},{w},{n},{e})[waterway~%22riverbank|dock%22];" +
			"way({s},{w},{n},{e})[waterway=%22canal%22][area=%22yes%22];" +
			"way({s},{w},{n},{e})[natural~%22water|scrub%22];" +
			"way({s},{w},{n},{e})[leisure~%22park|pitch%22];" +
			"way({s},{w},{n},{e})[landuse~%22grass|meadow|forest%22];" +
			((VIZI.ENABLE_ROADS) ? "way({s},{w},{n},{e})[highway~%22motorway|trunk|primary|secondary|tertiary|motorway_link|primary_link|secondary_link|tertiary_link|road%22];" : "") +
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
		// this.urlBase = "http://api.openstreetmap.fr/oapi/interpreter?data=";
		this.urlHigh = this.urlBase + this.queryHigh;
		this.urlLow = this.urlBase + this.queryLow;

		if (options.gridUpdate) {
			this.subscribe("gridUpdated", this.update);
		}
	};

	VIZI.DataOverpass.prototype = Object.create( VIZI.Data.prototype );

	VIZI.DataOverpass.prototype.update = function() {
		var self = this;
		var deferred = Q.defer();

		// Clear tiles out of bounds
		self.clearTiles(self.grid.boundsLow);

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

				// Skip tiles already in view
				if (self.objects[cacheKey]) {
					VIZI.Log("Skipping tile already in view", cacheKey);
					continue;
				}

				promiseQueue.push([self.load, [url, tileBoundsLonLat, cacheKey]]);
			}
		}

		// Use throat to limit simultaneous Overpass requests
		// Without limitation the Overpass API will rate-limit
		Q.all(promiseQueue.map(throat(1, function(promiseFunc) {
			return promiseFunc[0].apply(self, promiseFunc[1]);
		}))).done(function() {
			deferred.resolve();
		}, function(error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	// Clear tiles out of bounds
	VIZI.DataOverpass.prototype.clearTiles = function(bounds) {
		var self = this;

		_.each(self.objects, function(mesh, index) {
			// Split index
			var splitIndex = index.split(":");

			// Tile is out of bounds
			if (splitIndex[0] >= bounds.e || splitIndex[0] < bounds.w || splitIndex[1] >= bounds.s || splitIndex[1] < bounds.n) {
				// Remove mesh from scene
				VIZI.Log("Removing mesh from scene", index);
				self.publish("removeFromScene", mesh);
				delete self.objects[index];

				// Remove processed feature IDs
				delete self.processedIds[index];
			}
		});
	};

	VIZI.DataOverpass.prototype.updateByWayIntersect = function(wayId) {
		var self = this;
		var deferred = Q.defer();

		var url = this.urlBase + "[out:json];(way(" + wayId + "));(._;node(w););out;";

		// Get way to intersect with
		VIZI.Log("Requesting URL", url);

		d3.json(url, function(error, data) {
			VIZI.Log("Response for URL", url);
			if (error) {
				deferred.reject(new Error(error));
			} else {
				// No features
				if (data.elements.length === 0) {
					deferred.resolve();
					return;
				}

				var way = self.process(data, false, false)[0];

				VIZI.Log(way);
				var coordinates = way.coordinates;

				var tiles = {};

				// Find tiles that intersect way
				_.each(coordinates, function(coordinate) {
					var tile = self.grid.lonlat2tile(coordinate[0], coordinate[1], self.geo.tileZoom);

					if (!tiles[tile[1]]) {
						tiles[tile[1]] = [];
					}

					if (_.indexOf(tiles[tile[1]], tile[0]) === -1) {
						tiles[tile[1]].push(tile[0]);
					}
				});

				VIZI.Log(tiles);

				var promiseQueue = [];

				_.each(tiles, function(tilesX, tileY) {
					// Fill in gaps
					var minX = _.min(tilesX);
					var maxX = _.max(tilesX);

					var tilesXFilled = _.range(minX, maxX + 1);

					_.each(tilesXFilled, function(tileX) {
						var tileBounds = {
							n: Number(tileY),
							e: tileX + 1,
							s: Number(tileY) + 1,
							w: tileX
						};

						var tileBoundsLonLat = self.grid.getBoundsLonLat(tileBounds);

						// VIZI.Log(tileBoundsLonLat);

						var cacheKey = tileX + ":" + tileY;

						// TODO: Handle load promise without actually running the function
						// - At the moment, the load function is run in at this point
						promiseQueue.push([self.load, [self.urlHigh, tileBoundsLonLat, cacheKey]]);
					});
				});

				// Use throat to limit simultaneous Overpass requests
				// Without limitation the Overpass API will rate-limit
				Q.all(promiseQueue.map(throat(1, function(promiseFunc) {
					return promiseFunc[0].apply(self, promiseFunc[1]);
				}))).done(function() {
					// deferred.resolve();
				}, function(error) {
					// deferred.reject(error);
				});

				deferred.resolve();
			}
		});

		return deferred.promise;
	};

	// Process data (convert from Overpass format to a common ViziCities format)
	// http://wiki.openstreetmap.org/wiki/Talk:Overpass_API/Language_Guide#JSON_Syntax
	// Heavily based on the OSMBuildings approach
	// https://github.com/kekscom/osmbuildings/blob/c68e6d87e52de0260e6b2d2f6660d550b79b4915/src/import/OSMXAPI.js
	// TODO: Process relations before adding ways to output
	// Aims to avoid clashes like with way 139726525
	VIZI.DataOverpass.prototype.process = function(data, simple, project) {
		var self = this;

		var nodes = {};
		var ways = {};
		var result = [];

		var elements = data.elements;
		var way;
		_.each(elements, function(element) {
			// Find a way to do this without passing the node and way objects
			switch (element.type) {
				case "node":
					self.processNode(nodes, element, project);
					break;
				case "way":
					self.processWay(result, ways, nodes, element, simple);
					break;
				case "relation":
					self.processRelation(result, ways, nodes, element);
			}
		});

		return result;
	};

	VIZI.DataOverpass.prototype.processNode = function(nodes, element, project) {
		nodes[element.id] = (project === false) ? [element.lon, element.lat] : this.geo.projection([element.lon, element.lat]);
	};

	// TODO: Validate polygon to make sure it's renderable (eg. complete, and no cross-overs)
	// TODO: Don't peform unnecessary logic and tagging for non-building ways
	VIZI.DataOverpass.prototype.processWay = function(result, ways, nodes, element, simple) {
		var self = this;

		var tags = element.tags || {};

		var coordinates = self.createOutline(nodes, element.nodes);

		if (!coordinates) {
			VIZI.Log("Skipping feature as it has duplicate coordinates", element.id, coordinates);
			return;
		}

		// Not enough points to make an object
		// Ignore if a road
		if (!tags["highway"] && coordinates.length < 4) {
			VIZI.Log("Skipping feature as it hasn't enough coordinates", element.id, coordinates);
			return;
		}

		var area = self.processArea(coordinates);

		// Skip objects too small
		// if (area < 500) {
		// return;
		// }

		// Ignore if a road
		if (!tags["highway"] && simple) {
			// Simplify coordinates
			// TODO: Perform this in the worker thread
			var simplifyTolerance = 3; // Three.js units
			coordinates = simplify(coordinates, simplifyTolerance);

			// VIZI.Log("Original coord count:", coordinates.length);
			// VIZI.Log("Simplified coord count:", simplifiedCoords.length);

			// VIZI.Log("Original coord example:", coordinates[0], coordinates[1]);
			// VIZI.Log("Simplified coord example:", simplifiedCoords[0], simplifiedCoords[1]);

			// Not enough points to make an object
			if (coordinates.length < 4) {
				return;
			}
		}

		tags["vizicities:area"] = area;
		tags.height = this.processHeight(tags);

		if (tags["min_height"] || tags["building:min_height"] || tags["min_levels"] || tags["building:min_levels"]) {
			tags.minHeight = this.processMinHeight(tags);
		}

		tags.colour = this.processColour(tags);
		tags.roof = this.processRoof(tags);

		// TODO: Calculate area
		// getGeodesicArea from http://dev.openlayers.org/releases/OpenLayers-2.10/lib/OpenLayers/Geometry/LinearRing.js
		// More info: http://gis.stackexchange.com/a/8496/14967
		// tags.area;

		var way = {
			id: element.id,
			coordinates: coordinates,
			properties: tags
		};

		ways[way.id] = way;

		if (self.isResult(way)) {
			way.coordinates = self.makeWinding(way.coordinates, self.clockwise);
			result.push(way);
		}
	};

	VIZI.DataOverpass.prototype.processRelation = function(result, ways, nodes, element) {
		var self = this;

		if (element.tags.type !== "multipolygon" && element.tags.type !== "building") {
			return;
		}

		var relationWays = self.getRelationWays(element.members, ways);
		if (relationWays) {
			// relItem = filterItem(relation);
			var outerWay = relationWays.outer;
			outerWay.coordinates = self.makeWinding(outerWay.coordinates, self.clockwise);
			if (outerWay) {
				var holes = [];

				_.each(relationWays.inner, function(innerWay, index) {
					if (innerWay.coordinates) {
						// Simplify coordinates
						// TODO: Perform this in the worker thread
						var simplifyTolerance = 3; // Three.js units
						var coordinates = simplify(innerWay.coordinates, simplifyTolerance);

						// Not enough points to make an object
						if (coordinates.length < 4) {
							return;
						}

						// Adding to the beginning seems to result in better holes
						// Using push causes all sorts of problems
						// TODO: Fix problems on buildings like Houses of Parliament
						holes.unshift(self.makeWinding(coordinates, self.counterClockwise));
					}
				});

				if (holes.length) {
					outerWay.holes = holes;
				}

				_.extend(outerWay.properties, element.tags);

				// Remove old tags
				outerWay.properties.height = null;

				if (outerWay.properties.minHeight) {
					outerWay.properties.minHeight = null;
				}

				outerWay.properties.colour = null;
				outerWay.properties.roof = null;

				// Reprocess tags
				// TODO: Remove the need for this duplication
				outerWay.properties.height = self.processHeight(outerWay.properties);

				if (outerWay.properties.minHeight) {
					outerWay.properties.minHeight = self.processMinHeight(outerWay.properties);
				}

				outerWay.properties.colour = self.processColour(outerWay.properties);
				outerWay.properties.roof = self.processRoof(outerWay.properties);

				result.push(outerWay);
			}
		}
	};

	// From: https://github.com/kekscom/osmbuildings/blob/c68e6d87e52de0260e6b2d2f6660d550b79b4915/src/import/OSMXAPI.js#L39
	VIZI.DataOverpass.prototype.getRelationWays = function(members, ways) {
		var m, outer, inner = [];
		for (var i = 0, il = members.length; i < il; i++) {
			m = members[i];
			if (m.type !== 'way' || !ways[m.ref]) {
				continue;
			}
			if (!m.role || m.role === 'outer') {
				outer = ways[m.ref];
				continue;
			}
			if (m.role === 'inner' || m.role === 'enclave') {
				inner.push(ways[m.ref]);
				continue;
			}
		}

		// allows tags to be attached to relation - instead of outer way
		if (outer) {
			return { outer:outer, inner:inner };
		}
	};

	VIZI.DataOverpass.prototype.createOutline = function(nodes, elementNodes) {
		var self = this;
		
		var nodeCount = elementNodes.length;

		var coordinates = [];
		var dupe = false;
		_.each(elementNodes, function(node, index) {
			// Shouldn"t duplicate any points apart from first and last
			if (index < nodeCount-1 && self.checkDuplicateCoords(coordinates, nodes[node])) {
				dupe = true;
			}

			coordinates.push(nodes[node]);
		});

		if (dupe) {
			return false;
		}

		return coordinates;
	};

	// Not perfect but it's good enough for area-based logic
	// http://www.mathopenref.com/coordpolygonarea2.html
	VIZI.DataOverpass.prototype.processArea = function(points) {
		var self = this;
		var numPoints = points.length;
		var area = 0;         // Accumulates area in the loop
		var j = numPoints-1;  // The last vertex is the 'previous' one to the first

		for (var i = 0; i < numPoints; i++) {
			area = area + (points[j][0]+points[i][0]) * (points[j][1]-points[i][1]);
			j = i;  // j is previous vertex to i
		}

		return Math.abs((area/2) / self.geo.pixelsPerMeter);
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
			height = 7;
		// } else if (tags["waterway"] || tags["natural"] && /water|scrub/.test(tags["natural"]) || tags["leisure"] && /park|pitch/.test(tags["leisure"]) || tags["landuse"] && /grass|meadow|commercial|retail|industrial|brownfield/.test(tags["landuse"])) {
		} else if (tags["waterway"] || tags["natural"] === "water") {
			height = 4;
		} else if (tags["natural"] === "scrub" || tags["leisure"] && /park|pitch/.test(tags["leisure"]) || tags["landuse"] && /grass|meadow/.test(tags["landuse"]) || tags["aeroway"] === "runway") {
			height = 3;
		} else {
			height = 1;
		}

		height *= this.geo.pixelsPerMeter;

		return height;
	};

	// TODO: Condense this into a single height method
	VIZI.DataOverpass.prototype.processMinHeight = function(tags) {
		// Distance conversion
		// From: https://github.com/kekscom/osmbuildings/blob/master/src/Import.js#L39
		var height;
		var scalingFactor = (tags["building"] === "office") ? 1.45 : 1;
		if (tags["min_height"]) {
			height = this.toMeters(tags["min_height"]);
		} else if (!height && tags["building:min_height"]) {
			height = this.toMeters(tags["building:min_height"]);
		} else if (!height && tags["min_levels"]) {
			height = tags["min_levels"] * this.METERS_PER_LEVEL * scalingFactor <<0;
		} else if (!height && tags["building:min_levels"]) {
			height = tags["building:min_levels"] * this.METERS_PER_LEVEL * scalingFactor <<0;
		}

		height *= this.geo.pixelsPerMeter;

		return height;
	};

	VIZI.DataOverpass.prototype.processRoof = function(tags) {
		var roof = {
			shape: "flat",
		};

		if (tags["roof:shape"] !== undefined) {
			roof.shape = tags["roof:shape"];
		}

		return roof;
	};

	VIZI.DataOverpass.prototype.processColour = function(tags) {
		var colour;
		if (tags["building"] || tags["building:part"]) {
			colour = (VIZI.ENABLE_OUTLINES) ? 0xffffff : 0xeeeeee;
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
		} else if (tags["aeroway"] === "aerodrome") {
			colour = 0xeeeeee;
		} else if (tags["aeroway"] === "runway") {
			colour = 0x666666;
		} else {
			VIZI.Log("Setting default colour for feaure", tags);
			colour = 0xFF0000;
		}

		return colour;
	};

	VIZI.DataOverpass.prototype.generateFeatures = function(features) {
		var self = this;
		var deferred = Q.defer();
		
		self.objectManager.processFeaturesWorker(features, self.geo.pixelsPerMeter).then(function(mesh) {
			deferred.resolve(mesh);
		}, undefined, function(progress) {
			// Pass-through progress
			deferred.notify(progress);
		});

		return deferred.promise;
	};

	// Is the element suitable to be outputted as a result?
	// Highway has area dependency to avoid trouble with closed ways they are described as highways (like 134405951)
	// TODO: Detect if it isn't a result, rather than checking all tags to see if it is
	VIZI.DataOverpass.prototype.isResult = function(element) {
		var tags = element.properties;
		
		return (
			tags && 
			(tags["building"] || tags["building:part"] || tags["waterway"] || tags["natural"] || tags["landuse"] || tags["leisure"] || tags["aeroway"] || (tags["highway"] && !tags["area"]))
		);
	};
}());
