import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";
import { SoftDeleteProperties } from "@/lib/opti/field-model-utils";
import { ContractContentType } from "@/lib/ts/opti";

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
      allowedTypes: [BynderImageStubModel],
      displayName: "Image",
      group: PropertyTypes.Content,
    },
    altText: {
      type: "string",
      displayName: "Alt Text",
      group: PropertyTypes.Content,
      isLocalized: true,
    },
  },
});

/** For using contracts as component interfaces. */
export type ImageBaseContractContentType = ContractContentType<
  [typeof ImageBaseContract]
>;
