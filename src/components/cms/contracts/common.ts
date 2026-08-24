import { ContractContentType } from "@/lib/ts/opti";
import { ExperienceTypeKeys } from "../experiences/keys";
import { PageTypeKeys } from "../pages/keys";
import { GoldenSourcedDataContract } from "./page-contacts/golden-sourced.model";
import { PageContentContract } from "./page-contacts/page-content.model";
import { PreFooterContract } from "./page-contacts/prefooter.model";
import { SEOContract } from "./page-contacts/seo.model";

export const CommonPageContracts = [
  PageContentContract,
  SEOContract,
  GoldenSourcedDataContract,
  PreFooterContract,
];

export type CommonPageContractType = ContractContentType<
  [
    typeof PageContentContract,
    typeof SEOContract,
    typeof GoldenSourcedDataContract,
    typeof PreFooterContract,
  ]
>;

export const AllPageAndExperienceTypeKeys = [
  ...PageTypeKeys,
  ...ExperienceTypeKeys,
];
