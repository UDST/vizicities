// TODO: Automatically update/install bower components on build
// - https://github.com/rse/grunt-bower-install-simple
// TODO: Smash D3 into only the neccessary components
// - https://github.com/mbostock/smash/wiki
// - https://github.com/cvisco/grunt-smash
// TODO: Add code style tests
// - https://github.com/jscs-dev/node-jscs

module.exports = function(grunt) {

  // Configure dependencies that are embedded into the build
  var dependencies = [
    "bower_components/d3/d3.js",
    "bower_components/operative/dist/operative.js",
    "bower_components/proj4/dist/proj4-src.js",
    "bower_components/underscore/underscore.js",
    "bower_components/wildemitter/wildemitter-bare.js",
  ];
  var dependenciesWorker = [
    "bower_components/proj4/dist/proj4-src.js",
    "bower_components/underscore/underscore.js",
  ];

  // grunt command line flag '--no-threejs' to skip embedding three.js
  // Note that vizi-worker.js will always get three embedded to it.
  // It is executed inside  a WebWorker so it wont interfere if
  // the app has selected a different revision of three.js.
  var includeThreeJs = !grunt.option("no-threejs");
  if (includeThreeJs)
    dependencies.push("bower_components/threejs/build/three.js");
  dependenciesWorker.push("bower_components/threejs/build/three.js");

  // Banner
  var viziBanner = "/*! ViziCities - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> */\n";

  // Configure tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      build : ["build/dependencies*"]
    },

    concat: {
      vizicities: {
        files: {
          "build/vizi.js"        : ["src/Vizi.js", "src/Core/*.js", "src/Geo/CRS.js", "src/WebGL/*.js", "src/Controls/Controls.js", "src/**/*.js"],
          "build/vizi-worker.js" : ["src/Vizi.js", "src/Geo/CRS.js", "src/Geo/**/*.js", "src/Geometry/**/*.js"]
        }
      },
      dependencies: {
        files: {
          "build/dependencies.js"        : dependencies,
          "build/dependencies-worker.js" : dependenciesWorker,
        }
      },
      build: {
        options: { stripBanners: false, banner: viziBanner },
        files: {
          "build/vizi.js"        : ["build/dependencies.js", "build/vizi.js"],
          "build/vizi-worker.js" : ["build/dependencies-worker.js", "build/vizi-worker.js"]
        }
      },
      build_min: {
        options: { stripBanners: true, banner: viziBanner },
        files: {
          "build/vizi.min.js"        : ["build/dependencies.min.js", "build/vizi.min.js"],
          "build/vizi-worker.min.js" : ["build/dependencies-worker.min.js", "build/vizi-worker.min.js"]
        }
      }
    },

    uglify: {
      options: { beautify : { ascii_only : true } },
      vizicities: {
        files: { 
          "build/vizi.min.js"        : ["build/vizi.js"],
          "build/vizi-worker.min.js" : ["build/vizi-worker.js"]
        }
      },
      dependencies: {
        files: { 
          "build/dependencies.min.js"        : ["build/dependencies.js"],
          "build/dependencies-worker.min.js" : ["build/dependencies-worker.js"]
        }
      }
    },

    jshint: {
      options: {
        force: true,
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false,
          importScripts: true
        },
        ignores: ["src/vendor/**"]
      },
      files: ["src/**"]
    },

    mocha_slimer: {
      options: {
        xvfb: (process.env.TRAVIS === "true"),
        reporter: "Dot",
        timeout: 60000,
        run: true
      },
      all: {
        options: {
          ui: "bdd",
          reporter: "Spec",
          run: true
        },
        src: ["test/*.html"]
      }
    },

    connect: {
      dev: {
        options: {
          port: 8989,
          keepalive: true,
          base: "./",
          open: (grunt.option("no-browser") ? false : "http://localhost:8989/test")
        }
      }
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-mocha-slimer");

  // Default task(s).
  grunt.registerTask("default", ["test"]);

  // Testing
  // TODO: If tests keep failing randomly on Travis then move back to Phantom
  // - Just means absolute zero chance of WebGL testing then
  grunt.registerTask("test", [
    "jshint",
    "mocha_slimer"
  ]);

  // Development
  grunt.registerTask("dev", [
    "connect:dev"
  ]);

  // Build
  grunt.registerTask("build", [
    "concat:vizicities",
    "concat:dependencies",
    "uglify:vizicities",
    "uglify:dependencies",
    "concat:build",
    "concat:build_min",
    "clean:build"
  ]);
};
