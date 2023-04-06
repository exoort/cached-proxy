export function createProxiedResponse(reply, proxied) {
  return reply
    .type(proxied.headers.get('content-type'))
    .status(proxied.status)
    .headers(proxied.headers)
    .send(proxied.parsedBody);
}
