// This is in separate file so it can be imported from either client or server

// TODO figure out how to dynamically swap this

// const TICOM = "https://www.ti.com/assets/js/@ticom";
export const TICOM = "https://www-int.itg.ti.com/assets/js/@ticom"

export const MODULE_BUNDLES = [
  `${TICOM}/ui-components/3.latest/ui-components.esm.js`,
  `${TICOM}/header-components/3.latest/header-components.esm.js`,
  `${TICOM}/feature-components/2.4.18/feature-components.esm.js`,
  `${TICOM}/selection-tool-components/1.latest/selection-tool-components.esm.js`,
  `${TICOM}/personalization-components/0.0.41/personalization-components.esm.js`,
];

export const CONTENT_SCRIPTS = [
  `${TICOM}/header-content/1.latest/en/js/header-responsive.js`,
  // Loading this script causes the footer to load even if footer is not present on page
  // `${TICOM}/header-content/1.latest/en/js/footer.js`,
];
