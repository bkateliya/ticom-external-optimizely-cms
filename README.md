# Optimizely CMS

This is a Next.js frontend app that serves content from Optimizely CMS.
This project requires Node.js v22 or higher.
This project uses `pnpm` instead of `npm` for package management. You can install
`pnpm` using `corepack`:

```sh
npm install --global corepack@latest
corepack enable pnpm
```

Corepack will pack the exact version of pnpm for the build container at `bin/corepack.tgz`.
If the pnpm version needs to change, repack this with `corepack pack -o ./bin/corepack.tgz`.

A Next.js application for Optimizely CMS with code-first content modeling and Graph content delivery

Ensure that TI Proxy is being used

```sh
#Windows
SET NODE_USE_ENV_PROXY=1
SET HTTP_PROXY=http://wwwgate.ti.com:80
SET HTTPS_PROXY=http://wwwgate.ti.com:80

# Linux/Mac
export NODE_USE_ENV_PROXY=1
export HTTP_PROXY=http://wwwgate.ti.com:80
export HTTPS_PROXY=http://wwwgate.ti.com:80
```

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` (or `.env`) and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `OPTIMIZELY_CMS_CLIENT_ID` / `OPTIMIZELY_CMS_CLIENT_SECRET` | OAuth credentials for the CMS CLI (`pnpm opti`) |
| `OPTIMIZELY_GRAPH_SINGLE_KEY` | API key for Optimizely Graph content queries |
| `OPTIMIZELY_CMS_URL` | CMS instance URL (used for preview and CLI) |
| `OPTIMIZELY_GRAPH_HOST` | Host name configured in Optimizely |
| `NEXT_PUBLIC_ALLOW_BRAND_THEME_SWITCHING` | Enables brand/theme switching in the UI |

### 3. Run

```bash
pnpm dev
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
pnpm opti -- config push
```

Or verify credentials first:

```bash
pnpm opti -- login
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

- **`components`** — glob paths scanned when you run `pnpm opti config push` or `config pull`. This picks up every `model.ts` file plus contract definitions.
- **`propertyGroups`** — editor tabs/groups for CMS properties. Contracts reference these groups (e.g. SEO fields use the `seo` group).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm bootstrap` | Generate branded files and CSS variables |
| `pnpm opti` | Run the Optimizely CMS CLI (pass additional properties with ` -- ` ) |
| `pnpm test` | Bootstrap, then run Jest tests |
