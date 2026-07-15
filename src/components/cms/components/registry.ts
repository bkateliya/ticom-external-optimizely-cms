import { HeroComponent } from "./Hero/Hero";
import { HeroComponentType } from "./Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";

import { AccordionComponent } from "./Accordion/Accordion";
import { AccordionItem } from "./Accordion/AccordionItem";

import { ComponentRegistry } from "@/lib/ts/component-props";
import { PromoBlockComponentType } from "./PromoBlock/PromoBlock.model";
import { PromoBlockComponent } from "./PromoBlock/index";
import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { CodeEmbedComponent } from "./CodeEmbed";
import { TimedHeroBannerComponent } from "./TimedHeroBanner/TimedHeroBanner";
import { TimedHeroBannerSlideshowComponentType, TimedHeroBannerComponentType } from "./TimedHeroBanner/TimedHeroBanner.model";
import { TimedHeroBannerCarouselComponent } from "./TimedHeroBanner/TimedHeroBannerCarousel";
import { cardListComponentRegistry } from "./CardList/registry";


export const componentRegistry: ComponentRegistry = {
  [HeroComponentType.key]: HeroComponent,
  [AccordionComponentType.key]: AccordionComponent,
  [AccordionPanelComponentType.key]: AccordionItem,
  [PromoBlockComponentType.key]: PromoBlockComponent,
  [CodeEmbedComponentType.key]: CodeEmbedComponent,
  [TimedHeroBannerComponentType.key]: TimedHeroBannerComponent,
  [TimedHeroBannerSlideshowComponentType.key]: TimedHeroBannerCarouselComponent,
  ...cardListComponentRegistry
};
