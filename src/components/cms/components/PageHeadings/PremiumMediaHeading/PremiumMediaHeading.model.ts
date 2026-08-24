import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../../keys";
import { CtaLinkElementType } from "../../../elements/CTALink/CTALink.model";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { PageHeadingContract } from "../../../contracts/component-contracts/page-headings.model";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { BynderVideoStubModel } from "@/components/cms/media/graph/BynderStubs";

export const PremiumMediaHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.PremiumMediaHeadingComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Media Heading`,
  baseType: "_component",
  extends: [PageHeadingContract, ImageBaseContract, AllowIn.PageHeader],
  properties: {
    // Content group
    preHeadline: {
      type: "richText",
      displayName: "Pre-headline",
      description: "Pre-headline of the component",
      maxLength: 75,
      group: PropertyTypes.Content,
      sortOrder: 10,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    pageHeadline: {
      type: "string",
      displayName: "Headline",
      group: PropertyTypes.Content,
      sortOrder: 20,
      isLocalized: true,
      isRequired: true,
    },
    pageSubheadline: {
      type: "richText",
      displayName: "Subheadline",
      group: PropertyTypes.Content,
      sortOrder: 30,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    tagline: {
      type: "richText",
      displayName: "Tagline",
      description: "Tagline of the component",
      maxLength: 62,
      group: PropertyTypes.Content,
      sortOrder: 40,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    ctaLinks: {
      displayName: "CTA Links",
      group: PropertyTypes.Content,
      type: "array",
      sortOrder: 50,
      maxItems: 2,
      items: {
        type: "content",
        allowedTypes: [CtaLinkElementType],
      },
    },

    // Appearance group
    heightOption: {
      displayName: "Select height",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      sortOrder: 10,
      enum: [
        { value: "full", displayName: "Full viewport (default)" },
        { value: "default", displayName: "Fixed (450px)" },
      ],
    },
    featureOptions: {
      displayName: "Select background",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      sortOrder: 20,
      enum: [
        { value: "image", displayName: "Image" },
        { value: "video", displayName: "Video" },
      ],
    },
    bynderImage: {
      displayName: "Image",
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      group: PropertyTypes.Appearance,
      sortOrder: 30,
    },
    altText: {
      type: "string",
      displayName: "Alt Text",
      group: PropertyTypes.Appearance,
      sortOrder: 35,
      isLocalized: true,
    },
    bynderVideo: {
      displayName: "Background Video",
      type: "contentReference",
      allowedTypes: [BynderVideoStubModel],
      group: PropertyTypes.Appearance,
      sortOrder: 40,
    },
    videoPlayerControls: {
      displayName: "Video player controls",
      description: "If controls will be usable on player",
      type: "boolean",
      group: PropertyTypes.Appearance,
      sortOrder: 50,
    },
    videoId: {
      type: "string",
      displayName: "CTA Video ID",
      description: "Brightcove video ID — opens in modal when CTA button is clicked",
      minLength: 13,
      maxLength: 13,
      group: PropertyTypes.Appearance,
      sortOrder: 60,
    },

    // ComponentConfiguration group
    searchBar: {
      displayName: "Search Bar",
      group: PropertyTypes.ComponentConfiguration,
      type: "string",
      format: "selectOne",
      sortOrder: 20,
      enum: [
        { value: "none", displayName: "None" },
        { value: "video", displayName: "Video" },
      ],
    },
  },
});
