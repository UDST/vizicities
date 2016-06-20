// London
var coords = [51.5052, -0.0308];

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

// Chroma scale for height-based colours
var colourScale = chroma.scale('YlOrBr').domain([0,350]);

// Census boundary polygons
VIZI.geoJSONLayer('https://cdn.rawgit.com/robhawkes/5d6efd288b24e698783a/raw/dcf5ac06b40d7f0100cffd4af220865860e68b82/census.json', {
  output: true,
  interactive: true,
  style: function(feature) {
    var value = feature.properties.POPDEN;
    var colour = colourScale(value).hex();

    return {
      color: colour
    };
  },
  onEachFeature: function(feature, layer) {
    layer.on('click', function(layer, point2d, point3d, intersects) {
      var id = layer.feature.properties.LAD11CD;
      var value = layer.feature.properties.POPDEN;

      console.log(id + ': ' + value, layer, point2d, point3d, intersects);
    });
  }
}).addTo(world);
