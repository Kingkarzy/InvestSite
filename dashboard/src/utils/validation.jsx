// Function to validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate password strength
export const validatePassword = (password) => {
  // Add your password validation criteria here
  // Example: Password should be at least 8 characters long
  return password.length >= 8;
};

// Function to sanitize input values
export const sanitizeInput = (input) => {
  // Add your sanitization logic here
  // Example: Escape HTML characters
  const sanitizedInput = input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return sanitizedInput;
};
