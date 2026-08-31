import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { BynderImageStubModel } from "@/components/cms/media/graph/BynderStubs";

export const DlpHeaderComponentType = contentType({
    key: `${KEY_PREFIX}DlpHeader_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}Showcase Header`,
    baseType: "_component",
    properties: {
        logo: {
            type: "contentReference",
            allowedTypes: [BynderImageStubModel],
            displayName: "Logo",
            group: PropertyTypes.Content,
        },
        logoAltText: {
            type: "string",
            displayName: "Logo Alt Text",
            group: PropertyTypes.Content,
            isLocalized: true,
        },
    },
});
