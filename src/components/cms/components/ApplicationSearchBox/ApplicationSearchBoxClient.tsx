"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

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

// tv() slots — every styled part in one place, values matched to the live AEM
// applicationSearch (measured on www.ti.com). TI class names are kept so TI's
// own stylesheet styles it on the VM; Tailwind + --pl-* tokens render it locally.
const style = tv({
  slots: {
    card: "ti_aem-application-Search ti_aem-p-teaserBox flex flex-col items-center gap-4 rounded-[2px] border border-[var(--pl-border-color-tertiary)] bg-[var(--pl-container-background-color-secondary)] p-8 text-center sm:flex-row sm:text-left",
    imgWrap: "ti_aem-p-teaserBox--img shrink-0",
    img: "h-auto w-[110px]",
    content: "ti_aem-p-teaserBox--content min-w-0 flex-1",
    heading:
      "mb-4 text-xl font-light leading-7 text-[var(--pl-text-color-primary)]",
    subheading: "mb-2 text-sm text-[var(--pl-text-color-primary)]",
    field: "relative w-full text-left",
    inputWrap: "relative",
    input:
      "h-10 w-full rounded-none border border-[var(--pl-input-border-color)] bg-[var(--pl-input-background-color)] pl-4 pr-10 text-base outline-none focus:border-[var(--pl-input-border-color-focus)]",
    // Icons live in a right-flush flex bar; each is a 40x40 slot with an 18px
    // glyph centered — matching the live ti-search-field button container.
    iconBar: "absolute inset-y-0 right-0 flex items-center",
    iconSlot:
      "flex h-10 w-10 items-center justify-center text-[var(--pl-text-color-secondary)]",
    // `!` overrides beat TI's ambient <button> styling (VM-only global CSS turns
    // bare buttons into bordered boxes).
    clearBtn: "border-0! bg-transparent! p-0! shadow-none! hover:opacity-70",
    // Portaled to <body> so an ancestor's overflow can't clip it; positioned
    // via inline style (fixed, under the field). High z-index beats the footer.
    panel:
      "ti_aem-application-SearchResults fixed z-[200] max-h-[500px] overflow-y-auto bg-white py-4 leading-6 shadow-[0_0_1px_1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.16),0_4px_5px_0_rgba(0,0,0,0.1),0_1px_10px_0_rgba(0,0,0,0.08)] md:max-h-[530px]",
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
  fieldTitle: string;
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

// The live search field's icons are bundled TI icons (icon-set "actions"),
// NOT the TiSvgIcon `icon-name` form (which fetches from the VM-only DAM).
const TiActionIcon = ({ name }: { name: string }) => (
  <ti-svg-icon
    icon-set="actions"
    className="ti-svg-icon-tertiary ti-svg-icon-size-s"
    aria-hidden="true"
  >
    {name}
  </ti-svg-icon>
);

export function ApplicationSearchBoxClient({
  markets,
  iconSrc,
  headline,
  subheading,
  placeholder,
  fieldTitle,
  noResultsHtml,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();

  // What the panel shows: browse-all = every market + sector (no EEs);
  // search = markets/sectors/EEs on the matching branches only.
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
    setQuery("");
    setOpen(false);
    setShowAll(false);
  }

  function browseAll() {
    setQuery("");
    setShowAll(true);
    setOpen(true);
    inputRef.current?.focus();
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
    open && pos
      ? createPortal(
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
          </div>,
          document.body,
        )
      : null;

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
          <div className={s.inputWrap()}>
            <label htmlFor="application-search-input" className="sr-only">
              {fieldTitle}
            </label>
            <input
              ref={inputRef}
              id="application-search-input"
              type="text"
              value={query}
              placeholder={placeholder}
              autoComplete="off"
              role="combobox"
              aria-expanded={open}
              aria-controls="application-search-panel"
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && reset()}
              onFocus={() => {
                if (q.length >= MIN_CHARS || showAll) setOpen(true);
              }}
              className={twMerge(s.input(), query.length > 0 && "pr-20")}
            />
            {/* Right-flush icon bar: ✕ (when typing) then the magnifier,
                each a 40x40 slot — matches the live ti-search-field. */}
            <div className={s.iconBar()}>
              {query.length > 0 && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    reset();
                    inputRef.current?.focus();
                  }}
                  className={`${s.iconSlot()} ${s.clearBtn()}`}
                >
                  <TiActionIcon name="close" />
                </button>
              )}
              <span className={`${s.iconSlot()} pointer-events-none`}>
                <TiActionIcon name="search" />
              </span>
            </div>
          </div>
          {panel}
        </div>
      </div>
    </div>
  );
}
