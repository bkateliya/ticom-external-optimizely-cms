
import { ComponentRegistry } from "@/lib/ts/component-props";
import { TabsComponentType } from "./Tabs.model";
import { TabsComponent } from "./Tabs"
import { GeneralTabComponentType } from "./GeneralTab/GeneralTab.model";
import { GeneralTabComponent } from "./GeneralTab/GeneralTab";

export const tabsComponentRegistry: ComponentRegistry = {
  [TabsComponentType.key]: TabsComponent,
  [GeneralTabComponentType.key]: GeneralTabComponent,
};
