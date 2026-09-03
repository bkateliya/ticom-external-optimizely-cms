import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { SlideWithCardComponentType } from "../SlideWithCard/SlideWithCard.model";

export const CarouselWithChipsComponentType = contentType({
  key: AllComponentTypeKeyMap.CarouselWithChipsComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Carousel with Chips`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    slides: {
      type: "array",
      displayName: "Slides",
      group: PropertyTypes.Content,
      minItems: 1,
      maxItems: 6,
      items: {
        type: "content",
        allowedTypes: [SlideWithCardComponentType],
      },
    },
  },
});
