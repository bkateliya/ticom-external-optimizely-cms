import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const MainHeaderComponentType = contentType({
    key: `${KEY_PREFIX}MainHeader_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}Ti.com Header`,
    baseType: "_component",
    properties: {
    },
});
