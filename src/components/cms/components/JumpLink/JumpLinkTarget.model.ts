import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const JumpLinkTargetComponentType = contentType({
  key: AllComponentTypeKeyMap.JumpLinkTargetComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Jump Link Target`,
  baseType: "_component",
  extends:[AllowIn.Main],
  properties: {
    jumpLink: {
      type: "string",
      displayName: "Jump Link ID",
      description:
        "Only lowercase letters, numbers, and hyphens are allowed",
      group: PropertyTypes.Content,
      isRequired: true,
      pattern: "^[a-z0-9-]+$",
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
