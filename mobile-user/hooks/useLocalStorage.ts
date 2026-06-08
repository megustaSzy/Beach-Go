import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook to synchronize state value to AsyncStorage
 */
const cache: Record<string, string> = {};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        } else if (cache[key] !== undefined) {
          setStoredValue(JSON.parse(cache[key]));
        }
      } catch (error) {
        if (cache[key] !== undefined) {
          setStoredValue(JSON.parse(cache[key]));
        }
      }
    };
    loadStoredValue();
  }, [key]);

  const setValue = async (value) => {
    try {
      setStoredValue(value);
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      cache[key] = stringValue;
    } catch (error) {
      cache[key] = JSON.stringify(value);
    }
  };

  return [storedValue, setValue];
}
