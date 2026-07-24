import { KEY_PREFIX } from "../constants";

// This is in separate file to avoid circular reference

export const ExperienceTypeKeyMap = {
  // To avoid interuption we are keeping the original key value
  VisualExperiencePageTypeKey: `${KEY_PREFIX}GenericExperience_Experience`,
  ApiExperiencePageTypeKey: `${KEY_PREFIX}ApiDeveloperPage_Experience`,  
  FaqExperiencePageTypeKey: `${KEY_PREFIX}FaqExperience_Page`,  
  SimpleExperiencePageTypeKey: `${KEY_PREFIX}SimpleExperience_Page`,
} as const;

// This is used for `mayContainTypes`
export const ExperienceTypeKeys = Object.values(ExperienceTypeKeyMap);
