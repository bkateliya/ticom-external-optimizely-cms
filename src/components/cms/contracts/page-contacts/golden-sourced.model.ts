import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { ApplicationType } from "../../data/Application.model";
import { ProductFamilyType } from "../../data/ProductFamily.model";

export const GoldenSourcedDataContract = contract({
  key: `${KEY_PREFIX}GoldenSourcedData_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Golden Sourced Data Contract`,
  properties: {
    goldenSourcedData: {
      type: "content",
      allowedTypes: [ProductFamilyType, ApplicationType],
      displayName: "Golden Sourced Data",
      group: PropertyTypes.Data,
      isLocalized: false,
    },
  },
});
