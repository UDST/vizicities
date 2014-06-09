var OculusBridge = function(config) {

	// ye olde websocket
	var socket;

	var reconnectTimeout 	= null;
	var retryOnDisconnect 	= true;
	var websocketAddress 	= config.hasOwnProperty("address") 			? config["address"] 		: "localhost";
	var websocketPort 		= config.hasOwnProperty("port") 			? config["port"] 			: 9005;
	var retryInterval 		= config.hasOwnProperty("retryInterval") 	? config["retryInterval"] 	: 1;
	var debugEnabled		= config.hasOwnProperty("debug") 			? config["debug"] 			: false;

	// Quaternion values
	var quaternionValues = {
		x : 0,
		y : 0,
		z : 0,
		w : 0
	};

	// Accelerometer readings
	var accelerationValues = {
		x : 0,
		y : 0,
		z : 0
	};

	// Display metrics, set to defaults from the dev kit hardware
	var displayMetrics = {
		FOV 					: 125.871,

		hScreenSize				: 0.14976,
		vScreenSize				: 0.0935,
		vScreenCenter			: 0.0935 / 2,

		eyeToScreenDistance		: 0.041,

		lensSeparationDistance	: 0.067,
		interpupillaryDistance	: 0.0675,

		hResolution				: 1280,
		vResolution				: 720,

		distortionK				: [1, .22, .24, 0],
		chromaAbParameter		: [0.996, -0.004, 1.014, 0]
	}

	// Callback handlers.
	var callbacks = {
		onOrientationUpdate : null,
		onAccelerationUpdate: null,
		onConfigUpdate : null,
		onConnect : null,
		onDisconnect : null
	};

	// hook up any callbacks specified in the config object
	for(var cb in callbacks){
		if(typeof(config[cb]) == "function"){
			callbacks[cb] = config[cb];
		}
	}

	var updateOrientation = function(data) {

		if(data["o"] && (data["o"].length == 4)) {

			quaternionValues.x = Number(data["o"][1]);
			quaternionValues.y = Number(data["o"][2]);
			quaternionValues.z = Number(data["o"][3]);
			quaternionValues.w = Number(data["o"][0]);

			if(callbacks["onOrientationUpdate"]) {
				callbacks["onOrientationUpdate"](quaternionValues);
			}
		}
	}

	var updateAcceleration = function(data) {

		if(data["a"] && (data["a"].length == 3)) {

			accelerationValues.x = Number(data["a"][0]);
			accelerationValues.y = Number(data["a"][1]);
			accelerationValues.z = Number(data["a"][2]);

			if(callbacks["onAccelerationUpdate"]) {
				callbacks["onAccelerationUpdate"](accelerationValues);
			}
		}
	}

	var updateConfig = function(data) {
		displayMetrics.hScreenSize				= data["screenSize"][0];
		displayMetrics.vScreenSize				= data["screenSize"][1];
		displayMetrics.vScreenCenter			= data["screenSize"][1] / 2;

		displayMetrics.eyeToScreenDistance		= data["eyeToScreen"];

		displayMetrics.lensSeparationDistance	= data["lensDistance"];
		displayMetrics.interpupillaryDistance	= data["interpupillaryDistance"];

		displayMetrics.hResolution				= data["screenResolution"][0];
		displayMetrics.vResolution				= data["screenResolution"][1];

		displayMetrics.distortionK				= [ data["distortion"][0], data["distortion"][1], data["distortion"][2], data["distortion"][3] ];

		displayMetrics.FOV						= data["fov"];

		if(callbacks["onConfigUpdate"]) {
			callbacks["onConfigUpdate"]( displayMetrics );
		}
	}


	var connect = function() {

		retryOnDisconnect = true;

		var socketURL = "ws://" + websocketAddress + ":" + websocketPort + "/";

		// attempt to open the socket connection
	 	socket = new WebSocket(socketURL);

		debug("Attempting to connect: " + socketURL);


	 	// hook up websocket events //

		socket.onopen = function(){
			debug("Connected!")

			if(callbacks["onConnect"]) {
				callbacks["onConnect"]();
			}
		}

		socket.onerror = function(e){
			debug("Socket error.");
		}

		socket.onmessage = function(msg) {

			var data = JSON.parse( msg.data );

			var message = data["m"];

			switch(message){
				case "config" :
					updateConfig(data);
				break;

				// For backwards compatability with the bridge application.
				case "orientation":
					updateOrientation(data);
				break;

				case "update":
					updateOrientation(data);
					updateAcceleration(data);
				break;

				default:
					debug("Unknown message received from server: " + msg.data);
					disconnect();
				break;
			}

		}

		socket.onclose = function() {
			if(callbacks["onDisconnect"]) {
				callbacks["onDisconnect"]();
			}

			if(retryOnDisconnect){
				debug("Connection failed, retrying in 1 second...");
				reconnectTimeout = window.setTimeout( reconnect, retryInterval * 1000 );
			}
		}
	}

	var debug = function(message){
		if(debugEnabled){
			console.log("OculusBridge: " + message);
		}
	}

	var reconnect = function(){
		connect();
	}

	var disconnect = function(){
		retryOnDisconnect = false;
		window.clearTimeout(reconnectTimeout);
		socket.close();
	}

	var getConfiguration = function(){
		return displayMetrics;
	}

	var getOrientation = function(){
		return quaternionValues;
	}

	var getAcceleration = function(){
		return accelerationValues;
	}

	var isConnected = function(){
		return socket.readyState == 1;
	}

	return {
		"isConnected" 		: isConnected,
		"disconnect" 		: disconnect,
		"connect" 			: connect,
		"getOrientation" 	: getOrientation,
		"getConfiguration" 	: getConfiguration
	}
};
