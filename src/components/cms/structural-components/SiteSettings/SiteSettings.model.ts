import { contentType } from "@optimizely/cms-sdk";
import {
  KEY_PREFIX,
  DISPLAY_NAME_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { MainHeaderComponentType } from "../MainHeader/MainHeader.model";
import { ApiHeaderComponentType } from "../ApiHeader/ApiHeader.model";
import { DlpHeaderComponentType } from "../ShowcaseHeader/ShowcaseHeader.model";
import { CreativeShowcaseFooterComponentType } from "../CreativeShowcaseFooter/CreativeShowcaseFooter.model";
import { MainFooterComponentType } from "../MainFooter/MainFooter.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const SiteSettingsDataType = contentType({
  key: `${KEY_PREFIX}SiteSettings_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Site Settings`,
  baseType: "_component",
  properties: {
    googleTagManagerId: {
      type: "string",
      displayName: "Google Tag Manager ID",
      group: propertyGroupKeys.ComponentConfiguration,
    },
    favicon: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "[Obsolete] Favicon",
      ...SoftDeleteProperties,
    },
    bynderFavicon: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Favicon",
      group: propertyGroupKeys.Appearance,
    },
    header: {
      type: "content",
      allowedTypes: [MainHeaderComponentType, ApiHeaderComponentType, DlpHeaderComponentType],
      displayName: "Page Header",
      isLocalized: true,
      group: propertyGroupKeys.Layout,
    },

    footer: {
      type: "content",
      allowedTypes: [MainFooterComponentType, CreativeShowcaseFooterComponentType],
      displayName: "Page Footer",
      isLocalized: true,
      group: propertyGroupKeys.Layout,
    },
  },
});