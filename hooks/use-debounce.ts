import { useEffect, useState } from "react";

type DebouncedValue<T> = T | undefined;

export const useDebounce = <T>(value: T, delay: number): DebouncedValue<T> => {
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
