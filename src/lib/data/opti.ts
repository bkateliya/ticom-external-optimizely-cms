import { getClient, GraphClient, GraphReference } from "@optimizely/cms-sdk";
import { cache } from "react";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { OptiComponentProps } from "../ts/component-props";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { PageHeadingContractContentType } from "@/components/cms/contracts/component-contracts/page-headings.model";
import { normalizeGenericContentToTyped } from "../utils/content-type-utils";

const getPath: GraphClient["getPath"] = async (path) => {
  const client = getClient();
  const content = await client.getPath(path);
  return content;
};

const getContentByPath = async (path: string) => {
  const client = getClient();
  const content = await client.getContentByPath(path);
  return content;
};

async function getReferencedContent<T>(
  contentId: string | GraphReference | null,
) {
  if (!contentId) {
    return null;
  }
  const client = getClient();
  const content = await client.getContent(contentId);
  return content as T;
}

export const cached = {
  getPath: cache(getPath),
  getContentByPath: cache(getContentByPath),
  getReferencedContent: cache(getReferencedContent),
};

export async function getPageContent(
  locale: string,
  slug: string[],
): Promise<{
  content: OptiComponentProps<CommonPageContractType>["content"];
  path: string;
  contentLocale: string;
}> {
  const rest = slug.join("/");
  const content = await cached.getContentByPath(`/${locale}/${rest}`);

  if (content[0] || locale === DEFAULT_LOCALE) {
    return {
      content: content[0],
      path: `/${locale}/${rest}`,
      contentLocale: locale,
    };
  }

  const fallback = await cached.getContentByPath(`/${DEFAULT_LOCALE}/${rest}`);
  return {
    content: fallback[0],
    path: `/${DEFAULT_LOCALE}/${rest}`,
    contentLocale: DEFAULT_LOCALE,
  };
}

export function getPageHeading(
  content: OptiComponentProps<CommonPageContractType>["content"],
) {
  return normalizeGenericContentToTyped<PageHeadingContractContentType>(
    content?.hero,
  );
}
