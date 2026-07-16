import { ContentProps, getClient, GraphClient, GraphReference } from "@optimizely/cms-sdk";
import { cached } from "./opti"
import { cache } from "react";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";
import { setContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";

type PathType = Parameters<GraphClient["getPath"]>["0"]
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
    })
}

export const populateSiteSettings = cache(populateSiteSettingsImpl);

async function getBreadcrumb(items: ResultItemType[]) {
    const t = await getTranslations();
    return items.map((x, i) => ({
        title: i === 0 ? t('Home') : x.navigationTitle || x.pageTitle,
        url: x._metadata.url.default,
    }));
}

function getSiteSettings(items: ResultItemType[]) {
    return items.map(x => x.siteSettingsOverride._json).reduce((acc, curr) => {
        for (const key in curr) {
            const typedKey = key as keyof typeof acc;
            const value = curr[typedKey] as any;
            if (value.__typename && value.__typename !== "_Content") {
                acc[typedKey] = value;
            }
        }
        return acc;
    }, {} as ContentProps<typeof SiteSettingsDataType>);
}

async function getItemsInPath(path: string | GraphReference, locale: string) {
    const hierarchy = await cached.getPath(path);

    const keyPath = hierarchy?.map(x => x._metadata?.key) ?? [];

    const client = getClient();

    const result = await client.request(Query, { keys: keyPath, locale }) as ResultType;

    const items = result.TI_PageContent_Contract.items
        // Make sure they're in the right order since order isn't guaranteed
        .sort((a, b) => keyPath.indexOf(a._metadata.key) - keyPath.indexOf(b._metadata.key));
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
}`

type ResultItemType = {
    pageTitle: string;
    navigationTitle: string;
    siteSettingsOverride: {
        _json: ContentProps<typeof SiteSettingsDataType>
    }
    _itemMetadata: {
        type: string;
    }
    _metadata: {
        key: string;
        locale: string;
        url: {
            default: string;
        }
    }
}

type ResultType = {
    TI_PageContent_Contract: {
        items: ResultItemType[]
    }
}