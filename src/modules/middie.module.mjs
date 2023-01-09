import middie from '@fastify/middie';

export const useMiddieModule = async (fastify) => {
  await fastify.register(middie);

  return fastify;
};
