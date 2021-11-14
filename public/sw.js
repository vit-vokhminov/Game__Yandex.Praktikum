import manifest from "./manifest";
const STATIC_CACHE_NAME = "static-data-v1";
const DYNAMIC_CACHE_NAME = "dynamic-data-v1";

const URLS = [];
console.log("1 URLS", URLS)

Object.keys(manifest).forEach(elem => URLS.push('/'+elem));
console.log("URLS", URLS)

// const URLS = [
//     "/",
//     "/index.html",
//     "/offline.html",
//     "/assets",
//     "/manifest.json",
// ];

self.addEventListener("install", async (event) => {
    const cache = await caches.open(STATIC_CACHE_NAME);
    console.log("install");
    cache.addAll(URLS);
});

self.addEventListener("activate", (e) => {
    console.log("activate");
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    event.respondWith(cacheData(request));
});

async function cacheData(request) {
    const cashedRequest = await caches.match(request);
    if (
        URLS.some((sa) => request.url.indexOf(sa) >= 0) ||
        request.headers.get("accept").includes("text/html")
    ) {
        return (
            cashedRequest ||
            (await caches.match("/offline.html")) ||
            networkFirst(request)
        );
    }
    return cashedRequest || networkFirst(request);
}

async function networkFirst(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch (error) {
        return await cache.match(request);
    }
}
