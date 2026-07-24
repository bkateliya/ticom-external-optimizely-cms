import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const DlpFooterComponentType = contentType({
    key: `${KEY_PREFIX}DlpFooter_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}DLP Footer`,
    baseType: "_component",
    properties: {
        // TODO add fields
    },
});
