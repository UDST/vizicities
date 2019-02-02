// Manhattan
var coords = [40.739940, -73.988801];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// Leave a single CPU for the main browser thread
world.createWorkers(7).then(function() {
  console.log('Workers ready');

  // CartoDB basemap
  VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(world).then(function() {
    console.log('Added image tile layer to world');
  });;

  // Buildings from Mapzen
  VIZI.topoJSONTileLayer('https://tile.mapzen.com/mapzen/vector/v1/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
    workers: true,
    interactive: false,
    style: function(feature) {
      var height;

      if (feature.properties.height) {
        height = feature.properties.height;
      } else {
        height = 10 + Math.random() * 10;
      }

      return {
        height: height
      };
    },
    filter: function(feature) {
      // Don't show points
      return feature.geometry.type !== 'Point';
    },
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
  }).addTo(world).then(function() {
    console.log('Added TopoJSON layer to world');
  });
});
