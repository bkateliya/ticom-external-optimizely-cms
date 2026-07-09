"use client";

import { useEffect } from "react";

/**
 * Loads the TI front-end scripts client-side, mirroring the working reference
 * (opti-x StaticHeader) while keeping everything same-origin via /proxy.
 *
 * Load order (in the effect below):
 *  1. Stencil web-component bundles (ES modules) — register the <ti-*> custom
 *     elements and define com.TI.UserPreferences / com.TI.User.
 *  2. Shim the globals TI's authenticated bootstrap would normally provide but
 *     a standalone embed doesn't (see ensureTiGlobals).
 *  3. header-responsive.js / footer.js — wire up the header menu and footer
 *     inside a `DOMContentLoaded` listener. That event has already fired by the
 *     time we inject them, so we re-dispatch it once afterwards to run their
 *     init (this is what makes the menu work).
 */
// const TICOM = "https://www.ti.com/assets/js/@ticom";
const TICOM = "https://www-int.itg.ti.com/assets/js/@ticom"

const MODULE_BUNDLES = [
  `${TICOM}/ui-components/3.latest/ui-components.esm.js`,
  `${TICOM}/header-components/3.latest/header-components.esm.js`,
  `${TICOM}/feature-components/2.4.18/feature-components.esm.js`,
  `${TICOM}/selection-tool-components/1.latest/selection-tool-components.esm.js`,
  `${TICOM}/personalization-components/0.0.41/personalization-components.esm.js`,
];

const CONTENT_SCRIPTS = [
  `${TICOM}/header-content/1.latest/en/js/header-responsive.js`,
  `${TICOM}/header-content/1.latest/en/js/footer.js`,
];

function injectScript(src: string, type?: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    if (type) el.type = type;
    // Resolve on error too so one failed asset never blocks the rest.
    el.addEventListener("load", () => resolve());
    el.addEventListener("error", () => resolve());
    document.body.appendChild(el);
  });
}

// Module-level guard: the scripts must load exactly once per page. Without this,
// React StrictMode's double-invoked effect (dev) injects them twice — which
// re-executes commonjsproperties.js's top-level `const` (SyntaxError) and fires
// DOMContentLoaded twice, racing the header/footer build.
let initialized = false;

export function TiScripts() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    // Note: the harmless cross-origin Event rejections these scripts produce are
    // suppressed by an early handler in the root layout <head> (it must run
    // before Next registers its own, so it can't live here in an effect).
    (async () => {
      await Promise.all(MODULE_BUNDLES.map((s) => injectScript(s, "module")));
      // ensureTiGlobals();
      await Promise.all(CONTENT_SCRIPTS.map((s) => injectScript(s)));
      // Re-fire DOMContentLoaded so the header/footer init listeners run.
      document.dispatchEvent(new Event("DOMContentLoaded"));
    })();
  }, []);

  return null;
}
