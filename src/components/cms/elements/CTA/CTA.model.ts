import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { UiIconList } from "@/components/ui/Atoms/SvgIcon/SvgIconMapping";
import { enumToOptions } from "@/lib/opti/enum-utils";

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
      displayName: "Button Appearance",
      group: "Content",
      sortOrder: -200,
      enum: enumToOptions(ButtonAppearance, true),
    },
    ButtonColor: {
      type: "string",
      format: 'selectOne',
      displayName: "Button Color",
      group: "Content",
      sortOrder: -180,
      enum: enumToOptions(ButtonColor, true),
    },
    Icon: {
      type: "string",
      format: 'selectOne',
      displayName: "Icon",
      description: "Icon to display on the CTA",
      group: "Content",
      sortOrder: -100,
      enum: enumToOptions(UiIconList),
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
