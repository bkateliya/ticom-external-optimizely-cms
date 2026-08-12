import { allComponentTypes } from "@/components/cms/components/types";
import { contractComponentTypes } from "@/components/cms/contracts/component-contracts/types";
import { dataTypes } from "@/components/cms/data/types";
import { elementTypes } from "@/components/cms/elements/types";
import { experienceTypes } from "@/components/cms/experiences";
import { pageTypes } from "@/components/cms/pages/types";
import { sectionTypes } from "@/components/cms/sections/types";
import { structuralComponentTypes } from "@/components/cms/structural-components/types";
import {
  PermittedTypes,
  Contract,
  ContentTypes,
  ComponentContentType,
} from "@optimizely/cms-sdk";
import { ContentProperty } from "node_modules/@optimizely/cms-sdk/dist/cjs/model/properties";
import { deepSearch } from "../utils/object-utils";
import { ALLOW_IN_CONTRACT_KEY_PREFIX } from "@/components/cms/contracts/component-contracts/allow-in.model";

const originalAllTypes = [
  ...experienceTypes,
  ...pageTypes,
  ...allComponentTypes,
  ...dataTypes,
  ...structuralComponentTypes,
  ...elementTypes,
  ...sectionTypes,
  ...contractComponentTypes,
];

export function getAllTypesUpdated() {
  // When AllowedTypes is a contract, we need to expand it to the proper allowed types
  // for the GraphQL queries to return the correct data.
  // If this is fixed in future Optimizely SDK versions this can be removed.
  originalAllTypes.forEach((contentType) => {
    // Get all fields that have allowedTypes
    const fields = deepSearch<ContentProperty>(
      contentType,
      (x) => (x?.allowedTypes?.length ?? 0) > 0,
    );
    // Go through each field
    fields.forEach((contentProperty) => {
      const newAllowedTypes: PermittedTypes[] = [];
      contentProperty.allowedTypes?.forEach((allowedType) => {
        // If the allowed type is an "Allow In" contract expand the contract
        if (toKey(allowedType)?.startsWith(ALLOW_IN_CONTRACT_KEY_PREFIX)) {
          getAllowedTypes(allowedType as Contract).forEach((y) =>
            newAllowedTypes.push(toKey(y)),
          );
        } else {
          // Otherwise key the type as is
          newAllowedTypes.push(allowedType);
        }
      });

      // Update the allowedTypes to our updated version
      contentProperty.allowedTypes = newAllowedTypes;
    });
  });

  return originalAllTypes;
}

function toKey(keyOrContract: string | { key: string }) {
  return typeof keyOrContract === "string" ? keyOrContract : keyOrContract.key;
}

const expandedContractLookup: Record<
  string,
  ContentTypes.ComponentContentType[]
> = {};

function getAllowedTypes(
  contract: Contract | string,
): ContentTypes.ComponentContentType[] {
  const key = toKey(contract);
  if (expandedContractLookup[key]) {
    return expandedContractLookup[key];
  }
  expandedContractLookup[key] = originalAllTypes
    .filter((x) => x.baseType === "_component")
    .filter((x: ComponentContentType) => {
      if (!x.extends) {
        return false;
      }
      const extendsProps = x.extends;
      const isArray = Array.isArray(extendsProps);
      const extendsArray = isArray ? extendsProps : [extendsProps];
      return !!extendsArray.find((c) => c?.key === key);
    });

  return expandedContractLookup[key];
}
