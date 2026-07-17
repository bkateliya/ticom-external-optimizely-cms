import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";

export const CodeEmbedComponentType = contentType({
  key: AllComponentTypeKeyMap.CodeEmbedComponent,
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
