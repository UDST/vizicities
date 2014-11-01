// TODO: Automatically update/install bower components on build
// - https://github.com/rse/grunt-bower-install-simple
// TODO: Smash D3 into only the neccessary components
// - https://github.com/mbostock/smash/wiki
// - https://github.com/cvisco/grunt-smash
// TODO: Add code style tests
// - https://github.com/jscs-dev/node-jscs

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      vizicities: {
        options: {
          banner: "/*! ViziCities - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */\n",
          beautify : {
            ascii_only : true
          }
        },
        files: {
          "build/vizi.min.js": ["build/vizi.js"]
        }
      },
      vizicities_worker: {
        options: {
          banner: "/*! ViziCities - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */\n",
          beautify : {
            ascii_only : true
          }
        },
        files: {
          "build/vizi-worker.min.js": ["build/vizi-worker.js"]
        }
      }
    },
    concat: {
      vizicities: {
        src: ["src/Vizi.js", "src/Core/*.js", "src/Geo/CRS.js", "src/WebGL/*.js", "src/Controls/Controls.js", "src/**/*.js"],
        dest: "build/vizi.js"
      },
      bower: {
        options: {
          stripBanners: true,
          banner: "/*! ViziCities - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */\n"
        },
        src: ["bower_components/**/*min.js", "bower_components/proj4/dist/proj4-src.js", "bower_components/wildemitter/wildemitter-bare.js", "build/vizi.js"],
        dest: "build/vizi.js"
      },
      bower_min: {
        src: ["bower_components/**/*min.js", "bower_components/proj4/dist/proj4.js", "bower_components/wildemitter/wildemitter-bare.js", "build/vizi.min.js"],
        dest: "build/vizi.min.js"
      },
      vizicities_worker: {
        src: ["src/Vizi.js", "src/Geo/CRS.js", "src/Geo/**/*.js", "src/Geometry/**/*.js"],
        dest: "build/vizi-worker.js"
      },
      bower_worker: {
        options: {
          stripBanners: true,
          banner: "/*! ViziCities - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */\n"
        },
        src: ["bower_components/underscore/*min.js", "bower_components/threejs/**/*min.js", "bower_components/proj4/dist/proj4-src.js", "build/vizi-worker.js"],
        dest: "build/vizi-worker.js"
      },
      bower_worker_min: {
        src: ["bower_components/underscore/*min.js", "bower_components/threejs/**/*min.js", "bower_components/proj4/dist/proj4-src.js", "build/vizi-worker.min.js"],
        dest: "build/vizi-worker.min.js"
      },
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
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-mocha-slimer");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["test"]);

  // Testing
  grunt.registerTask("test", ["jshint", "mocha_slimer"]);

  // Build
  grunt.registerTask("build", ["concat:vizicities", "uglify:vizicities", "concat:bower", "concat:bower_min"]);
  grunt.registerTask("build_worker", ["concat:vizicities_worker", "uglify:vizicities_worker", "concat:bower_worker", "concat:bower_worker_min"]);
};
