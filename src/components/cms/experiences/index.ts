import { ComponentRegistry } from "@/lib/ts/component-props";
import { GenericExperience } from "./FlexibleMarketing/FlexibleMarketing";
import { ApplicationExperienceType, FamilyExperienceType, GenericExperienceType } from "./FlexibleMarketing/FlexibleMarketing.model";
import { HomeExperienceType } from "./HomeExperience/HomeExperience.model";
import { HomeExperience } from "./HomeExperience/HomeExperience";

export const experienceTypes = [GenericExperienceType, HomeExperienceType, ApplicationExperienceType, FamilyExperienceType] as const;

export const experienceRegistry: ComponentRegistry = {
  [GenericExperienceType.key]: GenericExperience,
  [ApplicationExperienceType.key]: GenericExperience,
  [FamilyExperienceType.key]: GenericExperience,
  [HomeExperienceType.key]: HomeExperience,
};