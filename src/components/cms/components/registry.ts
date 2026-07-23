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
import { HomePageHeroSlideComponent } from "./HomePageHero/HomePageHeroSlide";
import { HomePageHeroComponentType, HomePageHeroSlideComponentType } from "./HomePageHero/HomePageHero.model";
import { HomePageHeroComponent } from "./HomePageHero/HomePageHero";
import { cardListComponentRegistry } from "./CardList/registry";
import { ColumnGridColumnComponentType, ColumnGridComponentType } from "./ColumnGrid/ColumnGrid.model";
import { ColumnGridComponent } from "./ColumnGrid/ColumnGrid";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";
import { ContentBlockComponent } from "./ContentBlock/ContentBlock";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";


export const componentRegistry: ComponentRegistry = {
  [HeroComponentType.key]: HeroComponent,
  [ContentBlockComponentType.key]: ContentBlockComponent,
  [AccordionComponentType.key]: AccordionComponent,
  [AccordionPanelComponentType.key]: AccordionItem,
  [PromoBlockComponentType.key]: PromoBlockComponent,
  [CodeEmbedComponentType.key]: CodeEmbedComponent,
  [HomePageHeroSlideComponentType.key]: HomePageHeroSlideComponent,
  [HomePageHeroComponentType.key]: HomePageHeroComponent,
  [ColumnGridComponentType.key]: ColumnGridComponent,
  [ColumnGridColumnComponentType.key]: NoPreviewComponent,
  ...cardListComponentRegistry
};
