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
import { CodeSnippetComponentType } from "./CodeSnippet/CodeSnippet.model";
import { CodeSnippetComponent } from "./CodeSnippet/CodeSnippet";
import { HomePageHeroSlideComponent } from "./HomePageHero/HomePageHeroSlide";
import {
  HomePageHeroComponentType,
  HomePageHeroSlideComponentType,
} from "./HomePageHero/HomePageHero.model";
import { HomePageHeroComponent } from "./HomePageHero/HomePageHero";
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
import { PremiumMediaHeadingComponentType } from "./PremiumMediaHeading/PremiumMediaHeading.model";
import { PremiumMediaHeadingComponent } from "./PremiumMediaHeading/PremiumMediaHeading";
import { SelectionToolComponentType } from "./SelectionTool/SelectionTool.model";
import { ApplicationSearchBoxComponentType } from "./ApplicationSearchBox/ApplicationSearchBox.model";
import { FAQSearchBoxComponentType } from "./FAQSearchBox/FAQSearchBox.model";
import { VideoPlayerComponentType } from "./VideoPlayer/VideoPlayer.model";
import { VideoPlayerComponent } from "./VideoPlayer/VideoPlayer";
import { CtaButtonListComponentType, CtaLinkListComponentType } from "./CtaList/CtaList.model";
import { CtaButtonList } from "./CtaList/CtaButtonList";
import { CtaLinkList } from "./CtaList/CtaLinkList";

export const componentRegistry: ComponentRegistry = {
  [HeroComponentType.key]: HeroComponent,
  [ContentBlockComponentType.key]: ContentBlockComponent,
  [CtaButtonListComponentType.key]: CtaButtonList,
  [CtaLinkListComponentType.key]: CtaLinkList,
  [AccordionComponentType.key]: AccordionComponent,
  [AccordionPanelComponentType.key]: AccordionItem,
  [PromoBlockComponentType.key]: PromoBlockComponent,
  [CodeEmbedComponentType.key]: CodeEmbedComponent,
  [CodeSnippetComponentType.key]: CodeSnippetComponent,
  [HomePageHeroSlideComponentType.key]: HomePageHeroSlideComponent,
  [HomePageHeroComponentType.key]: HomePageHeroComponent,
  [ColumnGridComponentType.key]: ColumnGridComponent,
  [ColumnGridColumnComponentType.key]: NoPreviewComponent,
  [SelectionToolComponentType.key]: NoPreviewComponent,
  ...cardListComponentRegistry,
  ...applicationListingComponentRegistry,
  ...imageComponentRegistry,
  [PremiumMediaHeadingComponentType.key]: PremiumMediaHeadingComponent,
  [ApplicationSearchBoxComponentType.key]: NoPreviewComponent,
  [FAQSearchBoxComponentType.key]: NoPreviewComponent,
  [VideoPlayerComponentType.key]: VideoPlayerComponent,
};
