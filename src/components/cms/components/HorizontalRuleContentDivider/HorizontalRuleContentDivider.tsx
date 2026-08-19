"use client";
import { tv } from "tailwind-variants";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { ComponentTheme } from "@/components/ui/ti/enums";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { Themes } from "@/lib/themes";

import { HorizontalRuleContentDividerComponentType } from "@/components/cms/components/HorizontalRuleContentDivider/HorizontalRuleContentDivider.model";



type DividerSpacing = "none" | "compact" | "comfortable";

const DEFAULT_SPACING: DividerSpacing = "compact";

const styles = tv({
  base: "block h-px w-full border-0",
  variants: {
    mode: {
      light: "bg-pl-divider-color-primary",
      dark: "bg-pl-divider-color-secondary-contrast",
    },
    /** Spacing below the rule. */
    spacing: {
      none: "m-0",
      compact: "my-6", // 24px
      comfortable: "my-8", // 32px
    },
  },
});

function toSpacing(value: string | null | undefined): DividerSpacing {
  return value === "none" || value === "comfortable" ? value : DEFAULT_SPACING;
}

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
