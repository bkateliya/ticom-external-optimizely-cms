import localFont from "next/font/local";

export const roboto = localFont({
  variable: "--font-roboto",
  src: [
    // Thin
    {
      path: "./roboto-v20-latin-ext_latin-100.woff2",
      weight: "100",
      style: "normal",
    },

    {
      path: "./roboto-v20-latin-ext_latin_greek-300.woff2",
      weight: "300",
      style: "normal",
    },
    // Regular
    {
      path: "./roboto-v20-latin-ext_latin_greek-regular.woff2",
      weight: "400",
      style: "normal",
    },
    // Bold
    {
      path: "./roboto-v20-latin-ext_latin_greek-500.woff2",
      weight: "600",
      style: "normal",
    },

    // Old bold, should no longer be needed.
    // {
    //   path: "./roboto-v20-latin-ext_latin_greek-500.woff2",
    //   weight: "500",
    //   style: "normal",
    // },
  ],
});

export const supportedFonts = [roboto];
