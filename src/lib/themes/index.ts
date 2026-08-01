export const ALL_THEME_NAMES = {
  "theme-white": "White",
  "theme-grey": "Grey",
  "theme-dark-grey": "Dark grey",
  "theme-black": "Black",
  "theme-red-gradient": "Red gradient",
}

export type Themes = keyof typeof ALL_THEME_NAMES;

export const ALL_THEMES = Object.keys(ALL_THEME_NAMES) as Themes[];
