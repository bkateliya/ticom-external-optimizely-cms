import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { PropertyTypes } from "@/lib/property-types";

export const FamilyReferenceContract = contract({
    key: `${KEY_PREFIX}FamilyReference_Contract`,
    displayName: `${DISPLAY_NAME_PREFIX}Family Reference Contract`,
    properties: {
        familyId: {
            type: "string",
            displayName: "Family ID",
            maxLength: 100,
            isRequired: false,
            group: PropertyTypes.Data,
            indexingType: 'queryable',
            isLocalized: false,
        },
    },
});
