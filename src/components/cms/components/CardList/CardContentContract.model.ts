import { ContractFlagProperties } from "@/lib/opti/field-model-utils";
import { contract } from "@optimizely/cms-sdk";
import { KEY_PREFIX, DISPLAY_NAME_PREFIX } from "../../constants.mjs";

//  This is here instead of under contracts since it's specific to Card List
export const AllowInCardContentContract = contract({
  key: `${KEY_PREFIX}AllowInCardContent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Card Content Contract`,
  properties: {
    metaAllowInCardContent: {
      ...ContractFlagProperties,
    },
  },
});
