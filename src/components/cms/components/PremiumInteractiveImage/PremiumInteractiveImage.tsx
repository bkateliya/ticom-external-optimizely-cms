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
import { PremiumInteractiveImageTheme } from "./PremiumInteractiveImageTheme";

type PanelContentProps = ContentProps<
  typeof PremiumInteractiveImagePanelComponentType
> & { _id: string };

const ANALYTICS_LID = "premiuminteractive";

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

  const { WrappedTextField } = fieldFactory<
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
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-7">
        <div className="md:order-1 md:w-1/4 md:shrink-0">
          <TiSlidePanel>
            <div>
              <div className="mb-6">
                <WrappedTextField
                  as="p"
                  field="componentIntro1"
                  className="text-body-md"
                />
              </div>
              <div
                data-pii-page-lower
                className="border-t border-pl-divider-color-primary pt-6"
              >
                <WrappedTextField
                  as="p"
                  field="componentIntro2"
                  className="text-body-md"
                />
              </div>
            </div>
            {panels.map((panel) => (
              <PanelPage
                key={panel._id}
                panel={panel}
                relatedResourcesLabel={relatedResourcesLabel}
              />
            ))}
          </TiSlidePanel>
        </div>
        <div className="md:order-2 md:flex-1">
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
      <div className="mb-6 flex flex-col gap-4">
        <WrappedHeadingTextField
          field="panelTitle"
          headingSize={3}
          className="mb-0"
        />
        {panel.panelSubtitle && (
          <WrappedTextField
            as="p"
            field="panelSubtitle"
            className="text-body-md text-pl-text-color-secondary"
          />
        )}
        <WrappedTextField
          as="p"
          field="panelDescription"
          className="text-body-md"
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
          <h6>{relatedResourcesLabel}</h6>
          <ul className="flex flex-col gap-2">
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
