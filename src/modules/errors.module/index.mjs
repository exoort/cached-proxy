import ProxyFailedError from './errors/ProxyFailedError.mjs';
import { createProxiedResponse } from '../proxy.module/index.mjs';

export { ProxyFailedError };

export const useErrorHandlers = (app) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ProxyFailedError) {
      app.log.error(error.message);

      createProxiedResponse(reply, error.response);
    } else {
      // fastify will use parent error handler to handle this
      reply.send(error);
    }
  });

  return app;
};
