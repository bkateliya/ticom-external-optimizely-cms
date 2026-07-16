import { ComponentRegistry } from "@/lib/ts/component-props";
import { ArticlePage } from "./Article/Article";
import { ArticlePageType } from "./Article/Article.model";
import { ApiDeveloperPage } from "../experiences/ApiDeveloper/ApiDeveloper";
import { ApiDeveloperPageType } from "../experiences/ApiDeveloper/ApiDeveloper.model";
import { ApiDocumentationPage } from "./ApiDocumentation/ApiDocumentation";
import { ApiDocumentationPageType } from "./ApiDocumentation/ApiDocumentation.model";
import { AutoNewsReleaseStoryPageType } from "./AutoNewsReleaseStory/AutoNewsReleaseStory.model";
import { AutoNewsReleaseStoryPage } from "./AutoNewsReleaseStory/AutoNewsReleaseStory";
import { FaqPortalPageType } from "./FaqPortal/FaqPortal.model";
import { FaqPortalPage } from "./FaqPortal/FaqPortal";
import { FaqQuestionAnswerPageType } from "./FaqQuestionAnswer/FaqQuestionAnswer.model";
import { FaqQuestionAnswerPage } from "./FaqQuestionAnswer/FaqQuestionAnswer";
import { SelectionToolPageType } from "./SelectionTool/SelectionTool.model";
import { SelectionToolPage } from "./SelectionTool/SelectionTool";
import { SimplePageType } from "./Simple/Simple.model";
import { SimplePage } from "./Simple/Simple";
import { VideoSeriesPageType } from "./VideoSeries/VideoSeries.model";
import { VideoSeriesPage } from "./VideoSeries/VideoSeries";

export const pageRegistry: ComponentRegistry = {
  [ApiDeveloperPageType.key]: ApiDeveloperPage,
  [ApiDocumentationPageType.key]: ApiDocumentationPage,
  [ArticlePageType.key]: ArticlePage,
  [AutoNewsReleaseStoryPageType.key]: AutoNewsReleaseStoryPage,
  [FaqPortalPageType.key]: FaqPortalPage,
  [FaqQuestionAnswerPageType.key]: FaqQuestionAnswerPage,
  [SelectionToolPageType.key]: SelectionToolPage,
  [SimplePageType.key]: SimplePage,
  [VideoSeriesPageType.key]: VideoSeriesPage,
};
