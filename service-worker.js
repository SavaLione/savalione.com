// Names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'savalione',
    suffix: 'v1.0',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(/\.html$/, new workbox.strategies.StaleWhileRevalidate());

// use `StaleWhileRevalidate` strategy for css and js
workbox.routing.registerRoute(/\.(?:js|json|css)$/, new workbox.strategies.StaleWhileRevalidate());

// CacheFirst strategy for fonts
workbox.routing.registerRoute(/\.(?:eot|svg|ttf|woff|woff2)$/,new workbox.strategies.CacheFirst());

// CacheFirst strategy for images
workbox.routing.registerRoute(/\.(?:ico|png|gif|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst());