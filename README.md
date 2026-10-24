# Steady Steps — Phase 4

A responsive React + TypeScript prototype using Vite, Material UI, Material UI Icons, and React Router.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run typecheck
npm run build
npm run preview
```

Home (`/`) has three navigation cards. `/calm` has a guided breathing activity with Gentle, Balanced, and Custom pacing, 1–3 minute sessions, pause/resume/restart/end controls, reduced motion, and an optional completion check-in. `/reflect` has a five-step Helpful Thoughts Journal with optional emotion selections, fictional examples, reflection questions, editable helpful thoughts, and a closing summary. `/support` has 12 fictional peer support listings, topic/age/format/location filters, demo detail dialogs, and a separate section linking to four established organizations. The header navigation and Get Help Now dialog are available on every route. Unknown routes include a way home.

Support data lives in `src/data/supportGroups.ts`. Topics match any selected category, age ranges match by overlap, and hybrid groups match either format. Anywhere includes every sample location; Duluth includes local examples and nationwide online examples. All listing details are fictional, with no meeting registration or contact mechanism. Official resource links open only when clicked, send no filter values, and suppress the referrer; these external sites have their own practices. NCTSN and FindTreatment.gov are information/service discovery resources, not peer groups.

Journal responses exist only in the mounted activity’s React state. Back and Next preserve responses within the activity; leaving the route or refreshing starts an empty journal. All steps can be skipped. Exit leaves immediately, and Finish returns home. There are no journal save, share, download, logging, or export features.

Breathing settings are selected before starting. End Activity remains fixed on screen; choose Try Again to change the pace or session length. Reduce Motion defaults to the browser preference and can be changed during a session. Timing uses a monotonic clock and cancels the animation frame on pause, end, completion, and unmount.

Run the timing tests with Node 22.18+ (Node 24 recommended):

```sh
node --experimental-strip-types --test --test-isolation=none tests/breathing-timing.test.mjs
node --experimental-strip-types --test --test-isolation=none tests/journal-state.test.mjs
node --experimental-strip-types --test --test-isolation=none tests/support-filters.test.mjs
```

Interactions use React state and reset on refresh. The application uses no browser persistence, remote fonts, external assets, API calls, authentication, analytics, databases, or telemetry. Opening the help dialog does not contact anyone. Vite’s local development connection supports hot reload; the application sends no user information to a server.

## GitHub Pages demo

The repository is https://github.com/tgibbons-css/AI_Hackathon_Oct2026.

In the repository’s **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The `Deploy Steady Steps to GitHub Pages` workflow tests and publishes the app on pushes to `main`; it can also be run manually from the Actions tab.

Once deployment succeeds, open https://tgibbons-css.github.io/AI_Hackathon_Oct2026/.

The Pages build uses hash-based routes, such as `/#/calm`, `/#/reflect`, and `/#/support`, to support direct links and refreshes on static hosting. Local development still uses `/calm`, `/reflect`, and `/support`. The skip-to-content link works with both routing modes.

To check the Pages build locally:

```sh
npm test
npm run build:pages
npm run preview:pages
```

Open http://127.0.0.1:4173/AI_Hackathon_Oct2026/ in the preview server. Use Node 24 for the deployment workflow and tests. `npm run build` remains available for hosts with an SPA fallback to `index.html`.

The app does not add analytics or transmit journal entries. Hosting providers may keep their own access logs; GitHub Pages documents security logging of visitor IP addresses at https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages.
