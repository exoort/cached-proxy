import cors from '@fastify/cors';
import { checkRequestAuth } from './core/checkRequestAuth.mjs';

export const useSecurityModule = async (app) => {
  if (app.configModule.allowedCors.length) {
    await app.register(cors, {
      origin: app.configModule.allowedCors,
    });
  } else {
    await app.register(cors, {
      origin: true,
    });
  }

  app.addHook('preHandler', (request, reply, done) => {
    checkRequestAuth(request, app);
    done();
  });

  return app;
};
