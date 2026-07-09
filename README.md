# Optimizely CMS

This is a Next.js frontend app that serves content from Optimizely CMS.
This project requires Node.js v22 or higher.
This project uses `pnpm` instead of `npm` for package management. You can install
`pnpm` using `corepack`:
A Next.js application for Optimizely CMS with code-first content modeling and Graph content delivery

```sh
npm install --global corepack@latest
corepack enable pnpm

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` (or `.env`) and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `OPTIMIZELY_CMS_CLIENT_ID` / `OPTIMIZELY_CMS_CLIENT_SECRET` | OAuth credentials for the CMS CLI (`npm run opti`) |
| `OPTIMIZELY_GRAPH_SINGLE_KEY` | API key for Optimizely Graph content queries |
| `OPTIMIZELY_CMS_URL` | CMS instance URL (used for preview and CLI) |
| `OPTIMIZELY_GRAPH_HOST` | Host name configured in Optimizely |
| `NEXT_PUBLIC_ALLOW_BRAND_THEME_SWITCHING` | Enables brand/theme switching in the UI |

### 3. Bootstrap and run

The bootstrap step generates the dictionary TypeScript definitions

```bash
npm run bootstrap
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## CMS content modeling

Content types are defined in TypeScript and synced to Optimizely CMS with the CLI. React components in the same folders render the content at runtime.

### `model.ts` files

*Important!  Make sure to use the KEY_PREFIX for keys to namespace them to this application.*

Each CMS type lives under `src/components/cms/` in a folder with a co-located `model.ts` (and matching React component). Models use `contentType()` from `@optimizely/cms-sdk` to declare the schema that editors see in the CMS.

| Location | Base type | Example |
| --- | --- | --- |
| `components/*/model.ts` | `_component` | `Hero` — a reusable block with an image property |
| `pages/*/model.ts` | `_page` | `Article` — a routable page type |
| `experiences/*/model.ts` | `_experience` | `GenericExperience` — a site/experience root that can contain pages |

Models declare their own properties and can **extend** shared contracts (see below). For example, `Hero` adds an `image` field on top of the shared preamble fields, while `Article` and `GenericExperience` both include a `hero` component slot and inherit page-level SEO and content fields from contracts.

After changing models, push them to the CMS:

```bash
npm run opti -- config push
```

Or verify credentials first:

```bash
npm run opti -- login
```

Then install dependencies with `pnpm install`, and start the dev server with `pnpm dev`.
### Contracts (`src/components/cms/contracts/`)

Contracts are reusable property groups defined with `contract()` from the SDK. They keep shared fields in one place so multiple content types stay consistent without duplicating schema.

- **`component-contracts/`** — fields shared by components. `Preamble.ts` defines eyebrow, headline, subheadline, and description used by components like Hero.
- **`page-contacts/`** — fields shared by pages and experiences. `PageContent.ts` defines page title and breadcrumb override; `SEO.ts` defines meta title, meta description, and Open Graph image.

Content types pull in contracts via the `extends` array on their `contentType()` definition. Property groups (such as the SEO group in `optimizely.config.mjs`) control how those fields are organized in the CMS editor.

At runtime, models are registered in `src/app/layout.tsx` via `initContentTypeRegistry()`, and their React counterparts are mapped with `initReactComponentRegistry()`.

## `optimizely.config.mjs`

This file is the entry point for the Optimizely CMS CLI. It tells the CLI where to find content type definitions and how to configure the CMS editor:

```js
import { buildConfig } from "@optimizely/cms-sdk";

export default buildConfig({
  components: [
    "./src/components/**/model.{tsx,ts}",
    "./src/components/cms/contracts/**/*.{tsx,ts}",
  ],
  propertyGroups: [
    { key: "seo", displayName: "SEO", sortOrder: 1 },
  ],
});
```

- **`components`** — glob paths scanned when you run `npm run opti config push` or `config pull`. This picks up every `model.ts` file plus contract definitions.
- **`propertyGroups`** — editor tabs/groups for CMS properties. Contracts reference these groups (e.g. SEO fields use the `seo` group).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server (port 3003) |
| `npm run build` / `npm start` | Production build and server |
| `npm run bootstrap` | Generate branded files and CSS variables |
| `npm run opti` | Run the Optimizely CMS CLI (pass additional properti with ` -- ` ) |
| `npm test` | Bootstrap, then run Jest tests |
