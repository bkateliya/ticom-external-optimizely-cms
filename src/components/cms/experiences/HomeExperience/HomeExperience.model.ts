import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";
import { CommonPageContracts, AllPageAndExperienceTypeKeys } from "@/components/cms/contracts/common";
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";

export const HomeExperienceType = contentType({
  baseType: "_experience",
  key: `${KEY_PREFIX}HomeExperience_Experience`,
  displayName: `${DISPLAY_NAME_PREFIX}Home Experience`,

  extends: [...CommonPageContracts, ApplicationReferenceContract],
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
