import { OptiComponentProps } from "@/lib/ts/component-props";
import { ContentTypes } from "@optimizely/cms-sdk";

export type CardListDisplay =
  "grid" | "grid-hover" | "carousel" | "carousel-below" | "vertical";

export type CardListFields = "image" | "eyebrow" | "description" | "cta";
export type CardStyles = "white" | "dark";

export interface CardDisplayConfig {
  hoverCard?: boolean;
  hiddenFields?: CardListFields[];
  cardStyle?: CardStyles;
}
export interface OptiCardComponentProps<
  TContentType extends ContentTypes.AnyContentType,
>
  extends OptiComponentProps<TContentType>, CardDisplayConfig {}
