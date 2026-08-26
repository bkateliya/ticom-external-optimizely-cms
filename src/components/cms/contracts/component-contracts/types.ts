// import { DeprecatedCtaListComponentType } from "./cta-list.model";
import { HeadlineComponentType } from "./headline.model";
import {
  BackgroundColorSetting,
  BackgroundImageSetting,
  BackgroundVideoSetting,
} from "./section.model";

// These are techinically components but they are only used from within contracts not standalone
export const contractComponentTypes = [
  // DeprecatedCtaListComponentType,
  HeadlineComponentType,
  BackgroundColorSetting,
  BackgroundImageSetting,
  BackgroundVideoSetting,
];