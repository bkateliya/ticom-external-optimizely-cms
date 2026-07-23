import { ContractContentType } from "@/lib/ts/opti";
import { ExperienceTypeKeys } from "../experiences/keys";
import { PageTypeKeys } from "../pages/keys";
import { GoldenSourcedDataContract } from "./page-contacts/golden-sourced.model";
import { PageContentContract } from "./page-contacts/page-content.model";
import { PageHeroContract } from "./page-contacts/page-hero.model";
import { SEOContract } from "./page-contacts/seo.model";

export const CommonPageContracts = [
  PageContentContract,
  SEOContract,
  PageHeroContract,
  GoldenSourcedDataContract,
];

export type CommonPageContractType = ContractContentType<
  [
    typeof PageContentContract,
    typeof SEOContract,
    typeof PageHeroContract,
    typeof GoldenSourcedDataContract,
  ]
>;

export const AllPageAndExperienceTypeKeys = [
  ...PageTypeKeys,
  ...ExperienceTypeKeys,
];
