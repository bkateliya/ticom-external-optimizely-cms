import { contentType, contract } from "@optimizely/cms-sdk";
import {
    DISPLAY_NAME_PREFIX,
    KEY_PREFIX,
} from "@/components/cms/constants.mjs";
import { PropertyTypes } from "@/lib/property-types";
import { ALL_THEME_NAMES } from "@/lib/themes";
import { PreambleContracts } from "./preamble.model";
import { ContractContentType } from "@/lib/ts/opti";
import { HeadlineContract } from "./headline.model";
import { CtaListContract } from "./cta-list.model";

export const BackgroundColorSetting = contentType({
    key: `${KEY_PREFIX}BackgroundColor_Setting`,
    displayName: `${DISPLAY_NAME_PREFIX}Background Color Setting`,
    baseType: "_component",
    properties: {
        theme: {
            type: "string",
            isRequired: true,
            displayName: "Background Theme",
            format: "selectOne",
            group: PropertyTypes.Appearance,
            enum: Object.entries(ALL_THEME_NAMES).map(([key, value]) => ({
                value: key,
                displayName: value
            }))
        },
    },
});


export const BackgroundImageSetting = contentType({
    key: `${KEY_PREFIX}BackgroundImage_Setting`,
    displayName: `${DISPLAY_NAME_PREFIX}Background Image Setting`,
    baseType: "_component",
    properties: {
        backgroundImage: {
            type: "contentReference",
            displayName: "Background Image",
            isRequired: true,
            group: PropertyTypes.Appearance,
            allowedTypes: ["_image"]
        },
        backgroundTheme: {
            type: "string",
            displayName: "Is background image Light or Dark?",
            format: "selectOne",
            group: PropertyTypes.Appearance,
            isRequired: true,
            enum: [{
                value: "light",
                displayName: "Light"
            }, {
                value: "dark",
                displayName: "Dark"
            }]
        },
        noOverlay: {
            type: "boolean",
            displayName: "Hide transparent overlay",
            description: "By default we put either a black or white transparent overlay on top of the image to aid text legibility.  If the image already has sufficient contract, this overlay can be hidden.",
            group: PropertyTypes.Appearance,
        }
    },
});

export const SectionBackgroundContract = contract({
    key: `${KEY_PREFIX}SectionBackground_Contract`,
    displayName: `${DISPLAY_NAME_PREFIX}Section Background Contract`,
    properties: {
        background: {
            type: "content",
            displayName: "Section Background",
            group: PropertyTypes.Appearance,
            allowedTypes: [BackgroundColorSetting, BackgroundImageSetting]
        },
        
        backgroundSize: {
            type: "string",
            displayName: "Background Size",
            format: "selectOne",
            group: PropertyTypes.Appearance,
            enum: [{
                value: "full",
                displayName: "Full Width (default)"
            }, {
                value: "section",
                displayName: "Section Width"
            }]
        }
    }
});

/** For using contracts as component interfaces. */
export type SectionBackgroundContractContentType = ContractContentType<
    [typeof SectionBackgroundContract]
>;

export const SectionContacts = [SectionBackgroundContract, ...PreambleContracts];

/** For using contracts as component interfaces. */
export type SectionContractContentType = ContractContentType<
    [typeof SectionBackgroundContract, typeof HeadlineContract, typeof CtaListContract]
>;
