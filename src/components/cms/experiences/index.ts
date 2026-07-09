import { ComponentRegistry } from "@/lib/ts/component-props";
import { GenericExperience } from "./GenericExperience/GenericExperience";
import { ApplicationExperienceType, FamilyExperienceType, GenericExperienceType } from "./GenericExperience/GenericExperience.model";
import { HomeExperienceType } from "./HomeExperience/HomeExperience.model";
import { HomeExperience } from "./HomeExperience/HomeExperience";

export const experienceTypes = [GenericExperienceType, HomeExperienceType, ApplicationExperienceType, FamilyExperienceType] as const;

export const experienceRegistry: ComponentRegistry = {
  [GenericExperienceType.key]: GenericExperience,
  [ApplicationExperienceType.key]: GenericExperience,
  [FamilyExperienceType.key]: GenericExperience,
  [HomeExperienceType.key]: HomeExperience,
};