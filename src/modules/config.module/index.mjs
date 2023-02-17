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
  });

  return app;
};
