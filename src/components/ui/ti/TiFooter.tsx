import Script from "next/script";
import { headerContentBase } from "./TIScriptConstants";

export function TiFooter({ locale }: { locale: string }) {
  const base = headerContentBase(locale);
  return (
    <>
      <Script src={`${base}/js/footer.js`} />
      <div
        id="tiFooter"

      />
    </>
  );
}
