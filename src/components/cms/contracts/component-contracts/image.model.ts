import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const ImageBaseContract = contract({
  key: `${KEY_PREFIX}ImageBase_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Image Base Contract`,
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Image",
      group: PropertyTypes.Content,
      isRequired: true,
    },
    altText: {
      type: "string",
      displayName: "Alt Text",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
