/* globals window, _, VIZI, Q, THREE */
(function() {
	"use strict";

	VIZI.Grid = (function() {
		var Grid = function() {
			VIZI.Log("Inititialising grid manager");

			_.extend(this, VIZI.Mediator);

			// Reference to geo class
			this.geo = VIZI.Geo.getInstance();

			// Location of grid center
			this.pos2d = new THREE.Vector2();
			this.centerTile = [];

			// Tile size and zoom level comes from VIZI.Geo

			// Tiles per direction for high detail
			this.tilesPerDirectionHigh = 1;

			// Tiles per direction for low detail
			this.tilesPerDirectionLow = 2;

			// Calculated pixel tile size
			this.tileSize = 0;

			// Grid bounds for high detail (in TMS values)
			this.boundsHigh = {};

			// Grid bounds for high detail (lon, lat)
			this.boundsHighLonLat = {};

			// Grid bounds for low detail (in TMS values)
			this.boundsLow = {};

			// Grid bounds for low detail (lon, lat)
			this.boundsLowLonLat = {};

			// Debug grid model
			this.gridModel = new THREE.Object3D();

			this.subscribe("centerPositionChanged", this.onCenterChanged);
		};

		Grid.prototype.init = function(coords) {
			var projCoords = this.geo.projection(coords);

			this.pos2d.x = projCoords[0];
			this.pos2d.y = projCoords[1];

			this.centerTile = this.lonlat2tile(coords[0], coords[1], this.geo.tileZoom, true);

			this.boundsHigh = this.getBounds(this.tilesPerDirectionHigh);
			this.boundsLow = this.getBounds(this.tilesPerDirectionLow);

			this.boundsHighLonLat = this.getBoundsLonLat(this.boundsHigh);
			this.boundsLowLonLat = this.getBoundsLonLat(this.boundsLow);

			// Create debug model for grid
			this.createDebug();

			this.publish("addToScene", this.gridModel);

			return Q.fcall(function() {});
		};

		Grid.prototype.update = function() {
			// Store old position and bounds
			var oldPos2d = this.pos2d.clone();

			var oldBoundsHigh = {
				n: this.boundsHigh.n,
				e: this.boundsHigh.e,
				s: this.boundsHigh.s,
				w: this.boundsHigh.w
			};

			var oldBoundsLow = {
				n: this.boundsLow.n,
				e: this.boundsLow.e,
				s: this.boundsLow.s,
				w: this.boundsLow.w
			};
			// Update central position
			// Calculate bounds
		};

		Grid.prototype.getBounds = function(tileDistance) {
			var bounds = {
				n: Math.floor(this.centerTile[1]) - tileDistance,
				e: Math.ceil(this.centerTile[0]) + tileDistance,
				s: Math.ceil(this.centerTile[1]) + tileDistance,
				w: Math.floor(this.centerTile[0]) - tileDistance
			};

			return bounds;
		};

		Grid.prototype.getBoundsLonLat = function(bounds) {
			var max = this.tile2lonlat(bounds.e, bounds.n, this.geo.tileZoom);
			var min = this.tile2lonlat(bounds.w, bounds.s, this.geo.tileZoom);

			var boundsLonLat = {
				n: this.geo.decimalPlaces(max[1]),
				e: this.geo.decimalPlaces(max[0]),
				s: this.geo.decimalPlaces(min[1]),
				w: this.geo.decimalPlaces(min[0])
			};

			return boundsLonLat;
		};

		Grid.prototype.onCenterChanged = function(centerPixels, centerLonLat, bounds) {
			var centerTile = this.lonlat2tile(centerLonLat[0], centerLonLat[1], this.geo.tileZoom, true);

			var gridDiff = [
				Math.floor(centerTile[0]) - Math.floor(this.centerTile[0]),
				Math.floor(centerTile[1]) - Math.floor(this.centerTile[1])
			];

			if (Math.abs(gridDiff[0]) > 0 || Math.abs(gridDiff[1]) > 0) {
				VIZI.Log("Update grid", gridDiff);

				this.pos2d.x = centerPixels[0];
				this.pos2d.y = centerPixels[1];

				this.centerTile = centerTile;

				this.boundsHigh = this.getBounds(this.tilesPerDirectionHigh);
				this.boundsLow = this.getBounds(this.tilesPerDirectionLow);

				this.boundsHighLonLat = this.getBoundsLonLat(this.boundsHigh);
				this.boundsLowLonLat = this.getBoundsLonLat(this.boundsLow);

				this.gridModel.position.x += this.tileSize * gridDiff[0];
				this.gridModel.position.z += this.tileSize * gridDiff[1];

				this.publish("gridUpdated");
			}
		};

		Grid.prototype.createDebug = function() {
			var lonLatMin = this.tile2lonlat(Math.floor(this.centerTile[0]), Math.floor(this.centerTile[1]), this.geo.tileZoom);
			var lonLatMax = this.tile2lonlat(Math.floor(this.centerTile[0])+1, Math.floor(this.centerTile[1])+1, this.geo.tileZoom);

			// Why is this tilesize so random?
			this.tileSize = this.geo.projection(lonLatMax)[0] - this.geo.projection(lonLatMin)[0];
			
			var tileLineMatHigh = new THREE.LineBasicMaterial( { color: 0xcc0000, linewidth: 6 } );
			var tileLineMatLow = new THREE.LineBasicMaterial( { color: 0x0000cc, linewidth: 6 } );
			
			var tileLineGeom = new THREE.Geometry();

			var vertices = tileLineGeom.vertices;
			vertices.push(new THREE.Vector3(0, 0, 0));
			vertices.push(new THREE.Vector3(this.tileSize, 0, 0));
			vertices.push(new THREE.Vector3(this.tileSize, 0, this.tileSize));
			vertices.push(new THREE.Vector3(0, 0, this.tileSize));
			vertices.push(new THREE.Vector3(0, 0, 0));

			tileLineGeom.computeLineDistances();

			var i, j, tileCoords, position, tileLine;

			// High
			var tileCountHigh = [this.boundsHigh.e-this.boundsHigh.w, this.boundsHigh.s-this.boundsHigh.n];
			// Rows
			for (i = 0; i < tileCountHigh[0]; i++) {
				// Columns
				for (j = 0; j < tileCountHigh[1]; j++) {
					tileCoords = [this.boundsHigh.w + j, this.boundsHigh.n + i];

					position = this.geo.projection(this.tile2lonlat(tileCoords[0], tileCoords[1], this.geo.tileZoom));

					tileLine = new THREE.Line(tileLineGeom, tileLineMatHigh);
					tileLine.position.y = 2;
					tileLine.position.x = position[0];
					tileLine.position.z = position[1];

					this.gridModel.add(tileLine);
				}
			}

			// Low
			var tileCountLow = [this.boundsLow.e-this.boundsLow.w, this.boundsLow.s-this.boundsLow.n];
			// Rows
			for (i = 0; i < tileCountLow[0]; i++) {
				// Columns
				for (j = 0; j < tileCountLow[1]; j++) {
					tileCoords = [this.boundsLow.w + j, this.boundsLow.n + i];

					position = this.geo.projection(this.tile2lonlat(tileCoords[0], tileCoords[1], this.geo.tileZoom));

					tileLine = new THREE.Line(tileLineGeom, tileLineMatLow);
					tileLine.position.y = 0.1;
					tileLine.position.x = position[0];
					tileLine.position.z = position[1];

					this.gridModel.add(tileLine);
				}
			}
		};

		Grid.prototype.lonlat2tile = function(lon, lat, zoom, float) {
			lon = Number(lon);

			var tx, ty;
			
			if (float) {
				tx = ((lon+180)/360*Math.pow(2,zoom));
				ty = ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom));
			} else {
				tx = (Math.floor((lon+180)/360*Math.pow(2,zoom)));
				ty = (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
			}

			return [tx, ty];
		};

		Grid.prototype.tile2lonlat = function(x, y, z) {
			var lon = (x/Math.pow(2,z)*360-180);
			var n = Math.PI-2*Math.PI*y/Math.pow(2,z);
			var lat = (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));

			return [lon, lat];
		};

		var instance;

		// an emulation of static variables and methods
		var _static = {   
			name: "VIZI.Grid",

			// Method for getting an instance. It returns 
			// a singleton instance of a singleton object
			getInstance: function() {
				if ( instance  ===  undefined )  {
					instance = new Grid();
				}

				return instance;
			}
		};

		return _static;
	}());
}());