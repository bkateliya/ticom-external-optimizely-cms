import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";

export const CodeFragmentComponentType = contentType({
  key: AllComponentTypeKeyMap.CodeFragmentComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Code Fragment`,
  baseType: "_component",
  properties: {
    code: {
      type: "string",
      displayName: "Code String",
      description: "The code to embed as a string",
      group: PropertyTypes.Content,
    },
  },
});
