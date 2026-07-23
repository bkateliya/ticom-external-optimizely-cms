import { ComponentRegistry } from "@/lib/ts/component-props";
import { ApplicationType } from "./Application.model";
import { ProductFamilyType } from "./ProductFamily.model";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";

export const dataRegistry: ComponentRegistry = {
  [ApplicationType.key]: NoPreviewComponent,
  [ProductFamilyType.key]: NoPreviewComponent,
};
