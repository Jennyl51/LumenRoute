# LumenRoute MVP starter patch

These files are **drop-in starting points** matched to the uploaded LumenRoute source ZIP. They are not yet deployed, and have not been tested against your live credentials. Back up your project and create a Git branch before replacing existing files.

## 0. Security and Git

**Do not upload the whole original ZIP to GitHub.** It contains `.env`, OAuth credential/token files, and `.git` history. Rotate compromised keys/tokens and check `git log`/history; `.gitignore` alone does not scrub earlier commits. The following files are intentionally absent from the patch: API keys and private credential files.

## 1. Prepare the database

1. Create a Supabase project at https://supabase.com/dashboard.
2. Open SQL Editor. Run `supabase/migrations/001_initial.sql` once.
3. Optional: import `supabase/demo_incidents.csv` into the public `incidents` table. It contains **175** usable, deduplicated historical 2025 geocoded records (from 201 source rows; 17 had missing coordinates and other rows included duplicate identifiers) (no addresses or user metadata). Review before making public.
4. In Authentication > Providers, enable Phone. Configure an SMS provider (paid per message), OR configure Supabase test phone numbers with fixed OTPs. Use rate limits/CAPTCHA for production.
5. Copy root `.env.example` into root `.env`, and copy `server/.env.example` into `server/.env`. Fill in values. Never put a server-side Google key or Supabase secret/service_role key in `EXPO_PUBLIC_` variables.
6. For this prototype, the `incidents` table has public SELECT access only; `profiles` records are readable/editable by their owners only. No public write policies are created.

## 2. Install frontend auth dependencies (from LumenRoute root)

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

The Google Maps loader is **already** included in your `package.json` (`@googlemaps/js-api-loader@^2`). The existing `app/(tabs)/map/index.tsx` imports `@/components/map/Map` and does not need changing.

## 3. Start the API (in another terminal)

```bash
cd server
npm install
npm run dev
```

Now visit `http://localhost:4000/api/health` — expected `{ "ok": true, "service": "lumenroute-api" }`.

## 4. Launch the web map

From the LumenRoute root:

```bash
npx expo start --web
```

Open the `/map` screen; choose a starting point and destination in the autocomplete inputs and click **Find walking route**. It requests `POST http://localhost:4000/api/route` using the backend Google Routes API key and draws its encoded walking polyline on the browser map.

### Google Cloud Console APIs

Enable a billing account and the **Maps JavaScript API**, **Places API (New)**, and **Routes API** for your Google Cloud project. Restrict the browser key by allowed HTTP referrer origins and appropriate APIs; use a separate server key, ideally with suitable IP/API restrictions when hosting supports them. Set quotas and billing alerts.

Test route endpoints inside the Berkeley demo bounding box (lat 37.7–38.0, lng -122.45–-122.1).

## 5. Test phone auth

Visit `http://localhost:8081/login` in web development mode. Enter an E.164 phone number (e.g. +1XXXXXXXXXX), request the OTP and verify it. The profile page is still a hardcoded UI sample, so the next step is replacing its placeholder username/friends with actual `auth.getUser()` and profile queries.

## Next milestone: crime-aware Dijkstra

The existing `berkeley_adj_list.csv` contains street IDs and lengths, but **not node coordinates**. Rebuild an OSMnx *walking* network, export `nodes.csv(id,lat,lng)` and `edges.csv(source,destination,length_m)`, match selected places to nearby nodes, then compute per-edge crime exposure and use Dijkstra with `edgeCost = length_m * (1 + alpha * normalizedExposure)`. Draw a second, distinct polyline and compare actual route distances and exposure. Do not call a path "safer" or use live alert language without appropriate validation.

### Deployment note

This patch's backend is a standalone Node HTTP server intended for local testing. `expo export --platform web` builds the **frontend only**; it does **not** deploy `server/index.js`. Before public Vercel deployment, choose an always-on Node host or adapt backend handlers to Vercel Functions, add abuse/rate-limit defenses to billable endpoints, and set production CORS/origin and `EXPO_PUBLIC_API_URL` values. Vercel frontend deployment should not be represented as a complete backend release.

## Files and scope

- Replacements: `components/map/Map.web.tsx`, `server/index.js`, `server/services/googleRoutes.js`
- New: `server/package.json`, `server/.env.example`, `.env.example`, `supabase/migrations/001_initial.sql`, `supabase/demo_incidents.csv`, `lib/supabase.ts`, `lib/auth.ts`, `app/login.tsx`
- Unchanged: `Map.native.tsx`, `app/(tabs)/map/search.tsx`, Dijkstra and existing community/profile code. Native turn-by-turn UI and risk-aware routes are **future tasks**, not implemented by this patch.
