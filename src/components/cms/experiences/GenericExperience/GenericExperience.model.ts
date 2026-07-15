import { contentType, ContentTypes } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { SEOContract } from "@/components/cms/contracts/page-contacts/seo.model";
import { HeroComponentType } from "@/components/cms/components/Hero/Hero.model";
import { TimedHeroBannerSlideshowComponentType } from "@/components/cms/components/TimedHeroBanner/TimedHeroBanner.model";
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";
import { FamilyReferenceContract } from "@/components/cms/contracts/page-contacts/family-reference.model";
import { ExperienceTypeKeyMap, ExperienceTypeKeys } from "../keys";
import { PageTypeKeys } from "@/components/cms/pages/keys";


// `satisfies` (rather than an `as` cast) keeps the narrow literal types for the
// config while still validating it against `ExperienceContentType`. Only the
// discriminant literals need pinning with `as const`; the arrays stay mutable so
// they match the SDK's array types. Keeping `extends` as the concrete
// `[PageContentContract, SEOContract]` tuple lets `ContentProps` infer the named
// `pageTitle`/SEO fields instead of collapsing them into `[x: string]: any`.
export const genericExperienceConfig = {
  key: ExperienceTypeKeyMap.GenericExperienceTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Generic Experience`,
  baseType: "_experience" as const,
  extends: [PageContentContract, SEOContract],
  properties: {
    hero: {
      type: "content" as const,
      allowedTypes: [HeroComponentType, TimedHeroBannerSlideshowComponentType],
      displayName: "Hero Section",
      isLocalized: true,
    },
  },
  mayContainTypes: [...PageTypeKeys, ...ExperienceTypeKeys],
} satisfies ContentTypes.ExperienceContentType;

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