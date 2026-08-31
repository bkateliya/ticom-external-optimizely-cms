import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageOnlyContracts,
} from "@/components/cms/contracts/common";
import { HierarchyNavigationComponentType } from "../../components/HierarchyNavigation/HierarchyNavigation.model";

export const ApiDocumentationPageType = contentType({
  key: PageTypeKeyMap.ApiDocumentationPageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}API Documentation Page`,
  baseType: "_page",
  extends: CommonPageOnlyContracts,
  properties: {
    hierarchyNav: {
      type: "contentReference",
      displayName: "Hierarchy Navigation",
      allowedTypes: [HierarchyNavigationComponentType]
    }
  },
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
