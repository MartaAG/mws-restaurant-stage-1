var staticCacheName = 'restaurant-cache-1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(
        [
          '/',
          './index.html',
          './restaurant.html',
          './css/styles.css',
          './css/responsive.css',
          './data/restaurants.json',
          './js/main.js',
          './js/restaurant_info.js.',
          './js.dbhelper.js',
          './img'
        ]
      );
    }).catch(error => {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant') &&
            cacheName !== staticCacheName;
        }).map(function (cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
