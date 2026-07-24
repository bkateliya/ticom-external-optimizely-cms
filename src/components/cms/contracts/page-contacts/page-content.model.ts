import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";
import { SiteSettingsDataType } from "@/components/cms/structural-components/SiteSettings/SiteSettings.model";

export const PageContentContract = contract({
  key: `${KEY_PREFIX}PageContent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Page Content Contract`,
  properties: {
    pageTitle: {
      type: "string",
      displayName: "Page Title",
      description: "Title of the page",
      maxLength: 100,
      isRequired: true,
      group: PropertyTypes.Content,
      indexingType: "queryable",
      isLocalized: true,
    },
    navigationTitle: {
      type: "string",
      displayName: "Navigation Title Override",
      description:
        "Override the navigation title for the page, otherwise defaults to Page Title",
      maxLength: 100,
      group: PropertyTypes.Content,
      indexingType: "queryable",
      isLocalized: true,
    },

    siteSettingsOverride: {
      type: "content",
      displayName: "Site Section Settings Override",
      description:
        "Any settings set here will override that setting for this page and sub pages.  For Home Page, this will the default settings for the whole site.",
      isLocalized: true,
      group: PropertyTypes.Config,
      sortOrder: 0,
      allowedTypes: [SiteSettingsDataType],
    },
    
    hideInNavigation: {
      type: "boolean",
      displayName: "Hide In Navigation",
      description:
        "When enabled, this page is excluded from site navigation menus",
      group: PropertyTypes.Content,
      indexingType: "queryable",
    },
  },
});

/** For using contracts as component interfaces. */
export type PageContentContractContentType = ContractContentType<
  [typeof PageContentContract]
>;
