import { ContractContentType } from "@/lib/ts/opti";
import { CtaListContract } from "./cta-list.model";
import { WithHeadlineContract } from "./headline.model";

export const PreambleContracts = [WithHeadlineContract, CtaListContract];

/** For using contracts as component interfaces. */
export type PreambleContractContentType = ContractContentType<
  [typeof WithHeadlineContract, typeof CtaListContract]
>;
