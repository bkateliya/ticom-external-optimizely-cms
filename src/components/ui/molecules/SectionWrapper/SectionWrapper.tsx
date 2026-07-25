"use client";

import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import { createContext, useContext } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export interface SectionWrapperProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    React.PropsWithChildren {
  contained?: boolean;
  textAlignment?: TextAlignment;
  noPaddingTop?: boolean;
  noPaddingBottom?: boolean;
  noPaddingSides?: boolean;
}

const textAlignmentClassMap: Record<TextAlignment, string> = {
  Left: "text-left",
  Center: "text-center",
  Right: "text-right",
};

export const SectionWrapper = ({
  children,
  textAlignment = "Left",
  className,
  contained = true,
  ...props
}: SectionWrapperProps) => {
  const { isInsideSectionWrapper } = useContext(SectionWrapperContext);
  // We don't want to double-wrap, if we're already inside one, don't add another one.
  if (isInsideSectionWrapper) {
    return (
      <div
        {...props}
        className={clsx({ container: contained }, "mx-auto", className)}
      >
        {children}
      </div>
    );
  }
  const baseClassName = clsx(
    styles.base,
    "w-full",
    { container: contained },
    "mx-auto",
    "my-10",
    "space-10",
    "py-10",
    textAlignmentClassMap[textAlignment],
    className,
  );

  return (
    <SectionWrapperContext.Provider value={{ isInsideSectionWrapper: true }}>
      <div
        {...props}
        data-component="generic-wrappers/section-wrapper"
        className={baseClassName}
      >
        <div className={clsx("w-full", "flex", "flex-col", "space-y-4")}>
          {children}
        </div>
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
