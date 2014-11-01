/* globals window, _, VIZI */

/**
 * Attribution UI
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.Attribution = function(options) {
    var self = this;

    if (VIZI.DEBUG) console.log("Initialising VIZI.Attribution");

    self.options = options || {};
    
    _.defaults(self.options, {});

    if (!self.options.element) {
      throw new Error("Required element option missing");
    }

    self.defaultMessage = "<a href='http://vizicities.com' target='_blank'>Powered by ViziCities</a>";

    self.container = self.createContainer(self.options.element);

    self.add(self.defaultMessage);
  };

  VIZI.Attribution.prototype.createContainer = function(element) {
    var container = document.createElement("div");

    // Styling is adding via vizicities.css
    container.classList.add("vizicities-attribution");

    element.appendChild(container);

    return container;
  };

  VIZI.Attribution.prototype.add = function(message) {
    var self = this;
    var prefix = "";
    
    if (self.container.innerHTML.length > 0) {
      prefix = " | ";
    }

    self.container.innerHTML += prefix + message;
  };
})();