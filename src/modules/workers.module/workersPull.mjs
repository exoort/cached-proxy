const workersPull = {};

export const addAbortController = (id, controller) => {
  workersPull[id] = controller;
};

export const removeAbortController = (id) => {
  delete workersPull[id];
};

export const getAbortController = (id) => workersPull[id];

export const abortAll = () => {
  Object.values(workersPull).forEach((controller) => controller.abort());
};
