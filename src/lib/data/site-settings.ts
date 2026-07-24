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
import { BreadcrumbEntry } from "@/components/global/Breadcrumb/Breadcrumb.utils";
import { PageFolderType } from "@/components/cms/pages/PageFolder/PageFolder.model";
import { ArticlePageType } from "@/components/cms/pages/Article/Article.model";

type PathType = Parameters<GraphClient["getPath"]>["0"];
async function populateSiteSettingsImpl(path: PathType, locale: string) {
  const items = await getItemsInPathCached(path, locale);

  const siteSettings = getSiteSettings(items);

  const breadcrumb = await getBreadcrumb(items);

  const currentPage = items[items.length - 1];

  setContext({
    locale,
    siteSettings,
    breadcrumb,
    pageTitle: currentPage?.pageTitle,
    pageContentId: currentPage?._metadata.key,
    pageType: currentPage?._itemMetadata.type,
  });
}

export const populateSiteSettings = cache(populateSiteSettingsImpl);

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

  const application = normalizeGenericContentToTyped(
    await cached.getReferencedContent(content.application),
    ApplicationType,
  );

  setContextData("productFamily", productFamily);

  setContextData("application", application);
}

export const populatePageData = cache(populatePageDataImpl);

async function getBreadcrumb(
  items: ResultItemType[],
): Promise<BreadcrumbEntry[]> {
  const t = await getTranslations();
  const visibleItems = items.filter(
    (x) =>
      // Don't show for Article Page
      (x._itemMetadata.type !== ArticlePageType.key),
  );
  return visibleItems.map((x, i) => ({
    title: i === 0 ? t("Home") : x.navigationTitle || x.pageTitle,
    url: x._metadata.url.default,
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

    const result = await client.request(Query, { keys: keyPath, locale: graphLocale }) as ResultType;

  const items = result.TI_PageContent_Contract.items
    // Make sure they're in the right order since order isn't guaranteed
    .sort(
      (a, b) =>
        keyPath.indexOf(a._metadata.key) - keyPath.indexOf(b._metadata.key),
    );
  return items;
}

const getItemsInPathCached = cache(getItemsInPath);

const Query = `
query($keys: [String], $locale: String) {
  TI_PageContent_Contract(
    where: { _metadata: { key: { in: $keys }, locale: { eq: $locale } } }
  ) {
    items {
      pageTitle
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

type ResultItemType = {
  pageTitle: string;
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
