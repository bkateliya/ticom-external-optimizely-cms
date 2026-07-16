import { damAssets } from "@optimizely/cms-sdk";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";

import styles from "./styles.module.css";
import Image from "next/image";
import { HeroComponentType } from "./Hero.model";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { fieldFactory } from "@/components/ui/cms";
import { CTAElement } from "../../elements/CTA";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { SectionWrapper } from "@/components/ui/molecules/SectionWrapper/SectionWrapper";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "../../contracts/component-contracts/headline.model";
import { CtaList } from "@/components/ui/molecules/CtaList/CtaList";

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

  const headline = normalizeGenericContentToTyped<typeof HeadlineComponentType>(content.headline)
  const { WrappedTextField, WrappedRichTextField } = fieldFactory<
    typeof HeadlineComponentType
  >(headline, parentField);
  if (!headline) {
    return null;
  }

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
              <Image
                src={imageUrl}
                alt={getAlt(content.image) ?? ""}
                width={680}
                height={540}
                sizes="100vw"
              // style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}
        </div>
      </SectionWrapper>
    </ThemeProvider>
  );
}
