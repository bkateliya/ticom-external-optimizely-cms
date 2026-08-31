import { getContext } from "@optimizely/cms-sdk/react/server";
import { getTranslations } from "next-intl/server";
import { tv } from "tailwind-variants";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import { cleanLegacyUrl, normalizeUrl } from "@/lib/utils/link-utils";

const ICON_BASE = `${SERVER_ENV_VARS.TICOM_BASE_DOMAIN}/content/dam/ticom/images/icons/illustrative-icons`;

const REFERENCE_DESIGN_SEARCH_URL = `${SERVER_ENV_VARS.TICOM_BASE_DOMAIN}/reference-designs/index.html#search?applid=`;

const style = tv({
  slots: {
    card: "flex flex-col items-center justify-between gap-6 rounded border border-pl-border-color-tertiary bg-pl-container-background-color-secondary px-4 py-6 text-pl-text-color-primary md:flex-row md:gap-4 md:p-8",
    iconLink:
      "mx-4 w-full max-w-[calc(40vw-32px)] shrink-0 md:w-[110px] md:max-w-none",
    icon: "h-auto w-full",
    content: "w-full min-w-0 flex-1",
    headline:
      "mb-6! text-center text-h5! font-normal! md:mb-3! md:text-left md:font-light!",
    description: "mb-0! text-body-md!",
    cta: "flex w-full shrink-0 justify-center whitespace-nowrap md:w-auto md:basis-[calc(25%-56px)]",
  },
});

const s = style();

interface TeaserProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  headline: string;
  description: string;
  ctaText: string;
}

function Teaser({
  href,
  iconSrc,
  iconAlt,
  headline,
  description,
  ctaText,
}: TeaserProps) {
  return (
    <div className={s.card()}>
      <a href={href} className={s.iconLink()}>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed DAM icon; next/image would need a remotePatterns change */}
        <img
          src={iconSrc}
          alt={iconAlt}
          width={360}
          height={360}
          className={s.icon()}
        />
      </a>
      <div className={s.content()}>
        <DynamicHeading className={s.headline()}>{headline}</DynamicHeading>
        <p className={s.description()}>{description}</p>
      </div>
      <div className={s.cta()}>
        <TiButton
          href={href}
          appearance={ButtonAppearance.outline}
          color={ButtonColor.primary}
          className="w-full! md:w-auto!"
        >
          {ctaText}
        </TiButton>
      </div>
    </div>
  );
}

export async function ApplicationSelectionToolTeaser() {
  const { application, applicationInfo } = getContext() ?? {};
  const t = await getTranslations();

  // Golden sourced off the page's MSE id only — a page with just a GPT id gets
  // nothing, and `applicationInfo` alone would fall back to the default one.
  if (!application?.applicationId || !applicationInfo) {
    return null;
  }

  const url = normalizeUrl(
    `${cleanLegacyUrl(applicationInfo.appUrl)}/products`,
  );

  if (!url) {
    return null;
  }

  return (
    <Teaser
      href={url}
      iconSrc={`${ICON_BASE}/products/processor-chip-icon.png`}
      iconAlt="Chip icon"
      headline={t("View all {value} products", {
        value: applicationInfo.sectionName,
      })}
      description={t(
        "Filter, compare and select the right device for your {value} design with our selection tool.",
        { value: applicationInfo.sectionName },
      )}
      ctaText={t("View all products")}
    />
  );
}

export async function ReferenceDesignSearchTeaser() {
  const { application, applicationInfo } = getContext() ?? {};
  const t = await getTranslations();

  if (!application?.applicationId || !applicationInfo) {
    return null;
  }

  // AEM's tiAppsPathId: the application path root → leaf with commas instead of
  // slashes. `ancestors` arrives leaf → root and includes the page's own
  // application, the same way the breadcrumb consumes it.
  const applicationPath = applicationInfo.ancestors
    .map((ancestor) => ancestor.childId)
    .toReversed()
    .join(",");

  if (!applicationPath) {
    return null;
  }

  return (
    <Teaser
      href={`${REFERENCE_DESIGN_SEARCH_URL}${applicationPath}`}
      iconSrc={`${ICON_BASE}/software/reference-designs-icon.png`}
      iconAlt="Reference designs icon"
      headline={t("Reference designs related to {value}", {
        value: applicationInfo.sectionName,
      })}
      description={t(
        "Use our reference design selection tool to find designs that best match your application and parameters.",
      )}
      ctaText={t("View reference designs")}
    />
  );
}
