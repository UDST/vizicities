importScripts('../vendor/three.min.js');

// Special version of ViziCities without controls (no DOM errors)
importScripts('../../dist/vizicities-worker.min.js');

const DEBUG = false;

if (DEBUG) { console.log('Worker started', performance.now()); }

// Send startup message to main thread
postMessage({
  type: 'startup',
  payload: performance.now()
});

// Recieve message from main thread
onmessage = (event) => {
  if (!event.data.method) {
    postMessage({
      type: 'error',
      payload: 'No method provided'
    });

    return;
  }

  var time = performance.now();
  if (DEBUG) { console.log('Message received from main thread', time, event.data); }
  // if (DEBUG) console.log('Time to receive message', time - event.data);

  // Run method
  // if (!methods[event.data.method]) {
  //   postMessage({
  //     type: 'error',
  //     payload: 'Method not found'
  //   });

  //   return;
  // }

  var methods = event.data.method.split('.');

  var _method = VIZI[methods[0]];

  if (methods.length > 1) {
    for (var i = 1; i < methods.length; i++) {
      _method = _method[methods[i]];
    }
  }

  // Call method with given arguments
  _method.apply(this, event.data.args).then((result) => {
    console.log('Message sent from worker', performance.now());

    // Return results
    postMessage({
      type: 'result',
      payload: result.data
    }, result.transferrables);
  });
};