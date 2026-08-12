import { PreambleContracts } from "../../contracts/component-contracts/preamble.model";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { AllowInCardContentContract } from "./CardContentContract.model";

export const CardListComponentType = contentType({
  key: AllComponentTypeKeyMap.CardListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Card List`,
  baseType: "_component",
  extends: [...PreambleContracts, ...AllowIn.Groupings.NonColumn],
  properties: {
    columns: {
      type: "integer",
      displayName: "Column Count",
      group: PropertyTypes.ComponentConfiguration,
      minimum: 2,
      maximum: 5,
    },
    cardListDisplay: {
      type: "string",
      format: "selectOne",
      displayName: "List display Variation",
      description:
        "If number of cards exceeds column count, whether it should display as grid or carousel",
      group: PropertyTypes.ComponentConfiguration,
      enum: [
        { value: "grid", displayName: "Grid (Default)" },
        { value: "carousel", displayName: "Carousel" },
      ],
    },
    cardContent: {
      type: "content",
      displayName: "Card Content",
      group: "content",
      allowedTypes: [AllowInCardContentContract],
    },
  },
});
