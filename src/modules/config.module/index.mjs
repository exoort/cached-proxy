import fastifyEnv from '@fastify/env';

const envSchema = {
  type: 'object',
  required: ['SERVER_PORT'],
  properties: {
    SERVER_PORT: {
      type: 'number',
      default: 3000,
    },
    MEMORY_PROFILER: {
      type: 'boolean',
      default: true,
    },
    ALLOWED_CORS: {
      type: 'string',
      separator: ',',
      default: '',
    },
    TARGETS: {
      type: 'string',
      separator: ',',
      default: '',
    },
    API_TOKEN: {
      type: 'string',
      default: '',
    },
    MAX_WORKER_THREADS: {
      type: 'number',
      default: 0,
    },
    IS_PRODUCTION_ENV: {
      type: 'boolean',
      default: false,
    },
  },
};

export const useConfigModule = async (app) => {
  await app.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  });

  await app.decorate('configModule', {
    get serverPort() {
      return app.config.SERVER_PORT;
    },

    get memoryProfilerEnabled() {
      return app.config.MEMORY_PROFILER;
    },

    get allowedCors() {
      return app.config.ALLOWED_CORS;
    },

    get targets() {
      return app.config.TARGETS;
    },

    get apiToken() {
      return app.config.API_TOKEN;
    },

    get isProductionEnv() {
      return app.config.IS_PRODUCTION_ENV;
    },

    get maxWorkerThreads() {
      const threadsCount = app.config.MAX_WORKER_THREADS;

      if (threadsCount === -1) {
        return Infinity;
      }

      if ([0, 1].includes(threadsCount)) {
        return 1;
      }

      return threadsCount;
    },
  });

  return app;
};
