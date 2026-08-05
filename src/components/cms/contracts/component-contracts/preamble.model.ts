import { ContractContentType } from "@/lib/ts/opti";
import { CtaListContract, DeprecatedCtaListContract } from "./cta-list.model";
import { HeadlineContract, WithHeadlineContract } from "./headline.model";

export const PreambleContracts = [WithHeadlineContract, DeprecatedCtaListContract];

/** For using contracts as component interfaces. */
export type PreambleContractContentType = ContractContentType<
  [typeof WithHeadlineContract, typeof DeprecatedCtaListContract, typeof CtaListContract]
>;

export type PreambleDirectHeadlineContractContentType = ContractContentType<
  [typeof HeadlineContract, typeof DeprecatedCtaListContract, typeof CtaListContract]
>;
