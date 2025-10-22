self.addEventListener("install", event => {
	console.log("Service Worker установился");
	event.waitUntil(
		caches.open("pwa-cache").then(cache => {
			return cache
				.addAll([
					"/",
					"/index.html",
					"/styles/styles.css",
					"/scripts/script.js",
					"/icons/icon-192x192.png",
					"/icons/icon-512x512.png",
					"/manifest.json"
				])
				.catch(error => {
					console.error("Ошибка при кэшировании:", error);
					throw error; // Чтобы прервать установку, если ошибка
				});
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});
