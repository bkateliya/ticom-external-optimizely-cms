"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

const MIN_CHARS = 2;

export interface EEItem {
  id: number;
  name: string;
  url: string;
}
export interface SectorItem {
  id: number;
  name: string;
  url: string;
  ees: EEItem[];
}
export interface MarketItem {
  id: number;
  name: string;
  url: string;
  sectors: SectorItem[];
}

// The <ti-search-field> web component: exposes `.value` and emits `tiChange`
// ({ value }) on every keystroke / clear — that's how we read the input.
type TiSearchFieldEl = HTMLElement & { value: string };

// tv() slots — matched to the live AEM applicationSearch (measured on ti.com).
const style = tv({
  slots: {
    card: "ti_aem-application-Search ti_aem-p-teaserBox flex flex-col items-center justify-between gap-4 rounded-[2px] border border-[#e8e8e8] bg-[#f7f7f7] p-8 text-center sm:flex-row sm:text-left max-sm:gap-6 max-sm:px-6 max-sm:py-6",
    imgWrap: "ti_aem-p-teaserBox--img shrink-0 max-sm:w-full max-sm:max-w-[calc(40vw-32px)] sm:mx-4 sm:w-[110px]",
    img: "h-auto w-full",
    content: "ti_aem-p-teaserBox--content min-w-0 flex-1 w-full max-sm:flex-col",
    heading:
      "mb-4 text-xl font-light leading-7 text-[var(--pl-text-color-primary)] max-sm:text-center",
    subheading: "mb-2 text-sm text-[var(--pl-text-color-primary)] max-sm:text-center",
    field:
      "relative w-full max-w-[768px] text-left [&_ti-search-field]:block! [&_ti-search-field]:w-full! [&_ti-search-field]:max-w-[768px]! [&_*]:max-w-[768px]!",
    panel:
      "ti_aem-application-SearchResults fixed z-[200] max-h-[500px] w-full max-w-[768px] overflow-y-auto bg-white py-4 leading-6 shadow-[0_0_1px_1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.16),0_4px_5px_0_rgba(0,0,0,0.1),0_1px_10px_0_rgba(0,0,0,0.08)] md:max-h-[530px]",
    market: "ml-6 block pb-0.5 pr-2 text-sm text-[#333] hover:bg-black/5",
    sector: "ml-11 block pb-0.5 pr-2 text-sm text-[#555] hover:bg-black/5",
    ee: "ml-11 block pb-0.5 pr-2 text-sm text-[#555] hover:bg-black/5",
    noResults:
      "ti_aem-application-SearchResults-no-results mx-4 py-1 text-sm text-[#555] [&_a]:text-[var(--pl-link-color-primary)] [&_a]:underline",
    highlight: "font-medium",
  },
});
const s = style();

interface Props {
  markets: MarketItem[];
  iconSrc: string;
  headline: string;
  subheading: string;
  placeholder: string;
  /** Translated HTML; contains the "browse all markets & sectors" anchor. */
  noResultsHtml: string;
}

/** Highlight the first match of `q` (already lower-cased) in `name`, medium weight. */
function highlight(name: string, q: string): ReactNode {
  if (!q) return name;
  const idx = name.toLowerCase().indexOf(q);
  if (idx === -1) return name;
  return (
    <>
      {name.slice(0, idx)}
      <span className={s.highlight()}>{name.slice(idx, idx + q.length)}</span>
      {name.slice(idx + q.length)}
    </>
  );
}

export function ApplicationSearchBoxClient({
  markets,
  iconSrc,
  headline,
  subheading,
  placeholder,
  noResultsHtml,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<TiSearchFieldEl>(null);

  const q = query.trim().toLowerCase();

  const displayMarkets = useMemo<MarketItem[]>(() => {
    if (showAll) {
      return markets.map((m) => ({
        ...m,
        sectors: m.sectors.map((sector) => ({ ...sector, ees: [] })),
      }));
    }
    if (q.length < MIN_CHARS) return [];
    const out: MarketItem[] = [];
    for (const m of markets) {
      const marketMatch = m.name.toLowerCase().includes(q);
      const sectors = [];
      for (const sector of m.sectors) {
        const sectorMatch = sector.name.toLowerCase().includes(q);
        const ees = sector.ees.filter((e) => e.name.toLowerCase().includes(q));
        if (sectorMatch || ees.length) sectors.push({ ...sector, ees });
      }
      if (marketMatch || sectors.length) out.push({ ...m, sectors });
    }
    return out;
  }, [markets, q, showAll]);

  const noResults = !showAll && q.length >= MIN_CHARS && !displayMarkets.length;

  function reset() {
    if (fieldRef.current) fieldRef.current.value = "";
    setQuery("");
    setOpen(false);
    setShowAll(false);
  }

  function browseAll() {
    if (fieldRef.current) fieldRef.current.value = "";
    setQuery("");
    setShowAll(true);
    setOpen(true);
    fieldRef.current?.focus();
  }

  function onChange(value: string) {
    setQuery(value);
    if (value.trim().length >= MIN_CHARS) {
      setShowAll(false);
      setOpen(true);
    } else if (!showAll) {
      setOpen(false);
    }
  }

  // Latest onChange in a ref so the (once-bound) tiChange listener never goes stale.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  // Bridge the web component's `tiChange` event into React state.
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const value = (e as CustomEvent<{ value?: string }>).detail?.value ?? "";
      onChangeRef.current(value);
    };
    el.addEventListener("tiChange", handler);
    return () => el.removeEventListener("tiChange", handler);
  }, []);

  // Position the portaled panel under the field, kept in sync on scroll/resize.
  useEffect(() => {
    if (!open) return;
    function place() {
      const r = rootRef.current?.getBoundingClientRect();
      if (r) setPos({ top: r.bottom, left: r.left, width: r.width });
    }
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  // Close + reset when clicking outside the field AND the (portaled) panel.
  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!rootRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        reset();
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  const panel =
    open && pos ? (
          <div
            ref={panelRef}
            id="application-search-panel"
            className={s.panel()}
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            {noResults ? (
              // Translated HTML; intercept the "browse all" anchor to expand.
              <p
                className={s.noResults()}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) {
                    e.preventDefault();
                    browseAll();
                  }
                }}
                dangerouslySetInnerHTML={{ __html: noResultsHtml }}
              />
            ) : (
              displayMarkets.map((market) => (
                <div
                  key={market.id}
                  className="ti_aem-application-SearchResults-market"
                >
                  <a
                    href={market.url}
                    className={s.market()}
                    data-lid={`search-applications-${market.name}`}
                    data-navtitle="search-applications"
                  >
                    {highlight(market.name, q)}
                  </a>
                  {market.sectors.map((sector) => (
                    <div
                      key={sector.id}
                      className="ti_aem-application-SearchResults-sector"
                    >
                      <a
                        href={sector.url}
                        className={s.sector()}
                        data-lid={`search-applications-${sector.name}`}
                        data-navtitle="search-applications"
                      >
                        {highlight(sector.name, q)}
                      </a>
                      {sector.ees.length > 0 && (
                        <ul>
                          {sector.ees.map((ee) => (
                            <li
                              key={ee.id}
                              className="ti_aem-application-SearchResults-ee"
                            >
                              <a
                                href={ee.url}
                                className={s.ee()}
                                data-lid={`search-applications-${ee.name}`}
                                data-navtitle="search-applications"
                              >
                                {highlight(ee.name, q)}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        ) : null;

  return (
    <div className={s.card()}>
      <div className={s.imgWrap()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed external DAM SVG; next/image would need a global remotePatterns change */}
        <img
          src={iconSrc}
          alt="search-application-icon"
          width={110}
          height={110}
          className={s.img()}
        />
      </div>
      <div className={s.content()}>
        <h2 className={s.heading()}>{headline}</h2>
        <p className={s.subheading()}>{subheading}</p>

        <div ref={rootRef} className={s.field()}>
          {/* TI's search field web component — renders the input, magnifier and
              clear button (matches the live site). Emits `tiChange` on input,
              which we bridge into React above to drive the results panel.
              Renders on the VM only (loads from TI's component bundle). */}
          <ti-search-field
            ref={fieldRef}
            appearance="large"
            placeholder={placeholder}
            aria-expanded={open ? "true" : "false"}
            aria-controls="application-search-panel"
            aria-autocomplete="list"
            className="ti_aem-application-SearchField ti-search-field-large block! w-full! max-w-[768px]!"
            style={{ width: "100%", maxWidth: "768px" }}
          ></ti-search-field>
          {panel}
        </div>
      </div>
    </div>
  );
}
