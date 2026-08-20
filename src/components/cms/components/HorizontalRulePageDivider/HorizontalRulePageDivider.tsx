"use client";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { ComponentTheme } from "@/components/ui/ti/enums";

export function HorizontalRulePageDividerComponent() {
  const { mode } = useTheme();

  return (
    <hr
      className={`block h-px w-full border-0 ${
        mode === ComponentTheme.dark
          ? "bg-pl-border-color-secondary" // #333333
          : "bg-pl-divider-color-secondary" // #e8e8e8
      }`}
    />
  );
}
