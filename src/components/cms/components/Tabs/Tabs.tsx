import { ContentTypes } from "@optimizely/cms-sdk";
import { TabsComponentType } from "./Tabs.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeGenericArrayToTyped } from "@/lib/utils/content-type-utils";
import { GeneralTabComponentType } from "./GeneralTab/GeneralTab.model";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import {
  TabContainerAppearance,
  TiTabContainer,
} from "@/components/ui/ti/TiTabContainer/TiTabContainer";

export interface OptiCardComponentProps<
  TContentType extends ContentTypes.AnyContentType,
> extends OptiComponentProps<TContentType> {
  columnCount: number;
}

export async function TabsComponent({
  content,
}: OptiCardComponentProps<typeof TabsComponentType>) {
  if (!content) {
    return null;
  }

  const tabContent = content.tabsContent;
  const tabs = await normalizeGenericArrayToTyped<
    typeof GeneralTabComponentType
  >(content.tabsContent);
  const hasTab = !!tabs?.some((x) => x.tabName);

  if (!tabContent || !hasTab) {
    return null;
  }
  return (
    <TiTabContainer
      allTabShown={content.allTabsShown}
      hashSelection={content.hashSelection}
      autoCollapseMobile={content.autoCollapseMobile}
      appearance={content.tabAppearance as TabContainerAppearance}
      tabs={tabs.map((tab) => ({
        tabId: tab._id ?? "",
        title: tab.tabName ?? "",
        content: tab.tabContent?.map((x, i) => (
          <ExtendedOptimizelyComponent key={i} content={x} />
        )),
      }))}
    ></TiTabContainer>
  );
}
