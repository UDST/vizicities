import LRUCache from 'lru-cache';

// TODO: Make sure nothing is left behind in the heap after calling destroy()

// This process is based on a similar approach taken by OpenWebGlobe
// See: https://github.com/OpenWebGlobe/WebViewer/blob/master/source/core/globecache.js

class TileCache {
  constructor(cacheLimit, onDestroyTile) {
    this._cache = LRUCache({
      max: cacheLimit,
      dispose: (key, tile) => {
        onDestroyTile(tile);
      }
    });
  }

  // Returns true if all specified tile providers are ready to be used
  // Otherwise, returns false
  isReady() {
    return false;
  }

  // Get a cached tile without requesting a new one
  getTile(quadcode) {
    return this._cache.get(quadcode);
  }

  // Add tile to cache
  setTile(quadcode, tile) {
    this._cache.set(quadcode, tile);
  }

  // Destroy the cache and remove it from memory
  //
  // TODO: Call destroy method on items in cache
  destroy() {
    this._cache.reset();
    this._cache = null;
  }
}

export default TileCache;

var noNew = function(cacheLimit, onDestroyTile) {
  return new TileCache(cacheLimit, onDestroyTile);
};

// Initialise without requiring new keyword
export {noNew as tileCache};
