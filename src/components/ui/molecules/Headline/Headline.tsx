import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
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
  HeadlineStyleProps { }

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
    <div className={clsx(baseClassName, props.className, "gap-2 flex flex-col")} {...props}>
      <WrappedTextField as="span" field="eyebrow" className="text-label mb-2" />

      {/* Grouped so headline and description sit on their own typography
          margins instead of picking up the column's gap. */}
      {(content.headline || content.description) && (
        <div>
          <WrappedHeadingTextField
            headingSize={parseHeadlineSize({ content })}
            field="headline"
            className={clsx({
              "after:content-[''] after:block after:w-24 after:h-px after:mt-6 after:bg-[var(--ti-accent-color,var(--pl-border-color-accent))]":
                redUnderline,
              "after:mx-auto": redUnderline && textAlignment === "Center",
              "mb-0": !content.description,
            })}
          />
          <WrappedRichTextField field="description" className="text-body-lg" />
        </div>
      )}
    </div>
  );
};
