import { KEY_PREFIX } from "../constants";
import { ApplicationComponentTypeKeyMap } from "./application-components/keys";

// This is in separate file to avoid circular reference when pushing types
// Otherwise there's a confusing error about object is not iterable when doing an Opti push

export const AllComponentTypeKeyMap = {
  HeroComponent: `${KEY_PREFIX}Hero_Component`,
  ContentBlockComponent: `${KEY_PREFIX}ContentBlock_Component`,
  CtaLinkListComponent: `${KEY_PREFIX}CtaLinkList_Component`,
  CtaButtonListComponent: `${KEY_PREFIX}CtaButtonList_Component`,
  AccordionComponent: `${KEY_PREFIX}Accordion_Component`,
  AccordionPanelComponent: `${KEY_PREFIX}AccordionPanel_Component`,
  CardListComponent: `${KEY_PREFIX}CardList_Component`,
  SingleGeneralCardComponent: `${KEY_PREFIX}GeneralCard_Component`,
  GeneralCardsComponent: `${KEY_PREFIX}GeneralCards_Component`,
  ProductCardsComponent: `${KEY_PREFIX}ProductCards_Component`,
  PromoBlockComponent: `${KEY_PREFIX}PromoBlock_Component`,
  CodeEmbedComponent: `${KEY_PREFIX}CodeEmbed_Component`,
  CodeSnippetComponent: `${KEY_PREFIX}CodeSnippet_Component`,
  HomePageHeroSlideComponent: `${KEY_PREFIX}HomePageHeroSlide_Component`,
  HomePageHeroComponent: `${KEY_PREFIX}HomePageHero_Component`,
  ColumnGridColumnComponent: `${KEY_PREFIX}ColumnGridColumn_Component`,
  ColumnGridComponent: `${KEY_PREFIX}ColumnGrid_Component`,
  StandardImageComponent: `${KEY_PREFIX}StandardImage_Component`,
  HeadshotImageComponent: `${KEY_PREFIX}HeadshotImage_Component`,
  HorizontalRuleComponent: `${KEY_PREFIX}HorizontalRule_Component`,
  VideoPlayerComponent: `${KEY_PREFIX}VideoPlayer_Component`,
  SelectionToolComponent: `${KEY_PREFIX}SelectionTool_Component`,
  PremiumMediaHeadingComponent: `${KEY_PREFIX}PremiumMediaHeading_Component`,
  ApplicationSearchBoxComponent: `${KEY_PREFIX}ApplicationSearchBox_Component`,
  FAQSearchBoxComponent: `${KEY_PREFIX}FAQSearchBox_Component`,
  BrowseVideosComponent: `${KEY_PREFIX}BrowseVideos_Component`,
};

/**
 * Keys for components that can be used directly in a Section or a Column
 */
export const StandaloneComponentTypeKeys = [
  AllComponentTypeKeyMap.AccordionComponent,
  AllComponentTypeKeyMap.ContentBlockComponent,
  AllComponentTypeKeyMap.PromoBlockComponent,
  AllComponentTypeKeyMap.CodeEmbedComponent,
  AllComponentTypeKeyMap.CodeSnippetComponent,
  AllComponentTypeKeyMap.CardListComponent,
  AllComponentTypeKeyMap.SingleGeneralCardComponent,
  AllComponentTypeKeyMap.ColumnGridComponent,
  ApplicationComponentTypeKeyMap.ApplicationListing,
  AllComponentTypeKeyMap.VideoPlayerComponent,
  AllComponentTypeKeyMap.SelectionToolComponent,
  AllComponentTypeKeyMap.PremiumMediaHeadingComponent,
  AllComponentTypeKeyMap.HorizontalRuleComponent,
  AllComponentTypeKeyMap.ApplicationSearchBoxComponent,
  AllComponentTypeKeyMap.FAQSearchBoxComponent,
  AllComponentTypeKeyMap.BrowseVideosComponent,
];
