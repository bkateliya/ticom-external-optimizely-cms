import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";

export const ImageElementType = contentType({
  key: `${KEY_PREFIX}Image_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Image`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Image",
      group: "Content",
    },
    altText: {
      type: "string",
      displayName: "Alt Text",
      group: "Content",
    },
    link: {
      type: "link",
      displayName: "Link",
      group: "Content",
    },
  },
});
