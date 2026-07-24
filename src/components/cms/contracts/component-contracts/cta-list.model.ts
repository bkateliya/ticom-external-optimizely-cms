import { contentType, contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { CTAElementType } from "../../elements/CTA/CTA.model";

export const CtaListContract = contract({
  key: `${KEY_PREFIX}CtaList_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Cta List Contract`,
  properties: {
    ctas: {
      type: "array",
      displayName: "CTA List",
      group: PropertyTypes.Content,
      items: {
        type: "content",
        allowedTypes: [CTAElementType],
      },
      sortOrder: 50
    },
  },
});

export const CtaListComponentType = contentType({
  key: `${KEY_PREFIX}CtaList_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}Cta List`,
  baseType: "_component",
  extends: [CtaListContract]
})