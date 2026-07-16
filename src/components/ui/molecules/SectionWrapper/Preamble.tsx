import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import styles from "./styles.module.css";
import clsx from "clsx";
import { PreambleContractContentType } from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { ExtendedOptimizelyComponent } from "../../cms/ExtendedOptimizelyComponent";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "@/components/cms/contracts/component-contracts/headline.model";
import { CtaList } from "../CtaList/CtaList";
import { parseHeadlineLevel } from "../Headline/Headline";
import { getContext } from "@optimizely/cms-sdk/react/server";

export interface PreambleProps
  extends
  OptiComponentProps<PreambleContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren {
  textAlignment?: TextAlignment;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
  noPaddingSides?: boolean;
  isCentered75?: boolean;
}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: styles.textAlignLeft,
  Center: styles.textAlignCenter,
  Right: styles.textAlignRight,
};

export const Preamble = ({
  children,
  textAlignment = "Left",
  noPaddingTop,
  noPaddingBottom,
  noPaddingSides,
  isCentered75,
  content,
  parentField,
}: PreambleProps) => {
  if (!content) {
    return null;
  }

  // Page-level data set in populateSiteSettings (src/lib/data/site-settings.ts)
  console.log("Preamble page-level data", getContext());
  const baseClassName = clsx(
    styles.base,
    textAlignmentClassMap[textAlignment],
    {
      [styles.noPaddingTop]: noPaddingTop,
      [styles.paddingBottom]: noPaddingBottom,
      [styles.paddingSides]: !noPaddingSides,
      [styles.centered75]: isCentered75,
    },
  );

  const headline = normalizeGenericContentToTyped<typeof HeadlineComponentType>(content.headline);
  const hasHeaderContent = !!(
    headline.eyebrow ||
    headline.headline ||
    headline.subheadline ||
    headline.description
  );

  const sectionContentWrapperClassName = clsx([
    styles.sectionContentWrapper,
    {
      [styles.sectionContentWrapperWithHeaderGap]: hasHeaderContent,
      [styles.sectionContentWrapperNoGap]: !hasHeaderContent,
      [styles.centered75]: isCentered75,
    },
  ]);

  return (
    <div className={baseClassName}>
      <h1 >asddf</h1>
      <div
        data-component="generic-wrappers/preamble-section-wrapper"
        className={styles.content}
      >
        {/* First update level before rendering headline */}
        <HeadingLevelContext headingLevel={parseHeadlineLevel({ content: headline })}>
          <ExtendedOptimizelyComponent content={content.headline} parentField={parentField} />

          <CtaList content={content} parentField={parentField} />

          <div className={sectionContentWrapperClassName}>
            {/* Then increment the level if needed, e.g. if component set H3, then we set it to H3 above, 
                and inner components will use H4 */}
            <HeadingLevelContext headingLevel={headline.headline ? 'increment' : 'same'}>
              {children}
            </HeadingLevelContext>
          </div>
        </HeadingLevelContext>
      </div>
    </div>
  );
};
