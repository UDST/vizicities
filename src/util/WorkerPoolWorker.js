const DEBUG = false;

class WorkerPoolWorker {
  constructor(options) {
    this.workerScript = options.workerScript;

    this.ready = false;
    this.busy = false;
    this.deferred = null;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.worker = new Worker(this.workerScript);

      var onStartup = (event) => {
        if (!event.data || event.data.type !== 'startup') {
          reject();
          return;
        }

        this.ready = true;

        // Remove temporary message handler
        this.worker.removeEventListener('message', onStartup);

        // Set up listener to respond to normal events now
        this.worker.addEventListener('message', (event) => {
          this.onMessage(event);
        });

        // Resolve once worker is ready
        resolve();
      };

      // Set up temporary event listener for warmup
      this.worker.addEventListener('message', onStartup);
    });
  }

  exec(method, args, transferrables) {
    if (DEBUG) { console.log('Execute', method, args, transferrables); }

    var deferred = Promise.deferred();

    this.busy = true;
    this.deferred = deferred;

    this.worker.postMessage({
      method: method,
      args: args
    }, transferrables);

    return deferred.promise;
  }

  onMessage(event) {
    console.log('Message received from worker', performance.now());

    this.busy = false;

    if (!event.data || event.data.type === 'error' || event.data.type !== 'result') {
      this.deferred.reject(event.data.payload);
      return;
    }

    this.deferred.resolve(event.data.payload);
  }
}

export default WorkerPoolWorker;

// Quick shim to create deferred native promises
Promise.deferred = function() {
  var result = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};
