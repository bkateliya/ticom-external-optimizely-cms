import { getContext } from "@optimizely/cms-sdk/react/server";
import Script from "next/script";

export function TiHeader2() {
  const { locale } = getContext() ?? {};
  return (
    <>
      <header
        id="tiResponsiveHeader"
        data-language={locale}
        className="ti_p-responsiveHeader"
      ></header>

      {/* <Script
        type="module"
        defer
        src="/proxy/assets/js/@ticom/header-components/3.latest/header-components.esm.js"
      /> */}

      {/* <Script
        noModule
        defer
        src="/proxy/assets/js/@ticom/header-components/3.latest/header-components.js"
      />

      <Script
        defer
        src="/proxy/assets/js/@ticom/header-content/1.latest/en/js/header-responsive.js"
      /> */}
    </>
  );
}
