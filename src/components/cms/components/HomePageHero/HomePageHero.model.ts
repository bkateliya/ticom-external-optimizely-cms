import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { TimedComponentContract } from "@/components/cms/contracts/component-contracts/timed-component.model";
import { SlideshowComponentContract } from "@/components/cms/contracts/component-contracts/slideshow.model";
import { AllComponentTypeKeyMap } from "../keys";
import { HeadlineContract } from "../../contracts/component-contracts/headline.model";
import { LinkContract } from "../../contracts/element-contracts/link.model";

export const HomePageHeroSlideComponentType = contentType({
  key: AllComponentTypeKeyMap.HomePageHeroSlideComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Home Page Hero Slide`,
  baseType: "_component",
  extends: [HeadlineContract, TimedComponentContract, LinkContract],
  properties: {
    backgroundImage: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Background Image",
      description: "Select a custom banner or textured background image",
      group: "Content",
      isLocalized: true,
      isRequired: true,
    },
    featuredImage: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Featured Image",
      description: "Featured image is optional for textured backgrounds",
      group: "Content",
      isLocalized: true,
    },
    campaignAlias: {
      type: "string",
      displayName: "Campaign Alias",
      description:
        "Include only the first 7 parts of the campaign alias without the 8th part -countrycode ending.  e.g. sys-ind-ba-TPS6282x_thermalp18_doorbell-bhp-eerd-null",
      maxLength: 100,
      isRequired: true,
    },
  },
});

export const HomePageHeroComponentType = contentType({
  key: AllComponentTypeKeyMap.HomePageHeroComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Home Page Hero`,
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
        contentType: HomePageHeroSlideComponentType,
      },
      isLocalized: true,
    },
  },
});
