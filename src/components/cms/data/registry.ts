import { ComponentRegistry } from "@/lib/ts/component-props";
import { ApplicationType } from "./Application.model";
import { ProductFamilyType } from "./ProductFamily.model";
import { DestinationTypeType } from "./DestinationType.model";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";
import { TaxonomyType } from "./Taxonomy.model";

export const dataRegistry: ComponentRegistry = {
  [ApplicationType.key]: NoPreviewComponent,
  [ProductFamilyType.key]: NoPreviewComponent,
  [DestinationTypeType.key]: NoPreviewComponent,
  [TaxonomyType.key]: NoPreviewComponent,
};
