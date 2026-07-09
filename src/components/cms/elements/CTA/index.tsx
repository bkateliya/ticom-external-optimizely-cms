import { CTAElementType } from "./CTA.model";
import CtaLink from "@/components/ui/Atoms/Cta/CtaLink";
import {
  CtaVariants,
  CtaIcons,
  CtaSurface,
  CtaVariantsWithAuto,
} from "@/components/ui/Atoms/Cta/CtaButton";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";

type Props = OptiComponentProps<typeof CTAElementType> & {
  ctaSurface?: CtaSurface;
  defaultCtaVariant?: CtaVariants;
};

export function CTAElement({
  content,
  parentField,
  ctaSurface = "onBg",
  defaultCtaVariant = "fill",
}: Props) {
  if (!content) {
    return null;
  }
  const href =
    (content.link?.url.base ?? "") + (content.link?.url?.default ?? "");
  const configuredCtaVariant =
    (content.Variant as CtaVariantsWithAuto) || "auto";

  const ctaVariant =
    configuredCtaVariant === "auto" ? defaultCtaVariant : configuredCtaVariant;
  if (!href) {
    return null;
  }
  const { pa } = getPreviewUtils(content);

  return (
    <div {...pa([parentField, "link"].filter(Boolean).join("."))}>
      <CtaLink
        href={href}
        text={content.link?.text ?? ""}
        ctaSurface={ctaSurface}
        ctaVariant={ctaVariant}
        ctaIconBefore={
          content.IconAlignment === "Left"
            ? (content.Icon as CtaIcons)
            : undefined
        }
        ctaIconAfter={
          content.IconAlignment === "Right"
            ? (content.Icon as CtaIcons)
            : undefined
        }
      />
    </div>
  );
}
