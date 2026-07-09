import { contentType } from "@optimizely/cms-sdk";
import {
  KEY_PREFIX,
  DISPLAY_NAME_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";

export const SiteSettingsDataType = contentType({
  key: `${KEY_PREFIX}SiteSettings_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Site Settings Data`,
  baseType: "_page",
  properties: {
    googleTagManagerId: {
      type: "string",
      displayName: "Google Tag Manager ID",
      group: propertyGroupKeys.Settings,
    },
    favicon: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Favicon",
      group: propertyGroupKeys.Appearance,
    },
  },
});


export const SiteSettingsBlockDataType = contentType({
  key: `${KEY_PREFIX}SiteSettingsBlock_Data`,
  displayName: `${DISPLAY_NAME_PREFIX}Site Settings Block Data`,
  baseType: "_component",
  properties: {
    googleTagManagerId: {
      type: "string",
      displayName: "Google Tag Manager ID",
      group: propertyGroupKeys.Settings,
    },
    favicon: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Favicon",
      group: propertyGroupKeys.Appearance,
    },
  },
});
