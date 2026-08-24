import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const JumpLinkTargetComponentType = contentType({
  key: AllComponentTypeKeyMap.JumpLinkTargetComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Jump Link Target`,
  baseType: "_component",
  properties: {
    jumpLink: {
      type: "string",
      displayName: "Jump Link ID",
      group: PropertyTypes.Content,
      isRequired: true,
    },
    jumpLinkText: {
      type: "string",
      displayName: "Jump Link Text",
      group: PropertyTypes.Content,
      isRequired: true,
      isLocalized: true,
    },
  },
});
