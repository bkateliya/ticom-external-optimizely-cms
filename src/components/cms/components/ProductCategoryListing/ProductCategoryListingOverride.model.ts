import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { BynderImageStubModel } from "../../media/graph/BynderStubs";
import { ProductFamilyType } from "../../data/ProductFamily.model";


export const ProductCategoryListingOverrideComponentType = contentType({
  key: AllComponentTypeKeyMap.ProductCategoryListingOverrideComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Product Category Listing Override`,
  baseType: "_component",
  properties: {
    productFamily: {
      type: "contentReference",
      allowedTypes: [ProductFamilyType],
      displayName: "Golden Sourced Product Family",
      group: PropertyTypes.Data,
      isLocalized: false,
      isRequired: true,
    },
    description: {
      type: "richText",
      displayName: "Message",
      description: "Description",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
    bynderImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      group: PropertyTypes.Content,
    },
  },
  // compositionBehaviors: ["sectionEnabled"],
});
