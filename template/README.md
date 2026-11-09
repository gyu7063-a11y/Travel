# 새 여행 만들기 (템플릿)

1. 이 `template` 폴더를 통째로 복사해서 이름을 바꿉니다. 예: `osaka-2027`
2. 복사한 폴더의 `index.html` 을 열고 맨 위 **CONFIG** 부분만 고칩니다
   - `id` 는 폴더 이름과 똑같이 (지출 기록이 이 이름으로 저장돼요)
   - 날짜, 인원, 통화(`currency`: JPY/USD/EUR/THB …), 숙소, 항공, 일정, 맛집, 쇼핑, 체크리스트
3. `sw.js` 의 `trip-TEMPLATE-` 를 `trip-<폴더이름>-` 으로 바꿉니다
4. `manifest.json` 의 이름을 바꿉니다
5. 루트의 `trips.json` 에 한 줄 추가 → 허브(내 여행 기록)에 카드가 생깁니다
   ```json
   { "id": "osaka-2027", "path": "osaka-2027/", "storage": "osaka-2027", "title": "오사카 여행", "emoji": "🏯",
     "place": "일본 오사카", "start": "2027-03-01", "end": "2027-03-03", "people": 4, "currency": "JPY", "color": "#0f2f4f", "memo": "" }
   ```
6. 커밋 & 푸시. 이후 내용을 고칠 때마다 `sw.js` 의 `CACHE_VERSION` 숫자를 올려주세요.

여행이 끝나면 예산 탭 → 💾 백업 파일(JSON)을 받아 폴더에 `expenses.json` 으로 넣으면
어느 기기에서든 "📚 보관된 기록 불러오기"와 허브 합계에 나타납니다. (저장소가 public 이면 누구나 볼 수 있어요)
