import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "@/components/cms/components/keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "../../contracts/component-contracts/allow-in.model";

export const RecentVideoCardListComponentType = contentType({
  key: AllComponentTypeKeyMap.RecentVideoCardListComponent,
  displayName: `${DISPLAY_NAME_PREFIX}Recent Video Card List`,
  baseType: "_component",
  compositionBehaviors: ["sectionEnabled"],
  extends:[AllowIn.Main],
  properties: {
    backgroundStyle: {
      type: "string",
      displayName: "Background Style",
      format: "selectOne",
      group: PropertyTypes.Appearance,
      isRequired: true,
      enum: [
        { value: "white", displayName: "White (Default)" },
        { value: "grey", displayName: "Grey" },
      ],
    },
  },
});
