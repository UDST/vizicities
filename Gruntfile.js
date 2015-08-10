'use strict';

var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! ViziCities <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify : {
					ascii_only : true
				}
			},
			build: {
				src: 'build/vizi.js',
				dest: 'build/vizi.min.js'
			}
		},
		concat: {
			options: {},
			dist: {
				// src: ['src/shared/vendor/underscore.js', 'src/shared/vendor/three.js', 'src/client/*'],
				src: [
					'src/shared/vendor/underscore.js',
					'src/shared/vendor/q.js',
					'src/shared/vendor/three/three.js',
					'src/shared/vendor/three/ColorConverter.js',
					'src/shared/vendor/d3.js',
					'src/shared/vendor/catiline.js',
					'src/shared/vendor/dat.gui.js',
					'src/shared/vendor/fpsmeter.js',
					'src/shared/vendor/moment.js',
					'src/shared/vendor/simplify.js',
					'src/shared/vendor/throat.js',
					'src/client/Vizi.js',
					'src/client/Log.js',
					'src/client/Mediator.js',
					'src/client/Animation.js',
					'src/client/debug/Dat.js',
					'src/client/debug/FPS.js',
					'src/client/debug/RendererInfo.js',
					'src/client/ui/Loading.js',
					'src/client/ui/Attribution.js',
					'src/client/ui/OSMEdit.js',
					'src/client/Geo.js',
					'src/client/City.js',
					'src/client/Loop.js',
					'src/client/DOMEvents.js',
					'src/client/webgl/WebGL.js',
					'src/client/webgl/Scene.js',
					'src/client/webgl/Camera.js',
					'src/client/webgl/Renderer.js',
					'src/client/objects/ObjectManager.js',
					'src/client/objects/ObjectManagerOverpass.js',
					'src/client/objects/Object.js',
					'src/client/objects/Floor.js',
					'src/client/data/Data.js',
					'src/client/data/DataOverpass.js',
					'src/client/Grid.js',
					'src/client/controls/Mouse.js',
					'src/client/controls/Keyboard.js',
					'src/client/controls/Controls.js',
					'src/client/Cache.js'
				],
				dest: 'build/vizi.js'
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
				ignores: ['src/shared/vendor/**']
			},
			files: [ 'src/**' ],
			grunt: {
				options: {
					node: true
				},
				files: [{src: 'Gruntfile.js'}]
			}
		},
		mocha_phantomjs: {
			files: ['test/*.html']
		},
		watch: {
			main: {
				files: [ 'Gruntfile.js', 'src/**', 'examples/**' ],
				tasks: 'default',
				options: {
					livereload: 35730
				}
			}
		},
		connect: {
			server: {
				options: {
					port: port,
					// change hostname to 0.0.0.0 to open it up
					hostname: 'localhost',
					base: '.',
					keepalive: true,
					debug: true
				}
			}
		},
		notify: {
			watch: {
				options: {
					// title: 'Watching files',  // optional
					message: 'Watching for changes' //required
				}
			},
			finish: {
				options: {
					// title: 'Watching files',  // optional
					message: 'Build complete' //required
				}
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5,
				title: "ViziCities"
			}
		}
	});

	loadGruntTasks(grunt);

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'notify:finish']);

	// Serve examples locally
	grunt.registerTask('serve', ['connect']);

	// Build files and refresh content on file changes
	grunt.registerTask('dev', ['default', 'notify:watch', 'watch']);

	// Minify
	grunt.registerTask('min', ['jshint', 'concat', 'uglify', 'notify:finish']);

	// Run tests
	grunt.registerTask('test', ['jshint', 'mocha_phantomjs']);
	
	grunt.task.run('notify_hooks');
};
