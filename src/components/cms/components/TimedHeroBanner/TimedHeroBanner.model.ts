import { PreambleContracts } from "@/components/cms/contracts/component-contracts/preamble.model";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";
import { TimedComponentContract } from "@/components/cms/contracts/component-contracts/timed-component.model";
import { SlideshowComponentContract } from "@/components/cms/contracts/component-contracts/slideshow.model";

export const TimedHeroBannerComponentType = contentType({
  key: `${KEY_PREFIX}TimedHeroBanner_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Timed Hero Banner`,
  baseType: "_component",
  extends: [...PreambleContracts, TimedComponentContract],
  properties: {
    bannerImage: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Banner Image",
      group: "Content",
      isLocalized: true,
    },
  },
});

export const TimedHeroBannerSlideshowComponentType = contentType({
  key: `${KEY_PREFIX}TimedHeroBannerCarousel_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Timed Hero Banner Slideshow`,
  baseType: "_component",
  extends: [SlideshowComponentContract],
  properties: {
    slides: {
      type: "array",
      displayName: "Slides",
      description: "The slides to display in the carousel",
      group: "Content",
      items: {
        type: "component",
        contentType: TimedHeroBannerComponentType,
      },
      isLocalized: true,
    },
  },
});
