import { PropertyTypes } from "../property-types";

/**
 * Add this to the end of a property that is deleted
 * @example 
    subheadline: {
      type: "string",
      displayName: "[Obsolete] Subheadline",
      description: "Subheadline of the component",
      maxLength: 250,
      isLocalized: true,

      ...SoftDeleteProperties,
    },
 */
export const SoftDeleteProperties = {
  // Soft Delete
  displayMode: "hidden",
  group: PropertyTypes.DeletedFields,
  isRequired: false,
};

/**
 * Use for fields that only exist because contract requires fields.
 */
export const ContractFlagProperties = {
  type: "string",
  displayMode: "hidden",
  group: PropertyTypes.Settings,
  indexingType: "disabled",
} as const;
