/* globals window, _, VIZI, Q */
(function() {
  "use strict";

  VIZI.Attribution = function() {
    VIZI.Log("Initialising attribution UI");

    _.extend(this, VIZI.Mediator);

    this.domContainer = undefined;
    this.domAttribution = undefined;
  };

  VIZI.Attribution.prototype.init = function() {
    this.domContainer = this.createDOMContainer();
    this.domAttribution = this.createDOMAttribution();

    return Q.fcall(function() {});
  };

  // TODO: Decide if CSS should be here or all in the CSS file
  VIZI.Attribution.prototype.createDOMContainer = function() {
    VIZI.Log("Creating attribution UI DOM container");

    var container = document.createElement("div");
    container.id = "ui-attribution-container";

    container.style.bottom = "0";
    container.style.fontFamily = "Arial, Verdana, sans-serif";
    container.style.fontSize = "10px";
    container.style.position = "absolute";
    container.style.right = "0";
    container.style.zIndex = "9998";

    document.body.appendChild(container);

    return container;
  };

  VIZI.Attribution.prototype.createDOMAttribution = function() {
    VIZI.Log("Creating attribution UI ViziCities DOM");

    var attributionDOM = document.createElement("p");
    attributionDOM.classList.add("ui-attribution");

    attributionDOM.innerHTML = "<a href='https://www.openstreetmap.org/copyright'>Data &copy; OpenStreetMap contributors</a> | <a href='http://github.com/robhawkes/vizicities'>Powered by ViziCities</a>";

    attributionDOM.style.background = "rgba(255, 255, 255, 0.6)";
    attributionDOM.style.borderRadius = "3px 0 0";
    attributionDOM.style.padding = "3px 5px";

    this.domContainer.appendChild(attributionDOM);

    return attributionDOM;
  };
}());