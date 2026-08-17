import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const LLCPromoMessageComponentType = contentType({
  key: AllComponentTypeKeyMap.LLCPromoMessageComponent,
  displayName: `${DISPLAY_NAME_PREFIX}LLC Promo Message`,
  baseType: "_component",
  properties: {
    bynderImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      isRequired: true,
      group: PropertyTypes.Content,
    },
    message: {
      type: "richText",
      displayName: "Message",
      isRequired: true,
      description: "LLC promo message",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const LLCPromoWarningComponentType = contentType({
  key: AllComponentTypeKeyMap.LLCPromoWarningComponent,
  displayName: `${DISPLAY_NAME_PREFIX}LLC Promo Warning`,
  baseType: "_component",
  properties: {
    warningType: {
      type: "string",
      displayName: "Warning Type",
      isRequired: true,
      description: "Select warning type",
      format: "selectOne",
      enum: [
        {
          displayName: "FYI",
          value: "fyi",
        },
        {
          displayName: "Conditional",
          value: "conditional",
        },
        {
          displayName: "Strict",
          value: "strict",
        },
      ],
      group: PropertyTypes.Content,
    },
    message: {
      type: "richText",
      displayName: "Description",
      isRequired: true,
      description: "LLC promo warning message",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

export const LLCPromoComponentType = contentType({
  key: AllComponentTypeKeyMap.LLCPromoComponent,
  displayName: `${DISPLAY_NAME_PREFIX}LLC Promo`,
  baseType: "_component",
  properties: {
    innerComponents: {
      type: "array",
      displayName: "Content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [
          LLCPromoMessageComponentType,
          LLCPromoWarningComponentType,
        ],
      },
    },
  },
});

export const LLCPromoFolderType = contentType({
  key: AllComponentTypeKeyMap.LLCPromoFolder,
  displayName: `${DISPLAY_NAME_PREFIX}LLC Promo Folder`,
  baseType: "_folder",
  properties: {},
  mayContainTypes: ["_self", LLCPromoComponentType],
});
