import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

/**
 * Hook to track orientation and dimensions changes dynamically
 */
export function useDimensions() {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription.remove();
  }, []);

  return dimensions;
}
