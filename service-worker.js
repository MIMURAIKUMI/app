// Timecard - offline cache
// Bump CACHE_NAME whenever index.html changes so users get the new version.
const CACHE_NAME = 'habitcard-v21';
const CORE_ASSETS = ['./', './index.html', './manifest.json', './pixel-arts.js'];

// Requests matching this list prefer the network (to get the latest version
// when online), but race it against a short timeout -- so a slow/flaky
// connection (common right after a cold app-icon launch) doesn't block
// startup indefinitely. If the network hasn't answered within NETWORK_TIMEOUT_MS
// and a cached copy exists, the cache is served immediately instead, while
// the network fetch keeps running in the background to refresh the cache for
// the next launch. This is app code (HTML/JS) that changes often — serving a
// stale cached copy here is exactly what caused "already fixed but still
// broken" reports (tab-memory, Google sign-in, etc. all live in these files,
// so a stale cache meant old bugs kept reappearing after real fixes) — so on
// a normal-speed connection this still behaves exactly like network-first.
function isAppCode(url) {
  return url.pathname.endsWith('/') ||
         url.pathname.endsWith('/index.html') ||
         url.pathname.endsWith('/pixel-arts.js') ||
         url.pathname.endsWith('/manifest.json');
}
const NETWORK_TIMEOUT_MS = 800;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // App shell / app code: network-first, but with a short timeout fallback
  // to cache so a slow connection doesn't block startup (see comment above).
  if (event.request.mode === 'navigate' || (url.origin === self.location.origin && isAppCode(url))) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);

      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (!cached) {
        // Nothing cached yet (first-ever load) -- must wait for the network,
        // same as before.
        return (await networkFetch) || cache.match('./index.html');
      }

      // Race the network against a short timeout. Keep the network fetch
      // running in the background (via waitUntil) even if the timeout wins,
      // so the cache still gets refreshed for the next launch.
      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NETWORK_TIMEOUT_MS));
      const winner = await Promise.race([networkFetch, timeout]);
      event.waitUntil(networkFetch);
      return winner || cached;
    })());
    return;
  }

  // Everything else (fonts, icons, other external assets): cache-first, revalidate in background
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});

