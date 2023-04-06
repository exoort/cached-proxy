import { useConfigModule } from './modules/config.module/index.mjs';
import { useEndpointsModule } from './modules/endpoints.module/index.mjs';
import { useSecurityModule } from './modules/security.module/index.mjs';
import { useCacheModule } from './modules/cache.module/index.mjs';

import { createApp, startApp } from './app.mjs';
import { pipe } from './utils/pipe.utile.mjs';
import { useErrorHandlers } from './modules/errors.module/index.mjs';

const init = () => {
  pipe(
    useConfigModule,
    useErrorHandlers,
    useCacheModule,
    useSecurityModule,
    useEndpointsModule,
    startApp,
  )(createApp());
};

init();
