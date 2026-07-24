
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
  HomePageHeroSlideComponent: `${KEY_PREFIX}HomePageHeroSlide_Component`,
  HomePageHeroComponent: `${KEY_PREFIX}HomePageHero_Component`,
  ColumnGridColumnComponent: `${KEY_PREFIX}ColumnGridColumn_Component`,
  ColumnGridComponent: `${KEY_PREFIX}ColumnGrid_Component`,
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
]