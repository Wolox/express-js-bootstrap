const { RedisCache } = require('apollo-server-cache-redis');
const { createHash } = require('crypto');

const config = require('../../config').common.redisCache;
const logger = require('../logger');

const cache = new RedisCache({
  host: config.host,
  db: config.name,
  maxRetriesPerRequest: 2,
  reconnectOnError: err => {
    const targetError = 'READONLY';
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true;
    }
    return false;
  }
});

const createCacheKey = stringKey => {
  const hashedKey = createHash('sha256')
    .update(stringKey)
    .digest('hex');
  return hashedKey;
};

const findInCache = (stringKey, deserialize) => {
  const key = createCacheKey(stringKey);
  return cache
    .get(key)
    .then(cachedInfo =>
      deserialize ? cachedInfo && deserialize(cachedInfo) : cachedInfo && JSON.parse(cachedInfo)
    );
};

const updateCache = (stringKey, value, serialize, ttl = config.timeToLive) => {
  const key = createCacheKey(stringKey);
  const stringValue = serialize ? serialize(value) : JSON.stringify(value);
  return ttl ? cache.set(key, stringValue, { ttl }) : cache.set(key, stringValue);
};

exports.init = (func, options) => ({
  load: params => {
    if (!params) {
      throw new Error('Params can not be undefined');
    }
    const stringKey = JSON.stringify(params);
    const serialize = options && options.serializer;
    const deserialize = options && options.deserializer;
    return findInCache(stringKey, deserialize)
      .catch(e => {
        logger.error(e.message);
        return undefined;
      })
      .then(
        cachedInfo =>
          cachedInfo ||
          func(params).then(response => {
            updateCache(stringKey, response, serialize).catch(e => logger.error(e.message));
            return response;
          })
      );
  }
});
