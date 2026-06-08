import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook to track the system application active state status
 */
export function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, []);

  return appState;
}
