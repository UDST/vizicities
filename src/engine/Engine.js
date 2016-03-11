import EventEmitter from 'eventemitter3';
import THREE from 'three';
import Scene from './Scene';
import DOMScene3D from './DOMScene3D';
import DOMScene2D from './DOMScene2D';
import Renderer from './Renderer';
import DOMRenderer3D from './DOMRenderer3D';
import DOMRenderer2D from './DOMRenderer2D';
import Camera from './Camera';
import Picking from './Picking';
import EffectComposer from '../vendor/EffectComposer';
import RenderPass from '../vendor/RenderPass';
import ShaderPass from '../vendor/ShaderPass';
import CopyShader from '../vendor/CopyShader';
import HorizontalTiltShiftShader from '../vendor/HorizontalTiltShiftShader';
import VerticalTiltShiftShader from '../vendor/VerticalTiltShiftShader';
import FXAAShader from '../vendor/FXAAShader';

class Engine extends EventEmitter {
  constructor(container, world) {
    console.log('Init Engine');

    super();

    this._world = world;

    this._scene = Scene;
    this._domScene3D = DOMScene3D;
    this._domScene2D = DOMScene2D;

    this._renderer = Renderer(container);
    this._domRenderer3D = DOMRenderer3D(container);
    this._domRenderer2D = DOMRenderer2D(container);

    this._camera = Camera(container);

    // TODO: Make this optional
    this._picking = Picking(this._world, this._renderer, this._camera);

    this.clock = new THREE.Clock();

    this._frustum = new THREE.Frustum();

    this._initPostProcessing();
  }

  // TODO: Set up composer to automatically resize on viewport change
  // TODO: Update passes that rely on width / height on resize
  // TODO: Merge default passes into a single shader / pass for performance
  _initPostProcessing() {
    var renderPass = new RenderPass(this._scene, this._camera);

    var width = this._renderer.getSize().width;
    var height = this._renderer.getSize().height;

    var pixelRatio = window.devicePixelRatio;

    // TODO: Look at using @mattdesl's optimised FXAA shader
    // https://github.com/mattdesl/three-shader-fxaa
    var fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(1 / (width * pixelRatio), 1 / (height * pixelRatio));

    var hblurPass = new ShaderPass(HorizontalTiltShiftShader);
    var vblurPass = new ShaderPass(VerticalTiltShiftShader);
    var bluriness = 5;

    hblurPass.uniforms.h.value = bluriness / (width * pixelRatio);
    vblurPass.uniforms.v.value = bluriness / (height * pixelRatio);
    hblurPass.uniforms.r.value = vblurPass.uniforms.r.value = 0.6;

    var copyPass = new ShaderPass(CopyShader);
    copyPass.renderToScreen = true;

    this._composer = new EffectComposer(this._renderer);

    this._composer.addPass(renderPass);
    this._composer.addPass(fxaaPass);
    this._composer.addPass(hblurPass);
    this._composer.addPass(vblurPass);
    this._composer.addPass(copyPass);
  }

  update(delta) {
    this.emit('preRender');

    // this._renderer.render(this._scene, this._camera);
    this._composer.render(delta);

    // Render picking scene
    // this._renderer.render(this._picking._pickingScene, this._camera);

    // Render DOM scenes
    this._domRenderer3D.render(this._domScene3D, this._camera);
    this._domRenderer2D.render(this._domScene2D, this._camera);

    this.emit('postRender');
  }

  destroy() {
    // Remove any remaining objects from scene
    var child;
    for (var i = this._scene.children.length - 1; i >= 0; i--) {
      child = this._scene.children[i];

      if (!child) {
        continue;
      }

      this._scene.remove(child);

      if (child.geometry) {
        // Dispose of mesh and materials
        child.geometry.dispose();
        child.geometry = null;
      }

      if (child.material) {
        if (child.material.map) {
          child.material.map.dispose();
          child.material.map = null;
        }

        child.material.dispose();
        child.material = null;
      }
    };

    for (var i = this._domScene3D.children.length - 1; i >= 0; i--) {
      child = this._domScene3D.children[i];

      if (!child) {
        continue;
      }

      this._domScene3D.remove(child);
    };

    for (var i = this._domScene2D.children.length - 1; i >= 0; i--) {
      child = this._domScene2D.children[i];

      if (!child) {
        continue;
      }

      this._domScene2D.remove(child);
    };

    this._picking.destroy();
    this._picking = null;

    this._world = null;
    this._scene = null;
    this._domScene3D = null;
    this._domScene2D = null;
    this._renderer = null;
    this._domRenderer3D = null;
    this._domRenderer2D = null;
    this._camera = null;
    this._clock = null;
    this._frustum = null;
  }
}

export default Engine;

// // Initialise without requiring new keyword
// export default function(container, world) {
//   return new Engine(container, world);
// };
