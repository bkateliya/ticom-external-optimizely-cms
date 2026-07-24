// instrumentation.js
// import { NodeSDK } from "@opentelemetry/sdk-node";
// import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
// import { ConsoleMetricExporter, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

// const sdk = new NodeSDK({
//   traceExporter: new ConsoleSpanExporter(),
//   //   metricReader: new PeriodicExportingMetricReader({
//   //     exporter: new ConsoleMetricExporter(),
//   //   }),
// });

// sdk.start();

// if (process.env.NODE_ENV === "development") {
//   const originalFetch = global.fetch;

//   global.fetch = async (input, init) => {
//     const url =
//       typeof input === "string"
//         ? input
//         : input instanceof URL
//           ? input.href
//           : input.url;

//     if (url.includes("cg.optimizely.com") && init?.body) {
//       try {
//         const body = JSON.parse(init.body as string);
//         console.log("[Graph Query]", url);
//         console.log(body.query);
//         if (body.variables) console.log("Variables:", body.variables);
//       } catch {}
//     }

//     return originalFetch(input, init);
//   };
// }
