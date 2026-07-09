import { contentType } from "@optimizely/cms-sdk";
import { HeroComponentType } from "@/components/cms/components/Hero/Hero.model";
import {
  KEY_PREFIX,
  DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { SEOContract } from "@/components/cms/contracts/page-contacts/seo.model";
import { PageTypeKeyMap } from "../keys";

export const ArticlePageType = contentType({
  key: PageTypeKeyMap.ArticlePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Article Page`,
  baseType: "_page",
  extends: [PageContentContract, SEOContract],
  properties: {
    hero: {
      type: "component",
      contentType: HeroComponentType,
      displayName: "Hero Section",
    },
  },
});
