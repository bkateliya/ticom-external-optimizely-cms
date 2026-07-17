
import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import styles from "./styles.module.css";
import clsx from "clsx";
import { HeadlineComponentType, HeadlineContractContentType } from "@/components/cms/contracts/component-contracts/headline.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";

export interface HeadlineProps extends
  OptiComponentProps<HeadlineContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  textAlignment?: TextAlignment;
}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: styles.textAlignLeft,
  Center: styles.textAlignCenter,
  Right: styles.textAlignRight,
};

export function parseHeadlineLevel({ content }: OptiComponentProps<HeadlineContractContentType>) {
  const headlineLevel = (parseInt(content?.headlineLevel ?? '') as 1 | 2 | 3 | 4 | 5 | 6 | undefined) || 'same';
  return headlineLevel
}

export const Headline = ({
  textAlignment = "Left",
  content,
  parentField,
}: HeadlineProps) => {
  "use client";

  if (!content) {
    return null;
  }

  const { WrappedTextField, WrappedRichTextField, WrappedHeadingTextField } =
    fieldFactory<typeof HeadlineComponentType>(content, parentField);

  const baseClassName = clsx(
    styles.base,
    textAlignmentClassMap[textAlignment],
  );

  const hasHeaderContent = !!(
    content.eyebrow ||
    content.headline ||
    content.subheadline ||
    content.description
  );

  if (!hasHeaderContent) {
    return null;
  }

  return (
    <div className={baseClassName}>
      <div className={styles.eyebrow}>
        <WrappedTextField
          as="span"
          className={styles.eyebrowText}
          field="eyebrow"
        />
      </div>
      <div className={styles.copy}>
        <HeadingLevelContext headingLevel={parseHeadlineLevel({ content })}>
          <WrappedHeadingTextField
            className={styles.headline}

            field="headline"
          />
        </HeadingLevelContext>
        <WrappedTextField
          as="p"
          className={styles.subheadline}
          field="subheadline"
        />
        <WrappedRichTextField
          field="description"
          className={styles.description}
        />
      </div>
    </div>
  );
};
