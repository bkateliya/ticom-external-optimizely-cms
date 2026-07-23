"use client";
import { ContextData } from "@optimizely/cms-sdk/react/server";
import React, { createContext, useContext } from "react";

const OptiClientContext = createContext<ContextData>({} as ContextData);

export const useOptiContext = () => useContext(OptiClientContext);

export function useContextLocale() {
  return useOptiContext().locale;
}

interface OptiContextProviderProps {
  contextData: ContextData;
  children: React.ReactNode;
}

export const OptiContextProvider: React.FC<OptiContextProviderProps> = ({
  contextData,
  children,
}) => {
  return (
    <OptiClientContext.Provider value={contextData}>
      {children}
    </OptiClientContext.Provider>
  );
};
