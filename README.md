# ✈️ 내 여행 기록

- 허브: https://gyu7063-a11y.github.io/Travel/
- 후쿠오카 2026: https://gyu7063-a11y.github.io/Travel/fukuoka-2026/
- 새 여행 템플릿: `template/` (사용법은 template/README.md)

## 구조
| 경로 | 내용 |
|---|---|
| `index.html`, `trips.json` | 여행 목록(허브). 새 여행은 trips.json에 한 줄 추가 |
| `fukuoka-2026/` | 후쿠오카 가이드 (보관용) |
| `template/` | 다음 여행용 템플릿 (CONFIG만 수정) |

## 지출 기록
- 기록은 각 기기 브라우저에 저장됩니다 (폰 ≠ PC)
- 예산 탭 → 🔗 **옮기기 링크**: 폰에서 만든 링크를 PC에서 열면 그대로 들어옵니다
- 📄 CSV(엑셀) / ✉️ 이메일 / 💾 JSON 백업·불러오기
- 영구 보관: JSON 백업을 `<여행폴더>/expenses.json` 으로 커밋 (⚠️ public 저장소면 공개됨)

수정 후 배포할 때는 해당 폴더 `sw.js` 의 `CACHE_VERSION` 을 올려주세요.
