import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import type { ApplicationWithChildrenAndParent } from "@/lib/api/normalized/applications";
import { cleanLegacyUrl, normalizeUrl } from "@/lib/utils/link-utils";
import {
  ApplicationCategoryListClient,
  type CategoryChildLink,
  type CategoryLink,
} from "./ApplicationCategoryListClient";

export async function ApplicationCategoryList() {
  const { application, applicationInfo } = getContext() ?? {};
  const t = await getTranslations();

  if (!applicationInfo?.children.length) {
    return null;
  }

  let level: "root" | "market" | "sector" | "category";

  // A page can carry more than one id, and the narrowest one wins.
  if (application?.categoryId) {
    level = "category";
  } else if (application?.sectorId) {
    level = "sector";
  } else if (application?.marketId) {
    level = "market";
  } else {
    level = "root";
  }

  const showSubnav = level === "sector" || level === "root";

  const links = uniqueById(applicationInfo.children)
    .map((child) => toLink(child, showSubnav))
    .filter((link): link is CategoryLink => link !== null)
    .sort(byText);

  if (!links.length) {
    return null;
  }

  return (
    <ApplicationCategoryListClient
      columns={splitIntoColumns(links)}
      heading={t("Browse applications")}
      expandAllLabel={t("Expand all")}
      collapseAllLabel={t("Collapse all")}
      learnMoreLabel={t("Learn more")}
    />
  );
}

const SOLUTION_FOLDER = /^(?:https?:\/\/[^/]+)?\/solution\//i;

/**
 * EE folders live outside the Web CMS and MSE returns them already localized
 * (`/solution/ja-jp/…`, on ti.com.cn for zh-cn), so they pass through untouched —
 * `normalizeUrl` would prepend a second locale. Landing pages are CMS pages.
 */
function toHref(appUrl: string | null) {
  if (!appUrl) {
    return null;
  }
  return SOLUTION_FOLDER.test(appUrl)
    ? appUrl
    : normalizeUrl(cleanLegacyUrl(appUrl));
}

/** `null` when the node would render as neither a link nor an expandable group. */
function toLink(
  item: ApplicationWithChildrenAndParent,
  showSubnav: boolean,
): CategoryLink | null {
  const children = showSubnav ? toChildLinks(item.children ?? []) : [];
  const href = toHref(item.appUrl);

  if (!href && !children.length) {
    return null;
  }

  return {
    id: item.childId,
    text: item.sectionName,
    lid: item.enSectionName || item.sectionName,
    href,
    children,
  };
}

function toChildLinks(
  items: ApplicationWithChildrenAndParent[],
): CategoryChildLink[] {
  return uniqueById(items)
    .flatMap((item) => {
      const href = toHref(item.appUrl);
      return href
        ? [
            {
              id: item.childId,
              text: item.sectionName,
              lid: item.enSectionName || item.sectionName,
              href,
            },
          ]
        : [];
    })
    .sort(byText);
}

/** MSE lists a cross-listed application under both its real and virtual parent. */
function uniqueById<T extends { childId: number }>(items: T[]): T[] {
  return [...new Map(items.map((item) => [item.childId, item])).values()];
}

function byText(a: { text: string }, b: { text: string }) {
  return a.text.localeCompare(b.text, undefined, { sensitivity: "base" });
}

function splitIntoColumns<T>(items: T[]): [T[], T[], T[]] {
  const total = items.length;
  const col1 = Math.ceil(total / 3);
  const col2 = Math.max(Math.ceil((total - 1) / 3), 0);
  const col3 = Math.max(Math.ceil((total - 2) / 3), 0);

  return [
    items.slice(0, col1),
    items.slice(col1, col1 + col2),
    items.slice(col1 + col2, col1 + col2 + col3),
  ];
}
