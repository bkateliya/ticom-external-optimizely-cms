import { getProductFamily, getSilos, getApplication, Application } from "@/lib/api/cms-api";
import { getLocale, getTranslations } from "next-intl/server";

export async function getProductFamilyBreadcrumb(familyId: string) {
  const t = await getTranslations();
  const locale = getLocale();

  const familyResponse = await getProductFamily(familyId);
  const silos = await getSilos();

  const finalBreadcrumb: BreadcrumbEntry[] = [
    {
      title: t("Home"),
      titleEN: "Home",
      url: `/${locale}`,
    },
    {
      title: t("Products"),
      titleEN: "Products",
      url: `/${locale}/product-category`,
    },
  ];

  familyResponse.ancestors.toReversed().forEach((item, index) => {
    if (item.productNodeUrl) {
      const entry: BreadcrumbEntry = {
        title: item.familyName,
        titleEN: item.enFamilyName,
        url: item.productNodeUrl,
      };
      if (index === 0) {
        entry.siblings = silos
          .map((sib) => {
            return {
              title: sib.familyName,
              titleEN: sib.enFamilyName,
              url: sib.familyUrl,
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
              title: sib.familyName,
              titleEN: sib.enFamilyName,
              url: sib.productNodeUrl!,
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
      title: t("Home"),
      titleEN: "Home",
      url: `/${locale}`,
    },
    {
      title: t("Applications"),
      titleEN: "Applications",
      url: `/${locale}/applications`,
    },
  ];

  applicationResponse.ancestors.toReversed().forEach((ancestoryItem) => {
    const item = map[ancestoryItem.childId];
    if (item.appUrl) {
      const entry: BreadcrumbEntry = {
        title: item.sectionName,
        titleEN: item.enSectionName,
        url: item.appUrl,
      };
      const siblings = applicationResponse.AppHierarchyList.filter(
        (x) => x.parentAppId == item.parentAppId,
      );
      entry.siblings = siblings
        .filter((x) => x.appUrl != null)
        .map((sib) => {
          return {
            title: sib.sectionName,
            titleEN: sib.enSectionName,
            url: sib.appUrl!,
          };
        });

      finalBreadcrumb.push(entry);
    }
  });

  return finalBreadcrumb;
}

export type BreadcrumbEntry = {
  url: string;
  title: string;
  titleEN?: string;
  siblings?: Omit<BreadcrumbEntry, "siblings">[];
};