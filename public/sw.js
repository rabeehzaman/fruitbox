const CACHE_NAME = 'fruitbox-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(['/']))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Only handle GET requests from same origin
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // Cache-first for Next.js static assets (content-hashed, safe to cache forever)
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached ||
        fetch(e.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
      )
    );
    return;
  }

  // Network-first for HTML navigation — fall back to cache when offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() =>
          caches.match(e.request).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // Stale-while-revalidate for other same-origin assets (icons, manifest, etc.)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fresh = fetch(e.request)
        .then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, response.clone()));
          }
          return response;
        })
        .catch(() => {});
      return cached || fresh;
    })
  );
});
