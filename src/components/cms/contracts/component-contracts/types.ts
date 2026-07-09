import { CtaListComponentType } from "./cta-list.model";
import { HeadlineComponentType } from "./headline.model";
import { BackgroundColorSetting, BackgroundImageSetting } from "./section.model";

// These are techinically components but they are only used from within contracts not standalone
export const contractComponentTypes = [
  CtaListComponentType,
  HeadlineComponentType,
  BackgroundColorSetting,
  BackgroundImageSetting,
];
