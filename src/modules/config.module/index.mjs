export const useConfigModule = async (app) => {
  await app.decorate('configModule', {
    get serverPort() {
      return process.env.SERVER_PORT || 3000;
    },

    get memoryProfilerEnabled() {
      return process.env.MEMORY_PROFILER || true;
    },

    get allowedCors() {
      return process.env.ALLOWED_CORS || false;
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
