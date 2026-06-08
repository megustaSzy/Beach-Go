/**
 * Utility functions for date formatting
 */

/**
 * Formats a date string or object to a readable Indonesian date format
 * @param dateInput Date object or date string
 * @returns Formatted date string, e.g., "17 Agustus 2026"
 */
export const formatIndonesianDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '-';
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};
