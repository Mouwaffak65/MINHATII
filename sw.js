const CACHE = 'mnh-ti-v1';
const urls = ['index.html', 'css/style.css', 'js/app.js', 'manifest.json', 'icons/icon.svg'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(urls)));
    self.skipWaiting();
});

self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request).then(res => {
            if (res.ok && e.request.method === 'GET') {
                const clone = res.clone();
                caches.open(CACHE).then(c => c.put(e.request, clone));
            }
            return res;
        })).catch(() => caches.match('index.html'))
    );
});
