import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { SectionContracts } from "../../contracts/component-contracts/section.model";
import { PropertyTypes } from "@/lib/property-types";
import { ColumnGridComponentType } from "../../components/ColumnGrid/ColumnGrid.model";
import { StandaloneComponentTypeKeys } from "../../components/keys";

export const GeneralSectionComponentType = contentType({
  key: `${KEY_PREFIX}GeneralSection_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}General Section`,
  baseType: "_component",
  extends: SectionContracts,
  properties: {
    content: {
      type: "array",
      displayName: "Section Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        // Column Grid is not part os standard type otherwise it could go inside itself
        allowedTypes: [...StandaloneComponentTypeKeys, ColumnGridComponentType],
      },
    },
  },
  compositionBehaviors: ["sectionEnabled"],
});
