import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../../contracts/component-contracts/allow-in.model";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";

export const GoldenSourcePageHeadingComponentType = contentType({
  key: AllComponentTypeKeyMap.GoldenSourcePageHeading,
  displayName: `${DISPLAY_NAME_PREFIX}Golden Source Page Heading`,
  baseType: "_component",
  extends: [ImageBaseContract, AllowIn.PageHeader],
  properties: {
    subheadline: {
      type: "richText",
      displayName: "Subheadline",
      description: "Subheadline of the component",
      maxLength: 160,
      group: PropertyTypes.Content,
      isLocalized: true,
      editorSettings: { preset: "minimal" },
    },
    background: {
      displayName: "Section background",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      sortOrder: 10,
      enum: [
        { value: "white", displayName: "White (default)" },
        { value: "grey", displayName: "Grey" },
      ],
    },
    assetType: {
      displayName: "Feature asset",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      sortOrder: 20,
      enum: [
        { value: "none", displayName: "None" },
        { value: "image", displayName: "Image" },
        { value: "brightcove", displayName: "Video (Brightcove)" },
      ],
    },
    featureVideoId: {
      displayName: "Video ID (Brightcove)",
      description: "Brightcove video ID — autoplays in the right column",
      type: "string",
      minLength: 13,
      maxLength: 13,
      group: PropertyTypes.Appearance,
      sortOrder: 40,
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
