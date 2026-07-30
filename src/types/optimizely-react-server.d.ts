import { ContextData as BaseContextData } from "@optimizely/cms-sdk/react/server";
import { ContentProps } from "@optimizely/cms-sdk";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";
import { ProductFamilyType } from "@/components/cms/data/ProductFamily.model";
import { ApplicationType } from "@/components/cms/data/Application.model";
import { ApplicationInfo } from "@/lib/api/normalized/applications";
import { FamilyInfo } from "@/lib/api/normalized/productFamilies";

import { BreadcrumbEntry } from "./Breadcrumb.utils";
declare module "@optimizely/cms-sdk/react/server" {
  export interface ContextData extends BaseContextData {
    siteSettings: ContentProps<typeof SiteSettingsDataType>;
    productFamily?: ContentProps<typeof ProductFamilyType> | null;
    familyInfo?: FamilyInfo;
    application?: ContentProps<typeof ApplicationType> | null;
    applicationInfo?: ApplicationInfo;
    pageTitle: string;
    pageContentId: string;
    pageType: string;
    breadcrumb: BreadcrumbEntry[];
  }
}
