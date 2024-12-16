import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Custom React hook that synchronizes a stateful value with a given prop.
 *
 * @param initialValue - The initial value to be set and tracked.
 * @returns A tuple containing the current stateful value and a function to update it.
 */
export function useStatefulProp<T>(
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue];
}
