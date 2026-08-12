"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // No published types for swagger-ui-dist's UMD globals.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SwaggerUIBundle?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SwaggerUIStandalonePreset?: any;
  }
}

// Pinned CDN build — no self-hosted swagger-ui bundle exists in this repo yet
// (the AEM version shipped it via an AEM clientlib). Same external-CDN pattern
// VideoPlayer.tsx uses for the Brightcove player script.
//
// Pinned to 4.18.2 specifically: ticom.swaggerui.css is authored against the
// DOM/class structure of that version (confirmed via the live ti.com bundle's
// PACKAGE_VERSION) — a newer major (v5) shifts class names and the theme
// noticeably misapplies.
const SWAGGER_UI_DIST_BASE = "https://unpkg.com/swagger-ui-dist@4.18.2";
const SWAGGER_UI_BUNDLE_JS = `${SWAGGER_UI_DIST_BASE}/swagger-ui-bundle.js`;
const SWAGGER_UI_PRESET_JS = `${SWAGGER_UI_DIST_BASE}/swagger-ui-standalone-preset.js`;

// Swagger UI's own base stylesheet (layout/structure: the flex rules behind
// .schemes, .opblock, etc.) — separate from ticom.swaggerui.css, which is only
// TI's branding override on top. The live ti.com page loads both (as
// swagger.min.css + ticom.swaggerui.css); ApiSwagger.tsx links this one ahead
// of the TI theme so the override still wins on conflicting rules.
export const SWAGGER_UI_BASE_CSS = `${SWAGGER_UI_DIST_BASE}/swagger-ui.css`;

/**
 * Loads the Swagger UI bundle, then the standalone preset (order matters: the
 * preset extends globals the bundle sets up), then initializes it against
 * `yamlUrl`. Uses a manual script loader rather than next/script — init has to
 * run after both scripts AND after the mount div exists, and next/script's
 * dedupe/ordering doesn't guarantee sequencing across two <Script> tags.
 *
 * Note: the AEM version's extra code-snippet languages (Node/C#/Java/Python)
 * came from a custom `SnippetGeneratorsPlugin` clientlib that isn't ported
 * here — this renders with swagger-ui's default curl-only request snippets.
 */
export function ApiSwaggerWidget({ yamlUrl }: { yamlUrl: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const scripts: HTMLScriptElement[] = [];

    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
        scripts.push(script);
      });
    }

    loadScript(SWAGGER_UI_BUNDLE_JS)
      .then(() => loadScript(SWAGGER_UI_PRESET_JS))
      .then(() => {
        if (cancelled || !hostRef.current || !window.SwaggerUIBundle) {
          return;
        }
        window.SwaggerUIBundle({
          url: yamlUrl,
          domNode: hostRef.current,
          deepLinking: true,
          presets: [
            window.SwaggerUIBundle.presets.apis,
            window.SwaggerUIStandalonePreset.slice(1),
          ],
          plugins: [window.SwaggerUIBundle.plugins.DownloadUrl],
          docExpansion: "list",
          layout: "StandaloneLayout",
          supportedSubmitMethods: [
            "get",
            "put",
            "post",
            "delete",
            "options",
            "head",
            "patch",
          ],
          requestSnippetsEnabled: true,
        });
      })
      .catch(() => {
        // Failed CDN load: leave an empty widget rather than crash the page.
      });

    return () => {
      cancelled = true;
      scripts.forEach((script) => script.remove());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      hostRef.current?.replaceChildren();
    };
  }, [yamlUrl]);

  return <div ref={hostRef} />;
}
