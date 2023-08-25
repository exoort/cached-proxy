import { ProxyFailedError } from '../../errors.module/index.mjs';
import { buildCacheKey } from '../../cache.module/index.mjs';
import { createProxiedResponse } from '../../proxy.module/index.mjs';
import { fetchInWorker } from '../../workers.module/index.mjs';

const schema = {
  body: {
    type: 'object',
    required: ['url', 'method'],
    properties: {
      url: { type: 'string' },
      method: { type: 'string', enum: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] },
      query: { type: ['string', 'object'], nullable: true },
      body: { type: 'object', nullable: true },
      headers: { type: 'object', nullable: true },
      id: { type: ['string', 'object'], nullable: true },
      group: { type: 'string', nullable: true },
      dontProxyHeaders: { type: 'boolean', nullable: true },
      invalidateCache: { type: 'boolean', nullable: true },
    },
  },
};

export const proxyRequestPostEndpoint = async (app) => {
  const url = '/proxy-request';

  await app.route({
    method: 'POST',
    path: url,
    schema,
    handler: async (request, reply) => {
      const proxied = await fetchInWorker(request.body, request.headers);

      // return createProxiedResponse(reply, proxied);
      return reply.send(proxied);
    },
  });

  return app;
};
