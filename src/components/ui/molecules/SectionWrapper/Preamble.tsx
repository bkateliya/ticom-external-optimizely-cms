import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import clsx from "clsx";
import { PreambleContractContentType, PreambleDirectHeadlineContractContentType } from "@/components/cms/contracts/component-contracts/preamble.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { HeadlineComponentType } from "@/components/cms/contracts/component-contracts/headline.model";
import { CtaList } from "../CtaList/CtaList";
import { Headline, parseHeadlineLevel } from "../Headline/Headline";

export interface PreambleProps
  extends
  OptiComponentProps<PreambleContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren {
  beforeElements?: React.ReactNode,
  textAlignment?: TextAlignment;
}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export const Preamble = ({
  content,
  ...props
}: PreambleProps) => {
  if (!content) {
    return null;
  }

  const headline = normalizeGenericContentToTyped<typeof HeadlineComponentType>(content.headline);
  return <PreambleDirectHeadline {...props} content={{ ...headline, ctas: content.ctas }} />
};


export interface PreambleDirectHeadlineProps
  extends
  OptiComponentProps<PreambleDirectHeadlineContractContentType>,
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren {
  beforeElements?: React.ReactNode,
  textAlignment?: TextAlignment;
}

export const PreambleDirectHeadline = ({
  children,
  beforeElements,
  textAlignment = "Left",
  content,
  parentField,
}: PreambleDirectHeadlineProps) => {
  if (!content) {
    return null;
  }

  const baseClassName = clsx(
    "flex",
    "flex-column",
    "bg-{var(--component-section-color-bg)}",
    "p-4",
    textAlignmentClassMap[textAlignment],
  );

  const hasHeaderContent = !!(
    content.eyebrow ||
    content.headline ||
    content.subheadline ||
    content.description
  );

  const sectionContentWrapperClassName = clsx([
    'space-y-4',
    {
      'py-4': hasHeaderContent
    }
  ]);

  return (
    <div className={baseClassName}>
      <div
        data-component="generic-wrappers/preamble-section-wrapper"
        className={clsx("flex", "flex-col", "w-full")}
      >
        {beforeElements}
        {/* First update level before rendering headline */}
        <HeadingLevelContext headingLevel={parseHeadlineLevel({ content: content })}>

          <Headline content={content} parentField={parentField} />

          <CtaList content={content} parentField={parentField} />

          {children && <div className={sectionContentWrapperClassName}>
            {/* Then increment the level if needed, e.g. if component set H3, then we set it to H3 above, 
                and inner components will use H4 */}
            <HeadingLevelContext headingLevel={content.headline ? 'increment' : 'same'}>
              {children}
            </HeadingLevelContext>
          </div>}
        </HeadingLevelContext>
      </div>
    </div>
  );
};
