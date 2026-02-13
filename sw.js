const CACHE_NAME = 'baileys-bytes-v1'
const urlsToCache = [
    "/",
    "/index.html",
    "styles.css",
    "/main.js"
]

// install event and cache file
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Open cache')
                return cache.addAll(urlsToCache)
            })
    )
})

// Fetch event - serve from cache when offline
 self.addEventListener('fetch', (event) => {
    event.respondWith( 
        caches.match(event.request)
         .then((response) => {
            if (response) {
                return response;
            } 
            return fetch(event.request);
         }
        )
    )
})

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                        } 
                }) 
            )
        }) 
    )
})

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration)
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error)
            })
    })
}