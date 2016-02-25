var world = VIZI.World('world', {
  skybox: true
}).setView([51.505, -0.09]);

// Add controls
VIZI.Controls.Orbit().addTo(world);

// // http://{s}.tile.osm.org/{z}/{x}/{y}.png
// // http://{s}.tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png
var imageTileLayer = VIZI.ImageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);

var topoJSONTileLayer = VIZI.TopoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson', {
  style: function(feature) {
    return {
      // color: (feature.properties.area > 10000) ? '#ff0000' : '#0000ff'
      color: '#ffffff'
    };
  },
  // filter: function(feature) {
  //   // Only show features with an area larger than 5000 (metres squared in
  //   // projected units)
  //   return feature.properties.area > 5000;
  // },
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
}).addTo(world);
