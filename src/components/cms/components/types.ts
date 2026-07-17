import { HeroComponentType } from "./Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";

import { PromoBlockComponentType } from "./PromoBlock/PromoBlock.model";
import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { TimedHeroBannerSlideshowComponentType, TimedHeroBannerComponentType } from "./TimedHeroBanner/TimedHeroBanner.model";
import { cardListComponents } from "./CardList/types";

import { ColumnGridColumnComponentType, ColumnGridComponentType } from "./ColumnGrid/ColumnGrid.model";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";

export const allComponentTypes = [
  HeroComponentType,
  ContentBlockComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  PromoBlockComponentType,
  CodeEmbedComponentType,
  TimedHeroBannerComponentType,
  TimedHeroBannerSlideshowComponentType,
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
  ...cardListComponents
];
