import { ComponentRegistry } from "@/lib/ts/component-props";
import { GenericExperience } from "./FlexibleMarketing/FlexibleMarketing";
import { GenericExperienceType } from "./FlexibleMarketing/FlexibleMarketing.model";
import { HomeExperienceType } from "./HomeExperience/HomeExperience.model";
import { HomeExperience } from "./HomeExperience/HomeExperience";

export const experienceTypes = [
  GenericExperienceType,
  HomeExperienceType,
] as const;

export const experienceRegistry: ComponentRegistry = {
  [GenericExperienceType.key]: GenericExperience,
  [HomeExperienceType.key]: HomeExperience,
};
