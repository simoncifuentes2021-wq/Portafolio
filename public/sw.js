// Retires service workers installed by earlier local or preview versions.
// This portfolio intentionally uses the network directly for current chunks.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.registration.unregister());
});
