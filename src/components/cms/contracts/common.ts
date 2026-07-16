import { ExperienceTypeKeys } from "../experiences/keys";
import { PageTypeKeys } from "../pages/keys";
import { PageContentContract } from "./page-contacts/page-content.model";
import { PageHeroContract } from "./page-contacts/page-hero.model";
import { SEOContract } from "./page-contacts/seo.model";

export const CommonPageContracts = [PageContentContract, SEOContract, PageHeroContract];

export const AllPageAndExperienceTypeKeys = [...PageTypeKeys, ...ExperienceTypeKeys]