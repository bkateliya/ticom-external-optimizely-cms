import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { LinkContract } from "../../contracts/element-contracts/link.model";
import { PropertyTypes } from "@/lib/property-types";
import { UiIcon } from "@/components/ui/ti/TiSvgIcon/SvgIconMapping";

/**
 * Icon is fixed per variation — the author picks the variation, never the asset.
 * Values must exist in `UiIconList` (see TiSvgIcon/SvgIconMapping).
 */
export const CTA_LINK_ICONS: Record<string, UiIcon | "none"> = {
  none: "none",
  standard: "arrow-right",
  download: "download",
  selectionTool: "filter",
  upload: "arrow-up",
  pdf: "document-pdfAcrobat",
  video: "video",
} as const;

export const CtaLinkElementType = contentType({
  key: `${KEY_PREFIX}CTALink_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}CTA Link`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  /**
   * `link` comes from LinkContract — it carries both required fields
   * (`link.text` = CTA label, `link.url` = CTA URL) and is already localized.
   *
   * Note: the contract's `link` is not required, and a content type may not
   * tighten `isRequired` on an inherited contract property — the CMS rejects the
   * push. So "label and URL are required" stays authoring guidance, as does the
   * 50 character label limit (the CMS "link" type has no maxLength).
   */
  extends: [LinkContract],
  properties: {
    Icon: {
      type: "string",
      format: "selectOne",
      displayName: "Icon",
      description:
        "Standard for navigation, Download for direct file downloads",
      group: PropertyTypes.Appearance,
      sortOrder: -100,
      enum: [
        { value: CTA_LINK_ICONS.none, displayName: "None" },
        { value: CTA_LINK_ICONS.standard, displayName: "Standard (arrow)" },
        { value: CTA_LINK_ICONS.download, displayName: "Download" },
        { value: CTA_LINK_ICONS.upload, displayName: "Upload" },
        { value: CTA_LINK_ICONS.selectionTool, displayName: "Selection tool" },
        { value: CTA_LINK_ICONS.pdf, displayName: "PDF" },
        { value: CTA_LINK_ICONS.video, displayName: "Video" },
      ],
    },

    IsDownload: {
      type: "boolean",
      displayName: "Is Download Button",
      description:
        "If checked, CTA will trigger a download.  Only use for files",
      sortOrder: -50,
    },
  },
});
