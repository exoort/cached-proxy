export default class ProxyFailedError extends Error {
  constructor(response, request) {
    const message = `Proxying request failed. ${JSON.stringify({
      response: response.parsedBody,
      request,
    })}`;

    super(message);

    this.statusCode = 500;

    this.response = response;

    Error.captureStackTrace(this, this.constructor);
  }
}
