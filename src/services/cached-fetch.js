// eslint-disable-next-line no-undef
const cache = caches.default;

async function cachedFetch(url, options = {}) {
  if (options.cacheOverride) {
    // eslint-disable-next-line no-undef
    return fetch(url, options);
  }

  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    return cachedResponse;
  }

  // eslint-disable-next-line no-undef
  const response = await fetch(url, options);
  if (response.status === 200) {
    await cache.put(url, response.clone());
  }

  return response;
}

module.exports = cachedFetch;
