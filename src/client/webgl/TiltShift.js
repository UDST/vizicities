/* globals window, _, VIZI, THREE */
(function() {
	"use strict";
	
	VIZI.TiltShift = function(scene, camera, renderer, options) {
		VIZI.Log("Inititialising TiltShift");

		_.extend(this, VIZI.Mediator);

		this.enable = options.enable || false;
		this.blur = options.blur || 5;
		this.focus = options.focus || 0.5;
		
		this.scene = scene.scene;
		this.camera = camera.camera;
		this.renderer = renderer.renderer;
		
		this.composer = undefined;
		this.vblur = undefined;
		this.hblur = undefined;

		this.createTiltShift();
		this.render();
		
		this.publish("addToDat", this, {name: "TiltShift", properties: ["enable", "blur", "focus"]});

		// Listeners 
		this.subscribe("render", this.render);
		this.subscribe("resize", this.resize);
	};
	
	VIZI.TiltShift.prototype.createTiltShift = function(){
	
		this.renderer.autoClear = false;
		
		this.hblur = new THREE.ShaderPass( THREE.HorizontalTiltShiftShader );
		this.vblur = new THREE.ShaderPass( THREE.VerticalTiltShiftShader );

		this.datChange();

		this.composer = new THREE.EffectComposer( this.renderer );

		this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );		
		this.composer.addPass( this.hblur );
		this.composer.addPass( this.vblur );
	};

	VIZI.TiltShift.prototype.render = function() {		
		this.composer.render( 0.1 );
	};

	VIZI.TiltShift.prototype.resize = function() {
		this.datChange();
	};
	
	VIZI.TiltShift.prototype.datChange = function() {
	
		if(this.enable === true){
			this.vblur.renderToScreen = true;
			
			this.hblur.uniforms[ 'h' ].value = this.blur / window.innerWidth;
			this.vblur.uniforms[ 'v' ].value = this.blur / window.innerHeight;
			this.hblur.uniforms[ 'r' ].value = this.focus;
			this.vblur.uniforms[ 'r' ].value = this.focus;
			
		} else {
			this.vblur.renderToScreen = false;
		}
		
	};
	
}());