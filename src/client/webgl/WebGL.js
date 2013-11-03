/* globals window, _, VIZI, Q, THREE */
(function() {
	"use strict";

	VIZI.WebGL = function() {
		VIZI.Log("Initialising WebGL");

		_.extend(this, VIZI.Mediator);

		this.domContainer = undefined;
		this.scene = undefined;
		this.camera = undefined;
		this.renderer = undefined;

		this.lights = [];
	};

	VIZI.WebGL.prototype.init = function() {
		var deferred = Q.defer();

		this.domContainer = this.createDOMContainer();
		this.scene = new VIZI.Scene();
		this.camera = new VIZI.Camera();
		this.renderer = new VIZI.Renderer(this.scene, this.camera, this.domContainer);

		this.lights = [];
		this.addLights();

		deferred.resolve();

		return deferred.promise;
	};

	VIZI.WebGL.prototype.createDOMContainer = function() {
		VIZI.Log("Creating WebGL DOM container");

		var container = document.createElement("div");
		container.id = "webgl-container";

		document.body.appendChild(container);

		return container;
	};

	// TODO: Split lights out into classes
	VIZI.WebGL.prototype.addLights = function() {
		VIZI.Log("Adding lights to scene");

		var ambientLight = new THREE.AmbientLight( 0x404040 );
		THREE.ColorConverter.setHSV( ambientLight.color, 0.1, 0.1, 0.4 );

		this.lights.push(ambientLight);
		this.publish("addToScene", ambientLight);

		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		THREE.ColorConverter.setHSV( directionalLight.color, 0.1, 0.1, 0.55 );
		directionalLight.position.x = 1000;
		directionalLight.position.y = 1000;
		directionalLight.position.z = 750;
		directionalLight.position.normalize();

		this.lights.push(directionalLight);
		this.publish("addToScene", directionalLight);

		var directionalLight2 = new THREE.DirectionalLight( 0x808080 );
		THREE.ColorConverter.setHSV( directionalLight2.color, 0.1, 0.1, 0.5 );
		directionalLight2.position.x = - 1000;
		directionalLight2.position.y = 1000;
		directionalLight2.position.z = - 750;
		directionalLight2.position.normalize();

		this.lights.push(directionalLight2);
		this.publish("addToScene", directionalLight2);

		var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.65 );
		THREE.ColorConverter.setHSV( hemiLight.color, 0.6, 0.35, 0.7 );
		THREE.ColorConverter.setHSV( hemiLight.groundColor, 0.095, 0.5, 0.6 );
		hemiLight.position.set( 0, 600, 0 );

		this.lights.push(hemiLight);
		this.publish("addToScene", hemiLight);
	};

	// Global helpers (move elsewhere?)
	VIZI.applyVertexColors = function( g, c ) {
		g.faces.forEach( function( f ) {
			var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
			for( var j = 0; j < n; j ++ ) {
				f.vertexColors[ j ] = c;
			}
		} );
	};
}());