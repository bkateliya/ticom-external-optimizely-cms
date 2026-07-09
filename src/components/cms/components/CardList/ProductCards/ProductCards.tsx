import { ProductCardsComponentType } from "./ProductCards.model";
import { getProducts } from "@/lib/api/product-api";
import { OptiCardComponentProps } from "../CardList";
import Image from "next/image";
import { HeadingField } from "@/components/ui/cms/HeadingField";
import { Heading } from "./Heading";

export async function ProductCardsComponent({
  content,
  columnCount,
}: OptiCardComponentProps<typeof ProductCardsComponentType>) {
  if (!content) {
    return null;
  }

  const products = await getProducts();
  if (!products) {
    return null;
  }
  const filteredProducts = products.filter(
    (product) =>
      (!content.currency ||
        content.currency === "ALL" ||
        product.currency === content.currency) &&
      (content.isNew === "ALL" ||
        (content.isNew === "TRUE" && product.newFlag) ||
        (content.isNew === "FALSE" && !product.newFlag)),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: "1rem",
      }}
    >
      {filteredProducts.map((product) => (
        <div key={product.id}>
            {/* <HeadingField field="familyName" /> */}
          <Heading>{product.familyName}</Heading>
          <p>{product.genericPartNumber}</p>
          <p>
            {product.approximatePrice} {product.currency}
          </p>
          <Image
            src={product.partImageUrl}
            alt={product.altText}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
}
