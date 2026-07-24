import {
  ContextData,
  getContextData,
  withAppContext,
} from "@optimizely/cms-sdk/react/server";
import { TiStickyHeader } from "@/components/ui/ti/TiStickyHeader/TiStickyHeader";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { TiPortfolioViewer } from "@/components/ui/ti/TiPortfolioViewer/TiPortfolioViewer";
import {
  PaginationTest,
  ScrollingStoryTest,
  SlidePanelTest,
  SlideshowTest,
} from "./client-components";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";
import { OptiContextProvider } from "@/components/ui/context/OptiContext";
import { populateSiteSettings } from "@/lib/data/site-settings";

async function StyleGuidePage() {
  const locale = "en-us";
  const path = `/${locale}/`;
  await populateSiteSettings(path, locale);

  const siteSettings =
    getContextData("siteSettings") ?? ({} as ContextData["siteSettings"]);
  return (
    <main
      id="top"
      className="mx-auto w-full max-w-[1240px] px-4 md:px-6 pb-16 text-body-md text-pl-text-color-primary scroll-mt-6"
    >
      <OptiContextProvider
        contextData={{
          locale: locale,
          siteSettings,
          pageTitle: "",
          pageContentId: "",
          pageType: "",
          breadcrumb: [],
        }}
      >
        <ThemeProvider>
          <TiStickyHeader topContent={"This only appears on top"}>
            This is the body of the sticky header
          </TiStickyHeader>
          <SlideshowTest />
          <SlidePanelTest />
          <SvgIconTest />
          <ThemeProvider theme="theme-accent">
            <SvgIconTest />
          </ThemeProvider>
          <TiPortfolioViewer svgUrl="/example/sub-1-ghz-portfolio-visualization.svg"></TiPortfolioViewer>
          <PaginationTest />
          <ScrollingStoryTest />
        </ThemeProvider>
      </OptiContextProvider>
    </main>
  );
}

function SvgIconTest() {
  return (
    <div className="p-4">
      {/* <TiSvgIcon icon="info-circle" /> */}

      <TiSvgIcon icon="info-circle" iconStyle="primary" />

      <TiSvgIcon icon="info-circle" iconStyle="secondary" />

      <TiSvgIcon icon="info-circle" iconStyle="tertiary" />

      <TiSvgIcon icon="info-circle" iconStyle="success" />

      <TiSvgIcon icon="info-circle" iconStyle="warn" />

      <TiSvgIcon icon="info-circle" iconStyle="error" />

      {/* <TiSvgIcon icon="person" iconStyle="secondary" size="l" /> */}
    </div>
  );
}

export default withAppContext(StyleGuidePage);
