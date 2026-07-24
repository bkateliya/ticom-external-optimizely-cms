import "@/app/instrumentation";
import "@/lib/opti/opti-init";

import { roboto } from "@/assets/fonts/index";
import { DefaultTheme } from "@/components/ui/context/BrandAndTheme/consts";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { NextIntlClientProvider } from "next-intl";

import { GLOBAL_HEADER_CSS } from "@/components/ui/ti/TIScriptConstants";
import { TiHeader } from "@/components/ui/ti/TiHeader";
import { TiFooter } from "@/components/ui/ti/TiFooter";
import { TiScripts } from "@/components/ui/ti/TiScripts";
import { TiLanguageSync } from "@/components/ui/ti/TiLanguageSync";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";

import clsx from "clsx";
import "@/assets/app.css";

export async function RootLayout({
  children,
  locale
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href={GLOBAL_HEADER_CSS} />
        {/*
          TI's header/footer scripts reject internally with opaque cross-origin
          resource Events (currency/login/cart XHRs, fonts, lazy chunks). They're
          harmless, but Next's dev overlay surfaces them as "[object Event]".
          This runs during HTML parse — before Next registers its own
          unhandledrejection handler — so stopImmediatePropagation() suppresses
          only those Event-reason rejections while real errors pass through.
        */}
        {/* <link type="text/css" href="https://www.ti.com/assets/style/ticom.global.portals.css" rel="stylesheet" /> */}
      </head>
      <body className={clsx(roboto.variable, DefaultTheme)}>
        <div className="w-full overflow-hidden">
          <ThemeProvider theme={DefaultTheme} applyToBody={true}>
            {/* TI front-end scripts — web-component bundles + header/footer init,
              loaded once for the whole page (see TiScripts). */}
            <TiScripts locale={locale} />
            <NextIntlClientProvider>
              {/* Keep the header's language selector in sync with app routing. */}
              <TiLanguageSync />
              {/* Hero is hard-coded as H1 so others should start at H2  */}
              <HeadingLevelContext headingLevel={2}>{children}</HeadingLevelContext>
            </NextIntlClientProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
