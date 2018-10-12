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
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    '/data/restaurants.json'
];

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    // Perform install steps

    evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
    console.log('The Service Worker is serving the asset.');

    evt.respondWith(fromNetwork(evt.request, 400).catch(function() {
        return fromCache(evt.request);
    }));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(urlsToCache);
    });
}

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {

        let timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
