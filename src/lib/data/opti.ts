import { SiteSettingsDataType } from "@/components/cms/pages/SiteSettings/SiteSettings.model";
import { ContentProps, getClient, GraphReference } from "@optimizely/cms-sdk";
import { cache } from "react";

const getContentByPath = async (path: string) => {
  const client = getClient();
  const content = await client.getContentByPath(path);
  return content;
};

const getSiteSettings = async (language: string) => {
  return getReferencedContent<ContentProps<typeof SiteSettingsDataType>>({key:"038f1564-27d6-4526-96e0-9582ea629811"});
  // const client = getClient();
  // const content = await client.getContentByPath(`/${language}/settings/`);
  // const content = awaitclient.getContent("038f1564-27d6-4526-96e0-9582ea629811")
  // const siteSettings = content[0] as ContentProps<typeof SiteSettingsDataType>;
  // return siteSettings;
};

async function getReferencedContent<T>(contentId: string | GraphReference) {
  const client = getClient();
  const content = await client.getContent(contentId);
  return content as T;
}

export const cached = {
  getContentByPath: cache(getContentByPath),
  getSiteSettings: cache(getSiteSettings),
  getReferencedContent: cache(getReferencedContent),
};
