import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../../keys";
import { CtaButtonElementType } from "../../../elements/CTAButton/CTAButton.model";
import { CtaVideoElementType } from "../../../elements/CTAVideoModal/CTAVideoModal.model";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { PageHeadingContract } from "../../../contracts/component-contracts/page-headings.model";
import { BackgroundImageSetting, BackgroundVideoSetting } from "../../../contracts/component-contracts/section.model";

export const PremiumMediaHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.PremiumMediaHeadingComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Premium Media Heading`,
  baseType: "_component",
  extends: [PageHeadingContract, AllowIn.PageHeader],
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
      group: PropertyTypes.Content,
      sortOrder: 40,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    ctaLinks: {
      displayName: "CTA Links",
      description: "Button appearance is always displayed as outline regardless of the Variant selected.",
      group: PropertyTypes.Content,
      type: "array",
      sortOrder: 50,
      maxItems: 2,
      items: {
        type: "content",
        allowedTypes: [CtaButtonElementType, CtaVideoElementType],
      },
    },

    // Appearance group
    background: {
      displayName: "Background",
      description: "Add a background image or video",
      type: "content",
      allowedTypes: [BackgroundImageSetting, BackgroundVideoSetting],
      isRequired: true,
      group: PropertyTypes.Appearance,
      sortOrder: 10,
    },
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
