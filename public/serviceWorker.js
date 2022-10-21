importScripts('firebase-messaging-sw.js')

const CACHE_NAME = 'MATRICULA_UFSC_PWA'

const IMAGES = [
  'images/book-stack-16.png',
  'images/book-stack-24.png',
  'images/book-stack-32.png',
  'images/book-stack-64.png',
  'images/book-stack-128.png',
  'images/book-stack-256.png',
  'images/book-stack-512.png',
]

const OFFLINE_URLS = ['/pedidoMatricula', '/horarios', '/diasSemana']

const FILES_TO_CACHE = ['/', 'index.html', 'manifest.json', 'favicon.ico', '/static/js/bundle.js', ...IMAGES]

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(FILES_TO_CACHE)
    })
  )
})

// Estrategia "Network first, falling back to cache"
// Ref: https://developer.chrome.com/docs/workbox/caching-strategies-overview/
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      var fetchRequest = event.request.clone()
      return fetch(fetchRequest)
        .then((response) => {
          if (OFFLINE_URLS.some((url) => event.request.url.includes(url))) {
            console.debug(`[serviceWorker] Guardando na cache para fetchUrl=${event.request.url}`)
            cache.put(event.request, response.clone())
          }
          return response
        })
        .catch(() => {
          var fetchRequest = event.request.clone()
          return cache.match(fetchRequest.url)
        })
    })
  )
})
