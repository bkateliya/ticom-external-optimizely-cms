import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";
import { StandaloneComponentTypeKeys } from "@/components/cms/components/keys";
import { sectionTypes } from "@/components/cms/sections/types";

export const PreFooterContract = contract({
  key: `${KEY_PREFIX}PreFooter_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Pre-Footer Contract`,
  properties: {
    preFooter: {
      type: "array",
      displayName: "Pre-Footer",
      description: "Content shown directly above the footer on every page.",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [...sectionTypes, ...StandaloneComponentTypeKeys],
      },
    },
  },
});

/** For using contracts as component interfaces. */
export type PreFooterContractContentType = ContractContentType<
  [typeof PreFooterContract]
>;
