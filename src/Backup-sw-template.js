/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
//? Se agregan las lineas de arriba para evitar errores con eslint - no afecta el funcionamiento
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.loadModule("workbox-background-sync");

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
  new RegExp(
    "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  ),
  new CacheFirst() // cacheFirst with Network Fallback
);

registerRoute(
  new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
  ),
  new CacheFirst()
);

registerRoute(
  ({ url }) => url.pathname.startsWith("/api/auth/renew"), //? Mine
  // new RegExp("http://localhost:3000/api/auth/renew"),
  new NetworkFirst()
);

registerRoute(
  ({ url }) => url.pathname.startsWith("/api/events"), //? Mine
  // new RegExp("http://localhost:3000/api/events"),
  new NetworkFirst()
);

// Posteos Offline
const bgSyncPlugin = new BackgroundSyncPlugin("posteos-offline", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  ({ url }) => url.pathname.startsWith("/api/events"), //? Mine
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

// Actualizacion Offline
const updatePlugin = new BackgroundSyncPlugin("update-offline", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  ({ url }) => url.pathname.includes("/api/events/"),
  new NetworkOnly({
    plugins: [updatePlugin],
  }),
  "PUT"
);

// Borrar Offline
const deletePlugin = new BackgroundSyncPlugin("delete-offline", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  ({ url }) => url.pathname.includes("/api/events/"),
  new NetworkOnly({
    plugins: [deletePlugin],
  }),
  "DELETE"
);
