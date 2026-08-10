import { getContextData } from "@optimizely/cms-sdk/react/server";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";

/**
 * Renders the shared pre-footer content area (set per page via the
 * CommonPageContract) directly above the site footer. Reads from request
 * context, populated in `populatePageData`, so every page/experience that
 * goes through `SiteFrame` gets it without threading props.
 */
export function PreFooter() {
  const preFooter = getContextData("preFooter");

  if (!preFooter?.length) {
    return null;
  }

  return (
    <>
      {preFooter.map((item, i) => (
        <ExtendedOptimizelyComponent
          key={i}
          content={item}
          parentField="preFooter"
        />
      ))}
    </>
  );
}
