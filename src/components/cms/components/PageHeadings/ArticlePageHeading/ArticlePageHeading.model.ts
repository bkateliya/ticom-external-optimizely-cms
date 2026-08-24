import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import {
  getPageHeadingOverride,
  PageHeadingContract,
} from "@/components/cms/contracts/component-contracts/page-headings.model";
import { contentType } from "@optimizely/cms-sdk";
import { AllComponentTypeKeyMap } from "../../keys";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { PropertyTypes } from "@/lib/property-types";

export const ArticlePageHeaderComponentType = contentType({
  key: AllComponentTypeKeyMap.ArticlePageHeader,
  displayName: `${DISPLAY_NAME_PREFIX}Article Page Header`,
  baseType: "_component",
  extends: [PageHeadingContract, ImageBaseContract, AllowIn.PageHeader],
  properties: {
    ...getPageHeadingOverride({ headlineMaxLength: 200 }),
    externalImageUrl: {
      type: "string",
      displayName: "External Image URL",
      description: "Use for images not coming from DAM.",
      group: PropertyTypes.Content,
    },
    hideImage: {
      type: "boolean",
      displayName: "Hide Image",
      group: PropertyTypes.ComponentConfiguration,
    },
  },
});
