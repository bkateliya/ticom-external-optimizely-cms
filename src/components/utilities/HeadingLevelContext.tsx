"use client";

import { createContext, useContext } from "react";
import React from "react";

const Context = createContext<{ headingLevel: number }>({ headingLevel: 1 });

export function useHeadingLevel() {
  return useContext(Context)?.headingLevel ?? 1;
}

export type HeadingLevelType = 'increment' | 'same' | 1 | 2 | 3 | 4 | 5 | 6;

export function HeadingLevelContext({ children, headingLevel }: React.PropsWithChildren & {
  headingLevel: HeadingLevelType
}) {
  const currentHeadingLevel = useHeadingLevel();

  const newHeadingLevel = headingLevel === 'same' ? currentHeadingLevel :
    headingLevel === 'increment' ? Math.min(currentHeadingLevel + 1, 6) :
      headingLevel;

  return (
    <Context.Provider
      value={{
        headingLevel: newHeadingLevel,
      }}
    >
      {children}
    </Context.Provider>
  );
}
