"use client";
// Global
// import { SiteName, BRAND_MAPPING } from "@/lib/constants/brand-theme-site";
import {
  createContext,
  HTMLAttributes,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { ALL_THEMES, Themes } from "@/lib/themes";
import { ThemeSetting, DefaultTheme } from "./consts";
import clsx from "clsx";
import style from "./BrandAndThemeContext.module.css";
import { ThemeSelector, ThemeSettingToggle } from "./BrandSelector";

import { ComponentTheme } from "@/components/ui/ti/enums";

function getModeFromTheme(theme: Themes | undefined | 'custom'): ComponentTheme {
  if (theme === 'theme-tertiary' || theme === 'theme-accent') {
    return ComponentTheme.dark;
  }
  return ComponentTheme.light;
}

export const ThemeContext = createContext<ThemeSetting>({
  theme: DefaultTheme,
  mode: getModeFromTheme(DefaultTheme),
  // isReversed: "",
  allowThemeSwitching: false,
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

type ThemeProviderProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /**
   * Optional. The theme to use. Will fallback to the parent theme or the first theme if not provided .
   */
  theme?: Themes | 'custom';
  /** Optional.  Light or Dark mode.  This is usually determined by the theme. */
  mode?: ComponentTheme;
  /**
   * Optional. Whether to apply the brand and theme to the body element instead.
   * Note: other attributes will be ignored if this is set
   */
  applyToBody?: boolean;
};

const ALLOW_THEME_SWITCHING =
  process.env.NEXT_PUBLIC_ALLOW_THEME_SWITCHING === "true";

export const ThemeProvider = ({
  children,
  theme,
  mode,
  applyToBody,
  ...props
}: ThemeProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>();
  const [allowThemeSwitching, setAllowThemeSwitching] = useState<boolean>();
  const parentTheme = useContext(ThemeContext);

  const effectiveTheme =
    selectedTheme || theme || parentTheme.theme || DefaultTheme;
  const effectiveAllowThemeSwitching =
    allowThemeSwitching ?? parentTheme.allowThemeSwitching ?? false;

  const effectiveMode = mode ?? getModeFromTheme(effectiveTheme);
  const themeSetting: ThemeSetting = {
    theme: effectiveTheme === 'custom' ? null : effectiveTheme,
    mode: effectiveMode,
    isReversed: effectiveMode === "dark",
    allowThemeSwitching: effectiveAllowThemeSwitching,
  };

  // Use LayoutEffect to ensure the body classes are applied immediately after the component is mounted
  useLayoutEffect(() => {
    if (applyToBody) {
      // Clear out other themes in case of theme switching
      document.body.classList.remove(...ALL_THEMES);
      document.body.classList.add(
        ...[
          "theme-root",
          themeSetting.theme || `mode-${themeSetting.mode}`,
          style.themeRoot,
        ].filter(Boolean),
      );
    }
  }, [applyToBody, themeSetting.theme]);

  if (applyToBody) {
    // Don't render an additional div if we're applying to the body
    return (
      <ThemeContext.Provider value={themeSetting}>
        {ALLOW_THEME_SWITCHING && (
          <ThemeSettingToggle
            allowThemeSwitching={allowThemeSwitching ?? false}
            setAllowThemeSwitching={setAllowThemeSwitching}
          />
        )}
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeSetting}>
      {effectiveAllowThemeSwitching && (
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      )}
      <div
        {...props}
        className={clsx(
          props.className,
          "theme-root",
          themeSetting.theme || `mode-${themeSetting.mode}`,
          style.themeRoot,
          "text-text-default",
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider >
  );
};
