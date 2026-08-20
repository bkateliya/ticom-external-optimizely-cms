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
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const ContentBlockComponentType = contentType({
  key: AllComponentTypeKeyMap.ContentBlockComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Content Block`,
  baseType: "_component",
  extends: [
    HeadlineContract,
    DeprecatedCtaListContract,
    CtaListContract,
    ...AllowIn.Groupings.Common
  ],
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "[Obsolete] Image",
      ...SoftDeleteProperties,
    },
    bynderImage: {
      type: "contentReference",
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      group: "Content",
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
