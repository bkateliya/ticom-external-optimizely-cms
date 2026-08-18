/**
 * Horizontal Rule — Content Divider.
 *
 * Ports AEM's `ti/components/horizontalRule`, which renders a bare
 * `<hr class="ti_aem-divider ti_aem-divider--{rulestyle}">`. Here the AEM
 * "rulestyle" select is replaced by an authored `spacing` option, and the rule
 * colour is derived from the surrounding theme instead of being authored.
 *
 * The rule is drawn as a 1px background block rather than a border: Tailwind's
 * preflight is disabled in this app (see `assets/app.css`), so the browser's
 * `hr { border: 1px inset }` default is still live and a border-based rule
 * would need to be zeroed on all four sides first. `hydration.css` draws its
 * dividers the same way.
 */

"use client";

import { tv } from "tailwind-variants";

import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { ComponentTheme } from "@/components/ui/ti/enums";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { Themes } from "@/lib/themes";

import { HorizontalRuleContentDividerComponentType } from "./HorizontalRuleContentDivider.model";

/** Authored spacing options. Anything else falls back to the CMS default. */
type DividerSpacing = "none" | "compact" | "comfortable";

const DEFAULT_SPACING: DividerSpacing = "compact";

const styles = tv({
  base: "mt-0 block h-px w-full border-0",
  variants: {
    /**
     * Colour follows the background the divider sits on, resolved from the
     * theme the same way the accordion does (`useTheme()`).
     * Light: #cccccc. Dark: #555555 — the only `--pl-divider-*` token carrying
     * that value, despite its "secondary" name.
     */
    mode: {
      light: "bg-pl-divider-color-primary",
      dark: "bg-pl-divider-color-secondary-contrast",
    },
    /** Spacing below the rule. */
    spacing: {
      none: "mb-0",
      compact: "mb-6", // 24px
      comfortable: "mb-8", // 32px
    },
  },
});

function toSpacing(value: string | null | undefined): DividerSpacing {
  return value === "none" || value === "comfortable" ? value : DEFAULT_SPACING;
}

/**
 * The red gradient counts as a dark theme, but the dark rule is a grey barely
 * separable from the red behind it — so red sections take the light rule.
 * Themes the context can't name (`custom`) fall back to the resolved mode.
 */
function toRuleMode(theme: Themes | null, mode: ComponentTheme) {
  if (theme === "theme-red-gradient") {
    return "light";
  }
  return mode === ComponentTheme.dark ? "dark" : "light";
}

export function HorizontalRuleContentDividerComponent({
  content,
}: OptiComponentProps<typeof HorizontalRuleContentDividerComponentType>) {
  const { theme, mode } = useTheme();

  if (!content) {
    return null;
  }

  return (
    <hr
      className={styles({
        mode: toRuleMode(theme, mode),
        spacing: toSpacing(content.spacing),
      })}
    />
  );
}
