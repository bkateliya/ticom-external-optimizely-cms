import { ViewMoreComponentType } from "./ViewMore.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiViewMore } from "@/components/ui/ti/TiViewMore/TiViewMore";

export function ViewMoreComponent({
  content,
}: OptiComponentProps<typeof ViewMoreComponentType>) {
  if (!content?.content?.length) {
    return null;
  }

  const expandLabel = content.expandActionLabel ?? undefined;
  const collapseLabel = content.collapseActionLabel ?? undefined;

  // Collapsed height is fixed at 0 ("item mode"): the whole group hides behind
  // the control, matching the live site's collapsed-height="0". Aria labels
  // mirror the action labels, as they do on www.ti.com.
  return (
    <TiViewMore
      collapsedHeight={0}
      expandActionLabel={expandLabel}
      collapseActionLabel={collapseLabel}
      expandAriaLabel={expandLabel}
      collapseAriaLabel={collapseLabel}
    >
      {content.content.map((x, i) => (
        <ExtendedOptimizelyComponent key={i} content={x} />
      ))}
    </TiViewMore>
  );
}
