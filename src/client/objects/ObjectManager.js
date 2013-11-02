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
			var timeToSend = data.startTime - startTime;
			var timeToArrive = Date.now() - data.timeSent;
			deferred.resolve({data: data, timeToArrive: timeToArrive, timeToSend: timeToSend});
		});
		return deferred.promise;
	};
	
	// TODO: Should be possible if geo functionality can be performed before / after the worker task
	// TODO: Try and get rid of lock-up that occurs at beginning and end of worker process (possibly due to data being sent back and forth)
	VIZI.ObjectManager.prototype.processFeaturesWorker = function(features) {
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

		VIZI.Log("Converting coordinates: " + (Date.now() - coordinateTime));

		var worker = cw({
			process: function(features) {
				importScripts("worker/three.min.js", "worker/GeometryExporter.js", "worker/underscore.min.js");

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

				// var meshes = [];

				// var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
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
					// // var shape = this.createShapeFromCoords(coords);
					var shape = new THREE.Shape();
					_.each(coords, function(coord, index) {
						// Move if first coordinate
						if (index === 0) {
							shape.moveTo( coord[0], coord[1] );
						} else {
							shape.lineTo( coord[0], coord[1] );
						}
					});

					// var height = 10 * this.geo.pixelsPerMeter;
					var height = 10;

					var extrudeSettings = { amount: height, bevelEnabled: false };
					var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					applyVertexColors( geom, colour );
					
					// Move geom to 0,0 and return offset
					// var offset = THREE.GeometryUtils.center( geom );

					geom.computeFaceNormals();
					var mesh = new THREE.Mesh(geom);

					mesh.position.y = height;

					// Flip buildings as they are up-side down
					mesh.rotation.x = 90 * Math.PI / 180;

					// meshes.push(mesh);
					THREE.GeometryUtils.merge(combinedGeom, mesh);

					count++;
				});

				var timeTaken = Date.now() - startTime;
				var exportedGeom = exporter.parse(combinedGeom);
				// var exportedGeom = {};

				// The size of this seems to be the problem
				// Work out how to reduce it
				var size = JSON.stringify(exportedGeom).length;

				var timeSent = Date.now();

				// return meshes;

				return {json: exportedGeom, size: size, count: count, startTime: startTime, timeTaken: timeTaken, timeSent: timeSent};
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

			// VIZI.Log("Start index: " + startIndex);
			// VIZI.Log("End index: " + (startIndex+(featuresPerBatch-1)));

			// var endIndex = i * featuresPerBatch;
			// endIndex = (endIndex > features.length-1) ? features.length-1 : endIndex;

			var featuresBatch = features.splice(startIndex, featuresPerBatch-1);

			batchPromises.push(this.workerPromise(worker, featuresBatch));

			// worker.process(featuresBatch).then(function(data) {
			// 	VIZI.Log(Date.now() - startTime);
			// 	// VIZI.Log(data);
			// 	batchedMeshes.concat(data);
			// 	// worker.close();
			// });
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

					// Not sure how reliable this time is
					var timeToSend = value.timeToSend;

					var timeToArrive = value.timeToArrive;
					var timeTaken = data.timeTaken;
					var size = data.size;
					var count = data.count;
					var json = data.json;

					VIZI.Log("Worker input sent in " + timeToSend + "ms");
					VIZI.Log("Worker output received in " + timeToArrive + "ms");
					VIZI.Log("Worker output size is " + size);
					VIZI.Log("Processed " + count + " features in " + timeTaken + "ms");

					VIZI.Log(json);

					// TODO: Stop this locking up the browser
					var geom = loader.parse(json);
					var mesh = new THREE.Mesh(geom.geometry, material);
					self.publish("addToScene", mesh);

					// count += data.length;
				}
			});

			// VIZI.Log(count);
			VIZI.Log("Overall worker time is " + (Date.now() - startTime) + "ms");
		}).done();
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

				// var applyVertexColors = function( g, c ) {
				// 	g.faces.forEach( function( f ) {
				// 		var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
				// 		for( var j = 0; j < n; j ++ ) {
				// 			f.vertexColors[ j ] = c;
				// 		}
				// 	} );
				// };

				// var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
				// var material2 = new THREE.MeshLambertMaterial({color: 0xcccccc});
				// var colour = new THREE.Color(0xcccccc);

				// _.each(features, function(feature) {
					var properties = feature.properties;

					var area = properties.area;

					// Skip if building area is too small
					if (area < 200) {
						return;
					}
					
					var coords = feature.geometry.coordinatesConverted[0];
					// // var shape = this.createShapeFromCoords(coords);
					var shape = new THREE.Shape();
					_.each(coords, function(coord, index) {
						// Move if first coordinate
						if (index === 0) {
							shape.moveTo( coord[0], coord[1] );
						} else {
							shape.lineTo( coord[0], coord[1] );
						}
					});

					// var height = 10 * this.geo.pixelsPerMeter;
					var height = 10;

					var extrudeSettings = { amount: height, bevelEnabled: false };
					var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
					// var geom = new THREE.CubeGeometry(10, 10, 10);

					// applyVertexColors( geom, colour );
					
					// Move geom to 0,0 and return offset
					// var offset = THREE.GeometryUtils.center( geom );

					geom.computeFaceNormals();
					// var mesh = new THREE.Mesh(geom, material2);

					// mesh.position.y = height;

					// Flip buildings as they are up-side down
					// mesh.rotation.x = 90 * Math.PI / 180;

					// meshes.push(mesh);
				// });

				// return Date.now() - startTime;

				return exporter.parse(geom);
			}
		}, 4, true);

		var startTime = Date.now();

		// TODO: Work out why this still locks up the browser (amount of data being transferred back from the worker? Is it quicker to create objects in the browser?)
		// TODO: See if simply batching objects and creating them in the browser is less sluggish for the browser
		// TODO: Work out why not every feature is being returned in the promises (about 10–20 less than expected)

		// Batch features
		// var batches = 20;
		// var featuresPerBatch = Math.ceil(features.length / batches);
		// var batchedMeshes = [];
		// var batchPromises = [];

		// var i = batches;
		// while (i--) {
		// 	var startIndex = i * featuresPerBatch;
		// 	startIndex = (startIndex < 0) ? 0 : startIndex;

		// 	// VIZI.Log("Start index: " + startIndex);
		// 	// VIZI.Log("End index: " + (startIndex+(featuresPerBatch-1)));

		// 	// var endIndex = i * featuresPerBatch;
		// 	// endIndex = (endIndex > features.length-1) ? features.length-1 : endIndex;

		// 	var featuresBatch = features.splice(startIndex, featuresPerBatch-1);

		// 	batchPromises.push(this.workerPromise(worker, featuresBatch));

		// 	// worker.process(featuresBatch).then(function(data) {
		// 	// 	VIZI.Log(Date.now() - startTime);
		// 	// 	// VIZI.Log(data);
		// 	// 	batchedMeshes.concat(data);
		// 	// 	// worker.close();
		// 	// });
		// }

		// // Handle promises
		// Q.allSettled(batchPromises).then(function (promises) {
		// 	var count = 0;

		// 	_.each(promises, function (promise) {
		// 		if (promise.state === "fulfilled") {
		// 			var value = promise.value;
		// 			count += value.length;
		// 			// VIZI.Log(value);
		// 		}
		// 	});

		// 	VIZI.Log(count);
		// 	VIZI.Log(Date.now() - startTime);
		// }).done();

		var loader = new THREE.JSONLoader();
		var material = new THREE.MeshLambertMaterial({color: 0xcccccc});
		
		var self = this;
		worker.batch(function(feature) {
			var json = loader.parse(feature);
			var mesh = new THREE.Mesh(json.geometry, material);
			mesh.position.y = 10;
			mesh.rotation.x = 90 * Math.PI / 180;
			self.publish("addToScene", mesh);
			// return feature;
			// VIZI.Log(loader.parse(feature));
			// worker.close();
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