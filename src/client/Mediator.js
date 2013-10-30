/* globals window, _, VIZI */
(function() {
	"use strict";

	// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript
	// Apply to other objects using _.extend(newObj, VIZI.Mediator);
	VIZI.Mediator = (function() {
		// Storage for topics that can be broadcast or listened to
		var topics = {};

		// Subscribe to a topic, supply a callback to be executed
		// when that topic is broadcast to
		var subscribe = function( topic, fn ){

			if ( !topics[topic] ){ 
				topics[topic] = [];
			}

			topics[topic].push( { context: this, callback: fn } );

			return this;
		};

		// Publish/broadcast an event to the rest of the application
		var publish = function( topic ){

			var args;

			if ( !topics[topic] ){
				return false;
			} 

			args = Array.prototype.slice.call( arguments, 1 );
			for ( var i = 0, l = topics[topic].length; i < l; i++ ) {

				var subscription = topics[topic][i];
				subscription.callback.apply( subscription.context, args );
			}
			return this;
		};

		return {
			publish: publish,
			subscribe: subscribe
		};
	}());
}());