import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";

export const CarouselComponentContract = contract({
  key: `${KEY_PREFIX}CarouselComponent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Carousel Component Contract`,
  properties: {
    autoPlay: {
      type: "boolean",
      displayName: "Auto Play",
      description: "Whether the carousel should automatically play",
      group: propertyGroupKeys.Settings,
    },
    autoPlayInterval: {
      type: "integer",
      displayName: "Auto Play Interval",
      description: "The interval in milliseconds between slides",
      group: propertyGroupKeys.Settings,
    },
  },
});

export type CarouselComponentContractContentType = ContractContentType<
  [typeof CarouselComponentContract]
>;
