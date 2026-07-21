
import { KEY_PREFIX } from "../constants";

// This is in separate file to avoid circular reference when pushing types
// Otherwise there's a confusing error about object is not iterable when doing an Opti push

export const AllComponentTypeKeyMap = {
  HeroComponent: `${KEY_PREFIX}Hero_Component`,
  ContentBlockComponent: `${KEY_PREFIX}ContentBlock_Component`,
  AccordionComponent: `${KEY_PREFIX}Accordion_Component`,
  AccordionPanelComponent: `${KEY_PREFIX}AccordionPanel_Component`,
  CardListComponent: `${KEY_PREFIX}CardList_Component`,
  SingleGeneralCardComponent: `${KEY_PREFIX}GeneralCard_Component`,
  GeneralCardsComponent: `${KEY_PREFIX}GeneralCards_Component`,
  ProductCardsComponent: `${KEY_PREFIX}ProductCards_Component`,
  PromoBlockComponent: `${KEY_PREFIX}PromoBlock_Component`,
  CodeEmbedComponent: `${KEY_PREFIX}CodeEmbed_Component`,
  TimedHeroBannerComponent: `${KEY_PREFIX}TimedHeroBanner_Component`,
  TimedHeroBannerSlideshowComponent: `${KEY_PREFIX}TimedHeroBannerCarousel_Component`,
  ColumnGridColumnComponent: `${KEY_PREFIX}ColumnGridColumn_Component`,
  ColumnGridComponent: `${KEY_PREFIX}ColumnGrid_Component`,
  // CarouselComponent: `${KEY_PREFIX}Carousel_Component`,
  // CarouselItemComponent: `${KEY_PREFIX}CarouselItem_Component`,
  // CarouselSlideComponent: `${KEY_PREFIX}CarouselSlide_Component`,
  ImageComparisonComponent: `${KEY_PREFIX}ImageComparison_Component`,
  // ScrollingStoryComponent: `${KEY_PREFIX}ScrollingStory_Component`,
  // ScrollingStoryItemComponent: `${KEY_PREFIX}ScrollingStoryItem_Component`,
  // PortfolioViewerComponent: `${KEY_PREFIX}PortfolioViewer_Component`,
  ImageMapComponent: `${KEY_PREFIX}ImageMap_Component`,
  PinComponent: `${KEY_PREFIX}Pin_Component`,
};

/**
 * Keys for components that can be used directly in a Section or a Column
 */
export const StandaloneComponentTypeKeys = [
  AllComponentTypeKeyMap.AccordionComponent,
  AllComponentTypeKeyMap.ContentBlockComponent,
  AllComponentTypeKeyMap.PromoBlockComponent,
  AllComponentTypeKeyMap.CodeEmbedComponent,
  AllComponentTypeKeyMap.CardListComponent,
  AllComponentTypeKeyMap.SingleGeneralCardComponent,
  // AllComponentTypeKeyMap.CarouselComponent,
  AllComponentTypeKeyMap.ImageComparisonComponent,
  // AllComponentTypeKeyMap.ScrollingStoryComponent,
  // AllComponentTypeKeyMap.PortfolioViewerComponent,
  AllComponentTypeKeyMap.ImageMapComponent,
]