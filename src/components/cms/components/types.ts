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
// import {
//   CarouselComponentType,
//   CarouselItemComponentType,
//   CarouselSlideComponentType,
// } from "./Carousel/Carousel.model";
import { ImageComparisonComponentType } from "./ImageComparison/ImageComparison.model";
// import {
//   ScrollingStoryComponentType,
//   ScrollingStoryItemComponentType,
// } from "./ScrollingStory/ScrollingStory.model";
// import { PortfolioViewerComponentType } from "./PortfolioViewer/PortfolioViewer.model";
import {
  ImageMapComponentType,
  PinComponentType,
} from "./ImageMap/ImageMap.model";

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
  // CarouselComponentType,
  // CarouselItemComponentType,
  // CarouselSlideComponentType,
  ImageComparisonComponentType,
  // ScrollingStoryComponentType,
  // ScrollingStoryItemComponentType,
  // PortfolioViewerComponentType,
  ImageMapComponentType,
  PinComponentType,
  ...cardListComponents
];
