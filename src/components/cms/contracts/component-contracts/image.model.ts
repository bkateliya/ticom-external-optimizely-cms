import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";

export const ImageBaseContract = contract({
  key: `${KEY_PREFIX}ImageBase_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Image Base Contract`,
  properties: {
    image: {
      type: "contentReference",
      allowedTypes: ["_image"],
      displayName: "Image",
      ...SoftDeleteProperties,
    },

    bynderImage: {
      type: "contentReference",
      // contentType: BynderImageStubModel,
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      group: "Content",
    },
    altText: {
      type: "string",
      displayName: "Alt Text",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});
