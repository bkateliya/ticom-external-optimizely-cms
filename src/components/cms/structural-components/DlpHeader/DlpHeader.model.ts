import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants.mjs";

export const DlpHeaderComponentType = contentType({
    key: `${KEY_PREFIX}DlpHeader_Component`,
    displayName: `${DISPLAY_NAME_PREFIX}DLP Header`,
    description: "Showcase header for DLP-branded pages only. Requires approval — see Component: Showcase Header on Confluence. Menu items come from Jump Link Target components placed on the page, not from fields here.",
    baseType: "_component",
    properties: {},
});
