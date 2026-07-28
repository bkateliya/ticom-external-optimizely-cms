import localFont from "next/font/local";

/**
 * Roboto — self-hosted.
 *
 * Mirrors ti.com's legacy `global-css` font.css (delivered as
 * `optimizely-font.css` by Kayin McLeod, 2026-07-22). Two things from that
 * hand-off are deliberate and must not be "cleaned up":
 *
 *  1. NOT loaded from the Google CDN. It has been blocked by the Great
 *     Firewall in the past, so the files are served from our own origin.
 *
 *  2. Weight 600 points at the Roboto *Medium (500)* file. TI's design
 *     standard for "bold" is Roboto 500, but CJK (Chinese/Japanese/Korean)
 *     fonts expect 600 to render as bold. Defining 600 against the 500 file
 *     satisfies both.
 *
 * Deviation from the legacy CSS: it also listed `.woff` fallbacks and
 * `local()` sources. Neither is expressible here — `next/font/local` emits
 * exactly one file and one format per `@font-face` and rejects `src`
 * overrides in `declarations`. woff2 is supported by every browser Next 16
 * targets, so the `.woff` files are intentionally not shipped.
 *
 * `display: "swap"` and `adjustFontFallback: "Arial"` are the next/font
 * defaults; both are stated explicitly because the legacy CSS declared
 * `font-display: swap` and the ti.com stack falls back to Arial-like faces.
 */
export const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  // Matches the ti.com font stack (see the ti-portfolio-viewer rule in
  // assets/hydration.css) so fallback rendering lines up with legacy pages.
  fallback: [
    "Helvetica Neue",
    "Arial Nova",
    "Nimbus Sans",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial",
  src: [
    // Thin: 100
    {
      path: "./roboto-v20-latin-ext_latin-100.woff2",
      weight: "100",
      style: "normal",
    },
    // Light: 300
    {
      path: "./roboto-v20-latin-ext_latin_greek-300.woff2",
      weight: "300",
      style: "normal",
    },
    // Regular: 400
    {
      path: "./roboto-v20-latin-ext_latin_greek-regular.woff2",
      weight: "400",
      style: "normal",
    },

    // Bold: 600 — deliberately the Medium (500) file, see note 2 above.
    {
      path: "./roboto-v20-latin-ext_latin_greek-500.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const supportedFonts = [roboto];
