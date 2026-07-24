"use client";
import { useHeadingLevel } from "@/components/utilities/HeadingLevelContext";
import { HtmlElementProps } from "@/lib/ts/react";

export function DynamicHeading({
  children,
  ...props
}: HtmlElementProps<HTMLHeadingElement>) {
  const headingLevel = useHeadingLevel();

  if (!children) {
    return null;
  }
  const Component = `h${headingLevel}` as React.ElementType;
  return <Component {...props}>{children}</Component>;
}
