import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Safe wrapper helper for AsyncStorage
 */
const cache: Record<string, string> = {};

export const SafeStorage = {
  async setItem(key: string, value: any): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      cache[key] = stringValue;
    } catch (error) {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      cache[key] = stringValue;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return cache[key] ? (JSON.parse(cache[key]) as T) : null;
      }
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    } catch (error) {
      const cached = cache[key];
      if (cached) {
        try {
          return JSON.parse(cached) as T;
        } catch {
          return cached as unknown as T;
        }
      }
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // ignore
    }
    delete cache[key];
  }
};
