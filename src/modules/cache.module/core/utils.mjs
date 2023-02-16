export function buildCacheKey(objectId, group) {
  const id = typeof objectId === 'string' ? objectId : objectId.key;
  const secret = typeof objectId === 'string' ? undefined : objectId.secret;

  return JSON.stringify({
    id,
    secret,
    group,
  });
}
