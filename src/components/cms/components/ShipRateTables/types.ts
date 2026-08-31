export interface Country {
  countryCode: string;
  countryName: string;
}

export interface CarrierOption {
  name: string;
}

export interface PaymentSection {
  name: string;
}

export interface Incoterm {
  name: string;
  shortName: string;
}

export interface TaxSection {
  rate: readonly string[];
  type: string;
}

export interface Cost {
  tierQtyLower: number;
  tierQtyUpper: number;
  cost: number;
}

export interface TiFreight {
  deliveryMethod: string;
  cost: readonly Cost[];
}

export interface DeliveryCost {
  customerFreightAvailable: boolean;
  tiFreight?: readonly TiFreight[];
}

export interface OrderingInfo {
  carrierOptions: readonly CarrierOption[];
  currency: string;
  incoterm: readonly Incoterm[] | [null];
  paymentSection: readonly PaymentSection[];
  taxSection: TaxSection;
  deliveryCost: DeliveryCost;
}

export interface WsResponse {
  locale: string;
  orderingInfos: readonly OrderingInfo[];
  shipTo: string;
}
