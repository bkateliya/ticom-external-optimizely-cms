import { tv } from "tailwind-variants";

import { OptiComponentProps } from "@/lib/ts/component-props";
import {
  HorizontalRuleComponentType,
  HorizontalRuleStyle,
} from "./HorizontalRule.model";

/**
 * Section divider in three styles, ported from
 * `.ti_aem-divider--primary|secondary|reversed` in ticom.global.portals.css: each is
 * `margin-block: 16px` plus a 1px bottom border. `reversed` is white at 50% opacity and
 * only reads on a dark section background. Live ti.com puts the modifier on the <hr>
 * itself rather than a wrapper, so one element draws one line.
 *
 * Two things to know before editing the class lists:
 * - `border-0` and `border-solid` are explicit because Tailwind's preflight is commented
 *   out in app.css, so an <hr> otherwise keeps the UA `border: 1px inset` on all sides.
 * - twMerge is left on so `unset`'s `border-dashed` replaces the base `border-solid`.
 *   Tailwind emits dashed first, so listing the classes in order would not be enough.
 *
 * With no style authored nothing renders on the published site; `unset` exists only to
 * give CMS editors something clickable.
 */
const TAILWIND_VARIANTS = tv({
  base: ["my-4", "border-0", "border-b", "border-solid"],
  variants: {
    ruleStyle: {
      primary: "border-b-pl-divider-color-primary",
      secondary: "border-b-pl-divider-color-secondary",
      reversed: ["border-b-white", "opacity-50"],
      unset: ["border-dashed", "border-b-pl-divider-color-primary"],
    },
  },
});

/** Typed so the model's union and the `ruleStyle` variants can't drift apart. */
const RULE_STYLES: readonly HorizontalRuleStyle[] = [
  "primary",
  "secondary",
  "reversed",
];

export function HorizontalRuleComponent({
  content,
}: OptiComponentProps<typeof HorizontalRuleComponentType>) {
  const ruleStyle = content?.ruleStyle as HorizontalRuleStyle | null | undefined;

  if (!ruleStyle || !RULE_STYLES.includes(ruleStyle)) {
    return content?.__context?.edit ? (
      <hr className={TAILWIND_VARIANTS({ ruleStyle: "unset" })} />
    ) : null;
  }

  return <hr className={TAILWIND_VARIANTS({ ruleStyle })} />;
}
