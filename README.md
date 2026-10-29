# Community Notices

A mobile app for community members to browse notices, read details, and stay informed.

---

## Screenshots

<p align="center">
  <img src="assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20Pro%20-%202026-10-29%20at%2022.41.45.png" width="320" alt="Notice Feed" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="assets/screenshots/Simulator%20Screenshot%20-%20iPhone%2017%20Pro%20-%202026-10-29%20at%2022.41.53.png" width="320" alt="Notice Detail" />
</p>

---

## How to Run

```bash
npm install
npx expo start
```

- Press `i` to run on iOS Simulator
- Press `a` to run on Android Emulator

---

## Features & Implementation

- **Notice Feed:** Newest-first list with pagination (10 per page) and pull-to-refresh.
- **Category Filter:** Filter notices by Emergency, Community, Facilities, Services, and Events.
- **Priority & Read State:** High-priority notices stand out visually; read status survives app restarts via AsyncStorage.
- **Notice Detail:** View full notice with department, published date, image, and body content.
- **Offline / Stale Banner:** If network fails, previously loaded notices stay on screen with an unobtrusive banner.
- **Isolated Pagination Errors:** When loading more pages fails, an inline retry button appears without breaking the existing list.
- **Mock API Layer:** Simulates 600ms latency and 1-in-5 failure rate using local `notices.json`.

---

## Architecture

- **`src/app/`**: Expo Router navigation (`index.tsx` for feed, `notice/[id].tsx` for details).
- **`src/hooks/`**: Clean separation of logic — `useNoticeList` for feed, `useNoticeDetail` for details, `useTheme` for dark mode.
- **`src/services/`**: Mock network layer and API fetching logic.
- **`src/theme/`**: Centralized colors, spacing, and typography tokens.

---

## Edge Cases Handled

- **Long titles:** Clamped to 2 lines on list cards to maintain layout consistency.
- **Missing images:** Fallback placeholder icon displays gracefully on image load error.
- **Empty body text:** Shows friendly placeholder message instead of empty space.
- **Network failure recovery:** Data is never wiped on error; pull-to-refresh recovers seamlessly.

---

## Future Improvements

- **Offline Caching:** True offline-first caching for full offline access and fallback data on failure.
- **Search:** Instant client-side search across titles and departments.
