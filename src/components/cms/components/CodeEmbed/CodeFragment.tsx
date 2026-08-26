"use client";

import { useEffect, useRef } from "react";

import { OptiComponentProps } from "@/lib/ts/component-props";

import { CodeFragmentComponentType } from "./CodeFragment.model";

export function CodeFragmentComponent({
  content,
}: OptiComponentProps<typeof CodeFragmentComponentType>) {
  const ref = useRef<HTMLDivElement>(null);

  // Plain string field: stored verbatim, so nothing sanitises or strips the
  // HTML/JS. Only normalise stray non-breaking spaces from a copied page.
  const html = content?.code?.replace(/\u00a0/g, " ") ?? "";

  useEffect(() => {
    const container = ref.current;
    if (!container || !html.trim()) {
      return;
    }

    // Browsers never run <script> tags inserted via innerHTML. Inject the markup
    // first so mounts/elements exist in the DOM, then re-create each <script> as
    // a real element so it executes. External (src) scripts are awaited in turn
    // so load order holds - e.g. jQuery before jQuery-UI before a calculator's
    // init script that depends on them.
    container.innerHTML = html;
    let cancelled = false;

    (async () => {
      for (const old of Array.from(container.querySelectorAll("script"))) {
        if (cancelled) {
          return;
        }
        const script = document.createElement("script");
        for (const attr of Array.from(old.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }
        script.textContent = old.textContent;

        const loading = old.src
          ? new Promise<void>((resolve) => {
              script.onload = () => resolve();
              script.onerror = () => resolve();
            })
          : null;

        old.replaceWith(script);
        if (loading) {
          await loading;
        }
      }
    })();

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [html]);

  if (!html.trim()) {
    return null;
  }

  return <div ref={ref} className="code-embed" />;
}
