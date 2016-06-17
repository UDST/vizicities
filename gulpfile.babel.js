import gulp  from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del  from 'del';
import glob  from 'glob';
import path  from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import source  from 'vinyl-source-stream';
import { Instrumenter } from 'isparta';

import manifest  from './package.json';

// TODO: Re-implement build process to utilise proper caching
// TODO: Consider bundling three.js within the final build, or at least having
// a different build step for an all-in-one file

// Load all of our Gulp plugins
const $ = loadPlugins();

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

// Remove a directory
function _clean(dir, done) {
  del([dir], done);
}

function cleanDist(done) {
  _clean(destinationFolder, done);
}

function cleanTmp(done) {
  _clean('tmp', done);
}

function onError() {
  $.util.beep();
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.jscs())
    .pipe($.jscs.reporter('fail'))
    .on('error', onError);
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function build() {
  return gulp.src(path.join('src', config.entryFileName + '.js'))
    .pipe($.plumber())
    .pipe(webpackStream({
      output: {
        filename: exportFileName + '.js',
        libraryTarget: 'umd',
        library: config.mainVarName
      },
      externals: {
        // Proxy the global THREE variable to require('three')
        'three': 'THREE',
        // Proxy the global THREE variable to require('TweenLite')
        'TweenLite': 'TweenLite',
        // Proxy the global THREE variable to require('TweenMax')
        'TweenMax': 'TweenMax',
        // Proxy the global THREE variable to require('TimelineLite')
        'TimelineLite': 'TimelineLite',
        // Proxy the global THREE variable to require('TimelineMax')
        'TimelineMax': 'TimelineMax',
        // Proxy the global proj4 variable to require('proj4')
        'proj4': 'proj4'
      },
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(destinationFolder))
    .pipe($.filter(['*', '!**/*.js.map']))
    .pipe($.rename(exportFileName + '.min.js'))
    .pipe($.sourcemaps.init({ loadMaps: true }))

    // Don't mangle class names so we can use them in the console
    // jscs:disable
    // .pipe($.uglify({ mangle: { keep_fnames: true }}))
    // jscs:enable

    // Using the mangle option above breaks the sourcemap for some reason
    .pipe($.uglify())

    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(destinationFolder))
    .pipe($.livereload());
}

function moveCSS() {
  return gulp.src(path.join('src', config.entryFileName + '.css'))
    .pipe(gulp.dest(destinationFolder));
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe($.mocha({
      reporter: 'dot',
      globals: config.mochaGlobals,
      ignoreLeaks: false
    }));
}

function _registerBabel() {
  require('babel-core/register');
}

function test() {
  _registerBabel();
  return _mocha();
}

function coverage(done) {
  _registerBabel();
  gulp.src(['src/**/*.js'])
    .pipe($.istanbul({ instrumenter: Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports())
        .on('end', done);
    });
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc'];

// Run the headless unit tests as you make changes.
function watch() {
  $.livereload.listen();
  gulp.watch(watchFiles, ['build']);
  // gulp.watch(watchFiles, ['test']);
}

function testBrowser() {
  // Our testing bundle is made up of our unit tests, which
  // should individually load up pieces of our application.
  // We also include the browser setup file.
  const testFiles = glob.sync('./test/unit/**/*.js');
  const allFiles = ['./test/setup/browser.js'].concat(testFiles);

  // Lets us differentiate between the first build and subsequent builds
  var firstBuild = true;

  // This empty stream might seem like a hack, but we need to specify all of our files through
  // the `entry` option of webpack. Otherwise, it ignores whatever file(s) are placed in here.
  return gulp.src('')
    .pipe($.plumber())
    .pipe(webpackStream({
      watch: true,
      entry: allFiles,
      output: {
        filename: '__spec-build.js'
      },
      externals: {
        // Proxy the global THREE variable to require('three')
        'three': 'THREE',
        // Proxy the global THREE variable to require('TweenLite')
        'TweenLite': 'TweenLite',
        // Proxy the global THREE variable to require('TweenMax')
        'TweenMax': 'TweenMax',
        // Proxy the global THREE variable to require('TimelineLite')
        'TimelineLite': 'TimelineLite',
        // Proxy the global THREE variable to require('TimelineMax')
        'TimelineMax': 'TimelineMax',
        // Proxy the global proj4 variable to require('proj4')
        'proj4': 'proj4'
      },
      module: {
        loaders: [
          // This is what allows us to author in future JavaScript
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          // This allows the test setup scripts to load `package.json`
          { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' }
        ]
      },
      plugins: [
        // By default, webpack does `n=>n` compilation with entry files. This concatenates
        // them into a single chunk.
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
      ],
      devtool: 'inline-source-map'
    }, null, function() {
      if (firstBuild) {
        $.livereload.listen({port: 35729, host: 'localhost', start: true});
        var watcher = gulp.watch(watchFiles, ['lint']);
      } else {
        $.livereload.reload('./tmp/__spec-build.js');
      }
      firstBuild = false;
    }))
    .pipe(gulp.dest('./tmp'));
}

// Remove the built files
gulp.task('clean', cleanDist);

// Remove our temporary files
gulp.task('clean-tmp', cleanTmp);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Move CSS
gulp.task('move-css', ['clean'], moveCSS);

// Build two versions of the library
gulp.task('build', ['lint', 'move-css'], build);

// Lint and run our tests
gulp.task('test', ['lint'], test);

// Set up coverage and run tests
gulp.task('coverage', ['lint'], coverage);

// Set up a livereload environment for our spec runner `test/runner.html`
gulp.task('test-browser', ['lint', 'clean-tmp'], testBrowser);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('default', ['test']);
