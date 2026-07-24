import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";

export const LinkContract = contract({
  key: `${KEY_PREFIX}Link_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Link Contract`,
  properties: {
    link: {
      type: "link",
      displayName: "URL",
      isLocalized: true,
      group: "Content",
    },
  },
});

/** For using contracts as component interfaces. */
export type LinkContractContentType = ContractContentType<
  typeof LinkContract
>;
