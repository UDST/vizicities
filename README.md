# ViziCities <a href="https://magnum.travis-ci.com/robhawkes/vizicities" style="float: right"><img src="https://magnum.travis-ci.com/robhawkes/vizicities.png?token=RuiyUr4VxmxkBfNHP9YA&branch=master" title="Build status"></a>
__Bringing cities to life using the power of open data and the Web__

![](http://f.cl.ly/items/0r0u0t1c2g1o3U1y3r2x/vizicities-combined-ssao.jpg)

[ViziCities](http://vizicities.com) is a 3D city and data visualisation platform, powered by WebGL. Its purpose is to change the way you look at cities and the data contained within them. It is the brainchild of [Robin Hawkes](http://twitter.com/robhawkes) and [Peter Smart](http://twitter.com/petewsmart) &mdash; [get in touch](#contact--community) if you'd like to discuss the project with them in more detail.

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


## Current features

### 0.1.0

* Buildings
* Processing of geographic features into 3D objects using Web Workers


## Future features

* Dynamic city loading using OpenStreetMap data
* Tests and build status (TravisCI)


## Getting started

ViziCities is at an incredibly early stage right now, but it's usable if you know what you're doing. The following steps should get you up and running without too much trouble.

### Building ViziCities

To start off, you'll need to build ViziCities and get an up-to-date JavaScript file.

#### [Install Node.js & NPM](http://nodejs.org/)
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
```
cd /path/to/vizicities
grunt serve
```

Then open [http://127.0.0.1:8000/examples](http://127.0.0.1:8000/examples)

### Data formats

Visualising geographic features lies at the core of ViziCities. To make sure features render correctly you'll need to [use the correct data formats](https://github.com/robhawkes/vizicities/blob/master/DATA-FORMATTING.md).

### Using ViziCities

The idea is that you'll eventually be able to easily use your own data and visualise any city in the world. Until then, [a built in example](https://github.com/robhawkes/vizicities/tree/master/examples) has been provided to give you a taster of what ViziCities can do.


## Getting involved

ViziCities can't happen without your help. We need people to submit bugs, suggest features, share how they're using ViziCities, and contribute code to the project. Sound like you? [Check out exactly how to get involved](https://github.com/robhawkes/vizicities/blob/master/CONTRIBUTING.md).


## Contact & community

Communicate with the ViziCities team via email ([hello@vizicities.com](mailto:hello@vizicities.com)) and Twitter ([@ViziCities](http://twitter.com/ViziCities)). All other discussion should happen in the [ViziCities Google Group](https://groups.google.com/forum/#!forum/vizicities) or [relevant GitHub issues page](https://github.com/robhawkes/vizicities/issues).


## Contributors

[Robin Hawkes](http://twitter.com/robhawkes), [Peter Smart](http://twitter.com/petewsmart), [Matthew Harrison-Jones](http://twitter.com/matt_hojo)


## FAQ

### What happened to all the cool features I saw in the blog posts?

Over the past year [we've been producing experiments](http://rawkes.com/articles/vizicities-dev-diary-2) to prove that ViziCities is possible. These experiments, while working, were not robust and never intended for release. The version of ViziCities you see here is a solid foundation based on the lessons learnt from the previous experiments. It will eventually catch up with those experiments in regards to features.


## Copyright & license

The MIT License (MIT)

Copyright (c) 2014 - Robin Hawkes & Peter Smart

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.