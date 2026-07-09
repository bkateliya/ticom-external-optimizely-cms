
import { KEY_PREFIX } from "../constants";

// This is in separate file to avoid circular reference

export const ExperienceTypeKeyMap = {
  GenericExperienceTypeKey: `${KEY_PREFIX}GenericExperience_Experience`,
  ApplicationExperienceTypeKey: `${KEY_PREFIX}ApplicationExperience_Experience`,
  FamilyExperienceTypeKey: `${KEY_PREFIX}FamilyExperience_Experience`,
} as const;

// This is used for `mayContainTypes`
export const ExperienceTypeKeys = Object.values(ExperienceTypeKeyMap);