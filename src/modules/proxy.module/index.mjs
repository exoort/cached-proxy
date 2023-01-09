import fastifyHttpProxy from '@fastify/http-proxy';

export const useProxyModule = (app) => {
  app.configModule.targets.forEach((target) => {
    app.register(fastifyHttpProxy, {
      upstream: target.url,
      prefix: target.prefix,
      rewritePrefix: target.rewritePrefix,
      http2: false,
      undici: true,
      disableCache: true,
      cacheURLs: 0,
    });
  });

  return app;
};
