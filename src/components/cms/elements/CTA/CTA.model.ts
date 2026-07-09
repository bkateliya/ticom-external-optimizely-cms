import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import {
  CtaIcons,
  CtaVariantsWithAuto,
} from "@/components/ui/Atoms/Cta/CtaButton";
import { IconMapping } from "@/components/ui/Atoms/SvgIcon/SvgIconMapping";
import { LinkContract } from "../../contracts/element-contracts/link.model";

export const CtaVariantOptions: {
  value: CtaVariantsWithAuto;
  displayName: string;
}[] = [
  {
    value: "auto",
    displayName: "Auto",
  },
  {
    value: "fill",
    displayName: "Fill",
  },
  {
    value: "outline",
    displayName: "Outline",
  },
  {
    value: "ghost",
    displayName: "Ghost",
  },
  {
    value: "link",
    displayName: "Link",
  },
  {
    value: "demo" as CtaVariantsWithAuto,
    displayName: "Demo",
  },
] as const;

export const CtaIconOptions: { value: CtaIcons; displayName: string }[] =
  Object.keys(IconMapping).map((key) => ({
    value: key as CtaIcons,
    displayName: key,
  }));

export const CTAElementType = contentType({
  key: `${KEY_PREFIX}CTA_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}CTA`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  extends: [LinkContract],
  properties: {
    Variant: {
      type: "string",
      format: 'selectOne',
      displayName: "Theme",
      group: "Content",
      sortOrder: -200,
      enum: CtaVariantOptions,
    },
    Icon: {
      type: "string",
      format: 'selectOne',
      displayName: "Icon",
      description: "Icon to display on the CTA",
      group: "Content",
      sortOrder: -100,
      enum: CtaIconOptions,
    },
    IconAlignment: {
      type: "string",
      format: 'selectOne',
      displayName: "Icon Alignment",
      group: "Content",
      sortOrder: -50,
      enum: [
        {
          value: "Left",
          displayName: "Left",
        },
        {
          value: "Right",
          displayName: "Right",
        },
      ],
    },
  },
});
