
import { KEY_PREFIX } from "../constants";


// This is in separate file to avoid circular reference

export const PageTypeKeyMap = {
  ArticlePageTypeKey: `${KEY_PREFIX}ArticlePage_Page`,
} as const;


// This is used for `mayContainTypes`
export const PageTypeKeys = Object.values(PageTypeKeyMap);