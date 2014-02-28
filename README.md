# ViziCities [0.1.0-pre] [![Build Status](https://travis-ci.org/robhawkes/vizicities.png?branch=master)](https://travis-ci.org/robhawkes/vizicities)
__Bringing cities to life using the power of open data and the Web__

![http://vizicities.apps.rawk.es](http://f.cl.ly/items/2q1X082f3q0Z1k3R1r3j/Screen%20Shot%202014-02-15%20at%2017.00.54.png)

[ViziCities](http://vizicities.com) is a 3D city and data visualisation platform, powered by WebGL. Its purpose is to change the way you look at cities and the data contained within them. It is the brainchild of [Robin Hawkes](http://twitter.com/robhawkes) and [Peter Smart](http://twitter.com/petewsmart) &mdash; [get in touch](#contact--community) if you'd like to discuss the project with them in more detail.

### Demonstration

Here's a [demo of ViziCities](http://vizicities.apps.rawk.es) so you can have a play without having to build it for yourself. Cool, ey?

### What does it do?

ViziCities aims to combine data visualisation with a 3D representation of a city to provide a better understanding what's going on. It's a powerful new way of looking at and understanding urban areas. 

Aside from seeing a city in 3D, here are some of the others things you'll have the power to do:

* View public transport (eg. buses, trains, planes) [flowing around a city in realtime](https://vimeo.com/67869313)
* Use vehicles powered by artificial intelligence to [perform realistic traffic simulation](https://vimeo.com/66512057)
* Visualise [social data in realtime](https://vimeo.com/67872925)
* Overlay historic and static data (eg. census data) using traditional techniques (eg. heatmaps)
* And much more&hellip;


### Further information

In 2013, Peter and Robin [spoke in detail about ViziCities](https://vimeo.com/66495599) at Front Trends.

[![](https://secure-b.vimeocdn.com/ts/437/939/437939443_640.jpg)](https://vimeo.com/66495599)

For more information you should start here:

* [ViziCities website](http://vizicities.com)
* [ViziCities announcement article](http://rawkes.com/articles/vizicities-dev-diary-1)
* [Videos of various ViziCities experiments](https://vimeo.com/channels/vizicities)

## Features

ViziCities is currently in a pre-alpha state, meaning things are changing rapidly and you should expect bugs.

### 0.1.0-pre

* Load anywhere in the world using coordinates in the URL (#lat,lon) ([like Oslo](http://vizicities.apps.rawk.es/demo.html#59.913869,10.752245))
* Buildings, water (rivers, canals, etc), and green areas (parks, grass, forest, etc)
* Dynamic data loading using the OpenStreetMap Overpass API (literally the entire world)
* Accurate heights based on OpenStreetMap tags, if available
* Loading of data using a TMS grid system
* Caching of loaded grid data to prevent duplicated requests
* Processing of geographic features into 3D objects using Web Workers
* Controls (zoom, pan and orbit)
* Basic tests and build status using Travis CI
* Grunt-based development environment

### Future features

* 3D road network
* Static data visualisation layers (heatmaps, bar charts, etc)
* Live data visualisation (tweets, public transport, etc)
* AI vehicles and pedestrians
* Local weather
* Post processing (DoF, SSAO, etc)
* 3D terrain
* And much more&hellip;

## Known issues

ViziCities is not complete and there are likely many things that could be done better or simply need fixing. Here is a list of the major known issues:

* Not all features from OpenStreetMap are being displayed (particularly relations)
* Performance of tile-based loading mechanism is poor
* Web Worker processing isn't efficient due to the way scripts and data are loaded
* Caching is reset on page reload
* XHR requests for data can take some time, causing visible delay
* Performance issues with dense cities (eg. NYC)

## Getting started

ViziCities is at an incredibly early stage right now, but it's usable if you know what you're doing. The following steps should get you up and running without too much trouble.

### Building ViziCities

To start off, you'll need to build ViziCities and get an up-to-date JavaScript file.

#### Clone the ViziCities repo

```
git clone https://github.com/robhawkes/vizicities.git vizicities
```

#### [Install Node.js & NPM](http://nodejs.org/)
If you haven't already, [install Homebrew](http://brew.sh/) before going any further.

```
brew install node
```
#### [Install the Grunt CLI](http://gruntjs.com/getting-started)

```
npm install -g grunt-cli
```

#### Install the NPM packages
```
cd /path/to/vizicities
npm install
```

#### Build ViziCities and watch for file changes using Grunt
```
cd /path/to/vizicities
grunt dev
```

#### Serve examples using Grunt
Open a new terminal tab or window, then type:

```
cd /path/to/vizicities
grunt serve
```

Then open [http://localhost:8000/examples](http://localhost:8000/examples)


### Using ViziCities

Use the [built in example](https://github.com/robhawkes/vizicities/tree/master/examples) to get an idea of what ViziCities can do. Change the coordinates to load a new part of the world (anywhere you want).


## Getting involved

ViziCities can't happen without your help. We need people to submit bugs, suggest features, share how they're using the project, and contribute code. Sound like you? [Check out exactly how to get involved](https://github.com/robhawkes/vizicities/blob/master/CONTRIBUTING.md).

### Suggestions

There are a couple of things in particular that need your help:

* Styling improvements (play with the lighting and materials, add shaders, make things look pretty)
* Performance improvements (particularly with feature processing, generation and rendering)


## Contact & community

Communicate with the ViziCities team via email ([hello@vizicities.com](mailto:hello@vizicities.com)) and Twitter ([@ViziCities](http://twitter.com/ViziCities)). All other discussion should happen in the [ViziCities Google Group](https://groups.google.com/forum/#!forum/vizicities), IRC (#vizicities on Freenode) or [relevant GitHub issues page](https://github.com/robhawkes/vizicities/issues).


## Contributors

[Robin Hawkes](http://twitter.com/robhawkes), [Peter Smart](http://twitter.com/petewsmart), [Matthew Harrison-Jones](http://twitter.com/matt_hojo)


## Libraries and resources used

* [OpenStreetMap](http://openstreetmap.org) – Map data
* [Three.js](http://threejs.org) – WebGL
* [D3.js](http://d3js.org) – Geographic coordinate conversion
* [Underscore.js](http://underscorejs.org) – General helpers
* [Q](https://github.com/kriskowal/q) – Promises
* [Throat](https://github.com/ForbesLindesay/throat) - Limiting concurrency
* [Catiline](http://catilinejs.com) – Web Workers
* [Dat.gui](https://code.google.com/p/dat-gui) – Debug control panel
* [FPSMeter](http://darsa.in/fpsmeter) – FPS meter
* [Moment.js](http://momentjs.com) – Date processing
* [Simplify.js](http://mourner.github.io/simplify-js) – Polygon simplification
* [Grunt](http://gruntjs.com) – Build system


## FAQ

### What happened to all the cool features I saw in the blog posts?

Over the past year [we've been producing experiments](http://rawkes.com/articles/vizicities-dev-diary-2) to prove that ViziCities is possible. These experiments, while working, were not robust and never intended for release. The version of ViziCities you see here is a solid foundation based on the lessons learnt from the previous experiments. It will eventually catch up with those experiments in regards to features.

### What are the controls?

* Zoom using the mouse wheel
* Pan using the left mouse button
* Orbit by holding shift and using the left mouse button, or using the middle mouse button


## Copyright & license

The MIT License (MIT)

Copyright (c) 2014 - Robin Hawkes & Peter Smart

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.