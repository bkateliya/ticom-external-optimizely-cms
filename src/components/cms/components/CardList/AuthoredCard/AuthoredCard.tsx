import { fieldFactory } from "@/components/ui/cms";
import { AuthoredCardComponentType } from "./AuthoredCard.model";
import { OptiCardComponentProps } from "../card-options";
import { ExtendedOptimizelyComponent } from "@/components/ui/cms/ExtendedOptimizelyComponent";
import { ThemeProvider } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import clsx from "clsx";
import { DynamicHeading } from "@/components/ui/Atoms/DynamicHeading";
import { normalizeGenericContentToTyped } from "@/lib/utils/content-type-utils";
import { CtaLinkElementType } from "@/components/cms/elements/CTALink/CTALink.model";
import { normalizeUrl } from "@/lib/utils/link-utils";

export function AuthoredCardComponent({
  content,
  parentField,
  hoverCard,
  hiddenFields,
  cardStyle,
}: OptiCardComponentProps<typeof AuthoredCardComponentType>) {
  if (!content) {
    return null;
  }
  const { WrappedTextField, WrappedRichTextField, WrappedImageField } =
    fieldFactory<typeof AuthoredCardComponentType>(content, parentField);

  const cta = normalizeGenericContentToTyped<typeof CtaLinkElementType>(
    content.cta,
  );
  const href = normalizeUrl(cta?.link?.url?.default ?? "");
  const headline = (
    <DynamicHeading>
      {href ? (
        <a
          href={href}
          className={clsx(
            "before:content-['']",
            "before:absolute",
            "before:top-0",
            "before:right-0",
            "before:bottom-0",
            "before:left-0",
          )}
        >
          <WrappedTextField field="headline" />
        </a>
      ) : (
        <WrappedTextField field="headline" />
      )}
    </DynamicHeading>
  );

  const ctaElement = hiddenFields?.includes("cta") ? null : (
    // Because full card is clickable, hide the CTA from screen readers
    <div aria-hidden>
      <ExtendedOptimizelyComponent content={content.cta} />
    </div>
  );
  return (
    <div className="rounded-xl p-4 overflow-hidden group relative">
      {hiddenFields?.includes("image") ? null : (
        <WrappedImageField field="bynderImage" />
      )}

      {hoverCard ? (
        <div
          className={clsx(
            "hidden",
            "group-hover:block",
            "absolute",
            "top-0",
            "right-0",
            "bottom-0",
            "left-0",
          )}
        >
          <ThemeProvider theme="theme-dark-grey">
            {hiddenFields?.includes("eyebrow") ? null : (
              <WrappedTextField field="eyebrow" />
            )}

            {headline}

            {hiddenFields?.includes("description") ? null : (
              <WrappedRichTextField field="description" />
            )}

            {ctaElement}
          </ThemeProvider>
        </div>
      ) : (
        <ThemeProvider
          // Not sure if this is correct, check styles
          theme={cardStyle === "dark" ? "theme-dark-grey" : undefined}
        >
          {hiddenFields?.includes("eyebrow") ? null : (
            <WrappedTextField field="eyebrow" />
          )}

          {headline}

          {hiddenFields?.includes("description") ? null : (
            <WrappedRichTextField field="description" />
          )}
          {ctaElement}
        </ThemeProvider>
      )}
    </div>
  );
}
