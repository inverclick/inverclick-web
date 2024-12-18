"use client";

import { useCurrencyContext } from "@/contexts/currency-context";
import { PropsWithChildren, useEffect } from "react";

export type TRMLoaderProps = PropsWithChildren;

export const TRMLoader = ({ children }: TRMLoaderProps) => {
  const { loadTRM } = useCurrencyContext();

  useEffect(() => {
    loadTRM();
  }, []);

  return <>{children}</>;
};
