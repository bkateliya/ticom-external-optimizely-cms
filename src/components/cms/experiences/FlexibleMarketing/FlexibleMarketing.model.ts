import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";
import { FamilyReferenceContract } from "@/components/cms/contracts/page-contacts/family-reference.model";
import { ExperienceTypeKeyMap } from "../keys";
import { AllPageAndExperienceTypeKeys, CommonPageContracts } from "@/components/cms/contracts/common";

export const GenericExperienceType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.FlexibleMarketingExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}FlexibleMarketing Experience`,
  extends: CommonPageContracts,
  mayContainTypes: AllPageAndExperienceTypeKeys,

  properties: {
  },
});


export const ApplicationExperienceType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.ApplicationExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Application Experience`,
  extends: [...CommonPageContracts, ApplicationReferenceContract],
  mayContainTypes: AllPageAndExperienceTypeKeys,

  properties: {
  },
});


export const FamilyExperienceType = contentType({
  baseType: "_experience",
  key: ExperienceTypeKeyMap.FamilyExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Family Experience`,
  extends: [...CommonPageContracts, FamilyReferenceContract],
  mayContainTypes: AllPageAndExperienceTypeKeys,

  properties: {
  },
});