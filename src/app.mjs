import fastify from 'fastify';
import { cpus } from 'os';

import { startMemoryProfiler } from './utils/profiler.utile.mjs';
import { createCluster, logWithProcessName } from './utils/cluster.utile.mjs';

export const createApp = () => fastify({
  logger: true,
  disableRequestLogging: true,
});

const start = (app) => {
  const onListen = (err) => {
    if (app.configModule.memoryProfilerEnabled) {
      startMemoryProfiler();
    }

    logWithProcessName(console.log, `app running on port ${app.configModule.serverPort}`);

    if (err) {
      logWithProcessName(app.log.error, err);
      process.exit(1);
    }
  };

  app.listen(
    {
      port: app.configModule.serverPort,
    },
    onListen,
  );
};

const getClusterModeConfig = (maxWorkerThreads) => {
  let treadsCount = maxWorkerThreads;

  const useAllAvailableThreads = treadsCount === Infinity;

  const clustedModeEnabled = useAllAvailableThreads || treadsCount > 1;

  if (useAllAvailableThreads) {
    treadsCount = cpus().length;
  }

  return {
    treadsCount,
    clustedModeEnabled,
  };
};

export const startApp = (app) => {
  const { clustedModeEnabled, treadsCount } = getClusterModeConfig(app.configModule.maxWorkerThreads);

  if (clustedModeEnabled && app.configModule.isProductionEnv) {
    const actionForWorker = () => {
      start(app);
    };

    const onWorkerShutdown = () => {};

    createCluster(actionForWorker, onWorkerShutdown, treadsCount);
  } else {
    start(app);
  }
};
