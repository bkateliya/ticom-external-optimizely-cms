"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";

export type NavLink = {
  href: string;
  text: string;
  target?: string | null;
  title?: string | null;
};
export type NavEntry =
  | ({ type: "link" } & NavLink)
  | { type: "group"; title: string; children: NavLink[] };

/**
 * Styling for TI.com's `.ti_p-sideNav`, which this app doesn't ship as CSS.
 * Base slots are the mobile accordion-card look; `md:`/`xl:` overrides are the
 * desktop bordered list.
 *
 * The `!` on colour, border, background, alignment and layout is load-bearing:
 * TI's global CSS (present on the VM, not locally) styles every bare `<button>`
 * as a red "secondary button" and every `<a>` in link teal via *unlayered*
 * rules, which beat our *layered* utilities. A layered `!important` is what
 * wins them back — so the nav renders the same with or without that CSS.
 */
const styles = tv(
  {
    slots: {
      root: "mb-6 xl:-mt-3",
      list: "m-0 list-none p-0",
      item: "md:border-b md:border-pl-divider-color-secondary",
      l1: [
        // Force our self-hosted Roboto so the button matches the links (and
        // live): TI's unlayered `button{font-family}` otherwise wins here.
        "font-[family-name:var(--font-body)]!",
        "flex! w-full flex-row items-center! justify-between! gap-2 rounded-none! text-left! text-sm leading-5",
        "cursor-pointer appearance-none border-0!",
        "my-0.5 bg-pl-container-background-color-secondary! p-3! font-semibold",
        "hover:bg-pl-container-background-color-secondary-variant! hover:underline!",
        "md:my-0 md:bg-transparent! md:p-0! md:py-2! md:font-normal! md:hover:bg-transparent! xl:py-3!",
      ],
      chevron: "size-[18px] shrink-0 transition-[rotate] duration-100",
      panel: "grid px-3 transition-[grid-template-rows] duration-100 md:px-0",
      sublist: "m-0 min-h-0 list-none overflow-hidden md:ml-4",
      l2: "flex items-center py-2 text-sm leading-5 hover:underline! xl:mb-3 xl:py-0",
    },
    variants: {
      active: {
        true: {
          l1: "text-pl-link-color-accent!",
          l2: "text-pl-link-color-accent!",
        },
        false: {
          l1: "text-pl-text-color-primary!",
          l2: "text-pl-text-color-primary!",
        },
      },
      open: {
        true: { panel: "grid-rows-[1fr]", chevron: "rotate-180" },
        false: { panel: "grid-rows-[0fr]" },
      },
    },
    defaultVariants: { active: false, open: false },
  },
  // Colour and font-size classes both start with `text-`; keep both.
  { twMerge: false },
);

const { root, list, item, l1, chevron, panel, sublist, l2 } = styles();

// Current-page match by path, ignoring host and any trailing slash. The second
// arg is a throwaway base so relative hrefs parse (new URL throws without one);
// its host is discarded and it's a fixed literal so this also runs under SSR.
const DUMMY_BASE = "http://x";
const pathKey = (u: string) => {
  try {
    return new URL(u, DUMMY_BASE).pathname.replace(/\/+$/, "") || "/";
  } catch {
    return u;
  }
};

export function HierarchyNavClient({ entries }: { entries: NavEntry[] }) {
  const currentKey = pathKey(usePathname());
  const isActiveLink = (link: NavLink) =>
    link.target !== "_blank" && pathKey(link.href) === currentKey;

  // Start with the active page's section expanded; authors can toggle any
  // number of sections open from there.
  const [open, setOpen] = useState<Set<number>>(() => {
    const s = new Set<number>();
    entries.forEach((e, i) => {
      if (e.type === "group" && e.children.some(isActiveLink)) s.add(i);
    });
    return s;
  });

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });

  const anchor = (link: NavLink, className: string) => (
    <a
      href={link.href}
      role="menuitem"
      target={link.target || undefined}
      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
      title={link.title || undefined}
      className={className}
    >
      {link.text}
    </a>
  );

  return (
    <nav role="navigation" aria-label="Section navigation" className={root()}>
      <ul role="menu" className={list()}>
        {entries.map((entry, i) => (
          <li key={i} role="presentation" className={item()}>
            {entry.type === "link" ? (
              anchor(entry, l1({ active: isActiveLink(entry) }))
            ) : (
              <>
                <button
                  type="button"
                  aria-expanded={open.has(i)}
                  aria-controls={`hierarchy-nav-panel-${i}`}
                  onClick={() => toggle(i)}
                  className={l1()}
                >
                  {entry.title}
                  {/* Inline SVG, not <ti-svg-icon>: the chevron must render
                      even when TI's web-component runtime fails to load. */}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={chevron({ open: open.has(i) })}
                  >
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </button>
                <div
                  id={`hierarchy-nav-panel-${i}`}
                  aria-hidden={!open.has(i)}
                  className={panel({ open: open.has(i) })}
                >
                  <ul className={sublist()}>
                    {entry.children.map((child, j) => (
                      <li key={j} role="presentation">
                        {anchor(child, l2({ active: isActiveLink(child) }))}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
