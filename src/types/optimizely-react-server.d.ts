import { ContextData as BaseContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { SiteSettingsDataType } from "@/components/cms/pages/SiteSettings/SiteSettings.model";
import { PathItem } from "@/lib/data/opti";

declare module "@optimizely/cms-sdk/react/server" {
  export interface ContextData extends BaseContextData {
    siteSettings: ContentProps<typeof SiteSettingsDataType>;
    pageTitle: string;
    pageContentId: string;
    pageType: string;
    breadcrumbPath: PathItem[] | null
  }
}
