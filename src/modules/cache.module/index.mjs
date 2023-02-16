import { memoryStorage } from './core/memory.storage.mjs';

export const useCacheModule = async (app) => {
  await app.decorate('cacheModule', memoryStorage({
    defaultCacheTime: Infinity,
    writeEmpty: true,
  }));

  return app;
};

export * from './core/utils.mjs';
