import { CTAElementType } from "./CTA.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { getPreviewUtils } from "@optimizely/cms-sdk/react/server";
import { normalizeUrl } from "@/lib/utils/link-utils";
import { ButtonAppearance, ButtonColor } from "@/components/ui/ti/enums";
import { getEnumOrUndefinedForAuto } from "@/lib/opti/enum-utils";
import { TiButton } from "@/components/ui/ti/TiButton/TiButton";

type Props = OptiComponentProps<typeof CTAElementType>;

export function CTAElement({ content, parentField }: Props) {
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

  const { pa } = getPreviewUtils(content);

  return (
    <div
      {...pa([parentField, "link"].filter(Boolean).join("."))}
      data-url={url}
      data-orig-url={content.link?.url.default}
    >
      {/* TODO: When TIF button is updated to allow a `download` attribute directly,
      we can remove this hack */}
      <TiButton
        href={content.IsDownload ? undefined : url}
        // href={url}
        appearance={buttonAppearance}
        color={buttonColor}
        iconName={content.Icon ?? undefined}
      >
        {content.IsDownload ? (
          <a
            // This download api route gets around the fact that download attribute only works for same domain
            href={`/api/download?url=${encodeURI(url)}`}
            download={getUrlFileName(url)}
            style={{ color: "unset", textDecoration: "unset" }}
          >
            {content.link?.text}
          </a>
        ) : (
          content.link?.text
        )}
      </TiButton>
    </div>
  );
}

function getUrlFileName(url: string) {
  const split = url.split("/");
  const last = split[split.length - 1];
  return last.split("?")[0].split("#")[0];
}
