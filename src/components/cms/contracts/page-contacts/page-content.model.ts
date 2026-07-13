import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";

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
      indexingType: 'queryable',
      isLocalized: true,
    },
    navigationTitle: {
      type: "string",
      displayName: "Navigation Title Override",
      description: "Override the navigation title for the page, otherwise defaults to Page Title",
      maxLength: 100,
      group: PropertyTypes.Content,
      indexingType: 'queryable',
      isLocalized: true,
    },
  },
});


/** For using contracts as component interfaces. */
export type PageContentContractContentType = ContractContentType<
    [typeof PageContentContract]
>;
