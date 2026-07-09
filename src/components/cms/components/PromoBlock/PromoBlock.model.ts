import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PromoContentElementType } from "../../elements/PromoContent/PromoContent.model";
import { ImageElementType } from "../../elements/Image/Image.model";

export const PromoBlockComponentType = contentType({
  key: `${KEY_PREFIX}PromoBlock_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Promo Block`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  properties: {
    leftContent: {
      type: "content",
      allowedTypes: [PromoContentElementType, ImageElementType],
    },
    rightContent: {
      type: "content",
      allowedTypes: [PromoContentElementType, ImageElementType],
    },
    split: {
      type: "string",
      format: 'selectOne',
      enum: [
        { value: "large-right", displayName: "1/3 left, 2/3 right" },
        { value: "even", displayName: "Even split" },
        { value: "large-left", displayName: "2/3 left, 1/3 right" },
      ],
      displayName: "ContentSplit",
      description: "How the left and right content are split",
      group: "Content",
    },
  },
});
