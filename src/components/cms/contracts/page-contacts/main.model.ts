import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";
import { AllowIn } from "../component-contracts/allow-in.model";

export const MainContract = contract({
  key: `${KEY_PREFIX}Main_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Main Contract`,
  properties: {
    main: {
      type: "array",
      displayName: "Main Content",
      description:
        "Main body content for the page",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [AllowIn.Main],
      },
    },
  },
});

/** For using contracts as component interfaces. */
export type MainContractContentType = ContractContentType<
  [typeof MainContract]
>;
