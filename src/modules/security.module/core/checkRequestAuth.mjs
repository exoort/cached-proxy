import HttpErrors from 'http-errors';

export const checkRequestAuth = (request, app) => {
  const token = request.headers['x-proxy-auth'];

  if (token !== app.configModule.apiToken) {
    throw new HttpErrors.Unauthorized('authorization required');
  }
};
