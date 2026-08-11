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
import { HorizontalRuleComponentType } from "./HorizontalRule/HorizontalRule.model";
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
import { HierarchyNavigationComponentType, HierarchyNavigationItemComponentType } from "./HierarchyNavigation/HierarchyNavigation.model";
import { tabsComponents } from "./Tabs/types";
import { JumpLinkNavigationComponentType } from "./JumpLink/JumpLinkNavigation.model";
import { JumpLinkTargetComponentType } from "./JumpLink/JumpLinkTarget.model";
import { GoldenSourcePageHeadingComponentType } from "./GoldenSourcePageHeading/GoldenSourcePageHeading.model";

export const allComponentTypes = [
  HeroComponentType,
  ContentBlockComponentType,
  CtaButtonListComponentType,
  CtaLinkListComponentType,
  AccordionComponentType,
  AccordionPanelComponentType,
  PromoBlockComponentType,
  CodeEmbedComponentType,
  CodeSnippetComponentType,
  HomePageHeroSlideComponentType,
  HomePageHeroComponentType,
  ColumnGridColumnComponentType,
  ColumnGridComponentType,
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
  GoldenSourcePageHeadingComponentType,
];
