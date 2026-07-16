import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";

export const TimedComponentContract = contract({
  key: `${KEY_PREFIX}TimedComponent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Timed Component Contract`,
  properties: {
    startDate: {
      type: "dateTime",
      displayName: "Start Date",
      description: "Component can be visible from this date",
      group: propertyGroupKeys.ComponentConfiguration,
    },
    endDate: {
      type: "dateTime",
      displayName: "End Date",
      description: "Component will be hidden after this date",
      group: propertyGroupKeys.ComponentConfiguration,
    },
  },
});

export type TimedComponentContractContentType = ContractContentType<
  [typeof TimedComponentContract]
>;
