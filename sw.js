const CACHE_NAME = 'kazan-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Инсталиране и кеширане на файловете
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Зареждане от кеша, когато няма интернет
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Връщаме кешираната версия или правим нова заявка
        return response || fetch(event.request);
      })
  );
});
