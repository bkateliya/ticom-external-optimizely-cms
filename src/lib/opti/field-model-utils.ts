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
};
