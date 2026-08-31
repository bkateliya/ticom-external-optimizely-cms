import { WatchVideoModalButton } from "./WatchVideoModalButton";
import { SERVER_ENV_VARS } from "@/lib/env/server-env";
import { ButtonAppearance } from "@/components/ui/ti/enums";

type Props = {
  videoId: string;
  appearance?: ButtonAppearance;
};

export function WatchVideoModalCTAButton({ videoId, appearance }: Props) {
  return (
    <WatchVideoModalButton
      videoId={videoId}
      accountId={SERVER_ENV_VARS.BRIGHTCOVE_ACCOUNT_ID}
      playerId={SERVER_ENV_VARS.BRIGHTCOVE_PLAYER_ID}
      appearance={appearance}
    />
  );
}
