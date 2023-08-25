import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;

const shutdownClusterWorkers = () => {
  if (cluster.workers) {
    // eslint-disable-next-line no-console
    console.log('Gracefully shutting down worker processes...');
    Object.keys(cluster.workers).forEach((id) => {
      cluster.workers[id].send({ command: 'shutdown' });
    });
  }
};

const handleMasterProcess = (workersCount) => {
  const workersCountNumber = Number(workersCount);
  const maxWorkersCountNumber = Number(numCPUs);

  // eslint-disable-next-line no-console
  console.log(`Master process, pid ${process.pid} is running`);

  const isValidCount = workersCountNumber < maxWorkersCountNumber;

  console.log('workersCount', workersCountNumber, 'numCPUs', maxWorkersCountNumber);
  if (!isValidCount) {
    // eslint-disable-next-line no-console
    console.info(`threadsCount is ${workersCountNumber} but for app avaliable only ${maxWorkersCountNumber} workers`);
  }

  const validWorkersCount = isValidCount ? workersCountNumber : maxWorkersCountNumber;

  // Function to create worker processes
  const createWorkers = () => {
    // eslint-disable-next-line no-console
    console.log(`Forking ${validWorkersCount} workers. Max available workers: ${numCPUs}`);

    for (let i = 0; i < validWorkersCount; i += 1) {
      cluster.fork();
    }
  };

  // Handle the 'exit' event of a worker process
  cluster.on('exit', (worker, code, signal) => {
    // eslint-disable-next-line no-console
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
  });

  // Handle termination signals
  process.on('SIGINT', () => {
    shutdownClusterWorkers();
  });

  process.on('SIGTERM', () => {
    shutdownClusterWorkers();
  });

  // Create worker processes
  createWorkers();
};

const handleWorkerProcess = (actionFn, cleanupFn) => {
  // Worker process
  actionFn();

  // Listen for messages from the master process
  process.on('message', (message) => {
    if (message.command === 'shutdown') {
      if (cleanupFn) {
        cleanupFn();
      }

      process.exit(0);
    }
  });

  process.on('error', (err) => {
    if (err.code === 'EPIPE') {
      process.exit(0);
    }
  });
};

export const createCluster = (actionFn, cleanupFn, threadsCount) => {
  if (cluster.isPrimary) {
    handleMasterProcess(threadsCount);
  } else {
    handleWorkerProcess(actionFn, cleanupFn);
  }
};

export const getWorkerBadge = () => {
  if (cluster.isPrimary) {
    return `[master ${process.pid}]:`;
  }

  if (cluster.isWorker) {
    return `[worker ${cluster.worker.id}, pid ${process.pid}]:`;
  }

  return 'not cluster';
};

export const logWithProcessName = (logger, ...args) => {
  logger(getWorkerBadge(), ...args);
};
