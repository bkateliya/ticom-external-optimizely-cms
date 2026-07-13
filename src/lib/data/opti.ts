import { SiteSettingsDataType } from "@/components/cms/pages/SiteSettings/SiteSettings.model";
import { ContentProps, getClient, GraphClient, GraphReference } from "@optimizely/cms-sdk";
import { cache } from "react";


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

const getSiteSettings = async (language: string) => {
  const client = getClient();
  const content = await client.getContentByPath(`/${language}/settings/`);
  const siteSettings = content[0] as ContentProps<typeof SiteSettingsDataType>;
  return siteSettings;
};

async function getReferencedContent<T>(contentId: string | GraphReference) {
  const client = getClient();
  const content = await client.getContent(contentId);
  return content as T;
}

export const cached = {
  getPath: cache(getPath),
  getContentByPath: cache(getContentByPath),
  getSiteSettings: cache(getSiteSettings),
  getReferencedContent: cache(getReferencedContent),
};

export type PathItem = {
  _metadata?: {
    key: string;
    sortOrder?: number;
    displayName?: string;
    locale?: string;
    types: string[];
    url?: {
      base?: string;
      hierarchical?: string;
      default?: string;
    };
  };
}