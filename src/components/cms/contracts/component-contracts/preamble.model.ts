import { ContractContentType } from "@/lib/ts/opti";
import { CtaListContract } from "./cta-list.model";
import { HeadlineContract, WithHeadlineContract } from "./headline.model";

export const PreambleContracts = [WithHeadlineContract, CtaListContract];

/** For using contracts as component interfaces. */
export type PreambleContractContentType = ContractContentType<
  [typeof WithHeadlineContract, typeof CtaListContract]
>;

export type PreambleDirectHeadlineContractContentType = ContractContentType<
  [typeof HeadlineContract, typeof CtaListContract]
>;
