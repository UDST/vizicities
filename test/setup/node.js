global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup')();

/*
	Uncomment the following if your library uses features of the DOM,
	for example if writing a jQuery extension, and
	add 'simple-jsdom' to the `devDependencies` of your package.json
*/
// import simpleJSDom from 'simple-jsdom';
// simpleJSDom.install();
