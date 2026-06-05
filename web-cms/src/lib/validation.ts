export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number format validation
  const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
  return phoneRegex.test(phone);
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password harus minimal 6 karakter.",
    };
  }
  return { isValid: true, message: "" };
}
