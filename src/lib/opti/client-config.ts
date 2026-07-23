import { config } from "@optimizely/cms-sdk";

config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY,
  host: process.env.OPTIMIZELY_GRAPH_HOST!.replace(/\/$/, ""), // Remove trailing slash
  // cache: false
});