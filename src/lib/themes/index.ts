export const ALL_THEME_NAMES = {
  "theme-primary": "Primary",
  "theme-secondary": "Secondary",
  "theme-tertiary": "Tertiary",
  "theme-accent": "Accent",
}

export type Themes = keyof typeof ALL_THEME_NAMES;

export const ALL_THEMES = Object.keys(ALL_THEME_NAMES) as Themes[];
