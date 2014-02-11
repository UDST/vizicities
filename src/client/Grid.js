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
			this.tilesPerDirectionHigh = 2;

			// Tiles per direction for low detail
			this.tilesPerDirectionLow = 6;

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
			var lonLatMin = this.tile2lonlat(Math.floor(this.centerTile[0]), Math.floor(this.centerTile[1]), this.geo.tileZoom);
			var lonLatMax = this.tile2lonlat(Math.floor(this.centerTile[0])+1, Math.floor(this.centerTile[1])+1, this.geo.tileZoom);

			// Why is this tilesize so random?
			var tileSize = this.geo.projection(lonLatMax)[0] - this.geo.projection(lonLatMin)[0];
			
			var tileGeom = new THREE.PlaneGeometry( tileSize, tileSize, 1, 1 );
			var tileCount = [this.boundsHigh.e-this.boundsHigh.w, this.boundsHigh.s-this.boundsHigh.n];
			// Rows
			for (var i = 0; i < tileCount[0]; i++) {
				// Columns
				for (var j = 0; j < tileCount[1]; j++) {
					var tileCoords = [this.boundsHigh.w + j, this.boundsHigh.n + i];
						
					var tileMat = new THREE.MeshBasicMaterial({color: new THREE.Color(0xFFFFFF * Math.random()), transparent: true, opacity: 0.6});
					var tile = new THREE.Mesh(tileGeom, tileMat);
					var position = this.geo.projection(this.tile2lonlat(tileCoords[0], tileCoords[1], this.geo.tileZoom));

					tile.position.y = 10;
					tile.position.x = position[0] + tileSize / 2;
					tile.position.z = position[1] + tileSize / 2;
					tile.rotation.x = - 90 * Math.PI / 180;

					// this.publish("addToScene", tile);
					this.gridModel.add(tile);
				}
			}

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