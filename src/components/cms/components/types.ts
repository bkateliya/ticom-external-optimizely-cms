import { HeroComponentType } from "./Hero/Hero.model";
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
import { NewProductsCardListComponentType } from "./NewProductsCardList/NewProductsCardList.model";
import { VideoPlayerComponentType } from "./VideoPlayer/VideoPlayer.model";
import { SelectionToolComponentType } from "./SelectionTool/SelectionTool.model";
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading/PremiumMediaHeading.model";
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
import { JumpLinkNavigationComponentType } from "./JumpLink/JumpLinkNavigation.model";
import { JumpLinkTargetComponentType } from "./JumpLink/JumpLinkTarget.model";
import {
  KeyCustomerMessageItemComponentType,
  KeyCustomerMessagesComponentType,
} from "./KeyCustomerMessages/KeyCustomerMessages.model";
import { GoldenSourcePageHeadingComponentType } from "./GoldenSourcePageHeading/GoldenSourcePageHeading.model";
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

export const allComponentTypes = [
  HeroComponentType,
  ContentBlockComponentType,
  CtaButtonListComponentType,
  CtaLinkListComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  CodeEmbedComponentType,
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
  VideoPlayerComponentType,
  PremiumMediaHeadingComponentType,
  ApplicationSearchBoxComponentType,
  FAQSearchBoxComponentType,
  HierarchyNavigationComponentType,
  HierarchyNavigationItemComponentType,
  BrowseVideosComponentType,
  ...tabsComponents,
  JumpLinkNavigationComponentType,
  JumpLinkTargetComponentType,
  KeyCustomerMessagesComponentType,
  KeyCustomerMessageItemComponentType,
  GoldenSourcePageHeadingComponentType,
  ApiSwaggerComponentType,
  PartnerResourceFilterComponentType,
  PartnerResourceFilterOptionComponentType,
  LLCPromoComponentType,
  LLCPromoMessageComponentType,
  LLCPromoWarningComponentType,
  EventComponentType,
  ApplicationStoryComponentType,
  FeaturedApplicationComponentType,
];
