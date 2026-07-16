
import { KEY_PREFIX } from "../constants";

// This is in separate file to avoid circular reference

export const PageTypeKeyMap = {
  ArticlePageTypeKey: `${KEY_PREFIX}ArticlePage_Page`,
  VideoSeriesPageTypeKey: `${KEY_PREFIX}VideoSeriesPage_Page`,
  FaqPortalPageTypeKey: `${KEY_PREFIX}FaqPortalPage_Page`,
  FaqQuestionAnswerPageTypeKey: `${KEY_PREFIX}FaqQuestionAnswer_Page`,
  SelectionToolPageTypeKey: `${KEY_PREFIX}SelectionToolPage_Page`,
  ApiDocumentationPageTypeKey: `${KEY_PREFIX}ApiDocumentationPage_Page`,
  AutoNewsReleaseStoryPageTypeKey: `${KEY_PREFIX}AutoNewsReleaseStoryPage_Page`,
  SimplePageTypeKey: `${KEY_PREFIX}SimplePage_Page`,
} as const;

// This is used for `mayContainTypes`
export const PageTypeKeys = Object.values(PageTypeKeyMap);