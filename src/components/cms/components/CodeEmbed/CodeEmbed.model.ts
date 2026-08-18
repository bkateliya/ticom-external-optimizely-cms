import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import { PropertyTypes } from "@/lib/property-types";
import { CodeFragmentComponentType } from "./CodeFragment.model";

export const CodeEmbedComponentType = contentType({
  key: AllComponentTypeKeyMap.CodeEmbedComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Code Embed`,
  baseType: "_component",
  extends: [...AllowIn.Groupings.Common],
  properties: {
    code: {
      type: "richText",
      displayName: "Code",
      description: "The code to embed",
      editorSettings: {
        preset: "minimal",
      },
      ...SoftDeleteProperties,
    },
    codeString: {
      type: "string",
      displayName: "Code String",
      description: "The code to embed as a string",
      ...SoftDeleteProperties,
    },
    hideOnMobile: {
      type: "boolean",
      displayName: "Hide on mobile",
      description: "Hide this embed on phone-sized screens.",
      group: PropertyTypes.Content,
    },
    codeFragment: {
      type: "contentReference",
      displayName: "Code Fragment",
      group: PropertyTypes.Content,
      allowedTypes: [CodeFragmentComponentType],
    },
  },
});
