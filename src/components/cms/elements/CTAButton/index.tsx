import { CtaButtonElementType } from "./CTAButton.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { getEnumOrUndefinedForAuto } from "@/lib/opti/enum-utils";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";

type Props = OptiComponentProps<typeof CtaButtonElementType>;

export function CTAButtonElement({ content }: Props) {
  if (!content) {
    return null;
  }
  const href = content.link?.url?.default ?? "";

  if (!href) {
    return null;
  }

  const url = normalizeUrl(href);

  if (!url) {
    return null;
  }

  const buttonAppearance = getEnumOrUndefinedForAuto<ButtonAppearance>(
    content.Variant,
  );

  const buttonColor = getEnumOrUndefinedForAuto<ButtonColor>(
    content.ButtonColor,
  );

  // The CMS "Open in" dropdown maps to `link.target` (`_blank`, `_self`, …).
  const target = content.link?.target || undefined;

  return (
    <TiButton
      href={url}
      appearance={buttonAppearance}
      color={buttonColor}
      iconName={content.Icon ?? undefined}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {content.link?.text}
    </TiButton>
  );
}
