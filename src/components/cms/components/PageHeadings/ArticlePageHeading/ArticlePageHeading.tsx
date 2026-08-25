import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { ArticlePageHeaderComponentType } from "./ArticlePageHeading.model";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { ImageElement } from "@/components/cms/elements/ImageElement";

export function ArticlePageHeaderComponent({
  content,
  parentField,
}: OptiComponentProps<typeof ArticlePageHeaderComponentType>) {
  if (!content) {
    return null;
  }

  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof ArticlePageHeaderComponentType
  >(content, parentField);

  return (
    <ThemeProvider>
      <SectionWrapper>
        <div>
          <WrappedTextField field="pageHeadline" as="h1" />

          <WrappedRichTextField field="pageSubheadline" />

          {content.hideImage ? null : (
            <ImageElement
              content={content}
              externalImageSrc={content.externalImageUrl}
            />
          )}
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
