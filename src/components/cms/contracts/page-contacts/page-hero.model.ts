import { contract } from "@optimizely/cms-sdk";
import {
  KEY_PREFIX,
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";
import { AllowIn } from "../component-contracts/allow-in.model";

export const PageHeaderContract = contract({
  key: `${KEY_PREFIX}PageHero_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Generic Experience`,
  properties: {
    hero: {
      type: "content",
      displayName: "Page Header Selection",
      isLocalized: true,
      allowedTypes: [AllowIn.PageHeader]
    },
  },
});

/** For using contracts as component interfaces. */
export type PageHeaderContractContentType = ContractContentType<
  [typeof PageHeaderContract]
>;
