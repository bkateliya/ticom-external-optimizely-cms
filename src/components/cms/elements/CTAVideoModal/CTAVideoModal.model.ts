import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";

export const CtaVideoElementType = contentType({
  key: `${KEY_PREFIX}CTAVideo_Element`,
  displayName: `${DISPLAY_NAME_PREFIX}Watch Video Modal Button`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  properties: {
    videoId: {
      type: "string",
      displayName: "Brightcove Video ID",
      minLength: 13,
      maxLength: 13,
      isRequired: true,
    },
    buttonStyle: {
      type: "string",
      displayName: "Button style",
      description: "Only applies when used as a standalone CTA. Ignored when placed inside a heading component.",
      format: "selectOne",
      enum: [
        { value: "solid", displayName: "Solid" },
        { value: "outline", displayName: "Outlined" },
      ],
    },
  },
});
