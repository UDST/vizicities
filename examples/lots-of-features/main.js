// London
var coords = [51.505, -0.09];

var world = VIZI.world('world', {
  skybox: false,
  postProcessing: false
}).setView(coords);

// Add controls
VIZI.Controls.orbit().addTo(world);

// CartoDB basemap
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

// Census boundary polygons
VIZI.geoJSONLayer('https://cdn.rawgit.com/robhawkes/9a00cb9cfbd70174d856/raw/0d56960538909a844393f9f8e091608e3b978c7a/lsoa-simplified-merged-1.5%2525.geojson', {
  output: true,
  style: function(feature) {
    var colour = Math.random() * 0xffffff;

    return {
      color: colour,
      transparent: true,
      opacity: 0.4
    };
  }
}).addTo(world);
