import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import type { ApplicationWithChildrenAndParent } from "@/lib/api/normalized/applications";
import {
  ApplicationSearchBoxClient,
  type MarketItem,
} from "./ApplicationSearchBoxClient";

// DAM icon per requirements — resolves on the VM/TI CDN; may 404 locally.
const SEARCH_ICON =
  "https://www.ti.com/content/dam/ticom/images/icons/svg-icons/search-application-icon.svg";

// Golden hierarchy: market → sector → EE. Mirrors the live AEM
// applicationSearch tree (ti_aem-application-SearchResults-market/-sector/-ee).
function buildTree(markets: ApplicationWithChildrenAndParent[]): MarketItem[] {
  return markets.map((market) => ({
    id: market.childId,
    name: market.sectionName,
    url: market.appUrl ?? "#",
    sectors: (market.children ?? []).map((sector) => ({
      id: sector.childId,
      name: sector.sectionName,
      url: sector.appUrl ?? "#",
      ees: (sector.children ?? [])
        .filter((ee) => ee.appUrl)
        .map((ee) => ({
          id: ee.childId,
          name: ee.sectionName,
          url: ee.appUrl as string,
        })),
    })),
  }));
}

// Thin server wrapper: reads the hierarchy from RSC context and resolves the
// fixed (translated) strings, then hands everything to the client component
// which owns all of the markup, styling and interactivity.
export async function ApplicationSearchBox() {
  const { applicationInfo } = getContext() ?? {};
  const t = await getTranslations();

  return (
    <ApplicationSearchBoxClient
      markets={buildTree(applicationInfo?.children ?? [])}
      iconSrc={SEARCH_ICON}
      headline={t("Explore over 500 applications")}
      subheading={t(
        "Search for the application you need or browse by market category",
      )}
      placeholder={t("Enter a keyword")}
      noResultsHtml={t.raw("No search results text") as string}
    />
  );
}
