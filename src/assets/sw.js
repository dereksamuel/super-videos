const VERSION = "v0";

self.addEventListener("install", (event) => {
  event.waitUntil(precache()); // espera que promesa se rechace o se resuelva
});

self.addEventListener("fetch", (event) => {
  console.log(event);
  const request = event.request;
  // only work with get
  if (request.method !== "GET") {
    return;
  }

  //search into the CACHE
  event.respondWith(cachedResponse(request));

  //update CACHE
  event.waitUntil(updateCache(request));
});

async function precache() {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    "/",
    "/index.html",
    "/assets/index.mjs",
    "/assets/MediaPlayer.js",
    "/assets/plugins/AutoPlay.js",
    "/assets/plugins/AutoPause.js",
    "/assets/styles.css",
    "/assets/BigBuckBunny.mp4",
  ]);
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request); //una copia del request
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}
