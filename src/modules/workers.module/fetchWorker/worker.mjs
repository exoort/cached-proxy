import { ProxyFailedError } from '../../errors.module/index.mjs';

export default async function fetchWorker({ req, reqHeaders }) {
  const rewriteHeaders = (headers, dontProxyHeaders) => {
    if (dontProxyHeaders) {
      return {};
    }

    const headersCopy = { ...headers };

    delete headersCopy['content-length'];
    delete headersCopy.host;
    delete headersCopy.connection;

    return headersCopy;
  };

  const headers = {
    ...rewriteHeaders(reqHeaders, req.dontProxyHeaders),
    ...(req.headers || {}),
  };
  const res = await fetch(req.url, {
    method: req.method,
    body: req.body,
    cache: 'no-cache',
    searchParams: req.query,
    headers,
  });

  res.parsedBody = await res.text();

  if (res.status >= 400) {
    throw new ProxyFailedError(res, req, headers);
  }

  return res.parsedBody;
}
