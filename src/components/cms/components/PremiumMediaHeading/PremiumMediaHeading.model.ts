import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { CTALinkElementType } from "../../elements/CTALink/CTALink.model";


export const PremiumMediaHeadingType = contentType({
  key: AllComponentTypeKeyMap.PremiumMediaHeading,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Media Heading`,
  baseType: "_component",
  properties: {
    preHeadline: {
      type: "richText",
      displayName: "Pre-headline",
      description: "Pre-headline of the component",
      maxLength: 75,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    headline: {
      type: "string",
      displayName: "Headline",
      description: "Headline of the component",
      maxLength: 60,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    tagline: {
      type: "richText",
      displayName: "Tagline",
      description: "Tagline of the component",
      maxLength: 62,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    subheadline: {
      type: "richText",
      displayName: "Subheadline",
      description: "Subheadline of the component",
      maxLength: 160,
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    ctaLinks: {
      displayName: "CTA Links",
      group: PropertyTypes.Content,
      type: "array",
      maxItems: 2,
      items: {
        type: "content",
        allowedTypes: [CTALinkElementType],
      },
    },
    featureOptions: {
      displayName: "Select background",
      group: PropertyTypes.Content,
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
      type: "contentReference", 
      allowedTypes: ["_image"]
    },
    videoId: {
      type: "string",
      displayName: "Video ID",
      description: "Video ID",
      minLength: 13,
      maxLength: 13,
    },
    videoPlayerControls: {
      displayName: "Video player controls",
      group: PropertyTypes.Content,
      description: "If controls will be usable on player",
      type: "boolean",
    },
    searchBar: {
      displayName: "Search Bar",
      group: PropertyTypes.Content,
      type: "string",
      format: "selectOne",
      enum: [
        { value: "none", displayName: "None" },
        { value: "video", displayName: "Video" },
      ],
    },
  },
});
