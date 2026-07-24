import { damAssets } from "@optimizely/cms-sdk";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import styles from "./styles.module.css";
import { HeroComponentType } from "./Hero.model";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { HeadlineComponentType } from "../../contracts/component-contracts/headline.model";
import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";
import EnhancedNextImage from "@/components/ui/Atoms/EnhancedNextImage/EnhancedNextImage";

export function HeroComponent({
  content,
  parentField,
}: OptiComponentProps<typeof HeroComponentType>) {
  if (!content) {
    return null;
  }

  const { src } = getPreviewUtils(content);
  const { getAlt } = damAssets(content);
  const imageUrl = src(content.image);

  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof HeadlineComponentType
  >(content, parentField);

  return (
    <ThemeProvider>
      <SectionWrapper>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.eyebrow}>
                <WrappedTextField
                  as="span"
                  className={styles.eyebrowText}
                  field="eyebrow"
                />
              </div>
              <div className={styles.titleContainer}>
                <WrappedTextField as="h1" field="headline" />
                <WrappedTextField as="p" field="subheadline" />
              </div>
              <WrappedRichTextField
                field="description"
                className={styles.description}
              />
            </div>
            <CtaList content={content} />
          </div>
          {imageUrl && (
            <div className={styles.image}>
              <EnhancedNextImage
                src={imageUrl}
                alt={getAlt(content.image) ?? ""}
              />
            </div>
          )}
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
