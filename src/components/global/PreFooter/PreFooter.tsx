import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { CommonPageContractType } from "@/components/cms/contracts/common";
import { OptiComponentProps } from "@/lib/ts/component-props";

/**
 * Renders the shared pre-footer content area (set per page via the
 * CommonPageContract) directly above the site footer. Reads from request
 * context, populated in `populatePageData`, so every page/experience that
 * goes through `SiteFrame` gets it without threading props.
 */
export function PreFooter({
  content,
}: OptiComponentProps<CommonPageContractType>) {
  if (!content?.preFooter?.length) {
    return null;
  }

  return (
    <>
      {content.preFooter.map((item, i) => (
        <ExtendedOptimizelyComponent
          key={i}
          content={item}
          parentField="preFooter"
        />
      ))}
    </>
  );
}
