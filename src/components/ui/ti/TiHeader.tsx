export function TiHeader({ locale }: { locale: string; }) {
  return (
    <>
      {/* <link rel="stylesheet" href="https://www.ti.com/assets/fonts/font.css" /> */}
      <link
        rel="stylesheet"
        href="https://www.ti.com/assets/js/@ticom/header-content/1.latest/style/ticom.global.header.css"
      />

      {/*
        The header menu is wired up by header-responsive.js, loaded (with the
        web-component bundles and the DOMContentLoaded ßre-dispatch that runs its
        init) in <TiScripts /> from the root layout.
      */}

      <header
        id="tiResponsiveHeader"
        data-language={locale}
        className="ti_p-responsiveHeader"

      />
    </>
  );
}
