import { ApiExperiencePageType } from "../experiences/ApiExperience/ApiExperience.model";
import { ApiDocumentationPageType } from "./ApiDocumentation/ApiDocumentation.model";
import { ArticlePageType } from "./Article/Article.model";
import { FaqExperiencePageType } from "../experiences/FaqExperience/FaqExperience.model";
import { FaqPageType } from "./Faq/Faq.model";
import { SelectionToolPageType } from "./SelectionTool/SelectionTool.model";
import { SimplePageType } from "./Simple/Simple.model";
import { VideoSeriesPageType } from "./VideoSeries/VideoSeries.model";
import { SingleVideoPageType } from "./SingleVideo/SingleVideo.model";
import { PageFolderType } from "./PageFolder/PageFolder.model";

export const pageTypes = [
  PageFolderType,

  ApiExperiencePageType,
  ApiDocumentationPageType,
  ArticlePageType,
  FaqExperiencePageType,
  FaqPageType,
  SelectionToolPageType,
  SimplePageType,
  SingleVideoPageType,
  VideoSeriesPageType,
];
