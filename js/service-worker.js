let CACHE = 'restaurant-cache-v1';
let urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/img/',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json'
];

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    // Perform install steps

    evt.waitUntil(
        caches.open(CACHE).then(function(CACHE) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(evt) {
    console.log(event.request.url);

    evt.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
