import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../../keys";
import { CtaLinkElementType } from "../../../elements/CTALink/CTALink.model";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { PageHeadingContract } from "../../../contracts/component-contracts/page-headings.model";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";

export const PremiumMediaHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.PremiumMediaHeadingComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Media Heading`,
  baseType: "_component",
  extends: [PageHeadingContract, ImageBaseContract, AllowIn.PageHeader],
  properties: {
    preHeadline: {
      type: "richText",
      displayName: "Pre-headline",
      description: "Pre-headline of the component",
      maxLength: 75,
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
    ctaLinks: {
      displayName: "CTA Links",
      group: PropertyTypes.Content,
      type: "array",
      maxItems: 2,
      items: {
        type: "content",
        allowedTypes: [CtaLinkElementType],
      },
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
    videoId: {
      type: "string",
      displayName: "Video ID",
      description: "Video ID",
      minLength: 13,
      maxLength: 13,
    },
    videoPlayerControls: {
      displayName: "Video player controls",
      group: PropertyTypes.ComponentConfiguration,
      description: "If controls will be usable on player",
      type: "boolean",
    },
    searchBar: {
      displayName: "Search Bar",
      group: PropertyTypes.ComponentConfiguration,
      type: "string",
      format: "selectOne",
      enum: [
        { value: "none", displayName: "None" },
        { value: "video", displayName: "Video" },
      ],
    },
  },
});
