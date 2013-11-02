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
		var objects = _.map(features, this.processFeature);

		this.combinedObjects = this.combineObjects(objects);

		this.publish("addToScene", this.combinedObjects);
	};

	VIZI.ObjectManager.prototype.workerPromise = function(worker, features) {
		var deferred = Q.defer();
		worker.process(features).then(function(data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	};
	
	// TODO: Should be possible if geo functionality can be performed before / after the worker task
	VIZI.ObjectManager.prototype.processFeaturesWorker = function(features) {
		VIZI.Log("Processing features using worker");

		var geo = VIZI.Geo.getInstance();

		// Convert coordinates
		_.each(features, function(feature) {
			var coords = feature.geometry.coordinates[0];
			feature.geometry.coordinatesConverted = [[]];
			_.each(coords, function(coord) {
				feature.geometry.coordinatesConverted[0].push(geo.projection(coord));
			});
		});

		var worker = cw({
			process: function(features) {
				importScripts("worker/three.min.js", "worker/underscore.min.js");

				var applyVertexColors = function( g, c ) {
					g.faces.forEach( function( f ) {
						var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
						for( var j = 0; j < n; j ++ ) {
							f.vertexColors[ j ] = c;
						}
					} );
				};

				var meshes = [];

				var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
				var colour = new THREE.Color(0xcccccc);

				_.each(features, function(feature) {
					var properties = feature.properties;

					var area = properties.area;

					// Skip if building area is too small
					// if (area < 200) {
					// 	return;
					// }
					
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
					var mesh = new THREE.Mesh(geom, material);

					mesh.position.y = height;

					// Flip buildings as they are up-side down
					mesh.rotation.x = 90 * Math.PI / 180;

					meshes.push(mesh);
				});

				return meshes;
			}
		}, 4);

		var startTime = Date.now();

		// TODO: Work out why this still locks up the browser
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

		// Handle promises
		Q.allSettled(batchPromises).then(function (promises) {
			var count = 0;

			_.each(promises, function (promise) {
				if (promise.state === "fulfilled") {
					var value = promise.value;
					count += value.length;
					// VIZI.Log(value);
				}
			});

			VIZI.Log(count);
		}).done();

		// worker.batch.process(features).then(function(data) {
		// 	VIZI.Log(Date.now() - startTime);
		// 	VIZI.Log(data);
		// });

		// worker.batch(function(feature) {
		// 	return feature;
		// 	// VIZI.Log(feature);
		// 	// worker.close();
		// }).process(features).then(function(data) {
		// 	VIZI.Log(Date.now() - startTime);
		// 	VIZI.Log(data);
		// });

		// worker.data(features).then(function(data) {
		// 	VIZI.Log(Date.now() - startTime);
		// 	VIZI.Log(data);
		// 	worker.close();
		// });

		// var worker = new Parallel(features, { evalPath: "worker/eval.js" });
		// worker.require("three.min.js");
		// worker.require("underscore.min.js");
		// worker.require({fn: VIZI.applyVertexColors, name: "applyVertexColors"});

		// var startTime = Date.now();
		// worker.spawn(function(features) {
		// 	var meshes = [];
		// 	var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});

		// 	_.each(features, function(feature) {
				// var properties = feature.properties;

				// var area = properties.area;

				// // Skip if building area is too small
				// if (area < 200) {
				// 	return;
				// }

				// var colour = new THREE.Color(0xcccccc);
				
				// var coords = feature.geometry.coordinatesConverted[0];
				// // // var shape = this.createShapeFromCoords(coords);
				// var shape = new THREE.Shape();
				// _.each(coords, function(coord, index) {
				// 	// Move if first coordinate
				// 	if (index === 0) {
				// 		shape.moveTo( coord[0], coord[1] );
				// 	} else {
				// 		shape.lineTo( coord[0], coord[1] );
				// 	}
				// });

				// // var height = 10 * this.geo.pixelsPerMeter;
				// var height = 10;

				// var extrudeSettings = { amount: height, bevelEnabled: false };
				// var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

				// applyVertexColors( geom, colour );
				
				// // Move geom to 0,0 and return offset
				// // var offset = THREE.GeometryUtils.center( geom );

				// geom.computeFaceNormals();
				// var mesh = new THREE.Mesh(geom, material);

				// mesh.position.y = height;

				// // Flip buildings as they are up-side down
				// mesh.rotation.x = 90 * Math.PI / 180;

				// meshes.push(mesh);
		// 	});

		// 	return meshes;
		// }).then(function(meshes) {
		// 	VIZI.Log(Date.now() - startTime);
		// 	VIZI.Log(meshes);
		// });

		// var objects = _.map(features, this.processFeature);

		// this.combinedObjects = this.combineObjects(objects);

		// this.publish("addToScene", this.combinedObjects);
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