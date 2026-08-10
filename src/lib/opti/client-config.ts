import { config } from "@optimizely/cms-sdk";
import { SERVER_ENV_VARS } from "../env/server-env";

config({
  apiKey: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_GATEWAY,
  host: SERVER_ENV_VARS.OPTIMIZELY_GRAPH_HOST,
  // cache: false
});
