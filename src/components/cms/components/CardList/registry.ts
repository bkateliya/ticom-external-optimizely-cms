
import { CardListComponentType } from "./CardList.model";
import { CardListComponent } from "./CardList";
import { ProductCardsComponentType } from "./ProductCards/ProductCards.model";
import { GeneralCard, GeneralCardsComponent } from "./GeneralCards/GeneralCards";
import { ProductCardsComponent } from "./ProductCards/ProductCards";
import { SingleGeneralCardComponentType, GeneralCardsComponentType } from "./GeneralCards/GeneralCards.model";
import { ComponentRegistry } from "@/lib/ts/component-props";

export const cardListComponentRegistry: ComponentRegistry = {
  [CardListComponentType.key]: CardListComponent,
  [ProductCardsComponentType.key]: ProductCardsComponent,
  [GeneralCardsComponentType.key]: GeneralCardsComponent,
  [SingleGeneralCardComponentType.key]: GeneralCard,
};
