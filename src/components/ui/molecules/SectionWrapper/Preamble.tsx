import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import clsx from "clsx";
import {
  PreambleContractContentType,
  PreambleDirectHeadlineContractContentType,
} from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptionalOptiComponentProps } from "@/lib/ts/component-props";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "@/components/cms/contracts/component-contracts/headline.model";
import { Headline, HeadlineStyleProps } from "../Headline/Headline";
import { ExtendedOptimizelyComponent } from "../../cms/ExtendedOptimizelyComponent";
import { getValidCtas } from "@/components/cms/components/CtaList/CtaList.utils";

export interface PreambleStyleOptions extends HeadlineStyleProps {
  beforeElements?: React.ReactNode;
}

export interface PreambleProps
  extends
    OptionalOptiComponentProps<PreambleContractContentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    React.PropsWithChildren,
    PreambleStyleOptions {}

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

  if (!headline) {
    return null;
  }

  return (
    <PreambleDirectHeadline
      {...props}
      content={{ ...headline, ctasList: content.ctasList, ctas: content.ctas }}
    />
  );
};

export interface PreambleDirectHeadlineProps
  extends
    OptionalOptiComponentProps<PreambleDirectHeadlineContractContentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    React.PropsWithChildren,
    PreambleStyleOptions {}

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
  );

  const hasHeaderContent = !!(
    content.eyebrow ||
    content.headline ||
    content.description
  );

  const hasCtas = getValidCtas(content).length > 0;

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
          <div
            data-preamble-width-cap
            className={clsx(
              "flex",
              "w-full",
              "flex-col",
              "gap-8 md:max-w-2/3",

              textAlignmentClassMap[textAlignment],
              {
                "flex-col mx-auto": textAlignment === "Center",
              },
            )}
          >
            <Headline
              content={content}
              parentField={parentField}
              textAlignment={textAlignment}
              redUnderline={redUnderline}
            />

            <ExtendedOptimizelyComponent content={content.ctasList} />
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
