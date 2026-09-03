import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { SlideWithImageComponentType } from "../SlideWithImage/SlideWithImage.model";

export const SlideshowComponentType = contentType({
  key: AllComponentTypeKeyMap.SlideshowComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Slideshow`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    slides: {
      type: "array",
      displayName: "Slides",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [SlideWithImageComponentType],
      },
    },
  },
});
