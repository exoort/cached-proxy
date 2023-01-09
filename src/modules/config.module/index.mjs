export const useConfigModule = async (app) => {
  await app.decorate('configModule', {
    get serverPort() {
      return process.env.SERVER_PORT || 3000;
    },

    get serverHost() {
      return process.env.SERVER_HOST || '127.0.0.1';
    },

    get isProductionEnv() {
      return process.env.NODE_ENV === 'production';
    },

    get clusterModeEnabled() {
      return process.env.CLUSTER_MODE || false;
    },

    get memoryProfilerEnabled() {
      return process.env.MEMORY_PROFILER || true;
    },

    get httpsEnabled() {
      return process.env.HTTPS_ENABLED || true;
    },

    get allowedCors() {
      return process.env.ALLOWED_CORS || false;
    },

    get cacheRequests() {
      return process.env.CACHE_REQUESTS || true;
    },

    get targets() {
      return process.env.TARGETS || [];
    },

    get apiToken() {
      return process.env.API_TOKEN;
    },
  });

  return app;
};
