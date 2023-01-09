import cluster from 'cluster';
import { cpus } from 'os';

const createCluster = (startApp) => {
  if (cluster.isMaster) {
    // eslint-disable-next-line no-console
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < cpus().length; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      // eslint-disable-next-line no-console
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    startApp();
  }
};

const getWorkerId = () => {
  if (cluster.isMaster) {
    return 'master';
  }

  if (cluster.isWorker) {
    return `worker ${cluster.worker.id}`;
  }

  return 'not cluster';
};

export {
  createCluster,
  getWorkerId,
};
