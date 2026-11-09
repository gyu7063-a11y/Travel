/* 내 여행 허브 — Service Worker
 * 허브 페이지(루트)만 캐싱합니다. 각 여행 폴더는 자기 sw.js가 따로 관리해요.
 * 예전(후쿠오카 앱이 루트에 있던 시절) 캐시는 여기서 정리합니다.
 */
const CACHE = "trips-hub-v1";
const SHELL = ["./", "./index.html", "./trips.json", "./manifest.json", "./icon-192.png", "./icon-512.png"];
const ROOT = new URL("./", self.location).pathname;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => (k.startsWith("fuk26-") || k.startsWith("trips-hub-")) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const rel = url.pathname.slice(ROOT.length);
  // 허브 파일만 처리 (하위 폴더 = 각 여행은 건드리지 않음)
  if (rel.includes("/")) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});
