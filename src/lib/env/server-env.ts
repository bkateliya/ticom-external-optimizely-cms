import { PHASE_PRODUCTION_BUILD } from "next/constants";

const RequiredVariables: (keyof typeof SERVER_ENV_VARS)[] = [
  "OPTIMIZELY_CMS_URL",
  "OPTIMIZELY_GRAPH_GATEWAY",
  "OPTIMIZELY_GRAPH_HOST",
  "OPTIMIZELY_GRAPH_SINGLE_KEY",

  "BRIGHTCOVE_ACCOUNT_ID",
  "BRIGHTCOVE_PLAYER_ID",
];

export const SERVER_ENV_VARS = {
  OPTIMIZELY_CMS_URL: process.env.OPTIMIZELY_CMS_URL!,
  OPTIMIZELY_GRAPH_SINGLE_KEY: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  OPTIMIZELY_GRAPH_GATEWAY: process.env.OPTIMIZELY_GRAPH_GATEWAY!,
  OPTIMIZELY_GRAPH_HOST: (process.env.OPTIMIZELY_GRAPH_HOST ?? "").replace(
    /\/$/,
    "",
  ), // Remove trailing slash

  
  CMS_API_TIMEOUT_MS: parseInt(process.env.CMS_API_TIMEOUT_MS ?? "1000") || 1000,

  CMS_API_DOMAIN: process.env.CMS_API_DOMAIN,
  CMS_API_BEARER_TOKEN: process.env.CMS_API_BEARER_TOKEN,

  WEB_SERVICE_DOMAIN: process.env.WEB_SERVICE_DOMAIN,
  ACCESS_TOKEN_URL: process.env.ACCESS_TOKEN_URL,
  ACCESS_TOKEN_CLIENT_ID: process.env.ACCESS_TOKEN_CLIENT_ID,
  ACCESS_TOKEN_CLIENT_SECRET: process.env.ACCESS_TOKEN_CLIENT_SECRET,

  BRIGHTCOVE_ACCOUNT_ID: process.env.BRIGHTCOVE_ACCOUNT_ID!,
  BRIGHTCOVE_PLAYER_ID: process.env.BRIGHTCOVE_PLAYER_ID!,
};

// Define and immediate execute
(function validateEnvVariables() {
  // Skip validating if we are doing a production build
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return;
  }

  const missingKeys = RequiredVariables.filter((key) => !SERVER_ENV_VARS[key]);

  if (missingKeys.length > 0) {
    throw Error(
      `Missing required environment variables: ${JSON.stringify(missingKeys)}`,
    );
  }

  if (!SERVER_ENV_VARS.CMS_API_DOMAIN && !SERVER_ENV_VARS.WEB_SERVICE_DOMAIN) {
    throw Error(
      "Either CMS_API_DOMAIN or WEB_SERVICE_DOMAIN must be specified along with corresponding auth variables",
    );
  }
  if (SERVER_ENV_VARS.CMS_API_DOMAIN && !SERVER_ENV_VARS.CMS_API_BEARER_TOKEN) {
    throw Error(
      "CMS_API_BEARER_TOKEN must be specified if CMS_API_DOMAIN is present",
    );
  }

  if (
    SERVER_ENV_VARS.WEB_SERVICE_DOMAIN &&
    !(
      SERVER_ENV_VARS.ACCESS_TOKEN_URL &&
      SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_ID &&
      SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_SECRET
    )
  ) {
    throw Error(
      "ACCESS_TOKEN_URL,ACCESS_TOKEN_CLIENT_ID, and ACCESS_TOKEN_CLIENT_SECRET must be specified if WEB_SERVICE_DOMAIN is present",
    );
  }
})();
