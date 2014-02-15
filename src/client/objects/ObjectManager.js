/* globals window, _, VIZI, THREE, Q, d3, cw */
(function() {
	"use strict";

	VIZI.ObjectManager = function() {
		_.extend(this, VIZI.Mediator);

		this.objects = [];

		this.combinedMaterial = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
		this.combinedObjects = undefined;
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
			var timeToSend = data.startTime - startTime;
			var timeToArrive = Date.now() - data.timeSent;
			deferred.resolve({data: data, timeToArrive: timeToArrive, timeToSend: timeToSend});
		});
		return deferred.promise;
	};
	
	// ##########################################
	// Web Worker Loader
	// ##########################################
	// - Features (as JSON) are passed to worker manager
	// - Worker manager splits features into batches and passes each worker a batch
	// - Each worker processes features and passes a reference back using transferable objects
	// - Features are added to scene for each completed worker promise

	// TODO: Move feature definition and render options into separate class (eg. BuildingManager and Building)
	//       - Right now, the generation of Three.js objects in this file is based on buildings
	// TODO: Should be possible if geo functionality can be performed before / after the worker task
	// TODO: Try and get rid of lock-up that occurs at beginning and end of worker process (possibly due to size of data being sent back and forth)
	// TODO: Build objects as BufferGeometry for very easy export and messaging out of worker
	// http://stackoverflow.com/questions/18262868/transforming-geometry-to-buffergeometry
	// https://github.com/mrdoob/three.js/blob/f396baf5876eb41bcd2ee34eb65b1f97bb92d530/examples/js/exporters/BufferGeometryExporter.js
	
	VIZI.ObjectManager.prototype.processFeaturesWorker = function(features) {
		VIZI.Log("Processing features using worker");

		var deferred = Q.defer();

		var geo = VIZI.Geo.getInstance();

		// TODO: See if initialising this before calling processFeaturesWorker speeds things up
		var worker = cw({
			process: function(features, callback) {
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

				// Default colour
				var colour = new THREE.Color(0xFF87FC);

				// Use random colour per worker to show grouping of objects
				// var colour = new THREE.Color(0xFFFFFF * Math.random());

				var combinedGeom = new THREE.Geometry();

				var count = 0;
				
				// TODO: Work out how to put feature-specific object generation in here
				//       - eg. Buildings, rivers, roads, etc.
				_.each(features, function(feature) {
					var properties = feature.properties;

					// var area = properties.area;

					// // Skip if building area is too small
					// if (area < 200) {
					// return;
					// }
					
					var offset = [];
					var coords = feature.coordinates;
					var shape = new THREE.Shape();
					_.each(coords, function(coord, index) {
						if (offset.length === 0) {
							offset[0] = -1 * coord[0];
							offset[1] = -1 * coord[1];
						}

						// Move if first coordinate
						if (index === 0) {
							shape.moveTo( coord[0] + offset[0], coord[1] + offset[1] );
						} else {
							shape.lineTo( coord[0] + offset[0], coord[1] + offset[1] );
						}
					});

					// Height value is in meters
					var height = properties.height;

					var extrudeSettings = { amount: height, bevelEnabled: false };
					var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					var elementColour = (properties.colour) ? new THREE.Color(properties.colour) : colour;
					applyVertexColors( geom, elementColour );

					geom.computeFaceNormals();
					var mesh = new THREE.Mesh(geom);

					mesh.position.y = height;

					// Offset building
					mesh.position.x = -1 * offset[0];
					mesh.position.z = -1 * offset[1];

					// Flip buildings as they are up-side down
					mesh.rotation.x = 90 * Math.PI / 180;

					THREE.GeometryUtils.merge(combinedGeom, mesh);

					count++;
				});

				// Move merged geom to 0,0 and return offset
				var offset = THREE.GeometryUtils.center( combinedGeom );

				var timeTaken = Date.now() - startTime;
				var exportedGeom = exporter.parse(combinedGeom);

				// The size of this seems to be the problem
				// Work out how to reduce it
				var outputSize = JSON.stringify(exportedGeom).length;

				// Convert exported geom into a typed array
				var verticesArray = new Float64Array( exportedGeom.vertices );
				var normalsArray = new Float64Array( exportedGeom.normals );
				// var colorsArray = new Float64Array( exportedGeom.colors );
				// Seems to be manually set to have 1 array in the uvs array
				// https://github.com/mrdoob/three.js/blob/master/examples/js/exporters/GeometryExporter.js#L231
				var uvsArray = new Float64Array( exportedGeom.uvs[0] );
				var facesArray = new Float64Array( exportedGeom.faces );

				// Store geom typed array as Three.js model object
				var model = {
					metadata: exportedGeom.metadata,
					colors: exportedGeom.colors,
					vertices: verticesArray,
					normals: normalsArray,
					uvs: uvsArray,
					faces: facesArray
				};

				var timeSent = Date.now();

				var data = {model: model, offset: offset, outputSize: outputSize, inputSize: inputSize, count: count, startTime: startTime, timeTaken: timeTaken, timeSent: timeSent};

				// Send exported geom back to worker manager
				// Second parameter contains reference to typed arrays as transferable objects
				callback(data, [model.vertices.buffer, model.normals.buffer, model.uvs.buffer, model.faces.buffer]);
			}
		});

		var startTime = Date.now();

		// TODO: Work out why this still locks up the browser (amount of data being transferred back from the worker? Is it quicker to create objects in the browser?)
		// Solution: https://speakerdeck.com/mourner/high-performance-data-visualizations?slide=51
		// TODO: See if simply batching objects and creating them in the browser is less sluggish for the browser
		// TODO: Work out why not every feature is being returned in the promises (about 10–20 less than expected)
		// TODO: Come up with a method of chosing enough batches to avoid call stack exceeded errors (too many things to render)
		//       while not using too many batches to cause problems with small numbers of features (eg. a single feature)
		//  - Manhattan is a good test for this

		// Batch features
		// 4 batches or below seems to stop the model.faces typed array from converting to a normal array
		// Ideal 8 batches, if odd then subtract difference to make featuresPerBatch division clean
		var batchCount = (features.length < 100) ? 6 : 12;
		var batchDiff = features.length % batchCount;
		var batches = (features.length < batchCount) ? features.length : batchCount;

		var featuresPerBatch = Math.floor(features.length / batches);

		var batchPromises = [];

		for (var i = 0; i < batches; i++) {
			var startIndex = i * featuresPerBatch;
			var endIndex = startIndex + featuresPerBatch;
			
			// Add diff if at end of batch
			if (i === batches - 1) {
				endIndex += batchDiff;
			}

			var featuresBatch = features.slice(startIndex, endIndex);

			batchPromises.push(this.workerPromise(worker, featuresBatch));
		}

		var loader = new THREE.JSONLoader();
		var material = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});

		var self = this;

		Q.allSettled(batchPromises).then(function (promises) {
			var totalReceivedTime = 0;

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
					var model = data.model;
					var offset = data.offset;

					// Convert typed data back to arrays
					model.vertices = Array.apply( [], model.vertices );
					model.normals = Array.apply( [], model.normals );
					// Wrap UVs within an array
					// https://github.com/mrdoob/three.js/blob/master/examples/js/exporters/GeometryExporter.js#L231
					model.uvs = [ Array.apply( [], model.uvs ) ];
					model.faces = Array.apply( [], model.faces );

					totalReceivedTime += timeToArrive;

					VIZI.Log("Worker input sent in " + timeToSend + "ms");
					VIZI.Log("Worker input size is " + inputSize);
					VIZI.Log("Worker output received in " + timeToArrive + "ms");
					VIZI.Log("Worker output size is " + outputSize);
					VIZI.Log("Processed " + count + " features in " + timeTaken + "ms");

					// TODO: Stop this locking up the browser
					// No visible lock up at all when removed
					var geom = loader.parse(model);
					var mesh = new THREE.Mesh(geom.geometry, material);

					// Use previously calculated offset to return merged mesh to correct position
					// This allows frustum culling to work correctly
					mesh.position.x = -1 * offset.x;
					mesh.position.y = -1 * offset.y;
					mesh.position.z = -1 * offset.z;

					self.publish("addToScene", mesh);
				}
			});
			
			VIZI.Log("Average output received time is " + (totalReceivedTime / batches) + "ms");
			VIZI.Log("Overall worker time is " + (Date.now() - startTime) + "ms");
		}).done(function() {
			worker.close();
			deferred.resolve();
		});

		return deferred.promise;
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