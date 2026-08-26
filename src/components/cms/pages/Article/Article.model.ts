import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import {
  AllPageAndExperienceTypeKeys,
  CommonPageOnlyContracts,
} from "@/components/cms/contracts/common";
import { TaxonomyType } from "../../data/Taxonomy.model";
import { PropertyTypes } from "@/lib/property-types";
import { ArticlePageHeaderComponentType } from "../../components/PageHeadings/ArticlePageHeading/ArticlePageHeading.model";
import { getPageHeaderOverride } from "../../contracts/page-contacts/page-content.model";

export const ArticlePageType = contentType({
  key: PageTypeKeyMap.ArticlePageTypeKey,
  displayName: `${DISPLAY_NAME_PREFIX}Article Page`,
  baseType: "_page",
  extends: CommonPageOnlyContracts,
  properties: {
    ...getPageHeaderOverride({
      pageHeaderAllowedTypes: [ArticlePageHeaderComponentType],
    }),
    showStickyNav: {
      type: "content",
      displayName: "Category (Choose From Assets, do not create new block)",
      allowedTypes: [TaxonomyType],
      group: PropertyTypes.Seo,
    },
    category: {
      type: "content",
      displayName: "Category (Choose From Assets, do not create new block)",
      allowedTypes: [TaxonomyType],
      group: PropertyTypes.Seo,
    },
    articleYear: {
      type: "content",
      displayName: "Year (Choose From Assets, do not create new block)",
      allowedTypes: [TaxonomyType],
      group: PropertyTypes.Seo,
    },
    datePublished: {
      type: "dateTime",
      displayName: "Date Published",
      description: "This is the first date the article was published",
      group: PropertyTypes.Seo,
      isRequired: true,
    },
    author: {
      type: "string",
      displayName: "Author (Full Name)",
      group: PropertyTypes.Seo,
    },
    dateUpdated: {
      type: "dateTime",
      displayName: "Last updated",
      description: "This is the last modified date of the article",
      group: PropertyTypes.Seo,
    },
    dateExpire: {
      type: "dateTime",
      displayName: "Expiration date",
      description: "This is the date that the article expires",
      group: PropertyTypes.Seo,
    },
  },
  mayContainTypes: AllPageAndExperienceTypeKeys,
});
