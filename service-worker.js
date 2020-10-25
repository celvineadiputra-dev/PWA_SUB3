importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log("workBox siap");
  const rev = 1;
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: rev },
    { url: "/manifest.json", revision: rev },
    { url: "/css/Main.css", revision: rev },
    { url: "/css/materialize.min.css", revision: rev },
    { url: "/css/Main.css", revision: rev },
    { url: "/css/Main.css", revision: rev },
    { url: "/css/materialize.min.css", revision: rev },
    { url: "/Js/Main.js", revision: rev },
    { url: "/Js/materialize.min.js", revision: rev },
    { url: "/Js/api.js", revision: rev },
    { url: "/Js/idb.js", revision: rev },
    { url: "/Js/db.js", revision: rev },
    { url: "/nav.html", revision: rev },
    { url: "/Pages/Home.html", revision: rev },
    { url: "/Pages/Favorit.html", revision: rev },
    { url: "/Pages/Score.html", revision: rev },
    { url: "Images/Favicon/apple-icon-57x57.png", revision: rev },
    { url: "Images/Favicon/apple-icon-60x60.png", revision: rev },
    { url: "Images/Favicon/apple-icon-72x72.png", revision: rev },
    { url: "Images/Favicon/apple-icon-76x76.png", revision: rev },
    { url: "Images/Favicon/apple-icon-114x114.png", revision: rev },
    { url: "Images/Favicon/apple-icon-120x120.png", revision: rev },
    { url: "Images/Favicon/apple-icon-144x144.png", revision: rev },
    { url: "Images/Favicon/apple-icon-152x152.png", revision: rev },
    { url: "Images/Favicon/apple-icon-180x180.png", revision: rev },
    { url: "Images/Favicon/android-icon-192x192.png", revision: rev },
    { url: "Images/Favicon/favicon-32x32.png", revision: rev },
    { url: "Images/Favicon/favicon-96x96.png", revision: rev },
    { url: "Images/Favicon/favicon-16x16.png", revision: rev },
    { url: "Images/Favicon/ms-icon-144x144.png", revision: rev },
    { url: "Images/Icon/MS_ICON.png", revision: rev },
    { url: "/Fonts/MA.woff2", revision: rev },
  ]);
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate()
  );

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/Pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages",
    })
  );
} else {
  console.log("workBox gagal");
}

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });
// self.addEventListener("fetch", function (event) {
//   const baseUrl = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(baseUrl) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
self.addEventListener("push", (e) => {
  let body;
  e.data ? (body = e.data.text()) : (body = "pesan push tidak playload");
  let options = {
    body: body,
    icon: "Images/Icon/MS_ICON.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  e.waitUntil(self.registration.showNotification("Push Notification", options));
});
