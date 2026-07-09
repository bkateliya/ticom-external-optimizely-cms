"use client";
import { useHeadingLevel } from "@/components/utilities/HeadingLevelContext";

export function Heading({ children }: { children: React.ReactNode }) {
  const headingLevel = useHeadingLevel();
  const Component = `h${headingLevel}` as React.ElementType;
  return <Component>{children}</Component>;
}