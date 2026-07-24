import { Themes } from "@/lib/themes";

import { ComponentTheme } from "@/components/ui/ti/enums";

export interface ThemeSetting {
  theme: Themes | null;
  mode: ComponentTheme;
  isReversed?: boolean;
  allowThemeSwitching: boolean;
}

export const DefaultTheme: Themes = "theme-primary";
