import { ALL_THEMES, Themes } from "@/lib/themes";
import { tv } from "tailwind-variants";

export function ThemeSettingToggle({
  allowThemeSwitching,
  setAllowThemeSwitching,
}: {
  allowThemeSwitching: boolean;
  setAllowThemeSwitching: (allowThemeSwitching: boolean) => void;
}) {
  const { brandSelector, checkboxWrap } = style();
  return (
    <div
      className={brandSelector()}
      style={{
        border: "4px solid transparent",
        borderImage: `linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      indigo,
      violet
    )`,
        borderImageSlice: 1,
      }}
    >
      <div className={checkboxWrap()}>
        <input
          type="checkbox"
          id="allow-theme-switching"
          name="allow-theme-switching"
          checked={allowThemeSwitching}
          onChange={(e) => setAllowThemeSwitching(e.target.checked)}
        />
        <label htmlFor="allow-theme-switching">
          Allow component theme switching
        </label>
      </div>
    </div>
  );
}

export function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
}: {
  selectedTheme: Themes | undefined;
  setSelectedTheme: (theme: Themes) => void;
}) {
  const { themeSelector, selectWrap } = style();
  return (
    <div
      className={themeSelector()}
      style={{
        border: "4px solid transparent",
        borderImage: `linear-gradient(
        to right,
        red,
        orange,
        yellow,
        green,
        blue,
        indigo,
        violet
      )`,
        borderImageSlice: 1,
      }}
    >
      <div className={selectWrap()}>
        <label htmlFor="theme-selector">Select a component theme:</label>
        <select
          id="theme-selector"
          name="theme-selector"
          onChange={(e) => setSelectedTheme(e.target.value as Themes)}
          value={selectedTheme}
        >
          <option value=""> -- Default -- </option>
          {ALL_THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const style = tv({
  slots: {
    brandSelector: "flex flex-col items-center gap-2",
    themeSelector: "flex flex-col items-center gap-2",
    checkboxWrap: "flex flex-col items-center gap-2",
    selectWrap: "flex flex-col items-center gap-2",
    checkbox: "w-4 h-4",
    checkboxLabel: "text-sm font-medium",
    checkboxInput: "w-4 h-4",
    checkboxInputLabel: "text-sm font-medium",
    checkboxInputInput: "w-4 h-4",
    checkboxInputInputLabel: "text-sm font-medium",
  },
});
