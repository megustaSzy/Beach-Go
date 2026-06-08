/**
 * Form validation utility functions
 */

/**
 * Validates whether an email format is correct
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates whether a password meets strength requirements
 * (At least 6 characters long)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};
