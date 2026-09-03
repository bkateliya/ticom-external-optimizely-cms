import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import { ArticlePageHeaderComponentType } from "./ArticlePageHeading.model";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { ImageElement } from "@/components/cms/elements/ImageElement";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";

const TI_LOGO = "https://www.ti.com/etc/designs/ti/images/ui/ic-logo.svg";

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

  const hasImage = !!content.bynderImage || !!content.externalImageUrl;

  return (
    <ThemeProvider>
      <SectionWrapper>
        <div>
          <WrappedTextField
            field="pageHeadline"
            as="h1"
            className="text-h2 mb-8"
          />

          <WrappedRichTextField
            field="pageSubheadline"
            className="text-h4 font-light mb-8"
          />

          {content.hideImage ? null : hasImage ? (
            <ImageElement
              content={content}
              externalImageSrc={content.externalImageUrl}
            />
          ) : (
            <TiImage src={TI_LOGO} alt="Texas Instruments" />
          )}
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
