import { ComponentRegistry } from "@/lib/ts/component-props";
import { GeneralSectionComponentType } from "./GeneralSection/GeneralSection.model";
import { GeneralSectionComponent } from "./GeneralSection/GeneralSection";

export const sectionRegistry: ComponentRegistry = {
  [GeneralSectionComponentType.key]: GeneralSectionComponent,
};