import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";
import { BynderDocumentStubModel } from "../../media/graph/BynderStubs";

export const ApiSwaggerComponentType = contentType({
  key: AllComponentTypeKeyMap.ApiSwaggerComponent,
  displayName: `${DISPLAY_NAME_PREFIX}API Swagger`,
  baseType: "_component",
  extends: [AllowIn.Main],
  properties: {
    yamlFile: {
      type: "contentReference",
      allowedTypes: [BynderDocumentStubModel],
      displayName: "YAML File",
      group: PropertyTypes.Content,
    },
  },
});
