import { CtaVideoElementType } from "./CTAVideoModal.model";
import { OptiComponentProps } from "@/lib/ts/component-props";
import { WatchVideoModalCTAButton } from "@/components/ui/Atoms/WatchVideoModalButton/WatchVideoModalCTAButton";
import { ButtonAppearance } from "@/components/ui/ti/enums";

type Props = OptiComponentProps<typeof CtaVideoElementType> & {
  appearance?: ButtonAppearance;
};

function parseAppearance(style: string | null | undefined): ButtonAppearance {
  return style === "outline" ? ButtonAppearance.outline : ButtonAppearance.solid;
}

export function CtaVideoElement({ content, appearance: appearanceOverride }: Props) {
  if (!content?.videoId) {
    return null;
  }

  return (
    <WatchVideoModalCTAButton
      videoId={content.videoId}
      appearance={appearanceOverride ?? parseAppearance(content.buttonStyle)}
    />
  );
}
