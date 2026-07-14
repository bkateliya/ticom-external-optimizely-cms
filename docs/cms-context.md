# Page context: `getContext` / `getContextData`

How server components read page-level data (page title, content id, breadcrumb,
site settings, locale, …) **without prop drilling**, and how to feed data into
that store.

---

## Why this exists

The Optimizely SDK renders each content node with only its **own** `content`.
A nested component like `Hero` never receives the parent page's data through
props. To bridge that gap the SDK keeps a small **request-scoped store**: a
renderer higher up writes values into it, and any nested server component reads
them back.

- Backed by `React.cache()`, so the store is **isolated per request** and shared
  across the whole server-component tree for that request.
- Initialized by `withAppContext` (which wraps the route). See the "clears"
  gotcha below.

---

## The API

All exported from `@optimizely/cms-sdk/react/server` — **server components only**.

| Function | Signature | Use |
| --- | --- | --- |
| `getContext()` | `() => ContextData \| undefined` | Read the **whole** context object. |
| `getContextData(key)` | `(key) => ContextData[key] \| undefined` | Read **one** typed value. |
| `setContextData(key, value)` | `(key, value) => void` | Write **one** value. |
| `setContext(value)` | `(Partial<ContextData>) => void` | Merge several values at once. |
| `withAppContext(Component)` | HOC | Initialize (and **clear**) the store for a request. |

### `getContext()` — the whole object

```ts
import { getContext } from "@optimizely/cms-sdk/react/server";

console.log("full context data", getContext());
// { locale, previewToken, mode, pageTitle, pageContentId, pageType, breadcrumbPath, siteSettings, ... }
```

Returns `undefined` if no context has been initialized for the request.

### `getContextData(key)` — one typed value

```ts
import { getContextData } from "@optimizely/cms-sdk/react/server";

const pageTitle = getContextData("pageTitle");     // string | undefined
const locale = getContextData("locale");           // string | undefined
```

Prefer this over `getContext().pageTitle` — it's typed to the exact key and
reads cleaner.

---

## Available keys

Built-in keys (`ContextData` in the SDK): `version`, `type`, `currentContent`,
`previewToken`, `mode`, `locale`, `key`.

This app **augments** that interface with its own keys in
[`src/types/optimizely-react-server.d.ts`](../src/types/optimizely-react-server.d.ts):

```ts
declare module "@optimizely/cms-sdk/react/server" {
  export interface ContextData extends BaseContextData {
    siteSettings: ContentProps<typeof SiteSettingsDataType>;
    pageTitle: string;
    pageContentId: string;
    pageType: string;
    breadcrumbPath: PathItem[] | null;
  }
}
```

**To add a new key:** add it here first (for type safety), then `setContextData`
it from a renderer and `getContextData` it from consumers.

> ⚠️ The built-in `key` / `currentContent` fields are **not** auto-populated by
> the SDK. If you want the current page's id, use the app's `pageContentId`
> (set by `setPageContext`, below) — `getContext().key` will be empty.

---

## Reading in a component

`Hero` reads the page title that a page/experience set upstream:

```tsx
// src/components/cms/components/Hero/Hero.tsx
import { getContextData } from "@optimizely/cms-sdk/react/server";

export function HeroComponent({ content }: Props) {
  const pageTitle = getContextData("pageTitle");
  const pageContentId = getContextData("pageContentId");

  return pageTitle ? <p>{pageTitle}</p> : null;
}
```

Always guard — a value is only present if a renderer set it before this
component rendered (see rules below).

---

## Writing (providing) data

Page/experience renderers populate the store. This app centralizes the
page-level values in one helper,
[`src/lib/utils/page-context-utils.ts`](../src/lib/utils/page-context-utils.ts):

```ts
export function setPageContext(content: PageContextContent, pageTitle: string) {
  setContextData("pageTitle", pageTitle);
  setContextData("pageContentId", content._metadata?.key ?? "");
  setContextData("pageType", content._metadata?.types?.[0] ?? "");
}
```

Called from every top-level renderer so nested components get consistent data:

```tsx
// GenericExperience.tsx (experiences)
setPageContext(content, content.pageTitle || content.hero?.headline || "");

// GenericPage.tsx (pages)
setPageContext(content, content.pageTitle ?? "");
```

Other values are set by the route / layout: `breadcrumbPath` and `siteSettings`
in [`[[...slug]]/page.tsx`](../src/app/%5Blocale%5D/%5B%5B...slug%5D%5D/page.tsx),
`locale` in the layout.

---

## Rules & gotchas

1. **Server components only.** `getContextData`/`setContextData` import from
   `.../react/server`. They do nothing useful in client components.

2. **Order matters — writer must render before reader.** The store is filled
   top-down during render. A component only sees a key if an ancestor set it
   earlier in the tree. `Hero` sees `pageTitle` because `GenericPage` /
   `GenericExperience` (its ancestor) call `setPageContext` first.

3. **`withAppContext` clears the store.** It calls `initializeContext()`, which
   **deletes every key** to start the request fresh. The route is already
   wrapped in `withAppContext`, so:
   - Renderers rendered *inside* the route (e.g. `GenericExperience`) should
     **not** re-wrap — doing so wipes values the route set (like
     `breadcrumbPath`).
   - `Article` currently self-wraps in `withAppContext`; that clears
     `breadcrumbPath`/`siteSettings` for its subtree. Prefer not to re-wrap
     child renderers.

4. **Everything is per-request.** `React.cache()` guarantees isolation between
   concurrent requests — no leakage between users.

---

## Quick reference

```ts
import {
  getContext,       // whole object
  getContextData,   // one value (typed)
  setContext,       // merge many
  setContextData,   // set one
  withAppContext,   // init store (clears!) — wrap the route only
} from "@optimizely/cms-sdk/react/server";
```
