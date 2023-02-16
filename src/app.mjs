import fastify from 'fastify';

import { startMemoryProfiler } from './utils/profiler.utile.mjs';

export const createApp = () => fastify({
  logger: false,
  disableRequestLogging: true,
});

const start = (app) => {
  const onListen = (err) => {
    if (app.configModule.memoryProfilerEnabled) {
      startMemoryProfiler();
    }

    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  console.log('config', app.configModule.serverPort);

  app.listen(
    {
      port: app.configModule.serverPort,
    },
    onListen,
  );
};

export const startApp = (app) => {
  start(app);
};
