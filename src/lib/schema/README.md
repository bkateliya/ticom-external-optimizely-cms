# Structured Data (Schema.org / JSON-LD)

Emits [Schema.org](https://schema.org) structured data as `<script type="application/ld+json">`
for SEO / rich results. Currently produces **Article** + **BreadcrumbList**
(article pages) and **WebSite** (home).

**Core principle:** schema is **derived in code** from data a page already has
(title, description, image, publish metadata, URL). There are **no
schema-specific CMS fields** and **no CMS push** is required — everything the
builders read is already returned by `getContentByPath`.

---

## Files

| File | Responsibility |
|------|----------------|
| [`index.ts`](./index.ts) | Core — types, URL helpers, and the builders (`buildArticleSchema`, `buildBreadcrumbSchema`, `buildWebSiteSchema`). |
| [`registry.ts`](./registry.ts) | **Per-page selection** — `schemaRegistry`, `resolveSchemaBuilders`, `buildPageSchemas`. **This is the file you edit to configure what each page emits.** |
| [`JsonLd.tsx`](../../components/ui/Atoms/JsonLd/JsonLd.tsx) | Low-level primitive: renders one (or many) JSON-LD nodes as a safe `<script>`. |
| [`SchemaMarkup.tsx`](../../components/cms/SchemaMarkup/SchemaMarkup.tsx) | Page-level component: looks up the page's schema set and renders it. |

Dependency direction is one-way: `registry.ts → index.ts`. Core never imports
the registry, so the selection config stays isolated.

---

## How it works

```
Route: [locale]/[[...slug]]/page.tsx   (one central placement for every page type)
  └─ <SchemaMarkup content={mainContent} />
       └─ buildPageSchemas(content)              // registry.ts
            └─ resolveSchemaBuilders(content)    // looks up _metadata.types in schemaRegistry
                 └─ [buildArticleSchema, buildBreadcrumbSchema, …]  // index.ts
                      └─ each returns a JSON-LD node, or null if N/A
       └─ <JsonLd data={nodes} />                // one <script type="application/ld+json">
```

`<SchemaMarkup>` is rendered **once**, centrally, in
[`[locale]/[[...slug]]/page.tsx`](../../app/[locale]/[[...slug]]/page.tsx) — which
every CMS page routes through. Individual page components (Article, etc.) do
**not** add it.

1. The route renders `<SchemaMarkup content={mainContent} />`.
2. `buildPageSchemas` reads `content._metadata.types` and looks each up in
   `schemaRegistry` to get the ordered list of builders for that page **type**.
3. Each builder derives its node from the content (or returns `null`).
4. Non-null nodes are emitted in a single `<script>` tag.

**"Some pages have schema, some don't"** falls out of this naturally: a page
type **not listed** in `schemaRegistry` resolves to zero builders and renders
nothing.

---

## Configuring schema

### 1. Give a page type some schema

Edit [`registry.ts`](./registry.ts). Map the content-type key to an ordered list
of builders:

```ts
export const schemaRegistry: Record<string, SchemaBuilder[]> = {
  [ArticlePageType.key]: [buildArticleSchema, buildBreadcrumbSchema],

  // A landing page that should only emit breadcrumbs:
  [LandingPageType.key]: [buildBreadcrumbSchema],
};
```

### 2. Remove schema from a page type

Delete its entry (or remove specific builders from its array). With no entry,
the page emits nothing.

### 3. Override the set for a single placement

`SchemaMarkup` accepts an optional `builders` prop that bypasses the registry —
useful for a one-off page:

```tsx
// Force breadcrumbs only, regardless of the registry
<SchemaMarkup content={content} builders={[buildBreadcrumbSchema]} />
```

### 4. Add a brand-new schema type

A builder is just `(content: SchemaContent) => JsonLdNode | null`.

**a.** Write it in [`index.ts`](./index.ts) (add a type for clarity if you like):

```ts
export interface FaqPageSchema extends JsonLdNode {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: { "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }[];
}

export function buildFaqSchema(content: SchemaContent): FaqPageSchema | null {
  const faqs = /* derive Q&A from content fields */ [];
  if (faqs.length === 0) return null;       // return null when it doesn't apply
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
```

**b.** Register it for the page types that should emit it, in [`registry.ts`](./registry.ts):

```ts
[ArticlePageType.key]: [buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema],
```

That's it — no other wiring.

### 5. Component-level schema (not page-level)

For schema that belongs to a *component* rather than a page (e.g. an FAQ block
that should emit `FAQPage` wherever it appears), skip the registry and drop the
`JsonLd` primitive directly inside that component:

```tsx
import { JsonLd } from "@/components/ui/Atoms/JsonLd/JsonLd";

export function FaqBlock({ content }) {
  const schema = buildFaqSchema(content);
  return (
    <section>
      {schema && <JsonLd data={schema} />}
      {/* …rendered FAQ… */}
    </section>
  );
}
```

### 6. Add schema to a new page type

Nothing to wire in the page component — `<SchemaMarkup>` already runs centrally
in [`[locale]/[[...slug]]/page.tsx`](../../app/[locale]/[[...slug]]/page.tsx) for
every page. Just register the page type per step 1, and it starts emitting.

---

## Where each field comes from

`buildArticleSchema` (all derived, nothing editor-authored):

| Schema field | Source |
|--------------|--------|
| `headline` | `metaTitle` → `pageTitle` → `_metadata.displayName` |
| `description` | `metaDescription` |
| `image` | `ogImage`, then hero image — resolved as `url.default ?? item.Url` (handles both CMS images and DAM/Bynder assets) |
| `datePublished` / `dateModified` | `_metadata.published` / `_metadata.lastModified` |
| `mainEntityOfPage.@id` | canonical **public** URL (locale kept, internal `home` segment dropped) |
| `author` | *omitted* — no page data. To add, set it from a code constant in `buildArticleSchema`. |

`buildBreadcrumbSchema` is derived from `_metadata.url.hierarchical` +
`_metadata.locale`.

---

## Behavior & edge cases

- **Absolute URLs only.** schema.org requires absolute URLs. If a relative path
  can't be made absolute (missing `_metadata.url.base`), the field is **omitted**
  rather than emitted as relative. The breadcrumb returns `null` entirely without
  a base.
- **Breadcrumbs are public-facing.** The CMS hierarchical path
  `/en/home/article/` becomes: `Home → … → Page`, where the locale (`en`) becomes
  the **Home** crumb pointing at the locale root, and the router-injected `home`
  container is dropped. Intermediate crumb names are **humanized from the slug**
  (e.g. `our-news` → "Our News"); the last crumb uses `navigationTitle`
  or `pageTitle`.
- **Homepage** (`/en/home/`) emits no breadcrumb (no useful trail).
- **Article gating.** `buildArticleSchema` only emits when `_metadata.types`
  includes the ArticlePage key, so it's safe even if mis-registered.
- **XSS-safe serialization.** `JsonLd` escapes `<`, `>`, `&` so CMS text can't
  break out of the `<script>` tag.

### ⚠️ Production base URL
Emitted URLs use `_metadata.url.base`, which comes from the **CMS site/host
config**. In local/sandbox environments this may be `http://localhost:...`, so
schema URLs will be localhost until the site is configured with the production
domain. This is a CMS setting, not a code change.

### ⚠️ Ancestor breadcrumb names
Intermediate crumb names are humanized from the URL slug, not the ancestor
pages' real CMS titles. To use real titles, fetch the ancestors in the data
layer (the route already loads a `breadcrumbPath` via `cached.getPath`) and pass
them into `buildBreadcrumbSchema`.

---

## Quick reference

| Task | Where |
|------|-------|
| Choose which schemas a page type emits | [`registry.ts`](./registry.ts) → `schemaRegistry` |
| Override schemas for one placement | `<SchemaMarkup builders={[…]} />` |
| Add/modify a schema's content | builder fn in [`index.ts`](./index.ts) |
| Component-scoped schema | `<JsonLd data={…} />` inside the component |
| Add schema to a new page type | register the type in [`registry.ts`](./registry.ts) — placement is already central |
