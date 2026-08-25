import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import styles from "./styles.module.css";
import { HeroComponentType } from "./Hero.model";
import { fieldFactory } from "@/components/ui/cms";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { ImageElement } from "@/components/cms/elements/ImageElement";

export function HeroComponent({
  content,
  parentField,
}: OptiComponentProps<typeof HeroComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof HeroComponentType
  >(content, parentField);

  return (
    <ThemeProvider>
      <SectionWrapper>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.titleContainer}>
                <WrappedTextField as="h1" field="pageHeadline" />
              </div>
              <WrappedRichTextField
                field="pageSubheadline"
                className={styles.description}
              />
            </div>
          </div>
          <ImageElement content={content} />
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
