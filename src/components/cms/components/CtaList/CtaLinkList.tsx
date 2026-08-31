import { CtaLinkListComponentType } from "@/components/cms/components/CtaList/CtaList.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ButtonGroupOrientation } from "@/components/ui/ti/enums";
import { ClientOnly } from "@/components/utilities/ClientOnly";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { TifButtonGroup } from "@ticom/form-components/react";
import clsx from "clsx";
import { TextAlignment } from "../../../ui/context/TextAlignmentContext";

export interface CtaListProps
  extends
    OptiComponentProps<typeof CtaLinkListComponentType>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  textAlignment?: TextAlignment;
}

export const CtaLinkList = ({
  content,
  className,
  textAlignment = "Left",
}: CtaListProps) => {
  if (!content) {
    return null;
  }

  /* Every allowed type carries `link` from LinkContract, so this cast is only used
     to check whether anything is actually authored. */
  const ctas = normalizeGenericArrayToTyped<typeof CtaLinkElementType>(
    content.ctaLinks,
  );
  const hasCtas = !!ctas?.some((x) => x.link?.url.default);
  if (!hasCtas) {
    return null;
  }
  return (
    // Need to wrap with ClientOnly to prevent hydration mismatch error
    <ClientOnly>
      <TifButtonGroup
        className={clsx(className, { "mx-auto": textAlignment === "Center" })}
        orientation={ButtonGroupOrientation.vertical}
      >
        {/* Resolves each item to its registered component (CTA, CTA Link, …). */}
        {ctas.map((cta, index) => (
          <ExtendedOptimizelyComponent key={cta._id || index} content={cta} />
        ))}
      </TifButtonGroup>
    </ClientOnly>
  );
};
