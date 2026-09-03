import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { GenericPageHeadingComponentType } from "./GenericPageHeading.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TifButtonGroup } from "@ticom/form-components/react";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { CTAButtonElement } from "@/components/cms/elements/CTAButton";

export function GenericPageHeadingComponent({
  content,
  parentField,
}: OptiComponentProps<typeof GenericPageHeadingComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof GenericPageHeadingComponentType
  >(content, parentField);

  const primaryCta = normalizeGenericContentToTyped(content.primaryCTA, CtaButtonElementType);
  const secondaryCta = normalizeGenericContentToTyped(content.secondaryCTA, CtaButtonElementType);
  const hasMedia = !!content.media;

  return (
    <ThemeProvider theme={content.background === "grey" ? "theme-grey" : "theme-white"}>
      <SectionWrapper>
        <div className={hasMedia ? "flex flex-col md:flex-row gap-8 md:gap-12 justify-between" : ""}>
          <div className={hasMedia ? "flex flex-col flex-1 justify-center" : ""}>
            <WrappedTextField as="h1" field="pageHeadline" className="mb-8" />
            <WrappedRichTextField field="pageSubheadline" className="text-h3 font-light mb-8" />

            {(primaryCta || secondaryCta) && (
              <TifButtonGroup mobileBehavior="stack">
                {primaryCta && <CTAButtonElement content={primaryCta} />}
                {secondaryCta && <CTAButtonElement content={secondaryCta} />}
              </TifButtonGroup>
            )}
          </div>

          {hasMedia && (
            <div className="w-full md:max-w-[500px] ml-auto">
              <ExtendedOptimizelyComponent content={content.media} />
            </div>
          )}
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
