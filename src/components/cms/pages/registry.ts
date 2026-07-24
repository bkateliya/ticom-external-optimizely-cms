import { ComponentRegistry } from "@/lib/ts/component-props";
import { ArticlePage } from "./Article/Article";
import { ArticlePageType } from "./Article/Article.model";
import { ApiExperiencePage } from "../experiences/ApiExperience/ApiExperience";
import { ApiExperiencePageType } from "../experiences/ApiExperience/ApiExperience.model";
import { ApiDocumentationPage } from "./ApiDocumentation/ApiDocumentation";
import { ApiDocumentationPageType } from "./ApiDocumentation/ApiDocumentation.model";
import { FaqPageType } from "./Faq/Faq.model";
import { FaqPage } from "./Faq/Faq";
import { SelectionToolPageType } from "./SelectionTool/SelectionTool.model";
import { SelectionToolPage } from "./SelectionTool/SelectionTool";
import { SimplePageType } from "./Simple/Simple.model";
import { SimplePage } from "./Simple/Simple";
import { VideoSeriesPageType } from "./VideoSeries/VideoSeries.model";
import { VideoSeriesPage } from "./VideoSeries/VideoSeries";
import { SingleVideoPage } from "./SingleVideo/SingleVideo";
import { SingleVideoPageType } from "./SingleVideo/SingleVideo.model";
import { PageFolderType } from "./PageFolder/PageFolder.model";
import { PageFolder } from "./PageFolder/PageFolder";

export const pageRegistry: ComponentRegistry = {
  [PageFolderType.key]: PageFolder,

  [ApiExperiencePageType.key]: ApiExperiencePage,
  [ApiDocumentationPageType.key]: ApiDocumentationPage,
  [ArticlePageType.key]: ArticlePage,
  [FaqPageType.key]: FaqPage,
  [SelectionToolPageType.key]: SelectionToolPage,
  [SimplePageType.key]: SimplePage,
  [SingleVideoPageType.key]: SingleVideoPage,
  [VideoSeriesPageType.key]: VideoSeriesPage,
};
