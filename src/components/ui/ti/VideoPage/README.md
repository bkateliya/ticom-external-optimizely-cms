# Video pages

A single dynamic route renders **any** Brightcove video by id — there is **no
CMS page and no hand-built page per video**. The video id lives in the URL:

```
/en/video/6399222900112
/en/video/6399315429112
/<lang>/video/<brightcove-video-id>
```

## Request flow

```
Browser  →  [...slug]/page.tsx  →  VideoPage  →  /api/videos/[id]  →  Brightcove Playback API
(URL)        (route intercept)     (server)       (route handler)       (resolves HLS/MP4 src)
                                       │
                                       └─►  ReactVideoPlayer (client, react-player + hls.js)
```

1. **Route intercept** — `src/app/[...slug]/page.tsx`
   The app has one root catch-all route. For `/en/video/6399222900112` the slug
   is `["en", "video", "6399222900112"]`. After the language is shifted off, the
   route checks: if `slug[0] === "video"` and an id follows, it renders
   `<VideoPage id={...} />` and **returns early**, skipping the normal CMS
   `getContentByPath` lookup. This is why no CMS "video" page is required.

2. **VideoPage (server component)** — `VideoPage.tsx`
   - Builds an absolute base URL from the request `host` header (a server-side
     `fetch` cannot use a relative URL).
   - Calls `GET /api/videos/{id}`.
   - On non-200 → `notFound()`. On success → renders `<ReactVideoPlayer>` plus
     the title and description.
   - The description is Brightcove's `long_description`, which is an **HTML
     string**, so it is rendered with `dangerouslySetInnerHTML` (safe here
     because it is first-party content from our own Brightcove account).

3. **API (route handler)** — `src/app/api/videos/[id]/route.ts`
   - Calls the Brightcove **Playback API**:
     `https://edge.api.brightcove.com/playback/v1/accounts/{ACCOUNT_ID}/videos/{id}`
     with header `Accept: application/json;pk={POLICY_KEY}`.
   - Picks the best playable source via `pickSource()`: prefers an `https` HLS
     manifest (`application/x-mpegURL`), then MP4.
   - Returns `{ id, src, poster, title, description }`. Unknown id / no source
     → `404`.
   - Response is cached and revalidated hourly (`next: { revalidate: 3600 }`).

4. **ReactVideoPlayer (client component)** — `ReactVideoPlayer.tsx`
   - `"use client"` wrapper around `react-player` (v3).
   - Plays the `src` URL — HLS is handled by the bundled `hls.js`, DASH and MP4
     work too.
   - Rendered full-width in an `aspect-video` box (`controls`, `playsInline`).

## Why react-player needs the Playback API

`react-player` does **not** support Brightcove video ids directly (Brightcove
is not one of its providers). It plays file/HLS/DASH/MP4 URLs. So the API
resolves the actual streaming URL from Brightcove first, and react-player plays
that URL.

Trade-off: streaming the CDN URL directly means Brightcove **player analytics**
are not collected (the `<video-js>` in-page embed would report those). If you
need Brightcove viewing analytics, use the in-page `<video-js>` embed instead.

## Configuration

In `src/app/api/videos/[id]/route.ts`:

- `ACCOUNT_ID` — Brightcove account id (`3816841626001`).
- `POLICY_KEY` — public, read-only Playback API key.

### How the policy key was obtained

Every published Brightcove player exposes its policy key in its config JSON.
The file is gzip-compressed, so `--compressed` is required:

```bash
curl -s --compressed \
  "https://players.brightcove.net/3816841626001/d0PyGHVSu_default/config.json" \
  | grep -o '"policy_key": *"[^"]*"'
```

URL pattern: `https://players.brightcove.net/{ACCOUNT_ID}/{PLAYER_ID}_default/config.json`.
The policy key is public (it ships in every player on a live site) and grants
read-only access to the Playback API for the whole account — which is why this
route can resolve any video id, not just a fixed list.

## How to extend

- **Play another video** — just open `/<lang>/video/<id>`. Any id in the
  account works; nothing to register.
- **Change the URL word** (`video` → `watch`) — edit the `slug[0] === "video"`
  check in `src/app/[...slug]/page.tsx`.
- **Use a different account/player** — update `ACCOUNT_ID` / `POLICY_KEY` in the
  API route.
- **Untrusted descriptions** — if descriptions ever come from accounts you do
  not control, sanitize the HTML (e.g. `isomorphic-dompurify`) before passing it
  to `dangerouslySetInnerHTML`.

## Files

| File | Role |
| --- | --- |
| `src/app/[...slug]/page.tsx` | Intercepts `/<lang>/video/<id>` and renders `VideoPage` |
| `VideoPage.tsx` | Server component: fetches the API, renders player + title/description |
| `ReactVideoPlayer.tsx` | Client component: `react-player` playing the resolved source |
| `src/app/api/videos/[id]/route.ts` | Resolves the streaming source from Brightcove's Playback API |
