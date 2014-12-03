/* globals window, _, VIZI */
(function() {
  "use strict";

/**
 * Blueprint switchboard
 * @author Robin Hawkes - vizicities.com
 */

  var arrayIndexRegEx = /\[(\d+)\]/,
      arrayIndexRegExG = /\[(\d+)\]/g;

  VIZI.BlueprintSwitchboard = function(config) {
    var self = this;

    if (!config) {
      throw new Error("Required config argument missing");
    }

    self.input;
    self.output;

    self.processConfig(config);
  };

  // Process config into a working switchboard
  VIZI.BlueprintSwitchboard.prototype.processConfig = function(config) {
    var self = this;

    if (!config.input) {
      throw new Error("Required input configuration missing");
    }

    if (!config.output) {
      throw new Error("Required output configuration missing");
    }

    if (!config.triggers) {
      throw new Error("Required triggers configuration missing");
    }

    // Create input object (initialise after triggers are set)
    self.input = self.createViziClassInstance(config.input.type, [config.input.options || {}]);

    // Create output object (initialise after triggers are set)
    self.output = self.createViziClassInstance(config.output.type, [config.output.options || {}]);

    // Process triggers and actions
    _.each(config.triggers, function(triggerOptions) {
      if (triggerOptions.triggerObject !== "input" && triggerOptions.triggerObject !== "output") {
        throw new Error("Trigger object should be either input or output");
      }

      var triggerObject = self[triggerOptions.triggerObject];
      var triggerName = triggerOptions.triggerName;
      var triggerArguments = triggerOptions.triggerArguments;

      if (triggerOptions.actionObject !== "input" && triggerOptions.actionObject !== "output") {
        throw new Error("Trigger object should be either input or output");
      }

      var actionObject = self[triggerOptions.actionObject];
      var actionName = triggerOptions.actionName;
      var actionArguments = triggerOptions.actionArguments;
      var actionOutput = triggerOptions.actionOutput;

      // Set up trigger listener
      triggerObject.on(triggerName, function() {
        if (VIZI.DEBUG) console.log("Trigger", triggerName, arguments);

        var callbackArgs = arguments;
        var actionArgs = [];

        // Map trigger arguments to output arguments
        _.each(actionArguments, function(actionArg, index) {
          if (!actionOutput[actionArg]) {
            throw new Error("Required action argument missing");
          }

          var triggerArg = actionOutput[actionArg];

          // Simple 1:1 map of trigger argument to action argument
          if (_.isString(triggerArg)) {
            // if (VIZI.DEBUG) console.log("Trigger argument is a string", triggerArg);
            actionArgs.push(callbackArgs[triggerArguments.indexOf(triggerArg)]);
          // Advanced mapping of trigger argument to action argument
          } else if (_.isObject(triggerArg)) {
            if (VIZI.DEBUG) console.log("Trigger argument is an object", triggerArg);

            var items = self.getValueByKeys(callbackArgs[triggerArguments.indexOf(triggerArg.itemsObject)], triggerArg.itemsProperties.split("."));

            if (triggerArg.process === "map" && triggerArg.transformation) {
              if (VIZI.DEBUG) console.log("Mapping trigger argument items using transformation", triggerArg.transformation);

              items = (!_.isArray(items)) ? [items] : items;

              var transformedItems = _.map(items, function(item) {
                var output = {};

                _.each(triggerArg.transformation, function(properties, key) {
                  if (_.isArray(properties)) {
                    output[key] = [];

                    _.each(properties, function(property) {
                      output[key].push(self.getValueByKeys(item, property.split(".")));
                    });
                  } else {
                    output[key] = self.getValueByKeys(item, properties.split("."));
                  }
                });

                return output;
              });

              actionArgs.push(transformedItems);
            } else {
              throw new Error("Required process or transformation option is missing");
            }
          }
        });

        // Call action with mapped arguments
        if (VIZI.DEBUG) console.log("Action", actionName, actionArgs);
        actionObject[actionName].apply(actionObject, actionArgs);
      });
    });
    
    // TODO: Don't call init until addToWorld() is called
    // TODO: Prevent possible race condition on initialisation triggers
    // self.input.init();
    // self.output.init();
  };

  // Create a dynamic VIZI class instance
  // http://stackoverflow.com/a/5054940/997339
  VIZI.BlueprintSwitchboard.prototype.createViziClassInstance = function(className, args) {
    if (!className) {
      throw new Error("Required class name missing");
    } 

    if (!VIZI[className]) {
      throw new Error("VIZI." + className + " class could not be found");
    }

    // http://stackoverflow.com/a/5054940/997339
    var instance = VIZI[className];
    var params = [instance].concat(args);
    return new (instance.bind.apply(instance, params))();
  };

  // Split object string into real values
  // Retreives the value for "exampleObj.property"
  // Also retreives the value for "exampleObj.geometry[0]"
  VIZI.BlueprintSwitchboard.prototype.getValueByKeys = function(object, keys) {
    var output = object;

    _.each(keys, function(key) {
      if (!output) return null;

      // Check for array reference in key
      if (arrayIndexRegEx.test(key)) {
        var arrayKey = key.split("[")[0];
        var arrayIndex;

        arrayIndexRegExG.lastIndex = 0;

        while ((arrayIndex = arrayIndexRegExG.exec(key)) !== null) {
          output = output[arrayKey][arrayIndex[1]];
        }
      // Else, assume key is not an array
      } else {
        output = output[key];
      }
    });

    return output;
  };

  VIZI.BlueprintSwitchboard.prototype.addToWorld = function(world) {
    var self = this;

    if (VIZI.DEBUG) console.log("Adding Blueprint to world", self);

    world.addSwitchboard(self);

    self.input.init();

    // Add output to world
    self.output.addToWorld(world);
  };

  VIZI.BlueprintSwitchboard.prototype.onTick = function(delta) {
    var self = this;

    if (!self.output) return;

    self.output.onTick(delta);
  };
}());