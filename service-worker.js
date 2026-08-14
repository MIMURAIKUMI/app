// Timecard - offline cache
// Bump CACHE_NAME whenever index.html changes so users get the new version.
const CACHE_NAME = 'habitcard-v20';
const CORE_ASSETS = ['./', './index.html', './manifest.json', './pixel-arts.js'];

// Requests matching this list always try the network first, falling back to
// cache only when offline. This is app code (HTML/JS) that changes often —
// serving a stale cached copy here is exactly what caused "already fixed but
// still broken" reports (tab-memory, Google sign-in, etc. all live in these
// files, so a stale cache meant old bugs kept reappearing after real fixes).
function isAppCode(url) {
  return url.pathname.endsWith('/') ||
         url.pathname.endsWith('/index.html') ||
         url.pathname.endsWith('/pixel-arts.js') ||
         url.pathname.endsWith('/manifest.json');
}

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

  // App shell / app code: network-first (always get the latest version when online)
  if (event.request.mode === 'navigate' || (url.origin === self.location.origin && isAppCode(url))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
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
