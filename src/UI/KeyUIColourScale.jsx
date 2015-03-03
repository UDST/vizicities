/* globals window, _, React, VIZI */

/**
 * Key colour-scale UI class
 * @author Robin Hawkes - vizicities.com
 */

// TODO: Sort out scoping issues
// TODO: Work out a neater structure for defining the render method

(function() {
  "use strict";

  VIZI.KeyUIColourScale = function(layer, scale) {
    var self = this;
    var scope = self;

    self.layer = layer;
    self.scale = scale || [];
    self.hidden = false;
    self.closed = false;

    // Check that key UI container exists
    if (!document.querySelector(".vizicities-ui .vizicities-key-ui")) {
      var keyUIContainer = document.createElement("section");
      keyUIContainer.classList.add("vizicities-key-ui");

      document.querySelector(".vizicities-ui").appendChild(keyUIContainer);
    }

    self.key = React.createClass({
      render: function() {
        var self = this;
          
        var scale = self.props.scale.map(function(scale) {
          var style = {
            background: scale.colour
          };
          
          return (
            <li key={scale.colour}>
              <span className="scale-icon" style={style}></span> {scale.key}
            </li>
          );
        });

        var className = "vizicities-ui-item vizicities-key-ui-item";
        className += (scope.closed) ? " closed" : "";

        var containerStyle = {
          display: (scope.hidden) ? "none" : "block"
        }
        
        return (
          <section className={className} style={containerStyle}>
            <header onClick={self.props.onToggleClosed.bind(scope)}>
              <h2>{scope.layer.name} key</h2>
            </header>
            <ul>
              {scale}
            </ul>
          </section>
        );
      }
    });

    self.onChange();
  };

  VIZI.KeyUIColourScale.prototype.onHide = function() {
    var self = this;
    self.hidden = true;
    self.onChange();
  };

  VIZI.KeyUIColourScale.prototype.onShow = function() {
    var self = this;
    self.hidden = false;
    self.onChange();
  };

  VIZI.KeyUIColourScale.prototype.onToggleClosed = function() {
    var self = this;
    
    self.closed = (self.closed) ? false : true;
    self.onChange();
  };

  VIZI.KeyUIColourScale.prototype.onChange = function() {
    var self = this;

    var Key = self.key;

    React.render(<Key scale={self.scale} onToggleClosed={self.onToggleClosed} />, document.querySelector(".vizicities-key-ui"));
  };
})();