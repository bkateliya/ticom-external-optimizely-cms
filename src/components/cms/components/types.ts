import { HeroComponentType } from "./Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";


import { PromoBlockComponentType } from "./PromoBlock/PromoBlock.model";
import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { TimedHeroBannerSlideshowComponentType, TimedHeroBannerComponentType } from "./TimedHeroBanner/TimedHeroBanner.model";
import { cardListComponents } from "./CardList/types";

export const componentTypes = [
  HeroComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  PromoBlockComponentType,
  CodeEmbedComponentType,
  TimedHeroBannerComponentType,
  TimedHeroBannerSlideshowComponentType,
  ...cardListComponents
];
