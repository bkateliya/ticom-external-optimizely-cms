import { Themes } from "@/lib/themes";

export type ThemeMode = 'dark' | 'light';
export interface ThemeSetting {
  theme: Themes | null;
  mode: ThemeMode;
  isReversed?: boolean;
  allowThemeSwitching: boolean;
}

export const DefaultTheme: Themes = "theme-primary";
