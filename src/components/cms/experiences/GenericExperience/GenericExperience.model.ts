import { contentType, ContentTypes } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { SEOContract } from "@/components/cms/contracts/page-contacts/seo.model";
import { HeroComponentType } from "@/components/cms/components/Hero/Hero.model";
import { TimedHeroBannerCarouselComponentType } from "@/components/cms/components/TimedHeroBanner/TimedHeroBanner.model";
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";
import { FamilyReferenceContract } from "@/components/cms/contracts/page-contacts/family-reference.model";
import { ExperienceTypeKeyMap, ExperienceTypeKeys } from "../keys";
import { PageTypeKeys } from "@/components/cms/pages/keys";


const genericExperienceConfigUntyped = {
  key: ExperienceTypeKeyMap.GenericExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Generic Experience`,
  baseType: "_experience",
  extends: [PageContentContract, SEOContract],
  properties: {
    hero: {
      type: "content",
      allowedTypes: [HeroComponentType, TimedHeroBannerCarouselComponentType],
      displayName: "Hero Section",
      isLocalized: true,
    },
  },
  mayContainTypes: [...PageTypeKeys, ...ExperienceTypeKeys],
} as const;

// This is needed to get proper intellisense for the config
export const genericExperienceConfig =
  genericExperienceConfigUntyped as ContentTypes.ExperienceContentType &
  typeof genericExperienceConfigUntyped;

export const GenericExperienceType = contentType(genericExperienceConfig);


export const ApplicationExperienceType = contentType({
  ...genericExperienceConfig,
  key: ExperienceTypeKeyMap.ApplicationExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Application Experience`,
  extends: [...genericExperienceConfig.extends, ApplicationReferenceContract],
});


export const FamilyExperienceType = contentType({
  ...genericExperienceConfig,
  key: ExperienceTypeKeyMap.FamilyExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Family Experience`,
  extends: [...genericExperienceConfig.extends, FamilyReferenceContract]
});