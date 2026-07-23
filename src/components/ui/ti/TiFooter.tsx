import Script from "next/script";
import { TICOM } from "./TIScriptConstants";

export function TiFooter() {
  return (
    <>
      <Script src={`${TICOM}/header-content/1.latest/en/js/footer.js`} />
      <div
        id="tiFooter"

      />
    </>
  );
}
