self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  self.skipWaiting(); // Activate the service worker immediately after installation
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Allow all fetch requests to pass through (no specific handling)
  console.log('Fetching:', event.request.url);
});
