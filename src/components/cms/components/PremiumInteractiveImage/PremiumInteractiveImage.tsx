import { getLocale, getTranslations } from "next-intl/server";
import { ContentProps } from "@optimizely/cms-sdk";
import {
  PremiumInteractiveImageComponentType,
  PremiumInteractiveImagePanelComponentType,
} from "./PremiumInteractiveImage.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { fieldFactory } from "@/components/ui/cms";
import { getStandardizedImage } from "@/lib/utils/image-utils";
import {
  normalizeGenericArrayToTyped,
  normalizeGenericContentToTyped,
} from "@/lib/utils/content-type-utils";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { CTALinkElement } from "@/components/cms/elements/CTALink";
import { CtaLinkListComponentType } from "@/components/cms/components/CtaList/CtaList.model";
import {
  ImageMapPin,
  TiImageMap,
} from "@/components/ui/ti/TiImages/TiImageMap/TiImageMap";
import { TiSlidePanel } from "@/components/ui/ti/TiSlidePanel/TiSlidePanel";
import { HeadingLevelContext } from "@/components/utilities/HeadingLevelContext";
import { PremiumInteractiveImageTheme } from "./PremiumInteractiveImageTheme";

type PanelContentProps = ContentProps<
  typeof PremiumInteractiveImagePanelComponentType
> & { _id: string };

const ANALYTICS_LID = "premiuminteractive";

/* Sizes/weights/margins below come off `.ti_p-premiumInteractiveImg` on ti.com.
   They are `!`-guarded because TI's global stylesheet restyles bare
   h2/h3/h6/p/ul *unlayered* — an unguarded utility applies locally and then
   loses on the VM. text-h3 and text-h4 are TI's h2 and h3 element sizes; our
   scale is one step up from the element scale. */

/* The rule under the title is TI's `::before` (3em wide, 24px below the text),
   rebuilt as `after:` so it flows instead of needing position/padding. The
   colour is read as a raw var, not `bg-pl-*`: Tailwind's --color-* alias
   resolves at :root, so the theme's darkBG override wouldn't reach it. */
const sectionTitleClassName =
  "text-h3! mb-8! text-center font-light! text-balance after:mx-auto after:mt-6 after:block after:h-px after:w-[3em] after:bg-[var(--pl-border-color-accent)] after:content-['']";

const panelTitleClassName = "text-h4! mb-6! font-light! md:mb-4!";

const bodyClassName = "text-body-md mb-6!";

const relatedTitleClassName =
  "text-body-md/7! mb-6! font-semibold! md:mb-3! md:text-body-md/5!";

const relatedListClassName =
  "mb-8! ms-0! list-none [&>li]:mb-4! md:mb-6! md:[&>li]:mb-2!";

export async function PremiumInteractiveImageComponent({
  content,
  parentField,
}: OptiComponentProps<typeof PremiumInteractiveImageComponentType>) {
  if (!content) {
    return null;
  }

  const { src, alt } = getStandardizedImage(content, content.imageName);
  if (!src) {
    return null;
  }

  const locale = await getLocale();
  const t = await getTranslations({ locale });

  const { WrappedTextField, WrappedHeadingTextField } = fieldFactory<
    typeof PremiumInteractiveImageComponentType
  >(content, parentField);

  const panels = normalizeGenericArrayToTyped<
    typeof PremiumInteractiveImagePanelComponentType
  >(content.panels);

  const pins: ImageMapPin[] = panels.map((panel, index) => ({
    positionHorizontal: `${panel.panelPinX ?? 0}%`,
    positionVertical: `${panel.panelPinY ?? 0}%`,
    label: panel.panelTitle,
    linePath: panel.panelPath ?? undefined,
    lineWidth: panel.panelPinLength != null ? `${panel.panelPinLength}px` : undefined,
    lineHeight: panel.panelPinHeight != null ? `${panel.panelPinHeight}px` : undefined,
    targetPanel: index + 1,
    dataLid: ANALYTICS_LID,
    dataNavtitle: panel.panelTitle ?? undefined,
  }));

  const relatedResourcesLabel = t("Related resources");

  return (
    <PremiumInteractiveImageTheme>
      <WrappedHeadingTextField
        field="sectionTitle"
        className={sectionTitleClassName}
      />
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-7">
        <div className="order-2 md:order-1 md:w-1/4 md:shrink-0">
          <TiSlidePanel>
            <div>
              <div className="mb-6">
                <WrappedTextField
                  as="p"
                  field="componentIntro1"
                  className={bodyClassName}
                />
              </div>
              <div
                data-pii-page-lower
                className="border-t border-pl-divider-color-primary pt-6"
              >
                <WrappedTextField
                  as="p"
                  field="componentIntro2"
                  className={bodyClassName}
                />
              </div>
            </div>
            <HeadingLevelContext headingLevel="increment">
              {panels.map((panel) => (
                <PanelPage
                  key={panel._id}
                  panel={panel}
                  relatedResourcesLabel={relatedResourcesLabel}
                />
              ))}
            </HeadingLevelContext>
          </TiSlidePanel>
        </div>
        <div className="order-1 md:order-2 md:flex-1">
          <TiImageMap endImageSrc={src} alt={alt} pins={pins} />
        </div>
      </div>
    </PremiumInteractiveImageTheme>
  );
}

function PanelPage({
  panel,
  relatedResourcesLabel,
}: {
  panel: PanelContentProps;
  relatedResourcesLabel: string;
}) {
  const { WrappedTextField, WrappedHeadingTextField } = fieldFactory<
    typeof PremiumInteractiveImagePanelComponentType
  >(panel);

  const cta = normalizeGenericContentToTyped(
    panel.panelMainCTALink,
    CtaLinkElementType,
  );

  const additionalLinksList = normalizeGenericContentToTyped(
    panel.panelAdditionalLinks,
    CtaLinkListComponentType,
  );
  const links = normalizeGenericArrayToTyped<typeof CtaLinkElementType>(
    additionalLinksList?.ctaLinks,
  )
    .map((link) => ({
      id: link._id,
      text: link.link?.text,
      href: normalizeUrl(link.link?.url?.default ?? ""),
    }))
    .filter((link): link is { id: string; text: string; href: string } =>
      Boolean(link.text && link.href),
    );

  return (
    <div>
      <div className="mb-6">
        <WrappedHeadingTextField
          field="panelTitle"
          className={panelTitleClassName}
        />
        {panel.panelSubtitle && (
          <WrappedTextField
            as="p"
            field="panelSubtitle"
            className={bodyClassName}
          />
        )}
        <WrappedTextField
          as="p"
          field="panelDescription"
          className={bodyClassName}
        />
        {cta && (
          <CTALinkElement
            content={cta}
            dataLid={`${ANALYTICS_LID}-${panel.panelTitle}`}
            dataNavtitle={cta.link?.text ?? undefined}
          />
        )}
      </div>
      {links.length > 0 && (
        <div
          data-pii-page-lower
          className="border-t border-pl-divider-color-primary pt-6"
        >
          <h6 className={relatedTitleClassName}>{relatedResourcesLabel}</h6>
          <ul className={relatedListClassName}>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="text-body-md text-pl-link-color-primary no-underline hover:underline"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
