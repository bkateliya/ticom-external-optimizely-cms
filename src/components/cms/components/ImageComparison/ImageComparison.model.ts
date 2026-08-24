import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const ImageComparisonItemComponentType = contentType({
  key: AllComponentTypeKeyMap.ImageComparisonItemComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Image Comparison Item`,
  baseType: "_component",
  properties: {
    thumbnail: {
      type: "contentReference",
      displayName: "Thumbnail",
      description: "shown below gallery if more than 1 image comparison added",
      group: PropertyTypes.Content,
      allowedTypes: [BynderImageStubModel],
    },
    comparisonCaption: {
      type: "richText",
      displayName: "Comparison Caption",
      group: PropertyTypes.Content,
      sortOrder: 10,
      editorSettings: {
        preset: "minimal",
      },
    },
    leftImage: {
      type: "contentReference",
      displayName: "Left Image",
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 20,
      allowedTypes: [BynderImageStubModel],
    },
    leftImageAltText: {
      type: "string",
      displayName: "Left Image Alt Text",
      group: PropertyTypes.Content,
      sortOrder: 30,
    },
    leftImageOverlay: {
      type: "richText",
      displayName: "Left Image Overlay",
      group: PropertyTypes.Content,
      sortOrder: 40,
      editorSettings: {
        preset: "minimal",
      },
    },
    leftImageCaption: {
      type: "richText",
      displayName: "Left Image Caption",
      group: PropertyTypes.Content,
      sortOrder: 50,
      editorSettings: {
        preset: "minimal",
      },
    },
    rightImage: {
      type: "contentReference",
      displayName: "Right Image",
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 60,
      allowedTypes: [BynderImageStubModel],
    },
    rightImageAltText: {
      type: "string",
      displayName: "Right Image Alt Text",
      group: PropertyTypes.Content,
      sortOrder: 70,
    },
    rightImageOverlay: {
      type: "richText",
      displayName: "Right Image Overlay",
      group: PropertyTypes.Content,
      sortOrder: 80,
      editorSettings: {
        preset: "minimal",
      },
    },
    rightImageCaption: {
      type: "richText",
      displayName: "Right Image Caption",
      group: PropertyTypes.Content,
      sortOrder: 90,
      editorSettings: {
        preset: "minimal",
      },
    },
  },
});

export const ImageComparisonComponentType = contentType({
  key: AllComponentTypeKeyMap.ImageComparisonComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Image Comparison`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    imageComparisonItems: {
      type: "array",
      displayName: "Image Comparison Items",
      isRequired: true,
      group: PropertyTypes.Content,
      minItems: 1,
      maxItems: 3,
      items: {
        type: "content",
        allowedTypes: [ImageComparisonItemComponentType],
      },
    },
  },
});
