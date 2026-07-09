import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";

export const CodeEmbedComponentType = contentType({
  key: `${KEY_PREFIX}CodeEmbed_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Code Embed`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled", "elementEnabled"],
  properties: {
    code: {
      type: "richText",
      displayName: "Code",
      description: "The code to embed",
      group: "Content",
      editorSettings: {
        preset: "minimal",
      },
    },
    codeString: {
      type: "string",
      displayName: "Code String",
      description: "The code to embed as a string",
      group: "Content",
    },
  },
});
