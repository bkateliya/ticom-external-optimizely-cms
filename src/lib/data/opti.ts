import { getClient, GraphClient, GraphReference } from "@optimizely/cms-sdk";
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

async function getReferencedContent<T>(contentId: string | GraphReference) {
  const client = getClient();
  const content = await client.getContent(contentId);
  return content as T;
}

export const cached = {
  getPath: cache(getPath),
  getContentByPath: cache(getContentByPath),
  getReferencedContent: cache(getReferencedContent),
};
