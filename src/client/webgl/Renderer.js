/* globals window, _, VIZI, THREE */
(function() {
	"use strict";

	VIZI.Renderer = function(scene, camera, domContainer) {
		VIZI.Log("Inititialising WebGL renderer");

		_.extend(this, VIZI.Mediator);

		this.scene = scene.scene;
		this.camera = camera.camera;
		this.domContainer = domContainer;

		this.renderer = this.createRenderer();

		// Listeners
		this.subscribe("render", this.render);
		this.subscribe("resize", this.resize);
	};

	VIZI.Renderer.prototype.createRenderer = function() {
		var renderer = new THREE.WebGLRenderer({
			antialias: false
		});

		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( this.scene.fog.color, 1 );

		// Gamma settings make things look 'nicer' for some reason
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		renderer.physicallyBasedShading = true;

		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		this.domContainer.appendChild(renderer.domElement);

		return renderer;
	};

	VIZI.Renderer.prototype.render = function() {
		this.publish("fpsTickStart", "render");
		this.renderer.render( this.scene, this.camera );
		this.publish("updateRendererInfo", this.renderer.info);
		this.publish("fpsTickEnd", "render");
	};

	VIZI.Renderer.prototype.resize = function() {
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	};
}());