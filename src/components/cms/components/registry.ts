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
import { TimedHeroBannerSlideshowComponent } from "./TimedHeroBanner/TimedHeroBannerSlideshow";
import { cardListComponentRegistry } from "./CardList/registry";
import { ColumnGridColumnComponentType, ColumnGridComponentType } from "./ColumnGrid/ColumnGrid.model";
import { ColumnGridComponent } from "./ColumnGrid/ColumnGrid";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";
import { ContentBlockComponent } from "./ContentBlock/ContentBlock";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";
// import {
//   CarouselComponentType,
//   CarouselItemComponentType,
//   CarouselSlideComponentType,
// } from "./Carousel/Carousel.model";
import { ImageComparisonComponentType } from "./ImageComparison/ImageComparison.model";
import { ImageComparisonComponent } from "./ImageComparison/ImageComparison";
// import {
//   ScrollingStoryComponentType,
//   ScrollingStoryItemComponentType,
// } from "./ScrollingStory/ScrollingStory.model";
// import { PortfolioViewerComponentType } from "./PortfolioViewer/PortfolioViewer.model";
import {
  ImageMapComponentType,
  PinComponentType,
} from "./ImageMap/ImageMap.model";
import { ImageMapComponent } from "./ImageMap/ImageMap";


export const componentRegistry: ComponentRegistry = {
  [HeroComponentType.key]: HeroComponent,
  [ContentBlockComponentType.key]: ContentBlockComponent,
  [AccordionComponentType.key]: AccordionComponent,
  [AccordionPanelComponentType.key]: AccordionItem,
  [PromoBlockComponentType.key]: PromoBlockComponent,
  [CodeEmbedComponentType.key]: CodeEmbedComponent,
  [TimedHeroBannerComponentType.key]: TimedHeroBannerComponent,
  [TimedHeroBannerSlideshowComponentType.key]: TimedHeroBannerSlideshowComponent,
  [ColumnGridComponentType.key]: ColumnGridComponent,
  [ColumnGridColumnComponentType.key]: NoPreviewComponent,
  // [CarouselComponentType.key]: NoPreviewComponent,
  // [CarouselItemComponentType.key]: NoPreviewComponent,
  // [CarouselSlideComponentType.key]: NoPreviewComponent,
  [ImageComparisonComponentType.key]: ImageComparisonComponent,
  // [ScrollingStoryComponentType.key]: NoPreviewComponent,
  // [ScrollingStoryItemComponentType.key]: NoPreviewComponent,
  // [PortfolioViewerComponentType.key]: NoPreviewComponent,
  [ImageMapComponentType.key]: ImageMapComponent,
  [PinComponentType.key]: NoPreviewComponent,
  ...cardListComponentRegistry
};
