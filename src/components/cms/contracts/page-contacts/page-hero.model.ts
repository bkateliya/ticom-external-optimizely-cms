import { contract } from "@optimizely/cms-sdk";
import { HeroComponentType } from "@/components/cms/components/Hero/Hero.model";
import { HomePageHeroComponentType } from "@/components/cms/components/HomePageHero/HomePageHero.model";
import { KEY_PREFIX, DISPLAY_NAME_PREFIX } from "@/components/cms/constants.mjs";
import { ContractContentType } from "@/lib/ts/opti";

export const PageHeroContract = contract({
    key: `${KEY_PREFIX}PageHero_Contract`,
    displayName: `${DISPLAY_NAME_PREFIX}Generic Experience`,
    properties: {
        hero: {
            type: "content",
            allowedTypes: [HeroComponentType, HomePageHeroComponentType],
            displayName: "Hero Section",
            isLocalized: true,
        },
    },
});


/** For using contracts as component interfaces. */
export type PageHeroContractContentType = ContractContentType<
    [typeof PageHeroContract]
>;
