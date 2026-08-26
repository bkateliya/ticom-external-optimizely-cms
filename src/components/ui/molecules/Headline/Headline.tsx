import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import clsx from "clsx";
import {
  HeadlineComponentType,
  HeadlineContractContentType,
} from "@/components/cms/contracts/component-contracts/headline.model";
import { OptionalOptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";

export interface HeadlineStyleProps {
  textAlignment?: TextAlignment;
}
export interface HeadlineProps
  extends
  OptionalOptiComponentProps<HeadlineContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  HeadlineStyleProps { }

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export function parseHeadlineSize({
  content,
}: OptionalOptiComponentProps<HeadlineContractContentType>) {
  const headlineSize = parseInt(content?.headlineLevel ?? "") as
    1 | 2 | 3 | 4 | 5 | 6 | undefined;
  return headlineSize;
}

export const Headline = ({
  textAlignment = "Left",
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
    <div
      className={clsx(baseClassName, props.className, "gap-1 flex flex-col")}
      {...props}
    >
      {content.eyebrow && (
        <div>
          <WrappedTextField as="span" field="eyebrow" className="text-label" />
        </div>
      )}
      <div className={clsx()}>
        <WrappedHeadingTextField
          headingSize={parseHeadlineSize({ content })}
          field="headline"
          className={clsx('text-inherit!', {
            "mb-0": !content.description,
          })}
        />

        <WrappedRichTextField field="description" className="text-body-lg" />
      </div>
    </div>
  );
};
