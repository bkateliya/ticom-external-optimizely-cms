import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import clsx from "clsx";
import {
  PreambleContractContentType,
  PreambleDirectHeadlineContractContentType,
} from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import {
  normalizeGenericArrayToTyped,
  normalizeGenericContentToTyped,
} from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "@/components/cms/contracts/component-contracts/headline.model";
import { CTAElementType } from "@/components/cms/elements/CTA/CTA.model";
import { CtaList } from "../CtaList/CtaList";
import { Headline, HeadlineStyleProps } from "../Headline/Headline";

export interface PreambleStyleOptions extends HeadlineStyleProps {
  beforeElements?: React.ReactNode;
}

export interface PreambleProps
  extends
  OptiComponentProps<PreambleContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren,
  PreambleStyleOptions { }

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export const Preamble = ({ content, ...props }: PreambleProps) => {
  if (!content) {
    return null;
  }

  const headline = normalizeGenericContentToTyped<typeof HeadlineComponentType>(
    content.headline,
  );
  return (
    <PreambleDirectHeadline
      {...props}
      content={{ ...headline, ctas: content.ctas }}
    />
  );
};

export interface PreambleDirectHeadlineProps
  extends
  OptiComponentProps<PreambleDirectHeadlineContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren,
  PreambleStyleOptions { }

export const PreambleDirectHeadline = ({
  children,
  beforeElements,
  textAlignment = "Left",
  content,
  parentField,
  redUnderline,
}: PreambleDirectHeadlineProps) => {
  if (!content) {
    return null;
  }

  const baseClassName = clsx(
    "flex",
    "flex-column",
    "bg-{var(--component-section-color-bg)}",
    textAlignmentClassMap[textAlignment],
  );

  const hasHeaderContent = !!(
    content.eyebrow ||
    content.headline ||
    content.description
  );

  /* Mirrors CtaList's own check so the wrapper isn't rendered for CTAs it will drop. */
  const hasCtas = normalizeGenericArrayToTyped<typeof CTAElementType>(
    content.ctas,
  ).some((cta) => cta.link?.url.default);

  const sectionContentWrapperClassName = clsx([
    "space-y-4",
    {
      "py-4": hasHeaderContent,
    },
  ]);

  return (
    <div className={baseClassName}>
      <div
        data-component="generic-wrappers/preamble-section-wrapper"
        className={clsx("flex", "flex-col", "w-full", "gap-8")}
      >
        {beforeElements}

        {(hasHeaderContent || hasCtas) && (
          /* The 2/3 cap assumes full section width. A Column Grid column
             removes it (see ColumnGrid) so the header fills the column. */
          <div
            data-preamble-width-cap
            className={clsx("flex", "w-full", "flex-col", "gap-8 md:max-w-2/3", {
              "flex-col mx-auto": textAlignment === "Center",
            })}
          >
            <Headline
              content={content}
              parentField={parentField}
              textAlignment={textAlignment}
              redUnderline={redUnderline}
            />

            <CtaList
              textAlignment={textAlignment}
              content={content}
              parentField={parentField}
            />
          </div>
        )}
        {children && (
          <div className={sectionContentWrapperClassName}>
            {/* Then increment the level if needed, e.g. if component set H3, then we set it to H3 above, 
                and inner components will use H4 */}
            <HeadingLevelContext
              headingLevel={content.headline ? "increment" : "same"}
            >
              {children}
            </HeadingLevelContext>
          </div>
        )}
      </div>
    </div>
  );
};
