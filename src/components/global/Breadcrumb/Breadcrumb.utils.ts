import { cleanLegacyUrl } from "@/lib/utils/link-utils";
import { getContext, getContextData } from "@optimizely/cms-sdk/react/server";
import { getLocale, getTranslations } from "next-intl/server";

export interface BreadcrumbResult {
  isProducts: boolean;
  breadcrumbs: BreadcrumbEntry[];
}

export async function getBreadcrumb(): Promise<BreadcrumbResult> {
  const familyBreadcrumb = await getProductFamilyBreadcrumb();
  if (familyBreadcrumb) {
    return { isProducts: true, breadcrumbs: familyBreadcrumb };
  }

  const applicationBreadcrumb = await getApplicationBreadcrumb();
  if (applicationBreadcrumb) {
    return { isProducts: false, breadcrumbs: applicationBreadcrumb };
  }

  const contextBreadcrumb = getContextData("breadcrumb") ?? [];

  return { isProducts: false, breadcrumbs: contextBreadcrumb };
}

async function getProductFamilyBreadcrumb() {
  const {
    productFamily,
    familyInfo: familyResponse,
    productSilos: silos,
  } = getContext() ?? {};

  if (!productFamily?.familyId || !familyResponse || !silos) {
    return null;
  }

  const t = await getTranslations();
  const locale = await getLocale();

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
        entry.siblings = item.siblings
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

async function getApplicationBreadcrumb() {
  const { application, applicationInfo: applicationResponse } =
    getContext() ?? {};

  if (!application?.applicationId || !applicationResponse) {
    return null;
  }

  const t = await getTranslations();
  const locale = await getLocale();

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

  applicationResponse.ancestors.toReversed().forEach((item) => {
    if (item.appUrl) {
      const entry: BreadcrumbEntry = {
        asSpan: false,
        title: item.sectionName,
        titleEN: item.enSectionName,
        url: cleanLegacyUrl(item.appUrl),
        siblings: item.siblings
          .filter((x) => x.appUrl != null)
          .map((sib) => {
            return {
              asSpan: false,
              title: sib.sectionName,
              titleEN: sib.enSectionName,
              url: cleanLegacyUrl(sib.appUrl),
            };
          }),
      };

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
