import { Incoterm, TaxSection } from "./types";

export function formatIncoterm(incoterm: Incoterm | null): string {
  if (incoterm === null) return '';
  return `${incoterm.name} (${incoterm.shortName})`;
}

export function formatTaxSection(ts: TaxSection): string {
  if (ts.rate.length > 0) {
    return `${ts.rate[0]}%`;
  }
  return ts.type;
}


export function formatCurrency(value: number, currency: string, locale: string): string {
  if (!window.com) {
    return "";
  }
  const result = window.com.TI.CurrencyFormat.format(value, false, currency, locale);
  return result.replace(/\.0+$/, "");
}

export function formatQtyThousands(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
