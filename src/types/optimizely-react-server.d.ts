import { ContextData as BaseContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";

declare module "@optimizely/cms-sdk/react/server" {
  export interface ContextData extends BaseContextData {
    siteSettings: ContentProps<typeof SiteSettingsDataType>;
    pageTitle: string;
    pageContentId: string;
    pageType: string;
    breadcrumb: {
      title: string;
      url: string
    }[]
  }
}
