import { OptiComponentProps } from "@/lib/ts/component-props";
import { GeneralTabComponentType } from "./GeneralTab.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";

/**
 * This is only used for previewing a stand alone tab in the CMS
 * This should not be used directly on the site.
 */
export async function GeneralTabComponent({
  content,
}: OptiComponentProps<typeof GeneralTabComponentType>) {
  if (!content) {
    return null;
  }
  return (
    <ti-tab-panel
      tabTitle={content.tabName}
      tabId={content.tabId}>
      {content.tabContent?.map((x, i) => (
        <ExtendedOptimizelyComponent key={i} content={x} />
      ))}
    </ti-tab-panel>
  );
}
