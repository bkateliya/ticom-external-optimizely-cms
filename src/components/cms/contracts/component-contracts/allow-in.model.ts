import { contract } from "@optimizely/cms-sdk";
import { DISPLAY_NAME_PREFIX, KEY_PREFIX } from "@/components/cms/constants";
import { ContractFlagProperties } from "@/lib/opti/field-model-utils";

// When adding a new contract, also add to AllowIn object below for easier discoverability

export const ALLOW_IN_CONTRACT_KEY_PREFIX = `${KEY_PREFIX}AllowIn`;

export const AllowInSectionContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}Section_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Section Contract`,
  properties: {
    metaAllowInSection: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInColumnContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}Column_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Column Contract`,
  properties: {
    metaAllowInColumn: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInTabContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}Tab_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Tab Contract`,
  properties: {
    metaAllowInTab: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInAccordionContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}Accordion_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Accordion Contract`,
  properties: {
    metaAllowInAccordion: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInPageHeaderContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}PageHeader_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Page Header Contract`,
  properties: {
    metaAllowInPageHeader: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInHomePageHeaderContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}HomePageHeader_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Home Page Header Contract`,
  properties: {
    metaAllowInHomePageHeader: {
      ...ContractFlagProperties,
    },
  },
});

export const AllowInPrefooterContract = contract({
  key: `${ALLOW_IN_CONTRACT_KEY_PREFIX}Prefooter_Contract`,
  displayName: `${DISPLAY_NAME_PREFIX}Allow In Prefooter Contract`,
  properties: {
    metaAllowInPrefooter: {
      ...ContractFlagProperties,
    },
  },
});

/**
 * Helper for easier discoverabilty
 */
export const AllowIn = {
  Section: AllowInSectionContract,
  Column: AllowInColumnContract,
  Tab: AllowInTabContract,
  Accordion: AllowInAccordionContract,

  HomePageHeader: AllowInHomePageHeaderContract,
  PageHeader: AllowInPageHeaderContract,
  Prefooter: AllowInPrefooterContract,

  Groupings: {
    Common: [
      AllowInSectionContract,
      AllowInColumnContract,
      AllowInTabContract,
      AllowInAccordionContract,
    ],
    NonColumn: [
      AllowInSectionContract,
      AllowInTabContract,
      AllowInAccordionContract,
    ],
    NonAccordion: [
      AllowInSectionContract,
      AllowInTabContract,
      AllowInColumnContract,
    ],
  },
};
