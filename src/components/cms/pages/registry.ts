import { ComponentRegistry } from "@/lib/ts/component-props";
import { Article } from "./Article/Article";
import { ArticlePageType } from "./Article/Article.model";
import { SiteSettingsBlockDataType, SiteSettingsDataType } from "./SiteSettings/SiteSettings.model";
import { SiteRootType } from "./SiteRoot/SiteRoot.model";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";

export const pageRegistry: ComponentRegistry = {
  [ArticlePageType.key]: Article,
  [SiteSettingsDataType.key]: NoPreviewComponent,
  [SiteSettingsBlockDataType.key]: NoPreviewComponent,
  [SiteRootType.key]: NoPreviewComponent,
};
