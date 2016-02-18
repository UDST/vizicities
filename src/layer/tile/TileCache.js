import LRUCache from 'lru-cache';
import Tile from './Tile';

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

  // Get a cached tile or request a new one if not in cache
  requestTile(quadcode, layer) {
    var tile = this._cache.get(quadcode);

    if (!tile) {
      // Set up a brand new tile
      tile = new Tile(quadcode, layer);

      // Request data for various tile providers
      // tile.requestData(imageProviders);

      // Add tile to cache, though it won't be ready yet as the data is being
      // requested from various places asynchronously
      this._cache.set(quadcode, tile);
    }

    return tile;
  }

  // Get a cached tile without requesting a new one
  getTile(quadcode) {
    return this._cache.get(quadcode);
  }

  // Destroy the cache and remove it from memory
  //
  // TODO: Call destroy method on items in cache
  destroy() {
    this._cache.reset();
    this._cache = null;
  }
}

// Initialise without requiring new keyword
export default function(cacheLimit, onDestroyTile) {
  return new TileCache(cacheLimit, onDestroyTile);
};
