import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const SlideWithCardComponentType = contentType({
  key: AllComponentTypeKeyMap.SlideWithCardComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Slide with Card`,
  baseType: "_component",
  extends: [AllowIn.Section, AllowIn.Column],
  properties: {
    innerCardWidth: {
      type: "string",
      format: "selectOne",
      displayName: "Inner Card Width",
      group: PropertyTypes.ComponentConfiguration,
      isRequired: true,
      enum: [
        { value: "50", displayName: "50%" },
        { value: "fixed358", displayName: "Fixed (358px)" },
      ],
    },
    showOverlayBackground: {
      type: "boolean",
      displayName: "Show Overlay Background",
      group: PropertyTypes.ComponentConfiguration,
    },

    backgroundImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Background Image",
      group: PropertyTypes.Content,
      isRequired: true,
    },

    chipLabel: {
      type: "string",
      format: "shortString",
      displayName: "Chip Label",
      maxLength: 50,
      group: PropertyTypes.Content,
      isRequired: true,
      isLocalized: true,
    },

    headline: {
      type: "string",
      displayName: "Headline",
      maxLength: 250,
      group: PropertyTypes.Content,
      isRequired: true,
      isLocalized: true,
    },
    description: {
      type: "richText",
      displayName: "Description",
      group: PropertyTypes.Content,
      editorSettings: { preset: "minimal" },
      isRequired: true,
      isLocalized: true,
    },
    ctaLink: {
      type: "content",
      displayName: "CTA Link",
      group: PropertyTypes.Content,
      isRequired: true,
      allowedTypes: [CtaLinkElementType],
    },
  },
});
