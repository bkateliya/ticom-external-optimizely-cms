"use client";

import { useCallback, useEffect, useState } from "react";
import {
  TiSearchComboList,
  TiSearchComboListSelectEventDetail,
  TiSearchComboListSuggestion,
} from "@/components/ui/ti/TiSearchComboList/TiSearchComboList";
import { CustomEventHandler } from "@/components/ui/ti/Common/events";
import { WsResponse } from "./types";

// Some shipping destinations aren't served by this tool — matches the original
// AEM `shipRateTables.js` exclusion list.
const EXCLUDED_COUNTRY_CODES = ["MD", "KZ", "KG", "AM", "AZ", "TM", "TJ", "UZ"];

export interface ShipRateTablesLabels {
  search: string;
  paymentOptions: string;
  shippingAndTax: string;
  currency: string;
  paymentMethods: string;
  incoterms: string;
  vat: string;
  freightCarrier: string;
  serviceLevel: string;
  totalQuantity: string;
  shippingCost: string;
}

export interface ShipRateTablesInteractiveProps {
  /** App URL locale slug, e.g. "en-us" — passed down from the server component. */
  locale: string;
  labels: ShipRateTablesLabels;
  domain: string;
}

export function ShipRateTablesInteractive({
  locale,
  labels,
  domain,
}: ShipRateTablesInteractiveProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [data, setData] = useState<WsResponse | null>(null);
  const [suggestionList, setSuggestionList] = useState<
    readonly TiSearchComboListSuggestion[]
  >([]);

  // `window.com.TI.ShipToList` is provided by header-components and may not be
  // ready immediately. If not, wait for header-components to emit its appload
  // event and try again.
  useEffect(() => {
    function loadShipToList() {
      setSuggestionList(
        window
          .com!.TI.ShipToList.filter(
            (c) => !EXCLUDED_COUNTRY_CODES.includes(c.countryCode),
          )
          .map((c) => ({ key: c.countryCode, label: c.countryName })),
      );
    }

    if (window.com?.TI.ShipToList) {
      loadShipToList();
      return;
    }

    function handleAppload(event: AppLoadEvent) {
      if (event.detail.namespace === "header-components") {
        loadShipToList();
      }
    }

    window.addEventListener("appload", handleAppload);
    return () => window.removeEventListener("appload", handleAppload);
  }, []);

  const handleSelect: CustomEventHandler<TiSearchComboListSelectEventDetail> =
    useCallback((event) => {
      const value = event.detail?.value;
      setSelectedCountry(value ?? null);
    }, []);

  // Fetch ship rates when selected country changes
  useEffect(() => {
    if (selectedCountry == null) {
      return;
    }
    const controller = new AbortController();
    const requestedCountry = selectedCountry;
    fetch(
      `${domain}/sharedservice/api/storeinfo?${new URLSearchParams({ locale, shipTo: requestedCountry })}`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((json: WsResponse) => {
        if (requestedCountry !== selectedCountry) {
          return;
        }
        setData(json);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });
    return () => controller.abort();
  }, [selectedCountry, locale, domain]);

  return (
    <div id="ship-rate-tables">
      <TiSearchComboList
        className="mb-8 mx-auto w-[292px]"
        suggestionList={suggestionList}
        value=""
        placeholder={labels.search}
        tiSearchComboListSelect={handleSelect}
      />
      {data && <pre>{JSON.stringify(data, undefined, 2)}</pre>}
    </div>
  );
}
