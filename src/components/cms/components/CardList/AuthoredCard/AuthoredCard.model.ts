import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "src/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { PropertyTypes } from "@/lib/property-types";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";

export const AuthoredCardComponentType = contentType({
  key: AllComponentTypeKeyMap.AuthoredCardComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Authored Card`,
  baseType: "_component",
  extends: [AllowIn.MixedCardList, AllowIn.Column, ImageBaseContract],
  properties: {
    eyebrow: {
      type: "string",
      displayName: "Eyebrow",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    headline: {
      type: "string",
      displayName: "Headline",
      group: PropertyTypes.Content,
      isLocalized: true,
      isRequired: true,
    },
    description: {
      type: "richText",
      displayName: "Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    cta: {
      type: "content",
      displayName: "CTA Link",
      allowedTypes: [CtaLinkElementType],
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
