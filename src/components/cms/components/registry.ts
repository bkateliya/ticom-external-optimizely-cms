import { HeroComponent } from "./PageHeadings/Hero/Hero";
import { HeroComponentType } from "./PageHeadings/Hero/Hero.model";
import {
  AccordionComponentType,
  AccordionPanelComponentType,
} from "./Accordion/Accordion.model";

import { AccordionComponent } from "./Accordion/Accordion";
import { AccordionItem } from "./Accordion/AccordionItem";

import { ComponentRegistry } from "@/lib/ts/component-props";
import { CodeEmbedComponentType } from "./CodeEmbed/CodeEmbed.model";
import { CodeEmbedComponent } from "./CodeEmbed";
import { CodeFragmentComponentType } from "./CodeEmbed/CodeFragment.model";
import { CodeFragmentComponent } from "./CodeEmbed/CodeFragment";
import { CodeSnippetComponentType } from "./CodeSnippet/CodeSnippet.model";
import { CodeSnippetComponent } from "./CodeSnippet/CodeSnippet";
import { HomePageBannerComponent } from "./HomePageBanner/HomePageBanner";
import { HomePageBannerComponentType } from "./HomePageBanner/HomePageBanner.model";
import { cardListComponentRegistry } from "./CardList/registry";
import {
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
} from "./ColumnGrid/ColumnGrid.model";
import { ColumnGridComponent } from "./ColumnGrid/ColumnGrid";
import { NoPreviewComponent } from "@/components/ui/cms/NoPreviewComponent";
import { ContentBlockComponent } from "./ContentBlock/ContentBlock";
import { ContentBlockComponentType } from "./ContentBlock/ContentBlock.model";
import { applicationListingComponentRegistry } from "./application-components/registry";
import { imageComponentRegistry } from "./Image/registry";
import { PremiumMediaHeadingComponentType } from "./PageHeadings/PremiumMediaHeading/PremiumMediaHeading.model";
import { PremiumMediaHeadingComponent } from "./PageHeadings/PremiumMediaHeading/PremiumMediaHeading";
import { SelectionToolComponentType } from "./SelectionTool/SelectionTool.model";
import { ApplicationSearchBoxComponentType } from "./ApplicationSearchBox/ApplicationSearchBox.model";
import { FAQSearchBoxComponentType } from "./FAQSearchBox/FAQSearchBox.model";
import { FAQSearchBox } from "./FAQSearchBox/FAQSearchBox";
import { BrowseVideosComponentType } from "./BrowseVideos/BrowseVideos.model";
import { BrowseVideos } from "./BrowseVideos/BrowseVideos";
import { VideoPlayerComponentType } from "./VideoPlayer/VideoPlayer.model";
import { VideoPlayerComponent } from "./VideoPlayer/VideoPlayer";
import {
  CtaButtonListComponentType,
  CtaLinkListComponentType,
} from "./CtaList/CtaList.model";
import { CtaButtonList } from "./CtaList/CtaButtonList";
import { CtaLinkList } from "./CtaList/CtaLinkList";
import { tabsComponentRegistry } from "./Tabs/registry";
import {
  HierarchyNavigationComponentType,
  HierarchyNavigationItemComponentType,
} from "./HierarchyNavigation/HierarchyNavigation.model";
import { HierarchyNavigation } from "./HierarchyNavigation/HierarchyNavigation";
import { JumpLinkNavigationComponent } from "./JumpLink/JumpLinkNavigation";
import { JumpLinkTargetComponentType } from "./JumpLink/JumpLinkTarget.model";
import { JumpLinkNavigationComponentType } from "./JumpLink/JumpLinkNavigation.model";
import { JumpLinkTargetComponent } from "./JumpLink/JumpLinkTarget";
import { JumpLinkNavigationHorizontalComponent } from "./JumpLink/JumpLinkNavigation";
import { JumpLinkNavigationHorizontalComponentType } from "./JumpLink/JumpLinkNavigation.model";
import {
  KeyCustomerMessageItemComponentType,
  KeyCustomerMessagesComponentType,
} from "./KeyCustomerMessages/KeyCustomerMessages.model";
import { KeyCustomerMessages } from "./KeyCustomerMessages/KeyCustomerMessages";
import { ApplicationSearchBox } from "./ApplicationSearchBox/ApplicationSearchBox";
import { SelectionToolComponent } from "./SelectionTool/SelectionTool";
import { GoldenSourcePageHeadingComponentType } from "./PageHeadings/GoldenSourcePageHeading/GoldenSourcePageHeading.model";
import { GoldenSourcePageHeadingComponent } from "./PageHeadings/GoldenSourcePageHeading/GoldenSourcePageHeading";
import { GenericPageHeadingComponentType } from "./PageHeadings/GenericPageHeading/GenericPageHeading.model";
import { ApiSwaggerComponentType } from "./ApiSwagger/ApiSwagger.model";
import { ApiSwagger } from "./ApiSwagger/ApiSwagger";
import { PartnerResourceFilterComponentType } from "./PartnerResourceFilter/PartnerResourceFilter.model";
import { PartnerResourceFilterOptionComponentType } from "./PartnerResourceFilter/PartnerResourceFilterOption.model";
import { PartnerResourceFilter } from "./PartnerResourceFilter/PartnerResourceFilter";
import {
  LLCPromoComponentType,
  LLCPromoMessageComponentType,
  LLCPromoWarningComponentType,
} from "./LLCPromo/LLCPromo.model";
import { HorizontalRuleContentDividerComponentType } from "./HorizontalRuleContentDivider/HorizontalRuleContentDivider.model";
import { HorizontalRuleContentDividerComponent } from "./HorizontalRuleContentDivider/HorizontalRuleContentDivider";
import { HorizontalRulePageDividerComponentType } from "./HorizontalRulePageDivider/HorizontalRulePageDivider.model";
import { HorizontalRulePageDividerComponent } from "./HorizontalRulePageDivider/HorizontalRulePageDivider";
import { EventComponentType } from "./Event/Event.model";
import {
  ApplicationStoryComponentType,
  FeaturedApplicationComponentType,
} from "./FeaturedApplication/FeaturedApplication.model";
import {
  ScrollingStoryVerticalComponentType,
  ScrollingStoryVerticalContentComponentType,
} from "./ScrollingStoryVertical/ScrollingStoryVertical.model";
import {
  ScrollingStoryVerticalComponent,
  ScrollingStoryVerticalContentComponent,
} from "./ScrollingStoryVertical/ScrollingStoryVertical";
import {
  ScrollingStoryHorizontalComponentType,
  ScrollingStoryHorizontalContentComponentType,
} from "./HorizontalScrollingStory/HorizontalScrollingStory.model";
import { ScrollingStoryHorizontalComponent } from "./HorizontalScrollingStory/HorizontalScrollingStory";
import {
  ImageComparisonComponentType,
  ImageComparisonItemComponentType,
} from "./ImageComparison/ImageComparison.model";
import {
  ImageComparisonComponent,
  ImageComparisonItemComponent,
} from "./ImageComparison/ImageComparison";
import { TeaserComponentType } from "./Teaser/Teaser.model";
import { TeaserComponent } from "./Teaser/Teaser";
import { ArticlePageHeaderComponentType } from "./PageHeadings/ArticlePageHeading/ArticlePageHeading.model";
import { ArticlePageHeaderComponent } from "./PageHeadings/ArticlePageHeading/ArticlePageHeading";
import { ProductCategoryListingComponent } from "./ProductCategoryListing/ProductCategoryListing";
import { ProductCategoryListingComponentType } from "./ProductCategoryListing/ProductCategoryListing.model";
import { ProductCategoryListingOverrideComponentType } from "./ProductCategoryListing/ProductCategoryListingOverride.model";
import {
  ApplicationSelectionToolComponentType,
  ReferenceDesignSearchComponentType,
} from "./TeaserGoldenSourced/TeaserGoldenSourced.model";
import {
  ApplicationSelectionToolTeaser,
  ReferenceDesignSearchTeaser,
} from "./TeaserGoldenSourced/TeaserGoldenSourced";
import {
  PremiumInteractiveImageComponentType,
  PremiumInteractiveImagePanelComponentType,
} from "./PremiumInteractiveImage/PremiumInteractiveImage.model";
import { PortfolioVisualizerComponentType } from "./PortfolioVisualizer/PortfolioVisualizer.model";
import { ShipRateTablesComponentType } from "./ShipRateTables/ShipRateTables.model";
import { ShipRateTablesComponent } from "./ShipRateTables/ShipRateTables";
import { ApplicationCategoryListComponentType } from "./ApplicationCategoryList/ApplicationCategoryList.model";
import { ApplicationCategoryList } from "./ApplicationCategoryList/ApplicationCategoryList";
import { GenericPageHeadingComponent } from "./PageHeadings/GenericPageHeading/GenericPageHeading";
import { ViewMoreComponentType } from "./ViewMore/ViewMore.model";
import { ViewMoreComponent } from "./ViewMore/ViewMore";
import { PremiumInteractiveImageComponent } from "./PremiumInteractiveImage/PremiumInteractiveImage";

import { PortfolioVisualizerComponent } from "./PortfolioVisualizer/PortfolioVisualizer";
import { VideoTranscriptComponentType } from "./VideoTranscript/VideoTranscript.model";
import { SlideWithImageComponentType } from "./SlideWithImage/SlideWithImage.model";
import { SlideshowComponentType } from "./Slideshow/Slideshow.model";

import { SlideWithCardComponentType } from "./SlideWithCard/SlideWithCard.model";
import { SlideWithCardComponent } from "./SlideWithCard/SlideWithCard";
import { CarouselWithChipsComponentType } from "./CarouselWithChips/CarouselWithChips.model";
import { CarouselWithChipsComponent } from "./CarouselWithChips/CarouselWithChips";

export const componentRegistry: ComponentRegistry = {
  [HeroComponentType.key]: HeroComponent,
  [ContentBlockComponentType.key]: ContentBlockComponent,
  [CtaButtonListComponentType.key]: CtaButtonList,
  [CtaLinkListComponentType.key]: CtaLinkList,
  [AccordionComponentType.key]: AccordionComponent,
  [AccordionPanelComponentType.key]: AccordionItem,
  [CodeEmbedComponentType.key]: CodeEmbedComponent,
  [CodeFragmentComponentType.key]: CodeFragmentComponent,
  [ArticlePageHeaderComponentType.key]: ArticlePageHeaderComponent,
  [CodeSnippetComponentType.key]: CodeSnippetComponent,
  [HomePageBannerComponentType.key]: HomePageBannerComponent,
  [ColumnGridComponentType.key]: ColumnGridComponent,
  [ColumnGridColumnComponentType.key]: NoPreviewComponent,
  [SelectionToolComponentType.key]: SelectionToolComponent,
  ...cardListComponentRegistry,
  ...applicationListingComponentRegistry,
  ...imageComponentRegistry,
  [PremiumMediaHeadingComponentType.key]: PremiumMediaHeadingComponent,
  [ScrollingStoryVerticalComponentType.key]: ScrollingStoryVerticalComponent,
  [ScrollingStoryVerticalContentComponentType.key]:
    ScrollingStoryVerticalContentComponent,
  [ScrollingStoryHorizontalComponentType.key]: ScrollingStoryHorizontalComponent,
  // Stories are rendered by the parent — the image is positioned against the
  // parent's grid, so a slide cannot stand on its own.
  [ScrollingStoryHorizontalContentComponentType.key]: NoPreviewComponent,
  [FAQSearchBoxComponentType.key]: FAQSearchBox,
  [BrowseVideosComponentType.key]: BrowseVideos,
  [VideoPlayerComponentType.key]: VideoPlayerComponent,
  [HierarchyNavigationComponentType.key]: HierarchyNavigation,
  [HierarchyNavigationItemComponentType.key]: NoPreviewComponent,
  ...tabsComponentRegistry,
  [JumpLinkNavigationComponentType.key]: JumpLinkNavigationComponent,
  [JumpLinkTargetComponentType.key]: JumpLinkTargetComponent,
  [KeyCustomerMessagesComponentType.key]: KeyCustomerMessages,
  [KeyCustomerMessageItemComponentType.key]: NoPreviewComponent,
  [ApplicationSearchBoxComponentType.key]: ApplicationSearchBox,
  [GoldenSourcePageHeadingComponentType.key]: GoldenSourcePageHeadingComponent,
  [GenericPageHeadingComponentType.key]: GenericPageHeadingComponent,
  [ApiSwaggerComponentType.key]: ApiSwagger,
  [HorizontalRuleContentDividerComponentType.key]:
    HorizontalRuleContentDividerComponent,
  [HorizontalRulePageDividerComponentType.key]:
    HorizontalRulePageDividerComponent,
  [PartnerResourceFilterComponentType.key]: PartnerResourceFilter,
  [PartnerResourceFilterOptionComponentType.key]: NoPreviewComponent,
  [LLCPromoComponentType.key]: NoPreviewComponent,
  [LLCPromoMessageComponentType.key]: NoPreviewComponent,
  [LLCPromoWarningComponentType.key]: NoPreviewComponent,
  [EventComponentType.key]: NoPreviewComponent,
  [ApplicationStoryComponentType.key]: NoPreviewComponent,
  [FeaturedApplicationComponentType.key]: NoPreviewComponent,
  [ImageComparisonComponentType.key]: ImageComparisonComponent,
  [ImageComparisonItemComponentType.key]: ImageComparisonItemComponent,
  [TeaserComponentType.key]: TeaserComponent,
  [ProductCategoryListingComponentType.key]: ProductCategoryListingComponent,
  [ProductCategoryListingOverrideComponentType.key]: NoPreviewComponent,
  [ApplicationSelectionToolComponentType.key]: ApplicationSelectionToolTeaser,
  [ReferenceDesignSearchComponentType.key]: ReferenceDesignSearchTeaser,
  [PremiumInteractiveImageComponentType.key]: PremiumInteractiveImageComponent,
  [PremiumInteractiveImagePanelComponentType.key]: NoPreviewComponent,
  [PortfolioVisualizerComponentType.key]: PortfolioVisualizerComponent,
  [JumpLinkNavigationHorizontalComponentType.key]:
    JumpLinkNavigationHorizontalComponent,
  [ShipRateTablesComponentType.key]: ShipRateTablesComponent,
  [ApplicationCategoryListComponentType.key]: ApplicationCategoryList,
  [ViewMoreComponentType.key]: ViewMoreComponent,
  [VideoTranscriptComponentType.key]: NoPreviewComponent,
  [SlideWithImageComponentType.key]: NoPreviewComponent,
  [SlideshowComponentType.key]: NoPreviewComponent,
  [SlideWithCardComponentType.key]: SlideWithCardComponent,
  [CarouselWithChipsComponentType.key]: CarouselWithChipsComponent,
};
