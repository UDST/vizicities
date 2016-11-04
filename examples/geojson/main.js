// Manhattan
var coords = [40.722282152, -73.992919922];

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

// Mapzen GeoJSON tile including points, linestrings and polygons
VIZI.geoJSONLayer('https://tile.mapzen.com/mapzen/vector/v1/roads,pois,buildings/14/4824/6159.json', {
  output: true,
  style: {
    color: '#ff0000',
    outline: true,
    outlineColor: '#580000',
    lineColor: '#0000ff',
    lineRenderOrder: 1,
    pointColor: '#00cc00'
  },
  pointGeometry: function(feature) {
    var geometry = new THREE.SphereGeometry(2, 16, 16);
    return geometry;
  }
}).addTo(world);
