import { ContextData as BaseContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";
import { ProductFamilyType } from "@/components/cms/data/ProductFamily.model";
import { ApplicationType } from "@/components/cms/data/Application.model";

declare module "@optimizely/cms-sdk/react/server" {
  export interface ContextData extends BaseContextData {
    siteSettings: ContentProps<typeof SiteSettingsDataType>;
    productFamily?:  ContentProps<typeof ProductFamilyType> | null;
    application?:  ContentProps<typeof ApplicationType> | null;
    pageTitle: string;
    pageContentId: string;
    pageType: string;
    breadcrumb: {
      title: string;
      url: string
    }[];
  }
}
