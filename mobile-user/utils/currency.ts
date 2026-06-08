/**
 * Utility functions for currency formatting
 */

/**
 * Formats a number to Indonesian Rupiah (IDR) currency format
 * @param amount The numeric amount to format
 * @returns Formatted currency string, e.g., "Rp 50.000"
 */
export const formatIDR = (amount: number): string => {
  if (isNaN(amount)) return 'Rp 0';
  return `Rp ${amount.toLocaleString('id-ID')}`;
};
