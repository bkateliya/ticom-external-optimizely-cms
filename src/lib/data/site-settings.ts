import {
  ContentProps,
  getClient,
  GraphClient,
  GraphReference,
} from "@optimizely/cms-sdk";
import { cached } from "./opti";
import { cache } from "react";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";
import { setContext, setContextData } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { toGraphLocale } from "@/constants/locales";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { ApplicationType } from "@/components/cms/data/Application.model";
import { ProductFamilyType } from "@/components/cms/data/ProductFamily.model";
import { OptiComponentProps } from "../ts/component-props";
import { normalizeGenericContentToTyped } from "../utils/content-type-utils";
import { withLocale } from "../utils/link-utils";
import { BreadcrumbEntry } from "@/components/global/Breadcrumb/Breadcrumb.utils";
import { PageFolderType } from "@/components/cms/pages/PageFolder/PageFolder.model";
import { ArticlePageType } from "@/components/cms/pages/Article/Article.model";
import {
  DEFAULT_APPLICATION_ID,
  getNormalizedApplicationInfo,
} from "../api/normalized/applications";
import { getNormalizedFamilyInfo } from "../api/normalized/productFamilies";
import { getSilos } from "../api/cms-api";
import { findAllBynderAssetsOnPage } from "./bynder";
import { OptimizelyContentProps } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { PageHeadingContract } from "@/components/cms/contracts/component-contracts/page-headings.model";
import { getExpandedContractTypes } from "../opti/opti-init-utils";

type PathType = Parameters<GraphClient["getPath"]>["0"];
export const populateSiteSettings = cache(async function (
  pageContent: OptimizelyContentProps,
  path: PathType,
  locale: string,
  // Site settings, breadcrumb and page title are locale-filtered, so they have
  // to be queried in the locale the content came from — which differs from the
  // URL locale when an untranslated page falls back (see `getPageContent`).
  // The context keeps the URL locale, so links and UI copy stay localized.
  contentLocale: string = locale,
) {
  const items = await getItemsInPathCached(path, contentLocale);

  const siteSettings = getSiteSettings(items);

  const breadcrumb = await getBreadcrumb(items, locale);

  const currentPage = items[items.length - 1];

  const { bynderImageMap, bynderDocumentMap, bynderVideoMap } =
    await findAllBynderAssetsOnPage(pageContent);

  setContext({
    locale,
    siteSettings,
    breadcrumb,
    pageTitle: currentPage?.hero?.pageHeadline,
    pageContentId: currentPage?._metadata.key,
    pageType: currentPage?._itemMetadata.type,
    bynderImages: bynderImageMap,
    bynderDocuments: bynderDocumentMap,
    bynderVideos: bynderVideoMap,
  });
});

async function populatePageDataImpl(
  content: OptiComponentProps<CommonPageContractType>["content"],
) {
  if (!content) {
    return;
  }

  const productFamily = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.productFamily),
    ProductFamilyType,
  );

  if (productFamily?.familyId) {
    setContextData("productFamily", productFamily);
    try {
      const familyInfo = await getNormalizedFamilyInfo(productFamily.familyId);
      setContextData("familyInfo", familyInfo ?? undefined);
    } catch (error) {
      console.error("Get Family Info CMS API failed", error);
    }
  }

  // Silos are always fetched regardless of whether there is a product family.
  try {
    const silos = await getSilos();
    setContextData("productSilos", silos);
  } catch (error) {
    console.error("Get Product Silos CMS API failed", error);
  }

  const application = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.application),
    ApplicationType,
  );

  if (application?.applicationId) {
    setContextData("application", application);
  }

  // Even if no application ID is set, we still want to have the default one in most cases.
  try {
    const applicationInfo = await getNormalizedApplicationInfo(
      application?.applicationId ?? DEFAULT_APPLICATION_ID,
    );
    setContextData("applicationInfo", applicationInfo ?? undefined);
  } catch (error) {
    console.error("Get Application CMS API failed", error);
  }
}

export const populatePageData = cache(populatePageDataImpl);

async function getBreadcrumb(
  items: ResultItemType[],
  locale: string,
): Promise<BreadcrumbEntry[]> {
  const t = await getTranslations();
  const visibleItems = items.filter(
    (x) =>
      // Don't show for Article Page
      x._itemMetadata.type !== ArticlePageType.key,
  );
  return visibleItems.map((x, i) => ({
    title:
      i === 0 ? t("Home") : ((x.navigationTitle || x.hero?.pageHeadline) ?? ""),
    // The items are in the content locale, which is the default locale on a page
    // that fell back — the crumbs must stay on the locale the visitor is browsing.
    url: withLocale(x._metadata.url.default, locale),
    asSpan:
      // Last entry should be span
      i === visibleItems.length - 1 ||
      // Folders should be span
      x._itemMetadata.type === PageFolderType.key,
  }));
}

function getSiteSettings(items: ResultItemType[]) {
  return items
    .map((x) => x.siteSettingsOverride._json)
    .reduce(
      (acc, curr) => {
        for (const key in curr) {
          const typedKey = key as keyof typeof acc;
          const value = curr[typedKey];
          const typename = (value as { __typename?: string } | undefined)
            ?.__typename;
          if (typename && typename !== "_Content") {
            (acc as Record<string, unknown>)[typedKey] = value;
          }
        }
        return acc;
      },
      {} as ContentProps<typeof SiteSettingsDataType>,
    );
}

async function getItemsInPath(path: string | GraphReference, locale: string) {
  const hierarchy = await cached.getPath(path);

  const keyPath = hierarchy?.map((x) => x._metadata?.key) ?? [];

  const client = getClient();

  // The CMS filters `_metadata.locale` by Language Code, not URL slug (e.g.
  // slug "zh-cn" -> code "zh-Hans-CN"); the raw slug matches nothing and the
  // header/footer SiteSettings silently disappear. Map slug -> code here.
  const graphLocale = toGraphLocale(locale);

  const result = (await client.request(getQuery(), {
    keys: keyPath,
    locale: graphLocale,
  })) as ResultType;

  const items = result.TI_PageContent_Contract.items
    // Make sure they're in the right order since order isn't guaranteed
    .sort(
      (a, b) =>
        keyPath.indexOf(a._metadata.key) - keyPath.indexOf(b._metadata.key),
    );
  return items;
}

const getItemsInPathCached = cache(getItemsInPath);

export function getPageHeadlineContractFragment() {
  return `fragment pageHeading on I${PageHeadingContract.key} {
  ${getExpandedContractTypes(PageHeadingContract.key).map(
    (componentType) => `
    ... on ${componentType.key} {
    pageHeadline
  }`,
  )}
}`;
}
function getQuery() {
  return `
${getPageHeadlineContractFragment()}
query($keys: [String], $locale: String) {
  ${PageContentContract.key}(
    where: { _metadata: { key: { in: $keys }, locale: { eq: $locale } } }
  ) {
    items {      
      hero {
        ...pageHeading
      }
      navigationTitle
      hideInNavigation
      siteSettingsOverride {
        _json
      }
      _itemMetadata {
        type
      }
      _metadata {
        key
        locale
        url {
          default
        }
      }
    }
  }
}`;
}

type ResultItemType = {
  hero?: {
    pageHeadline?: string;
  };
  navigationTitle: string;
  hideInNavigation: boolean;
  siteSettingsOverride: {
    _json: ContentProps<typeof SiteSettingsDataType>;
  };
  _itemMetadata: {
    type: string;
  };
  _metadata: {
    key: string;
    locale: string;
    url: {
      default: string;
    };
  };
};

type ResultType = {
  TI_PageContent_Contract: {
    items: ResultItemType[];
  };
};
