/* globals window, _, React, VIZI */

/**
 * Layers UI class
 * @author Robin Hawkes - vizicities.com
 */

// TODO: Sort out scoping issues
// TODO: Work out a neater structure for defining the render method

(function() {
  "use strict";

  VIZI.LayersUI = function(layers) {
    var self = this;
    var scope = self;

    self.layers = layers;

    self.layerControl = React.createClass({
      render: function() {
        var self = this;
          
        // TODO: De-dupe checkbox setup
        var layers = self.props.layers.map(function(layer) {
          var visibilityButton;
          if (layer.hidden) {
            visibilityButton = <input type="checkbox" onClick={self.props.onShow.bind(scope, layer.object.id)}></input>
          } else {
            visibilityButton = <input type="checkbox" checked onClick={self.props.onHide.bind(scope, layer.object.id)}></input>
          }
          
          return (
            <li key={layer.object.id}>
              {visibilityButton} {layer.name}
            </li>
          );
        });
        
        return (
          <section className="vizicities-layers-ui">
            <header>
              <h2>Layers</h2>
            </header>
            <ul>
              {layers}
            </ul>
          </section>
        );
      }
    });

    self.onChange();
  };

  VIZI.LayersUI.prototype.onHideLayer = function(id) {
    var self = this;

    var layer = _.find(self.layers, function (layer) {
      return layer.object.id === id;
    });
    
    if (layer) {
      layer.object.visible = false;
      layer.hidden = true;
    }
    
    self.onChange();
  };

  VIZI.LayersUI.prototype.onShowLayer = function(id) {
    var self = this;

    var layer = _.find(self.layers, function (layer) {
      return layer.object.id === id;
    });
    
    if (layer) {
      layer.object.visible = true;
      layer.hidden = false;
    }
    
    self.onChange();
  };

  VIZI.LayersUI.prototype.onChange = function() {
    var self = this;

    var LayerControl = self.layerControl;

    React.render(<LayerControl layers={self.layers} onHide={self.onHideLayer} onShow={self.onShowLayer} />, document.querySelector(".vizicities-ui"));
  };
})();