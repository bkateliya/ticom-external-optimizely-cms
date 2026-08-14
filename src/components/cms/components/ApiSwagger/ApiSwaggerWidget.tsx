"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/**
 * swagger-ui-react (not swagger-ui-dist) — a real importable component, same
 * as prismjs in CodeSnippet.tsx. No CDN, no manual script loading, no static
 * files to serve ourselves; Next's bundler handles the JS and this CSS import
 * directly. ticom.swaggerui.css (TI's theme, linked in ApiSwagger.tsx) still
 * applies on top — same underlying swagger-ui markup/class names either way.
 *
 * Pinned to 4.18.2 to match ticom.swaggerui.css, which is authored against
 * that version's DOM/class structure (confirmed via the live ti.com bundle's
 * PACKAGE_VERSION) — a newer major shifts class names and the theme misapplies.
 *
 * No `layout: "StandaloneLayout"` here (unlike the old AEM config): that was
 * only needed there to get the Topbar-less standalone layout via
 * `SwaggerUIStandalonePreset.slice(1)`; swagger-ui-react's default layout
 * already has no Topbar/URL-input bar, which is what we want for a
 * CMS-authored, single-fixed-spec embed anyway.
 *
 * Note: the AEM version's extra code-snippet languages (Node/C#/Java/Python)
 * came from a custom `SnippetGeneratorsPlugin` clientlib that isn't ported
 * here — this renders with swagger-ui's default curl-only request snippets.
 */
export function ApiSwaggerWidget({ yamlUrl }: { yamlUrl: string }) {
  return (
    <SwaggerUI
      url={yamlUrl}
      deepLinking
      docExpansion="list"
      supportedSubmitMethods={[
        "get",
        "put",
        "post",
        "delete",
        "options",
        "head",
        "patch",
      ]}
      requestSnippetsEnabled
    />
  );
}
