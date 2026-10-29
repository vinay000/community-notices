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
- **Mock API Layer:** Simulates 600ms latency and 1-in-5 failure rate using local `notices.json`, with `setMockFailuresEnabled` to turn failures off.

---

## Architecture

- **`src/app/`**: Expo Router navigation (`index.tsx` for feed, `notice/[id].tsx` for details).
- **`src/hooks/`**: Clean separation of logic — `useNoticeList` for feed, `useNoticeDetail` for details, `useTheme` for dark mode.
- **`src/services/`**: Mock network layer and API fetching logic.
- **`src/theme/`**: Centralized colors, spacing, and typography tokens.

---

## Edge Cases Handled

- **Long titles:** Clamped to 2 lines on list cards to maintain layout consistency.
- **Empty body text:** Shows friendly placeholder message instead of empty space.
- **Missing images:** Fallback placeholder icon displays gracefully on image load error.
- **Expired notices:** Marked with an "Expired" status badge on the detail screen to avoid confusion.
- **Future published dates:** Sorted newest-first at the top of the feed with their scheduled date clearly shown.
- **Network failure recovery:** Data is never wiped on error; pull-to-refresh recovers seamlessly.

---

## What to Add Before Shipping to Real Users

- **Testing:** Unit and hook tests using Jest + React Native Testing Library; E2E flow testing with Maestro.
- **Crash Reporting & Monitoring:** Sentry or Firebase Crashlytics for real-time crash reporting, error logs, and network telemetry.
- **Releases & CI/CD:** EAS Build for store submission and EAS Update for instant Over-The-Air bug fixes.

---

## What I Would Do Differently With More Time

- **Offline Caching:** SQLite or WatermelonDB for true offline-first persistence and failure fallback.
- **Search & Rich Filters:** Instant client-side search bar and multi-faceted filtering by department and date range.
- **Modular & Scalable Architecture:** Integrate a dedicated state/caching layer (e.g. TanStack Query) to scale data management cleanly as features grow.
