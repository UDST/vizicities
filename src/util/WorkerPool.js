import WorkerPoolWorker from './WorkerPoolWorker';

const DEBUG = false;

// Polyfill for Array.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}

class WorkerPool {
  constructor(options) {
    this.numThreads = options.numThreads || 2;
    this.workerScript = options.workerScript;

    this.workers = [];
    this.tasks = [];
  }

  createWorkers() {
    return new Promise((resolve, reject) => {
      var workerPromises = [];

      for (var i = 0; i < this.numThreads; i++) {
        workerPromises.push(this.createWorker());
      }

      Promise.all(workerPromises).then(() => {
        if (DEBUG) { console.log('All workers ready', (performance || Date).now()); }
        resolve();
      }).catch(reject);
    });
  }

  createWorker() {
    return new Promise((resolve, reject) => {
      // Initialise worker
      var worker = new WorkerPoolWorker({
        workerScript: this.workerScript
      });

      // Start worker and wait for it to be ready
      return worker.start().then(() => {
        if (DEBUG) { console.log('Worker ready', (performance || Date).now()); }

        // Add worker to pool
        this.workers.push(worker);

        resolve();
      }).catch(reject);
    });
  }

  getFreeWorker() {
    return this.workers.find((worker) => {
      return !worker.busy;
    });
  }

  // Execute task on a worker
  exec(method, args, transferrables) {
    var deferred = Promise.deferred();

    // Create task
    var task = {
      method: method,
      args: args,
      transferrables: transferrables,
      deferred: deferred
    };

    // Add task to queue
    this.tasks.push(task);

    // Trigger task processing
    this.processTasks();

    // Return task promise
    return task.deferred.promise;
  }

  processTasks() {
    if (DEBUG) { console.log('Processing tasks'); }

    if (this.tasks.length === 0) {
      return;
    }

    // Find free worker
    var worker = this.getFreeWorker();

    if (!worker) {
      if (DEBUG) { console.log('No workers free'); }
      return;
    }

    // Get oldest task
    var task = this.tasks.shift();

    // Execute task on worker
    worker.exec(task.method, task.args, task.transferrables).then((result) => {
      // Trigger task processing
      this.processTasks();

      // Return result in deferred task promise
      task.deferred.resolve(result);
    }).catch((err) => {
      // Trigger task processing
      this.processTasks();

      task.deferred.reject(err);
    });
  }
}

export default WorkerPool;

// Quick shim to create deferred native promises
Promise.deferred = function() {
  var result = {};

  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};
