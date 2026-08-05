import { PropertyTypes } from "@/lib/property-types";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { AllComponentTypeKeyMap } from "../keys";

export const CtaLinkListComponentType = contentType({
  key: AllComponentTypeKeyMap.CtaLinkListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}CTA Link List`,
  baseType: "_component",
  properties: {
    ctaLinks: {
      type: "array",
      displayName: "CTA Links",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [CtaLinkElementType],
      },
      maxItems: 10,
      sortOrder: 50,
    },
  },
});

export const CtaButtonListComponentType = contentType({
  key: AllComponentTypeKeyMap.CtaButtonListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}CTA Button List`,
  baseType: "_component",
  properties: {
    ctaButtons: {
      type: "array",
      displayName: "CTA Buttons",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [CtaButtonElementType],
      },
      maxItems: 3,
      sortOrder: 50,
    },
  },
});
