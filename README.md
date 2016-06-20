# ViziCities (0.3)

A framework for 3D geospatial visualisation in the browser

![](http://cl.ly/3q0y3k133R1a/vizicities.jpg)


### Important links

* [Examples](#examples)
* [Getting started](#getting-started)
* [Attribution](#using-vizicities-please-attribute-it)
* [License](#license)


## Examples

* [Basic example](https://github.com/UDST/vizicities/tree/master/examples/basic) (2D basemap and 3D buildings) ([demo]())
* [Buildings coloured by height](https://github.com/UDST/vizicities/tree/master/examples/colour-by-height) ([demo]())
* [Basic GeoJSON example](https://github.com/UDST/vizicities/tree/master/examples/geojson) (points, linestrings and polygons) ([demo]())
* [Interactivity](https://github.com/UDST/vizicities/tree/master/examples/interactive) (clicking on features) ([demo]())
* [NYC MTA routes](https://github.com/UDST/vizicities/tree/master/examples/mta-routes) ([demo]())
* [Lots of GeoJSON](https://github.com/UDST/vizicities/tree/master/examples/lots-of-features) features ([demo]())
* [All the things](https://github.com/UDST/vizicities/tree/master/examples/all-the-things) (will test even the best computers) ([demo]())


## Main changes since 0.2

* Re-written from the ground up
* Complete overhaul of visual styling
* Massive performance improvements across the board
* Vastly simplified setup and API
* Better management and cleanup of memory
* Sophisticated quadtree-based grid system
* Physically-based lighting and materials (when enabled)
* Realistic day/night skybox (when enabled)
* Shadows based on position of sun in sky (when enabled)
* Built-in support for image-based tile endpoints
* Built-in support for GeoJSON and TopoJSON tile endpoints
* Built-in support for non-tiled GeoJSON and TopoJSON files
* Click events on individual features (when enabled)
* Internal caching of tile-based endpoints
* Easier to extend and add new functionality
* Easier to access and use general three.js features within ViziCities
* Separation of three.js from the core ViziCities codebase


## Getting started

The first step is to add the latest ViziCities distribution to your website:

```html
<script src="path/to/vizicities.min.js"></script>
<link rel="stylesheet" href="path/to/vizicities.css">
```

From there you will have access to the `VIZI` namespace which you can use to interact with and set up ViziCities.

You'll also want to add a HTML element that you want to contain your ViziCities visualisation:

```html
<div id="vizicities"></div>
```

It's worth adding some CSS to the page to size the ViziCities element correctly, in this case filling the entire page:

```css
* { margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden;}
#vizicities { height: 100%; }
```

The next step is to set up an instance of the ViziCities `World` component and position it in Manhattan:

```javascript
// Manhattan
var coords = [40.739940, -73.988801];
var world = VIZI.world('vizicities').setView(coords);
```

The first argument is the ID of the HTML element that you want to use as a container for the ViziCities visualisation.

Then add some controls:

```javascript
VIZI.Controls.orbit().addTo(world);
```

And a 2D basemap using tiles from CartoDB:

```javascript
VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(world);
```

At this point you can take a look at your handywork and should be able to see a 2D map focussed on the Manhattan area. You can move around using the mouse.

If you want to be a bit more adventurous then you can add 3D buildings using Mapzen vector tiles:

```javascript
VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
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
}).addTo(world);
```

Refresh the page and you'll see 3D buildings appear on top of the 2D basemap.

[Take a look at the various examples](https://github.com/UDST/vizicities/tree/master/examples) to see some more complex uses of ViziCities.


## Using ViziCities? Please attribute it

While we love giving you free and open access to the code for ViziCities, we also appreciate getting some recognition for all the hard work that's gone into it. A small attribution is built into ViziCities and, while possible to remove, we'd really appreciate it if you left it in.

If you absolutely have to remove the attribution then please get in touch and we can work something out.


## Consultancy work

Want to use ViziCities but don't want to customise it yourself? Or perhaps you have an idea that might benefit from ViziCities but aren't sure how to make it a reality? We offer consultancy related to ViziCities projects and would love to see how we can help you.

Interested? [Get in touch with us](hello@vizicities.com) and let's get talking.


## Contact us

Want to share an interesting use of ViziCities, or perhaps just have a question about it? You can communicate with the ViziCities team via email ([hello@vizicities.com](mailto:hello@vizicities.com)) and Twitter ([@ViziCities](http://twitter.com/ViziCities)).


## License

ViziCities is copyright [UrbanSim Inc.](http://www.urbansim.com/) and uses the fair and simple BSD-3 license. Want to see it in full? No problem, [you can read it here](https://github.com/UDST/vizicities/blob/master/LICENSE).
