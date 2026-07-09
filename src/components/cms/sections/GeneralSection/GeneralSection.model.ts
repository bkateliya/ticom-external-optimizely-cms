import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { SectionContacts } from "../../contracts/component-contracts/section.model";
import { componentTypes } from "../../components/types";

export const GeneralSectionComponentType = contentType({
  key: `${KEY_PREFIX}GeneralSection_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}General Section`,
  baseType: "_component",
  extends: SectionContacts,
  properties: {
    content: {
      type: "array",
      displayName: "Section Content",
      group: "Content",
      items: {
        type: "content",
        allowedTypes: [...componentTypes],
      },
    },
  },
  compositionBehaviors: ["sectionEnabled"],
});
