/**
 * String manipulation helper functions
 */

/**
 * Truncates a string to a specified length and appends ellipsis
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};
