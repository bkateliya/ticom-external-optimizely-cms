import { OptiComponentProps } from "@/lib/ts/component-props";
import { CTAElement } from "@/components/cms/elements/CTA";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { CTAElementType } from "@/components/cms/elements/CTA/CTA.model";
import { CtaListComponentType } from "@/components/cms/contracts/component-contracts/cta-list.model";
import { TifButtonGroup } from "@ticom/form-components/react";
import { TextAlignment } from "../../context/TextAlignmentContext";
import clsx from "clsx";

export interface CtaListProps
  extends
    OptiComponentProps<typeof CtaListComponentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  textAlignment?: TextAlignment;
}

export const CtaList = ({
  content,
  className,
  textAlignment = "Left",
}: CtaListProps) => {
  if (!content) {
    return null;
  }

  const ctas = normalizeGenericArrayToTyped<typeof CTAElementType>(
    content.ctas,
  );
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);
  if (!hasCtas) {
    return null;
  }
  return (
    <TifButtonGroup
      className={clsx(className, { "mx-auto": textAlignment === "Center" })}
    >
      {ctas.map((cta, index) => (
        <CTAElement key={cta._id || index} content={cta} />
      ))}
    </TifButtonGroup>
  );
};
