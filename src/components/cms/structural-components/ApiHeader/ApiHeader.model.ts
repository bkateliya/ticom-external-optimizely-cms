import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const ApiHeaderComponentType = contentType({
    key: `${KEY_PREFIX}ApiHeader_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}API Header`,
    baseType: "_component",
    properties: {
        // TODO add fields
    },
});
