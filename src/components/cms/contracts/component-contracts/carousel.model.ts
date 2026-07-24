import { contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
  propertyGroupKeys,
} from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";
import { enumToOptions } from "@/lib/opti/enum-utils";
import { CarouselGapOptions, CarouselNavigationOptions } from "@/components/ui/molecules/Carousel/CarouselWrapper";

export const CarouselComponentContract = contract({
  key: `${KEY_PREFIX}CarouselComponent_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Carousel Component Contract`,
  properties: {
    gap: {
      type: "string",
      format: "selectOne",
      displayName: "Gap Size",
      description: "The size of the gap between cards",
      group: propertyGroupKeys.ComponentConfiguration,
      enum: enumToOptions(CarouselGapOptions, true)
    },
    navigation: {
      type: "string",
      format: "selectOne",
      displayName: "Navigation Options",
      description: "The type of navigation to display",
      group: propertyGroupKeys.ComponentConfiguration,
      enum: enumToOptions(CarouselNavigationOptions, true)
    },
  },
});

export type CarouselComponentContractContentType = ContractContentType<
  [typeof CarouselComponentContract]
>;
