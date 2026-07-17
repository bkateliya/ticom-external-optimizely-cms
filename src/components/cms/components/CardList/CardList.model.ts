import { PreambleContracts } from "../../contracts/component-contracts/preamble.model";
import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "../../constants.mjs";
import { ProductCardsComponentType } from "./ProductCards/ProductCards.model";
import { GeneralCardsComponentType } from "./GeneralCards/GeneralCards.model";
import { AllComponentTypeKeyMap } from "../keys";

export const CardListComponentType = contentType({
  key: AllComponentTypeKeyMap.CardListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}CardList`,
  baseType: "_component",
  extends: PreambleContracts,
  properties: {
    columns: { type: "integer", displayName: "Column Count", group: "content" },
    cardContent: {
      type: "content",
      displayName: "Card Content",
      group: "content",
      allowedTypes: [
        GeneralCardsComponentType.key,
        ProductCardsComponentType.key,
      ],
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
