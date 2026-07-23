import { KEY_PREFIX } from "../constants";

// This is in separate file to avoid circular reference

export const ExperienceTypeKeyMap = {
  FlexibleMarketingExperienceTypeKey: `${KEY_PREFIX}GenericExperience_Experience`,
  ApiDeveloperExperienceTypeKey: `${KEY_PREFIX}ApiDeveloperPage_Experience`,
} as const;

// This is used for `mayContainTypes`
export const ExperienceTypeKeys = Object.values(ExperienceTypeKeyMap);
