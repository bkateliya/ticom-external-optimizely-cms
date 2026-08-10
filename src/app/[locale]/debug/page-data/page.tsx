/**
 * Page-data inspector (dev tool) — type a page path or page name, pick a
 * language, and see the JSON Optimizely Graph returns for that page.
 *
 * The lookup is the same `getContentByPath` call the real route makes
 * (src/lib/data/opti.ts), so what shows up here is what components receive in
 * props. Graph's cache is bypassed per request, so a fresh publish is visible
 * immediately instead of after the CDN TTL.
 *
 * Every control is a plain link or a GET form, so the whole view — page,
 * language, expansion, raw/tree — lives in the URL and is shareable. The Graph
 * call sits behind its own Suspense boundary so the form paints immediately and
 * a spinner streams in while the request is in flight.
 */
import "@/lib/opti/opti-init";
import { Suspense } from "react";
import Link from "next/link";
import { getClient } from "@optimizely/cms-sdk";
import {
  DEFAULT_LOCALE,
  LOCALE_OPTIONS,
  SUPPORTED_LOCALES,
  toGraphLocale,
} from "@/constants/locales";
import { EXPAND_ALL_DEPTH, JsonTree, type JsonValue } from "./JsonTree";

export const metadata = { title: "Page data inspector" };

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type ContentItem = {
  __typename?: string;
  _metadata?: {
    key?: string;
    displayName?: string;
    locale?: string;
    status?: string;
    types?: string[];
    url?: { default?: string; hierarchical?: string; base?: string };
  };
};

/** Everything the URL says about the current view. */
type ViewState = {
  name: string;
  locale: string;
  expand: string;
  raw: boolean;
  path: string;
};

/**
 * Fallback when the path lookup misses: pages whose display name matches what
 * was typed, offered as links so the next click lands on the real path.
 * `_metadata.locale` filters on the Graph Language Code, not our URL slug.
 */
const NAME_SEARCH_QUERY = `
query PageDataToolNameSearch($name: String, $locale: String) {
  _Content(
    where: {
      _metadata: {
        displayName: { contains: $name }
        types: { in: "_Page" }
        locale: { eq: $locale }
      }
    }
    limit: 20
  ) {
    total
    items {
      __typename
      _metadata {
        key
        displayName
        locale
        status
        types
        url { default hierarchical }
      }
    }
  }
}`;

/** How much of the tree is open on load, per `?expand=`. */
const OPEN_DEPTH: Record<string, number> = {
  all: EXPAND_ALL_DEPTH,
  none: 0,
};
const DEFAULT_OPEN_DEPTH = 2;

/**
 * "https://host/en-us/a/b/", "/en-us/a/b" and "a/b" all name the same page.
 * Keep only the segments below the locale — the dropdown owns the locale, so a
 * pasted URL from another language still resolves against the chosen one.
 */
function toPathSegments(input: string): string[] {
  let value = input.trim();

  if (/^https?:\/\//i.test(value)) {
    try {
      value = new URL(value).pathname;
    } catch {
      // Not a parseable URL — fall through and treat it as a plain path.
    }
  }

  const segments = value.split("/").filter(Boolean);
  if (
    segments.length > 0 &&
    SUPPORTED_LOCALES.includes(segments[0].toLowerCase())
  ) {
    segments.shift();
  }
  return segments;
}

/** Builds a link that keeps the current lookup and changes only what's passed. */
function makeLinkTo({ name, locale, expand, raw }: ViewState) {
  return (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams({ name, locale });
    if (expand) next.set("expand", expand);
    if (raw) next.set("view", "raw");
    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined) next.delete(key);
      else next.set(key, value);
    }
    return `?${next.toString()}`;
  };
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800"
    />
  );
}

function ResultsLoading({ path }: { path: string }) {
  return (
    <div
      role="status"
      className="mt-6 flex items-center gap-3 text-sm text-gray-600"
    >
      <Spinner />
      <span>
        Fetching <span className="font-mono">{path}</span> from Optimizely
        Graph…
      </span>
    </div>
  );
}

/**
 * The part that actually talks to Graph. Kept as its own component so the page
 * shell can stream out before the request resolves.
 */
async function Results({ state }: { state: ViewState }) {
  const { name, locale, expand, raw, path } = state;
  const linkTo = makeLinkTo(state);

  let content: ContentItem | undefined;
  let suggestions: ContentItem[] = [];
  let error: string | undefined;

  const client = getClient();
  try {
    const items = (await client.getContentByPath(path, {
      cache: false,
    })) as ContentItem[] | undefined;
    content = items?.[0];

    // Only worth searching by name when a name was typed — `contains: ""`
    // matches every page in the site.
    if (!content && name.trim()) {
      const result = (await client.request(
        NAME_SEARCH_QUERY,
        { name: name.trim(), locale: toGraphLocale(locale) },
        undefined,
        false,
      )) as { _Content?: { items?: ContentItem[] } };
      suggestions = result?._Content?.items ?? [];
    }
  } catch (e) {
    // Graph rejects the whole query when a type isn't synced yet ("Unknown
    // type ..."), which is exactly the kind of thing this tool exists to show.
    error = e instanceof Error ? e.message : String(e);
  }

  if (error) {
    return (
      <section className="mt-6 rounded-md border border-red-500 p-4">
        <h2 className="font-semibold text-red-700">Graph request failed</h2>
        <pre className="mt-2 overflow-x-auto text-xs whitespace-pre-wrap">
          {error}
        </pre>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="mt-6">
        <h2 className="font-semibold">
          No page at <span className="font-mono">{path}</span>
        </h2>
        {suggestions.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-gray-600">
              Pages whose name matches “{name.trim()}” in this language:
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {suggestions.map((item) => {
                const url =
                  item._metadata?.url?.default ??
                  item._metadata?.url?.hierarchical ??
                  "";
                return (
                  <li key={item._metadata?.key}>
                    <Link
                      prefetch={false}
                      className="font-mono underline"
                      href={linkTo({ name: url })}
                    >
                      {url || item._metadata?.displayName}
                    </Link>
                    <span className="ml-2 text-gray-600">
                      {item._metadata?.displayName} ·{" "}
                      {/* On the `_Content` interface Graph reports whichever
                          type matched, often a contract — types[0] is the
                          concrete page type. */}
                      {item._metadata?.types?.[0] ?? item.__typename} ·{" "}
                      {item._metadata?.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="mt-1 text-sm text-gray-600">
            {name.trim()
              ? `No page name matches either. Check the language — untranslated pages only exist under ${DEFAULT_LOCALE}.`
              : "This language has no published home page. Type a path above, or switch language."}
          </p>
        )}
      </section>
    );
  }

  const meta = content._metadata;

  return (
    <>
      <section className="mt-6 rounded-md border border-gray-300 p-4">
        <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm">
          <dt className="text-gray-600">Type</dt>
          <dd className="font-mono">{content.__typename}</dd>
          <dt className="text-gray-600">Key</dt>
          <dd className="font-mono">{meta?.key}</dd>
          <dt className="text-gray-600">Content locale</dt>
          <dd className="font-mono">{meta?.locale}</dd>
          <dt className="text-gray-600">Status</dt>
          <dd className="font-mono">{meta?.status}</dd>
          <dt className="text-gray-600">URL</dt>
          <dd className="font-mono">
            <a className="underline" href={meta?.url?.default}>
              {meta?.url?.default}
            </a>
          </dd>
        </dl>
      </section>

      <div className="mt-6 flex flex-wrap items-baseline gap-4">
        <h2 className="font-semibold">
          Content JSON
          <span className="ml-2 font-normal text-gray-600">
            {JSON.stringify(content).length.toLocaleString()} chars
          </span>
        </h2>
        {/* prefetch off throughout: every one of these URLs re-runs the Graph
            query, and prefetching would fire it just for scrolling past. */}
        <nav className="flex gap-3 text-sm">
          <Link
            prefetch={false}
            className="underline"
            href={linkTo({ expand: "all" })}
          >
            Expand all
          </Link>
          <Link
            prefetch={false}
            className="underline"
            href={linkTo({ expand: "none" })}
          >
            Collapse all
          </Link>
          <Link
            prefetch={false}
            className="underline"
            href={linkTo({ expand: undefined })}
          >
            Reset
          </Link>
          <Link
            className="underline"
            prefetch={false}
            href={linkTo({ view: raw ? undefined : "raw" })}
          >
            {raw ? "Tree view" : "Raw JSON"}
          </Link>
        </nav>
      </div>

      <div className="mt-2 max-h-[70vh] overflow-auto rounded-md border border-gray-300 bg-gray-50 p-4">
        {raw ? (
          <pre className="text-xs">{JSON.stringify(content, null, 2)}</pre>
        ) : (
          <JsonTree
            data={content as { [key: string]: JsonValue }}
            openDepth={OPEN_DEPTH[expand] ?? DEFAULT_OPEN_DEPTH}
          />
        )}
      </div>
    </>
  );
}

export default async function PageDataInspector({
  params,
  searchParams,
}: Props) {
  const { locale: routeLocale } = await params;
  const query = await searchParams;

  const name = typeof query.name === "string" ? query.name : "";
  const requested =
    typeof query.locale === "string" ? query.locale : routeLocale;
  const locale = SUPPORTED_LOCALES.includes(requested)
    ? requested
    : DEFAULT_LOCALE;

  const state: ViewState = {
    name,
    locale,
    expand: typeof query.expand === "string" ? query.expand : "",
    raw: query.view === "raw",
    path: `/${[locale, ...toPathSegments(name)].join("/")}/`,
  };

  return (
    <main className="mx-auto max-w-[1100px] p-6">
      <h1 className="text-2xl font-bold">Page data inspector</h1>
      <p className="mt-1 text-sm text-gray-600">
        Fetches a page from Optimizely Graph with the same call the renderer
        uses, and dumps the JSON your components receive. Opens on the home page
        for the selected language.
      </p>

      <form className="mt-6 flex flex-wrap items-end gap-4">
        <label className="flex min-w-[320px] grow flex-col gap-1">
          <span className="text-sm font-medium">Page name or path</span>
          <input
            type="text"
            name="name"
            defaultValue={name}
            placeholder="Empty = home page · e.g. dev-page/bhavin/faq-search"
            autoComplete="off"
            className="rounded-md border border-gray-400 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Language</span>
          <select
            name="locale"
            defaultValue={locale}
            className="rounded-md border border-gray-400 px-3 py-2 text-sm"
          >
            {LOCALE_OPTIONS.map((option) => (
              <option key={option.localeCode} value={option.localeCode}>
                {option.localeName ?? option.localeCode} ({option.localeCode})
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-white"
        >
          Get page data
        </button>
      </form>

      <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm">
        <dt className="text-gray-600">Path queried</dt>
        <dd className="font-mono">
          {state.path}
          {/* An empty field means the locale root, which is the most useful
              thing to show on a cold open. */}
          {!name.trim() && (
            <span className="ml-2 font-sans text-gray-600">(home page)</span>
          )}
        </dd>
        <dt className="text-gray-600">Graph Language Code</dt>
        <dd className="font-mono">{toGraphLocale(locale)}</dd>
      </dl>

      {/* Keyed so a new lookup re-suspends and shows the spinner again
          instead of holding the previous result on screen. */}
      <Suspense
        key={`${state.path}|${state.expand}|${state.raw}`}
        fallback={<ResultsLoading path={state.path} />}
      >
        <Results state={state} />
      </Suspense>
    </main>
  );
}
