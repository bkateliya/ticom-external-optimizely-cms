import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { ProductCategoryListingOverrideComponentType } from "./ProductCategoryListingOverride.model";

export const ProductCategoryListingComponentType = contentType({
  key: AllComponentTypeKeyMap.ProductCategoryListingComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Product Category Listing`,
  baseType: "_component",
  extends: [AllowIn.Section],
  properties: {
    columnCount: {
      displayName: "Column Count",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      isRequired: true,
      enum: [
        { value: "simple", displayName: "Simple - 2 column" },
        { value: "detailed2", displayName: "Detailed - 2 column" },
        { value: "detailed3", displayName: "Detailed - 3 column" },
      ],
      
    },
    ctaTextOption: {
      displayName: "Select layout",
      group: PropertyTypes.Appearance,
      type: "string",
      format: "selectOne",
      isRequired: true,
      enum: [
        { value: "explore", displayName: "Explore" },
        { value: "Learn more", displayName: "Learn more" },
      ],
    },
    override: {
      type: "array",
      displayName: "Override",
      description: "Used to author matching GPT content",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [ProductCategoryListingOverrideComponentType.key],
      },
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
