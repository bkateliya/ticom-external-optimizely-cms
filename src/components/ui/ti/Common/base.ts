import { CustomEventHandler } from "./events";

export interface TiMetricsActionEventDetail {
  elementName: string;
  eventAction: string;
  eventLabel: string;
  eventName: string;
  /** Fill this out when we know the type */
  gaMapping: unknown;
}
export interface TiComponentPropsBase {
  tiMetricsAction?: CustomEventHandler<TiMetricsActionEventDetail>;
}
