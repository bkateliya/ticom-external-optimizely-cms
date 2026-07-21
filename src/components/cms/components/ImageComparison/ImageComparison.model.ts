import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";

export const ImageComparisonComponentType = contentType({
  key: AllComponentTypeKeyMap.ImageComparisonComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Image Comparison`,
  baseType: "_component",
  compositionBehaviors: ["elementEnabled"],
  properties: {
    leftImage: {
      type: "contentReference",
      displayName: "Left Image",
      isLocalized: true,
      group: PropertyTypes.Content,
      sortOrder: 100,
      allowedTypes: ["_image"],
    },
    disableMouseWheel: {
      type: "boolean",
      displayName: "Disable Mouse Wheel",
      group: PropertyTypes.Appearance,
      sortOrder: 100,
    },
    leftImageSlotLabel: {
      type: "string",
      displayName: "Left Image Slot Label",
      isLocalized: true,
      group: PropertyTypes.Content,
      sortOrder: 200,
    },
    tiAriaLabel: {
      type: "string",
      displayName: "Aria Label",
      group: PropertyTypes.Appearance,
      sortOrder: 200,
    },
    rightImage: {
      type: "contentReference",
      displayName: "Right Image",
      isLocalized: true,
      group: PropertyTypes.Content,
      sortOrder: 300,
      allowedTypes: ["_image"],
    },
    rightImageSlotLabel: {
      type: "string",
      displayName: "Right Image Slot Label",
      isLocalized: true,
      group: PropertyTypes.Content,
      sortOrder: 400,
    },
    slottedCaption: {
      type: "string",
      displayName: "Slotted Caption",
      isLocalized: true,
      group: PropertyTypes.Content,
      sortOrder: 500,
    },
  },
});
