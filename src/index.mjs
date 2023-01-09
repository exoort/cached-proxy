import { useConfigModule } from './modules/config.module/index.mjs';
import { useMiddieModule } from './modules/middie.module.mjs';
import { useProxyModule } from './modules/proxy.module/index.mjs';
import { useEndpointsModule } from './modules/endpoints.module/index.mjs';
import { useSecurityModule } from './modules/security.module/index.mjs';
import { useCacheModule } from './modules/cache.module/index.mjs';

import { createApp, startApp } from './app.mjs';
import { pipe } from './utils/pipe.utile.mjs';

const init = () => {
  pipe(
    useConfigModule,
    useCacheModule,
    useSecurityModule,
    useMiddieModule,
    useEndpointsModule,
    useProxyModule,
    startApp,
  )(createApp());
};

init();
