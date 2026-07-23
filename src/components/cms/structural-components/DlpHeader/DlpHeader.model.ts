import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const DlpHeaderComponentType = contentType({
    key: `${KEY_PREFIX}DlpHeader_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}DLP Header`,
    baseType: "_component",
    properties: {
        // TODO add fields
    },
});
