import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";

export const RichTextAreaElementType = contentType({
  key: `${KEY_PREFIX}RichTextArea_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Rich Text Area`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  properties: {
    text: {
      type: "richText",
      displayName: "Text",
      group: "Content",
      isLocalized: true,
    },
  },
});
