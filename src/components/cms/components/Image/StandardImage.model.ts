import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { ImageBaseContract } from "../../contracts/component-contracts/image.model";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const StandardImageComponentType = contentType({
  key: AllComponentTypeKeyMap.StandardImageComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Standard Image`,
  baseType: "_component",
  extends: [
    ImageBaseContract,
    ...AllowIn.Groupings.Common,
  ],
  properties: {
    caption: {
      type: "richText",
      displayName: "Caption",
      group: PropertyTypes.Content,
      editorSettings: {
        preset: "minimal",
      },
    },
    enableEnlarge: {
      type: "boolean",
      displayName: "Enable Enlarge",
      group: PropertyTypes.Appearance,
    },
    enableBorder: {
      type: "boolean",
      displayName: "Enable Border",
      group: PropertyTypes.Appearance,
    },
    link: {
      type: "link",
      displayName: "Link",
      group: PropertyTypes.Content,
    },
  },
});
