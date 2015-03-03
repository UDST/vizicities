/* globals window, _, React, VIZI */

/**
 * 2D info UI class
 * @author Robin Hawkes - vizicities.com
 */

// TODO: Sort out scoping issues
// TODO: Work out a neater structure for defining the render method

(function() {
  "use strict";

  VIZI.InfoUI2D = function(world) {
    var self = this;
    var scope = self;

    self.world = world;

    // Check that 2D info UI container exists
    if (!document.querySelector(".vizicities-ui .vizicities-info-ui-2d")) {
      var infoUIContainer = document.createElement("section");
      infoUIContainer.classList.add("vizicities-info-ui-2d");

      document.querySelector(".vizicities-ui").appendChild(infoUIContainer);
    }

    self.panels = [];

    self.infoUI = React.createClass({
      render: function() {
        var self = this;
        
        var panels = self.props.panels.map(function(panel) {
          var bounds = new THREE.Box3().setFromObject(panel.object);
          
          var offsetPos = panel.object.position.clone();
          offsetPos.y = bounds.max.y;

          var screenPos = scope.world.worldPositionTo2D(offsetPos);

          // TODO: Scale margin-top offset based on camera zoom so panel stays above the object
          // TODO: Or, base the screen position on the top of the object bounding box
          // TODO: Set z-index based on object distance from camera
          var style = {
            transform: "translateX(calc(" + screenPos.x + "px - 50%)) translateY(calc(" + screenPos.y + "px - 50%))"
          }

          return (
            <div key={panel.id} style={style} className="vizicities-info-ui-2d-layer-item">{panel.text}</div>
          );
        });
        
        return (
          <section className="vizicities-info-ui-2d-layer">
            {panels}
          </section>
        );
      }
    });

    self.onChange();
  };

  VIZI.InfoUI2D.prototype.addPanel = function(object, text) {
    var self = this;

    var panel = {
      id: object.id,
      object: object,
      text: text
    };

    self.panels.push(panel);

    self.onChange();

    return panel;
  };

  VIZI.InfoUI2D.prototype.onChange = function() {
    var self = this;

    var InfoUI = self.infoUI;

    React.render(<InfoUI panels={self.panels} />, document.querySelector(".vizicities-info-ui-2d"));
  };
})();