export type TabContainerAppearance = "tab" | "chip" | "cards";
export type TabContainerTheme = "light" | "dark";
export type TabTitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** A single tab and its panel content. Rendered as a `ti-tab-panel`. */
export type TabPanel = {
  /** Stable id used for selection, hash navigation, and metrics. */
  tabId: string;
  /** Tab title. May contain simple HTML (e.g. "Title <sup>1</sup>"). */
  title: string;
  /** The panel content shown when this tab is active. */
  content: React.ReactNode;
  /** Hide this tab entirely. */
  hidden?: boolean;
  /** Keep the panel in the DOM while hidden so its content has size. */
  renderWhenHidden?: boolean;
  /** Image icon URL for the tab button. Only used when `appearance="cards"`. */
  tabTitleImage?: string;
};

/**
 * Wrapper for `ti-tab-container` + `ti-tab-panel`. Pass tabs via the `tabs`
 * prop; each is rendered as a `ti-tab-panel` for you. Optional `headerContent`
 * fills the `tab-header-content` slot (extra content beside the tab list).
 *
 * @example
 * <TiTabContainer
 *   selectedTabId="specs"
 *   tabs={[
 *     { tabId: "overview", title: "Overview", content: <p>…</p> },
 *     { tabId: "specs", title: "Specs", content: <p>…</p> },
 *   ]}
 * />
 */
export type TiTabContainerProps = {
  /** The tabs to render. */
  tabs: TabPanel[];
  /** Extra content beside the tab list (the `tab-header-content` slot). */
  headerContent?: React.ReactNode;
  /** Visual style of the tab triggers. Defaults to "tab". */
  appearance?: TabContainerAppearance;
  /** `tabId` of the tab selected by default. */
  selectedTabId?: string;
  /** Show an "All" tab that displays every tab's content. Defaults to false. */
  allTabShown?: boolean;
  /** Label for the "All" tab. Defaults to "All". */
  allTabTitle?: string;
  /** Hash to use for the "All" tab. Defaults to "all". Keep unique per page. */
  allTabId?: string;
  /** Select tabs via the URL hash. Defaults to false. */
  hashSelection?: boolean;
  /** Activate tabs on arrow-key focus instead of requiring Enter/Space. */
  autoActivate?: boolean;
  /** On mobile, keep only one expansion panel open at a time. */
  autoCollapseMobile?: boolean;
  /** Disable the accordion view swap on mobile. */
  disableMobile?: boolean;
  /** Accessible label for the tab list. */
  tabListLabel?: string;
  /** Heading level for the active tab title. Only used when `appearance="cards"`. */
  tabTitleLevel?: TabTitleLevel;
  /** Light or dark theme. Defaults to "light". */
  theme?: TabContainerTheme;
};

export function TiTabContainer({
  tabs,
  headerContent,
  appearance,
  selectedTabId,
  allTabShown,
  allTabTitle,
  allTabId,
  hashSelection,
  autoActivate,
  autoCollapseMobile,
  disableMobile,
  tabListLabel,
  tabTitleLevel,
  theme,
}: TiTabContainerProps): React.ReactNode {
  return (
    <ti-tab-container
      appearance={appearance}
      selected-tab-id={selectedTabId}
      all-tab-shown={allTabShown}
      all-tab-title={allTabTitle}
      all-tab-id={allTabId}
      hash-selection={hashSelection}
      auto-activate={autoActivate}
      auto-collapse-mobile={autoCollapseMobile}
      disable-mobile={disableMobile}
      tab-list-label={tabListLabel}
      tab-title-level={tabTitleLevel}
      theme={theme}
    >
      {headerContent && <div slot="tab-header-content">{headerContent}</div>}
      {tabs.map((tab) => (
        <ti-tab-panel
          key={tab.tabId}
          tab-id={tab.tabId}
          tab-title={tab.title}
          hidden={tab.hidden}
          render-when-hidden={tab.renderWhenHidden}
          tab-title-image={tab.tabTitleImage}
        >
          {tab.content}
        </ti-tab-panel>
      ))}
    </ti-tab-container>
  );
}
