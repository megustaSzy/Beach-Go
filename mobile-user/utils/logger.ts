/**
 * Custom console logger with styling and environments filter
 */
export const Logger = {
  info(message: string, ...args: any[]) {
    if (__DEV__) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  warn(message: string, ...args: any[]) {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error(message: string, ...args: any[]) {
    console.error(`[ERROR] ${message}`, ...args);
  }
};
