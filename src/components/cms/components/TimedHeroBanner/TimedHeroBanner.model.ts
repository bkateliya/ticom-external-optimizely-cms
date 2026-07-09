import { PreambleContracts } from "../../contracts/component-contracts/preamble.model";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { TimedComponentContract } from "../../contracts/component-contracts/timed-component.model";
import { CarouselComponentContract } from "../../contracts/component-contracts/carousel.model";

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

export const TimedHeroBannerCarouselComponentType = contentType({
  key: `${KEY_PREFIX}TimedHeroBannerCarousel_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Timed Hero Banner Carousel`,
  baseType: "_component",
  extends: [CarouselComponentContract],
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
