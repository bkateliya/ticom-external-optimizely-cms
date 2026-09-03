import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { ContentBlockComponentType } from "../ContentBlock/ContentBlock.model";
import { ImageElementType } from "@/components/cms/elements/ImageElement/ImageElement.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const SlideWithImageComponentType = contentType({
  key: AllComponentTypeKeyMap.SlideWithImageComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Slide with Image`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    slideContent: {
      type: "content",
      displayName: "Slide content",
      group: PropertyTypes.Content,
      isRequired: true,
      allowedTypes: [ContentBlockComponentType],
    },
    slideImage: {
      type: "content",
      displayName: "Slide image",
      group: PropertyTypes.Content,
      allowedTypes: [ImageElementType],
    },
    background: {
      type: "string",
      displayName: "Background",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      isRequired: true,
      enum: [
        { value: "white", displayName: "White (default)" },
        { value: "grey", displayName: "Grey" },
        { value: "darkGrey", displayName: "Dark Grey" },
        { value: "black", displayName: "Black" },
        { value: "red", displayName: "Red" },
      ],
    },
    tabThumbnail: {
      type: "contentReference",
      displayName: "Tab thumbnail",
      group: PropertyTypes.Content,
      allowedTypes: [BynderImageStubModel],
    },
    tabLabel: {
      type: "string",
      displayName: "Tab label",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
