import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageContracts,
} from "@/components/cms/contracts/common";
import { ExperienceTypeKeyMap } from "../keys";
import { HierarchyNavigationComponentType } from "../../components/HierarchyNavigation/HierarchyNavigation.model";

export const HierarchyNavigationExperiencePageType = contentType({
  key: ExperienceTypeKeyMap.HierarchyNavigationExperiencePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Hierarchy Navigation Experience Page`,
  baseType: "_experience",
  extends: CommonPageContracts,
  properties: {
    hierarchyNav: {
      type: "contentReference",
      displayName: "Hierarchy Navigation",
      allowedTypes: [HierarchyNavigationComponentType],
    },
  },
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
