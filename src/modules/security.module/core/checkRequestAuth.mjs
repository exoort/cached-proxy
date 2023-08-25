import HttpErrors from 'http-errors';

export const checkRequestAuth = (request, app) => {
  const token = request.headers['x-proxy-auth'];

  const configuredToken = app.configModule.apiToken;

  if (configuredToken && token !== configuredToken) {
    throw new HttpErrors.Unauthorized('authorization required');
  }
};
