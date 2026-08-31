"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { TifButton } from "@ticom/form-components/react";
import { ButtonAppearance } from "@/components/ui/ti/enums";
import { useTheme } from "@/components/ui/context/BrandAndTheme/BrandAndThemeContext";
import TiSvgIcon from "@/components/ui/ti/TiSvgIcon/TiSvgIcon";

type TiSlideElement = HTMLElement & {
  pauseVideo: () => Promise<void>;
  resumeVideo: () => Promise<void>;
};

type Props = {
  videoId: string;
  appearance?: ButtonAppearance;
  accountId: string;
  playerId: string;
};

export function WatchVideoModalButton({
  videoId,
  appearance = ButtonAppearance.solid,
  accountId,
  playerId,
}: Props) {
  const { mode: theme } = useTheme();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  // Captured on open because close fires from a portal (document.body), outside the ti-slide tree.
  const tiSlideRef = useRef<TiSlideElement | null>(null);

  const open = (e: React.MouseEvent) => {
    tiSlideRef.current = (e.currentTarget as HTMLElement).closest("ti-slide") as TiSlideElement | null;
    tiSlideRef.current?.pauseVideo();
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    tiSlideRef.current?.resumeVideo();
    tiSlideRef.current = null;
  };

  const modal = isOpen && createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      onClick={close}
    >
      <div
        className="relative w-[min(100%,calc(80vh*16/9))] px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 bg-transparent border-none text-white hover:opacity-70 transition-opacity cursor-pointer"
          onClick={close}
          aria-label="Close video"
        >
          <TiSvgIcon icon="close" size="m" className="brightness-0 invert" />
        </button>
        <iframe
          src={`https://players.brightcove.net/${accountId}/${playerId}_default/index.html?videoId=${videoId}&autoplay=true`}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full aspect-video border-0"
        />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <TifButton
        appearance={appearance}
        iconName="video"
        theme={theme}
        onClick={open}
      >
        {t('Watch video')}
      </TifButton>
      {modal}
    </>
  );
}
