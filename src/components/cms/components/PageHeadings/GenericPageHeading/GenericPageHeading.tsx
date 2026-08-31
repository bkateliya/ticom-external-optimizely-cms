import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { GenericPageHeadingComponentType } from "./GenericPageHeading.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";

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

  return (
    <ThemeProvider>
      <SectionWrapper>
        <div>
          <div>
            <WrappedTextField as="h1" field="pageHeadline" />
            <WrappedRichTextField field="pageSubheadline" />
          </div>
          <ExtendedOptimizelyComponent content={content.media} />
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
