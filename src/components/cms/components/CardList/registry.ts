import { CardListComponentType } from "./CardList.model";
import { CardListComponent } from "./CardList";
import { ProductCardsComponentType } from "./ProductCards/ProductCards.model";
import { MixedCardList } from "./MixedCardList/MixedCardList";
import { ProductCardsComponent } from "./ProductCards/ProductCards";
import { MixedCardListComponentType } from "./MixedCardList/MixedCardList.model";
import { ComponentRegistry } from "@/lib/ts/component-props";
import { NewProductsCardListComponent } from "../NewProductsCardList/NewProductsCardList";
import { NewProductsCardListComponentType } from "../NewProductsCardList/NewProductsCardList.model";
import { AuthoredCardComponent } from "./AuthoredCard/AuthoredCard";
import { AuthoredCardComponentType } from "./AuthoredCard/AuthoredCard.model";

export const cardListComponentRegistry: ComponentRegistry = {
  [CardListComponentType.key]: CardListComponent,
  [NewProductsCardListComponentType.key]: NewProductsCardListComponent,
  [ProductCardsComponentType.key]: ProductCardsComponent,
  [MixedCardListComponentType.key]: MixedCardList,
  [AuthoredCardComponentType.key]: AuthoredCardComponent,
};
