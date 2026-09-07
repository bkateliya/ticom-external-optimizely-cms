import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "src/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../../keys";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { PropertyTypes } from "@/lib/property-types";
import { CardListDisplay, CardListFields, CardStyles } from "../card-options";

export const MixedCardListComponentType = contentType({
  key: AllComponentTypeKeyMap.MixedCardListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Mixed Card List`,
  baseType: "_component",
  extends: [AllowIn.Section, AllowIn.Column],
  properties: {
    cards: {
      type: "array",
      displayName: "Cards",
      group: "content",
      items: {
        type: "content",
        allowedTypes: [AllowIn.MixedCardList],
      },
    },
    displayVariation: {
      type: "string",
      displayName: "List Display Variation",
      group: PropertyTypes.ComponentConfiguration,
      format: "selectOne",
      enum: [
        { value: "grid", displayName: "Grid (Default)" },
        { value: "grid-hover", displayName: "Grid w/Hover Card" },
        { value: "carousel", displayName: "Carousel" },
        { value: "carousel-below", displayName: "Carousel w/Navigation Below" },
        { value: "vertical", displayName: "Vertical List" },
      ] as const satisfies { value: CardListDisplay; displayName: string }[],
    },
    columnCount: {
      type: "integer",
      displayName: "Column Count",
      group: PropertyTypes.ComponentConfiguration,
      minimum: 2,
      maximum: 5,
    },
    hiddenFields: {
      type: "array",
      format: "selectMany",
      displayName: "Hide Fields",
      description: "Select fields to hide from display in this list",
      group: PropertyTypes.ComponentConfiguration,
      items: {
        type: "string",
        enum: [
          {
            value: "image",
            displayName: "Image ",
          },
          {
            value: "eyebrow",
            displayName: "Eyebrow",
          },
          {
            value: "description",
            displayName: "Description",
          },
          {
            value: "cta",
            displayName: "CTA label",
          },
        ] as const satisfies { value: CardListFields; displayName: string }[],
      },
    },
    cardStyle: {
      type: "string",
      displayName: "Card style",
      group: PropertyTypes.ComponentConfiguration,
      format: "selectOne",
      enum: [
        { value: "white", displayName: "Plain White (Default)" },
        { value: "dark", displayName: "Plain Dark" },
      ] as const satisfies { value: CardStyles; displayName: string }[],
    },
  },
});
