import { pipe } from '../../utils/pipe.utile.mjs';
import { proxyRequestPostEndpoint } from './core/proxy-request.post.mjs';

export const useEndpointsModule = async (app) => {
  await pipe(
    proxyRequestPostEndpoint,
  )(app);

  return app;
};
