/* 후쿠오카 가족여행 가이드 — Service Worker
 * 전략
 *  - 앱 셸(index.html, manifest, 아이콘): 설치 시 미리 캐싱 → 오프라인에서도 즉시 열림
 *  - 같은 출처 요청: Stale-While-Revalidate (캐시 먼저 보여주고 뒤에서 최신화)
 *  - 페이지 이동(navigate): Network-First, 실패 시 캐시된 index.html
 *  - 외부 링크(유튜브·지도·블로그): 캐싱하지 않음 (온라인 전용)
 * 내용 수정 후 배포할 때는 CACHE_VERSION 숫자만 올리면 됩니다.
 */
const CACHE_VERSION = "v14";
const CACHE_NAME = `fuk26-${CACHE_VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith("fuk26-") && k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // 외부 사이트는 브라우저 기본 동작에 맡김
  if (url.origin !== self.location.origin) return;

  // 페이지 이동: 네트워크 우선 → 실패 시 캐시
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // 정적 리소스: 캐시 먼저, 백그라운드 갱신
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
