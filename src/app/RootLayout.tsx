import "@/app/instrumentation";
import "@/lib/opti/opti-init";

import { connection } from "next/server";
import { roboto } from "@/assets/fonts/index";
import { DefaultTheme } from "@/components/ui/context/BrandAndTheme/consts";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import { NextIntlClientProvider } from "next-intl";
import {
  GLOBAL_HEADER_CSS,
  MODULE_BUNDLES,
  contentScripts,
} from "@/components/ui/ti/TIScriptConstants";
import { TiScripts } from "@/components/ui/ti/TiScripts";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";

import clsx from "clsx";
import "@/assets/app.css";
import { JsonLdSchema } from "@/components/ui/Atoms/JsonLd";

export async function RootLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  // Opts this layout (and every route using it) into per-request rendering, so
  // the server-only env vars read below (TICOM_BASE_DOMAIN, ALLOW_THEME_SWITCHING)
  // are resolved at runtime rather than frozen by prerender. This is required as
  // TI's build-once-deploy-anywhere architecture can't bake different NEXT_PUBLIC_
  // values into artifacts for different environments, there is only one artifact
  // for all environments.
  await connection();

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
        <JsonLdSchema
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Texas Instruments",
            url: "https://www.ti.com",
            logo: "https://www.ti.com/images/ti-logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-972-995-2011",
              contactType: "customer support",
            },
            sameAs: [
              "https://www.linkedin.com/company/texas-instruments",
              "https://twitter.com/TXInstruments",
              "https://www.youtube.com/user/texasinstruments",
            ],
          }}
        />
      </head>
      <body className={clsx(roboto.variable, DefaultTheme)}>
        <div className="w-full">
          <ThemeProvider
            theme={DefaultTheme}
            applyToBody={true}
            themeSwitchingEnabled={SERVER_ENV_VARS.ALLOW_THEME_SWITCHING}
          >
            {/* TI front-end scripts — web-component bundles + header/footer init,
              loaded once for the whole page (see TiScripts). */}
            <TiScripts
              locale={locale}
              moduleBundles={MODULE_BUNDLES}
              contentScriptUrls={contentScripts(locale)}
            />
            <NextIntlClientProvider>
              {/* Hero is hard-coded as H1 so others should start at H2  */}
              <HeadingLevelContext headingLevel={2}>
                {children}
              </HeadingLevelContext>
            </NextIntlClientProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
