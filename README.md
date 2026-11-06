# 후쿠오카 가족여행 가이드 (PWA)

## GitHub Pages 배포 (5분)
1. GitHub에서 새 저장소 생성 (예: `fukuoka-trip`, Public)
2. 이 폴더의 파일 5개를 **저장소 루트에** 업로드
   - `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`
3. Settings → Pages → Branch: `main` / `(root)` → Save
4. 1~2분 후 `https://<아이디>.github.io/fukuoka-trip/` 접속

## 가족에게 공유
- 위 주소를 카톡으로 공유 → 각자 와이파이에서 한 번 열기
- iPhone: Safari 공유 → 홈 화면에 추가 / Android: Chrome ⋮ → 앱 설치
- 이후 홈 화면 아이콘으로 열면 오프라인에서도 동작

## 내용 수정 후 재배포
- `index.html` 수정 → `sw.js`의 `CACHE_VERSION`을 `v2`, `v3`…로 올리고 업로드
- 메모·체크리스트·추가 맛집은 각자 폰에 저장됨(공유되지 않음)
