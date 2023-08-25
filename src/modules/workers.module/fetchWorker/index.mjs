import { Piscina } from 'piscina';
import { addAbortController, removeAbortController } from '../workersPull.mjs';

/**
 * @type {Piscina}
 */
let fetchWorker;

const createFetchWorker = () => new Piscina({
  filename: new URL('./worker.mjs', import.meta.url).href,
});

export const fetchInWorker = async (req, reqHeaders) => {
  if (!fetchWorker) {
    fetchWorker = createFetchWorker();
  }

  const abortController = new AbortController();
  const { signal } = abortController;

  const id = Date.now();

  addAbortController(id, abortController);

  const result = await fetchWorker.run({ req, reqHeaders }, { signal });

  removeAbortController(id);

  return result;
};
