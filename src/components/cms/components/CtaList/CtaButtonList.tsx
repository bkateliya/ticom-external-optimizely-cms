import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CtaButtonElementType } from "@/components/cms/elements/CTAButton/CTAButton.model";
import { TifButtonGroup } from "@ticom/form-components/react";
import { TextAlignment } from "../../../ui/context/TextAlignmentContext";
import clsx from "clsx";
import { CtaButtonListComponentType } from "@/components/cms/components/CtaList/CtaList.model";

export interface CtaListProps
  extends
    OptiComponentProps<typeof CtaButtonListComponentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  textAlignment?: TextAlignment;
}

export const CtaButtonList = ({
  content,
  className,
  textAlignment = "Left",
}: CtaListProps) => {
  if (!content) {
    return null;
  }

  /* Every allowed type carries `link` from LinkContract, so this cast is only used
     to check whether anything is actually authored. */
  const ctas = normalizeGenericArrayToTyped<typeof CtaButtonElementType>(content.ctaButtons);
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);
  if (!hasCtas) {
    return null;
  }
  return (
    <TifButtonGroup
      className={clsx(className, { "mx-auto": textAlignment === "Center" })}
    >
      {/* Resolves each item to its registered component (CTA, CTA Link, …). */}
      {ctas.map((cta, index) => (
        <ExtendedOptimizelyComponent key={cta._id || index} content={cta} />
      ))}
    </TifButtonGroup>
  );
};
