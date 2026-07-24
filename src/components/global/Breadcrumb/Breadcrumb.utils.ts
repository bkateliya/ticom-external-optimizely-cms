import {
  getProductFamily,
  getSilos,
  getApplication,
  Application,
} from "@/lib/api/cms-api";
import { cleanLegacyUrl } from "@/lib/utils/link-utils";
import { getLocale, getTranslations } from "next-intl/server";

export async function getProductFamilyBreadcrumb(familyId: string) {
  const t = await getTranslations();
  const locale = getLocale();

  const familyResponse = await getProductFamily(familyId);
  const silos = await getSilos();

  const finalBreadcrumb: BreadcrumbEntry[] = [
    {
      asSpan: false,
      title: t("Home"),
      titleEN: "Home",
      url: `/${locale}`,
    },
    {
      asSpan: false,
      title: t("Products"),
      titleEN: "Products",
      url: `/${locale}/product-category`,
    },
  ];

  familyResponse.ancestors.toReversed().forEach((item, index) => {
    if (item.productNodeUrl) {
      const entry: BreadcrumbEntry = {
        asSpan: false,
        title: item.familyName,
        titleEN: item.enFamilyName,
        url: cleanLegacyUrl(item.productNodeUrl),
      };
      if (index === 0) {
        entry.siblings = silos.map((sib) => {
          return {
            asSpan: false,
            title: sib.familyName,
            titleEN: sib.enFamilyName,
            url: cleanLegacyUrl(sib.familyUrl),
          };
        });
      } else {
        const siblings = familyResponse.tree.filter(
          (x) => x.parentId == item.parentId,
        );
        entry.siblings = siblings
          .filter((x) => x.productNodeUrl != null)
          .map((sib) => {
            return {
              asSpan: false,
              title: sib.familyName,
              titleEN: sib.enFamilyName,
              url: cleanLegacyUrl(sib.productNodeUrl),
            };
          });
      }
      finalBreadcrumb.push(entry);
    }
  });

  return finalBreadcrumb;
}

export async function getApplicationBreadcrumb(applicationId: string) {
  const t = await getTranslations();
  const locale = getLocale();

  const applicationResponse = await getApplication(applicationId);

  const map = applicationResponse.AppHierarchyList.reduce(
    (prev, curr) => {
      prev[curr.childId] = curr;
      return prev;
    },
    {} as Record<number, Application>,
  );
  const finalBreadcrumb: BreadcrumbEntry[] = [
    {
      asSpan: false,
      title: t("Home"),
      titleEN: "Home",
      url: `/${locale}`,
    },
    {
      asSpan: false,
      title: t("Applications"),
      titleEN: "Applications",
      url: `/${locale}/applications`,
    },
  ];

  applicationResponse.ancestors.toReversed().forEach((ancestoryItem) => {
    const item = map[ancestoryItem.childId];
    if (item.appUrl) {
      const entry: BreadcrumbEntry = {
        asSpan: false,
        title: item.sectionName,
        titleEN: item.enSectionName,
        url: cleanLegacyUrl(item.appUrl),
      };
      const siblings = applicationResponse.AppHierarchyList.filter(
        (x) => x.parentAppId == item.parentAppId,
      );
      entry.siblings = siblings
        .filter((x) => x.appUrl != null)
        .map((sib) => {
          return {
            asSpan: false,
            title: sib.sectionName,
            titleEN: sib.enSectionName,
            url: cleanLegacyUrl(sib.appUrl),
          };
        });

      finalBreadcrumb.push(entry);
    }
  });

  return finalBreadcrumb;
}

export type BreadcrumbEntry = {
  asSpan: boolean;
  url: string;
  title: string;
  titleEN?: string;
  siblings?: Omit<BreadcrumbEntry, "siblings">[];
};
