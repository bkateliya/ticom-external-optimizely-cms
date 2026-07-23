import { contentType } from "@optimizely/cms-sdk";
import {
    DISPLAY_NAME_PREFIX,
} from "@/components/cms/constants.mjs";
import { PageTypeKeyMap } from "../keys";
import { CommonPageContracts } from "@/components/cms/contracts/common";

export const FaqPortalPageType = contentType({
    key: PageTypeKeyMap.FaqPortalPageTypeKey,
    displayName: `${DISPLAY_NAME_PREFIX}FAQ Portal Page`,
    baseType: "_page",
    extends: CommonPageContracts,
    properties: {
    },
});
