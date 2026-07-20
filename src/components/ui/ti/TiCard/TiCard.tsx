export type TiCardAppearance =
  | "primary"
  | "secondary"
  | "callout"
  | "success"
  | "warn"
  | "error"
  | "plain-grey"
  | "plain-white"
  | "plain-dark"
  | "outlined"
  | "outlined-white";

/**
 * Wrapper for `ti-card` — an elevated content area with title / content / action
 * sections. Attribute props are typed below; all slotted content is passed as
 * children using the web component's slot names:
 *
 *  - default (no slot) — the card content / description
 *  - `slot="title"`    — title, as a link (`<a>`) or heading (`<h3>`…)
 *  - `slot="action"`   — one or more CTAs (links or `ti-button`s)
 *  - `slot="actionbar"`— compact icon actions
 *  - `slot="label"`    — optional label above the title
 *  - `slot="top-alert"`— top alert text
 *  - `slot="related"`  — related content
 *  - `slot="card-link"`— link that makes the whole card clickable
 *  - `slot="left-icon"` / `slot="close-icon"` — icons for alert cards
 *
 * @example
 * <TiCard appearance="secondary">
 *   <h3 slot="title">This is the title</h3>
 *   <div>Description / content to present to the user.</div>
 *   <a slot="action" href="//www.ti.com">Learn more</a>
 * </TiCard>
 */
export type TiCardProps = React.PropsWithChildren & {
  /** Color / style variant. Defaults to "primary". */
  appearance?: TiCardAppearance;
  /** Wide format: colored border on the left, card lays out as a block. */
  wide?: boolean;
  /** Restyle responsively as the card width changes. */
  responsive?: boolean;
  /** `data-lid` tracking attribute for metrics. */
  dataLid?: string;
  /** Accessible label for the dismiss button on alert cards. Defaults to "Close". */
  dismissLabel?: string;
};

export function TiCard({
  appearance,
  wide,
  responsive,
  dataLid,
  dismissLabel,
  children,
}: TiCardProps): React.ReactNode {
  return (
    <ti-card
      appearance={appearance}
      wide={wide}
      responsive={responsive}
      data-lid={dataLid}
      dismiss-label={dismissLabel}
    >
      {children}
    </ti-card>
  );
}
