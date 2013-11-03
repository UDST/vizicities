/* globals window, _, VIZI, THREE, Q, d3, cw */
(function() {
	"use strict";

	VIZI.ObjectManager = function() {
		_.extend(this, VIZI.Mediator);

		this.objects = [];

		this.combinedMaterial = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
		this.combinedObjects = undefined;
	};

	VIZI.ObjectManager.prototype.load = function(url) {
		var deferred = Q.defer();

		d3.json(url, function(error, data) {
			if (error) {
				deferred.reject(new Error(error));
			} else {
				deferred.resolve(data);
			}
		});

		return deferred.promise;
	};

	// TODO: Convert to a promise
	VIZI.ObjectManager.prototype.processFeatures = function(features) {
		var startTime = Date.now();

		var objects = _.map(features, this.processFeature);

		VIZI.Log(Date.now() - startTime);

		this.objects = objects;

		this.combinedObjects = this.combineObjects(objects);

		this.publish("addToScene", this.combinedObjects);
	};

	VIZI.ObjectManager.prototype.workerPromise = function(worker, features) {
		var deferred = Q.defer();

		var startTime = Date.now();
		worker.process(features).then(function(data) {
		//worker.processDebug({}).then(function(data) {
			var timeToSend = data.startTime - startTime;
			var timeToArrive = Date.now() - data.timeSent;
			deferred.resolve({data: data, timeToArrive: timeToArrive, timeToSend: timeToSend});
		});
		return deferred.promise;
	};
	
	// TODO: Should be possible if geo functionality can be performed before / after the worker task
	// TODO: Try and get rid of lock-up that occurs at beginning and end of worker process (possibly due to size of data being sent back and forth)
	VIZI.ObjectManager.prototype.processFeaturesWorker = function(features) {
		VIZI.Log("Processing features using worker");

		var deferred = Q.defer();

		var geo = VIZI.Geo.getInstance();

		// Convert coordinates
		var coordinateTime = Date.now();

		_.each(features, function(feature) {
			var coords = feature.geometry.coordinates[0];
			feature.geometry.coordinatesConverted = [[]];
			_.each(coords, function(coord) {
				feature.geometry.coordinatesConverted[0].push(geo.projection(coord));
			});
		});

		VIZI.Log("Converting coordinates: " + (Date.now() - coordinateTime));

		// TODO: See if initialising this before calling processFeaturesWorker speeds things up
		var worker = cw({
			processDebug: function(features) {
				var inputSize = JSON.stringify(features).length;

				var startTime = Date.now();

				var count = 0;

				var timeTaken = Date.now() - startTime;
				var exportedGeom = {};

				// The size of this seems to be the problem
				// Work out how to reduce it
				var outputSize = JSON.stringify(exportedGeom).length;

				var timeSent = Date.now();

				return {json: exportedGeom, outputSize: outputSize, inputSize: inputSize, count: count, startTime: startTime, timeTaken: timeTaken, timeSent: timeSent};
			},
			process: function(features) {
				importScripts("worker/three.min.js", "worker/GeometryExporter.js", "worker/underscore.min.js");

				var inputSize = JSON.stringify(features).length;

				var startTime = Date.now();

				var exporter = new THREE.GeometryExporter();

				var applyVertexColors = function( g, c ) {
					g.faces.forEach( function( f ) {
						var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
						for( var j = 0; j < n; j ++ ) {
							f.vertexColors[ j ] = c;
						}
					} );
				};

				var colour = new THREE.Color(0xcccccc);

				var combinedGeom = new THREE.Geometry();

				var count = 0;

				_.each(features, function(feature) {
					var properties = feature.properties;

					var area = properties.area;

					// Skip if building area is too small
					if (area < 200) {
						return;
					}
					
					var coords = feature.geometry.coordinatesConverted[0];
					var shape = new THREE.Shape();
					_.each(coords, function(coord, index) {
						// Move if first coordinate
						if (index === 0) {
							shape.moveTo( coord[0], coord[1] );
						} else {
							shape.lineTo( coord[0], coord[1] );
						}
					});

					//var height = 10 * this.geo.pixelsPerMeter;
					var height = 10;

					var extrudeSettings = { amount: height, bevelEnabled: false };
					var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					applyVertexColors( geom, colour );

					geom.computeFaceNormals();
					var mesh = new THREE.Mesh(geom);

					mesh.position.y = height;

					// Flip buildings as they are up-side down
					mesh.rotation.x = 90 * Math.PI / 180;

					THREE.GeometryUtils.merge(combinedGeom, mesh);

					count++;
				});

				var timeTaken = Date.now() - startTime;
				var exportedGeom = exporter.parse(combinedGeom);

				// The size of this seems to be the problem
				// Work out how to reduce it
				var outputSize = JSON.stringify(exportedGeom).length;

				var timeSent = Date.now();

				return {json: exportedGeom, outputSize: outputSize, inputSize: inputSize, count: count, startTime: startTime, timeTaken: timeTaken, timeSent: timeSent};
			}
		});

		var startTime = Date.now();

		// TODO: Work out why this still locks up the browser (amount of data being transferred back from the worker? Is it quicker to create objects in the browser?)
		// TODO: See if simply batching objects and creating them in the browser is less sluggish for the browser
		// TODO: Work out why not every feature is being returned in the promises (about 10–20 less than expected)

		// Batch features
		var batches = 20;
		var featuresPerBatch = Math.ceil(features.length / batches);
		var batchedMeshes = [];
		var batchPromises = [];

		var i = batches;
		while (i--) {
			var startIndex = i * featuresPerBatch;
			startIndex = (startIndex < 0) ? 0 : startIndex;

			var featuresBatch = features.splice(startIndex, featuresPerBatch-1);

			batchPromises.push(this.workerPromise(worker, featuresBatch));
		}

		var loader = new THREE.JSONLoader();
		var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});

		var self = this;

		// Handle promises
		Q.allSettled(batchPromises).then(function (promises) {
			var count = 0;

			_.each(promises, function (promise) {
				if (promise.state === "fulfilled") {
					var value = promise.value;
					var data = value.data;

					// Not sure how reliable the send time is
					var timeToSend = value.timeToSend;
					var timeToArrive = value.timeToArrive;
					var timeTaken = data.timeTaken;
					var inputSize = data.inputSize;
					var outputSize = data.outputSize;
					var count = data.count;
					var json = data.json;

					VIZI.Log("Worker input sent in " + timeToSend + "ms");
					VIZI.Log("Worker input size is " + inputSize);
					VIZI.Log("Worker output received in " + timeToArrive + "ms");
					VIZI.Log("Worker output size is " + outputSize);
					VIZI.Log("Processed " + count + " features in " + timeTaken + "ms");

					VIZI.Log(json);

					// TODO: Stop this locking up the browser
					// No visible lock up at all when removed
					var geom = loader.parse(json);
					var mesh = new THREE.Mesh(geom.geometry, material);
					self.publish("addToScene", mesh);
				}
			});

			VIZI.Log("Overall worker time is " + (Date.now() - startTime) + "ms");
		}).done(function() {
			deferred.resolve();
		});

		return deferred.promise;
	};

	VIZI.ObjectManager.prototype.processFeaturesWorker2 = function(features) {
		VIZI.Log("Processing features using worker");

		var geo = VIZI.Geo.getInstance();

		// Convert coordinates
		var coordinateTime = Date.now();
		_.each(features, function(feature) {
			var coords = feature.geometry.coordinates[0];
			feature.geometry.coordinatesConverted = [[]];
			_.each(coords, function(coord) {
				feature.geometry.coordinatesConverted[0].push(geo.projection(coord));
			});
		});
		VIZI.Log("Converting coordinates: " + Date.now() - coordinateTime);

		VIZI.Log(features);

		var worker = cw({
			process: function(feature) {
				importScripts("worker/three.min.js", "worker/GeometryExporter.js", "worker/underscore.min.js");

				var exporter = new THREE.GeometryExporter();

				var startTime = Date.now();

					var properties = feature.properties;

					var area = properties.area;

					// Skip if building area is too small
					if (area < 200) {
						return;
					}
					
					var coords = feature.geometry.coordinatesConverted[0];
					var shape = new THREE.Shape();
					_.each(coords, function(coord, index) {
						// Move if first coordinate
						if (index === 0) {
							shape.moveTo( coord[0], coord[1] );
						} else {
							shape.lineTo( coord[0], coord[1] );
						}
					});

					var height = 10;

					var extrudeSettings = { amount: height, bevelEnabled: false };
					var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					geom.computeFaceNormals();

				return exporter.parse(geom);
			}
		}, 4, true);

		var startTime = Date.now();

		// TODO: Work out why this still locks up the browser (amount of data being transferred back from the worker? Is it quicker to create objects in the browser?)
		// TODO: See if simply batching objects and creating them in the browser is less sluggish for the browser
		// TODO: Work out why not every feature is being returned in the promises (about 10–20 less than expected)

		var loader = new THREE.JSONLoader();
		var material = new THREE.MeshLambertMaterial({color: 0xcccccc});
		
		var self = this;
		worker.batch(function(feature) {
			var json = loader.parse(feature);
			var mesh = new THREE.Mesh(json.geometry, material);
			mesh.position.y = 10;
			mesh.rotation.x = 90 * Math.PI / 180;
			self.publish("addToScene", mesh);
		}).process(features).then(function(data) {
			VIZI.Log(Date.now() - startTime);
			VIZI.Log(data);
		});
	};

	VIZI.ObjectManager.prototype.processFeature = function(feature) {};

	VIZI.ObjectManager.prototype.combineObjects = function(objects) {
		var combinedGeom = new THREE.Geometry();
		
		_.each(objects, function(object) {
			if (!object.object) {
				return;
			}

			THREE.GeometryUtils.merge(combinedGeom, object.object);
		});

		combinedGeom.computeFaceNormals();
		
		return new THREE.Mesh( combinedGeom, this.combinedMaterial );
	};
}());