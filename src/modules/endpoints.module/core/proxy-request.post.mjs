import { ProxyFailedError } from '../../errors.module/index.mjs';
import { buildCacheKey } from '../../cache.module/index.mjs';
import { createProxiedResponse } from '../../proxy.module/index.mjs';

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

  const rewriteHeaders = (headers, dontProxyHeaders) => {
    if (dontProxyHeaders) {
      return {};
    }

    const headersCopy = { ...headers };

    delete headersCopy['content-length'];
    delete headersCopy.host;
    delete headersCopy.connection;

    return headersCopy;
  };

  const httpCall = async (req, reqHeaders) => {
    const headers = {
      ...rewriteHeaders(reqHeaders, req.dontProxyHeaders),
      ...(req.headers || {}),
    };
    const res = await fetch(req.url, {
      method: req.method,
      body: req.body,
      cache: 'no-cache',
      searchParams: req.query,
      headers,
    });

    res.parsedBody = await res.text();

    if (res.status >= 400) {
      throw new ProxyFailedError(res, req, headers);
    }

    return res;
  };

  await app.route({
    method: 'POST',
    path: url,
    schema,
    handler: async (request, reply) => {
      const { id, invalidateCache, group } = request.body;

      const proxied = id
        ? await app.cacheModule.fetch(
          buildCacheKey(id, group),
          () => httpCall(request.body, request.headers),
          {
            invalidateCache,
          },
        )
        : await httpCall(request.body, request.headers);

      return createProxiedResponse(reply, proxied);
    },
  });

  return app;
};
