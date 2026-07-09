import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const ApplicationReferenceContract = contract({
    key: `${KEY_PREFIX}ApplicationReference_Contract`,
    displayName: `${DISPLAY_NAME_PREFIX}Application Reference Contract`,
    properties: {
        applicationId: {
            type: "string",
            displayName: "Application ID",
            maxLength: 100,
            isRequired: false,
            group: PropertyTypes.Data,
            indexingType: 'queryable',
            isLocalized: false,
        },
    },
});
