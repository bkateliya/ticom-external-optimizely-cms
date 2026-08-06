import type { Rewrite } from "next/dist/lib/load-custom-routes";

// Same env-with-fallback shape as TICOM. Can't come from the CMS like the search
// link's host does: off a ti.com domain the CMS reports the host we forward away
// from. Unused on a ti.com deployment, which serves /sitesearch itself.
const TI_SITE_URL = process.env.NEXT_PUBLIC_TI_SITE_URL ?? "https://www.ti.com";

// beforeFiles, or the `[locale]` route claims /sitesearch and redirects to /en-us.
export const beforeFilesRewrites: Rewrite[] = [
  {
    source: "/sitesearch/:path*",
    destination: `${TI_SITE_URL}/sitesearch/:path*`,
  },
];
