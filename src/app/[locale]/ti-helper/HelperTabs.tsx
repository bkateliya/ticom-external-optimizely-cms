"use client";

import { useRef, useState } from "react";

export type HelperTab = {
  /** Stable id used for the tab/panel aria wiring. */
  id: string;
  /** Label shown on the tab button. */
  label: string;
  /** The helper demo to render in the panel. */
  content: React.ReactNode;
};

/**
 * Generic, accessible tab strip for the ti-* helper harness.
 * Follows the WAI-ARIA tabs pattern: roving tabindex + left/right arrow nav.
 * To add a helper, append an entry to the `tabs` prop — no changes needed here.
 */
export function HelperTabs({ tabs }: { tabs: HelperTab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Helper components"
        className="flex flex-wrap gap-1 border-b border-pl-border-color-tertiary mb-8"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`-mb-px cursor-pointer border-b-2 px-4 py-2 text-body-md ${
                selected
                  ? "border-pl-link-color-primary font-bold text-pl-text-color-primary"
                  : "border-transparent text-pl-text-color-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={i !== active}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
