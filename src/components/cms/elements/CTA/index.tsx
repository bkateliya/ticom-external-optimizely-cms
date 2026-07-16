
import { CTAElementType } from "./CTA.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { getEnumOrUndefinedForAuto } from "@/lib/opti/enum-utils";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";

type Props = OptiComponentProps<typeof CTAElementType>

export function CTAElement({
  content,
  parentField,
}: Props) {
  if (!content) {
    return null;
  }
  const href =
    (content.link?.url.base ?? "") + (content.link?.url?.default ?? "");

  if (!href) {
    return null;
  }

  const url = normalizeUrl(href);

  if (!url) {
    return null;
  }

  const buttonAppearance = getEnumOrUndefinedForAuto<ButtonAppearance>(content.Variant);

  const buttonColor = getEnumOrUndefinedForAuto<ButtonColor>(content.ButtonColor);

  const { pa } = getPreviewUtils(content);


  return (
    <div {...pa([parentField, "link"].filter(Boolean).join("."))}>
      <TiButton
        href={url}
        appearance={buttonAppearance}
        color={buttonColor}
        iconName={content.Icon ?? undefined}
      >{content.link?.text}</TiButton>
    </div>
  );
}
