import { useState, useCallback } from 'react';

/**
 * Reusable utility hook for managing boolean states
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return { value, setValue, setTrue, setFalse, toggle };
}
