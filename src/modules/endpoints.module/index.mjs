import { pipe } from '../../utils/pipe.utile.mjs';
import { proxyRequestPostEndpoint } from './core/proxy-request.post.mjs';
import { invalidateCacheByIdEndpoint } from './core/invalidate-cache-by-id.patch.mjs';

export const useEndpointsModule = async (app) => {
  await pipe(
    proxyRequestPostEndpoint,
    invalidateCacheByIdEndpoint,
  )(app);

  return app;
};
