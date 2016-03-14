// London
// var coords = [51.505, -0.09];

// Manhattan
var coords = [40.739940, -73.988801];

var world = VIZI.world('world', {
  skybox: true,
  postProcessing: true
}).setView(coords);

world._environment._skybox.setInclination(0.4);

// Add controls
VIZI.Controls.orbit().addTo(world);

// http://{s}.tile.osm.org/{z}/{x}/{y}.png
// http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png
var imageTileLayer = VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// var layer = VIZI.geoJSONLayer('http://vector.mapzen.com/osm/roads,pois,buildings/13/4088/2722.json', {
//   output: true,
//   interactive: true,
//   style: {
//     color: '#ff0000',
//     lineColor: '#0000ff',
//     lineRenderOrder: 1,
//     pointColor: '#00cc00'
//   },
//   pointGeometry: function(feature) {
//     var geometry = new THREE.SphereGeometry(2, 16, 16);
//     return geometry;
//   },
//   onEachFeature: function(feature, layer) {
//     layer.on('click', function(layer, point2d, point3d, intersects) {
//       console.log(layer, point2d, point3d, intersects);
//     });
//   }
// }).addTo(world);

// Building and roads from Mapzen (polygons and linestrings)
var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings,roads/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
  interactive: false,
  style: function(feature) {
    var height;

    if (feature.properties.height) {
      height = feature.properties.height;
    } else {
      height = 10 + Math.random() * 10;
    }

    return {
      height: height,
      lineColor: '#f7c616',
      lineWidth: 1,
      lineTransparent: true,
      lineOpacity: 0.2,
      lineBlending: THREE.AdditiveBlending,
      lineRenderOrder: 2
    };
  },
  filter: function(feature) {
    // Don't show points
    return feature.geometry.type !== 'Point';
  },
  // onEachFeature: function(feature, layer) {
  //   if (feature.geometry.type !== 'Polygon') {
  //     return;
  //   }
  //
  //   // Make polygons clickable
  //   layer.on('click', function(layer, point2d, point3d, intersects) {
  //     console.log(layer, point2d, point3d, intersects);
  //   });
  // },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);

// Just buildings from Mapzen (polygons)
// var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
//   style: function(feature) {
//     var height;
//
//     if (feature.properties.height) {
//       height = feature.properties.height;
//     } else {
//       height = 10 + Math.random() * 10;
//     }
//
//     return {
//       // color: (feature.properties.area > 10000) ? '#ff0000' : '#0000ff'
//       color: '#ffffff',
//       height: height
//     };
//   },
//   // filter: function(feature) {
//   //   // Only show features with an area larger than 5000 (metres squared in
//   //   // projected units)
//   //   return feature.properties.area > 5000;
//   // },
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
// }).addTo(world);

// // London Underground lines
// var geoJSONLayer = VIZI.geoJSONLayer('https://rawgit.com/robhawkes/4acb9d6a6a5f00a377e2/raw/30ae704a44e10f2e13fb7e956e80c3b22e8e7e81/tfl_lines.json', {
//   output: true,
//   interactive: true,
//   style: function(feature) {
//     var colour = feature.properties.lines[0].colour || '#ffffff';
//
//     return {
//       lineColor: colour,
//       // lineHeight: 20,
//       lineWidth: 3,
//       // lineTransparent: true,
//       // lineOpacity: 0.5,
//       // lineBlending: THREE.AdditiveBlending,
//       lineRenderOrder: 2
//     };
//   },
//   onEachFeature: function(feature, layer) {
//     layer.on('click', function(layer, point2d, point3d, intersects) {
//       console.log(layer, point2d, point3d, intersects);
//     });
//   },
//   attribution: '&copy; Transport for London.'
// }).addTo(world);

// Set up render debug stats
var rendererStats = new THREEx.RendererStats();
rendererStats.domElement.style.position = 'absolute';
rendererStats.domElement.style.left = '0px';
rendererStats.domElement.style.bottom = '0px';
document.body.appendChild(rendererStats.domElement);

world.on('postUpdate', function() {
  rendererStats.update(world._engine._renderer);
});
