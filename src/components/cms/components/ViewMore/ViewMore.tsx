import { ViewMoreComponentType } from "./ViewMore.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { TiViewMore } from "@/components/ui/ti/TiViewMore/TiViewMore";

export function ViewMoreComponent({
  content,
}: OptiComponentProps<typeof ViewMoreComponentType>) {
  if (!content) {
    return null;
  }

  return (
    <TiViewMore
      collapsedHeight={0}
      expandActionLabel={content.expandActionLabel ?? undefined}
      collapseActionLabel={content.collapseActionLabel ?? undefined}
    >
      {content.content?.map((x, i) => (
        <ExtendedOptimizelyComponent key={i} content={x} />
      ))}
    </TiViewMore>
  );
}
