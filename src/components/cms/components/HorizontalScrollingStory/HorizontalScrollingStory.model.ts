import { contentType } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { AllComponentTypeKeyMap } from "../keys";
import { PropertyTypes } from "@/lib/property-types";
import { AllowIn } from "@/components/cms/contracts/component-contracts/allow-in.model";
import { ImageBaseContract } from "@/components/cms/contracts/component-contracts/image.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";

export const ScrollingStoryHorizontalContentComponentType = contentType({
    key: AllComponentTypeKeyMap.ScrollingStoryHorizontalContentComponent,
    displayName: `${DISPLAY_NAME_PREFIX}Horizontal Scrolling Story Content`,
    baseType: "_component",
    extends: [ImageBaseContract],
    properties: {
        highlight: {
            type: "string",
            format: "shortString",
            displayName: "Story Highlight",
            maxLength: 20,
            group: PropertyTypes.Content,
            isLocalized: true,
        },
        headline: {
            type: "string",
            format: "shortString",
            displayName: "Story Headline",
            maxLength: 70,
            group: PropertyTypes.Content,
            isRequired: true,
            isLocalized: true,
        },
        description: {
            type: "richText",
            editorSettings: { preset: "minimal" },
            displayName: "Story Description",
            group: PropertyTypes.Content,
            isRequired: true,
            isLocalized: true,
        },
        ctaLinks: {
            type: "array",
            displayName: "Story CTA",
            group: PropertyTypes.Content,
            maxItems: 2,
            items: {
                type: "content",
                allowedTypes: [CtaLinkElementType],
            },
        },
    },
});

export const ScrollingStoryHorizontalComponentType = contentType({
    key: AllComponentTypeKeyMap.ScrollingStoryHorizontalComponent,
    displayName: `${DISPLAY_NAME_PREFIX}Horizontal Scrolling Story`,
    baseType: "_component",
    extends: [AllowIn.Section],
    properties: {
        eyebrow: {
            type: "string",
            format: "shortString",
            displayName: "Eyebrow",
            maxLength: 150,
            group: PropertyTypes.Content,
            isLocalized: true,
        },
        headline: {
            type: "string",
            format: "shortString",
            displayName: "Headline",
            maxLength: 150,
            group: PropertyTypes.Content,
            isLocalized: true,
        },
        imagePlacement: {
            type: "string",
            format: "selectOne",
            displayName: "Image Placement",
            group: PropertyTypes.Appearance,
            isRequired: true,
            enum: [
                { value: "right", displayName: "Image on Right (default)" },
                { value: "left", displayName: "Image on Left" },
            ],
        },
        stories: {
            displayName: "Stories",
            group: PropertyTypes.Content,
            type: "array",
            minItems: 2,
            maxItems: 10,
            items: {
                type: "content",
                allowedTypes: [ScrollingStoryHorizontalContentComponentType],
            },
        },
    },
});