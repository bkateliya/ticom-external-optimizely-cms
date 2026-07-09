"use client";
import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import { createContext, useContext } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export interface SectionWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren {
  textAlignment?: TextAlignment;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
  noPaddingSides?: boolean;
  isCentered75?: boolean;
}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: styles.textAlignLeft,
  Center: styles.textAlignCenter,
  Right: styles.textAlignRight,
};

export const SectionWrapper = ({
  children,
  textAlignment = "Left",
  noPaddingTop,
  noPaddingBottom,
  noPaddingSides,
  isCentered75,
}: SectionWrapperProps) => {
  const { isInsideSectionWrapper } = useContext(SectionWrapperContext);
  // We don't want to double-wrap, if we're already inside one, don't add another one.
  if (isInsideSectionWrapper) {
    return children;
  }
  const baseClassName = clsx(
    styles.base,
    "container",
    "mx-auto",
    "py-10",
    textAlignmentClassMap[textAlignment],
    {
      [styles.noPaddingTop]: noPaddingTop,
      [styles.paddingBottom]: noPaddingBottom,
      [styles.paddingSides]: !noPaddingSides,
      [styles.centered75]: isCentered75,
    },
  );

  return (
    <SectionWrapperContext.Provider value={{ isInsideSectionWrapper: true }}>
      <div
        data-component="generic-wrappers/section-wrapper"
        className={baseClassName}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </SectionWrapperContext.Provider>
  );
};

interface SectionWrapperContextType {
  isInsideSectionWrapper: boolean;
}

const SectionWrapperContext = createContext<SectionWrapperContextType>({
  isInsideSectionWrapper: false,
});

