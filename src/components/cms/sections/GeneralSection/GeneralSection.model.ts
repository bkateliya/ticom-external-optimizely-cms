import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { SectionContracts } from "../../contracts/component-contracts/section.model";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const GeneralSectionComponentType = contentType({
  key: `${KEY_PREFIX}GeneralSection_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}General Section`,
  baseType: "_component",
  extends: [...SectionContracts, AllowIn.Main],
  compositionBehaviors: ["sectionEnabled"],
  properties: {
    content: {
      type: "array",
      displayName: "Section Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [AllowIn.Section],
      },
    },
  },
});
