import { contentType } from "@optimizely/cms-sdk";
import {
    DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const VideoSeriesPageType = contentType({
    key: PageTypeKeyMap.VideoSeriesPageTypeKey,
    displayName: `${DISPLAY_NAME_PREFIX}Video Series Page`,
    baseType: "_page",
    extends: CommonPageContracts,
    properties: {
    },
});
