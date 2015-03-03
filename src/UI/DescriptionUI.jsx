/* globals window, _, React, VIZI */

/**
 * Description UI class
 * @author Robin Hawkes - vizicities.com
 */

// TODO: Sort out scoping issues
// TODO: Work out a neater structure for defining the render method

(function() {
  "use strict";

  VIZI.DescriptionUI = function(options) {
    var self = this;
    var scope = self;

    self.options = options || {};

    _.defaults(options, {});

    // Check that UI container exists
    if (!document.querySelector(".vizicities-ui .vizicities-description-ui")) {
      var container = document.createElement("section");
      container.classList.add("vizicities-description-ui");

      document.querySelector(".vizicities-ui").appendChild(container);
    }

    self.description = React.createClass({
      render: function() {
        var self = this;
          
        return (
          <section className="vizicities-ui-item vizicities-description-ui-item">
            <header>
              <h2>{self.props.title}</h2>
            </header>
            <p>{self.props.body}</p>
          </section>
        );
      }
    });

    self.onChange();
  };

  VIZI.DescriptionUI.prototype.onChange = function() {
    var self = this;

    var Description = self.description;

    React.render(<Description title={self.options.title} body={self.options.body} />, document.querySelector(".vizicities-description-ui"));
  };
})();