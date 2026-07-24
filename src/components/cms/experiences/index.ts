import { ComponentRegistry } from "@/lib/ts/component-props";
import { VisualExperiencePage } from "./VisualExperiencePage/VisualExperiencePage";
import { VisualExperiencePageType } from "./VisualExperiencePage/VisualExperiencePage.model";
import { HomeExperienceType } from "./HomeExperience/HomeExperience.model";
import { HomeExperience } from "./HomeExperience/HomeExperience";
import { FaqExperiencePage } from "./FaqExperience/FaqExperience";
import { FaqExperiencePageType } from "./FaqExperience/FaqExperience.model";
import { SimpleExperiencePageType } from "./SimpleExperience/SimpleExperience.model";
import { SimpleExperiencePage } from "./SimpleExperience/SimpleExperience";

export const experienceTypes = [
  VisualExperiencePageType,
  FaqExperiencePageType,
  HomeExperienceType,
  SimpleExperiencePageType,
] as const;

export const experienceRegistry: ComponentRegistry = {
  [FaqExperiencePageType.key]: FaqExperiencePage,
  [VisualExperiencePageType.key]: VisualExperiencePage,
  [HomeExperienceType.key]: HomeExperience,
  [SimpleExperiencePageType.key]: SimpleExperiencePage,
};
