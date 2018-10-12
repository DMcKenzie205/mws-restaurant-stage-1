/******************************************************************************
 * Resources

 https://serviceworke.rs

 */


let CACHE = 'restaurant-cache-v1';
let urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/img/',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json'
];

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    // Perform install steps

    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log(evt.request.url);

    evt.respondWith(fromCache(evt.request));

    evt.waitUntil(update(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll(urlsToCache);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function update(request) {
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}