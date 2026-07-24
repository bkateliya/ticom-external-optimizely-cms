import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { UiIconList } from "@/components/ui/ti/TiSvgIcon/SvgIconMapping";
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
    IsDownload: {
      type: "boolean",
      displayName: "Is Download Button",
      description: "If checked, CTA will trigger a download.  Only use for files",
      group: "Content",
      sortOrder: -50,
    },
  },
});
