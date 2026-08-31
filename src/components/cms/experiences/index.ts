import { ComponentRegistry } from "@/lib/ts/component-props";
import { VisualExperiencePage } from "./VisualExperiencePage/VisualExperiencePage";
import { VisualExperiencePageType } from "./VisualExperiencePage/VisualExperiencePage.model";
import { HomeExperienceType } from "./HomeExperience/HomeExperience.model";
import { HomeExperience } from "./HomeExperience/HomeExperience";
import { HierarchyNavigationExperiencePage } from "./HierarchyNavigationExperience/HierarchyNavigationExperience";
import { HierarchyNavigationExperiencePageType } from "./HierarchyNavigationExperience/HierarchyNavigationExperience.model";
import { SimpleExperiencePageType } from "./SimpleExperience/SimpleExperience.model";
import { SimpleExperiencePage } from "./SimpleExperience/SimpleExperience";

export const experienceTypes = [
  VisualExperiencePageType,
  HierarchyNavigationExperiencePageType,
  HomeExperienceType,
  SimpleExperiencePageType,
] as const;

export const experienceRegistry: ComponentRegistry = {
  [HierarchyNavigationExperiencePageType.key]: HierarchyNavigationExperiencePage,
  [VisualExperiencePageType.key]: VisualExperiencePage,
  [HomeExperienceType.key]: HomeExperience,
  [SimpleExperiencePageType.key]: SimpleExperiencePage,
};
