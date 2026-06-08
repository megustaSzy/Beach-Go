import { useEffect, useRef } from 'react';

/**
 * Hook to retain previous render value of a state/prop
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
