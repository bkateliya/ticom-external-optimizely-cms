import { config } from "@optimizely/cms-sdk";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { SERVER_ENV_VARS } from "../env/server-env";

// Don't try to set up graph client if we are doing a production build
if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
  config({
    apiKey: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_SINGLE_KEY!,
    graphUrl: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_GATEWAY,
    host: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_HOST,
    // cache: false
  });
}
