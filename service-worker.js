/******************************************************************************
 * Resources

 https://serviceworke.rs

 */


let CACHE = 'restaurant-cache-v1';


self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    // Perform install steps

    evt.waitUntil(
            caches.open(CACHE)
            .then(function(cache) {

                return fetch('files-to-cache.json').then(function(response) {

                    return response.json();
                }).then(function(files) {

                    console.log('[install] Adding files from JSON file: ', files);
                    return cache.addAll(urlsToCache);
                });
            }).then(function() {

                console.log(
                            '[install] All required resources have been cached;',
                            'the Service Worker was successfully installed!');

                return self.skipWaiting();
            })
    );
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(
            caches.match(evt.request)
            .then(function(response) {

                if (response) {
                    console.log('[fetch] Returning from Service Worker cache: ',
                                evt.request.url
                                );
                    return response;
                }

                console.log('[fetch] Returning from Server: ', evt.request.url);
                return fetch(evt.request);
            }
            )
    );
});

self.addEventListener('activate', function(evt) {

    console.log('[activate] Activating service worker!');

    console.log('[activate] Claiming this service worker');
    evt.waitUntil(self.clients.claim());
});