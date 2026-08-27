import { HeroComponentType } from "./PageHeadings/Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";

import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { CodeSnippetComponentType } from "./CodeSnippet/CodeSnippet.model";
import { HomePageBannerComponentType } from "./HomePageBanner/HomePageBanner.model";
import { cardListComponents } from "./CardList/types";

import {
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
} from "./ColumnGrid/ColumnGrid.model";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";
import { applicationListingComponents } from "./application-components/types";
import { imageComponentTypes } from "./Image/types";
import { HorizontalRuleComponentType } from "./HorizontalRule/HorizontalRule.model";
import { HorizontalRuleContentDividerComponentType } from "./HorizontalRuleContentDivider/HorizontalRuleContentDivider.model";
import { HorizontalRulePageDividerComponentType } from "./HorizontalRulePageDivider/HorizontalRulePageDivider.model";
import { NewProductsCardListComponentType } from "./NewProductsCardList/NewProductsCardList.model";
import { VideoPlayerComponentType } from "./VideoPlayer/VideoPlayer.model";
import { SelectionToolComponentType } from "./SelectionTool/SelectionTool.model";
import { PremiumMediaHeadingComponentType } from "./PageHeadings/PremiumMediaHeading/PremiumMediaHeading.model";
import { ApplicationSearchBoxComponentType } from "./ApplicationSearchBox/ApplicationSearchBox.model";
import { FAQSearchBoxComponentType } from "./FAQSearchBox/FAQSearchBox.model";
import { BrowseVideosComponentType } from "./BrowseVideos/BrowseVideos.model";
import {
  CtaButtonListComponentType,
  CtaLinkListComponentType,
} from "./CtaList/CtaList.model";
import {
  HierarchyNavigationComponentType,
  HierarchyNavigationItemComponentType,
} from "./HierarchyNavigation/HierarchyNavigation.model";
import { tabsComponents } from "./Tabs/types";
import {
  JumpLinkNavigationComponentType,
  JumpLinkNavigationHorizontalComponentType,
} from "./JumpLink/JumpLinkNavigation.model";
import { JumpLinkTargetComponentType } from "./JumpLink/JumpLinkTarget.model";
import {
  KeyCustomerMessageItemComponentType,
  KeyCustomerMessagesComponentType,
} from "./KeyCustomerMessages/KeyCustomerMessages.model";
import { GoldenSourcePageHeadingComponentType } from "./PageHeadings/GoldenSourcePageHeading/GoldenSourcePageHeading.model";
import { GenericPageHeadingComponentType } from "./PageHeadings/GenericPageHeading/GenericPageHeading.model";
import { ApiSwaggerComponentType } from "./ApiSwagger/ApiSwagger.model";
import { PartnerResourceFilterComponentType } from "./PartnerResourceFilter/PartnerResourceFilter.model";
import { PartnerResourceFilterOptionComponentType } from "./PartnerResourceFilter/PartnerResourceFilterOption.model";
import {
  LLCPromoComponentType,
  LLCPromoMessageComponentType,
  LLCPromoWarningComponentType,
} from "./LLCPromo/LLCPromo.model";
import { EventComponentType } from "./Event/Event.model";
import {
  ApplicationStoryComponentType,
  FeaturedApplicationComponentType,
} from "./FeaturedApplication/FeaturedApplication.model";
import { CodeFragmentComponentType } from "./CodeEmbed/CodeFragment.model";
import {
  ScrollingStoryVerticalComponentType,
  ScrollingStoryVerticalContentComponentType,
} from "./ScrollingStoryVertical/ScrollingStoryVertical.model";
import {
  ImageComparisonComponentType,
  ImageComparisonItemComponentType,
} from "./ImageComparison/ImageComparison.model";
import { TeaserComponentType } from "./Teaser/Teaser.model";
import { ArticlePageHeaderComponentType } from "./PageHeadings/ArticlePageHeading/ArticlePageHeading.model";
import { ProductCategoryListingOverrideComponentType } from "./ProductCategoryListing/ProductCategoryListingOverride.model";
import { ProductCategoryListingComponentType } from "./ProductCategoryListing/ProductCategoryListing.model";
import {
  ApplicationSelectionToolComponentType,
  ReferenceDesignSearchComponentType,
} from "./TeaserGoldenSourced/TeaserGoldenSourced.model";
import {
  PremiumInteractiveImageComponentType,
  PremiumInteractiveImagePanelComponentType,
} from "./PremiumInteractiveImage/PremiumInteractiveImage.model";
import { PortfolioVisualizerComponentType } from "./PortfolioVisualizer/PortfolioVisualizer.model";

export const allComponentTypes = [
  HeroComponentType,
  ContentBlockComponentType,
  CtaButtonListComponentType,
  CtaLinkListComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  ArticlePageHeaderComponentType,
  CodeEmbedComponentType,
  CodeFragmentComponentType,
  CodeSnippetComponentType,
  HomePageBannerComponentType,
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
  NewProductsCardListComponentType,
  SelectionToolComponentType,
  ...cardListComponents,
  ...applicationListingComponents,
  ...imageComponentTypes,
  HorizontalRuleComponentType,
  HorizontalRuleContentDividerComponentType,
  HorizontalRulePageDividerComponentType,
  VideoPlayerComponentType,
  PremiumMediaHeadingComponentType,
  ScrollingStoryVerticalComponentType,
  ScrollingStoryVerticalContentComponentType,
  ApplicationSearchBoxComponentType,
  FAQSearchBoxComponentType,
  HierarchyNavigationComponentType,
  HierarchyNavigationItemComponentType,
  BrowseVideosComponentType,
  ...tabsComponents,
  JumpLinkNavigationComponentType,
  JumpLinkNavigationHorizontalComponentType,
  JumpLinkTargetComponentType,
  KeyCustomerMessagesComponentType,
  KeyCustomerMessageItemComponentType,
  GoldenSourcePageHeadingComponentType,
  GenericPageHeadingComponentType,
  ApiSwaggerComponentType,
  PartnerResourceFilterComponentType,
  PartnerResourceFilterOptionComponentType,
  LLCPromoComponentType,
  LLCPromoMessageComponentType,
  LLCPromoWarningComponentType,
  EventComponentType,
  ApplicationStoryComponentType,
  FeaturedApplicationComponentType,
  ImageComparisonComponentType,
  ImageComparisonItemComponentType,
  TeaserComponentType,
  ProductCategoryListingComponentType,
  ProductCategoryListingOverrideComponentType,
  ApplicationSelectionToolComponentType,
  ReferenceDesignSearchComponentType,
  PremiumInteractiveImageComponentType,
  PremiumInteractiveImagePanelComponentType,
  PortfolioVisualizerComponentType,
];
