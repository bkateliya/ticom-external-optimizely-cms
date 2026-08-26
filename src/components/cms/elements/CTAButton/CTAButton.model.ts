import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const CtaButtonElementType = contentType({
  key: `${KEY_PREFIX}CTA_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}CTA Button`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  extends: [LinkContract],
  properties: {
    Variant: {
      type: "string",
      format: "selectOne",
      displayName: "Button Appearance",
      group: "Content",
      sortOrder: -200,
      enum: [
        {
          displayName: "Solid",
          value: ButtonAppearance.solid,
        },
        {
          displayName: "Outline",
          value: ButtonAppearance.outline,
        },
        {
          displayName: "Ghost",
          value: ButtonAppearance.ghost,
        },
      ],
    },
    ButtonColor: {
      type: "string",
      format: "selectOne",
      displayName: "Button Color",
      group: "Content",
      sortOrder: -180,
      enum: [
        {
          displayName: "Primary",
          value: ButtonColor.primary,
        },
        {
          displayName: "Secondary",
          value: ButtonColor.secondary,
        },
      ],
    },
    Icon: {
      type: "string",
      format: "selectOne",
      displayName: "Icon",
      description: "Icon to display on the CTA",
      group: "Content",
      sortOrder: -100,
      // Restricted per FSD — CTA buttons only offer these seven icons.
      enum: [
        { displayName: "Download", value: "download" },
        { displayName: "Filter", value: "filter" },
        { displayName: "External link", value: "open-in-new" },
        { displayName: "Info", value: "info-circle-outline" },
        { displayName: "Mail to", value: "mail" },
        { displayName: "PDF", value: "document-pdfAcrobat" },
        { displayName: "GitHub", value: "github" },
      ],
    },
    IsDownload: {
      type: "boolean",
      displayName: "[Obsolete] Is Download Button",
      description:
        "If checked, CTA will trigger a download.  Only use for files",
      sortOrder: -50,

      ...SoftDeleteProperties,
    },
  },
});
