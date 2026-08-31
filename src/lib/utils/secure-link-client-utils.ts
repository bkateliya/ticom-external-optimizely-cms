"use client";

import { useEffect, useState } from "react";

interface AvailableApisEntry {
  readonly apiCategoryName: string;
  readonly apiName: string;
  readonly apiDocumentationLink: string;
}

// Legacy code
const canAccess = (() => {
  const accessibleUrls = (async () => {
    const response = await fetch("/myti/docs/availableApis");
    if (!response.ok) return [];
    const payload: AvailableApisEntry[] = await response.json();
    return payload.map((e) => {
      const url = new URL(e.apiDocumentationLink, location.href);
      if (!url.pathname.startsWith("/swc/")) {
        url.pathname = "/swc" + url.pathname;
      }
      return url;
    });
  })();

  const isInternalUser = (async () => {
    try {
      const response = await fetch("/swc/currentuser", { redirect: "error" });
      if (!response.ok) return false;
      const username = await response.text();
      return /^[ax][^@]{7}$/.test(username);
    } catch {
      return false;
    }
  })();

  /** @param {string} url */
  async function canAccess(url: string) {
    if (await isInternalUser) return true;
    const u = new URL(url, location.href);
    u.pathname = u.pathname.replace(/^\/swc\/([a-z]{2}-[a-z]{2})\//i, "/swc/");
    return (await accessibleUrls).some((accessibleUrl) =>
      u.href.startsWith(accessibleUrl.href),
    );
  }

  return canAccess;
})();

export function useCanAccess(url: string | undefined) {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }
    canAccess(url).then(setHasAccess);
  }, [url]);

  return hasAccess;
}
