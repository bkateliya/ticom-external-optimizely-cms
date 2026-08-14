import { getContextData } from "@optimizely/cms-sdk/react/server";
import { FeaturedProductsPartNumberInformation, getFeaturedProducts } from "@/lib/api/cms-api";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { NewProductsCardListComponentType } from "./NewProductsCardList.model";
import { TiCard } from "@/components/ui/ti/TiCard/TiCard";
import { TiImage } from "@/components/ui/ti/TiImages/TiImage/TiImage";
import { TiProductStatus } from "@/components/ui/ti/TiProductStatus/TiProductStatus";
import { TiCarousel } from "@/components/ui/ti/TiCarousel/TiCarousel";
import { getLocale, getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/constants/locales";
import { tv } from "tailwind-variants";
import { SHARED_ENV_VARS } from "@/lib/env/shared-env";
import { TiSvgIcon } from "@/components/ui/ti/TiSvgIcon";

function getNewProductsUrl( locale: string ) {
  if(!locale) locale = DEFAULT_LOCALE;
  locale = locale.toLowerCase();
  const domain =
    ( locale === 'zh-cn' )
    ? SHARED_ENV_VARS.NEXT_PUBLIC_TICOM_BASE_DOMAIN // TODO: Chinese domain
    : SHARED_ENV_VARS.NEXT_PUBLIC_TICOM_BASE_DOMAIN;
  if( locale === 'en-us' ) return `${domain}/product-category/new-products.html?releasePeriod=364`;
  else return `${domain}/${encodeURIComponent(locale)}/product-category/new-products.html?releasePeriod=364`;
}

interface NewProductsCardProps {
  product: FeaturedProductsPartNumberInformation;
  locale: string;
  hasFamily: boolean;
}
async function NewProductsCard({ product, locale, hasFamily }: NewProductsCardProps) {
  const t = await getTranslations({locale});
  const tv = TAILWIND_VARIANTS();

  const newProductsUrl = getNewProductsUrl(locale);
  const altText = product.partImageAvailable ? 'TODO: fetch alt text from DAM' : 'TI chip';

  const familyLink = (
    <div className={tv.familyContainer()}>
      <a href={product.selectionToolUrl}
        className={tv.family()}
        data-navtitle="learn-more">
        {product.familyName}
      </a>
    </div>
  );

  const newBadge = product.newFlag ? (
    <a className={tv.newBadge()} href={newProductsUrl} target="_blank" data-lid="newproducts-view-products">
      {t("New product")}
    </a>
  ) : <></>;

  const image = (
    <TiImage
      className={tv.image()}
      ratio="rectangle"
      href={product.gpnUrl}
      alt={altText}
      src={product.partImageUrl}
      srcDefault="https://www.ti.com/content/dam/ticom/images/products/package/generic-chip.jpg"
    />
  );

  return (
    <div className={tv.cardContainer()}>
      <TiCard className={tv.card()} appearance={hasFamily ? 'plain-white' : 'outlined-white'} dataLid="newproducts-view-products">
        <a href={product.gpnUrl} slot="card-link" data-navtitle={product.genericPartNumber}>
          {product.genericPartNumber}
        </a>
        <div className={tv.content()}>
          {!hasFamily ? familyLink : <></>}
        </div>
        <div className={tv.imageArea()}>
          {hasFamily ? newBadge : <></>}
          {image}
        </div>
        <div className={tv.details()}>
          <div className={tv.status()}>
            {!hasFamily ? newBadge : <></>}
            <TiProductStatus
              compact={true}
              status={product.marketingStatusId}
              tooltip={product.marketingStatusDescription}
              dataLid="status_badge"
            >
              <a href={t("https://www.ti.com/support-quality/quality-policies-procedures/product-life-cycle.html")} target="_blank">
                {product.marketingStatus}
              </a>
            </TiProductStatus>
          </div>
          <div className={tv.name()}>
            <a className={tv.nameLink()} href={product.gpnUrl} data-navtitle="learn-more">
              {product.genericPartNumber}
            </a>
          </div>
          <p className={tv.description()}>
            {product.deviceDescription}
          </p>
          {product.approximatePrice
          ? (
            <p className={tv.price()}>
              {t("Approx. price")} (<span className="js-currency">{product.currency}</span>)
              <span className={tv.priceVal()}>
                {product.displayQuantity} |
                <span orig-price={product.approximatePrice} className="js-price">
                  {product.approximatePrice}
                </span>
              </span>
            </p>
          ) : <></>}
        </div>
      </TiCard>
    </div>
  );
}

export async function NewProductsCardListComponent({}: OptiComponentProps<typeof NewProductsCardListComponentType>) {
  const locale = await getLocale();
  const t = await getTranslations({locale});
  const tv = TAILWIND_VARIANTS();
  const familyId = getContextData("productFamily")?.familyId;
  const hasFamily = !!familyId && !isNaN(+familyId);
  const { featuredProductInfo } = await getFeaturedProducts({ language: locale, familyId: hasFamily ? +familyId : null });
  if( !featuredProductInfo.partNumberInformation || featuredProductInfo.partNumberInformation.length === 0 ) {
    return <></>;
  }
  const featuredProducts =
    await Promise.all( featuredProductInfo.partNumberInformation.map((product, i) => <NewProductsCard key={`featuredproduct-${i}`} product={product} hasFamily={hasFamily} locale={locale} />));
  return (
    <div>
      <div className={tv.headingRow()}>
        <h2 className={tv.heading()}>
          {t(hasFamily ? "New products" : "Whats new")}
        </h2>
        <a className={tv.ctaLink()} href={getNewProductsUrl(locale)}>
          {hasFamily ? (
            <>
              <TiSvgIcon icon="parametric-filter" size="s" iconStyle="secondary"/>
              {' '}
            </>
          ) : <></>}
          {t("View all new products")}
        </a>
      </div>
      <div className={tv.carouselWrapper()}>
        <TiCarousel
          className={tv.carousel()}
          gap="large"
          navigation="below"
          slides={featuredProducts.map(featuredProduct => ({ content: featuredProduct }))}
        />
      </div>
    </div>
  );
}

const TAILWIND_VARIANTS = tv({
  slots: {
    headingRow: [
      'flex',
      'justify-between',
      'items-center',
      'mb-4'
    ],
    heading: [
      'mb-0'
    ],
    ctaIcon: [
      'mr-1'
    ],
    ctaLink: [
      'text-sm',
      'text-(--pl-link-color-primary)'
    ],
    carouselWrapper: [],
    carousel: [],
    cardContainer: [
      'flex',
      'flex-col',
      'w-full',
      'h-full',
      'box-border',
      'py-6'
    ],
    card: [],
    content: [],
    imageArea: [],
    image: [
      'mb-6',
      'max-w-[164px]',
    ],
    familyContainer: [
      'border-b',
      'pb-3',
      'mb-6',
      'border-(--pl-border-color-tertiary)'
    ],
    family: [
      'inline-block',
      'text-xs',
      'font-normal',
      'mb-0',
      'uppercase',
      'text-(--pl-text-color-primary)'
    ],
    status: [
      'flex',
      'justify-start',
      'items-center',
      'gap-2',
      'mb-3'
    ],
    details: [],
    description: [
      'text-md',
      'mb-8',
      'text-(--pl-link-color-secondary)'
    ],
    price: [
      'font-normal',
      'text-sm'
    ],
    priceVal: [],
    newBadge: [
      'inline-block',
      'uppercase',
      'text-xs',
      'font-semibold',
      'text-(--pl-link-color-accent)'
    ],
    name: [
      'mb-3',
      'font-normal',
      'text-2xl'
    ],
    nameLink: [
      'text-(--pl-link-color-secondary)'
    ]
  }
});
