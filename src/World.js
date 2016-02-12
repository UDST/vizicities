import EventEmitter from 'eventemitter3';
import Engine from './engine/Engine';

// Pretty much any event someone using ViziCities would need will be emitted or
// proxied by World (eg. render events, etc)

class World extends EventEmitter {
  constructor(domId) {
    super();

    this._layers = [];

    this._initContainer(domId);
    this._initEngine();

    // Kick off the update and render loop
    this._update();
  }

  _initContainer(domId) {
    this._container = document.getElementById(domId);
  }

  _initEngine() {
    this._engine = Engine(this._container);

    // Engine events
    //
    // Consider proxying these through events on World for public access
    // this._engine.on('preRender', () => {});
    // this._engine.on('postRender', () => {});
  }

  _update() {
    var delta = this._engine.clock.getDelta();

    // Once _update is called it will run forever, for now
    window.requestAnimationFrame(this._update.bind(this));

    this.emit('preUpdate');
    this._engine._update(delta);
    this.emit('postUpdate');
  }

  addLayer(layer) {
    layer._addToWorld(this);

    this._layers.push(layer);

    // Could move this into Layer but it'll do here for now
    this._engine.scene.add(layer._layer);

    this.emit('layerAdded', layer);
    return this;
  }

  removeLayer(layer) {}
}

// Initialise without requiring new keyword
export default function(domId) {
  return new World(domId);
};
