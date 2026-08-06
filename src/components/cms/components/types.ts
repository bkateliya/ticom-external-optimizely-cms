import { HeroComponentType } from "./Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";

import { PromoBlockComponentType } from "./PromoBlock/PromoBlock.model";
import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { CodeSnippetComponentType } from "./CodeSnippet/CodeSnippet.model";
import {
  HomePageHeroComponentType,
  HomePageHeroSlideComponentType,
} from "./HomePageHero/HomePageHero.model";
import { cardListComponents } from "./CardList/types";

import {
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
} from "./ColumnGrid/ColumnGrid.model";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";
import { applicationListingComponents } from "./application-components/types";
import { imageComponentTypes } from "./Image/types";
import { PremiumMediaHeadingType } from "./PremiumMediaHeading/PremiumMediaHeading.model";
import {HorizontalRuleComponentType} from "./HorizontalRule/HorizontalRule.model";

import {SelectionToolComponentType} from "./SelectionTool/SelectionTool.model";

export const allComponentTypes = [
  HeroComponentType,
  ContentBlockComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  PromoBlockComponentType,
  CodeEmbedComponentType,
  CodeSnippetComponentType,
  HomePageHeroSlideComponentType,
  HomePageHeroComponentType,
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
  ...cardListComponents,
  ...applicationListingComponents,
  ...imageComponentTypes,
  PremiumMediaHeadingType,
  HorizontalRuleComponentType,

  SelectionToolComponentType,
];
