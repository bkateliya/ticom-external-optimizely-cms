import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "../../constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";

export const NewProductsCardListComponentType = contentType({
  key: AllComponentTypeKeyMap.NewProductsCardListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}New Products Card List`,
  baseType: "_component",
  compositionBehaviors: [ "sectionEnabled" ],
  properties: {
    backgroundStyle: {
      type: "string",
      displayName: "Background Style",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      isRequired: true,
      enum: [
        {
          value: "white",
          displayName: "White"
        },
        {
          value: "grey",
          displayName: "Grey"
        }
      ]
    }
  }
});
