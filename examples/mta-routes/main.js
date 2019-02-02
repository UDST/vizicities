// Manhattan
var coords = [40.739940, -73.988801];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// MTA routes
VIZI.geoJSONLayer('https://cdn.rawgit.com/robhawkes/0b08e6e60fd329bf2ef342c1122b9d43/raw/02954a741abd7d852c0cecb24a71252a74eac154/mta-routes-simplified.geojson', {
  output: true,
  interactive: false,
  style: function(feature) {
    var colour = (feature.properties.color) ? '#' + feature.properties.color : '#ffffff';

    return {
      lineColor: colour,
      lineWidth: 1.5,
      lineRenderOrder: 2
    };
  },
  attribution: '&copy; NYC MTA.'
}).addTo(world);
