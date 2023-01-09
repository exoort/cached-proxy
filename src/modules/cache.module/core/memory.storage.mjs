const isFunction = (value) => value && (Object.prototype.toString.call(value) === '[object Function]' || typeof value === 'function' || value instanceof Function);

// const parseItemKey = (itemKey) => {
//   const keyIsString = typeof itemKey === 'string';
//
//   const key = keyIsString ? itemKey : itemKey.key;
//   const secret = !keyIsString ? (itemKey?.secret || null) : null;
//
//   return {
//     key,
//     secret,
//   };
// };

/**
 *  Get cached data from memory on server side
 * @returns {({ disabled: boolean, writeEmpty: boolean }) => DataCache}
 */
export function memoryStorage(config) {
  const cache = new Map();

  /**
     * @returns {DataCache}
     */
  return {
    async fetch(key, dataSource, seconds = config.defaultCacheTime) {
      let data = await this.get(key);

      if (!data && dataSource) {
        if (isFunction(dataSource)) {
          data = await dataSource();
        } else {
          data = dataSource;
        }

        await this.set(key, data, seconds);
      }

      return data;
    },

    set(key, value, seconds = config.defaultCacheTime) {
      if (!config?.writeEmpty && !value) {
        return Promise.resolve(false);
      }

      const time = Number.isFinite(seconds) ? Infinity : new Date().getTime() + (seconds * 1000);

      cache.set(key, {
        value,
        time,
      });

      return Promise.resolve(true);
    },

    async get(key) {
      const cached = cache.get(key);

      if (!cached) {
        return null;
      }

      const now = Date.now();

      if (now > cached?.time) {
        await this.remove(key);

        return null;
      }

      return cached.value;
    },

    remove(key) {
      if (cache.get(key)) {
        cache.delete(key);
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    },

    getAll() {
      return Promise.resolve(cache);
    },
  };
}
