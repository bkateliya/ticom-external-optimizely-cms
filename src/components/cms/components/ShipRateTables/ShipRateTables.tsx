import { getLocale, getTranslations } from "next-intl/server";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { ShipRateTablesComponentType } from "./ShipRateTables.model";
import { ShipRateTablesInteractive } from "./ShipRateTablesInteractive";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";

export async function ShipRateTablesComponent({
  content,
}: OptiComponentProps<typeof ShipRateTablesComponentType>) {
  if (!content) {
    return null;
  }

  const t = await getTranslations();
  const locale = await getLocale();
  const domain = SERVER_ENV_VARS.TICOM_BASE_DOMAIN;

  return (
    <ShipRateTablesInteractive
      locale={locale}
      labels={{
        search: t("shipRateTables:search"),
        paymentOptions: t("shipRateTables:paymentOptions"),
        shippingAndTax: t("shipRateTables:shippingAndTax"),
        currency: t("shipRateTables:currency"),
        paymentMethods: t("shipRateTables:paymentMethods"),
        incoterms: t("shipRateTables:incoterms"),
        vat: t("shipRateTables:vat"),
        freightCarrier: t("shipRateTables:freightCarrier"),
        serviceLevel: t("shipRateTables:serviceLevel"),
        totalQuantity: t("shipRateTables:totalQuantity"),
        shippingCost: t("shipRateTables:shippingCost"),
      }}
      domain={domain}
    />
  );
}
