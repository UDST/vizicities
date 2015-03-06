/* globals window, _, VIZI */

/**
 * Mouse picking controls class
 * @author Robin Hawkes - vizicities.com
 */

(function() {
  "use strict";

  VIZI.ControlsMousePick = function(camera, options) {
    var self = this;

    VIZI.Controls.call(self, camera, options);

    if (!self.options.scene) {
      throw new Error("Required scene option missing");
    }

    self.camera = camera;
    self.pixelBuffer = new Uint8Array(4);

    self.options.scene.options.viewport.addEventListener("click", self.onMouseClick.bind(self), false);
  };

  VIZI.ControlsMousePick.prototype = Object.create( VIZI.Controls.prototype );

  VIZI.ControlsMousePick.prototype.onMouseClick = function(event) {
    var self = this;

    event.preventDefault();

    var screenPos = new VIZI.Point(event.clientX, event.clientY);
    var viewportOffset = new VIZI.Point(
      self.options.scene.options.viewport.offsetLeft,
      self.options.scene.options.viewport.offsetTop
    );

    var relativePos = screenPos.subtract(viewportOffset);

    self.pick(relativePos);
  };

  // TODO: Fix issue where ID is being picked up even when clicking outside of objects within scene
  VIZI.ControlsMousePick.prototype.pick = function(pos) {
    var self = this;

    if (!pos) {
      console.log("No position given for picking");
      return;
    }

    // Render picking scene
    self.options.scene.renderPicking(self.camera);

    // Get the gl buffer
    var gl = self.options.scene.renderer.getContext();

    // Read pixel under the mouse into buffer
    gl.readPixels(pos.x, self.options.scene.pickingTexture.height - pos.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, self.pixelBuffer);

    // Get picked object
    var id = (self.pixelBuffer[0] << 16) | (self.pixelBuffer[1] << 8) | (self.pixelBuffer[2]);

    // Highlight picked object
    // self.options.scene.highlightPickable(id);
    
    // TODO: Emit event with picked id (for other modules to reference from)
    console.log("Picked:", id, self.pixelBuffer);
  };
})();