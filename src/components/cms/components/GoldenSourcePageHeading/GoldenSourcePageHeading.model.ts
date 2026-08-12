import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const GoldenSourcePageHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.GoldenSourcePageHeading,
  displayName: `${DISPLAY_NAME_PREFIX}Golden Source Page Heading`,
  baseType: "_component",
  extends: [AllowIn.PageHeader],
  properties: {
    subheadline: {
      type: "richText",
      displayName: "Subheadline",
      description: "Subheadline of the component",
      maxLength: 160,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    featureOptions: {
      displayName: "Select background",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      enum: [
        { value: "none", displayName: "None" },
        { value: "image", displayName: "Image" },
        { value: "video", displayName: "Video" },
      ],
    },
    image: {
      displayName: "Image",
      group: PropertyTypes.Appearance,
      type: "contentReference",
      allowedTypes: ["_image"],
    },
    videoId: {
      type: "string",
      group: PropertyTypes.Appearance,
      displayName: "Background Video ID",
      description: "Background Video ID",
      minLength: 13,
      maxLength: 13,
    },
    secondaryCTA: {
      displayName: "Select secondary CTA",
      description: "Only works if applicaton property is set",
      group: PropertyTypes.ComponentConfiguration,
      type: "string",
      format: "selectOne",
      enum: [
        { value: "none", displayName: "None" },
        { value: "video", displayName: "Video" },
        { value: "selection", displayName: "Product Selection" },
      ],
    },
    ctaVideoId: {
      type: "string",
      group: PropertyTypes.ComponentConfiguration,
      displayName: "CTA Video ID",
      description: "CTA Video ID",
      minLength: 13,
      maxLength: 13,
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
