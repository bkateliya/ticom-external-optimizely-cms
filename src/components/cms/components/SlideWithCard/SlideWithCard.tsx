import { SlideWithCardComponentType } from "./SlideWithCard.model";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { getBynderImageFromContext } from "@/lib/data/bynder";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { tv } from "tailwind-variants";
import clsx from "clsx";

export function SlideWithCardComponent({
  content,
}: OptiComponentProps<typeof SlideWithCardComponentType>) {
  if (!content) {
    return null;
  }

  const { WrappedHeadingTextField, WrappedRichTextField } =
    fieldFactory<typeof SlideWithCardComponentType>(content);

  const backgroundImage = getBynderImageFromContext(content.backgroundImage);

  // Same href as the visible CTA — makes the whole card a click target, matching
  // the live site's invisible `ti_p-slideContent-linkWrapper` overlay. Hidden
  // from assistive tech so the visible CTA stays the one announced/focusable link.
  const cta = normalizeGenericContentToTyped(
    content.ctaLink,
    CtaLinkElementType,
  );
  const href = cta ? normalizeUrl(cta.link?.url?.default ?? "") : null;

  const { card, linkWrapper, content: cardContent, inner, cta: ctaSlot } =
    slideWithCard({
      innerCardWidth: content.innerCardWidth as "50" | "fixed358" | undefined,
    });

  return (
    <ti-slide
      className={clsx(
        !content.showOverlayBackground &&
          "[--tiSlide-overlay-background-color-rgb:transparent]",
      )}
      background-image-src={backgroundImage?.transformBaseUrl}
    >
      <div className={card()}>
        {href && (
          <a
            href={href}
            aria-hidden="true"
            tabIndex={-1}
            className={linkWrapper()}
          />
        )}
        <div className={cardContent()}>
          <div className={inner()}>
            <WrappedHeadingTextField field="headline" headingSize={5} />
            <WrappedRichTextField
              field="description"
              className="mb-6 text-body-md [&_ul]:ms-5 [&_ol]:ms-5"
            />
            <div className={ctaSlot()}>
              <ExtendedOptimizelyComponent content={content.ctaLink} />
            </div>
          </div>
        </div>
      </div>
    </ti-slide>
  );
}

const slideWithCard = tv({
  slots: {
    card: "relative flex h-full",
    linkWrapper: "absolute inset-0 z-[1]",
    content: [
      "relative box-border mt-[200px] w-full bg-pl-container-background-color-primary p-6 text-pl-text-color-secondary",
      "md:absolute md:bottom-0 md:left-0 md:mt-0 md:h-[272px] md:w-[358px]",
    ],
    inner: "flex h-full flex-col",
    cta: "mt-auto",
  },
  variants: {
    innerCardWidth: {
      "50": { content: "md:w-1/2" },
      fixed358: {},
    },
  },
  defaultVariants: {
    innerCardWidth: "fixed358",
  },
});
