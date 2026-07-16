import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";
import { enumToOptions } from "@/lib/opti/enum-utils";
import { ThumbnailSizeOptions } from "@/components/ui/ti/TiSlideshow/TiSlideShow";
export const SlideshowComponentContract = contract({
  key: `${KEY_PREFIX}SlideshowComponent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Slideshow Component Contract`,
  properties: {
    autoAdvance: {
      type: "boolean",
      displayName: "Auto Advance",
      description: "Property for enabling auto-advance timer feature",
      group: propertyGroupKeys.ComponentConfiguration,
    },
    slideDuration: {
      type: "integer",
      displayName: "Auto Advance Delay (ms)",
      description: "Property to set default slide duration for auto-advance (Default: 7000)",
      group: propertyGroupKeys.ComponentConfiguration,
    },

    hideNavigation: {
      type: "boolean",
      displayName: "Hide Navigation",
      description: "Hide and disable the thumbnail navigation entirely",
      group: propertyGroupKeys.ComponentConfiguration,
    },

    thumbnailSize: {
      type: "string",
      format: "selectOne",
      displayName: "Thumbnail Size",
      description: "Property for thumbnail size, small or large.",
      group: propertyGroupKeys.ComponentConfiguration,
      enum: enumToOptions(ThumbnailSizeOptions)
    },
  },
});

export type SlideshowComponentContractContentType = ContractContentType<
  [typeof SlideshowComponentContract]
>;
