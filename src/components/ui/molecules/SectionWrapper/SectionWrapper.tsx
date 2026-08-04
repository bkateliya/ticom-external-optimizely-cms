"use client";

import { TextAlignment } from "@/components/ui/context/TextAlignmentContext";
import { createContext, useContext } from "react";
import clsx from "clsx";

export interface SectionWrapperProps
  extends
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  React.PropsWithChildren {
  contained?: boolean;
  /** Optional. Constrain the content to the narrower `container-md` width. */
  narrow?: boolean;
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
  narrow = false,
  ...props
}: SectionWrapperProps) => {
  const { isInsideSectionWrapper } = useContext(SectionWrapperContext);
  // We don't want to double-wrap, if we're already inside one, don't add another one.
  if (isInsideSectionWrapper) {
    // `max-w-md` rather than `container-md` here: the outer wrapper already
    // supplies the gutter, so this one must not add its own.
    return (
      <div
        {...props}
        className={clsx({ container: contained }, className)}
      >
        {children}
      </div>
    );
  }
  const baseClassName = clsx(
    "relative flex flex-col items-start self-stretch",
    "w-full",
    contained && (narrow ? "container-md" : "container-lg"),
    "mx-auto",
    "space-10",
    "py-16",
    "md:py-24",
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
