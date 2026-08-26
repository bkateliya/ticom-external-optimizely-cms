import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const PortfolioVisualizerComponentType = contentType({
  key: AllComponentTypeKeyMap.PortfolioVisualizerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Portfolio Visualizer`,
  baseType: "_component",
  extends: [AllowIn.Section, AllowIn.Tab],
  properties: {
    file: {
      type: "contentReference",
      displayName: "SVG Image",
      isRequired: true,
      group: PropertyTypes.Content,
      sortOrder: 10,
      allowedTypes: [BynderImageStubModel],
    },
    removeBorder: {
      type: "boolean",
      displayName: "Remove Border",
      group: PropertyTypes.Appearance,
      sortOrder: 20,
    },
  },
});
