# ViziCities 0.2.0 [Codename: Hamlet] [![Build Status](https://travis-ci.org/vizicities/vizicities.png?branch=0.2.0)](https://travis-ci.org/vizicities/vizicities)
__JavaScript 3D city and data visualisation platform__

[![](http://cl.ly/VS9H/Screen%20Shot%202014-05-10%20at%2016.04.54.png)](http://vizicities.com)

[ViziCities](http://vizicities.com) is a 3D city and data visualisation platform, powered by WebGL. Its purpose is to change the way you look at cities and the data contained within them. It is the brainchild of [Robin Hawkes](http://twitter.com/robhawkes) and [Peter Smart](http://twitter.com/petewsmart) &mdash; [get in touch](#contact--community) if you'd like to discuss the project in more detail.

**Important links**

* Find out more about what you can do with ViziCities [on the website](http://vizicities.com)
* Read [the documentation](http://dev.vizicities.com) and learn how to make something with ViziCities


## Quick install

Already know what you're doing? Awesome! ViziCities is [installable through Bower](http://bower.io/) so you can quickly get up and running.

```bash
$ bower install -p vizicities
```


## ViziCities examples

Here are some examples of ViziCities and how it's being used to help people.

* [Data journalism piece](http://interaktiv.morgenpost.de/tempelhofer-feld/) from the Beliner Morgenpost

**Built something with ViziCities?** [Get in touch](hello@vizicities.com), we'd love to showcase it here for everyone else to see and learn from.


## Changes since 0.1.0-pre

Numerous lessons were learnt after releasing 0.1.0-pre to the public, so much so that the decision was made to start from the beginning and get things right. 0.2.0 is the first attempt at that, a complete rewrite from the ground up. There are some pretty major differences!

### Blueprint API

Data input and visualisation output is now controlled by the [Blueprint API](http://dev.vizicities.com/v0.2.0/docs/using-the-blueprint-api). It's based on the concept of triggers and actions; much like Zapier or IFTTT, just instead for geographic data visualisation. It underpins the entire system for 0.2.0 and it completely changes the way you pull data into ViziCities and how you output it. A lot of hard work went into formulating and constructing it &mdash; we're incredibly proud of it!

In short, the Blueprint API has 3 parts; an input, an output and a mapping configuration. Neither the input nor the output know about each other or care about each others data structure. Everything is neatly brought together by a configuration object that describes which input to use, which output to use, as well as how and, more importantly, when to map the data between them.

It's an incredibly powerful and extensible system and we can't wait to see what you build with it. We're also looking forward to you contributing new inputs and outputs for others to benefit from.

By default, ViziCites now supports:

* Dynamic base maps using standard tile-server URLs (eg. Mapbox)
* GeoJSON input
* Basic KML input (only points so far)
* Collada output
* Choropleth (heatmap-like) output
* Dynamic building output from a vector tile source ([like Mapzen](https://github.com/mapzen/vector-datasource/wiki/Mapzen-Vector-Tile-Service))

Make sure to read the [documentation on the Blueprint API](http://dev.vizicities.com/v0.2.0/docs/using-the-blueprint-api) to learn how to use it.

### Easier setup and customisation

It's now much easier to set up and customise ViziCities. It was clear that 0.1.0-pre was far too prescriptive about how to use the system, so an effort has been made to allow customisation via options or overriding of default functionality. Combined with the Blueprint API, you now have full control over the data and visualisations you want to use.

A result of these changes means that setting up ViziCities is different to how you're used to from 0.1.0-pre. It's worth [reading the documentation](http://dev.vizicities.com) to see how much easier and better things have become.

### Vastly improved controls

The control system has received a lot of love since 0.1.0-pre and, aside from being smoother, it now allow you to use multiple methods of control at once. Right now there are just a few to choose from but this number will grow as new systems are contributed. It's also worth mentioning that the view angle caps in 0.1.0 have been removed &mdash; you can now look wherever you want!

### Other stuff

* More robust and flexible coordinate projection system
* Synchronous update and render loop
* Improved event system
* Simpler file and directory structure
* ViziCities Bower package
* Ready-to-use build of ViziCities in the `build` directory
* Testing across 100% of the core system
* Improved Grunt build process


## Known issues

ViziCities is not complete and there are many things that could be done better or simply need fixing. Here is a list of the major known issues:

* Data isn't cached right now
* There's no post processing (eg. ambient occlusion, etc)
* Lighting cannot be easily customised
* Performance can be improved in areas


## Getting started

Here are some step-by-step instructions on how to get up and running with your first visualisation, a 3D basemap. You can also [use this JSBin](http://jsbin.com/guqojerova/7/edit?html,js,output) to see the example running and play with the code.

The first step is to download the [latest ViziCities build files](https://github.com/vizicities/vizicities/tree/0.2.0/build) (JS & CSS).

Once you've done that then set up the basic HTML and include the ViziCities files:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>ViziCities - Basic Example</title>

  <style type="text/css">
    html, body {
      height: 100%;
      width: 100%;
    }
    
    #vizicities-viewport {
      height: 100%;
      width: 100%;
    }
  </style>

  <link rel="stylesheet" type="text/css" href="vizi.css">
</head>
<body>
  <div id="vizicities-viewport"></div>
  <script src="vizi.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

At this point you can initialise ViziCities in a new script (`main.js` in this example):

```javascript
var world = new VIZI.World({
  viewport: document.querySelector("#vizicities-viewport"),
  center: new VIZI.LatLon(51.50358, -0.01924)
});
```

And add some controls:

```javascript
var controls = new VIZI.ControlsMap(world.camera);
```

Let's add a basemap using the Blueprint API:

```javascript
var mapConfig = {
  input: {
    type: "BlueprintInputMapTiles",
    options: {
      tilePath: "https://a.tiles.mapbox.com/v3/examples.map-i86l3621/{z}/{x}/{y}@2x.png"
    }
  },
  output: {
    type: "BlueprintOutputImageTiles",
    options: {
      grids: [{
        zoom: 13,
        tilesPerDirection: 5,
        cullZoom: 11
      }]
    }
  },
  triggers: [{
    triggerObject: "output",
    triggerName: "initialised",
    triggerArguments: ["tiles"],
    actionObject: "input",
    actionName: "requestTiles",
    actionArguments: ["tiles"],
    actionOutput: {
      tiles: "tiles" // actionArg: triggerArg
    }
  }, {
    triggerObject: "output",
    triggerName: "gridUpdated",
    triggerArguments: ["tiles"],
    actionObject: "input",
    actionName: "requestTiles",
    actionArguments: ["tiles"],
    actionOutput: {
      tiles: "tiles" // actionArg: triggerArg
    }
  }, {
    triggerObject: "input",
    triggerName: "tileReceived",
    triggerArguments: ["image", "tile"],
    actionObject: "output",
    actionName: "outputImageTile",
    actionArguments: ["image", "tile"],
    actionOutput: {
      image: "image", // actionArg: triggerArg
      tile: "tile"
    }
  }]
};

var switchboardMap = new VIZI.BlueprintSwitchboard(mapConfig);
switchboardMap.addToWorld(world);
```

The last step is to to set up the update and render loop:

```javascript
var clock = new VIZI.Clock();

var update = function() {
  var delta = clock.getDelta();

  world.onTick(delta);
  world.render();

  window.requestAnimationFrame(update);
};

update();
```

Load the HTML page in a browser and enjoy your awesome 3D view of London!


## Using ViziCities? Please attribute it

While we love giving you the code to ViziCities for free, we also appreciate getting some recognition for all the hard work that's gone into it. A small, inconspicuous attribution is built into ViziCities and, while possible to remove, we'd really appreciate it if you left it in.

If you really need to remove the attribution, please [get in touch](hello@vizicities.com) and we can work out an alternative.


## Forked ViziCities 0.1.0-pre? Update your remote URL

The ViziCities repo has been moved away from Robin's personal account and now resides within the ViziCities organisation on GitHub. As a result of this, you'll need to update the remote URL if you've forked ViziCities in the past. 

It's pretty easy to do, [GitHub even wrote about how to do it](https://help.github.com/articles/changing-a-remote-s-url/). Running the following command within your ViziCities directory should be enough for most people:

```bash
$ git remote set-url origin git@github.com:vizicities/vizicities.git
```

## Getting involved

ViziCities can't happen without your help. We need people to submit bugs, suggest features, share how they're using the project, and contribute code. Sound like you? [Check out exactly how to get involved](https://github.com/vizicities/vizicities/blob/master/CONTRIBUTING.md).


## Contact & community

Communicate with the ViziCities team via email ([hello@vizicities.com](mailto:hello@vizicities.com)) and Twitter ([@ViziCities](http://twitter.com/ViziCities)). All other discussion should happen in the [ViziCities Google Group](https://groups.google.com/forum/#!forum/vizicities) or [relevant GitHub issues page](https://github.com/vizicities/vizicities/issues).


## Libraries used

* [Three.js](http://threejs.org) – WebGL
* [Proj4js](https://github.com/proj4js/proj4js) – Geographic coordinate projection
* [WildEmitter](https://github.com/HenrikJoreteg/wildemitter) - Event system
* [Underscore.js](http://underscorejs.org) – General JavaScript helpers
* [D3.js](http://d3js.org) – Data visualisation helpers
* [Operative](https://github.com/padolsey/operative) – Web Workers
* [Mocha](https://github.com/mochajs/mocha) - Testing framework
* [Chai](http://chaijs.com/) - Test assertions
* [Bower](http://bower.io/) – Packaging system
* [Grunt](http://gruntjs.com) – Build system


## Copyright & license

The MIT License (MIT)

Copyright (c) 2014 - ViziCities

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.