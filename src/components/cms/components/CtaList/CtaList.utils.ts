import {
  normalizeGenericContentToTyped,
  normalizeGenericArrayToTyped,
} from "@/lib/utils/content-type-utils";
import { ContentProps } from "@optimizely/cms-sdk";
import { CtaListContractContentType } from "@/components/cms/contracts/component-contracts/cta-list.model";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import {
  CtaButtonListComponentType,
  CtaLinkListComponentType,
} from "./CtaList.model";

export function getValidCtas(
  content: Partial<ContentProps<CtaListContractContentType>>,
) {
  if (!content?.ctasList) {
    return [];
  }

  const ctaButtonList = normalizeGenericContentToTyped(
    content.ctasList,
    CtaButtonListComponentType,
  );
  if (ctaButtonList) {
    return normalizeGenericArrayToTyped<typeof CtaButtonElementType>(
      ctaButtonList?.ctaButtons,
    ).filter((cta) => cta.link?.url.default);
  }

  const ctaLinkList = normalizeGenericContentToTyped(
    content.ctasList,
    CtaLinkListComponentType,
  );
  if (ctaLinkList) {
    /* Mirrors CtaList's own check so the wrapper isn't rendered for CTAs it will drop. */
    return normalizeGenericArrayToTyped<typeof CtaButtonElementType>(
      ctaLinkList?.ctaLinks,
    ).filter((cta) => cta.link?.url.default);
  }
  return [];
}
