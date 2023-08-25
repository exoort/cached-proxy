import { createHmac } from 'crypto';

export const test = async (app) => {
  await app.route({
    method: 'GET',
    path: '/test',
    handler: async (request, reply) => {
      const promise = () => new Promise((resolve) => {
        setTimeout(() => {
          const hmac = createHmac('sha256', 'secret').update(new Array(10000).fill('as').join('.')).digest('hex');

          resolve(hmac);
        }, 100);
      });

      const result = await promise();
      reply.send(result);
    },
  });

  return app;
};
