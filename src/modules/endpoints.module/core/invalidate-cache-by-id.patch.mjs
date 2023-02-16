import { buildCacheKey } from '../../cache.module/index.mjs';

const schema = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: ['string', 'object'] },
      group: { type: 'string', nullable: true },
    },
  },
};

export const invalidateCacheByIdEndpoint = async (app) => {
  const url = '/invalidate-cache';

  await app.route({
    method: 'PATCH',
    path: url,
    schema,
    handler: async (request, reply) => {
      const { id, group } = request.body;

      await app.cacheModule.remove(buildCacheKey(id, group));

      if (group) {
        await app.cacheModule.removeGroup(group);
      }

      return reply.send();
    },
  });

  return app;
};
