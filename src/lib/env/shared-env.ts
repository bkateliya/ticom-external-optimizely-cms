// If we have "use client" this fails when imported from server, even indirectly
// This way this file can be used from either server or client which more accurately
// reflects the availability of the variables
// "use client";

import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { envToBool } from "./utils";

const RequiredVariables: (keyof typeof SHARED_ENV_VARS)[] = [
  "NEXT_PUBLIC_TICOM_BASE_DOMAIN",
];

/** This is called SHARED_ENV_VARS instead of CLIENT_ENV_VARS because it can be used
 * from either server or client.
 */
export const SHARED_ENV_VARS = {
  NEXT_PUBLIC_TICOM_BASE_DOMAIN: process.env.NEXT_PUBLIC_TICOM_BASE_DOMAIN!,

  /**Whether to allow theme switching */
  NEXT_PUBLIC_ALLOW_THEME_SWITCHING: envToBool(
    process.env.NEXT_PUBLIC_ALLOW_THEME_SWITCHING,
  ),
};

// Define and immediate execute
(function validateEnvVariables() {
  // Skip validating when we are doing a production build
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return;
  }

  const missingKeys = RequiredVariables.filter((key) => !SHARED_ENV_VARS[key]);

  if (missingKeys.length > 0) {
    throw Error(
      `Missing required environment variables: ${JSON.stringify(missingKeys)}`,
    );
  }
})();
