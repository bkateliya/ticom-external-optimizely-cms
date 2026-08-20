import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";

export const PageHeadingContract = contract({
  key: `${KEY_PREFIX}PageHeading_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Page Heading Contract`,
  properties: {
    pageHeadline: {
      type: "string",
      displayName: "Headline",
      description: "Page title and main H1 for the page",
      maxLength: 60,
      group: PropertyTypes.Content,
      isLocalized: true,
      isRequired: true,
    },
    pageSubheadline: {
      type: "richText",
      displayName: "Subheadline",
      description: "Displays below the Headline and used for Meta Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
interface PageHeadingOverrideOptions {
  headlineDisplayName?: string;
  headlineDescription?: string;
  headlineMaxLength?: number;
  subHeadlineDisplayName?: string;
  subHeadlineDescription?: string;
}
export function getPageHeadingOverride(opts: PageHeadingOverrideOptions) {
  return {
    pageHeadline: {
      type: "string",
      displayName: opts.headlineDisplayName || "Headline",
      description:
        opts.headlineDescription || "Page title and main H1 for the page",
      maxLength: opts.headlineMaxLength || 250,
      group: PropertyTypes.Content,
      isLocalized: true,
      isRequired: true,
    },
    pageSubheadline: {
      type: "richText",
      displayName: opts.subHeadlineDisplayName || "Subheadline",
      description:
        opts.subHeadlineDescription ||
        "Displays below the Headline and used for Meta Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  } as const;
}

/** For using contracts as component interfaces. */
export type PageHeadingContractContentType = ContractContentType<
  [typeof PageHeadingContract]
>;
