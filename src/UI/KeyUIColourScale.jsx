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

    // Check that key UI container exists
    if (!document.querySelector(".vizicities-ui .vizicities-key-ui")) {
      var keyUIContainer = document.createElement("section");
      keyUIContainer.classList.add("vizicities-key-ui");

      document.querySelector(".vizicities-ui").appendChild(keyUIContainer);
    }

    self.key = React.createClass({
      render: function() {
        var self = this;
          
        // TODO: De-dupe checkbox setup
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
        
        return (
          <section className={className}>
            <header>
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

  VIZI.KeyUIColourScale.prototype.onChange = function() {
    var self = this;

    var Key = self.key;

    React.render(<Key scale={self.scale} />, document.querySelector(".vizicities-key-ui"));
  };
})();