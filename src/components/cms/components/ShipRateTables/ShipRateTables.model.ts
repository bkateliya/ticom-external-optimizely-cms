import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants";
import { AllComponentTypeKeyMap } from "../keys";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const ShipRateTablesComponentType = contentType({
  key: AllComponentTypeKeyMap.ShipRateTablesComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Ship Rate Tables`,
  baseType: "_component",
  extends: [AllowIn.Section]
});
