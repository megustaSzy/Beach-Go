/**
 * Phone and credential validation regex utilities
 */

/**
 * Validates Indonesian phone format starting with 08 or +62
 */
export const isValidIndonesianPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
  return phoneRegex.test(phone);
};
