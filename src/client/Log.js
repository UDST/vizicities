/* globals window, _, VIZI, moment */
(function() {
	"use strict";

	// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript
	// http://www.paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	// http://benalman.com/projects/javascript-debug-console-log/

	// TODO: Update to use formatted output (colour, tables, style, etc)
	//       - https://coderwall.com/p/fskzdw
	//       - https://github.com/adamschwartz/log

	VIZI.Log = function() {
		var args = Array.prototype.slice.call(arguments);

		var timestamp = "[" + moment().format("HH:mm:ss.SSS") + "]";
		args.unshift(timestamp);

		if (console) {
			console.log.apply(console, args);
		}
	};
}());