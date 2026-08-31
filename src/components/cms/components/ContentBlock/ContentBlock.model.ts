import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { HeadlineContract } from "@/components/cms/contracts/component-contracts/headline.model";
import {
  CtaListContract,
  DeprecatedCtaListContract,
} from "@/components/cms/contracts/component-contracts/cta-list.model";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import { ImageBaseContract } from "../../contracts/component-contracts/image.model";

export const ContentBlockComponentType = contentType({
  key: AllComponentTypeKeyMap.ContentBlockComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Content Block`,
  baseType: "_component",
  extends: [
    HeadlineContract,
    DeprecatedCtaListContract,
    CtaListContract,
    ImageBaseContract,
    ...AllowIn.Groupings.Common
  ],
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "[Obsolete] Image",
      ...SoftDeleteProperties,
    },
    contentBlockDescription: {
      type: "richText",
      displayName: "Description",
      description: "Rich text content",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
