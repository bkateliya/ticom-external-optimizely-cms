import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const MainFooterComponentType = contentType({
    key: `${KEY_PREFIX}MainFooter_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}Main Footer`,
    baseType: "_component",
    properties: {
    },
});
