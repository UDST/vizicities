/* globals window, _, VIZI, Q */
(function() {
  "use strict";

  VIZI.OSMEdit = function() {
    VIZI.Log("Initialising OSM edit UI");

    _.extend(this, VIZI.Mediator);

    this.domContainer = undefined;
    this.domOSMEdit = undefined;

    this.subscribe("centerPositionChanged", function(centerPixels, center) {
      this.updatePosition(center);
    });
  };

  VIZI.OSMEdit.prototype.init = function() {
    this.domContainer = this.createDOMContainer();
    this.domOSMEdit = this.createDOMOSMEdit();

    return Q.fcall(function() {});
  };

  // TODO: Decide if CSS should be here or all in the CSS file
  VIZI.OSMEdit.prototype.createDOMContainer = function() {
    VIZI.Log("Creating OSM edit UI DOM container");

    var container = document.createElement("div");
    container.id = "ui-osm-edit-container";

    container.style.bottom = "0";
    container.style.fontFamily = "Arial, Verdana, sans-serif";
    container.style.fontSize = "10px";
    container.style.position = "absolute";
    container.style.left = "0";
    container.style.zIndex = "9998";

    document.body.appendChild(container);

    return container;
  };

  VIZI.OSMEdit.prototype.createDOMOSMEdit = function() {
    VIZI.Log("Creating OSM edit UI ViziCities DOM");

    var osmEditDOM = document.createElement("p");
    osmEditDOM.classList.add("ui-osm-edit");

    osmEditDOM.innerHTML = "<a href='http://www.openstreetmap.org/edit'>Does this area look wrong? Edit it in OpenStreetMap</a>";

    osmEditDOM.style.background = "rgba(255, 255, 255, 0.6)";
    osmEditDOM.style.borderRadius = "0 3px 0 0";
    osmEditDOM.style.padding = "3px 5px";

    this.domContainer.appendChild(osmEditDOM);

    return osmEditDOM;
  };

  VIZI.OSMEdit.prototype.updatePosition = function(center) {
    this.domOSMEdit.firstChild.href = "http://www.openstreetmap.org/edit#map=16/" + center[1] + "/" + center[0];
  };
}());