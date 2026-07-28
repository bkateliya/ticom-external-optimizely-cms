import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import styles from "./styles.module.css";
import clsx from "clsx";
import {
  HeadlineComponentType,
  HeadlineContractContentType,
} from "@/components/cms/contracts/component-contracts/headline.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";

export interface HeadlineStyleProps {
  textAlignment?: TextAlignment;
  redUnderline?: boolean;
}
export interface HeadlineProps
  extends
    OptiComponentProps<HeadlineContractContentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    HeadlineStyleProps {}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export function parseHeadlineSize({
  content,
}: OptiComponentProps<HeadlineContractContentType>) {
  const headlineSize = parseInt(content?.headlineLevel ?? "") as
    1 | 2 | 3 | 4 | 5 | 6 | undefined;
  return headlineSize;
}

export const Headline = ({
  textAlignment = "Left",
  redUnderline,
  content,
  parentField,
  ...props
}: HeadlineProps) => {
  "use client";

  if (!content) {
    return null;
  }

  const { WrappedTextField, WrappedRichTextField, WrappedHeadingTextField } =
    fieldFactory<typeof HeadlineComponentType>(content, parentField);

  const baseClassName = clsx(textAlignmentClassMap[textAlignment]);

  const hasHeaderContent = !!(
    content.eyebrow ||
    content.headline ||
    content.description
  );

  if (!hasHeaderContent) {
    return null;
  }

  return (
    <div className={clsx(baseClassName, props.className)} {...props}>
      <div>
        <WrappedTextField
          as="span"
          className={styles.eyebrowText}
          field="eyebrow"
        />
      </div>
      <div className={clsx()}>
        <WrappedHeadingTextField
          headingSize={parseHeadlineSize({ content })}
          field="headline"
        />
        {redUnderline ? (
          <hr
            className={clsx(
              "w-24 border-0 h-px -mt-2 mb-8 bg-pl-border-color-accent",
              {
                "mx-auto": textAlignment === "Center",
              },
            )}
          />
        ) : null}
        <WrappedRichTextField
          field="description"
          className={styles.description}
        />
      </div>
    </div>
  );
};
