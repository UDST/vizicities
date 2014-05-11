/* globals window, _, VIZI, THREE, Q, d3, cw */
(function() {
  "use strict";

  VIZI.ObjectManagerOverpass = function() {
    _.extend(this, VIZI.Mediator);

    VIZI.ObjectManager.call(this);

    this.combinedMaterial = new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors});
    this.combinedObjects = undefined;
  };

  VIZI.ObjectManagerOverpass.prototype = Object.create( VIZI.ObjectManager.prototype );

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

  VIZI.ObjectManagerOverpass.prototype.processFeaturesWorker = function(features, pixelsPerMeter) {
    VIZI.Log("Processing features using worker");

    var deferred = Q.defer();

    // TODO: See if initialising this before calling processFeaturesWorker speeds things up
    var worker = cw({
      process: function(input, callback) {
        importScripts("worker/three.min.js", "worker/GeometryExporter.js", "worker/underscore.min.js");

        var features = input[0];
        var pixelsPerMeter = input[1];

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

        var createExtrudedObject = function(feature) {
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

          // Check if this shape only has four points, allowing us
          // to do roof shortcuts
          if (shape.curves.length === 4) {

            // Check if it's a gabled roof
            if (properties.roof.shape === "gabled") {

              // Roof geometry
              var roof = new THREE.Geometry();

              // Grab the points from the shape
              var points = shape.extractPoints();

              // Figure out the roof height
              var roofHeight = -(height / 2);

              // Figure out the center points
              var center1 = points.shape[0].clone().lerp(points.shape[1], 0.5);
              var center2 = points.shape[2].clone().lerp(points.shape[3], 0.5);

              // Create the vertices
              var vertices = [
                new THREE.Vector3(points.shape[0].x, points.shape[0].y, 0),
                new THREE.Vector3(center1.x,         center1.y,         roofHeight),
                new THREE.Vector3(points.shape[1].x, points.shape[1].y, 0),
                new THREE.Vector3(points.shape[2].x, points.shape[2].y, 0),
                new THREE.Vector3(center2.x,         center2.y,         roofHeight),
                new THREE.Vector3(points.shape[3].x, points.shape[3].y, 0),
              ];

              // Ensure the points are clockwise
              var clockwise = THREE.Shape.Utils.isClockWise(vertices);
              if (!clockwise) {
                vertices = vertices.reverse();
              }

              roof.vertices = vertices;

              // Side 1
              roof.faces.push(new THREE.Face3(3, 4, 1));
              roof.faces.push(new THREE.Face3(3, 1, 2));

              // Front/Back
              roof.faces.push(new THREE.Face3(4, 3, 5));
              roof.faces.push(new THREE.Face3(1, 0, 2));

              // Side 2
              roof.faces.push(new THREE.Face3(0, 1, 4));
              roof.faces.push(new THREE.Face3(0, 4, 5));

              // We aren't generating actual UVs, but the exporter needs
              // some placeholder points
              _.each(roof.faces, function() {
                roof.faceVertexUvs[0].push([false, false, false]);
              });

              // Add to the building geometry
              THREE.GeometryUtils.merge(geom, roof);
            }
          }

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

          return mesh;
        };

        // START: http://bai.dev.supcrit.com/scripts/engine/things/road.js

        var thickness = 0.01 * pixelsPerMeter;
        var width = 4 * pixelsPerMeter;

        // var thickness = 1;
        // var width = 10;
        
        var roadpoints = [
          new THREE.Vector2(-thickness, width/2),
          new THREE.Vector2(-thickness, -width/2),
          new THREE.Vector2(thickness, -width/2),
          new THREE.Vector2(thickness, width/2),
          new THREE.Vector2(-thickness, width/2)
        ];

        var roadshape = new THREE.Shape(roadpoints);

        // END: http://bai.dev.supcrit.com/scripts/engine/things/road.js

        var createRoadObject = function(feature) {
          var properties = feature.properties;

          // Skip non-roads for simplicity
          var type = properties.highway;
          if (type === "footway" || type === "pedestrian" || type === "steps" || type === "cycleway") {
            return;
          }

          var layer = Number(properties.layer);
          
          var featureColour = new THREE.Color(0x999999);
          // switch (layer) {
          //   case -1:
          //     featureColour = new THREE.Color(0xFF0000);
          //     break;
          //   case 0:
          //     featureColour = new THREE.Color(0x00FF00);
          //     break;
          //   case 1:
          //     featureColour = new THREE.Color(0x0000FF);
          //     break;
          // }

          var offset = [];
          var splinePoints = [];
          var coords = feature.coordinates;
          _.each(coords, function(coord, index) {
            if (offset.length === 0) {
              offset[0] = -1 * coord[0];
              offset[1] = -1 * coord[1];
            }

            // splinePoints.push(new THREE.Vector3(coord[0] + offset[0], (layer) ? 5 + layer*10 : 5, coord[1] + offset[1]));
            splinePoints.push(new THREE.Vector3(coord[0] + offset[0], thickness/2, coord[1] + offset[1]));
          });

          var splinePath = new THREE.SplineCurve3(splinePoints);

          // START: http://bai.dev.supcrit.com/scripts/engine/things/road.js

          // Segments on each spline
          // console.log(Math.max(10, Math.floor(splinePath.getLength() * 0.05)));
          var steps = Math.max(10, Math.floor(splinePath.getLength() * 0.05));
          var frames = {tangents: [], normals: [], binormals: []};
          var normal = new THREE.Vector3(0,1,0);

          for ( var k = 0; k < steps + 1; k++ ) {
            var u = k / steps;
            var tangent = splinePath.getTangentAt( u ).normalize();
            frames.tangents[k] = tangent;
            frames.normals[k] = normal;
            frames.binormals[k] = tangent.clone().cross(normal);
          }

          var uvgenerator = {
            generateTopUV: THREE.ExtrudeGeometry.WorldUVGenerator.generateTopUV,
            generateBottomUV: THREE.ExtrudeGeometry.WorldUVGenerator.generateBottomUV,
            generateSideWallUV:  THREE.ExtrudeGeometry.WorldUVGenerator.generateSideWallUV,
            foo: function(geometry, extrudedShape, wallCountour, extrudeOptions, indexA, indexB, indexC, indexD, stepIndex, stepsLength, contourIndex1, contourIndex2) {
              var v2 = new THREE.Vector2(0,1);
              return [v2, v2, v2, v2];
            }
          };

          var geom = new THREE.ExtrudeGeometry(roadshape, { extrudePath: splinePath, frames: frames, steps: steps, closed: false, UVGenerator: uvgenerator});
          geom.computeVertexNormals();

          // var elementColour = (properties.colour) ? new THREE.Color(properties.colour) : colour;
          // applyVertexColors( geom, elementColour );

          applyVertexColors( geom, featureColour );

          // END: http://bai.dev.supcrit.com/scripts/engine/things/road.js

          geom.computeFaceNormals();
          var mesh = new THREE.Mesh(geom);

          // Offset
          mesh.position.x = -1 * offset[0];
          mesh.position.z = -1 * offset[1];

          return mesh;
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

          var mesh;
          if (properties["highway"]) {
            mesh = createRoadObject(feature);
          } else {
            mesh = createExtrudedObject(feature);
          }

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

      batchPromises.push(this.workerPromise(worker, featuresBatch, pixelsPerMeter));
    }

    var loader = new THREE.JSONLoader();
    var material = new THREE.MeshLambertMaterial({
      vertexColors: THREE.VertexColors,
      ambient: 0xffffff,
      emissive: 0xcccccc,
      shading: THREE.FlatShading,
    });

    var self = this;

    var combinedMesh;
    Q.allSettled(batchPromises).then(function (promises) {
      var totalReceivedTime = 0;

      var combinedGeom = new THREE.Geometry();

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
          
          // Keep getting a "Maximum call stack size exceeded" error here
          //model.faces = Array.apply( [], model.faces );
          var faces = [];
          _.each(model.faces, function(face) {
            faces.push(face);
          });

          model.faces = faces;

          totalReceivedTime += timeToArrive;

          VIZI.Log("Worker input sent in " + timeToSend + "ms");
          VIZI.Log("Worker input size is " + inputSize);
          VIZI.Log("Worker output received in " + timeToArrive + "ms");
          VIZI.Log("Worker output size is " + outputSize);
          VIZI.Log("Processed " + count + " features in " + timeTaken + "ms");

          // TODO: Stop this locking up the browser
          // No visible lock up at all when removed
          var geom = loader.parse(model);
          // var mesh = new THREE.Mesh(geom.geometry, material);
          var mesh = new THREE.Mesh(geom.geometry);

          // Use previously calculated offset to return merged mesh to correct position
          // This allows frustum culling to work correctly
          mesh.position.x = -1 * offset.x;
          mesh.position.y = -1 * offset.y;
          mesh.position.z = -1 * offset.z;

          THREE.GeometryUtils.merge(combinedGeom, mesh);

          // self.publish("addToScene", mesh);
        }
      });

      var offset = THREE.GeometryUtils.center( combinedGeom );

      combinedMesh = new THREE.Mesh(combinedGeom, material);

      // http://stackoverflow.com/questions/20153705/three-js-wireframe-material-all-polygons-vs-just-edges
      // TODO: Fix the performance drop that this causes (effectively double the objects in the scene)
      // - Looks like the outline counts as "points" in renderer.info
      // - Also looks like they aren't being frustum culled for some reason
      // https://github.com/mrdoob/three.js/blob/master/src/extras/helpers/EdgesHelper.js
      if (VIZI.ENABLE_OUTLINES) {
        var outline = new THREE.EdgesHelper( combinedMesh, 0x222222 );
        outline.material.linewidth = 1;
        combinedMesh.add(outline);
      }

      // Use previously calculated offset to return merged mesh to correct position
      // This allows frustum culling to work correctly
      combinedMesh.position.x = -1 * offset.x;
      combinedMesh.position.y = -1 * offset.y;
      combinedMesh.position.z = -1 * offset.z;

      self.publish("addToScene", combinedMesh);

      VIZI.Log("Average output received time is " + (totalReceivedTime / batches) + "ms");
      VIZI.Log("Overall worker time is " + (Date.now() - startTime) + "ms");
    }).done(function() {
      worker.close();
      deferred.resolve(combinedMesh);
    });

    return deferred.promise;
  };
}());
