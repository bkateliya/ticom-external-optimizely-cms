import { propertyGroupKeys } from "@/components/cms/constants.mjs";
// import { PropertyGroupType } from "@optimizely/cms-sdk";
import { BuiltInPropertyGroups } from "@optimizely/cms-sdk/buildConfig";

const builtInPropertyGroups: BuiltInPropertyGroups[] = [
  "Content",
  "Scheduling",
  "Settings",
  "Shortcut",
  "Categories",
  "DynamicBlocks",
] as const;

export type PropertyGroupKeys = BuiltInPropertyGroups | keyof typeof propertyGroupKeys;

export const PropertyTypes = Object.entries(propertyGroupKeys)
  .concat(builtInPropertyGroups.map(x => [x, x]))
  .reduce(
    (acc, curr) => {
      const [key, value] = curr as [PropertyGroupKeys, string];
      acc[key] = value;
      return acc;
    },
    {} as Record<PropertyGroupKeys, string>,
  );

// export const PropertyGroups: PropertyGroupType[] = Object.keys(propertyMap).map(
//   (key, index) => {
//     return {
//       key: key,
//       displayName: propertyMap[key as keyof typeof propertyMap],
//       sortOrder: index,
//     };
//   },
// );
