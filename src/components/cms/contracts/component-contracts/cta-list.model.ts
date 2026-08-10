import { contentType, contract } from "@optimizely/cms-sdk";
import {
  DISPLAY_NAME_PREFIX,
  KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { CtaButtonElementType } from "../../elements/CTAButton/CTAButton.model";
import { CtaLinkElementType } from "../../elements/CTALink/CTALink.model";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import {
  CtaButtonListComponentType,
  CtaLinkListComponentType,
} from "../../components/CtaList/CtaList.model";
import { PropertyTypes } from "@/lib/property-types";
import { ContractContentType } from "@/lib/ts/opti";

export const DeprecatedCtaListContract = contract({
  key: `${KEY_PREFIX}CtaList_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}[Deprecated] Cta List Contract`,
  properties: {
    ctas: {
      type: "array",
      displayName: "[Obsolete] CTA List",
      items: {
        type: "content",
        allowedTypes: [CtaButtonElementType, CtaLinkElementType],
      },
      sortOrder: 50,
      ...SoftDeleteProperties,
    },
  },
});

/**
 * Contract to allow selecting a list of either buttons or links.
 * To only allow buttons or only allow links, use this contract, but also
 * add `CtaListOverrideLinksOnly` or `CtaListOverrideButtonsOnly` to the properties
 */
export const CtaListContract = contract({
  key: `${KEY_PREFIX}CtaListNew_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Cta List Contract`,
  properties: {
    ctasList: {
      type: "content",
      displayName: "CTA List",
      group: PropertyTypes.Content,
      allowedTypes: [CtaButtonListComponentType, CtaLinkListComponentType],
      sortOrder: 50,
    },
  },
});


export type CtaListContractContentType = ContractContentType<
  [typeof CtaListContract]
>;


export const CtaListOverrideLinksOnly = {
  ctasList: {
    type: "content",

    displayName: "CTA Link List",
    group: PropertyTypes.Content,

    allowedTypes: [CtaLinkListComponentType],
    sortOrder: 50,
  },
};

export const CtaListOverrideButtonsOnly = {
  ctasList: {
    sortOrder: 50,
    type: "content",

    displayName: "CTA Button List",
    group: PropertyTypes.Content,

    allowedTypes: [CtaButtonListComponentType],

  },
};

export const DeprecatedCtaListComponentType = contentType({
  key: `${KEY_PREFIX}CtaList_Component`,
  displayName: `${DISPLAY_NAME_PREFIX}[Deprecated] Cta List`,
  baseType: "_component",
  extends: [DeprecatedCtaListContract],
});
